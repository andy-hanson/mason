import { Call, GlobalAccess, ObjSimple, Yield, YieldTo } from '../../Expression'
import { Keyword } from '../Token'
import { assert } from '../U/util'
import { ifElse } from '../U/Op'
import { head, isEmpty, last, push, tail } from '../U/Bag'
import parseFun from './parseFun'
import { parseLocalDeclare } from './parseLocalDeclares'
import parseSingle from './parseSingle'
import { parseCase } from './parseCase'
import { cx, loc, tokens, w, wt } from './vars'

export const parseExpr = () => {
	return ifElse(tokens.opSplitManyWhere(Keyword.isObjAssign),
		splits => {
			// Short object form, such as (a. 1, b. 2)
			const first = splits[0].before
			const tokensCaller = first.rtail()

			const keysVals = {}
			for (let i = 0; i < splits.length - 1; i = i + 1) {
				const local = wt(splits[i].before.last(), parseLocalDeclare)
				// Can't have got a type because there's only one token.
				assert(isEmpty(local.opType))
				const tokensValue = i === splits.length - 2 ?
					splits[i + 1].before :
					splits[i + 1].before.rtail()
				const value = w(tokensValue, parseExprPlain)
				cx.check(!Object.prototype.hasOwnProperty.call(keysVals, local.name),
					local.loc, () => `Duplicate property ${local}.`)
				Object.defineProperty(keysVals, local.name, { value })
			}
			assert(last(splits).at === undefined)
			const val = ObjSimple(loc, keysVals)
			if (tokensCaller.isEmpty())
				return val
			else {
				const parts = w(tokensCaller, parseExprParts)
				assert(!isEmpty(parts))
				return Call(loc, head(parts), push(tail(parts), val))
			}
		},
		() => parseExprPlain()
	)
}

export const parseExprParts = () => {
	const out = []
	const end = tokens.end
	for (let i = tokens.start; i < end; i = i + 1) {
		const here = tokens.data[i]
		if (here instanceof Keyword) {
			const rest = () => tokens._new(i + 1, end)
			switch (here.k) {
				case '|': case '~|':
					return push(out, w(rest(), parseFun, here.k))
				case 'case':
					return push(out, w(rest(), parseCase, 'case', false))
				case '<~':
					return push(out, Yield(loc, w(rest(), parseExpr)))
				case '<~~':
					return push(out, YieldTo(loc, w(rest(), parseExpr)))
				default:
					// fallthrough
			}
		}
		out.push(wt(here, parseSingle))
	}
	return out
}

export const parseExprPlain = () => {
	const parts = parseExprParts()
	switch (parts.length) {
		case 0:
			return GlobalAccess.null(loc)
		case 1:
			return head(parts)
		default:
			return Call(loc, head(parts), tail(parts))
	}
}
