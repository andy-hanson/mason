import assert from 'assert'
import check from '../check'
import { LocalDeclare } from '../Expression'
import { Group, Keyword, Name } from '../Token'
import { code } from '../U'
import { None, some } from '../U/Op'
import { head, isEmpty, tail } from '../U/Bag'
import type from '../U/type'
import parseSpaced from './parseSpaced'

export default px => px.tokens.map(t => parseLocal(px.wt(t)))

export function parseLocal(px) {
	let name
	let opType = None
	let isLazy = false

	assert(px.tokens.length === 1)
	const t = px.tokens[0]

	if (Group.is('sp')(t)) {
		const tokens = t.tokens
		let rest = tokens
		if (Keyword.is('~')(head(tokens))) {
			isLazy = true
			rest = tail(tokens)
		}
		name = parseLocalName(head(rest))
		const rest2 = tail(rest)
		if (!isEmpty(rest2)) {
			const colon = head(rest2)
			check(Keyword.is(':')(colon), colon.span, () => `Expected ${code(':')}`)
			px.check(rest2.length > 1, () => `Expected something after ${colon}`)
			const tokensType = tail(rest2)
			opType = some(parseSpaced(px.w(tokensType)))
		}
	}
	else
		name = parseLocalName(t)

	return LocalDeclare(px.s({ name: name, opType: opType, isLazy: isLazy, okToNotUse: false }))
}

function parseLocalName(t) {
	if (Keyword.is('_')(t))
		return '_'
	else {
		check(t instanceof Name, t.span, () => `Expected a local name, not ${t}`)
		return t.name
	}
}
