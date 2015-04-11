import { StartPos } from 'esast/Loc'
import type from '../U/type'
import { assert, set } from '../U/util'

export default class Stream {
	constructor(str) {
		type(str, String)
		assert(this instanceof Stream)
		Object.defineProperty(this, 'str', { value: str })
		// pos and index are mutable. pos should always be the position at index.
		this.pos = StartPos
		this.index = 0
	}

	hasNext() {
		return this.peek() !== 'EOF'
	}

	peek(offset) {
		if (offset === undefined)
			offset = 0
		type(offset, Number)
		const index = this.index + offset
		assert(index >= 0)
		return index >= this.str.length ? 'EOF' : this.str.charAt(index)
	}

	tryEat(ch) {
		const canEat = this.peek() === ch
		if (canEat)
			this.skip()
		return canEat
	}

	hasPrev() {
		return this.index > 0
	}

	prev() {
		return this.str.charAt(this.index - 1)
	}

	eat() {
		const ch = this.str[this.index]
		this.index = this.index + 1
		this.pos = this.pos.next(ch)
		return ch
	}

	skip(n) {
		if (n === undefined) n = 1
		type(n, Number)
		const endIndex = this.index + n
		for (; this.index !== endIndex; this.index = this.index + 1)
			this.pos = this.pos.next(this.peek())
	}

	// Caller must ensure that backing up nCharsToBackUp characters brings us to oldPos.
	stepBackMany(oldPos, nCharsToBackUp) {
		this.index = this.index - nCharsToBackUp
		this.pos = oldPos
	}

	// Call only if you know this isn't the start of a line.
	stepBack() {
		assert(this.pos.column > 1)
		this.index = this.index - 1
		this.pos = this.pos.withPrevColumn()
	}

	takeWhile(whl) {
		const startIndex = this.index
		const pred = charClassPred(whl)
		while (this.hasNext() && pred(this.peek()))
			this.skip()
		return this.str.slice(startIndex, this.index)
	}

	takeUpTo(upTo) {
		const pred = charClassPred(upTo)
		return this.takeWhile(ch =>!pred(ch))
	}
}

function charClassPred(whl) {
	if (typeof whl === 'string') {
		assert(whl.length === 1)
		return ch => ch === whl
	}
	if (whl instanceof RegExp)
		return ch => whl.test(ch)
	type(whl, Function)
	return whl
}
