"use strict";

const
	Sq = require("./U/Sq"),
	type = require("./U/type"),
	types = require("./U/types")

const Pos = types.recordType("Pos", Object, { line: Number, column: Number })
Object.assign(Pos, {
	Start: Pos({
		line:1, column:1
	})
})
Object.assign(Pos.prototype, {
	next: function(ch) {
		type(ch, String);
		return (ch === '\n') ?
			Pos({ line: this.line + 1, column: 1}) :
			Pos({ line: this.line, column: this.column + 1})
	},

	toString: function() {
		return this.line + ":" + this.column
	}
})

const Span = module.exports = types.recordType("Span", Object, { start: Pos, end: Pos })
Object.assign(Span, {
	spanType: function(name, superType, members) {
		type(name, String, superType, Object, members, Object)
		return types.recordType(name, superType, Object.assign(members, { span: Span }))
	},
	ofSqT: function(spanDefault, sqt) {
		type(sqt, [require("./T")])
		return Sq.isEmpty(sqt) ?
			spanDefault :
			Span({
				start: Sq.head(sqt).span.start,
				end: Sq.last(sqt).span.end
			})
	},
	single: function(pos) {
		type(pos, Pos)
		return Span({ start: pos, end: pos.next('x') })
	},
	Pos: Pos
})
Object.assign(Span.prototype, {
	toString: function() {
		return this.start + "-" + this.end
	}
})
