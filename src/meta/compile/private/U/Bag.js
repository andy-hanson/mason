import { assert } from './util'

export const
	cat = (...parts) => {
		const out = [ ]
		parts.forEach(_ => {
			if (_ instanceof Array)
				out.push(..._)
			else if (_ !== null)
				out.push(_)
		})
		return out
	},
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
		assert(n >= 0)
		const out = []
		for (let i = n; i > 0; i = i - 1)
			out.push(em)
		return out
	},
	isEmpty = arr => {
		return arr.length === 0
	},
	range = (min, max) => {
		assert(min < max)
		const out = []
		for (let i = min; i < max; i = i + 1)
			out.push(i)
		return out
	},
	flatMap = (mapped, mapper) => {
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
	}
