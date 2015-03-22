import check, { fail } from "../check"
import { code } from "../U"
import { head, tail } from "../U/Sq"
import type, { isa } from "../U/type"
const
	E = require("../E"),
	T = require("../T"),
	Px = require("./Px")
const
	parseSingle_ = function() { return require("./parseSingle") },
	parseExpr_ = function() { return require("./parseExpr") }

module.exports = function parseSpaced(px) {
	type(px, Px)
	const h = head(px.sqt), rest = tail(px.sqt)
	switch (true) {
		case T.Keyword.is(":")(h): {
			check(!T.Keyword.is(":")(head(rest)), h.span, "Two " + code(":") + " in a row")
			const eType = parseSpaced(px.w(rest))
			const focus = E.LocalAccess.focus(h.span)
			return E.TypeTest({ span: h.span, tested: focus, testType: eType })
		}
		case T.Keyword.is("~")(h):
			return E.Lazy({ span: h.span, value: parseSpaced(px.w(rest)) })
		default: {
			const memberOrSubscript = function(px) { return function(e, t) {
				const span = t.span
				if (isa(t, T.DotName))
					switch (t.nDots) {
						case 1:
							return E.Member({ span: span, object: e, name: t.name })
						default:
							fail(span, "Too many dots!")
					}
				if (T.Group.is('[')(t))
					return E.Sub({
						span: span,
						subject: e,
						subbers: parseExpr_().parseExprParts(px.w(t.sqt))
					})
				if (T.Group.is('(')(t))
					return E.Call({
						span: span,
						called: e,
						args: []
					})
				fail(span, "Expected member or sub, not " + t)
			} }
			return rest.reduce(memberOrSubscript(px), parseSingle_()(px.wt(h)))
		}
	}
}
