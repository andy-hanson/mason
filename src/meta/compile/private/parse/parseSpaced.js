import { code } from '../../CompileError'
import { Call, Lazy, LocalAccess, Member } from '../../Expression'
import { DotName, Group, Keyword } from '../Token'
import { unshift } from '../U/Bag'
import type from '../U/type'
import { assert, lazy } from '../U/util'
import Px from './Px'
import parseSingle from './parseSingle'
// TODO:ES6
import * as PE from './parseExpr'

export function parseSpaced(px) {
	type(px, Px)
	const h = px.tokens.head(), rest = px.tokens.tail()
	switch (true) {
		case h instanceof Keyword:
			if (h.k === ':') {
				px.check(!Keyword.isColon(rest.head()), h.loc, () => `Two ${h} in a row`)
				const eType = px.w(rest, parseSpaced)
				const focus = LocalAccess.focus(h.loc)
				return Call.contains(h.loc, eType, focus)
			} else if (h.k === '~')
				return Lazy(h.loc, px.w(rest, parseSpaced))
		default: {
			const memberOrSubscript = px => (e, t) => {
				const loc = t.loc
				if (t instanceof DotName) {
					px.check(t.nDots === 1, loc, 'Too many dots!')
					return Member(loc, e, t.name)
				} else if (t instanceof Group) {
					if (t.k === '[')
						return Call.sub(loc,
							unshift(e, px.w(t.tokens, PE.parseExprParts)))
					if (t.k === '(') {
						px.check(t.tokens.isEmpty(), loc,
							() => `Use ${code('(a b)')}, not ${code('a(b)')}`)
						return Call(loc, e, [])
					}
				} else px.fail(loc, `Expected member or sub, not ${t}`)
			}
			return rest.reduce(memberOrSubscript(px), px.wt(h, parseSingle))
		}
	}
}
