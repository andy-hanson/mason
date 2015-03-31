import check, { fail } from '../check'
import { Call, Lazy, LocalAccess, Member } from '../Expression'
import { DotName, Group, Keyword } from '../Token'
import { code, lazy } from '../U'
import { unshift } from '../U/Bag'
import type from '../U/type'
import Px from './Px'
const
	parseSingle_ = lazy(() => require('./parseSingle')),
	parseExpr_ = lazy(() => require('./parseExpr'))

export default function parseSpaced(px) {
	type(px, Px)
	const h = px.tokens.head(), rest = px.tokens.tail()
	switch (true) {
		case h instanceof Keyword:
			if (h.k === ':') {
				check(!Keyword.isColon(rest.head()), h.span, () => `Two ${h} in a row`)
				const eType = px.w(rest, parseSpaced)
				const focus = LocalAccess.focus(h.span)
				return Call.contains(h.span, eType, focus)
			} else if (h.k === '~')
				return Lazy({ span: h.span, value: px.w(rest, parseSpaced) })
		default: {
			const memberOrSubscript = px => (e, t) => {
				const span = t.span
				if (t instanceof DotName) {
					check(t.nDots === 1, span, 'Too many dots!')
					return Member({ span, object: e, name: t.name })
				} else if (t instanceof Group) {
					if (t.k === '[')
						return Call.sub(span,
							unshift(e, px.w(t.tokens, parseExpr_().parseExprParts)))
					if (t.k === '(') {
						check(t.tokens.isEmpty(), t.span, `Use ${code('a b')}, not ${code('a(b)')}`)
						return Call({ span, called: e, args: [] })
					}
				} else fail(span, `Expected member or sub, not ${t}`)
			}
			return rest.reduce(memberOrSubscript(px), px.wt(h, parseSingle_()))
		}
	}
}
