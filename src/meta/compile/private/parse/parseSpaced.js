import { code } from '../../CompileError'
import { Call, Lazy, LocalAccess, Member } from '../../Expression'
import { DotName, Group, Keyword } from '../Token'
import { unshift } from '../U/Bag'
import { parseExprParts } from './parseExpr'
import parseSingle from './parseSingle'
import { cx, tokens, w, wt } from './vars'

export function parseSpaced() {
	const h = tokens.head(), rest = tokens.tail()
	switch (true) {
		case h instanceof Keyword:
			if (h.k === ':') {
				cx.check(!Keyword.isColon(rest.head()), h.loc, () => `Two ${h} in a row`)
				const eType = w(rest, parseSpaced)
				const focus = LocalAccess.focus(h.loc)
				return Call.contains(h.loc, eType, focus)
			} else if (h.k === '~')
				return Lazy(h.loc, w(rest, parseSpaced))
		default: {
			const memberOrSubscript = (e, t) => {
				const loc = t.loc
				if (t instanceof DotName) {
					cx.check(t.nDots === 1, loc, 'Too many dots!')
					return Member(loc, e, t.name)
				} else if (t instanceof Group) {
					if (t.k === '[')
						return Call.sub(loc,
							unshift(e, w(t.tokens, parseExprParts)))
					if (t.k === '(') {
						cx.check(t.tokens.isEmpty(), loc,
							() => `Use ${code('(a b)')}, not ${code('a(b)')}`)
						return Call(loc, e, [])
					}
				} else cx.fail(loc, `Expected member or sub, not ${t}`)
			}
			return rest.reduce(memberOrSubscript, wt(h, parseSingle))
		}
	}
}
