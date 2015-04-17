import { isEmpty } from './Bag'
import { None, some } from './Op'
import { assert } from './util'

export default class Slice {
	constructor(data, start, end) {
		this.data = data
		if (start === undefined) {
			assert(end === undefined)
			this.start = 0
			this.end = data.length
		} else {
			this.start = start
			this.end = end
			assert(0 <= start && start <= end && end <= data.length)
		}
	}

	size() {
		return this.end - this.start
	}

	isEmpty() {
		assert(this.start <= this.end)
		return this.start === this.end
	}

	head() {
		assert(!this.isEmpty())
		return this.data[this.start]
	}

	second() {
		assert(this.size() >= 2)
		return this.data[this.start + 1]
	}

	last() {
		assert(!this.isEmpty())
		return this.data[this.end - 1]
	}

	tail() {
		assert(!this.isEmpty())
		return this._new(this.start + 1, this.end)
	}

	rtail() {
		assert(!this.isEmpty())
		return this._new(this.start, this.end - 1)
	}

	opSplitOnceWhere(splitOn) {
		for (let i = this.start; i < this.end; i = i + 1)
			if (splitOn(this.data[i]))
				return some({
					before: this._new(this.start, i),
					at: this.data[i],
					after: this._new(i + 1, this.end)
				})
		return None
	}

	opSplitManyWhere(splitOn) {
		let iLast = this.start
		const out = []
		for (let i = this.start; i < this.end; i = i + 1)
			if (splitOn(this.data[i])) {
				out.push({ before: this._new(iLast, i), at: this.data[i] })
				iLast = i + 1
			}

		if (isEmpty(out))
			return None
		else {
			out.push({ before: this._new(iLast, this.end) })
			return some(out)
		}
	}

	_new(start, end) {
		return new Slice(this.data, start, end)
	}

	each(f) {
		for (let i = this.start; i < this.end; i = i + 1)
			f(this.data[i])
	}

	map(f) {
		const out = []
		this.each(_ => out.push(f(_)))
		return out
	}

	flatMap(f) {
		const out = []
		this.each(_ => out.push(...f(_)))
		return out
	}

	reduce(reducer, start) {
		let acc = start
		this.each(_ => acc = reducer(acc, _))
		return acc
	}

	toString() {
		return '[' + this.data.slice(this.start, this.end).toString() + ']'
	}
}
