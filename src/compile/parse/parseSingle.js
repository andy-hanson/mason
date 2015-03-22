import { SpecialKeywords } from "../Lang"
import type, { isa } from "../U/type"
const
	assert = require("assert"),
	E = require("../E"),
	T = require("../T"),
	Px = require("./Px")
const
	parseBlock_ = function() { return require("./parseBlock") },
	parseExpr_ = function() { return require("./parseExpr") },
	parseSpaced = require("./parseSpaced")

module.exports = function parseSingle(px) {
	type(px, Px)
	const t = px.sqt[0]
	assert(px.sqt.length === 1)
	switch (true) {
		case isa(t, T.CallOnFocus):
			return E.Call(px.s({
				called: E.LocalAccess(px.s({ name: t.name })),
				args: [E.LocalAccess.focus(px.span)]
			}))

		case isa(t, T.Literal):
			return E.Literal(t)
		case isa(t, T.Name):
			return E.LocalAccess(px.s({ name: t.name }))
		case T.Keyword.is("this")(t):
			return E.This(px.s({}))
		case T.Keyword.is("_")(t):
			return E.LocalAccess.focus(px.span)
		case T.Keyword.is(SpecialKeywords)(t):
			return E.SpecialKeyword(px.s({ k: t.k }))

		case T.Group.is('sp')(t):
			return parseSpaced(px.w(t.sqt))
		case T.Group.is('->')(t):
			return parseBlock_().wrap(px.w(t.sqt), "val")
		case T.Group.is('"')(t):
			return E.Quote(px.s({
				parts: t.sqt.map(function(tSub) { return parseSingle(px.wt(tSub)) })
			}))
		case T.Group.is('(')(t):
			return parseExpr_()(px.w(t.sqt))
		case T.Group.is('[')(t):
			return E.ListSimple(px.s({
				parts: parseExpr_().parseExprParts(px.w(t.sqt))
			}))

		case isa(t, T.DotName):
			if (t.nDots === 3)
				return E.Splat(px.s({ splatted: E.LocalAccess(px.s({ name: t.name })) }))

		default:
			px.fail("Unexpected " + t)
	}
}
