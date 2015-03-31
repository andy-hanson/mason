import assert from 'assert'
import check, { warnIf } from '../check'
import E, { Assign, AssignDestructure, BlockWrap, Call, Debug, GlobalAccess, ObjReturn,
	Fun, EndLoop, ListEntry, Loop, MapEntry, Special, Yield, YieldTo } from '../Expression'
import { defaultLoopName, LineSplitKeywords } from '../Lang'
import { Group, Keyword, Name } from '../Token'
import { lazy, set } from '../U'
import { ifElse, some } from '../U/Op'
import { head, isEmpty, last, opSplitOnceWhere } from '../U/Bag'
import type from '../U/type'
import parseCase from './parseCase'
import parseExpr from './parseExpr'
import parseLocalDeclares from './parseLocalDeclares'
import Px from './Px'
// TODO:ES6
const parseBlock_ = lazy(() => require('./parseBlock'))

// Returns line or sq of lines
export default function parseLine(px) {
	type(px, Px)

	const h = px.tokens.head()
	const rest = px.tokens.tail()

	// We only deal with mutable expressions here, otherwise we fall back to parseExpr.
	if (h instanceof Keyword)
		switch (h.k) {
			case '. ':
				return ListEntry(px.s({
					value: px.w(rest, parseExpr),
					// This is set by parseBlock.
					index: -1
				}))
			case 'case!':
				return px.w(rest, parseCase, 'case!', false)
			case 'debug':
				return Group.is('->')(px.tokens.second()) ?
					// `debug`, then indented block
					Debug(px.s({ lines: parseLines(px) })) :
					// e.g. `use-debug`
					Debug(px.s({ lines: px.w(rest, parseLineOrLines) }))
			case 'debugger':
				px.checkEmpty(rest, () => `Did not expect anything after ${h}`)
				return Special.debugger(px.span)
			case 'end-loop!':
				check(rest.isEmpty(), () => `Did not expect anything after ${h}`)
				return EndLoop(px.s({}))
			case 'loop!': {
				const { before, block } = px.w(rest, parseBlock_().takeBlockFromEnd, 'do')
				check(before.isEmpty(), px.span, () => `Did not expect anything after ${h}`)
				return Loop(px.s({ block }))
			}
			case 'region':
				return parseLines(px)
			default:
				// fall through
		}

	return ifElse(px.tokens.opSplitOnceWhere(Keyword.is(LineSplitKeywords)),
		({ before, at, after }) => {
			return at.k === '->' ?
				parseMapEntry(px, before, after) :
				parseAssign(px, before, at, after)
		},
		() => parseExpr(px))
}

export function parseLineOrLines(px) {
	const _ = parseLine(px)
	return _ instanceof Array ? _ : [ _ ]
}

export function parseLines(px) {
	const h = px.tokens.head()
	check(px.tokens.size() > 1, h.span, () => `Expected indented block after ${h}`)
	const block = px.tokens.second()
	assert(px.tokens.size() === 2 && Group.is('->')(block))
	return block.tokens.flatMap(line => px.w(line.tokens, parseLineOrLines))
}


function parseAssign(px, assigned, assigner, value) {
	let locals = px.w(assigned, parseLocalDeclares)
	const k = assigner.k
	const eValuePre = value.isEmpty() ? GlobalAccess.true(px.span) : px.w(value, parseExpr)

	let eValueNamed
	if (locals.length === 1) {
		const name = head(locals).name
		if (name === 'doc') {
			if (eValuePre instanceof Fun)
				// KLUDGE: `doc` for module can be a Fun signature.
				// TODO: Something better...
				eValuePre.args.forEach(arg => { arg.okToNotUse = true })
			eValueNamed = eValuePre
		}
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
		locals.forEach(l => { l.okToNotUse = true })

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
			eValuePre.opDisplayName = some(displayName)
			return eValuePre

		case eValuePre instanceof BlockWrap:
			eValuePre.block.opReturn.forEach(ret => {
				const namedRet = tryAddDisplayName(ret, displayName)
				eValuePre.block.opReturn = some(namedRet)
			})
			return eValuePre

		default:
			return eValuePre
	}
}

function parseMapEntry(px, before, after) {
	return MapEntry(px.s({
		key: px.w(before, parseExpr),
		val: px.w(after, parseExpr),
		// TODO: Filled in by ???
		index: -1
	}))
}
