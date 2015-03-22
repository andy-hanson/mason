const
	assert = require("assert"),
	E = require("../E"),
	Op = require("../U/Op"),
	Opts = require("../Opts"),
	type = require("../U/type"),
	types = require("../U/types"),
	U = require("../U"),
	Vr = require("../Vr")

// Context used during verification.
// Every property except vr is immutable.
// Every Vx shares the same Vr.
const Vx = module.exports = types.recordType("Vx", Object, {
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
Object.assign(Vx.prototype, {
	allLocalNames: function() {
		return this.locals.keys()
	},
	hasLoop: function(name) {
		type(name, String)
		return this.loopNames.has(name)
	},
	inGenerator: function() {
		return U.with(this, "isInGenerator", true)
	},
	notInGenerator: function() {
		return U.with(this, "isInGenerator", false)
	},
	opGetLocal: function(name) {
		type(name, String)
		const locals = this.locals
		return Op.if(locals.has(name), function() { return locals.get(name) })
	},
	plusLocals: function(addedLocals) {
		type(addedLocals, [E.LocalDeclare])
		const newLocals = new Map(this.locals)
		addedLocals.forEach(function(l) { newLocals.set(l.name, l) })
		return U.with(this, "locals", newLocals)
	},
	plusLoop: function(name) {
		type(name, String)
		const newNames = new Set(this.loopNames)
		newNames.add(name)
		return U.with(this, "loopNames", newNames)
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
	withDebug: function() { return U.with(this, "isInDebug", true) },
	withFocus: function(span) {
		// TODO: Bad idea to be creating new E at this point...
		const utf = U.with(E.LocalDeclare.UntypedFocus(span), "okToNotUse", true)
		this.registerLocal(utf)
		return this.plusLocals([utf])
	},
	withRes: function(span) {
		// TODO: Bad idea to be creating new E at this point...
		const res = E.LocalDeclare({
			span: span,
			name: "res",
			opType: Op.None,
			isLazy: false,
			okToNotUse: true
		})
		this.registerLocal(res)
		return this.plusLocals([res])
	},
	// TODO
	withBlockLocals: function() {
		return U.with(this.plusLocals(this.pendingBlockLocals), "pendingBlockLocals", [])
	},

	registerLocal: function(local) {
		assert(!this.vr.localToInfo.has(local))
		this.vr.localToInfo.set(local, Vr.LocalInfo({
			isInDebug: this.isInDebug,
			debugAccesses: [],
			nonDebugAccesses: []
		}))
	}
})
Object.assign(Vx, {
	start: function(opts) {
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
})
