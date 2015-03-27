import assert from 'assert'
import { Call, ListSimple, ELiteral, LocalAccess,
	Quote, Special, Splat, This } from '../Expression'
import { CallOnFocus, DotName, Group, Keyword, Literal, Name } from '../Token'
import { SpecialKeywords } from '../Lang'
import { lazy } from '../U'
import type from '../U/type'
import parseSpaced from './parseSpaced'
import Px from './Px'
// TODO:ES6
const
	parseBlock_ = lazy(() => require('./parseBlock')),
	parseExpr_ = lazy(() => require('./parseExpr'))

export default function parseSingle(px) {
	type(px, Px)
	const t = px.tokens.head()
	assert(px.tokens.size() === 1)
	switch (true) {
		case t instanceof CallOnFocus:
			return Call(px.s({
				called: LocalAccess(px.s({ name: t.name })),
				args: [ LocalAccess.focus(px.span) ]
			}))
		case t instanceof Literal:
			return ELiteral(t)
		case t instanceof Name:
			return LocalAccess(px.s({ name: t.name }))
		case Keyword.is('_')(t):
			return LocalAccess.focus(px.span)
		case Keyword.is(SpecialKeywords)(t):
			return Special(px.s({ k: t.k }))
		case Group.is('sp')(t):
			return px.w(t.tokens, parseSpaced)
		case Group.is('->')(t):
			return px.w(t.tokens, parseBlock_().wrap, 'val')
		case Group.is('"')(t):
			return Quote(px.s({
				parts: t.tokens.map(tSub => px.wt(tSub, parseSingle))
			}))
		case Group.is('(')(t):
			return px.w(t.tokens, parseExpr_().default)
		case Group.is('[')(t):
			return ListSimple(px.s({
				parts: px.w(t.tokens, parseExpr_().parseExprParts)
			}))
		case t instanceof DotName:
			if (t.nDots === 3)
				return Splat(px.s({ splatted: LocalAccess(px.s({ name: t.name })) }))
		default:
			px.fail(`Unexpected ${t}`)
	}
}
