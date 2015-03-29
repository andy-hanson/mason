import check from '../check'
import { Block, Fun, LocalDeclare } from '../Expression'
import { CaseKeywords, KFun } from '../Lang'
import { DotName, Group, Keyword } from '../Token'
import type from '../U/type'
import { code, lazy } from '../U'
import { ifElse, None, opIf, some } from '../U/Op'
import parseCase from './parseCase'
import parseLocalDeclares from './parseLocalDeclares'
import parseSpaced from './parseSpaced'
import Px from './Px'
// TODO
const parseBlock_ = lazy(() => require('./parseBlock'))

export default function parseFun(px, k) {
	type(px, Px, k, KFun)

	// Look for return type at the beginning
	const { opReturnType, rest } = (() => {
		if (!px.tokens.isEmpty()) {
			const h = px.tokens.head()
			if (Group.is('sp')(h) && Keyword.is(':')(h.tokens.head()))
				return {
					opReturnType: some(px.w(h.tokens.tail(), parseSpaced)),
					rest: px.tokens.tail()
				}
		}
		return { opReturnType: None, rest: px.tokens }
	})()

	px.check(!rest.isEmpty(), () => `Expected an indented block after ${code(k)}`)
	const h = rest.head()

	const { args, opRestArg, block } = (() => {
		if (Keyword.is(CaseKeywords)(h)) {
			const eCase = px.w(rest.tail(), parseCase, h.k, true)
			return {
				args: [ LocalDeclare.UntypedFocus(h.span) ],
				opRestArg: None,
				block: Block(px.s({
					opIn: None,
					lines: h.k === 'case' ? [] : [eCase],
					opReturn: opIf(h.k === 'case', () => eCase),
					opOut: None
				}))
			}
		}
		// Might be curried.
		else return ifElse(px.tokens.opSplitOnceWhere(t => Keyword.is('|')(t)),
			_ => {
				const { args, opRestArg } = px.w(_.before, parseFunLocals)
				const block = px.w(_.after, () => Block(px.s({
					opIn: None,
					lines: [],
					opReturn: some(parseFun(px, _.at.k)),
					opOut: None
				})))
				return { args, opRestArg, block }
			},
			() => {
				const { before, block } = px.w(rest, parseBlock_().takeBlockFromEnd, 'any')
				const { args, opRestArg } = px.w(before, parseFunLocals)
				return { args, opRestArg, block }
			})
	})()

	return Fun(px.s({ args, opRestArg, block, opReturnType, k }))
}

function parseFunLocals(px) {
	if (px.tokens.isEmpty())
		return { args: [], opRestArg: None }
	else {
		const l = px.tokens.last()
		if (l instanceof DotName) {
			check(l.nDots === 3, l.span, 'Splat argument must have exactly 3 dots')
			return {
				args: px.w(px.tokens.rtail(), parseLocalDeclares),
				opRestArg: some(LocalDeclare({
					span: l.span,
					name: l.name,
					opType: None,
					isLazy: false,
					okToNotUse: false
				}))
			}
		}
		else return { args: parseLocalDeclares(px), opRestArg: None }
	}
}
