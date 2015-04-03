import E, { Assign, AssignDestructure, BlockWrap, Call, Debug, GlobalAccess, ObjReturn,
	Fun, EndLoop, ListEntry, Loop, MapEntry, Special, Yield, YieldTo } from '../Expression'
import { defaultLoopName, LineSplitKeywords } from '../Lang'
import { Group, Keyword, Name } from '../Token'
import { assert } from '../U'
import { ifElse, some } from '../U/Op'
import { head, isEmpty, last, opSplitOnceWhere } from '../U/Bag'
import type from '../U/type'
import { justBlockDo, parseLinesFromBlock } from './parseBlock'
import parseCase from './parseCase'
import parseExpr from './parseExpr'
import parseLocalDeclares from './parseLocalDeclares'
import Px from './Px'

// Returns line or sq of lines
export default function parseLine(px) {
	type(px, Px)

	const h = px.tokens.head()
	const rest = px.tokens.tail()

	// We only deal with mutable expressions here, otherwise we fall back to parseExpr.
	if (h instanceof Keyword)
		switch (h.k) {
			case '. ':
				// Index is set by parseBlock.
				return ListEntry(px.span, px.w(rest, parseExpr), -1)
			case 'case!':
				return px.w(rest, parseCase, 'case!', false)
			case 'debug':
				return Group.isBlock(px.tokens.second()) ?
					// `debug`, then indented block
					Debug(px.span, parseLinesFromBlock(px)) :
					// `debug`, then single line
					Debug(px.span, px.w(rest, parseLineOrLines))
			case 'debugger':
				px.checkEmpty(rest, () => `Did not expect anything after ${h}`)
				return Special.debugger(px.span)
			case 'end-loop!':
				px.checkEmpty(rest, () => `Did not expect anything after ${h}`)
				return EndLoop(px.span)
			case 'loop!':
				return Loop(px.span, px.w(rest, justBlockDo))
			case 'region':
				return parseLinesFromBlock(px)
			default:
				// fall through
		}

	return ifElse(px.tokens.opSplitOnceWhere(Keyword.isLineSplit),
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
		locals.forEach(_ => px.check(_.k !== 'lazy', _.span, 'Can not yield to lazy variable.'))

	if (k === '. ')
		locals.forEach(l => { l.okToNotUse = true })

	if (locals.length === 1) {
		const assign = Assign(px.span, locals[0], k, eValue)
		const isTest = assign.assignee.name.endsWith('test')
		return isTest && k === '. ' ? Debug(px.span, [ assign ]) : assign
	}
	else {
		const isLazy = locals.some(l => l.isLazy)
		if (isLazy)
			locals.forEach(_ => px.check(_.isLazy, _.span,
				'If any part of destructuring assign is lazy, all must be.'))
		return AssignDestructure(px.span, locals, k, eValue, isLazy)
	}
}

function valueFromAssign(valuePre, kAssign) {
	switch (kAssign) {
		case '<~':
			return Yield(valuePre.span, valuePre)
		case '<~~':
			return YieldTo(valuePre.span, valuePre)
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
			return ObjReturn(eValuePre.span, [], [], some(eValuePre), some(displayName))

		case eValuePre instanceof ObjReturn &&
			!eValuePre.keys.some(key => key.name === 'displayName'):
			eValuePre.opDisplayName = some(displayName)
			return eValuePre

		case eValuePre instanceof BlockWrap: {
			const block = eValuePre.block
			block.returned = tryAddDisplayName(block.returned, displayName)
			return eValuePre
		}

		default:
			return eValuePre
	}
}

function parseMapEntry(px, before, after) {
	// TODO: index Filled in by ???
	return MapEntry(px.span, px.w(before, parseExpr), px.w(after, parseExpr), -1)
}
