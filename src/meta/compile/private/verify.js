import { code } from '../CompileError'
import * as EExports from '../Expression'
import { Assign, AssignDestructure, BlockVal, Call, Debug, Do, GlobalAccess,
	Pattern, Special, UseDo, Yield, YieldTo } from '../Expression'
import { head, isEmpty } from './U/Bag'
import { ifElse, some } from './U/Op'
import { implementMany, mapKeys } from './U/util'
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
			cx.warnIf(!noNonDebug, () => head(info.nonDebugAccesses).loc, () =>
				`Debug-only local ${code(local.name)} used outside of debug.`)
		else
			cx.warnIf(!local.okToNotUse && noNonDebug, local.loc, () =>
				`Local ${code(local.name)} used only in debug.`)
	})
}

implementMany(EExports, 'verify', {
	Assign() {
		const doV = () => {
			this.assignee.verify()
			this.value.verify()
		}
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
		ifElse(opLoop,
			loop => setEndLoop(this, loop),
			() => cx.fail(this.loc, 'Not in a loop.'))
	},
	Fun() {
		withBlockLocals(() => {
			cx.check(isEmpty(this.opResDeclare) || this.block instanceof BlockVal, this.loc,
				'Function with return condition must return something.')
			this.args.forEach(arg => vm(arg.opType))
			withInGenerator(this.isGenerator, () => {
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
	LocalAccess() {
		const local = locals.get(this.name)
		if (local !== undefined) {
			vr.accessToLocal.set(this, local)
			const info = vr.localToInfo.get(local)
			const accesses = isInDebug ? info.debugAccesses : info.nonDebugAccesses
			accesses.push(this)
		} else
			cx.fail(this.loc,
				`Could not find local or global ${code(this.name)}.\n` +
				'Available locals are:\n' +
				`${code(mapKeys(locals).join(' '))}.`)
	},
	Loop() { withInLoop(this, () => this.block.verify()) },
	// Adding LocalDeclares to the available locals is done by Fun or lineNewLocals.
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
		const keys = new Set()
		this.pairs.forEach(pair => {
			cx.check(!keys.has(pair.key), pair.loc, () => `Duplicate key ${pair.key}`)
			keys.add(pair.key)
			pair.value.verify()
		})
	},
	Lazy() { withBlockLocals(() => this.value.verify()) },
	ListReturn() { },
	ListEntry() { this.value.verify() },
	ListSimple() { vm(this.parts) },
	NumberLiteral() { },
	MapReturn() { },
	Member() { this.object.verify() },
	ModuleDefaultExport() { this.value.verify() },
	Quote() {
		this.parts.forEach(_ => {
			if (typeof _ !== 'string')
				_.verify()
		})
	},
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
	if (this.test instanceof Pattern) {
		this.test.type.verify()
		this.test.patterned.verify()
		vm(this.test.locals)
		this.test.locals.forEach(registerLocal)
		plusLocals(this.test.locals, () => this.result.verify())
	} else {
		this.test.verify()
		this.result.verify()
	}
}

const
	verifyUses = (uses, debugUses) => {
		const useLocals = []
		const
			verifyUse = use => {
				use.used.forEach(useLocal)
				use.opUseDefault.forEach(useLocal)
			},
			useLocal = _ => {
				registerLocal(_)
				useLocals.push(_)
			}
		uses.forEach(use => {
			if (!(use instanceof UseDo)) verifyUse(use)
		})
		withInDebug(true, () => debugUses.forEach(verifyUse))
		return useLocals
	},

	verifyLines = lines => {
		const allNewLocals = [ ]
		// First, get locals for the whole block.
		const getLineLocals = line => {
			if (line instanceof Debug)
				withInDebug(true, () => line.lines.forEach(getLineLocals))
			else {
				const news = lineNewLocals(line)
				news.forEach(registerLocal)
				allNewLocals.push(...news)
			}
		}

		lines.forEach(getLineLocals)

		const thisBlockLocalNames = new Set()
		const shadowed = new Map()

		const verifyLine = line => {
			if (line instanceof Debug)
				// TODO: Do anything in this situation?
				// cx.check(!inDebug, line.loc, 'Redundant `debug`.')
				withInDebug(true, () => line.lines.forEach(verifyLine))
			else {
				verifyIsStatement(line)
				lineNewLocals(line).forEach(l => {
					const got = locals.get(l.name)
					if (got !== undefined) {
						cx.check(!thisBlockLocalNames.has(l.name), l.loc,
							() => `A local ${code(l.name)} is already in this block.`)
						shadowed.set(l.name, got)
					}
					locals.set(l.name, l)
					thisBlockLocalNames.add(l.name)
				})
				line.verify()
			}
		}

		plusPendingBlockLocals(allNewLocals, () =>
			lines.forEach(verifyLine))

		allNewLocals.forEach(l => {
			const s = shadowed.get(l.name)
			if (s === undefined)
				locals.delete(l.name)
			else
				locals.set(l.name, s)
		})

		return allNewLocals
	},

	verifyIsStatement = line => {
		switch (true) {
			case line instanceof Do:
			// Some Vals are also conceptually Dos, but this was easier than multiple inheritance.
			case line instanceof Call:
			case line instanceof Yield:
			case line instanceof YieldTo:
			case line instanceof Special && line.k === 'debugger':
			// OK, used to mean `pass`
			case line instanceof GlobalAccess && line.name === 'null':
				return
			default:
				cx.fail(line.loc, 'Expression in statement position.')
		}
	},

	lineNewLocals = line =>
		line instanceof Assign ?
			[ line.assignee ] :
			line instanceof AssignDestructure ?
			line.assignees :
			[ ]
