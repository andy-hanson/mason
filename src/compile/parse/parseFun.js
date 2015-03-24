import check from '../check'
import { BlockBody, Fun, LocalDeclare } from '../Expression'
import { CaseKeywords, KFun } from '../Lang'
import { DotName, Group, Keyword } from '../Token'
import type, { isa } from '../U/type'
import { code } from '../U'
import { ifElse, None, opIf, some } from '../U/Op'
import { head, isEmpty, last, opSplitOnceWhere, rtail, tail } from '../U/Bag'
import parseCase from './parseCase'
import parseLocals from './parseLocals'
import parseSpaced from './parseSpaced'
import Px from './Px'
// TODO
const parseBlock_ = () => require('./parseBlock')

export default function parseFun(px, k) {
	type(px, Px, k, KFun)

	// Look for return type at the beginning
	let _ = (() => {
		if (!isEmpty(px.sqt)) {
			const h = head(px.sqt)
			if (Group.is('sp')(h) && Keyword.is(':')(head(h.sqt)))
				return {
					opType: some(parseSpaced(px.w(tail(h.sqt)))),
					rest: tail(px.sqt)
				}
		}
		return { opType: None, rest: px.sqt }
	})()
	const opReturnType = _.opType, rest = _.rest

	px.check(!isEmpty(rest), () => `Expected an indented block after ${code(k)}`)
	const h = head(rest)

	_ = (() => {
		if (Keyword.is(CaseKeywords)(h)) {
			const eCase = parseCase(px.w(tail(rest)), h.k, true)
			return {
				args: [ LocalDeclare.UntypedFocus(h.span) ],
				opRestArg: None,
				body: BlockBody(px.s({
					opIn: None,
					lines: h.k === 'case' ? [] : [eCase],
					opReturn: opIf(h.k === 'case', () => eCase),
					opOut: None
				}))
			}
		}
		// Might be curried.
		else return ifElse(opSplitOnceWhere(px.sqt, t => Keyword.is('|')(t)),
			_ => {
				const _$ = parseFunLocals(px.w(_.before))
				const pxAfter = px.w(_.after)
				return {
					args: _$.args,
					opRestArg: _$.opRestArg,
					body: BlockBody(pxAfter.s({
						opIn: None,
						lines: [],
						opReturn: some(parseFun(pxAfter, _.at.k)),
						opOut: None
					}))
				}
			},
			() => {
				const _$ = parseBlock_().takeBlockFromEnd(px.w(rest), 'any')
				const _$2 = parseFunLocals(px.w(_$.before))
				return {
					args: _$2.args,
					opRestArg: _$2.opRestArg,
					body: _$.block
				}
			})
	})()

	return Fun(px.s({
		args: _.args,
		opRestArg: _.opRestArg,
		body: _.body,
		opReturnType: opReturnType,
		k: k
	}))
}

function parseFunLocals(px) {
	if (isEmpty(px.sqt))
		return {
			args: [],
			opRestArg: None
		}
	else {
		const l = last(px.sqt)
		if (isa(l, DotName)) {
			check(l.nDots === 3, l.span, 'Splat argument must have exactly 3 dots')
			return {
				args: parseLocals(px.w(rtail(px.sqt))),
				opRestArg: some(LocalDeclare({
					span: l.span,
					name: l.name,
					opType: None,
					isLazy: false,
					okToNotUse: false
				}))
			}
		}
		else return {
			args: parseLocals(px),
			opRestArg: None
		}
	}
}
