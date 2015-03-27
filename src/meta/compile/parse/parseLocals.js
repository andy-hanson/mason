import assert from 'assert'
import check from '../check'
import { LocalDeclare } from '../Expression'
import { Group, Keyword, Name } from '../Token'
import { code } from '../U'
import { None, some } from '../U/Op'
import type from '../U/type'
import parseSpaced from './parseSpaced'

export default px => px.tokens.map(t => px.wt(t, parseLocal))

export function parseLocal(px) {
	let name
	let opType = None
	let isLazy = false

	assert(px.tokens.size() === 1)
	const t = px.tokens.head()

	if (Group.is('sp')(t)) {
		const tokens = t.tokens
		let rest = tokens
		if (Keyword.is('~')(tokens.head())) {
			isLazy = true
			rest = tokens.tail()
		}
		name = parseLocalName(rest.head())
		const rest2 = rest.tail()
		if (!rest2.isEmpty()) {
			const colon = rest2.head()
			check(Keyword.is(':')(colon), colon.span, () => `Expected ${code(':')}`)
			px.check(rest2.size() > 1, () => `Expected something after ${colon}`)
			const tokensType = rest2.tail()
			opType = some(px.w(tokensType, parseSpaced))
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
