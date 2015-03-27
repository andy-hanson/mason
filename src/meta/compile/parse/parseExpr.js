import assert from 'assert'
import check from '../check'
import { Assign, BlockBody, BlockWrap, Call,
	ObjReturn, ObjSimple, Special, Yield, YieldTo } from '../Expression'
import { Keyword } from '../Token'
import type from '../U/type'
import { lazy, set } from '../U'
import { GeneratorKeywords, KFun } from '../Lang'
import { ifElse } from '../U/Op'
import { cons, head, isEmpty, last, rtail, tail } from '../U/Bag'
import parseCase from './parseCase'
import { parseLocal } from './parseLocals'
import parseSingle from './parseSingle'
import Px from './Px'
// TODO:ES6
const parseFun_ = lazy(() => require('./parseFun'))

export default function parseExpr(px) {
	return ifElse(px.tokens.opSplitManyWhere(Keyword.is('. ')),
		splits => {
			// Short object form, such as (a. 1, b. 2)
			const first = splits[0].before
			const tokensCaller = first.rtail()

			const keysVals = {}
			for (let i = 0; i < splits.length - 1; i = i + 1) {
				const local = px.wt(splits[i].before.last(), parseLocal)
				const tokensValue = i === splits.length - 2 ?
					splits[i + 1].before :
					splits[i + 1].before.rtail()
				const value = px.w(tokensValue, parseExprPlain)
				check(!Object.prototype.hasOwnProperty.call(keysVals, local.name), local.span, () =>
					`Duplicate property ${local}.`)
				Object.defineProperty(keysVals, local.name, { value })
			}
			assert(last(splits).at === undefined)
			const val = ObjSimple(px.s({ keysVals }))
			if (tokensCaller.isEmpty())
				return val
			else {
				const parts = px.w(tokensCaller, parseExprParts)
				assert(!isEmpty(parts))
				return Call(px.s({ called: head(parts), args: tail(parts).concat([ val ]) }))
			}
		},
		() => parseExprPlain(px)
	)
}

function parseExprPlain(px) {
	type(px, Px)
	const parts = parseExprParts(px)
	switch (parts.length) {
		case 0:
			return Special.null(px.span)
		case 1:
			return head(parts)
		default:
			return Call(px.s({ called: head(parts), args: tail(parts) }))
	}
}

export function parseExprParts(px) {
	type(px, Px)

	const out = []
	const end = px.tokens.end
	for (let i = px.tokens.start; i < end; i = i + 1) {
		const first = px.tokens.data[i]
		const rest = () => px.tokens._new(i + 1, end)
		if (Keyword.is(KFun)(first)) {
			out.push(px.w(rest(), parseFun_(), first.k))
			break
		} else if (Keyword.is('case')(first)) {
			out.push(px.w(rest(), parseCase, 'case', false))
			break
		} else if (Keyword.is(GeneratorKeywords)(first)) {
			const y = px.w(rest(), parseExpr)
			switch (first.k) {
				case '<~':
					out.push(Yield(px.s({ yielded: y })))
					break
				case '<~~':
					out.push(YieldTo(px.s({ yieldedTo: y })))
					break
				default: throw new Error(first.k)
			}
			break
		} else
			out.push(px.wt(first, parseSingle))
	}
	return out
}
