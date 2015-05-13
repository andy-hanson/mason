export const
	// flatMap where opMapper returns optionals instead of arrays.
	flatOpMap = (arr, opMapper) => {
		const out = [ ]
		arr.forEach(em => opEach(opMapper(em), _ => out.push(_)))
		return out
	},

	ifElse = (op, ifSome, ifNone) =>
		op === null ? ifNone() : ifSome(op),

	opIf = (cond, makeOp) =>
		cond ? makeOp() : null,

	opMap = (op, mapper) =>
		op === null ? null : mapper(op),

	opEach = opMap

