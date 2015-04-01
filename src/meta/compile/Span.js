import chalk from 'chalk'
import type from './U/type'
import { tuple } from './U/types'

export default class Span {
	constructor(start, end) {
		this.start = start
		this.end = end
	}

	toString() { return this.start + '-' + this.end }
}
export const
	single = pos => {
		type(pos, Pos)
		return new Span(pos, new Pos(pos.line, pos.column + 1))
	},
	spanTuple = (superType, ...namesTypes) =>
		tuple(superType, 'span', Span, ...namesTypes)

export class Pos {
	constructor(line, column) {
		this.line = line
		this.column = column
	}

	next(ch) {
		type(ch, String)
		return ch === '\n' ?
			new Pos(this.line + 1, 1) :
			new Pos(this.line, this.column + 1)
	}

	onPrevColmn() {
		return new Pos(this.line, this.column - 1)
	}

	toString() {
		return chalk.bold.red(`${this.line}:${this.column}`)
	}
}
export const StartPos = new Pos(1, 1)
