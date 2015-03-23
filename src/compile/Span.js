import chalk from "chalk"
import type from "./U/type"
import { ObjType } from "./U/types"

export const Pos = ObjType("Pos", Object, { line: Number, column: Number })
export const StartPos = Pos({ line: 1, column: 1 })
Object.assign(Pos.prototype, {
	next(ch) {
		type(ch, String)
		return ch === '\n' ?
			Pos({ line: this.line + 1, column: 1}) :
			Pos({ line: this.line, column: this.column + 1})
	},
	toString() {
		return chalk.bold.red(this.line + ":" + this.column)
	}
})

const Span = ObjType("Span", Object, { start: Pos, end: Pos })
export default Span
Object.assign(Span.prototype, {
	toString() {
		return this.start + "-" + this.end
	}
})

export function spanType(name, superType, members) {
	type(name, String, superType, Object, members, Object)
	return ObjType(name, superType, Object.assign(members, { span: Span }))
}

export function single(pos) {
	type(pos, Pos)
	return Span({ start: pos, end: pos.next('x') })
}
