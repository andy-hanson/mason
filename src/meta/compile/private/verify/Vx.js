import { code } from '../../CompileError'
import { LocalDeclare } from '../../Expression'
import { SubContext } from '../Cx'
import { assert } from '../U/util'
import { toArray } from '../U/Bag'
import { some } from '../U/Op'
import type from '../U/type'
import { emptyVr, VrLocalInfo } from '../Vr'

// Context used during verification.
export default class Vx extends SubContext {
	constructor(cx) {
		super(cx)
		this.locals = new Map()
		// Locals for this block.
		// Replaces `locals` when entering into sub-function.
		this.pendingBlockLocals = []
		this.isInDebug = false
		this.isInGenerator = false
		this.opLoop = []
		this.vr = emptyVr()
		// TODO:ES6 Just use localToInfo.keys()
		this.allLocalDeclares = [ ]
	}

	// Getters
	allLocalNames() {
		return this.locals.keys()
	}

	// Modifiers
	withInGenerator(isInGenerator, fun) {
		const g = this.isInGenerator
		this.isInGenerator = isInGenerator
		fun()
		this.isInGenerator = g
	}
	plusLocals(addedLocals, fun) {
		type(addedLocals, [LocalDeclare])
		const shadowed = new Map()
		addedLocals.forEach(l => {
			const got = this.locals.get(l.name)
			if (got !== undefined)
				shadowed.set(l.name, got)
			this.locals.set(l.name, l)
		})
		fun()
		addedLocals.forEach(l => {
			this.locals.delete(l.name)
			const s = shadowed.get(l.name)
			if (s !== undefined)
				this.locals.set(l.name, s)
		})
	}
	plusPendingBlockLocals(pending, fun) {
		const oldLength = this.pendingBlockLocals.length
		this.pendingBlockLocals.push(...pending)
		fun()
		while (this.pendingBlockLocals.length > oldLength)
			this.pendingBlockLocals.pop()
	}
	withInLoop(loop, fun) {
		const l = this.opLoop
		this.opLoop = some(loop)
		fun()
		this.opLoop = l
	}
	withInDebug(isInDebug, fun) {
		const d = this.isInDebug
		this.isInDebug = isInDebug
		fun()
		this.isInDebug = d
	}
	withRes(loc, fun) {
		// TODO: Bad idea to be creating new E at this point...
		const res = LocalDeclare.res(loc)
		this.registerLocal(res)
		return this.plusLocals([ res ], fun)
	}
	withBlockLocals(fun) {
		const bl = this.pendingBlockLocals
		this.pendingBlockLocals = []
		this.plusLocals(bl, fun)
		this.pendingBlockLocals = bl
	}

	// Vr setters
	setEndLoop(endLoop, loop) {
		this.vr.endLoopToLoop.set(endLoop, loop)
	}
	// TODO: Better name
	setEIsInGenerator(e) {
		this.vr.setEIsInGenerator(e, this.isInGenerator)
	}
	registerLocal(local) {
		type(local, LocalDeclare)
		assert(!this.vr.localToInfo.has(local))
		this.allLocalDeclares.push(local)
		this.vr.localToInfo.set(local, VrLocalInfo({
			isInDebug: this.isInDebug,
			debugAccesses: [],
			nonDebugAccesses: []
		}))
	}

	localAccess(access) {
		const name = access.name
		const local = this.locals.get(name)
		if (local !== undefined) {
			this.vr.accessToLocal.set(access, local)
			const info = this.vr.localToInfo.get(local)
			const accesses = this.isInDebug ? info.debugAccesses : info.nonDebugAccesses
			accesses.push(access)
		} else
			this.fail(access.loc,
				`Could not find local or global ${code(name)}.\n` +
				'Available locals are:\n' +
				`${code(toArray(this.allLocalNames()).join(' '))}.`)
	}
}
