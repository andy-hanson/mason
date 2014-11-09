"use strict"

const
	assert = require("assert"),
	check = require("../check"),
	GroupPre = require("./GroupPre"),
	Lang =  require("../Lang"),
	Opts = require("../Opts"),
	Span = require("../Span"),
	T = require("../T"),
	Sq = require("../U/Sq"),
	type = require("../U/type"),
	types = require("../U/types")

const GroupBuilder = types.recordType("GroupBuilder", Object, {
	startPos: Span.Pos,
	k: String,
	body: [T]
})
Object.assign(GroupBuilder.prototype, {
	add: function(t) {
		type(t, T)
		this.body.push(t)
	}
})

module.exports = function group(sqL, opts) {
	// No 'generator' type...
	type(sqL, Object, opts, Opts)

	const stack = [] // Stack of GroupBuilders

	const cur = function() { return stack[stack.length - 1] }

	const newLevel = function(pos, k) {
		type(pos, Span.Pos, k, String)
		// U.log(U.indent(stack.length) + ">> " + showGroup(k))
		stack.push(GroupBuilder({ startPos: pos, k: k, body: [] }))
	}

	const finishLevel = function(closePos, k) {
		type(closePos, Span.Pos, k, String)
		const wrapped = wrapLevel(closePos, k)
		// cur() is now the previous level on the stack
		// U.log(U.indent(stack.length) + "<< " + showGroup(k))
		// Don't add line/spaced
		if ((k === 'sp' || k === 'ln') && Sq.isEmpty(wrapped.sqt))
			return
		if (k === '<-' && Sq.isEmpty(wrapped.sqt))
			check.fail(closePos, "Empty block")
		// Spaced should always have at least two elements
		if (k === 'sp' && wrapped.sqt.length === 1)
			cur().add(wrapped.sqt[0])
		else
			cur().add(wrapped)
	}

	const wrapLevel = function(closePos, k) {
		type(closePos, Span.Pos, k, String)
		const old = stack.pop()
		type(old, GroupBuilder)
		const span = Span({ start: old.startPos, end: closePos })
		check(Lang.GroupOpenToClose.get(old.k) === k, span,
			"Trying to close a " + showGroup(k) + ", but last opened was a " + showGroup(old.k))
		return T.Group({ span: span, sqt: old.body, k: old.k })
	}

	const startLine = function(pos) {
		newLevel(pos, 'ln')
		newLevel(pos, 'sp')
	}
	const endLine = function(pos) {
		finishLevel(pos, 'sp')
		finishLevel(pos, 'ln')
	}

	const endAndStart = function(span, k) {
		type(span, Span, k, String)
		finishLevel(span.start, k)
		newLevel(span.end, k)
	}

	newLevel(Span.Pos.Start, '->')
	startLine(Span.Pos.Start)

	let endSpan = Span({ start: Span.Pos.Start, end: Span.Pos.Start })
	for (let l of sqL) {
		if (type.isa(l, T)) {
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
				finishLevel(span.start, 'sp')
				finishLevel(span.end, k)
				break
			case '"':
				if (cur().k === '"')
					finishLevel(span.start, k)
				else
					newLevel(span.start, k)
				break
			case '->':
				//  ~ before block is OK
				if (Sq.isEmpty(cur().body) || !T.Keyword.is("~")(Sq.last(cur().body)))
					endAndStart(span, 'sp')
				newLevel(span.start, k)
				startLine(span.end)
				break
			case '<-':
				endLine(span.start)
				finishLevel(span.end, k)
				break
			case 'ln':
				endLine(span.start)
				startLine(span.end)
				break
			case 'sp':
				endAndStart(span, k)
				break
			default: fail()
		}
	}

	endLine(endSpan.end)
	const wholeModuleBlock = wrapLevel(endSpan.end, '<-')
	assert(Sq.isEmpty(stack))
	return wholeModuleBlock
}

// TODO: better names
const showGroup = function(k) { return k }
