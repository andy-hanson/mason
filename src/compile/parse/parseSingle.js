import assert from "assert"
import { Call, ListSimple, ELiteral, LocalAccess, Quote, SpecialKeyword, Splat, This } from "../E"
import { CallOnFocus, DotName, Group, Keyword, Literal, Name } from "../T"
import { SpecialKeywords } from "../Lang"
import type, { isa } from "../U/type"
import parseSpaced from "./parseSpaced"
import Px from "./Px"
// TODO
const
	parseBlock_ = () => require("./parseBlock"),
	parseExpr_ = () => require("./parseExpr")

export default function parseSingle(px) {
	type(px, Px)
	const t = px.sqt[0]
	assert(px.sqt.length === 1)
	switch (true) {
		case isa(t, CallOnFocus):
			return Call(px.s({
				called: LocalAccess(px.s({ name: t.name })),
				args: [ LocalAccess.focus(px.span) ]
			}))

		case isa(t, Literal):
			return ELiteral(t)
		case isa(t, Name):
			return LocalAccess(px.s({ name: t.name }))
		case Keyword.is("this")(t):
			return This(px.s({}))
		case Keyword.is("_")(t):
			return LocalAccess.focus(px.span)
		case Keyword.is(SpecialKeywords)(t):
			return SpecialKeyword(px.s({ k: t.k }))

		case Group.is('sp')(t):
			return parseSpaced(px.w(t.sqt))
		case Group.is('->')(t):
			return parseBlock_().wrap(px.w(t.sqt), "val")
		case Group.is('"')(t):
			return Quote(px.s({
				parts: t.sqt.map(tSub => parseSingle(px.wt(tSub)))
			}))
		case Group.is('(')(t):
			return parseExpr_().default(px.w(t.sqt))
		case Group.is('[')(t):
			return ListSimple(px.s({
				parts: parseExpr_().parseExprParts(px.w(t.sqt))
			}))

		case isa(t, DotName):
			if (t.nDots === 3)
				return Splat(px.s({ splatted: LocalAccess(px.s({ name: t.name })) }))

		default:
			px.fail("Unexpected " + t)
	}
}
