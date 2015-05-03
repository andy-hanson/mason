// Cheap-ass option type.
// It's just an array with 0 or 1 elements.

// This constructs an Op *type*. Use some and None to construct instances.
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

export const
	None = [],
	some = _ => [ _ ],

	opIf = (cond, then) =>
		cond ? some(then()) : None,

	ifElse = (op, ifSome, ifNone) =>
		op.length === 0 ?
			ifNone() :
			ifSome(op[0])
