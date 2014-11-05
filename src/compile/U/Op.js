"use strict"

/*
Cheap-ass option type.
It's just an array with 0 or 1 elements.
*/

const
	assert = require("assert"),
	type = require("./type"),
	U = require("./index")

// This constructs an Op *type*. Use Op.Some and Op.None to construct instances.
const Op = module.exports = function(type) {
	const op = Object.create(Op.prototype)
	op.type = type
	return Object.freeze(op)
}

Op.prototype.getName = Op.prototype.toString = function() {
	return "Op(" + this.type.getName() + ")"
}

Object.assign(Op, {
	None: [],
	Some: function(x) {
		type(x, Object)
		return [x]
	},
	if: function(cond, then) {
		type(cond, Boolean, then, Function)
		return cond ? Op.Some(then()) : Op.None
	},
	ifElse: function(op, ifSome, ifNone) {
		type(op, Op(Object), ifSome, Function, ifNone, Function)
		return (op.length === 0) ? ifNone() : ifSome(op[0])
	}
})