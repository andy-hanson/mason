import { code } from '../CompileError'
import { Call, Lazy, LocalAccess, Member } from '../Expression'
import { DotName, Group, Keyword } from '../Token'
import { assert, lazy } from '../U'
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
				px.check(!Keyword.isColon(rest.head()), h.span, () => `Two ${h} in a row`)
				const eType = px.w(rest, parseSpaced)
				const focus = LocalAccess.focus(h.span)
				return Call.contains(h.span, eType, focus)
			} else if (h.k === '~')
				return Lazy(h.span, px.w(rest, parseSpaced))
		default: {
			const memberOrSubscript = px => (e, t) => {
				const span = t.span
				if (t instanceof DotName) {
					px.check(t.nDots === 1, span, 'Too many dots!')
					return Member(span, e, t.name)
				} else if (t instanceof Group) {
					if (t.k === '[')
						return Call.sub(span,
							unshift(e, px.w(t.tokens, parseExpr_().parseExprParts)))
					if (t.k === '(') {
						px.check(t.tokens.isEmpty(), span,
							() => `Use ${code('(a b)')}, not ${code('a(b)')}`)
						return Call(span, e, [])
					}
				} else px.fail(span, `Expected member or sub, not ${t}`)
			}
			return rest.reduce(memberOrSubscript(px), px.wt(h, parseSingle_()))
		}
	}
}
