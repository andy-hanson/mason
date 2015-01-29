"use strict"

const
	assert = require("assert"),
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
	for (let local of vr.localToInfo.keys()) {
		const info = vr.localToInfo.get(local)
		const noNonDebug = Sq.isEmpty(info.nonDebugAccesses)
		if (info.isInDebug)
			check(noNonDebug, local.span,
				function() { return "Debug-only local used outside of debug at " + info.nonDebugAccesses[0].span })
		if (noNonDebug && Sq.isEmpty(info.debugAccesses))
			check.warnIf(opts, !local.okToNotUse, local.span, "Unused local variable " + U.code(local.name) + ".")
		else if (info.isInDebug)
			check(noNonDebug, local.span, function() {
				return "Debug-only local used at " + Sq.head(info.nonDebugAccesses).span
			})
		else
			check.warnIf(opts, !local.okToNotUse && noNonDebug, local.span, "Local " + U.code(local.name) + " used only in debug.")
	}
}

// Context used during verification.
// Every property except vr is immutable.
// Every Vx shares the same Vr.
const Vx = types.recordType("Vx", Object, {
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

const v = function(vx) {
	return function(e) { e.verify(vx) }
}
const vm = function(vx, es) {
	es.forEach(v(vx))
}

U.implementMany(E, "verify", {
	BlockBody: function(vx) {
		this.opIn.forEach(v(vx))
		const vxRet = verifyLines(vx, this.lines)
		this.opReturn.forEach(v(vxRet))
		const vxOut = Sq.isEmpty(this.opReturn) ? vxRet : vxRet.withRes(this.span)
		this.opOut.forEach(v(vxOut))
	},
	BlockWrap: function(vx) {
		vx.setEIsInGenerator(this)
		v(vx)(this.body)
	},
	CaseDo: function(vx) {
		this.parts.concat(this.opElse).forEach(v(vx))
	},
	CaseVal: function(vx) {
		vx.setEIsInGenerator(this)
		E.CaseDo.prototype.verify.call(this, vx)
	},
	Debug: function(vx) {
		// Only reach here for in/out condition
		verifyLines(vx, [ this ])
	},
	EndLoop: function(vx) {
		check(vx.hasLoop(this.name), this.span, "No loop called `"+this.name+"`")
	},
	Fun: function(vx) {
		vx = vx.withBlockLocals()
		this.opReturnType.forEach(v(vx))
		if (!Sq.isEmpty(this.opReturnType))
			check(!Sq.isEmpty(this.body.opReturn), this.span, "Function with return type must return something.")
		this.args.forEach(function(arg) { arg.opType.forEach(v(vx)) })
		const vxGen = this.k === "~|" ? vx.inGenerator() : vx.notInGenerator()
		const allArgs = this.args.concat(this.opRestArg)
		allArgs.forEach(function(_) { vx.registerLocal(_) })
		const vxBody = vxGen.plusLocals(allArgs)
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
	Assign: function(vx) {
		const vxAssign = this.assignee.isLazy ? vx.withBlockLocals() : vx
		return vm(vxAssign, [this.assignee, this.value])
	},
	AssignDestructure: function(vx) { vm(vx, Sq.cons(this.value, this.assignees)) },
	Call: function(vx) { vm(vx, Sq.cons(this.called, this.args)) },
	CasePart: function(vx) { vm(vx, [this.test, this.result]) },
	Debugger: U.ignore,
	DictReturn: function(vx) { vm(vx, this.opDicted) },
	Lazy: function(vx) {
		v(vx.withBlockLocals())(this.value)
	},
	ListReturn: U.ignore,
	ListEntry: function(vx) { v(vx)(this.value) },
	ListSimple: function(vx) { this.parts.map(v(vx)) },
	Literal: function(vx) {
		check.warnIf(vx.opts, this.k === 'js', this.span, "Js literal")
	},
	Map: U.ignore,
	Member: function(vx) { v(vx)(this.object) },
	Module: function(vx) { v(vx)(this.body) },
	ModuleDefaultExport: function(vx) { v(vx)(this.value) },
	Null: U.ignore,
	Quote: function(vx) { vm(vx, this.parts) },
	Require: U.ignore,
	Scope: function(vx) { throw new Error("Scopes are handled specially by verifyLines.") },
	SpecialKeyword: U.ignore,
	Splat: function(vx) { v(vx)(this.splatted) },
	Sub: function(vx) { vm(vx, Sq.cons(this.subject, this.subbers)) },
	This: U.ignore,
	True: U.ignore,
	TypeTest: function(vx) { vm(vx, [this.tested, this.testType]) }
})

const verifyLines = function(vx, lines) {
	const lineToLocals = new Map()
	let prevLocals = []
	let allNewLocals = []

	const processLine = function(inDebug) {
		type(inDebug, Boolean)
		return function(line) {
			if (type.isa(line, E.Scope)) {
				const localsBefore = prevLocals
				line.lines.forEach(processLine(inDebug))
				prevLocals = localsBefore
			}
			else if (type.isa(line, E.Debug)) {
				// TODO: Do anything in this situation?
				// check(!inDebug, line.span, "Redundant `debug`.")
				line.lines.forEach(processLine(true))
			}
			else {
				verifyIsStatement(line)
				const lineNews = lineNewLocals(line)
				prevLocals.forEach(function(prevLocal) {
					lineNews.forEach(function(newLocal) {
						check(prevLocal.name !== newLocal.name, newLocal.span,
							U.code(newLocal.name) + " already declared in same block at " + prevLocal.span.start)
					})
				})
				lineNews.forEach(function(_) {
					U.with(vx, "isInDebug", inDebug).registerLocal(_)
				})
				const newLocals = prevLocals.concat(lineNews)
				lineToLocals.set(line, prevLocals)
				prevLocals = newLocals
				allNewLocals = newLocals // Final set value is answer
			}
		}
	}

	lines.forEach(processLine(vx.isInDebug))

	const verifyLine = function(inDebug) {
		type(inDebug, Boolean)
		return function(line) {
			if (type.isa(line, E.Scope))
				line.lines.forEach(verifyLine(inDebug))
			else if (type.isa(line, E.Debug))
				line.lines.forEach(verifyLine(true))
			else {
				const vxDebug = U.with(vx, "isInDebug", inDebug)
				const vxLineLocals = vxDebug.plusLocals(lineToLocals.get(line))
				const vxLine = U.with(vxLineLocals, "pendingBlockLocals", vx.pendingBlockLocals.concat(allNewLocals))
				v(vxLine)(line)
			}
		}
	}

	lines.forEach(verifyLine(vx.isInDebug))

	return vx.plusLocals(allNewLocals)
}

// TODO: Clean up
const verifyIsStatement = function(line) {
	switch (true) {
		case type.isa(line, E.Do):
		// Some E.Vals are also conceptually E.Dos, but this was easier than multiple inheritance.
		case type.isa(line, E.Call):
		case type.isa(line, E.Literal) && line.k === "js":
		case type.isa(line, E.Null): // OK, used to mean `pass`
		case type.isa(line, E.Yield):
		case type.isa(line, E.YieldTo):
			return
		default:
			check.fail(line.span, "Expression in statement position.")
	}
}

const lineNewLocals = function(line) {
	type(line, E)
	return type.isa(line, E.Assign) ?
		[ line.assignee ] :
		type.isa(line, E.AssignDestructure) ?
		line.assignees :
		[ ]
}
