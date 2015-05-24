import { code } from '../CompileError'
import * as MsAstTypes from '../MsAst'
import { Assign, AssignDestructure, BlockVal, Call, Debug, Do, BagEntry, LocalDeclareRes,
	MapEntry, Pattern, SpecialDo, Yield, YieldTo } from '../MsAst'
import { assert, cat, eachReverse, head, ifElse, implementMany,
	isEmpty, mapKeys, newSet, opEach } from './util'
import VerifyResults, { LocalInfo } from './VerifyResults'

/*
The verifier generates information needed during transpiling, the VerifyResults.
*/
export default (_context, msAst) => {
	context = _context
	locals = new Map()
	pendingBlockLocals = [ ]
	isInDebug = isInGenerator = isInLoop = false
	results = new VerifyResults()

	msAst.verify()
	verifyLocalUse()

	const res = results
	// Release for garbage collection.
	context = locals = pendingBlockLocals = results = undefined
	return res
}

// Use a trick like in parse.js and have everything close over these mutable variables.
let
	context,
	// Map from names to LocalDeclares.
	locals,
	/*
	Locals for this block.
	These are added to locals when entering a Function or lazy evaluation.
	In:
		a = |
			b
		b = 1
	`b` will be a pending local.
	However:
		a = b
		b = 1
	will fail to verify, because `b` comes after `a` and is not accessed inside a function.
	It would work for `~a is b`, though.
	*/
	pendingBlockLocals,
	isInDebug,
	// Whether we are currently able to yield.
	isInGenerator,
	// Whether we are currently able to break.
	isInLoop,
	results

const
	verify = msAst => msAst.verify(),

	deleteLocal = localDeclare =>
		locals.delete(localDeclare.name),

	setLocal = localDeclare =>
		locals.set(localDeclare.name, localDeclare),

	// When a local is returned from a BlockObj or Module,
	// the return 'access' is considered to be 'debug' if the local is.
	accessLocalForReturn = (declare, access) => {
		const info = results.localDeclareToInfo.get(declare)
		_addLocalAccess(info, access, info.isInDebug)
	},

	accessLocal = (access, name) => {
		const declare = getLocalDeclare(name, access.loc)
		results.localAccessToDeclare.set(access, declare)
		_addLocalAccess(results.localDeclareToInfo.get(declare), access, isInDebug)
	},

	_addLocalAccess = (localInfo, access, isDebugAccess) =>
		(isDebugAccess ? localInfo.debugAccesses : localInfo.nonDebugAccesses).push(access),

	// For expressions affecting lineNewLocals, they will be registered before being verified.
	// So, LocalDeclare.verify just the type.
	// For locals not affecting lineNewLocals, use this instead of just declare.verify()
	verifyLocalDeclare = localDeclare => {
		registerLocal(localDeclare)
		localDeclare.verify()
	},

	registerLocal = localDeclare =>
		results.localDeclareToInfo.set(localDeclare, LocalInfo.empty(isInDebug))

// These functions change verifier state and efficiently return to the old state when finished.
const
	withInDebug = action => {
		const oldIsInDebug = isInDebug
		isInDebug = true
		action()
		isInDebug = oldIsInDebug
	},

	withInGenerator = (newIsInGenerator, action) => {
		const oldIsInGenerator = isInGenerator
		isInGenerator = newIsInGenerator
		action()
		isInGenerator = oldIsInGenerator
	},

	withInLoop = (newIsInLoop, action) => {
		const oldIsInLoop = isInLoop
		isInLoop = newIsInLoop
		action()
		isInLoop = oldIsInLoop
	},

	plusLocal = (addedLocal, action) => {
		const shadowed = locals.get(addedLocal.name)
		locals.set(addedLocal.name, addedLocal)
		action()
		if (shadowed === undefined)
			deleteLocal(addedLocal)
		else
			setLocal(shadowed)
	},

	// Should have verified that addedLocals all have different names.
	plusLocals = (addedLocals, action) => {
		const shadowedLocals = [ ]
		addedLocals.forEach(_ => {
			const shadowed = locals.get(_.name)
			if (shadowed !== undefined)
				shadowedLocals.push(shadowed)
			setLocal(_)
		})

		action()

		addedLocals.forEach(deleteLocal)
		shadowedLocals.forEach(setLocal)
	},

	verifyAndPlusLocal = (addedLocal, action) => {
		verifyLocalDeclare(addedLocal)
		plusLocal(addedLocal, action)
	},

	verifyAndPlusLocals = (addedLocals, action) => {
		addedLocals.forEach(verifyLocalDeclare)
		const names = new Set()
		addedLocals.forEach(_ => {
			context.check(!names.has(_.name), _.loc, () =>
				`Duplicate local ${code(_.name)}`)
			names.add(_.name)
		})
		plusLocals(addedLocals, action)
	},

	withBlockLocals = action => {
		const oldPendingBlockLocals = pendingBlockLocals
		pendingBlockLocals = [ ]
		plusLocals(oldPendingBlockLocals, action)
		pendingBlockLocals = oldPendingBlockLocals
	}

const verifyLocalUse = () =>
	results.localDeclareToInfo.forEach((info, local) => {
		if (!(local instanceof LocalDeclareRes)) {
			const noNonDebug = isEmpty(info.nonDebugAccesses)
			if (noNonDebug && isEmpty(info.debugAccesses))
				context.warn(local.loc, () => `Unused local variable ${code(local.name)}.`)
			else if (info.isInDebug)
				context.warnIf(!noNonDebug, () => head(info.nonDebugAccesses).loc, () =>
					`Debug-only local ${code(local.name)} used outside of debug.`)
			else
				context.warnIf(noNonDebug, local.loc, () =>
					`Local ${code(local.name)} used only in debug.`)
		}
	})

implementMany(MsAstTypes, 'verify', {
	Assign() {
		const doV = () => {
			// Assignee registered by verifyLines.
			this.assignee.verify()
			this.value.verify()
		}
		if (this.assignee.isLazy())
			withBlockLocals(doV)
		else
			doV()
	},

	AssignDestructure() {
		this.value.verify()
		// Assignees registered by verifyLines.
		this.assignees.forEach(verify)
	},

	AssignMutate() {
		const declare = getLocalDeclare(this.name, this.loc)
		context.check(declare.isMutable(), this.loc, () => `${code(this.name)} is not mutable.`)
		// TODO: Track assignments. Mutable local must be mutated somewhere.
		this.value.verify()
	},

	BagEntry() {
		accessLocal(this, 'built')
		this.value.verify()
	},

	BagSimple() { this.parts.forEach(verify) },

	BlockDo() { verifyLines(this.lines) },

	BlockWithReturn() {
		const newLocals = verifyLines(this.lines)
		plusLocals(newLocals, () => this.returned.verify())
	},

	BlockObj() {
		const newLocals = verifyLines(this.lines)
		this.keys.forEach(_ => accessLocalForReturn(_, this))
		opEach(this.opObjed, _ => plusLocals(newLocals, () => _.verify()))
	},

	BlockBag: verifyBlockBagOrMap,
	BlockMap: verifyBlockBagOrMap,

	// BlockWrap uses IIFE, so can't break loop.
	// block will set buildType.
	BlockWrap() { withInLoop(false, () => this.block.verify()) },

	BreakDo() {
		if (!isInLoop)
			context.fail(this.loc, 'Not in a loop.')
	},

	Call() {
		this.called.verify()
		this.args.forEach(verify)
	},

	CaseDo() { verifyCase(this) },
	CaseDoPart: verifyCasePart,
	// CaseVal uses IIFE, so can't break loop
	CaseVal() { withInLoop(false, () => verifyCase(this)) },
	CaseValPart: verifyCasePart,

	// Only reach here for in/out condition
	Debug() { verifyLines([ this ]) },

	ForDoPlain() { withInLoop(true, () => this.block.verify()) },

	ForDoWithBag() {
		this.bag.verify()
		verifyAndPlusLocal(this.element, () => withInLoop(true, () => this.block.verify()))
	},

	Fun() {
		withBlockLocals(() => {
			context.check(this.opResDeclare === null || this.block instanceof BlockVal, this.loc,
				'Function with return condition must return something.')
			withInGenerator(this.isGenerator, () =>
				withInLoop(false, () => {
					const allArgs = cat(this.args, this.opRestArg)
					verifyAndPlusLocals(allArgs, () => {
						opEach(this.opIn, verify)
						this.block.verify()
						opEach(this.opResDeclare, verifyLocalDeclare)
						const verifyOut = () => opEach(this.opOut, _ => _.verify())
						ifElse(this.opResDeclare, _ => plusLocal(_, verifyOut), verifyOut)
					})
				}))
		})
	},

	GlobalAccess() { },

	IfDo: ifOrUnlessDo,

	Lazy() { withBlockLocals(() => this.value.verify()) },

	LocalAccess() { accessLocal(this, this.name) },

	// Adding LocalDeclares to the available locals is done by Fun or lineNewLocals.
	LocalDeclare() { opEach(this.opType, verify) },

	NumberLiteral() { },

	MapEntry() {
		accessLocal(this, 'built')
		this.key.verify()
		this.val.verify()
	},

	Member() { this.object.verify() },

	Module() {
		// No need to verify this.doUses.
		this.uses.forEach(verify)
		withInDebug(() => this.debugUses.forEach(verify))
		const newLocals = verifyLines(this.lines)
		this.exports.forEach(_ => accessLocalForReturn(_, this))
		opEach(this.opDefaultExport, _ => plusLocals(newLocals, () => _.verify()))

		const exports = newSet(this.exports)
		const markExportLines = line => {
			if (line instanceof Assign && exports.has(line.assignee) ||
				line instanceof AssignDestructure && line.assignees.some(_ => exports.has(_)))
				results.exportAssigns.add(line)
			else if (line instanceof Debug)
				line.lines.forEach(markExportLines)
		}
		this.lines.forEach(markExportLines)
	},

	ObjSimple() {
		const keys = new Set()
		this.pairs.forEach(pair => {
			context.check(!keys.has(pair.key), pair.loc, () => `Duplicate key ${pair.key}`)
			keys.add(pair.key)
			pair.value.verify()
		})
	},

	Quote() {
		this.parts.forEach(_ => {
			if (typeof _ !== 'string')
				_.verify()
		})
	},

	SpecialDo() { },

	SpecialVal() { },

	Splat() { this.splatted.verify() },

	UnlessDo: ifOrUnlessDo,

	Use() {
		// Since Uses are always in the outermost scope, don't have to worry about shadowing.
		// So we mutate `locals` directly.
		const addUseLocal = _ => {
			const prev = locals.get(_.name)
			context.check(prev === undefined, _.loc, () =>
				`${code(_.name)} already imported at ${prev.loc}`)
			verifyLocalDeclare(_)
			setLocal(_)
		}
		this.used.forEach(addUseLocal)
		opEach(this.opUseDefault, addUseLocal)
	},

	Yield() {
		context.check(isInGenerator, this.loc, 'Cannot yield outside of generator context')
		this.yielded.verify()
	},

	YieldTo() {
		context.check(isInGenerator, this.loc, 'Cannot yield outside of generator context')
		this.yieldedTo.verify()
	}
})

function ifOrUnlessDo() {
	this.test.verify()
	this.result.verify()
}

function verifyBlockBagOrMap() {
	verifyAndPlusLocal(this.built, () => verifyLines(this.lines))
}

const verifyCase = _ => {
	const doIt = () => {
		_.parts.forEach(verify)
		opEach(_.opElse, verify)
	}
	ifElse(_.opCased,
		_ => {
			_.verify()
			verifyAndPlusLocal(_.assignee, doIt)
		},
		doIt)
}

function verifyCasePart() {
	if (this.test instanceof Pattern) {
		this.test.type.verify()
		this.test.patterned.verify()
		verifyAndPlusLocals(this.test.locals, () => this.result.verify())
	} else {
		this.test.verify()
		this.result.verify()
	}
}

const
	getLocalDeclare = (name, accessLoc) => {
		const declare = locals.get(name)
		context.check(declare !== undefined, accessLoc, () =>
			`No such local ${code(name)}.\nLocals are:\n${code(mapKeys(locals).join(' '))}.`)
		return declare
	},

	lineNewLocals = line =>
		line instanceof Assign ?
			[ line.assignee ] :
			line instanceof AssignDestructure ?
			line.assignees :
			[ ],

	verifyLines = lines => {
		/*
		We need to bet all block locals up-front because
		Functions within lines can access locals from later lines.
		NOTE: We push these onto pendingBlockLocals in reverse
		so that when we iterate through lines forwards, we can pop from pendingBlockLocals
		to remove pending locals as they become real locals.
		It doesn't really matter what order we add locals in since it's not allowed
		to have two locals of the same name in the same block.
		*/
		const newLocals = [ ]

		const getLineLocals = line => {
			if (line instanceof Debug)
				withInDebug(() => eachReverse(line.lines, getLineLocals))
			else
				eachReverse(lineNewLocals(line), _ => {
					// Register the local now. Can't wait until the assign is verified.
					registerLocal(_)
					newLocals.push(_)
				})
		}
		eachReverse(lines, getLineLocals)
		pendingBlockLocals.push(...newLocals)

		/*
		Keeps track of locals which have already been added in this block.
		Mason allows shadowing, but not within the same block.
		So, this is allowed:
			a = 1
			b =
				a = 2
				...
		But not:
			a = 1
			a = 2
		*/
		const thisBlockLocalNames = new Set()

		// All shadowed locals for this block.
		const shadowed = [ ]

		const verifyLine = line => {
			if (line instanceof Debug)
				// TODO: Do anything in this situation?
				// context.check(!inDebug, line.loc, 'Redundant `debug`.')
				withInDebug(() => line.lines.forEach(verifyLine))
			else {
				verifyIsStatement(line)
				lineNewLocals(line).forEach(newLocal => {
					const name = newLocal.name
					const oldLocal = locals.get(name)
					if (oldLocal !== undefined) {
						context.check(!thisBlockLocalNames.has(name), newLocal.loc,
							() => `A local ${code(name)} is already in this block.`)
						shadowed.push(oldLocal)
					}
					thisBlockLocalNames.add(name)
					setLocal(newLocal)

					// Now that it's added as a local, it's no longer pending.
					// We added pendingBlockLocals in the right order that we can just pop them off.
					const popped = pendingBlockLocals.pop()
					assert(popped === newLocal)
				})
				line.verify()
			}
		}

		lines.forEach(verifyLine)

		newLocals.forEach(deleteLocal)
		shadowed.forEach(_ => setLocal(_))

		return newLocals
	},

	verifyIsStatement = line => {
		const isStatement =
			line instanceof Do ||
			line instanceof Call ||
			line instanceof Yield ||
			line instanceof YieldTo ||
			line instanceof BagEntry ||
			line instanceof MapEntry ||
			line instanceof SpecialDo
		context.check(isStatement, line.loc, 'Expression in statement position.')
	}
