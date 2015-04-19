import { code } from '../CompileError'
import * as EExports from '../Expression'
import Expression, { Assign, AssignDestructure, BlockVal, Call, Debug, Do, ELiteral,
	GlobalAccess, Special, Use, UseDo, Yield, YieldTo } from '../Expression'
import { head, isEmpty, toArray } from './U/Bag'
import { ifElse, some } from './U/Op'
import type from './U/type'
import { implementMany } from './U/util'
import { emptyVr, VrLocalInfo } from './Vr'

const vm = es => es.forEach(e => e.verify())

let
	cx,
	locals,
	// Locals for this block.
	// Replaces `locals` when entering into sub-function.
	pendingBlockLocals,
	isInDebug,
	isInGenerator,
	opLoop,
	vr

const
	init = _cx => {
		cx = _cx
		locals = new Map()
		pendingBlockLocals = []
		isInDebug = false
		isInGenerator = false
		opLoop = []
		vr = emptyVr()
	},
	// Release for garbage collection
	uninit = () => {
		locals = pendingBlockLocals = opLoop = vr = undefined
	},

	withInGenerator = (_isInGenerator, fun) => {
		const g = isInGenerator
		isInGenerator = _isInGenerator
		fun()
		isInGenerator = g
	},

	plusLocals = (addedLocals, fun) => {
		const shadowed = new Map()
		addedLocals.forEach(l => {
			const got = locals.get(l.name)
			if (got !== undefined)
				shadowed.set(l.name, got)
			locals.set(l.name, l)
		})
		fun()
		addedLocals.forEach(l => {
			const s = shadowed.get(l.name)
			if (s === undefined)
				locals.delete(l.name)
			else
				locals.set(l.name, s)
		})
	},

	plusPendingBlockLocals = (pending, fun) => {
		const oldLength = pendingBlockLocals.length
		pendingBlockLocals.push(...pending)
		fun()
		while (pendingBlockLocals.length > oldLength)
			pendingBlockLocals.pop()
	},

	withInLoop = (loop, fun) => {
		const l = opLoop
		opLoop = some(loop)
		fun()
		opLoop = l
	},

	withInDebug = (_isInDebug, fun) => {
		const d = isInDebug
		isInDebug = _isInDebug
		fun()
		isInDebug = d
	},

	withBlockLocals = fun => {
		const bl = pendingBlockLocals
		pendingBlockLocals = []
		plusLocals(bl, fun)
		pendingBlockLocals = bl
	},

	// Vr setters
	setEndLoop = (endLoop, loop) => {
		vr.endLoopToLoop.set(endLoop, loop)
	},

	registerLocal = local => {
		vr.localToInfo.set(local, VrLocalInfo(	isInDebug, [], []))
	},

	localAccess = access => {
		const name = access.name
		const local = locals.get(name)
		if (local !== undefined) {
			vr.accessToLocal.set(access, local)
			const info = vr.localToInfo.get(local)
			const accesses = isInDebug ? info.debugAccesses : info.nonDebugAccesses
			accesses.push(access)
		} else
			cx.fail(access.loc,
				`Could not find local or global ${code(name)}.\n` +
				'Available locals are:\n' +
				`${code(toArray(locals.keys()).join(' '))}.`)
	}

export default function verify(cx, e) {
	init(cx)
	e.verify()
	verifyLocalUse()
	const out = vr
	uninit()
	return out
}

const verifyLocalUse = () => {
	vr.localToInfo.forEach((info, local) => {
		const noNonDebug = isEmpty(info.nonDebugAccesses)
		if (noNonDebug && isEmpty(info.debugAccesses))
			cx.warnIf(!local.okToNotUse, local.loc, () =>
				`Unused local variable ${code(local.name)}.`)
		else if (info.isInDebug)
			cx.check(noNonDebug, () => head(info.nonDebugAccesses).loc, () =>
				`Debug-only local ${code(local.name)} used outside of debug.`)
		else
			cx.warnIf(!local.okToNotUse && noNonDebug, local.loc, () =>
				`Local ${code(local.name)} used only in debug.`)
	})
}

implementMany(EExports, 'verify', {
	Assign() {
		//TODO:higher-order
		const doV = () => vm([ this.assignee, this.value ])
		if (this.assignee.isLazy)
			withBlockLocals(doV)
		else
			doV()
	},
	BlockDo() { verifyLines(this.lines) },
	BlockVal() {
		const newLocals = verifyLines(this.lines)
		plusLocals(newLocals, () => this.returned.verify())
	},
	BlockWrap() {
		this.block.verify()
	},
	CaseDo: verifyCase,
	CaseVal: verifyCase,
	// Only reach here for in/out condition
	Debug() { verifyLines([ this ]) },
	EndLoop() {
		//TODO:higher-order
		ifElse(opLoop,
			loop => setEndLoop(this, loop),
			() => fail(this.loc, 'Not in a loop.'))
	},
	Fun() {
		withBlockLocals(() => {
			cx.check(isEmpty(this.opResDeclare) || this.block instanceof BlockVal, this.loc,
				'Function with return condition must return something.')
			this.args.forEach(arg => vm(arg.opType))
			withInGenerator(this.k === '~|', () => {
				const allArgs = this.args.concat(this.opRestArg)
				allArgs.forEach(_ => registerLocal(_))
				plusLocals(allArgs, () => {
					vm(this.opIn)
					this.block.verify()
					this.opResDeclare.forEach(rd => {
						rd.verify()
						registerLocal(rd)
					})
					this.opOut.forEach(o => plusLocals(this.opResDeclare, () => o.verify()))
				})
			})
		})
	},
	//TODO: This is silly...
	LocalAccess() { localAccess(this) },
	Loop() { withInLoop(this, () => this.block.verify()) },
	//TODO: No such thing as buildVxBlockLine...
	// Adding LocalDeclares to the available locals is done by Fun and buildVxBlockLine.
	LocalDeclare() { vm(this.opType) },
	MapEntry() {
		this.key.verify()
		this.val.verify()
	},
	Module() {
		const useLocals = verifyUses(this.uses, this.debugUses)
		plusLocals(useLocals, () => this.block.verify())
	},
	Yield() {
		cx.check(isInGenerator, this.loc, 'Cannot yield outside of generator context')
		this.yielded.verify()
	},
	YieldTo() {
		cx.check(isInGenerator, this.loc, 'Cannot yield outside of generator context')
		this.yieldedTo.verify()
	},

	// These ones just recurse to their children.
	AssignDestructure() {
		this.value.verify()
		vm(this.assignees)
	},
	Call() {
		this.called.verify()
		vm(this.args)
	},
	CaseDoPart: verifyCasePart,
	CaseValPart: verifyCasePart,
	GlobalAccess() { },
	ObjReturn() { vm(this.opObjed) },
	ObjSimple() {
		Object.getOwnPropertyNames(this.keysVals).forEach(key => this.keysVals[key].verify())
	},
	Lazy() { withBlockLocals(() => this.value.verify()) },
	ListReturn() { },
	ListEntry() { this.value.verify() },
	ListSimple() { vm(this.parts) },
	ELiteral() { cx.warnIf(this.k === 'js', this.loc, 'Js literal') },
	MapReturn() { },
	Member() { this.object.verify() },
	ModuleDefaultExport() { this.value.verify() },
	Quote() { vm(this.parts) },
	Special() { },
	Splat() { this.splatted.verify() }
})

function verifyCase() {
	const newLocals = []
	this.opCased.forEach(cased => {
		registerLocal(cased.assignee)
		cased.verify()
		newLocals.push(cased.assignee)
	})
	plusLocals(newLocals, () => {
		vm(this.parts)
		vm(this.opElse)
	})
}

function verifyCasePart() {
	this.test.verify()
	this.result.verify()
}

function verifyUses(uses, debugUses) {
	const useLocals = []
	uses.forEach(use => {
		if (!(use instanceof UseDo)) {
			type(use, Use)
			use.used.concat(use.opUseDefault).forEach(_ => {
				registerLocal(_)
				useLocals.push(_)
			})
		}
	})
	withInDebug(true, () =>
		debugUses.forEach(use =>
			use.used.concat(use.opUseDefault).forEach(_ => {
				registerLocal(_)
				useLocals.push(_)
			})))
	return useLocals
}

function verifyLines(lines) {
	const lineToLocals = new Map()
	let prevLocals = []
	let allNewLocals = []

	function processLine(line) {
		if (line instanceof Debug)
			// TODO: Do anything in this situation?
			// cx.check(!inDebug, line.loc, 'Redundant `debug`.')
			withInDebug(true, () => line.lines.forEach(processLine))
		else {
			verifyIsStatement(line)
			const lineNews = lineNewLocals(line)
			prevLocals.forEach(prevLocal =>
				lineNews.forEach(newLocal =>
					cx.check(
						prevLocal.name !== newLocal.name, newLocal.loc,
						`${code(newLocal.name)} already declared at ${prevLocal.loc.start}`)))
			lineNews.forEach(_ => registerLocal(_))
			const newLocals = prevLocals.concat(lineNews)
			lineToLocals.set(line, prevLocals)
			prevLocals = newLocals
			// Final set value is answer
			allNewLocals = newLocals
		}
	}

	lines.forEach(processLine)

	function verifyLine(line) {
		if (line instanceof Debug)
			withInDebug(true, () => line.lines.forEach(verifyLine))
		else
			plusLocals(lineToLocals.get(line), () =>
				plusPendingBlockLocals(allNewLocals, () =>
					line.verify()))
	}

	lines.forEach(verifyLine)

	return allNewLocals
}

function verifyIsStatement(line) {
	switch (true) {
		case line instanceof Do:
		// Some Vals are also conceptually Dos, but this was easier than multiple inheritance.
		case line instanceof Call:
		case line instanceof ELiteral && line.k === 'js':
		case line instanceof Special && line.k === 'debugger':
		// OK, used to mean `pass`
		case line instanceof GlobalAccess && line.name === 'null':
		case line instanceof Yield:
		case line instanceof YieldTo:
			return
		default:
			cx.fail(line.loc, 'Expression in statement position.')
	}
}

function lineNewLocals(line) {
	type(line, Expression)
	return line instanceof Assign ?
		[ line.assignee ] :
		line instanceof AssignDestructure ?
		line.assignees :
		[ ]
}
