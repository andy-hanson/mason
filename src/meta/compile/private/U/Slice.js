import { isEmpty } from './Bag'
import { None, some } from './Op'

export default class Slice {
	static all(data) {
		return new Slice(data, 0, data.length)
	}

	constructor(data, start, end) {
		this.data = data
		this.start = start
		this.end = end
	}

	size() {
		return this.end - this.start
	}

	isEmpty() {
		return this.start === this.end
	}

	head() {
		return this.data[this.start]
	}

	second() {
		return this.data[this.start + 1]
	}

	last() {
		return this.data[this.end - 1]
	}

	tail() {
		return this._new(this.start + 1, this.end)
	}

	rtail() {
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
		for (let i = this.start; i < this.end; i = i + 1)
			acc = reducer(acc, this.data[i])
		return acc
	}

	toString() {
		return '[' + this.data.slice(this.start, this.end).toString() + ']'
	}

	_new(start, end) {
		return new Slice(this.data, start, end)
	}
}
