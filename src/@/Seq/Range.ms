use
	...compare <? <=?
	...control opr
	...Function thunk
	...math.Number Nat round-down sign
	...math.methods + - * /
	...Type.Kind kind! self-kind!
	...Type.Method self-impl!
	...Type.Pred-Type Opt
	..@ _ count iterator
	..@-Type _ empty from-stream
	.Seq ?nth
use~ # TODO: use-debug
	...math.Number infinity
	.Seq seq=? take'

Range. class
	do!
		self-kind! _ @-Type
		# TODO
		self-impl! empty _ (thunk (new _ 0 0))
		kind! _ @

	static
		from-stream |_
			# We can't build a Range out of arbitrary elements...
			# TODO: impl-for from-stream Array
			_

	# TODO: class attributes
	# doc. "Seq of Numbers taking fixed steps."
	construct! start end step
		.start = start
		.end = end
		.step = opr step (sign (- end start))

	iterator ~!|
		# TODO
		# test. !|
		# 	assert! seq=? (range 0 10 2) [ 0 2 4 6 8 ]
		cur ::= .start
		for!
			if! <=? .end cur
				break!
			<~ cur
			cur := + cur .step

	?nth |n:Nat
		# TODO
		# test. |
		#	r = range 0 10 2
		#	[ r 2 ] -> ?some 4
		#	[ r 6 ] -> ?None

		# TODO: Function if-test ?
		it = + .start (* .step n)
		if <? it .end
			it

	count |
		# TODO
		# test. |
		#	[ (range 0 2 0.5) ] -> 4
		round-down (/ (length this) .step)


# TODO: class attributes
Range.test = !|
	assert! seq=? [ 0 1 2 ] (take' (range 0 infinity) 3

# TODO:KILL
range. |start:Number end:Number step:Opt[Number]
	new Range start end step

range-incl.
	doc. "TODO"
	test. !|
		pass # TODO
	|start:Number end:Number step:Opt[Number]
		step := opr step (sign (- end start
		range start (+ end step) step


length.
	doc. "Difference between and and start values."
	test. |
		[ (range 5 10 2) ] -> 5
		[ (range 5 10 3) ] -> 5
	|_:Range
		- _.end _.start

