import Loc from 'esast/dist/Loc'
import { isEmpty, opIf, push } from '../util'

export default class Slice {
	static group(g) {
		return new Slice(g.tokens, 0, g.tokens.length, g.loc)
	}

	constructor(data, start, end, loc) {
		this.data = data
		this.start = start
		// end is exclusive
		this.end = end
		this.loc = loc
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
		return this._chopStart(this.start + 1)
	}

	rtail() {
		return this._chopEnd(this.end - 1)
	}

	opSplitOnceWhere(splitOn) {
		for (let i = this.start; i < this.end; i = i + 1)
			if (splitOn(this.data[i]))
				return {
					before: this._chopEnd(i),
					at: this.data[i],
					after: this._chopStart(i + 1)
				}
		return null
	}

	opSplitManyWhere(splitOn) {
		let iLast = this.start
		const out = []
		for (let i = this.start; i < this.end; i = i + 1)
			if (splitOn(this.data[i])) {
				out.push({ before: this._chop(iLast, i), at: this.data[i] })
				iLast = i + 1
			}
		return opIf(!isEmpty(out), () => push(out, { before: this._chopStart(iLast) }))
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

	reduce(reducer, start) {
		let acc = start
		for (let i = this.start; i < this.end; i = i + 1)
			acc = reducer(acc, this.data[i])
		return acc
	}

	_chop(newStart, newEnd) {
		const loc = Loc(this.data[newStart].loc.start, this.data[newEnd - 1].loc.end)
		return new Slice(this.data, newStart, newEnd, loc)
	}
	_chopStart(newStart) {
		return new Slice(this.data, newStart, this.end,
			newStart === this.end ? this.loc : Loc(this.data[newStart].loc.start, this.loc.end))
	}
	_chopEnd(newEnd) {
		return new Slice(this.data, this.start, newEnd,
			(newEnd === this.start) ? this.loc : Loc(this.loc.start, this.data[newEnd - 1].loc.end))
	}
}
