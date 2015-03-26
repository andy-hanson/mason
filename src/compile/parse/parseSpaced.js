import check, { fail } from '../check'
import { Call, Lazy, LocalAccess, Member } from '../Expression'
import { DotName, Group, Keyword } from '../Token'
import { code } from '../U'
import { head, tail } from '../U/Bag'
import type from '../U/type'
import Px from './Px'
const
	parseSingle_ = () => require('./parseSingle'),
	parseExpr_ = () => require('./parseExpr')

export default function parseSpaced(px) {
	type(px, Px)
	const h = head(px.tokens), rest = tail(px.tokens)
	switch (true) {
		case Keyword.is(':')(h): {
			check(!Keyword.is(':')(head(rest)), h.span, () => `Two ${code(':')} in a row`)
			const eType = parseSpaced(px.w(rest))
			const focus = LocalAccess.focus(h.span)
			return Call.contains(h.span, eType, focus)
		}
		case Keyword.is('~')(h):
			return Lazy({ span: h.span, value: parseSpaced(px.w(rest)) })
		default: {
			const memberOrSubscript = px => (e, t) => {
				const span = t.span
				if (t instanceof DotName)
					switch (t.nDots) {
						case 1:
							return Member({ span: span, object: e, name: t.name })
						default:
							fail(span, 'Too many dots!')
					}
				else if (Group.is('[')(t))
					return Call.sub(span, e, parseExpr_().parseExprParts(px.w(t.tokens)))
				else if (Group.is('(')(t))
					return Call({
						span: span,
						called: e,
						args: []
					})
				else fail(span, `Expected member or sub, not ${code(t)}`)
			}
			return rest.reduce(memberOrSubscript(px), parseSingle_()(px.wt(h)))
		}
	}
}
