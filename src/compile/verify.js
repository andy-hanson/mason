"use strict"

const
	check = require("./check"),
	E = require("./E"),
	Lang = require("./Lang"),
	Op = require("./U/Op"),
	Opts = require("./Opts"),
	Sq = require("./U/Sq"),
	type = require("./U/type"),
	types = require("./U/types"),
	U = require("./U"),
	Vr = require("./Vr")

module.exports = function verify(e, opts) {
	type(e, E, opts, Opts)
	const vx = Vx.start(opts)
	e.verify(vx)
	verifyLocalUse(vx.vr, opts)
	return vx.vr
}

const verifyLocalUse = function(vr, opts) {
	const localToAccesses = vr.localToAccesses
	for (let local of localToAccesses.keys())
		check.warnIf(opts, Sq.isEmpty(localToAccesses.get(local)) && !local.okToNotUse,
			local.span,
			"Unused local variable " + U.code(local.name) + ".")
}

// Context used during verification.
// Every property except vr is immutable.
// Every Vx shares the same Vr.
const Vx = types.recordType("Vx", Object, {
	locals: Map, // Maps local names to E.LocalDeclares.
	loopNames: Set,
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
		const localToAccesses = this.vr.localToAccesses
		addedLocals.forEach(function(l) {
			newLocals.set(l.name, l)
			localToAccesses.set(l, [])
		})
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
		const accesses = this.vr.localToAccesses.get(local).push(access)
	},
	setEIsInGenerator: function(e) {
		this.vr.setEIsInGenerator(e, this.isInGenerator)
	},
	withFocus: function(span) {
		// TODO
		let utf = E.LocalDeclare.UntypedFocus(span)
		utf = U.with(utf, "okToNotUse", true)
		return this.plusLocals([utf])
	},
	// TODO: Is there a better way?
	withRes: function(span) {
		return this.plusLocals([E.LocalDeclare({
			span: span,
			name: "res",
			opType: Op.None,
			isLazy: false,
			okToNotUse: true
		})])
	}
})
Object.assign(Vx, {
	start: function(opts) {
		return Vx({
			locals: new Map(),
			loopNames: new Set(),
			isInGenerator: false,
			opts: opts,
			vr: Vr({
				accessToLocal: new Map(),
				localToAccesses: new Map(),
				eToIsInGenerator: new Map()
			})
		})
	}
})

const v = function(vx) {
	return function(e) { e.verify(vx) }
}
const vm = function(vx, es) {
	es.forEach(v(vx))
}

U.implementMany(E, "verify", {
	BlockBody: function(vx) {
		this.opIn.forEach(v(vx))
		const vxBlock = buildVxBlock(vx, this.lines)
		this.lines.forEach(v(vxBlock))
		this.opReturn.forEach(v(vxBlock))
		const vxOut = Sq.isEmpty(this.opReturn) ? vxBlock : vxBlock.withRes(this.span)
		this.opOut.forEach(v(vxOut))
	},
	BlockWrap: function(vx) {
		vx.setEIsInGenerator(this)
		v(vx)(this.body)
	},
	CaseDo: function(vx) {
		this.opCased.forEach(v(vx))
		const span = this.span
		const vxCase = Op.ifElse(this.opCased, function() { return vx.withFocus(span) }, function() { return vx })
		this.parts.forEach(v(vxCase))
		this.opElse.forEach(v(vxCase))
	},
	CaseVal: function(vx) {
		vx.setEIsInGenerator(this)
		E.CaseDo.prototype.verify.call(this, vx)
	},
	EndLoop: function(vx) {
		check(vx.hasLoop(this.name), this.span, "No loop called `"+this.name+"`")
	},
	Fun: function(vx) {
		this.opReturnType.forEach(v(vx))
		if (!Sq.isEmpty(this.opReturnType))
			check(!Sq.isEmpty(this.body.opReturn), this.span, "Function with return type must return something.")

		const argsLocals = this.args.map(function(arg) {
			arg.opType.forEach(v(vx))
			return arg
		})
		const vxGen = this.k === "~|" ? vx.inGenerator() : vx.notInGenerator()
		const vxBody = vxGen.plusLocals(argsLocals)
		v(vxBody)(this.body)
	},
	LocalAccess: function(vx) {
		const me = this
		Op.ifElse(vx.opGetLocal(this.name),
			function(l) { vx.setAccessToLocal(me, l) },
			function() {
				check.fail(me.span,
					"Could not find local `"+me.name+"`\n"+
					"Available locals are: [`"+Sq.toArray(vx.allLocalNames()).join("`, `")+"`]")
			})
	},
	Loop: function(vx) {
		v(vx.plusLoop(this.name))(this.body)
	},
	// Adding LocalDeclares to the available locals is done by Fun and buildVxBlockLine.
	LocalDeclare: function(vx) {
		this.opType.map(v(vx))
	},
	MapEntry: function(vx) {
		v(vx)(this.key)
		v(vx)(this.val)
	},
	Yield: function(vx) {
		check(vx.isInGenerator, this.span, "Cannot yield outside of generator context")
		v(vx)(this.yielded)
	},
	YieldTo: function(vx) {
		check(vx.isInGenerator, this.span, "Cannot yield outside of generator context")
		v(vx)(this.yieldedTo)
	},

	// These ones just recurse to their children.
	Assign: function(vx) { vm(vx, [this.assignee, this.value]) },
	AssignDestructure: function(vx) { vm(vx, Sq.cons(this.value, this.assignees)) },
	Call: function(vx) { vm(vx, Sq.cons(this.called, this.args)) },
	CasePart: function(vx) { vm(vx, [this.test, this.result]) },
	Debugger: U.ignore,
	DictReturn: function(vx) { vm(vx, this.opDicted) },
	Lazy: function(vx) { v(vx)(this.value) },
	ListReturn: U.ignore,
	ListEntry: function(vx) { v(vx)(this.value) },
	ListSimple: function(vx) { this.parts.map(v(vx)) },
	Literal: U.ignore,
	Map: U.ignore,
	Member: function(vx) { v(vx)(this.object) },
	Module: function(vx) { v(vx)(this.body) },
	ModuleDefaultExport: function(vx) { v(vx)(this.value) },
	Null: U.ignore,
	True: U.ignore,
	Quote: function(vx) { vm(vx, this.parts) },
	Require: U.ignore,
	Sub: function(vx) { vm(vx, Sq.cons(this.subject, this.subbers)) },
	This: U.ignore,
	TypeTest: function(vx) { vm(vx, [this.tested, this.testType]) },
})

const buildVxBlock = function(vxBefore, lines) {
	type(vxBefore, Vx, lines, [E])
	return lines.reduce(buildVxBlockLine, vxBefore)
}

const buildVxBlockLine = function(vx, line) {
	return type.isa(line, E.Assign) ?
		vx.plusLocals([line.assignee]) :
		type.isa(line, E.AssignDestructure) ?
		vx.plusLocals(line.assignees) :
		vx
}
