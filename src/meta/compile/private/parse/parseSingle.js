import { Call, ListSimple, ELiteral, GlobalAccess,
	LocalAccess, Quote, Special, Splat } from '../../Expression'
import { CallOnFocus, DotName, Group, Keyword, Literal, Name } from '../Token'
import { JsGlobals, SpecialKeywords } from '../Lang'
import type from '../U/type'
import { assert } from '../U/util'
import Px from './Px'
// TODO:ES6
import * as PB from './parseBlock'
import * as ParseExpr from './parseExpr'
import * as PS from './parseSpaced'

export default function parseSingle(px) {
	type(px, Px)
	const t = px.tokens.head()
	assert(px.tokens.size() === 1)
	switch (true) {
		case t instanceof CallOnFocus:
			return Call(px.loc, access(px, t.name), [ LocalAccess.focus(px.loc) ])
		case t instanceof Literal:
			return ELiteral(t.loc, t.value, t.k)
		case t instanceof Name:
			return access(px, t.name)
		case t instanceof Keyword:
			if (t.k === '_')
				return LocalAccess.focus(px.loc)
			if (SpecialKeywords.has(t.k))
				return Special(px.loc, t.k)
			// Else fallthrough to fail
		case t instanceof Group:
			switch (t.k) {
				case 'sp': return px.w(t.tokens, PS.parseSpaced)
				case '->': return px.w(t.tokens, PB.blockWrap, 'val')
				case '"': return Quote(px.loc, t.tokens.map(tSub => px.wt(tSub, parseSingle)))
				case '(': return px.w(t.tokens, ParseExpr.default)
				case '[': return ListSimple(px.loc, px.w(t.tokens, ParseExpr.parseExprParts))
				default:
					// fallthrough
			}
		case t instanceof DotName:
			if (t.nDots === 3)
				return Splat(px.loc, LocalAccess(px.loc, t.name))
			// Else fallthrough to fail
		default:
			px.fail(`Unexpected ${t}`)
	}
}

const access = (px, name) =>
	JsGlobals.has(name) ? GlobalAccess(px.loc, name) : LocalAccess(px.loc, name)
