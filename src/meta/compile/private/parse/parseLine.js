import E, { Assign, AssignDestructure, BlockWrap, Call, Debug, GlobalAccess, ObjReturn,
	Fun, EndLoop, ListEntry, Loop, MapEntry, Special, Yield, YieldTo } from '../../Expression'
import { Group, Keyword } from '../Token'
import { head, isEmpty, last } from '../U/Bag'
import { ifElse, some } from '../U/Op'
import type from '../U/type'
import { parseCase } from './parseCase'
import { parseExpr } from './parseExpr'
import parseLocalDeclares from './parseLocalDeclares'
import { parseLinesFromBlock, justBlockDo } from './parseBlock'
import { check, checkEmpty, cx, loc, tokens, w } from './vars'

// Returns line or sq of lines
export default function parseLine() {
	const h = tokens.head()
	const rest = tokens.tail()

	// We only deal with mutable expressions here, otherwise we fall back to parseExpr.
	if (h instanceof Keyword)
		switch (h.k) {
			case '. ':
				// Index is set by parseBlock.
				return ListEntry(loc, w(rest, parseExpr), -1)
			case 'case!':
				return w(rest, parseCase, 'case!', false)
			case 'debug':
				return Group.isBlock(tokens.second()) ?
					// `debug`, then indented block
					Debug(loc, parseLinesFromBlock()) :
					// `debug`, then single line
					Debug(loc, w(rest, parseLineOrLines))
			case 'debugger':
				checkEmpty(rest, () => `Did not expect anything after ${h}`)
				return Special.debugger(loc)
			case 'end-loop!':
				checkEmpty(rest, () => `Did not expect anything after ${h}`)
				return EndLoop(loc)
			case 'loop!':
				return Loop(loc, w(rest, justBlockDo))
			case 'region':
				return parseLinesFromBlock()
			default:
				// fall through
		}

	return ifElse(tokens.opSplitOnceWhere(Keyword.isLineSplit),
		({ before, at, after }) => {
			return at.k === '->' ?
				parseMapEntry(before, after) :
				parseAssign(before, at, after)
		},
		() => parseExpr())
}

export const parseLineOrLines = () => {
	const _ = parseLine()
	return _ instanceof Array ? _ : [ _ ]
}

const
	parseAssign = (assigned, assigner, value) => {
		let locals = w(assigned, parseLocalDeclares)
		const k = assigner.k
		const eValuePre = value.isEmpty() ? GlobalAccess.true(loc) : w(value, parseExpr)

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
			check(isYield, 'Assignment to nothing')
			return eValue
		}

		if (isYield)
			locals.forEach(_ => cx.check(_.k !== 'lazy', _.loc, 'Can not yield to lazy variable.'))

		if (k === '. ')
			locals.forEach(l => { l.okToNotUse = true })

		if (locals.length === 1) {
			const assign = Assign(loc, locals[0], k, eValue)
			const isTest = assign.assignee.name.endsWith('test')
			return isTest && k === '. ' ? Debug(loc, [ assign ]) : assign
		}
		else {
			const isLazy = locals.some(l => l.isLazy)
			if (isLazy)
				locals.forEach(_ => cx.check(_.isLazy, _.loc,
					'If any part of destructuring assign is lazy, all must be.'))
			return AssignDestructure(loc, locals, k, eValue, isLazy)
		}
	},

	valueFromAssign = (valuePre, kAssign) => {
		switch (kAssign) {
			case '<~':
				return Yield(valuePre.loc, valuePre)
			case '<~~':
				return YieldTo(valuePre.loc, valuePre)
			default:
				return valuePre
		}
	},

	// We give it a displayName if:
	// . It's a block
	// . It's a function
	// . It's one of those at the end of a block
	// . It's one of those as the end member of a call.
	tryAddDisplayName = (eValuePre, displayName) => {
		type(eValuePre, E, displayName, String)
		switch (true) {
			case eValuePre instanceof Call && eValuePre.args.length > 0:
				// TODO: Immutable
				eValuePre.args[eValuePre.args.length - 1] =
					tryAddDisplayName(last(eValuePre.args), displayName)
				return eValuePre

			case eValuePre instanceof Fun:
				return ObjReturn(eValuePre.loc, [], [], some(eValuePre), some(displayName))

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
	},

	parseMapEntry = (before, after) =>
		// TODO: index Filled in by ???
		MapEntry(loc, w(before, parseExpr), w(after, parseExpr), -1)
