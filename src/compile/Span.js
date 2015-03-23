import chalk from "chalk"
import type from "./U/type"
import { head, isEmpty, last } from "./U/Sq"
import { recordType } from "./U/types"

export const Pos = recordType("Pos", Object, { line: Number, column: Number })
export const StartPos = Pos({ line: 1, column: 1 })
Object.assign(Pos.prototype, {
	next: function(ch) {
		type(ch, String)
		return ch === '\n' ?
			Pos({ line: this.line + 1, column: 1}) :
			Pos({ line: this.line, column: this.column + 1})
	},

	toString: function() {
		return chalk.bold.red(this.line + ":" + this.column)
	}
})

const Span = recordType("Span", Object, { start: Pos, end: Pos })
export default Span
Object.assign(Span.prototype, {
	toString: function() {
		return this.start + "-" + this.end
	}
})

export function spanType(name, superType, members) {
	type(name, String, superType, Object, members, Object)
	return recordType(name, superType, Object.assign(members, { span: Span }))
}

// TODO: RENAME
export function ofSqT(spanDefault, sqt) {
	// TODO
	type(sqt, [require("./T").default])
	return isEmpty(sqt) ?
		spanDefault :
		Span({
			start: head(sqt).span.start,
			end: last(sqt).span.end
		})
}

export function single(pos) {
	type(pos, Pos)
	return Span({ start: pos, end: pos.next('x') })
}
