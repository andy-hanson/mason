import assert from 'assert'
import { LocalDeclare } from '../Expression'
import Opts from '../Opts'
import { set } from '../U'
import { None, opIf } from '../U/Op'
import type from '../U/type'
import { ObjType } from '../U/types'
import Vr, { VrLocalInfo } from '../Vr'

// Context used during verification.
// Every property except vr is immutable.
// Every Vx shares the same Vr.
const Vx = ObjType('Vx', Object, {
	// Maps local names to LocalDeclares.
	locals: Map,
	// Locals map for this block.
	// Replaces `locals` when entering into sub-function.
	pendingBlockLocals: [LocalDeclare],
	loopNames: Set,
	isInDebug: Boolean,
	isInGenerator: Boolean,
	opts: Opts,
	vr: Vr
})
export default Vx

export function vxStart(opts) {
	return Vx({
		locals: new Map(),
		pendingBlockLocals: [],
		loopNames: new Set(),
		isInDebug: false,
		isInGenerator: false,
		opts: opts,
		vr: Vr({
			accessToLocal: new Map(),
			localToInfo: new Map(),
			eToIsInGenerator: new Map()
		})
	})
}

Object.assign(Vx.prototype, {
	allLocalNames() {
		return this.locals.keys()
	},
	hasLoop(name) {
		type(name, String)
		return this.loopNames.has(name)
	},
	inGenerator() {
		return set(this, 'isInGenerator', true)
	},
	notInGenerator() {
		return set(this, 'isInGenerator', false)
	},
	opGetLocal(name) {
		type(name, String)
		const locals = this.locals
		const got = locals.get(name)
		return opIf(got !== undefined, () => got)
	},
	plusLocals(addedLocals) {
		type(addedLocals, [LocalDeclare])
		const newLocals = new Map(this.locals)
		addedLocals.forEach(l => newLocals.set(l.name, l))
		return set(this, 'locals', newLocals)
	},
	plusLoop(name) {
		type(name, String)
		const newNames = new Set(this.loopNames)
		newNames.add(name)
		return set(this, 'loopNames', newNames)
	},
	setAccessToLocal(access, local) {
		this.vr.accessToLocal.set(access, local)
		const info = this.vr.localToInfo.get(local)
		const accesses = this.isInDebug ? info.debugAccesses : info.nonDebugAccesses
		accesses.push(access)
	},
	// TODO: Better name
	setEIsInGenerator(e) {
		this.vr.setEIsInGenerator(e, this.isInGenerator)
	},
	withDebug() { return set(this, 'isInDebug', true) },
	withFocus(span) {
		// TODO: Bad idea to be creating new E at this point...
		const utf = set(LocalDeclare.UntypedFocus(span), 'okToNotUse', true)
		this.registerLocal(utf)
		return this.plusLocals([utf])
	},
	withRes(span) {
		// TODO: Bad idea to be creating new E at this point...
		const res = LocalDeclare({
			span,
			name: 'res',
			opType: None,
			isLazy: false,
			okToNotUse: true
		})
		this.registerLocal(res)
		return this.plusLocals([res])
	},
	withBlockLocals() {
		return set(this.plusLocals(this.pendingBlockLocals), 'pendingBlockLocals', [])
	},
	registerLocal(local) {
		type(local, LocalDeclare)
		assert(!this.vr.localToInfo.has(local))
		this.vr.localToInfo.set(local, VrLocalInfo({
			isInDebug: this.isInDebug,
			debugAccesses: [],
			nonDebugAccesses: []
		}))
	}
})
