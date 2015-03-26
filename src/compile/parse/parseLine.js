import assert from 'assert'
import check from '../check'
import E, { Assign, AssignDestructure, BlockWrap, Call, Debug, Debugger, ObjReturn,
	Fun, EndLoop, ListEntry, Loop, MapEntry, True, Yield, YieldTo } from '../Expression'
import { defaultLoopName, LineSplitKeywords } from '../Lang'
import { Group, Keyword, Name } from '../Token'
import { set } from '../U'
import { ifElse, some } from '../U/Op'
import { flatMap, head, isEmpty, last, opSplitOnceWhere, tail } from '../U/Bag'
import type from '../U/type'
import parseCase from './parseCase'
import parseExpr from './parseExpr'
import parseLocals from './parseLocals'
import parseUse from './parseUse'
import Px from './Px'
// TODO
const parseBlock_ = () => require('./parseBlock')

// Returns line or sq of lines
export default function parseLine(px) {
	type(px, Px)

	const first = head(px.tokens)
	const pxRest = px.w(tail(px.tokens))

	// We only deal with mutable expressions here, otherwise we fall back to parseExpr.
	if (first instanceof Keyword)
		switch (first.k) {
			case '. ':
				return ListEntry(px.s({
					value: parseExpr(pxRest),
					// This is set by parseBlock.
					index: -1
				}))
			case 'case!':
				return parseCase(pxRest, 'case!', false)
			case 'debug':
				return Group.is('->')(px.tokens[1]) ?
					// `debug`, then indented block
					Debug(px.s({ lines: parseLines(px) })) :
					// e.g. `debug use`
					Debug(px.s({ lines: parseLineOrLines(pxRest) }))
			case 'debugger':
				px.checkEmpty(pxRest().tokens, () => `Did not expect anything after ${first}`)
				return Debugger(px.s({}))
			case 'end-loop!':
				return EndLoop(px.s({ name: loopName(pxRest) }))
			case 'loop!':
				return parseLoop(pxRest)
			case 'region':
				return parseLines(px)
			case 'use': case 'use!': case 'use~':
				return parseUse(pxRest, first.k)
			default:
				// fall through
		}

	return ifElse(opSplitOnceWhere(px.tokens, Keyword.is(LineSplitKeywords)),
		_ => {
			return _.at.k === '->' ?
				parseMapEntry(px, _.before, _.after) :
				parseAssign(px, _.before, _.at, _.after)
		},
		() => parseExpr(px))
}

export function parseLineOrLines(px) {
	const _ = parseLine(px)
	return _ instanceof Array ? _ : [ _ ]
}

export function parseLines(px) {
	const first = head(px.tokens)
	check(px.tokens.length > 1, first.span, `Expected indented block after ${first}`)
	const block = px.tokens[1]
	assert(px.tokens.length === 2 && Group.is('->')(block))
	return flatMap(block.tokens, line => parseLineOrLines(px.w(line.tokens)))
}


function parseAssign(px, assigned, assigner, value) {
	let locals = parseLocals(px.w(assigned))
	const k = assigner.k
	const eValuePre = isEmpty(value) ? True(px.s({})) : parseExpr(px.w(value))

	let eValueNamed
	if (locals.length === 1) {
		const name = head(locals).name
		if (name === 'doc')
			if (eValuePre instanceof Fun)
				// KLUDGE: `doc` for module can be a Fun signature.
				// TODO: Something better...
				eValueNamed = set(eValuePre, 'args',
					eValuePre.args.map(arg => set(arg, 'okToNotUse', true)))
			else
				eValueNamed = eValuePre
		else
			eValueNamed = tryAddDisplayName(eValuePre, name)
	}
	else
		eValueNamed = eValuePre

	const isYield = k === '<~' || k === '<~~'

	const eValue = valueFromAssign(eValueNamed, k)

	if (isEmpty(locals)) {
		px.check(isYield, 'Assignment to nothing')
		return eValue
	}

	if (isYield)
		locals.forEach(_ => check(_.k !== 'lazy', _.span, 'Can not yield to lazy variable.'))

	if (k === '. ')
		locals = locals.map(l => set(l, 'okToNotUse', true))

	if (locals.length === 1) {
		const assign = Assign(px.s({ assignee: locals[0], k: k, value: eValue }))
		if (assign.assignee.name.endsWith('test') && k === '. ')
			return Debug(px.s({ lines: [ assign ] }))
		else return assign
	}
	else {
		const isLazy = locals.some(l => l.isLazy)
		if (isLazy)
			locals.forEach(_ => check(_.isLazy, _.span,
				'If any part of destructuring assign is lazy, all must be.'))
		return AssignDestructure(px.s({
			assignees: locals,
			k: k,
			value: eValue,
			isLazy: isLazy,
			checkProperties: false
		}))
	}
}

function valueFromAssign(valuePre, kAssign) {
	switch (kAssign) {
		case '<~':
			return Yield({ span: valuePre.span, yielded: valuePre })
		case '<~~':
			return YieldTo({ span: valuePre.span, yieldedTo: valuePre })
		default:
			return valuePre
	}
}

// We give it a displayName if:
// . It's a block
// . It's a function
// . It's one of those at the end of a block
// . It's one of those as the end member of a call.
function tryAddDisplayName(eValuePre, displayName) {
	type(eValuePre, E, displayName, String)
	switch (true) {
		case eValuePre instanceof Call && eValuePre.args.length > 0:
			// TODO: Immutable
			eValuePre.args[eValuePre.args.length - 1] =
				tryAddDisplayName(last(eValuePre.args), displayName)
			return eValuePre

		case eValuePre instanceof Fun:
			return ObjReturn({
				span: eValuePre.span,
				keys: [],
				debugKeys: [],
				opObjed: some(eValuePre),
				opDisplayName: some(displayName)
			})

		case eValuePre instanceof ObjReturn &&
			!eValuePre.keys.some(key => key.name === 'displayName'):
			return set(eValuePre, 'opDisplayName', some(displayName))

		case eValuePre instanceof BlockWrap:
			return ifElse(eValuePre.body.opReturn,
				ret => {
					const namedRet = tryAddDisplayName(ret, displayName)
					return set(eValuePre, 'body',
						set(eValuePre.body, 'opReturn', some(namedRet)))
				},
				() => eValuePre)

		default:
			return eValuePre
	}
}

function parseLoop(px) {
	const _ = parseBlock_().takeBlockFromEnd(px, 'do')
	return Loop(px.s({ name: loopName(px.w(_.before)), body: _.block }))
}

function loopName(px) {
	switch (px.tokens.length) {
		case 0:
			return defaultLoopName
		case 1: {
			const h = head(px.tokens)
			px.check(h instanceof Name, () => `Expected a loop name, not ${h}`)
			return h.name
		}
		default:
			px.fail('Expected a loop name')
	}
}

function parseMapEntry(px, before, after) {
	return MapEntry(px.s({
		key: parseExpr(px.w(before)),
		val: parseExpr(px.w(after)),
		// TODO: Filled in by ???
		index: -1
	}))
}
