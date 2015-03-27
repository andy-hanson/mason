import check, { fail } from '../check'
import { Call, Lazy, LocalAccess, Member } from '../Expression'
import { DotName, Group, Keyword } from '../Token'
import { code, lazy } from '../U'
import type from '../U/type'
import Px from './Px'
const
	parseSingle_ = lazy(() => require('./parseSingle')),
	parseExpr_ = lazy(() => require('./parseExpr'))

export default function parseSpaced(px) {
	type(px, Px)
	const h = px.tokens.head(), rest = px.tokens.tail()
	switch (true) {
		case Keyword.is(':')(h): {
			check(!Keyword.is(':')(rest.head()), h.span, () => `Two ${code(':')} in a row`)
			const eType = px.w(rest, parseSpaced)
			const focus = LocalAccess.focus(h.span)
			return Call.contains(h.span, eType, focus)
		}
		case Keyword.is('~')(h):
			return Lazy({ span: h.span, value: px.w(rest, parseSpaced) })
		default: {
			const memberOrSubscript = px => (e, t) => {
				const span = t.span
				if (t instanceof DotName)
					switch (t.nDots) {
						case 1:
							return Member({ span, object: e, name: t.name })
						default:
							fail(span, 'Too many dots!')
					}
				else if (Group.is('[')(t))
					return Call.sub(span, e, px.w(t.tokens, parseExpr_().parseExprParts))
				else if (Group.is('(')(t))
					return Call({ span, called: e, args: [] })
				else fail(span, `Expected member or sub, not ${t}`)
			}
			return rest.reduce(memberOrSubscript(px), px.wt(h, parseSingle_()))
		}
	}
}
