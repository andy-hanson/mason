import { KAssign } from "../Lang"
import Span from "../Span"
import { None, some } from "../U/Op"
import { interleave } from "../U/Sq"
import type from "../U/type"
const
	assert = require("assert"),
	E = require("../E")
const
	mangle = require("./mangle"),
	Rx = require("./Rx")

const r = function(rx, othArg) {
	type(rx, Rx)
	return function(e) { return e.render(rx, othArg) }
}

const accessLocal = function(name, isLazy) {
	return accessMangledLocal(mangle(name), isLazy)
}

const accessMangledLocal = function(mangledName, isLazy) {
	type(mangledName, String, isLazy, Boolean)
	return isLazy ? "_ms.unlazy(" + mangledName + ")" : mangledName
}

const commad = function(rx, parts) {
	type(rx, Rx, parts, [E])
	return interleave(parts.map(r(rx)), ", ")
}

const lazyWrap = function(value) { return [
	"_ms.lazy(function() { return ",
	value,
	"; })"
]}

const makeAssign = function(rx, span, assignee, k, value) {
	type(rx, Rx, span, Span, assignee, E, k, KAssign, value, E)
	const to = r(rx)(assignee)
	const doAssign = (function() { switch (k) {
		case "=": case ". ": case "<~": case "<~~":
			if (assignee.isLazy) {
				// For a lazy value, type checking is not done until after it is generated.
				const fun = E.Fun({
					span: span,
					opName: None,
					args: [],
					opRestArg: None,
					body: E.BlockBody({
						span: span,
						lines: [],
						opReturn: some(value),
						opIn: None,
						opOut: None
					}),
					opReturnType: assignee.opType,
					k: "|"
				})
				return [
					"const ",
					to,
					" = _ms.lazy(",
					r(rx)(fun),
					")"
				]
			}
			else
				return [ "const ", to, " = ", r(rx)(value) ]
		case "export":
			// TODO:ES6
			assert(!assignee.isLazy)
			return [ "const ", to, " = exports", makeMember(assignee.name), " = ", r(rx)(value) ]
			// return [ "export const ", to, " = ", jValue ]; TODO:ES6
		default: throw new Error(k)
	} })()
	return [
		doAssign,
		opLocalCheck(rx, assignee, k === "~=").map(function(lc) { return [ rx.snl(), lc ] })
	]
}

const makeMember = function(name) {
	type(name, String)
	return mangle.needsMangle(name) ? "[\"" + name + "\"]" : "." + name
}

const opLocalCheck = function(rx, local, isLazy) {
	type(local, E.LocalDeclare, isLazy, Boolean)
	if (!rx.opts.includeTypeChecks())
		return []
	// TODO: Way to typecheck lazies
	return isLazy ? None : local.opType.map(function(typ) { return [
		"_ms.checkContains(",
		r(rx)(typ),
		", ",
		accessLocal(local.name, false),
		", \"",
		local.name,
		"\")"
	]})
}

module.exports = {
	r: r,
	accessLocal: accessLocal,
	accessMangledLocal: accessMangledLocal,
	commad: commad,
	lazyWrap: lazyWrap,
	makeAssign: makeAssign,
	makeMember: makeMember,
	opLocalCheck: opLocalCheck
}
