"use strict"

const
	check = require("../check"),
	E = require("../E"),
	T = require("../T"),
	Sq = require("../U/Sq"),
	type = require("../U/type"),
		isa = type.isa,
	U = require("../U"),
	Px = require("./Px")
const
	parseSingle_ = function() { return require("./parseSingle") },
	parseExpr_ = function() { return require("./parseExpr") }

module.exports = function parseSpaced(px, sqt) {
	type(px, Px, sqt, [T])
	const head = Sq.head(sqt), rest = Sq.tail(sqt)
	switch (true) {
		case T.Keyword.is(":")(head): {
			check(!T.Keyword.is(":")(Sq.head(rest)), head.span, "Two " + U.code(":") + " in a row")
			const eType = parseSpaced(px, rest)
			const focus = E.LocalAccess.focus(head.span)
			return E.TypeTest({ span: head.span, tested: focus, testType: eType })
		}
		case T.Keyword.is("~")(head):
			return E.Lazy({ span: head.span, value: parseSpaced(px, rest) })
		default: {
			const memberOrSubscript = function(px) { return function(e, t) {
				const span = t.span
				if (isa(t, T.DotName))
					switch (t.nDots) {
						case 1:
							return E.Member({ span: span, object: e, name: t.name })
						default:
							check.fail(span, "Too many dots!")
					}
				if (T.Group.is('[')(t))
					return E.Sub({
						span: span,
						subject: e,
						subbers: parseExpr_().parseExprParts(px, t.sqt)
					})
				if (T.Group.is('(')(t))
					return E.Call({
						span: span,
						called: e,
						args: []
					})
				check.fail(span, "Expected member or sub, not " + t)
			} }
			return rest.reduce(memberOrSubscript(px), parseSingle_()(px, head))
		}
	}
}
