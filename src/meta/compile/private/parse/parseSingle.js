import { Call, ListSimple, ELiteral, GlobalAccess,
	LocalAccess, Quote, Special, Splat } from '../../Expression'
import { CallOnFocus, DotName, Group, Keyword, Literal, Name } from '../Token'
import { JsGlobals, SpecialKeywords } from '../Lang'
import { assert } from '../U/util'
import { blockWrap } from './parseBlock'
import { parseExpr, parseExprParts } from './parseExpr'
import { parseSpaced } from './parseSpaced'
import { cx, loc, tokens, w, wt } from './vars'

export default function parseSingle() {
	const t = tokens.head()
	assert(tokens.size() === 1)
	switch (true) {
		case t instanceof CallOnFocus:
			return Call(loc, access(t.name), [ LocalAccess.focus(loc) ])
		case t instanceof Literal:
			return ELiteral(t.loc, t.value, t.k)
		case t instanceof Name:
			return access(t.name)
		case t instanceof Keyword:
			if (t.k === '_')
				return LocalAccess.focus(loc)
			if (SpecialKeywords.has(t.k))
				return Special(loc, t.k)
			// Else fallthrough to fail
		case t instanceof Group:
			switch (t.k) {
				case 'sp': return w(t.tokens, parseSpaced)
				case '->': return w(t.tokens, blockWrap, 'val')
				case '"': return Quote(loc, t.tokens.map(tSub => wt(tSub, parseSingle)))
				case '(': return w(t.tokens, parseExpr)
				case '[': return ListSimple(loc, w(t.tokens, parseExprParts))
				default:
					// fallthrough
			}
		case t instanceof DotName:
			if (t.nDots === 3)
				return Splat(loc, LocalAccess(loc, t.name))
			// Else fallthrough to fail
		default:
			cx.fail(`Unexpected ${t}`)
	}
}

const access = name =>
	JsGlobals.has(name) ? GlobalAccess(loc, name) : LocalAccess(loc, name)
