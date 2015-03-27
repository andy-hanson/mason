import assert from 'assert'
import { LocalDeclare, Loop } from '../Expression'
import Opts from '../Opts'
import { set } from '../U'
import { isEmpty } from '../U/Bag'
import Op, { None, opIf, some } from '../U/Op'
import type from '../U/type'
import { ObjType } from '../U/types'
import Vr, { VrLocalInfo } from '../Vr'

// Context used during verification.
export default class Vx {
	constructor(opts) {
		this.opts = opts
		this.locals = new Map()
		// Locals for this block.
		// Replaces `locals` when entering into sub-function.
		this.pendingBlockLocals = []
		this.isInDebug = false
		this.isInGenerator = false
		this.opLoop = []
		this.vr = new Vr({
			accessToLocal: new Map(),
			localToInfo: new Map(),
			eToIsInGenerator: new Map(),
			endLoopToLoop: new Map()
		})
	}

	// Getters
	allLocalNames() {
		return this.locals.keys()
	}
	opGetLocal(name) {
		type(name, String)
		const got = this.locals.get(name)
		return opIf(got !== undefined, () => got)
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
	withFocus(span, fun) {
		// TODO: Bad idea to be creating new E at this point...
		const utf = set(LocalDeclare.UntypedFocus(span), 'okToNotUse', true)
		this.registerLocal(utf)
		this.plusLocals([utf], fun)
	}
	withRes(span, fun) {
		// TODO: Bad idea to be creating new E at this point...
		const res = LocalDeclare({
			span,
			name: 'res',
			opType: None,
			isLazy: false,
			okToNotUse: true
		})
		this.registerLocal(res)
		return this.plusLocals([res], fun)
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
	setAccessToLocal(access, local) {
		this.vr.accessToLocal.set(access, local)
		const info = this.vr.localToInfo.get(local)
		const accesses = this.isInDebug ? info.debugAccesses : info.nonDebugAccesses
		accesses.push(access)
	}
	// TODO: Better name
	setEIsInGenerator(e) {
		this.vr.setEIsInGenerator(e, this.isInGenerator)
	}
	registerLocal(local) {
		type(local, LocalDeclare)
		assert(!this.vr.localToInfo.has(local))
		this.vr.localToInfo.set(local, VrLocalInfo({
			isInDebug: this.isInDebug,
			debugAccesses: [],
			nonDebugAccesses: []
		}))
	}
}
