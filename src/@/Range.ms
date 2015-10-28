import
	..compare <? <=? >=?
	..Function thunk
	..js defined?
	..math.Number neg Nat remainder same-sign? sign
	..math.methods + - * /
	..private.bootstrap msDef
	..Type.Kind kind! self-kind!
	..Type.Method self-impl!
	..Type.Pred-Type Opt
	.@ _ count iterator
	.@-Type _ empty from-stream
	.Seq.Seq ?nth @reverse

Range. class
	| Seq of Numbers taking fixed steps.
	| `start` is inclusive, `end` is exclusive.

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
		.step = case step
			defined?_
				assert! same-sign? _ (- end start)
				_
			else
				sign (- end start)

	'by |step
		new Range .start .end step

	'length |
		- .end .start

	iterator ~!|
		cur ::= .start
		for!
			break-cond = case
				<? 0 .step
					>=? cur .end
				else
					<=? cur .end
			if! break-cond
				break!

			<~ cur
			cur := + cur .step

	|| Below functions can be implemented more efficiently than the defaults.

	?nth |n:Nat
		todo  Function if-test ?
		it = + .start (* .step n)
		if <? it .end
			it

	count |
		Math.floor (/ .length() .step)

	@reverse |
		new-step = neg .step
		rem = remainder (- .end .start) .step
		switch rem
			0
				new Range (- .end .step) (- .start .step) new-step
			else
				new Range (- .end rem) .start new-step

msDef 'range |start end exclusive?
	unless! exclusive?
		end := + end (sign (- end start))
	new Range start end
