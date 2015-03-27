import assert from 'assert'
import { None, some } from './Op'
import type from './type'

export function head(sq) {
	type(sq, Array)
	assert(!isEmpty(sq))
	return sq[0]
}

export function last(sq) {
	type(sq, Array)
	assert(!isEmpty(sq))
	return sq[sq.length - 1]
}

export function tail(sq) {
	type(sq, Array)
	assert(!isEmpty(sq))
	return sq.slice(1)
}

export function rtail(sq) {
	type(sq, Array)
	assert(!isEmpty(sq))
	return sq.slice(0, sq.length - 1)
}

export function interleave(sq, interleaved) {
	type(sq, Array, interleaved, Object)
	const out = interleavePlus(sq, interleaved)
	out.pop()
	return out
}

export function interleavePlus(sq, interleaved) {
	type(sq, Array, interleaved, Object)
	const out = []
	sq.forEach(_ => {
		out.push(_)
		out.push(interleaved)
	})
	return out
}

export function contains(sq, em) {
	type(sq, Array, em, Object)
	return sq.indexOf(em) !== -1
}

export function toArray(iter) {
	const out = []
	for (let em of iter) out.push(em)
	return out
}

export function repeat(em, n) {
	type(em, Object, n, Number)
	assert(n >= 0)
	const out = []
	for (let i = n; i > 0; i = i - 1)
		out.push(em)
	return out
}

export function isEmpty(sq) {
	type(sq, Array)
	return sq.length === 0
}

export function cons(em, sq) {
	type(em, Object, sq, Array)
	return [em].concat(sq)
}

export function rcons(sq, em) {
	type(sq, Array, em, Object)
	return sq.concat([em])
}

export function range(min, max) {
	type(min, Number, max, Number)
	assert(min < max)
	const out = []
	for (let i = min; i < max; i = i + 1)
		out.push(i)
	return out
}

export function flatMap(mapped, mapper) {
	type(mapped, Array, mapper, Function)
	return Array.prototype.concat.apply([], mapped.map(mapper))
}
