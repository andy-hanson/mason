/*
Cheap-ass option type.
It's just an array with 0 or 1 elements.
*/

import type from "./type"

// This constructs an Op *type*. Use Op.Some and Op.None to construct instances.
export default function Op(opType) {
	const op = Object.create(Op.prototype)
	op.type = opType
	return Object.freeze(op)
}
Object.assign(Op.prototype, {
	getName() {
		return "Op(" + this.type.getName() + ")"
	},
	toString() {
		return this.getName()
	}
})

export const None = []
export function some(_) {
	type(_, Object)
	return [ _ ]
}

export function opIf(cond, then) {
	type(cond, Boolean, then, Function)
	return cond ? some(then()) : None
}

export function ifElse(op, ifSome, ifNone) {
	type(op, Op(Object), ifSome, Function, ifNone, Function)
	return op.length === 0 ? ifNone() : ifSome(op[0])
}
