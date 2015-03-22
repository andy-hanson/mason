import assert from "assert"
import Opts from "../Opts"
import { set } from "../U"
import { None, opIf } from "../U/Op"
import type from "../U/type"
import { recordType } from "../U/types"
import Vr, { VrLocalInfo } from "../Vr"
const
	E = require("../E")

// Context used during verification.
// Every property except vr is immutable.
// Every Vx shares the same Vr.
const Vx = recordType("Vx", Object, {
	// Maps local names to E.LocalDeclares.
	locals: Map,
	// Locals map for this block.
	// Replaces `locals` when entering into sub-function.
	pendingBlockLocals: [E.LocalDeclare],
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
	allLocalNames: function() {
		return this.locals.keys()
	},
	hasLoop: function(name) {
		type(name, String)
		return this.loopNames.has(name)
	},
	inGenerator: function() {
		return set(this, "isInGenerator", true)
	},
	notInGenerator: function() {
		return set(this, "isInGenerator", false)
	},
	opGetLocal: function(name) {
		type(name, String)
		const locals = this.locals
		return opIf(locals.has(name), function() { return locals.get(name) })
	},
	plusLocals: function(addedLocals) {
		type(addedLocals, [E.LocalDeclare])
		const newLocals = new Map(this.locals)
		addedLocals.forEach(function(l) { newLocals.set(l.name, l) })
		return set(this, "locals", newLocals)
	},
	plusLoop: function(name) {
		type(name, String)
		const newNames = new Set(this.loopNames)
		newNames.add(name)
		return set(this, "loopNames", newNames)
	},
	setAccessToLocal: function(access, local) {
		this.vr.accessToLocal.set(access, local)
		const info = this.vr.localToInfo.get(local)
		const accesses = this.isInDebug ? info.debugAccesses : info.nonDebugAccesses
		accesses.push(access)
	},
	// TODO: Better name
	setEIsInGenerator: function(e) {
		this.vr.setEIsInGenerator(e, this.isInGenerator)
	},
	withDebug: function() { return set(this, "isInDebug", true) },
	withFocus: function(span) {
		// TODO: Bad idea to be creating new E at this point...
		const utf = set(E.LocalDeclare.UntypedFocus(span), "okToNotUse", true)
		this.registerLocal(utf)
		return this.plusLocals([utf])
	},
	withRes: function(span) {
		// TODO: Bad idea to be creating new E at this point...
		const res = E.LocalDeclare({
			span: span,
			name: "res",
			opType: None,
			isLazy: false,
			okToNotUse: true
		})
		this.registerLocal(res)
		return this.plusLocals([res])
	},
	// TODO
	withBlockLocals: function() {
		return set(this.plusLocals(this.pendingBlockLocals), "pendingBlockLocals", [])
	},

	registerLocal: function(local) {
		assert(!this.vr.localToInfo.has(local))
		this.vr.localToInfo.set(local, VrLocalInfo({
			isInDebug: this.isInDebug,
			debugAccesses: [],
			nonDebugAccesses: []
		}))
	}
})
