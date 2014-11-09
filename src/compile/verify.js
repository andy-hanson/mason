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
	return vx.vr
}

// Context used during verification.
// Every property except vr is immutable.
// Every Vx shares the same Vr.
const Vx = types.recordType("Vx", Object, {
	localToK: Map, // Maps local names to klocal.
	loopNames: Set,
	isInGenerator: Boolean,
	opts: Opts,
	vr: Vr
})
Object.assign(Vx.prototype, {
	allLocalNames: function() {
		return this.localToK.keys()
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
		const l = this.localToK
		return Op.if(l.has(name), function() { return l.get(name) })
	},
	plusLocals: function(newLocals) {
		type(newLocals, [Object])
		const newLocalToK = new Map(this.localToK)
		newLocals.forEach(function(_) {
			type(_.name, String, _.k, Lang.KLocal)
			newLocalToK.set(_.name, _.k)
		})
		return U.with(this, "localToK", newLocalToK)
	},
	plusLoop: function(name) {
		type(name, String)
		const newNames = new Set(this.loopNames)
		newNames.add(name)
		return U.with(this, "loopNames", newNames)
	},
	setAccessToK: function(access, k) {
		this.vr.accessToK.set(access, k)
	},
	setEIsInGenerator: function(e) {
		this.vr.setEIsInGenerator(e, this.isInGenerator)
	},
	withFocus: function() {
		return this.plusLocals([{ name: "_", k: "const" }])
	},
	withRes: function() {
		return this.plusLocals([{ name: "res", k: "const" }])
	}
})
Object.assign(Vx, {
	start: function(opts) {
		return Vx({
			localToK: new Map(),
			loopNames: new Set(),
			isInGenerator: false,
			opts: opts,
			vr: Vr({ accessToK: new Map(), eToIsInGenerator: new Map() }) // TODO: VrBuilder
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
		this.opOut.forEach(v(vxBlock.withRes()))
	},
	BlockWrap: function(vx) {
		vx.setEIsInGenerator(this)
		v(vx)(this.body)
	},
	CaseDo: function(vx) {
		this.opCased.forEach(v(vx))
		const vxCase = vx.withFocus()
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
		const argsLocals = this.args.map(function(arg) {
			arg.opType.forEach(v(vx))
			return { name: arg.name, k: arg.isLazy ? "lazy" : "const" }
		})
		const vxGen = this.k === "~|" ? vx.inGenerator() : vx.notInGenerator()
		const vxBody = vxGen.plusLocals(argsLocals)
		v(vxBody)(this.body)
	},
	LocalAccess: function(vx) {
		const me = this
		Op.ifElse(vx.opGetLocal(this.name),
			function(k) { vx.setAccessToK(me, k) },
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
	Dict: function(vx) { vm(vx, this.opDicted) },
	JSKeyword: U.ignore,
	Lazy: function(vx) { v(vx)(this.value) },
	List: U.ignore,
	ListEntry: function(vx) { v(vx)(this.value) },
	Literal: U.ignore,
	Member: function(vx) { v(vx)(this.object) },
	Module: function(vx) { v(vx)(this.body) },
	ModuleDefaultExport: function(vx) { v(vx)(this.value) },
	Quote: function(vx) { vm(vx, this.parts) },
	Require: U.ignore,
	Sub: function(vx) { vm(vx, Sq.cons(this.subject, this.subbers)) },
	TypeTest: function(vx) { vm(vx, [this.tested, this.testType]) },
})

const buildVxBlock = function(vxBefore, lines) {
	type(vxBefore, Vx, lines, [E])
	return lines.reduce(buildVxBlockLine, vxBefore)
}

const buildVxBlockLine = function(vx, line) {
	if (type.isa(line, E.Assign)) {
		checkAssign(vx, line.assignee, line.k)
		return vx.plusLocals(opKLocalFromKAssign(line.k).map(function(k) { return {
			name: line.assignee.name,
			k: k
		}}))
	}
	if (type.isa(line, E.AssignDestructure)) {
		line.assignees.forEach(function(_) { checkAssign(vx, _, line.k) })
		return vx.plusLocals(Sq.mpf(opKLocalFromKAssign(line.k), function(k) {
			return line.assignees.map(function(ass) {
				return {
					name: ass.name,
					k: k
				}
			})
		}))
	}
	return vx
}

const checkAssign = function(vx, assignee, kAssign) {
	const span = assignee.span
	const name = assignee.name
	Op.ifElse(vx.opGetLocal(name),
		function(kLocal) {
			if (kAssign === ":=")
				check(kLocal === "mutable", span, "Tried to assign to immutable value `"+name+"`")
			else
				check(kLocal !== "mutable", span, "Mutating `"+name+"` requires `:=`")
		},
		function() {
			check(kAssign !== ":=", span, "Can't mutate non-declared local `"+name+"`")
		})
}

const opKLocalFromKAssign = function(kAssign) {
	switch (kAssign) {
		case "=": case ". ": case "<~": case "<~~": case "export":
			return Op.Some("const")
		case "~=":
			return Op.Some("lazy")
		case "::=":
			return Op.Some("mutable")
		case ":=":
			return Op.None // ":=" does not create a new local
		default: fail()
	}
}
