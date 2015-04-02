import assert from 'assert'
import { GroupOpenToClose } from '../Lang'
import Span, { Pos, StartPos } from '../Span'
import Token, { Group, Keyword } from '../Token'
import { isEmpty, last } from '../U/Bag'
import Slice from '../U/Slice'
import type from '../U/type'
import { ObjType } from '../U/types'
import GroupPre from './GroupPre'

export default function group(lx, preGroupedTokens) {
	// Stack of GroupBuilders
	const stack = []

	// Should always be last(stack)
	let cur = null

	function newLevel(pos, k) {
		type(pos, Pos, k, String)
		// console.log(`${'\t'.repeat(stack.length)}>> ${k}`)
		cur = GroupBuilder({ startPos: pos, k: k, body: [] })
		stack.push(cur)
	}

	function finishLevels(closePos, k) {
		while (true) {
			const old = last(stack)
			const oldClose = GroupOpenToClose.get(old.k)
			if (oldClose === k)
				break
			else {
				lx.check(AutoCloseableGroups.has(old.k), closePos,
					'Trying to close ' + showGroup(k) +
					', but last opened was a ' + showGroup(old.k))
				finishLevel(closePos, oldClose)
			}
		}
		finishLevel(closePos, k)
	}

	function finishLevel(closePos, k) {
		type(closePos, Pos, k, String)

		const wrapped = wrapLevel(closePos, k)
		// cur is now the previous level on the stack
		// console.log(`${'\t'.repeat(stack.length)}<< ${k})
		// Don't add line/spaced
		if ((k === 'sp' || k === 'ln') && wrapped.tokens.isEmpty())
			return
		if (k === '<-' && wrapped.tokens.isEmpty())
			lx.fail(closePos, 'Empty block')
		// Spaced should always have at least two elements
		if (k === 'sp' && wrapped.tokens.size() === 1)
			cur.add(wrapped.tokens.head())
		else
			cur.add(wrapped)
	}

	function wrapLevel(closePos, k) {
		type(closePos, Pos, k, String)
		const old = stack.pop()
		cur = isEmpty(stack) ? null : last(stack)
		type(old, GroupBuilder)
		const span = new Span(old.startPos, closePos)
		assert(GroupOpenToClose.get(old.k) === k)
		const tokens = new Slice(old.body)
		return Group(span, tokens, old.k)
	}

	function startLine(pos) {
		newLevel(pos, 'ln')
		newLevel(pos, 'sp')
	}
	function endLine(pos) {
		finishLevels(pos, 'sp')
		finishLevels(pos, 'ln')
	}

	function endAndStart(span, k) {
		type(span, Span, k, String)
		finishLevels(span.start, k)
		newLevel(span.end, k)
	}

	newLevel(StartPos, '->')
	startLine(StartPos)

	let endSpan = new Span(StartPos, StartPos)
	for (let _ of preGroupedTokens) {
		if (_ instanceof Token)
			cur.add(_)
		else {
			type(_, GroupPre)
			type(_.span, Span)
			// U.log(_.k)
			const span = _.span
			endSpan = span
			const k = _.k
			switch (k) {
				case '(': case '[': case '{':
					newLevel(span.start, k)
					newLevel(span.end, 'sp')
					break
				case ')': case ']': case '}':
					finishLevels(span.end, k)
					break
				case '"':
					newLevel(span.start, k)
					break
				case 'close"':
					finishLevels(span.start, k)
					break
				case '->':
					//  ~ before block is OK
					if (isEmpty(cur.body) || !Keyword.isTilde(last(cur.body)))
						endAndStart(span, 'sp')
					newLevel(span.start, k)
					startLine(span.end)
					break
				case '<-':
					endLine(span.start)
					finishLevels(span.end, k)
					break
				case 'ln':
					endLine(span.start)
					startLine(span.end)
					break
				case 'sp':
					endAndStart(span, k)
					break
				default: throw new Error(k)
			}
		}
	}

	endLine(endSpan.end)
	const wholeModuleBlock = wrapLevel(endSpan.end, '<-')
	assert(isEmpty(stack))
	return wholeModuleBlock
}

const AutoCloseableGroups = new Set(['(', '[', 'sp'])

const GroupBuilder = ObjType('GroupBuilder', Object, {
	startPos: Pos,
	k: String,
	body: [Token]
})
Object.assign(GroupBuilder.prototype, {
	add(t) {
		type(t, Token)
		this.body.push(t)
	}
})

// TODO: better names
const showGroup = k => k
