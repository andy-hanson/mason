import assert from "assert"
import check, { fail } from "../check"
import { GroupOpenToClose } from "../Lang"
import Opts from "../Opts"
import Span, { Pos, StartPos } from "../Span"
import T, { Group, Keyword } from "../T"
import { isEmpty, last } from "../U/Sq"
import type, { isa } from "../U/type"
import { recordType } from "../U/types"
import GroupPre from "./GroupPre"

export default function group(sqL, opts) {
	// No 'generator' type...
	type(sqL, Object, opts, Opts)

	// Stack of GroupBuilders
	const stack = []

	const cur = () => last(stack)

	function newLevel(pos, k) {
		type(pos, Pos, k, String)
		// U.log(U.indent(stack.length) + ">> " + showGroup(k))
		stack.push(GroupBuilder({ startPos: pos, k: k, body: [] }))
	}

	function finishLevels(closePos, k) {
		while (true) {
			const old = last(stack)
			const oldClose = GroupOpenToClose.get(old.k)
			if (oldClose === k)
				break
			else {
				check(new Set(['(', '[', 'sp']).has(old.k), closePos,
					"Trying to close " + showGroup(k) +
					", but last opened was a " + showGroup(old.k))
				finishLevel(closePos, oldClose)
			}
		}
		finishLevel(closePos, k)
	}

	function finishLevel(closePos, k) {
		type(closePos, Pos, k, String)

		const wrapped = wrapLevel(closePos, k)
		// cur() is now the previous level on the stack
		// U.log(U.indent(stack.length) + "<< " + showGroup(k))
		// Don't add line/spaced
		if ((k === 'sp' || k === 'ln') && isEmpty(wrapped.sqt))
			return
		if (k === '<-' && isEmpty(wrapped.sqt))
			fail(closePos, "Empty block")
		// Spaced should always have at least two elements
		if (k === 'sp' && wrapped.sqt.length === 1)
			cur().add(wrapped.sqt[0])
		else
			cur().add(wrapped)
	}

	function wrapLevel(closePos, k) {
		type(closePos, Pos, k, String)
		const old = stack.pop()
		type(old, GroupBuilder)
		const span = Span({ start: old.startPos, end: closePos })
		assert(GroupOpenToClose.get(old.k) === k)
		return Group({ span: span, sqt: old.body, k: old.k })
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

	let endSpan = Span({ start: StartPos, end: StartPos })
	for (let l of sqL) {
		if (isa(l, T)) {
			cur().add(l)
			continue
		}
		type(l, GroupPre)
		type(l.span, Span)
		// U.log(showGroup(l.k))
		const span = l.span
		endSpan = span
		const k = l.k
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
				if (isEmpty(cur().body) || !Keyword.is("~")(last(cur().body)))
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

	endLine(endSpan.end)
	const wholeModuleBlock = wrapLevel(endSpan.end, '<-')
	assert(isEmpty(stack))
	return wholeModuleBlock
}

const GroupBuilder = recordType("GroupBuilder", Object, {
	startPos: Pos,
	k: String,
	body: [T]
})
Object.assign(GroupBuilder.prototype, {
	add(t) {
		type(t, T)
		this.body.push(t)
	}
})


// TODO: better names
const showGroup = k => k
