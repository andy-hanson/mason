const
	assert = require("assert"),
	check = require("../check"),
	E = require("../E"),
	Op = require("../U/Op"),
	Opts = require("../Opts"),
	SourceNode = require("source-map").SourceNode,
	Sq = require("../U/Sq"),
	type = require("../U/type"),
	U = require("../U"),
	Vr = require("../Vr")
const
	mangle = require("./mangle"),
	Rx = require("./Rx"),
	util = require("./util"),
		accessLocal = util.accessLocal, accessMangledLocal = util.accessMangledLocal,
		commad = util.commad, lazyWrap = util.lazyWrap,
		makeMember = util.makeMember, makeAssign = util.makeAssign,
		opLocalCheck = util.opLocalCheck, r = util.r

module.exports = function render(e, opts, vr) {
	type(e, E, opts, Opts, vr, Vr)
	return r(Rx({ indent: "", opts: opts, vr: vr }))(e)
}

E.prototype.render = function(rx, arg) {
	// Some E_s pass an arg to their child
	type(rx, Rx)
	const content = this.renderContent(rx, arg)
	const line = this.span.start.line
	const column = this.span.start.column
	type(line, Number, column, Number)
	assert(line >= 1 && column >= 1)
	const typeJ = function(j) {
		if (typeof j === "string" || j instanceof SourceNode) return
		type(j, Array)
		j.forEach(typeJ)
	}
	typeJ(content)
	return new SourceNode(line, column, rx.opts.modulePath(), content)
}

U.implementMany(E, "renderContent", {
	Assign: function(rx) {
		return makeAssign(rx, this.span, this.assignee, this.k, this.value)
	},

	AssignDestructure: function(rx) {
		const destructuredName = "_$" + this.span.start.line
		const k = this.k
		const checkProperties = this.checkProperties
		const access = accessMangledLocal(destructuredName, this.isLazy)
		const assigns = this.assignees.map(function(assignee) {
			const get = checkProperties && !(assignee.okToNotUse && !rx.vr.isAccessed(assignee)) ?
				"_ms.get(" + access + ", \"" + assignee.name + "\")" :
				// TODO: Ignore...
				access + makeMember(assignee.name)
			const value = E.Literal({
				span: assignee.span,
				k: "js",
				value: get
			})
			return makeAssign(rx, assignee.span, assignee, k, value)
		})
		const value =
			this.isLazy ? lazyWrap(r(rx)(this.value)) : r(rx)(this.value)
		return [
			"const ",
			destructuredName,
			" = ",
			value,
			rx.snl(),
			Sq.interleave(assigns, rx.snl())
		]
	},

	BlockBody: function(rx, opResCheck) {
		if (opResCheck === undefined)
			opResCheck = []

		const _in = this.opIn.map(r(rx))
		const body = this.lines.map(r(rx))

		const needResLocal =
			!(Sq.isEmpty(opResCheck) && (!rx.opts.includeInoutChecks() || Sq.isEmpty(this.opOut)))
		if (needResLocal) {
			const makeRes = this.opReturn.map(function(ret) { return [
				"const res = ",
				r(rx)(ret)
			]})
			const _out = this.opOut.map(r(rx))
			const ret = this.opReturn.map(function() { return "return res" })
			return Sq.interleave(_in.concat(body, makeRes, opResCheck, _out, ret), rx.snl())
		}
		else {
			// no res check or out
			const ret = this.opReturn.map(function(ret) { return [
				"return ",
				r(rx)(ret)
			]})
			return Sq.interleave(_in.concat(body, ret), rx.snl())
		}
	},
	BlockWrap: function(rx) { return [
		rx.vr.eIsInGenerator(this) ? "yield* (function*() {" : "(function() {",
		rx.nl(), "\t",
		r(rx.indented())(this.body),
		rx.snl(),
		"})()"
	]},
	Call: function(rx) {
		const anySplat = this.args.some(function(arg) { return type.isa(arg, E.Splat) })
		if (anySplat) {
			// TODO:ES6 Just use `...arg`
			const args = this.args.map(function(arg) {
				return type.isa(arg, E.Splat) ?
					[ "_ms.arr(", r(rx)(arg.splatted), ")" ] :
					"[" + r(rx)(arg) + "]"
			})
			return [
				"Function.prototype.apply.call(",
				r(rx)(this.called),
				", null, [].concat(",
				Sq.interleave(args, ", "),
				"))"
			]
		}
		else return [
			r(rx)(this.called),
			"(",
			commad(rx, this.args),
			")"
		]
	},
	CaseDo: function(rx) {
		return caseBody(rx, this.parts, this.opElse, true)
	},
	CaseVal: function(rx) {
		return caseBody(rx, this.parts, this.opElse, false)
	},
	CasePart: function(rx, needBreak) {
		const rxResult = rx.indented()
		const t = r(rx)(this.test)
		const test = rx.opts.includeCaseChecks() ? [ "_ms.bool(", t, ")" ] : t
		return [
			"case ",
			test,
			": {",
			rxResult.nl(),
			r(rxResult)(this.result),
			needBreak ? [ rxResult.snl(), "break" ] : [],
			rx.snl(),
			"}"
		]
	},
	Debug: function(rx) {
		return rx.opts.includeInoutChecks() ? Sq.interleave(this.lines.map(r(rx)), rx.snl()) : []
	},
	Debugger: function() { return "debugger" },
	DictReturn: function(rx) {
		const nonDebugKeys = this.keys
		const keys = rx.opts.includeTypeChecks() ? this.keys.concat(this.debugKeys) : this.keys
		const opDisplayName = this.opDisplayName
		return Op.ifElse(this.opDicted,
			function(dicted) {
				if (Sq.isEmpty(keys)) {
					assert(Sq.isEmpty(nonDebugKeys))
					return r(rx)(dicted)
				}

				const keysVals = keys.map(function(key) { return [
					mangle.quote(key.name),
					", ",
					mangle(key.name)
				]}).concat(opDisplayName.map(function(_) { return [
					mangle.quote("displayName"),
					", ",
					mangle.quote(_)
				]}))
				const args = Sq.interleave(keysVals, ", ")
				const anyLazy = keys.some(function(key) { return key.isLazy })
				return [
					anyLazy ? "_ms.lset(" : "_ms.set(",
					r(rx)(dicted),
					", ",
					args,
					")"
			]},
			function() {
				assert(!Sq.isEmpty(keys))
				const obj = keys.map(function(key) {
					const q = mangle.quote(key.name), m = mangle(key.name)
					return key.isLazy
						? [ "get ", q, "() { return _ms.unlazy(", m, ") }" ]
						: [ q, ": ", m ]
				}).concat(opDisplayName.map(function(_) { return [
					"displayName: ", mangle.quote(_)
				]}))
				return [ "{ ", Sq.interleave(obj, ", "), " }" ]
			})
	},
	EndLoop: function() {
		return "break " + mangle(this.name)
	},
	Fun: function(rx) {
		const rxFun = rx.indented()
		const span = this.span
		const opResCheck = Sq.flatMap(this.opReturnType, function(_) {
			// TODO: Probably a better way
			return opLocalCheck(
				rx,
				E.LocalDeclare({
					span: span,
					name: "res",
					opType: Op.Some(_),
					isLazy: false,
					okToNotUse: false
				}),
				false)
		})
		const args = this.args
		return [
			this.k === "|" ? "function(" : "function*(",
			commad(rx, args),
			") {",
			rxFun.nl(),
			this.opRestArg.map(function(rest) { return [
				"const ",
				r(rx)(rest),
				" = [].slice.call(arguments, ",
				args.length.toString(),
				");",
				rxFun.nl()
			]}),
			Sq.interleavePlus(
				Sq.mpf(args, function(arg) { return opLocalCheck(rx, arg, arg.isLazy); }),
				rxFun.snl()),
			r(rxFun, opResCheck)(this.body),
			rx.snl(),
			"}"
		]
	},
	Ignore: function(rx) {
		return r(rx)(this.ignored)
	},
	Lazy: function(rx) {
		return lazyWrap(r(rx)(this.value))
	},
	ListReturn: function() { return [
		"[",
		Sq.interleave(
			Sq.range(0, this.length).map(function(i) { return "_" + i }),
			", "),
		"]"
	]},
	ListSimple: function(rx) { return [ "[", commad(rx, this.parts), "]" ] },
	ListEntry: function(rx) { return [
		"const _",
		this.index.toString(),
		" = ",
		r(rx)(this.value)
	]},
	Literal: function() {
		const v = this.value
		switch (this.k) {
			case Number:
				return /[\.e]/.test(v) ? v : [ "(", v, ")" ]
			case String:
				return [ mangle.quote(v) ]
			case "js":
				return v
			default: throw new Error(this.k)
		}
	},
	LocalAccess: function(rx) {
		return accessLocal(this.name, rx.vr.isLazy(this))
	},
	LocalDeclare: function() {
		return mangle(this.name)
	},
	Loop: function(rx) { return [
		mangle(this.name),
		": while (true) {",
		rx.nl(), "\t",
		r(rx.indented())(this.body),
		rx.nl(),
		"}"
	]},
	Map: function() { return [
		"_ms.map(",
		Sq.interleave(
			Sq.range(0, this.length).map(function(i) { return [
				"_k",
				i.toString(),
				", ",
				"_v",
				i.toString()
			]}),
			", "),
		")"
	]},
	MapEntry: function(rx) { return [
		"const _k",
		this.index.toString(),
		" = ",
		r(rx)(this.key),
		", _v",
		this.index.toString(),
		" = ",
		r(rx)(this.val)
	]},
	Member: function(rx) { return [
		r(rx)(this.object),
		makeMember(this.name)
	]},
	Module: function(rx) { return [
		"\"use strict\"",
		// "\nglobal.console.log(\">>> " + rx.opts.moduleName() + "\")\n",
		rx.snl(),
		r(rx)(this.body),
		rx.snl()
		// "\nglobal.console.log(\"<<< " + rx.opts.moduleName() + "\")\n"
	]},
	// TODO:ES6
	ModuleDefaultExport: function(rx) { return [
		"exports",
		makeMember(rx.opts.moduleName()),
		" = ",
		r(rx)(this.value)
	]},
	Null: function() { return "null" },
	True: function() { return "true" },
	Quote: function(rx) {
		const isStrLit = function(_) {
			return _ instanceof E.Literal && _.k === String
		}
		const parts = []
		if (!isStrLit(this.parts[0]))
			parts.push("\"\"")
		// TODO:ES6 splat call
		Array.prototype.push.apply(parts, this.parts.map(function(part) {
			return isStrLit(part) ? r(rx)(part) : [ "_ms.show(", r(rx)(part), ")" ]
		}))
		return Sq.interleave(parts, " + ")
	},
	Require: function() { return [
		"require(\"",
		this.path,
		"\")"
	]},
	Scope: function(rx) { return [
		"{", rx.nl(),
		"\t",
		Sq.interleave(this.lines.map(r(rx.indented())), rx.nl() + "\t"),
		rx.nl(),
		"}"
	]},
	SpecialKeyword: function() {
		switch (this.k) {
			case "undefined": return "undefined"
			case "this-module-directory": return "__dirname"
			default: throw new Error(this.k)
		}
	},
	Splat: function() {
		check.fail(this.span, "Splat must appear as argument to a call.")
	},
	Sub: function(rx) { return [
		"_ms.sub(",
		commad(rx, Sq.cons(this.subject, this.subbers)),
		")"
	]},
	This: function() { return "this" },
	TypeTest: function(rx) { return [
		"_ms.contains(",
		r(rx)(this.testType),
		", ",
		r(rx)(this.tested),
		")"
	]},
	Yield: function(rx) { return [
		"(yield ",
		r(rx)(this.yielded),
		")"
	]},
	YieldTo: function(rx) { return [
		"(yield* ",
		r(rx)(this.yieldedTo),
		")"
	]}
})

const caseBody = function(rx, parts, opElse, needBreak) {
	const rxSwitch = rx.indented()
	const rxResult = rxSwitch.indented()
	const jElse = Op.ifElse(opElse,
		function(elze) { return [
			"default: {",
			rxResult.nl(),
			r(rxResult)(elze),
			rxSwitch.snl(),
			// This one never needs a break, because it's at the end anyway.
			"}"
		]},
		function() { return "default: throw new global.Error(\"Case fail\");" })
	const jParts = parts.map(function(part) { return r(rxSwitch, needBreak)(part) })
	const jAllParts = Sq.rcons(jParts, jElse)
	return [
		"switch (true) {",
		rxSwitch.nl(),
		Sq.interleave(jAllParts, rxSwitch.nl()),
		rx.nl(),
		"}"
	]
}
