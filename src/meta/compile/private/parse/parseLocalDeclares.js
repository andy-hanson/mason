import { code } from '../../CompileError'
import { LocalDeclare } from '../../Expression'
import { JsGlobals } from '../Lang'
import { Group, Keyword, Name } from '../Token'
import { None, some } from '../U/Op'
import { assert } from '../U/util'
import { parseSpaced } from './parseSpaced'
import { check, cx, loc, tokens, w, wt } from './vars'

export default () => tokens.map(t => wt(t, parseLocalDeclare))

export function parseLocalDeclare() {
	let name
	let opType = None
	let isLazy = false

	assert(tokens.size() === 1)
	const t = tokens.head()

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
			cx.check(Keyword.isColon(colon), colon.loc, () => `Expected ${code(':')}`)
			check(rest2.size() > 1, () => `Expected something after ${colon}`)
			const tokensType = rest2.tail()
			opType = some(w(tokensType, parseSpaced))
		}
	}
	else
		name = parseLocalName(t)

	return LocalDeclare(loc, name, opType, isLazy, false)
}

const parseLocalName = (t) => {
	if (Keyword.isFocus(t))
		return '_'
	else {
		cx.check(t instanceof Name, t.loc, () => `Expected a local name, not ${t}`)
		// TODO: Allow this?
		cx.check(!JsGlobals.has(t.name), t.loc, () => `Can not shadow global ${code(t.name)}`)
		return t.name
	}
}
