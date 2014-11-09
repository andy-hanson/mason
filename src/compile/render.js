"use strict"

const
	assert = require("assert"),
	E = require ("./E"),
	Lang = require("./Lang"),
	Op = require("./U/Op"),
	Opts = require("./Opts"),
	SourceNode = require("source-map").SourceNode,
	Span = require("./Span"),
	Sq = require("./U/Sq"),
	T = require("./T"),
	type = require("./U/type"),
	types = require("./U/types"),
	U = require("./U"),
	Vr = require("./Vr")

module.exports = function render(e, opts, vr) {
	type(e, E, opts, Opts, vr, Vr)
	return j(Rx({ indent: "", opts: opts, vr: vr }))(e)
}

// Context used while rendering.
const Rx = types.recordType("Rx", Object, {
	indent: String, // Made entirely out of \t
	opts: Opts,
	vr: Vr,
})
Object.assign(Rx.prototype, {
	indented: function() { return U.with(this, "indent", "\t" + this.indent) },
	nl: function() { return "\n" + this.indent },
	snl: function() { return ";\n" + this.indent },
	cnl: function() { return ",\n" + this.indent }
})


E.prototype.toJ = function(rx, arg) { // Some E_s pass an arg to their child
	type(rx, Rx)
	const content = this.toJContent(rx, arg)
	const ln = this.span.start.ln
	const col = this.span.start.col
	type(ln, Number, col, Number, rx.opts.msPathRelToJs, String)
	assert(ln >= 1 && col >= 1)
	const typeJ = function(j) {
		if (typeof j === "string" || j instanceof SourceNode) return
		type(j, Array)
		j.forEach(typeJ)
	}
	typeJ(content)
	return new SourceNode(ln, col, rx.opts.msPathRelToJs, content)
}

const j = function(rx) {
	type(rx, Rx)
	return function(e) { return e.toJ(rx) }
}

const commad = function(rx, parts) {
	type(rx, Rx, parts, [E])
	return Sq.interleave(parts.map(j(rx)), ", ")
}

U.implementMany(E, "toJContent", {
	Assign: function(rx) {
		return makeAssign(rx, this.span, this.assignee, this.k, this.value)
	},

	AssignDestructure: function(rx) {
		const destructuredName = "_$" // _$ isn't a valid mason name, so this is safe.
		const k = this.k
		const assigns = this.assignees.map(function(assignee) {
			const value = E.Literal({
				span: assignee.span,
				k: "js",
				value: destructuredName + makeMember(assignee.name)
			})
			return makeAssign(rx, assignee.span, assignee, k, value)
		})
		return [
			"var ", // constant, but `const` will complain if we do two of these in the same block.
			destructuredName,
			" = ",
			j(rx)(this.value),
			rx.snl(),
			Sq.interleave(assigns, rx.snl())
		]
	},

	BlockBody: function (rx, opResCheck) {
		if (opResCheck === undefined)
			opResCheck = []
		const _in = this.opIn.map(j(rx))
		const body = this.lines.map(j(rx))
		const needResLocal = !(Sq.isEmpty(opResCheck) && Sq.isEmpty(this.opOut))
		if (needResLocal) {
			const makeRes = this.opReturn.map(function(ret) { return [
				"const res = ",
				j(rx)(ret)
			]})
			const _out = this.opOut.map(j(rx))
			const ret = this.opReturn.map(function() { return "return res" })
			return Sq.interleave(_in.concat(body, makeRes, opResCheck, _out, ret), rx.snl())
		}
		else {
			const ret = this.opReturn.map(function(ret) { return [
				"return ",
				j(rx)(ret)
			]})
			return Sq.interleave(_in.concat(body, ret), rx.snl())
		}
	},
	BlockWrap: function(rx) { return [
		"(function() {",
		rx.nl(), "\t",
		j(rx.indented())(this.body),
		rx.snl(),
		"})()"
	]},
	Call: function(rx) { return [
		j(rx)(this.called),
		"(",
		commad(rx, this.args),
		")"
	]},
	CaseDo: function(rx) { return [
		// We need to give it its own block because "_" may already be defined.
		"{",
		rx.nl(), "\t",
		caseBody(rx.indented(), this.opCased, this.parts, this.opElse, true),
		rx.nl(),
		"}"
	]},
	CaseVal: function(rx) { return [
		rx.vr.eIsInGenerator(this) ? "yield* (function*() {" : "(function() {",
		rx.nl(), "\t",
		caseBody(rx.indented(), this.opCased, this.parts, this.opElse, false),
		rx.nl(),
		"})()"
	]},
	CasePart: function(rx, needBreak) {
		const rxResult = rx.indented()
		return [
			"case ",
			j(rx)(this.test),
			": {",
			rxResult.nl(),
			j(rxResult)(this.result),
			needBreak ? [ rxResult.snl(), "break" ] : [],
			rx.snl(),
			"}"
		]
	},
	Dict: function(rx) {
		const keysVals = this.keys.map(function(key) { return [
			quote(key),
			", ",
			mangle(key)
		]}).concat(this.opDisplayName.map(function(_) { return [
			quote("displayName"),
			", ",
			quote(_)
		]}))
		const args = Sq.interleave(keysVals, ", ")
		return Op.ifElse(this.opDicted,
			function(dicted) { return [
				"_ms.dictify(",
				j(rx)(dicted),
				", ",
				args,
				")"
			]},
			function() { return [
				"_ms.Dict(",
				args,
				")"
			]})
	},
	EndLoop: function() {
		return "break " + mangle(this.name)
	},
	Fun: function(rx) {
		const rxFun = rx.indented()
		const span = this.span
		const opResCheck = this.opReturnType.map(function(_) {
			return opLocalCheck(
				rx,
				E.LocalDeclare({
					span: span,
					name: "res",
					opType: Op.Some(_),
					isLazy: false
				}),
				false)
		})
		return [
			(this.k === "|") ? "function(" : "function*(",
			commad(rx, this.args),
			") {",
			rxFun.nl(),
			Sq.interleavePlus(
				Sq.mpf(this.args, function(arg) { return opLocalCheck(rx, arg, arg.isLazy); }),
				rxFun.snl()),
			this.body.toJ(rxFun, opResCheck),
			rx.snl(),
			"}"
		]
	},
	JSKeyword: function() {
		return this.k
	},
	Lazy: function(rx) { return [
		"_ms.Lazy(function() { return ",
		j(rx)(this.value),
		"; })"
	]},
	List: function(rx) { return [
			"_ms.mkArray(",
			Sq.interleave(
				Sq.range(0, this.length).map(function(i) { return "_" + i }),
				", "),
			")"
	]},
	ListEntry: function(rx) { return [
		"const _",
		this.index.toString(),
		" = ",
		j(rx)(this.value)
	]},
	Literal: function() {
		const v = this.value
		switch (this.k) {
			case Number:
				return /[\.e]/.test(v) ? v : [ "(", v, ")" ]
			case String:
				return [ quote(v) ]
			case "js":
				return v
			default: fail()
		}
	},
	LocalAccess: function(rx) {
		return accessLocal(this.name, rx.vr.isLazy(this))
	},
	LocalDeclare: function(rx) {
		return mangle(this.name)
	},
	Loop: function(rx) { return [
		mangle(this.name),
		": while (true) {",
		rx.nl(), "\t",
		j(rx.indented())(this.body),
		rx.nl(),
		"}"
	]},
	MapEntry: function(rx) { return [
		TODO()
	]},
	Member: function(rx) { return [
		j(rx)(this.object),
		makeMember(this.name)
	]},
	Module: function(rx) {
		type(rx.opts.msPathRelToJs, String, rx.opts.sourceMapPathRelToJs, String)
		return [
			"// Compiled from ", rx.opts.msPathRelToJs, "\n",
			"//# sourceMappingURL=", rx.opts.sourceMapPathRelToJs, "\n",
			"\"use strict\"",
			rx.snl(),
			j(rx)(this.body),
			rx.snl()
		]
	},
	ModuleDefaultExport: function(rx) { return [
		"_ms.KLUDGE_defaultExport(module, ",
		j(rx)(this.value),
		")"
	]},
	Quote: function(rx) {
		return (this.parts.length == 0) ?
			"\"\"" :
			(this.parts.length === 1 && this.parts[0] instanceof E.Literal && this.parts[0].k === String) ?
			j(rx)(Sq.head(this.parts)) :
			[ "_ms.mkStr(", commad(rx, this.parts), ")" ]
	},
	Require: function() { return [
		"require(\"",
		this.path,
		"\")"
	]},
	Sub: function(rx) { return [
		"_ms.sub(",
		commad(rx, Sq.cons(this.subject, this.subbers)),
		")"
	]},
	TypeTest: function(rx) { return [
		"_ms.subsumes(",
		j(rx)(this.testType),
		", ",
		j(rx)(this.tested),
		")"
	]},
	Yield: function(rx) { return [
		"yield ",
		j(rx)(this.yielded)
	]},
	YieldTo: function(rx) { return [
		"yield* ",
		j(rx)(this.yieldedTo)
	]}
})

const accessLocal = function(name, isLazy) {
	type(name, String, isLazy, Boolean)
	return isLazy ? [ "_ms.unlazy(" + mangle(name) + ")" ] : mangle(name)
}

const opLocalCheck = function(rx, local, isLazy) {
	type(local, E.LocalDeclare, isLazy, Boolean)
	return isLazy ? Op.None : local.opType.map(function(typ) { return [
		"_ms.checkSubsumes(",
		j(rx)(typ),
		", ",
		accessLocal(local.name, false),
		", \"",
		local.name,
		"\")",
	]})
}

const makeAssign = function(rx, span, assignee, k, value) {
	type(rx, Rx, span, Span, assignee, E, k, Lang.KAssign, value, E)
	const to = j(rx)(assignee)
	const doAssign = (function() { switch (k) {
		case "=": case ". ": case "<~": case "<~~":
			return [ "const ", to, " = ", j(rx)(value) ]
		case "export":
			return [ "const ", to, " = exports", makeMember(assignee.name), " = ", j(rx)(value) ]
			// return [ "export const ", to, " = ", jValue ]; TODO:ES6
		case "~=": {
			// For a lazy value, type checking is not done until after it is generated.
			const fun = E.Fun({
				span: span,
				opName: Op.None,
				args: [],
				body: E.BlockBody({
					span: span,
					lines: [],
					opReturn: Op.Some(value),
					opIn: Op.None,
					opOut: Op.None
				}),
				opReturnType: assignee.opType,
				k: "|"
			})
			return [
				"const ",
				to,
				" = _ms.Lazy(",
				j(rx)(fun),
				")"
			]
		}
		case "::=":
			return [
				"let ",
				to,
				" = ",
				j(rx)(value)
			]
		case ":=":
			return [
				to,
				" = ",
				j(rx)(value)
			]
		default: fail()
	} })()
	return [
		doAssign,
		opLocalCheck(rx, assignee, k === "~=").map(function(lc) { return [ rx.snl(), lc ] })
	]
}

const makeMember = function(name) {
	type(name, String)
	return needsMangle(name) ? "[\"" + name + "\"]" : "." + name
}

const caseBody = function(rx, opCased, parts, opElse, needBreak) {
	const rxSwitch = rx.indented()
	const rxResult = rxSwitch.indented()
	const jCased = opCased.map(function(cased) { return [
		"const _ = ",
		j(rx)(cased),
		rx.snl()
	]})
	const jElse = Op.ifElse(opElse,
		function(elze) { return [
			"default: {",
			rxResult.nl(),
			j(rxResult)(elze),
			rxSwitch.snl(),
			// This one never needs a break, because it's at the end anyway.
			"}"
		]},
		function() { return "default: throw new Error(\"Case fail\");" })
	const jParts = parts.map(function(part) { return part.toJ(rxSwitch, needBreak) })
	const jAllParts = Sq.rcons(jParts, jElse)
	return [
		jCased,
		"switch (true) {",
		rxSwitch.nl(),
		Sq.interleave(jAllParts, rxSwitch.nl()),
		rx.nl(),
		"}"
	]
}

const mangle = function(name) {
	return JSKeywords.has(name) ?
		"_" + name :
		name.replace(/[^a-zA-Z0-9_]/g, function(ch) { return "_" + ch.charCodeAt(0) })
}

const needsMangle = function(name) {
	return JSKeywords.has(name) || name.search(/[^a-zA-Z0-9_]/) !== -1
}

const JSKeywords = new Set([
	"abstract",
	"arguments",
	"boolean",
	"break",
	"byte",
	"case",
	"catch",
	"char",
	"class",
	"comment",
	"const",
	"continue",
	"debugger",
	"default",
	"delete",
	"do",
	"double",
	"else",
	"enum",
	"eval",
	"export",
	"extends",
	"false",
	"final",
	"finally",
	"float",
	"for",
	"function",
	"global",
	"goto",
	"if",
	"implements",
	"import",
	"in",
	"instanceOf",
	"int",
	"interface",
	"label",
	"long",
	"module",
	"native",
	"new",
	"null",
	"package",
	"private",
	"protected",
	"public",
	"return",
	"short",
	"static",
	"super",
	"switch",
	"synchronized",
	"this",
	"throw",
	"throws",
	"transient",
	"true",
	"try",
	"typeof",
	"undefined",
	"var",
	"void",
	"while",
	"with"
])

const quote = function(str) {
	type(str, String);
	const escaped = str.split('').map(function(ch) {
		return {
			'\n': '\\n',
			'\t': '\\t',
			'"': "\\\"",
			'\\': "\\\\"
		}[ch] || ch;
	}).join('')
	const res = "\"" + escaped + "\""
	assert(eval(res) === str)
	return res
}
