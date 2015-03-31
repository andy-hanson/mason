import assert from 'assert'
import { Call, ListSimple, ELiteral, GlobalAccess, LocalAccess,
	Quote, Special, Splat, This } from '../Expression'
import { CallOnFocus, DotName, Group, Keyword, Literal, Name } from '../Token'
import { JsGlobals, SpecialKeywords } from '../Lang'
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
				called: access(px, t.name),
				args: [ LocalAccess.focus(px.span) ]
			}))
		case t instanceof Literal:
			return ELiteral(t)
		case t instanceof Name:
			return access(px, t.name)
		case t instanceof Keyword:
			if (t.k === '_')
				return LocalAccess.focus(px.span)
			if (SpecialKeywords.has(t.k))
				return Special(px.s({ k: t.k }))
			// Else fallthrough to fail
		case t instanceof Group:
			switch (t.k) {
				case 'sp': return px.w(t.tokens, parseSpaced)
				case '->': return px.w(t.tokens, parseBlock_().wrap, 'val')
				case '"': return Quote(px.s({
						parts: t.tokens.map(tSub => px.wt(tSub, parseSingle))
					}))
				case '(': return px.w(t.tokens, parseExpr_().default)
				case '[': return ListSimple(px.s({
					parts: px.w(t.tokens, parseExpr_().parseExprParts)
				}))
				default:
					// fallthrough
			}
		case t instanceof DotName:
			if (t.nDots === 3)
				return Splat(px.s({ splatted: LocalAccess(px.s({ name: t.name })) }))
			// Else fallthrough to fail
		default:
			px.fail(`Unexpected ${t}`)
	}
}

const access = (px, name) =>
	JsGlobals.has(name) ? GlobalAccess(px.s({ name })) : LocalAccess(px.s({ name }))
