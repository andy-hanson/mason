"use strict"

const
	assert = require("assert"),
	Op = require("./Op"),
	type = require("./type")

const head = function(sq) {
	type(sq, Array)
	assert(!isEmpty(sq))
	return sq[0]
}

const last = function(sq) {
	type(sq, Array)
	assert(!isEmpty(sq))
	return sq[sq.length - 1]
}

const tail = function(sq) {
	type(sq, Array)
	assert(!isEmpty(sq))
	return sq.slice(1)
}

const rightTail = function(sq) {
	type(sq, Array)
	assert(!isEmpty(sq))
	return sq.slice(0, sq.length - 1)
}

const opSplitOnceWhere = function(sq, splitOn) {
	type(sq, Array, splitOn, Function)
	for (let i = 0; i < sq.length; i++)
		if (splitOn(sq[i]))
			return Op.Some({
				before: sq.slice(0, i),
				at: sq[i],
				after: sq.slice(i + 1)
			})
	return Op.None
}

const interleave = function(sq, interleaved) {
	type(sq, Array, interleaved, Object)
	const out = interleavePlus(sq, interleaved)
	out.pop()
	return out
}

const interleavePlus = function(sq, interleaved) {
	type(sq, Array, interleaved, Object)
	const out = []
	sq.forEach(function(x) {
		out.push(x)
		out.push(interleaved)
	})
	return out
}

const mpf = function(sq, f) {
	type(sq, Array, f, Function)
	return Array.prototype.concat.apply([], sq.map(f))
}

const contains = function(sq, em) {
	type(sq, Array, em, Object)
	return sq.indexOf(em) !== -1
}

const toArray = function(iter) {
	const out = []
	for (let em of iter) out.push(em)
	return out
}

const repeat = function(em, n) {
	type(em, Object, n, Number)
	assert(n >= 0)
	const out = []
	for (let i = n; i > 0; i--)
		out.push(em)
	return out
}

const isEmpty = function(sq) {
	type(sq, Array)
	return sq.length === 0
}

const cons = function(em, sq) {
	type(em, Object, sq, Array)
	return [em].concat(sq)
}

const rcons = function(sq, em) {
	type(sq, Array, em, Object)
	return sq.concat([em])
}

const range = function(min, max) {
	type(min, Number, max, Number)
	assert(min < max)
	const out = []
	for (let i = min; i < max; i++)
		out.push(i)
	return out
}

module.exports = {
	head: head,
	last: last,
	tail: tail,
	rightTail: rightTail,
	opSplitOnceWhere: opSplitOnceWhere,
	interleave: interleave,
	interleavePlus: interleavePlus,
	mpf: mpf,
	contains: contains,
	toArray: toArray,
	repeat: repeat,
	isEmpty: isEmpty,
	cons: cons,
	rcons: rcons,
	range: range
}
