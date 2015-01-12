"use strict"

const
	assert = require("assert"),
	Span = require("../Span"),
	type = require("../U/type"),
	U = require("../U")

const Stream = module.exports = function(str) {
	type(str, String)
	assert(this instanceof Stream)
	Object.defineProperty(this, "str", { value: str })
	// _pos and _index are mutable. _pos should always be the position at _index.
	this.pos = Span.Pos.Start
	this.index = 0
}
Stream.prototype = {
	hasNext: function() { return this.peek() !== 'EOF' },

	peek: function(offset) {
		if (offset === undefined)
			offset = 0
		type(offset, Number)
		const index = this.index + offset
		assert(index >= 0)
		return (index >= this.str.length) ? 'EOF' : this.str.charAt(index)
	},

	tryEat: function(ch) {
		const canEat = this.peek() == ch
		if (canEat) this.skip()
		return canEat
	},

	hasPrev: function() { return this.index > 0 },

	prev: function() { return this.str.charAt(this.index - 1) },

	eat: function() {
		const ch = this.peek()
		this.skip()
		return ch
	},

	skip: function(n) {
		if (n === undefined) n = 1
		type(n, Number)
		const endIndex = this.index + n
		for (; this.index !== endIndex; this.index++)
			this.pos = this.pos.next(this.peek())
	},

	restorePoint: function() { return { index: this.index, pos: this.pos } },

	restore: function(restorePoint) {
		type(restorePoint.index, Number, restorePoint.pos, Span.Pos)
		this.index = restorePoint.index
		this.pos = restorePoint.pos
	},

	// Call only if you know this isn't the start of a line.
	stepBack: function() {
		assert(this.pos.column > 1)
		this.index = this.index - 1
		this.pos = U.with(this.pos, "column", this.pos.column - 1)
	},

	takeWhile: function(whl) {
		const startIndex = this.index
		const pred = charClassPred(whl)
		while (this.hasNext() && pred(this.peek()))
			this.skip()
		return this.str.slice(startIndex, this.index)
	},

	takeUpTo: function(upTo) {
		const pred = charClassPred(upTo)
		return this.takeWhile(function(ch) { return !pred(ch) })
	}
}

const charClassPred = function(whl)
{
	if (typeof whl === "string") {
		assert(whl.length === 1)
		return function(ch) { return ch === whl }
	}
	if (whl instanceof RegExp)
		return function(ch) { return whl.test(ch) }
	type(whl, Function)
	return whl
}
