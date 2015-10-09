import
	..compare <? <=?
	..control opr
	..Function thunk
	..math.Number Nat round-down sign
	..math.methods + - * /
	..Type.Kind kind! self-kind!
	..Type.Method self-impl!
	..Type.Pred-Type Opt
	.@ _ count iterator
	.@-Type _ empty from-stream
	.Seq.Seq ?nth

Range. class
	| Seq of Numbers taking fixed steps.

	do!
		self-kind! _ @-Type
		todo
		self-impl! empty _ (thunk (new _ 0 0))
		kind! _ @

	static
		from-stream |_
			todo We can't build a Range out of arbitrary elements...
			todo  impl-for from-stream Array
			_

	construct! start:Number end:Number step:Opt[Number]
		.start = start
		.end = end
		.step = opr step (sign (- end start))

	iterator ~!|
		cur ::= .start
		for!
			break-cond = case
				<? 0 .step
					<=? .end cur
				else
					<=? cur .end
			if! break-cond
				break!

			<~ cur
			cur := + cur .step

	?nth |n:Nat
		todo  Function if-test ?
		it = + .start (* .step n)
		if <? it .end
			it

	count |
		round-down (/ (length this) .step)

todo KILL
range. |start:Number end:Number step:Opt[Number]
	new Range start end step

range-incl. |start:Number end:Number step:Opt[Number]
	todo doc
	step := opr step (sign (- end start))
	range start (+ end step) step

todo rename?
length. |_:Range
	| Difference between and and start values.
	- _.end _.start
