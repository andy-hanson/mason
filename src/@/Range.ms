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
import~ todo  use-debug
	.Seq.Seq seq=? take~

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
		todo test. !|
		todo 	assert! seq=? (range 0 10 2) [0 2 4 6 8]
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
		todo test. |
		todo	r = range 0 10 2
		todo	[r 2] -> ?some 4
		todo	[r 6] -> ?None

		todo  Function if-test ?
		it = + .start (* .step n)
		if <? it .end
			it

	count |
		todo test. |
		todo	[(range 0 2 0.5)] -> 4
		round-down (/ (length this) .step)


todo  class attributes
Range.test = !|
	assert! seq=? [0 1 2] (take~ (range 0 Number.POSITIVE_INFINITY) 3)

todo KILL
range. |start:Number end:Number step:Opt[Number]
	new Range start end step

range-incl.
	test. !|
		todo
		pass
	|start:Number end:Number step:Opt[Number]
		todo doc
		step := opr step (sign (- end start))
		range start (+ end step) step

length.
	test. |
		[(range 5 10 2)] -> 5
		[(range 5 10 3)] -> 5
	|_:Range
		| Difference between and and start values.
		- _.end _.start
