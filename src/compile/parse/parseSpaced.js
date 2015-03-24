import check, { fail } from '../check'
import { Call, Lazy, LocalAccess, Member, Sub, TypeTest } from '../Expression'
import { DotName, Group, Keyword } from '../Token'
import { code } from '../U'
import { head, tail } from '../U/Bag'
import type, { isa } from '../U/type'
import Px from './Px'
const
	parseSingle_ = () => require('./parseSingle'),
	parseExpr_ = () => require('./parseExpr')

export default function parseSpaced(px) {
	type(px, Px)
	const h = head(px.sqt), rest = tail(px.sqt)
	switch (true) {
		case Keyword.is(':')(h): {
			check(!Keyword.is(':')(head(rest)), h.span, () => `Two ${code(':')} in a row`)
			const eType = parseSpaced(px.w(rest))
			const focus = LocalAccess.focus(h.span)
			return TypeTest({ span: h.span, tested: focus, testType: eType })
		}
		case Keyword.is('~')(h):
			return Lazy({ span: h.span, value: parseSpaced(px.w(rest)) })
		default: {
			const memberOrSubscript = px => (e, t) => {
				const span = t.span
				if (isa(t, DotName))
					switch (t.nDots) {
						case 1:
							return Member({ span: span, object: e, name: t.name })
						default:
							fail(span, 'Too many dots!')
					}
				if (Group.is('[')(t))
					return Sub({
						span: span,
						subject: e,
						subbers: parseExpr_().parseExprParts(px.w(t.sqt))
					})
				if (Group.is('(')(t))
					return Call({
						span: span,
						called: e,
						args: []
					})
				fail(span, `Expected member or sub, not ${code(t)}`)
			}
			return rest.reduce(memberOrSubscript(px), parseSingle_()(px.wt(h)))
		}
	}
}
