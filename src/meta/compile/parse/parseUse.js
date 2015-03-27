import assert from 'assert'
import check from '../check'
import { LocalDeclare, Use, UseDo } from '../Expression'
import { UseKeywords } from '../Lang'
import Token, { DotName, Group, Keyword, Name } from '../Token'
import { code, lazy, set } from '../U'
import { None } from '../U/Op'
import { repeat, tail } from '../U/Bag'
import type from '../U/type'
import Px from './Px'
// TODO:ES6
const
	parseBlock_ = lazy(() => require('./parseBlock')),
	parseLocals_ = lazy(() => require('./parseLocals').default)

export default function tryParseUse(px, k) {
	type(px, Px, k, UseKeywords)
	if (!px.tokens.isEmpty()) {
		const l0 = px.tokens.head()
		assert(Group.is('ln')(l0))
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
	const _ = parseBlock_().takeBlockLinesFromEnd(px)
	px.check(_.before.isEmpty(), () =>
		`Did not expect anything after ${code(k)} other than a block`)
	return _.lines.map(line => px.w(line.tokens, useLine, k))
}

// TODO:ES6 Just use module imports, no AssignDestructure needed
function useLine(px, k) {
	const tReq = px.tokens.head()
	const { path, name } = px.wt(tReq, parseRequire)

	if (k === 'use!') {
		px.check(px.tokens.size() === 1, () => `Unexpected ${px.tokens[1]}`)
		return UseDo(px.s({ path }))
	} else {
		const isLazy = k === 'use~' || k === 'use-debug'
		const used = px.tokens.size() === 1 ?
			[ LocalDeclare(px.s({ name, opType: None, isLazy, okToNotUse: false })) ] :
			px.w(px.tokens.tail(), parseLocals_()).map(l =>
				set(l.name === '_' ? set(l, 'name', name) : l, 'isLazy', isLazy))
		return Use(px.s({ used, k, path }))
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
		px.check(Group.is('sp')(t), 'Not a valid module name.')
		return px.w(t.tokens, parseLocalRequire)
	}
}

function parseLocalRequire(px) {
	const first = px.tokens.head()
	let parts = []
	if (first instanceof DotName)
		parts = first.nDots === 1 ? ['.'] : repeat('..', first.nDots - 1)
	else
		check(first instanceof Name, first.span, 'Not a valid part of module path.')
	parts.push(first.name)
	px.tokens.tail().each(t => {
		check(t instanceof DotName && t.nDots === 1, t.span, 'Not a valid part of module path.')
		parts.push(t.name)
	})
	return {
		path: parts.join('/'),
		name: px.tokens.last().name
	}
}
