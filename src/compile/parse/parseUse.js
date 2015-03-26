import assert from 'assert'
import check from '../check'
import { AssignDestructure, Ignore, LocalDeclare, Require } from '../Expression'
import { UseKeywords } from '../Lang'
import { DotName, Group, Name } from '../Token'
import { code, set } from '../U'
import { None } from '../U/Op'
import { head, isEmpty, last, repeat, tail } from '../U/Bag'
import type from '../U/type'
import Px from './Px'
const
	parseBlock_ = () => require('./parseBlock'),
	parseLocals_ = () => require('./parseLocals').default

export default function parseUse(px, k) {
	type(px, Px, k, UseKeywords)
	const _ = parseBlock_().takeBlockLinesFromEnd(px)
	px.check(isEmpty(_.before), () =>
		`Did not expect anything after ${code('use')} other than a block`)
	return _.lines.map(line => useLine(px.w(line.sqt), k))
}

// TODO:ES6 Just use module imports, no AssignDestructure needed
function useLine(px, k) {
	const tReq = head(px.sqt)
	const _$ = parseRequire(px.wt(tReq))
	const required = _$.required, name = _$.name

	if (k === 'use!') {
		px.check(px.sqt.length === 1, () => `Unexpected ${px.sqt[1]}`)
		return Ignore(px.s({ ignored: required }))
	} else {
		const isLazy = k === 'use~'

		const defaultAssignee = LocalDeclare(px.s({
			name: name,
			opType: None,
			isLazy: isLazy,
			okToNotUse: false
		}))
		const assignees = px.sqt.length === 1 ?
			[ defaultAssignee ] :
			parseLocals_()(px.w(tail(px.sqt))).map(l =>
				set(l.name === '_' ? set(l, 'name', name) : l, 'isLazy', isLazy))
		return AssignDestructure(px.s({
			assignees: assignees,
			k: '=',
			value: required,
			isLazy: isLazy,
			checkProperties: true
		}))
	}
}

function parseRequire(px) {
	assert(px.sqt.length === 1)
	const t = px.sqt[0]
	if (t instanceof Name)
		return {
			required: Require({ span: t.span, path: t.name }),
			name: t.name
		}
	else if (t instanceof DotName)
		return parseLocalRequire(px)
	else {
		px.check(Group.is('sp')(t), 'Not a valid module name.')
		return parseLocalRequire(px.w(t.sqt))
	}
}

function parseLocalRequire(px) {
	const first = head(px.sqt)

	let parts = []
	if (first instanceof DotName)
		parts = first.nDots === 1 ? ['.'] : repeat('..', first.nDots - 1)
	else
		check(first instanceof Name, first.span, 'Not a valid part of module path.')
	parts.push(first.name)
	tail(px.sqt).forEach(t => {
		check(t instanceof DotName && t.nDots === 1, t.span, 'Not a valid part of module path.')
		parts.push(t.name)
	})
	return {
		required: Require({ span: px.span, path: parts.join('/') }),
		name: last(px.sqt).name
	}
}
