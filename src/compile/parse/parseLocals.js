import assert from "assert"
import check from "../check"
import { code } from "../U"
import { None, some } from "../U/Op"
import { head, isEmpty, tail } from "../U/Sq"
import type, { isa } from "../U/type"
const
	E = require("../E"),
	Op = require("../U/Op"),
	T = require("../T")
const
	parseSpaced = require("./parseSpaced")

const parseLocals = module.exports = function(px) {
	return px.sqt.map(function(t) {
		return parseLocal(px.wt(t))
	})
}

const parseLocal = parseLocals.parseLocal = function(px) {
	let name
	let opType = None
	let isLazy = false

	assert(px.sqt.length === 1)
	const t = px.sqt[0]

	if (T.Group.is('sp')(t)) {
		const sqt = t.sqt
		let rest = sqt
		if (T.Keyword.is("~")(head(sqt))) {
			isLazy = true
			rest = tail(sqt)
		}
		name = parseLocalName(head(rest))
		const rest2 = tail(rest)
		if (!isEmpty(rest2)) {
			const colon = head(rest2)
			check(T.Keyword.is(":")(colon), colon.span, function() {
				return "Expected " + code(":")
			})
			px.check(rest2.length > 1, function() { return "Expected something after " + colon })
			const sqtType = tail(rest2)
			opType = some(parseSpaced(px.w(sqtType)))
		}
	}
	else
		name = parseLocalName(t)

	return E.LocalDeclare(px.s({ name: name, opType: opType, isLazy: isLazy, okToNotUse: false }))
}

const parseLocalName = function(t) {
	if (T.Keyword.is("_")(t))
		return "_"
	else {
		check(isa(t, T.Name), t.span, function() { return "Expected a local name, not " + t })
		return t.name
	}
}
