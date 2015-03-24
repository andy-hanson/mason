import assert from 'assert'
import { Assign, BlockBody, BlockWrap, Call, DictReturn, Null, Yield, YieldTo } from '../Expression'
import { Keyword } from '../Token'
import type from '../U/type'
import { set } from '../U'
import { GeneratorKeywords, KFun } from '../Lang'
import { ifElse } from '../U/Op'
import { cons, head, isEmpty, last, opSplitManyWhere, rtail, tail } from '../U/Bag'
import parseCase from './parseCase'
import { parseLocal } from './parseLocals'
import parseSingle from './parseSingle'
import Px from './Px'
// TODO
const parseFun_ = () => require('./parseFun')

export default function parseExpr(px) {
	return ifElse(opSplitManyWhere(px.sqt, Keyword.is('. ')),
		splits => {
			// Short object form, such as (a. 1, b. 2)
			const first = splits[0].before
			const sqtCaller = rtail(first)

			const keys = []
			const lines = []
			for (let i = 0; i < splits.length - 1; i = i + 1) {
				const local = set(
					parseLocal(px.wt(last(splits[i].before))),
					'okToNotUse', true)
				keys.push(local)
				const sqtValue = i === splits.length - 2 ?
					splits[i + 1].before :
					rtail(splits[i + 1].before)
				const value = parseExprPlain(px.w(sqtValue))
				lines.push(Assign({
					// TODO: Include name span
					span: value.span,
					assignee: local,
					k: '. ',
					value: parseExprPlain(px.w(sqtValue))
				}))
			}
			assert(last(splits).at === undefined)
			const val = BlockWrap(px.s({
				body: BlockBody(px.s({
					lines: lines,
					opReturn: [ DictReturn(px.s({
						keys: keys,
						debugKeys: [],
						opDicted: [],
						opDisplayName: []
					})) ],
					opIn: [],
					opOut: []
				}))
			}))
			if (isEmpty(sqtCaller))
				return val
			else {
				const parts = parseExprParts(px.w(sqtCaller))
				assert(!isEmpty(parts))
				return Call(px.s({
					called: head(parts),
					args: tail(parts).concat([ val ])
				}))
			}
		},
		() =>parseExprPlain(px)
	)
}

function parseExprPlain(px) {
	type(px, Px)
	const parts = parseExprParts(px)
	switch (parts.length) {
		case 0:
			return Null(px.s({}))
		case 1:
			return head(parts)
		default:
			return Call(px.s({ called: head(parts), args: tail(parts) }))
	}
}

export function parseExprParts(px) {
	type(px, Px)
	if (isEmpty(px.sqt))
		return []
	const first = head(px.sqt), rest = tail(px.sqt)
	switch (true) {
		case Keyword.is(KFun)(first):
			return [ parseFun_()(px.w(rest), first.k) ]
		// `case!` can not be part of an expression - it is a statement.
		case Keyword.is('case')(first):
			return [ parseCase(px.w(rest), 'case', false) ]
		case Keyword.is(GeneratorKeywords)(first): {
			const y = parseExpr(px.w(rest))
			switch (first.k) {
				case '<~': return [ Yield(px.s({ yielded: y })) ]
				case '<~~': return [ YieldTo(px.s({ yieldedTo: y })) ]
				default: throw new Error(first.k)
			}
		}
		default:
			return cons(parseSingle(px.wt(first)), parseExprParts(px.w(rest)))
	}
}
