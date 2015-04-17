import { assert } from './util'
import type from './type'

export const
	head = arr => {
		assert(!isEmpty(arr))
		return arr[0]
	},
	last = arr => {
		assert(!isEmpty(arr))
		return arr[arr.length - 1]
	},
	tail = arr => {
		assert(!isEmpty(arr))
		return arr.slice(1)
	},
	rtail = arr => {
		assert(!isEmpty(arr))
		return arr.slice(0, arr.length - 1)
	},
	toArray = iter => {
		const out = []
		for (let em of iter)
			out.push(em)
		return out
	},
	repeat = (em, n) => {
		type(em, Object, n, Number)
		assert(n >= 0)
		const out = []
		for (let i = n; i > 0; i = i - 1)
			out.push(em)
		return out
	},
	isEmpty = arr => {
		type(arr, Array)
		return arr.length === 0
	},
	range = (min, max) => {
		type(min, Number, max, Number)
		assert(min < max)
		const out = []
		for (let i = min; i < max; i = i + 1)
			out.push(i)
		return out
	},
	flatMap = (mapped, mapper) => {
		type(mapped, Array, mapper, Function)
		const out = []
		mapped.forEach((_, i) => out.push(...mapper(_, i)))
		return out
	},

	// These are mutators for slight performance gain
	unshift = (em, mutArr) => {
		mutArr.unshift(em)
		return mutArr
	},
	push = (mutArr, em) => {
		mutArr.push(em)
		return mutArr
	},
	cat = (mutArr, ems) => {
		mutArr.push(...ems)
		return mutArr
	}

