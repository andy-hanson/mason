import assert from 'assert'
import check from '../check'
import { LocalDeclare } from '../Expression'
import { JsGlobals } from '../Lang'
import { Group, Keyword, Name } from '../Token'
import { code } from '../U'
import { None, some } from '../U/Op'
import type from '../U/type'
import parseSpaced from './parseSpaced'

export default px => px.tokens.map(t => px.wt(t, parseLocalDeclare))

export function parseLocalDeclare(px) {
	let name
	let opType = None
	let isLazy = false

	assert(px.tokens.size() === 1)
	const t = px.tokens.head()

	if (Group.isSpaced(t)) {
		const tokens = t.tokens
		let rest = tokens
		if (Keyword.isTilde(tokens.head())) {
			isLazy = true
			rest = tokens.tail()
		}
		name = parseLocalName(rest.head())
		const rest2 = rest.tail()
		if (!rest2.isEmpty()) {
			const colon = rest2.head()
			check(Keyword.isColon(colon), colon.span, () => `Expected ${code(':')}`)
			px.check(rest2.size() > 1, () => `Expected something after ${colon}`)
			const tokensType = rest2.tail()
			opType = some(px.w(tokensType, parseSpaced))
		}
	}
	else
		name = parseLocalName(t)

	return LocalDeclare(px.span, name, opType, isLazy, false)
}

function parseLocalName(t) {
	if (Keyword.isFocus(t))
		return '_'
	else {
		check(t instanceof Name, t.span, () => `Expected a local name, not ${t}`)
		// TODO: Allow this?
		check(!JsGlobals.has(t.name), t.span, () => `Can not shadow global ${code(t.name)}`)
		return t.name
	}
}
