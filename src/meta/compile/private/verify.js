import { code } from '../CompileError'
import * as EExports from '../Expression'
import { Assign, AssignDestructure, BlockVal, Call, Debug, Do, GlobalAccess, ListEntry, ListReturn,
	LocalDeclareRes, MapEntry, MapReturn, Pattern, Special, SP_Debugger, UseDo, Yield, YieldTo
	} from '../Expression'
import { cat, head, isEmpty } from './U/Bag'
import { ifElse, opEach } from './U/op'
import { assert, implementMany, mapKeys, newSet } from './U/util'
import Vr, { VrLocalInfo } from './Vr'

const vm = es => es.forEach(e => e.verify())
const vop = op => opEach(op, _ => _.verify())

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
		opLoop = null
		vr = new Vr()
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
		opLoop = loop
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

	accessLocal = (declare, access, isDebugAccess) =>
		_addAccess(vr.localToInfo.get(declare), access, isDebugAccess),
	accessLocalForReturn = (declare, access) => {
		const info = vr.localToInfo.get(declare)
		_addAccess(info, access, info.isInDebug)
	},
	_addAccess = (localInfo, access, isDebugAccess) =>
		(isDebugAccess ? localInfo.debugAccesses : localInfo.nonDebugAccesses).push(access),


	// Vr setters
	setEndLoop = (endLoop, loop) => {
		vr.endLoopToLoop.set(endLoop, loop)
	},

	registerLocal = local => {
		vr.localToInfo.set(local, VrLocalInfo(	isInDebug, [], []))
	},

	setEntryIndex = (listMapEntry, index) => {
		vr.entryToIndex.set(listMapEntry, index)
	},

	maybeSetListMapLength = (returner, length) => {
		if (returner instanceof ListReturn || returner instanceof MapReturn)
			vr.returnToLength.set(returner, length)
		else
			assert(length === 0)
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
		if (!(local instanceof LocalDeclareRes)) {
			const noNonDebug = isEmpty(info.nonDebugAccesses)
			if (noNonDebug && isEmpty(info.debugAccesses))
				cx.warn(local.loc, () => `Unused local variable ${code(local.name)}.`)
			else if (info.isInDebug)
				cx.warnIf(!noNonDebug, () => head(info.nonDebugAccesses).loc, () =>
					`Debug-only local ${code(local.name)} used outside of debug.`)
			else
				cx.warnIf(noNonDebug, local.loc, () =>
					`Local ${code(local.name)} used only in debug.`)
		}
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
		const { newLocals, listMapLength } = verifyLines(this.lines)
		maybeSetListMapLength(this.returned, listMapLength)
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
		ifElse(opLoop, _ => setEndLoop(this, _), () => cx.fail(this.loc, 'Not in a loop.'))
	},
	Fun() {
		withBlockLocals(() => {
			cx.check(this.opResDeclare === null || this.block instanceof BlockVal, this.loc,
				'Function with return condition must return something.')
			this.args.forEach(arg => vop(arg.opType))
			withInGenerator(this.isGenerator, () => {
				const allArgs = cat(this.args, this.opRestArg)
				allArgs.forEach(_ => registerLocal(_))
				plusLocals(allArgs, () => {
					vop(this.opIn)
					this.block.verify()
					opEach(this.opResDeclare, _ => {
						_.verify()
						registerLocal(_)
					})
					const verifyOut = () => opEach(this.opOut, _ => _.verify())
					ifElse(this.opResDeclare, rd => plusLocals([ rd ], verifyOut), verifyOut)
				})
			})
		})
	},
	LocalAccess() {
		const declare = locals.get(this.name)
		cx.check(declare !== undefined, this.loc, () =>
			`No such local ${code(this.name)}.\nLocals are:\n${code(mapKeys(locals).join(' '))}.`)
		vr.accessToLocal.set(this, declare)
		accessLocal(declare, this, isInDebug)
	},
	Loop() { withInLoop(this, () => this.block.verify()) },
	// Adding LocalDeclares to the available locals is done by Fun or lineNewLocals.
	LocalDeclare() { vop(this.opType) },
	MapEntry() {
		this.key.verify()
		this.val.verify()
	},
	Module() {
		const useLocals = verifyUses(this.uses, this.debugUses)
		plusLocals(useLocals, () => {
			const { newLocals, listMapLength } = verifyLines(this.lines)
			this.exports.forEach(ex => accessLocalForReturn(ex, this))
			opEach(this.opDefaultExport, def => {
				maybeSetListMapLength(def, listMapLength)
				plusLocals(newLocals, () => def.verify())
			})
		})

		const exports = newSet(this.exports)
		const markExportLines = line => {
			if (line instanceof Assign && exports.has(line.assignee) ||
				line instanceof AssignDestructure && line.assignees.some(_ => exports.has(_)))
				vr.exportAssigns.add(line)
			else if (line instanceof Debug)
				line.lines.forEach(markExportLines)
		}
		this.lines.forEach(markExportLines)
	},
	ObjReturn() {
		vop(this.opObjed)
		this.keys.forEach(key => accessLocalForReturn(key, this))
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
	opEach(this.opCased, _ => {
		registerLocal(_.assignee)
		_.verify()
		newLocals.push(_.assignee)
	})
	plusLocals(newLocals, () => {
		vm(this.parts)
		vop(this.opElse)
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
				opEach(use.opUseDefault, useLocal)
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
		const newLocals = [ ]
		// First, get locals for the whole block.
		const getLineLocals = line => {
			if (line instanceof Debug)
				withInDebug(true, () => line.lines.forEach(getLineLocals))
			else {
				const news = lineNewLocals(line)
				news.forEach(registerLocal)
				newLocals.push(...news)
			}
		}

		lines.forEach(getLineLocals)

		const thisBlockLocalNames = new Set()
		const shadowed = new Map()

		let listMapLength = 0

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
				if (line instanceof ListEntry || line instanceof MapEntry) {
					setEntryIndex(line, listMapLength)
					listMapLength = listMapLength + 1
				}
				line.verify()
			}
		}

		plusPendingBlockLocals(newLocals, () => lines.forEach(verifyLine))

		newLocals.forEach(l => {
			const s = shadowed.get(l.name)
			if (s === undefined)
				locals.delete(l.name)
			else
				locals.set(l.name, s)
		})

		return { newLocals, listMapLength }
	},

	verifyIsStatement = line => {
		switch (true) {
			case line instanceof Do:
			// Some Vals are also conceptually Dos, but this was easier than multiple inheritance.
			case line instanceof Call:
			case line instanceof Yield:
			case line instanceof YieldTo:
			case line instanceof Special && line.kind === SP_Debugger:
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
