import assert from "assert"
import E, { BlockBody, Fun, LocalDeclare } from "../E"
import { KAssign } from "../Lang"
import Span from "../Span"
import { None, some } from "../U/Op"
import { interleave } from "../U/Sq"
import type from "../U/type"
import { renderExpr } from "./index"
import mangle, { needsMangle } from "./mangle"
import Rx from "./Rx"

export function r(rx, othArg) {
	type(rx, Rx)
	return e => renderExpr(e, rx, othArg)
}

export const accessLocal = (name, isLazy) => accessMangledLocal(mangle(name), isLazy)

export function accessMangledLocal(mangledName, isLazy) {
	type(mangledName, String, isLazy, Boolean)
	return isLazy ? "_ms.unlazy(" + mangledName + ")" : mangledName
}

export function commad(rx, parts) {
	type(rx, Rx, parts, [E])
	return interleave(parts.map(r(rx)), ", ")
}

export const lazyWrap = value => [
	"_ms.lazy(function() { return ",
	value,
	"; })"
]

export function makeAssign(rx, span, assignee, k, value) {
	type(rx, Rx, span, Span, assignee, E, k, KAssign, value, E)
	const to = r(rx)(assignee)
	const doAssign = (() => { switch (k) {
		case "=": case ". ": case "<~": case "<~~":
			if (assignee.isLazy) {
				// For a lazy value, type checking is not done until after it is generated.
				const fun = Fun({
					span: span,
					opName: None,
					args: [],
					opRestArg: None,
					body: BlockBody({
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
	}})()
	return [
		doAssign,
		opLocalCheck(rx, assignee, k === "~=").map(lc => [ rx.snl(), lc ])
	]
}

export function makeMember(name) {
	type(name, String)
	return needsMangle(name) ? "[\"" + name + "\"]" : "." + name
}

export function opLocalCheck(rx, local, isLazy) {
	type(local, LocalDeclare, isLazy, Boolean)
	if (!rx.opts.includeTypeChecks())
		return []
	// TODO: Way to typecheck lazies
	return isLazy ? None : local.opType.map(typ => [
		"_ms.checkContains(",
		r(rx)(typ),
		", ",
		accessLocal(local.name, false),
		", \"",
		local.name,
		"\")"
	])
}
