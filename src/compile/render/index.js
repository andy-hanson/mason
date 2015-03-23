import { SourceNode } from "source-map"
import assert from "assert"
import check, { fail } from "../check"
import E, * as EExports from "../E"
import Opts from "../Opts"
import { implementMany } from "../U"
import { ifElse, some } from "../U/Op"
import { cons, flatMap, interleave, interleavePlus, isEmpty, mpf, range, rcons } from "../U/Sq"
import type, { isa } from "../U/type"
import Vr from "../Vr"
import mangle, { quote } from "./mangle"
import Rx from "./Rx"
import { accessLocal, accessMangledLocal, commad, lazyWrap,
	makeMember, makeAssign, opLocalCheck, r } from "./util"

export default function render(e, opts, vr) {
	type(e, E, opts, Opts, vr, Vr)
	return r(Rx({ indent: "", opts: opts, vr: vr }))(e)
}

export function renderExpr(_, rx, arg) {
	// Some E_s pass an arg to their child
	type(rx, Rx)
	const content = _.renderContent(rx, arg)
	const line = _.span.start.line
	const column = _.span.start.column
	type(line, Number, column, Number)
	assert(line >= 1 && column >= 1)
	const typeJ = j => {
		if (!(typeof j === "string" || j instanceof SourceNode)) {
			type(j, Array)
			j.forEach(typeJ)
		}
	}
	typeJ(content)
	return new SourceNode(line, column, rx.opts.modulePath(), content)
}

implementMany(EExports, "renderContent", {
	Assign: (_, rx) => makeAssign(rx, _.span, _.assignee, _.k, _.value),
	AssignDestructure: (_, rx) => {
		const destructuredName = "_$" + _.span.start.line
		const access = accessMangledLocal(destructuredName, _.isLazy)
		const assigns = _.assignees.map(assignee => {
			const get = _.checkProperties && !(assignee.okToNotUse && !rx.vr.isAccessed(assignee)) ?
				"_ms.get(" + access + ", \"" + assignee.name + "\")" :
				// TODO: Ignore...
				access + makeMember(assignee.name)
			const value = EExports.ELiteral({
				span: assignee.span,
				k: "js",
				value: get
			})
			return makeAssign(rx, assignee.span, assignee, _.k, value)
		})
		const value = _.isLazy ? lazyWrap(r(rx)(_.value)) : r(rx)(_.value)
		return [
			"const ",
			destructuredName,
			" = ",
			value,
			rx.snl(),
			interleave(assigns, rx.snl())
		]
	},
	BlockBody: (_, rx, opResCheck) => {
		if (opResCheck === undefined)
			opResCheck = []

		const _in = _.opIn.map(r(rx))
		const body = _.lines.map(r(rx))

		const needResLocal =
			!(isEmpty(opResCheck) && (!rx.opts.includeInoutChecks() || isEmpty(_.opOut)))
		if (needResLocal) {
			const makeRes = _.opReturn.map(function(ret) { return [
				"const res = ",
				r(rx)(ret)
			]})
			const _out = _.opOut.map(r(rx))
			const ret = _.opReturn.map(function() { return "return res" })
			return interleave(_in.concat(body, makeRes, opResCheck, _out, ret), rx.snl())
		}
		else {
			// no res check or out
			const ret = _.opReturn.map(function(ret) { return [
				"return ",
				r(rx)(ret)
			]})
			return interleave(_in.concat(body, ret), rx.snl())
		}
	},
	BlockWrap: (_, rx) => [
		rx.vr.eIsInGenerator(_) ? "yield* (function*() {" : "(function() {",
		rx.nl(), "\t",
		r(rx.indented())(_.body),
		rx.snl(),
		"})()"
	],
	Call: (_, rx) => {
		const anySplat = _.args.some(function(arg) { return isa(arg, EExports.Splat) })
		if (anySplat) {
			// TODO:ES6 Just use `...arg`
			const args = _.args.map(function(arg) {
				return isa(arg, EExports.Splat) ?
					[ "_ms.arr(", r(rx)(arg.splatted), ")" ] :
					"[" + r(rx)(arg) + "]"
			})
			return [
				"Function.prototype.apply.call(",
				r(rx)(_.called),
				", null, [].concat(",
				interleave(args, ", "),
				"))"
			]
		}
		else return [
			r(rx)(_.called),
			"(",
			commad(rx, _.args),
			")"
		]
	},
	CaseDo: (_, rx) => caseBody(rx, _.parts, _.opElse, true),
	CaseVal: (_, rx) => caseBody(rx, _.parts, _.opElse, false),
	CasePart: (_, rx, needBreak) => {
		const rxResult = rx.indented()
		const t = r(rx)(_.test)
		const test = rx.opts.includeCaseChecks() ? [ "_ms.bool(", t, ")" ] : t
		return [
			"case ",
			test,
			": {",
			rxResult.nl(),
			r(rxResult)(_.result),
			needBreak ? [ rxResult.snl(), "break" ] : [],
			rx.snl(),
			"}"
		]
	},
	Debug: (_, rx) => rx.opts.includeInoutChecks() ? interleave(_.lines.map(r(rx)), rx.snl()) : [],
	Debugger: () => "debugger",
	DictReturn: (_, rx) => {
		const nonDebugKeys = _.keys
		const keys = rx.opts.includeTypeChecks() ? _.keys.concat(_.debugKeys) : _.keys
		const opDisplayName = _.opDisplayName
		return ifElse(_.opDicted,
			function(dicted) {
				if (isEmpty(keys)) {
					assert(isEmpty(nonDebugKeys))
					return r(rx)(dicted)
				}

				const keysVals = keys.map(function(key) { return [
					quote(key.name),
					", ",
					mangle(key.name)
				]}).concat(opDisplayName.map(function(_) { return [
					quote("displayName"),
					", ",
					quote(_)
				]}))
				const args = interleave(keysVals, ", ")
				const anyLazy = keys.some(function(key) { return key.isLazy })
				return [
					anyLazy ? "_ms.lset(" : "_ms.set(",
					r(rx)(dicted),
					", ",
					args,
					")"
			]},
			function() {
				assert(!isEmpty(keys))
				const obj = keys.map(function(key) {
					const q = quote(key.name), m = mangle(key.name)
					return key.isLazy
						? [ "get ", q, "() { return _ms.unlazy(", m, ") }" ]
						: [ q, ": ", m ]
				}).concat(opDisplayName.map(function(_) { return [
					"displayName: ", quote(_)
				]}))
				return [ "{ ", interleave(obj, ", "), " }" ]
			})
	},
	EndLoop: _ => "break " + mangle(_.name),
	Fun: (_, rx) => {
		const rxFun = rx.indented()
		const span = _.span
		const opResCheck = flatMap(_.opReturnType, function(_) {
			// TODO: Probably a better way
			return opLocalCheck(
				rx,
				EExports.LocalDeclare({
					span: span,
					name: "res",
					opType: some(_),
					isLazy: false,
					okToNotUse: false
				}),
				false)
		})
		const args = _.args
		return [
			_.k === "|" ? "function(" : "function*(",
			commad(rx, args),
			") {",
			rxFun.nl(),
			_.opRestArg.map(function(rest) { return [
				"const ",
				r(rx)(rest),
				" = [].slice.call(arguments, ",
				args.length.toString(),
				");",
				rxFun.nl()
			]}),
			interleavePlus(
				mpf(args, function(arg) { return opLocalCheck(rx, arg, arg.isLazy); }),
				rxFun.snl()),
			r(rxFun, opResCheck)(_.body),
			rx.snl(),
			"}"
		]
	},
	Ignore: (_, rx) => r(rx)(_.ignored),
	Lazy: (_, rx) => lazyWrap(r(rx)(_.value)),
	ListReturn: _ => [
		"[",
		interleave(
			range(0, _.length).map(i => "_" + i),
			", "),
		"]"
	],
	ListSimple: (_, rx) => [ "[", commad(rx, _.parts), "]" ],
	ListEntry: (_, rx) => [
		"const _",
		_.index.toString(),
		" = ",
		r(rx)(_.value)
	],
	ELiteral: _ => {
		const v = _.value
		switch (_.k) {
			case Number:
				return /[\.e]/.test(v) ? v : [ "(", v, ")" ]
			case String:
				return [ quote(v) ]
			case "js":
				return v
			default: throw new Error(_.k)
		}
	},
	LocalAccess: (_, rx) => accessLocal(_.name, rx.vr.isLazy(_)),
	LocalDeclare: _ => mangle(_.name),
	Loop: (_, rx) => [
		mangle(_.name),
		": while (true) {",
		rx.nl(), "\t",
		r(rx.indented())(_.body),
		rx.nl(),
		"}"
	],
	Map: _ => [
		"_ms.map(",
		interleave(
			range(0, _.length).map(function(i) { return [
				"_k",
				i.toString(),
				", ",
				"_v",
				i.toString()
			]}),
			", "),
		")"
	],
	MapEntry: (_, rx) => [
		"const _k",
		_.index.toString(),
		" = ",
		r(rx)(_.key),
		", _v",
		_.index.toString(),
		" = ",
		r(rx)(_.val)
	],
	Member: (_, rx) => [
		r(rx)(_.object),
		makeMember(_.name)
	],
	Module: (_, rx) => [
		"\"use strict\"",
		// "\nglobal.console.log(\">>> " + rx.opts.moduleName() + "\")\n",
		rx.snl(),
		r(rx)(_.body),
		rx.snl()
		// "\nglobal.console.log(\"<<< " + rx.opts.moduleName() + "\")\n"
	],
	// TODO:ES6
	ModuleDefaultExport: (_, rx) => [
		"exports",
		makeMember(rx.opts.moduleName()),
		" = ",
		r(rx)(_.value)
	],
	Null: () => "null",
	True: () => "true",
	Quote: (_, rx) => {
		const isStrLit = function(_) {
			return _ instanceof EExports.ELiteral && _.k === String
		}
		const parts = []
		if (!isStrLit(_.parts[0]))
			parts.push("\"\"")
		// TODO:ES6 splat call
		Array.prototype.push.apply(parts, _.parts.map(function(part) {
			return isStrLit(part) ? r(rx)(part) : [ "_ms.show(", r(rx)(part), ")" ]
		}))
		return interleave(parts, " + ")
	},
	Require: _ => [
		"require(\"",
		_.path,
		"\")"
	],
	Scope: (_, rx) => [
		"{", rx.nl(),
		"\t",
		interleave(_.lines.map(r(rx.indented())), rx.nl() + "\t"),
		rx.nl(),
		"}"
	],
	SpecialKeyword: _ => {
		switch (_.k) {
			case "undefined": return "undefined"
			case "this-module-directory": return "__dirname"
			default: throw new Error(_.k)
		}
	},
	Splat: _ => fail(_.span, "Splat must appear as argument to a call."),
	Sub: (_, rx) => [
		"_ms.sub(",
		commad(rx, cons(_.subject, _.subbers)),
		")"
	],
	This: () => "this",
	TypeTest: (_, rx) => [
		"_ms.contains(",
		r(rx)(_.testType),
		", ",
		r(rx)(_.tested),
		")"
	],
	Yield: (_, rx) => [
		"(yield ",
		r(rx)(_.yielded),
		")"
	],
	YieldTo: (_, rx) => [
		"(yield* ",
		r(rx)(_.yieldedTo),
		")"
	]
})

const caseBody = function(rx, parts, opElse, needBreak) {
	const rxSwitch = rx.indented()
	const rxResult = rxSwitch.indented()
	const jElse = ifElse(opElse,
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
	const jAllParts = rcons(jParts, jElse)
	return [
		"switch (true) {",
		rxSwitch.nl(),
		interleave(jAllParts, rxSwitch.nl()),
		rx.nl(),
		"}"
	]
}
