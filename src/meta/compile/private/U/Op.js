import { assert } from './util'

/*
Cheap-ass option type.
It's just an array with 0 or 1 elements.
*/

// This constructs an Op *type*. Use Op.Some and Op.None to construct instances.
export default function Op(opType) {
	const op = Object.create(Op.prototype)
	op.type = opType
	return Object.freeze(op)
}
Object.assign(Op.prototype, {
	getName() {
		return `Op(${this.type.getName()})`
	},
	toString() {
		return this.getName()
	}
})

export const None = []
export function some(_) {
	return [ _ ]
}

export function opIf(cond, then) {
	return cond ? some(then()) : None
}

export function ifElse(op, ifSome, ifNone) {
	if (op.length === 0)
		return ifNone()
	else {
		assert(op.length === 1)
		return ifSome(op[0])
	}
}
