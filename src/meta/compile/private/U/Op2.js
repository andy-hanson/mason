export const
	ifElse2 = (op, ifSome, ifNone) =>
		op === null ? ifNone() : ifSome(op)
