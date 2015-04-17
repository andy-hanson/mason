import { code } from '../../CompileError'
import { LocalDeclare, Use, UseDo } from '../../Expression'
import { UseKeywords } from '../Lang'
import { DotName, Group, Keyword, Name } from '../Token'
import { repeat } from '../U/Bag'
import { None, opIf, some } from '../U/Op'
import type from '../U/type'
import { assert } from '../U/util'
import Px from './Px'
// TODO:ES6
import * as PB from './parseBlock'
import * as ParseLocalDeclares from './parseLocalDeclares'

export default function tryParseUse(px, k) {
	type(px, Px, k, UseKeywords)
	if (!px.tokens.isEmpty()) {
		const l0 = px.tokens.head()
		assert(Group.isLine(l0))
		if (Keyword.is(k)(l0.tokens.head()))
			return {
				uses: px.w(l0.tokens.tail(), parseUse, k),
				rest: px.tokens.tail()
			}
	}
	return { uses: [], rest: px.tokens }
}

function parseUse(px, k) {
	type(px, Px, k, UseKeywords)
	const { before, lines } = PB.takeBlockLinesFromEnd(px)
	px.check(before.isEmpty(), () =>
		`Did not expect anything after ${code(k)} other than a block`)
	return lines.map(line => px.w(line.tokens, useLine, k))
}

// TODO:ES6 Just use module imports, no AssignDestructure needed
function useLine(px, k) {
	const tReq = px.tokens.head()
	const { path, name } = px.wt(tReq, parseRequire)

	if (k === 'use!') {
		px.check(px.tokens.size() === 1, () => `Unexpected ${px.tokens[1]}`)
		return UseDo(px.loc, path)
	} else {
		const isLazy = k === 'use~' || k === 'use-debug'
		const { used, opUseDefault } = px.w(px.tokens.tail(), parseThingsUsed, name, isLazy)
		return Use(px.loc, path, used, opUseDefault)
	}
}

function parseThingsUsed(px, name, isLazy) {
	const useDefault = () => LocalDeclare(px.loc, name, None, isLazy, false)
	if (px.tokens.isEmpty())
		return { used: [], opUseDefault: some(useDefault()) }
	else {
		const hasDefaultUse = Keyword.isFocus(px.tokens.head())
		const opUseDefault = opIf(hasDefaultUse, useDefault)
		const rest = hasDefaultUse ? px.tokens.tail() : px.tokens
		const used = px.w(rest, ParseLocalDeclares.default).map(l => {
			px.check(l.name !== '_', () => `${code('_')} not allowed as import name.`)
			l.isLazy = isLazy
			return l
		})
		return { used, opUseDefault }
	}
}

function parseRequire(px) {
	assert(px.tokens.size() === 1)
	const t = px.tokens.head()
	if (t instanceof Name)
		return { path: t.name, name: t.name }
	else if (t instanceof DotName)
		return parseLocalRequire(px)
	else {
		px.check(Group.isSpaced(t), 'Not a valid module name.')
		return px.w(t.tokens, parseLocalRequire)
	}
}

function parseLocalRequire(px) {
	const first = px.tokens.head()
	let parts = []
	if (first instanceof DotName)
		parts = first.nDots === 1 ? ['.'] : repeat('..', first.nDots - 1)
	else
		px.check(first instanceof Name, first.loc, 'Not a valid part of module path.')
	parts.push(first.name)
	px.tokens.tail().each(t => {
		px.check(t instanceof DotName && t.nDots === 1, t.loc, 'Not a valid part of module path.')
		parts.push(t.name)
	})
	return {
		path: parts.join('/'),
		name: px.tokens.last().name
	}
}
