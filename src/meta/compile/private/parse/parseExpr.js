import { Assign, Call, GlobalAccess, ObjReturn, ObjSimple, Yield, YieldTo } from '../../Expression'
import { Keyword } from '../Token'
import type from '../U/type'
import { assert, lazy } from '../U/util'
import { GeneratorKeywords, KFun } from '../Lang'
import { ifElse } from '../U/Op'
import { cons, head, isEmpty, last, push, rtail, tail } from '../U/Bag'
import parseFun from './parseFun'
import { parseLocalDeclare } from './parseLocalDeclares'
import parseSingle from './parseSingle'
import Px from './Px'
// TODO:ES6
import * as PC from './parseCase'

export default function parseExpr(px) {
	return ifElse(px.tokens.opSplitManyWhere(Keyword.isObjAssign),
		splits => {
			// Short object form, such as (a. 1, b. 2)
			const first = splits[0].before
			const tokensCaller = first.rtail()

			const keysVals = {}
			for (let i = 0; i < splits.length - 1; i = i + 1) {
				const local = px.wt(splits[i].before.last(), parseLocalDeclare)
				// Can't have got a type because there's only one token.
				assert(isEmpty(local.opType))
				const tokensValue = i === splits.length - 2 ?
					splits[i + 1].before :
					splits[i + 1].before.rtail()
				const value = px.w(tokensValue, parseExprPlain)
				px.check(!Object.prototype.hasOwnProperty.call(keysVals, local.name),
					local.span, () => `Duplicate property ${local}.`)
				Object.defineProperty(keysVals, local.name, { value })
			}
			assert(last(splits).at === undefined)
			const val = ObjSimple(px.span, keysVals)
			if (tokensCaller.isEmpty())
				return val
			else {
				const parts = px.w(tokensCaller, parseExprParts)
				assert(!isEmpty(parts))
				return Call(px.span, head(parts), push(tail(parts), val))
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
			return GlobalAccess.null(px.span)
		case 1:
			return head(parts)
		default:
			return Call(px.span, head(parts), tail(parts))
	}
}

export function parseExprParts(px) {
	const out = []
	const end = px.tokens.end
	for (let i = px.tokens.start; i < end; i = i + 1) {
		const here = px.tokens.data[i]
		if (here instanceof Keyword) {
			const rest = () => px.tokens._new(i + 1, end)
			switch (here.k) {
				case '|': case '~|':
					return push(out, px.w(rest(), parseFun, here.k))
				case 'case':
					return push(out, px.w(rest(), PC.parseCase, 'case', false))
				case '<~':
					return push(out, Yield(px.span, px.w(rest(), parseExpr)))
				case '<~~':
					return push(out, YieldTo(px.span, px.w(rest(), parseExpr)))
				default:
					// fallthrough
			}
		}
		out.push(px.wt(here, parseSingle))
	}
	return out
}
