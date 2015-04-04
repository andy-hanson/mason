import { Call, ListSimple, ELiteral, GlobalAccess, LocalAccess,
	Quote, Special, Splat, This } from '../../Expression'
import { CallOnFocus, DotName, Group, Keyword, Literal, Name } from '../Token'
import { JsGlobals, SpecialKeywords } from '../Lang'
import type from '../U/type'
import { assert, lazy } from '../U/util'
import parseSpaced from './parseSpaced'
import Px from './Px'
// TODO:ES6
const
	blockWrap_ = lazy(() => require('./parseBlock').blockWrap),
	parseExpr_ = lazy(() => require('./parseExpr'))

export default function parseSingle(px) {
	type(px, Px)
	const t = px.tokens.head()
	assert(px.tokens.size() === 1)
	switch (true) {
		case t instanceof CallOnFocus:
			return Call(px.span, access(px, t.name), [ LocalAccess.focus(px.span) ])
		case t instanceof Literal:
			return ELiteral(t.span, t.value, t.k)
		case t instanceof Name:
			return access(px, t.name)
		case t instanceof Keyword:
			if (t.k === '_')
				return LocalAccess.focus(px.span)
			if (SpecialKeywords.has(t.k))
				return Special(px.span, t.k)
			// Else fallthrough to fail
		case t instanceof Group:
			switch (t.k) {
				case 'sp': return px.w(t.tokens, parseSpaced)
				case '->': return px.w(t.tokens, blockWrap_(), 'val')
				case '"': return Quote(px.span, t.tokens.map(tSub => px.wt(tSub, parseSingle)))
				case '(': return px.w(t.tokens, parseExpr_().default)
				case '[': return ListSimple(px.span, px.w(t.tokens, parseExpr_().parseExprParts))
				default:
					// fallthrough
			}
		case t instanceof DotName:
			if (t.nDots === 3)
				return Splat(px.span, LocalAccess(px.span, t.name))
			// Else fallthrough to fail
		default:
			px.fail(`Unexpected ${t}`)
	}
}

const access = (px, name) =>
	JsGlobals.has(name) ? GlobalAccess(px.span, name) : LocalAccess(px.span, name)
