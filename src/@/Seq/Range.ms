use
	...compare <? <=?
	...control if opr Ref! get set!
	...Fun noop thunk
	...math.Num _ Nat round-down sign
	...math.methods + - * /
	...Type.Kind kind! self-kind!
	...Type.Pred-Type Opt
	...Type.Tuple
	..@ _ count iterator
	..@-Type _ empty from-stream
	.Seq ?nth
use-debug
	...!
	...compare =?
	...math.Num infinity
	..?
	.Seq seq=? take'

Range = Tuple
	doc. "Seq of Nums taking fixed steps."
	props.
		. [ "start" Num
		. [ "end" Num
		. [ "step" Num
	post-construct. |_
		in
			! =? (sign _.step) (sign (- _.end _.start
		noop _
	test. |
		! seq=? [ 0 1 2 ] (take' (range 0 infinity) 3

range. |start:Num end:Num ?step:Opt[Num]
	step = opr ?step (sign (- end start
	Range start end step

range-incl.
	doc. "TODO"
	test. |
		"TODO"
	|start:Num end:Num ?step:Opt[Num]
		step = opr ?step (sign (- end start
		range start (+ end step) step

self-kind! Range @-Type
	empty -> thunk (range 0 0)
	# We can't build a Range out of arbitrary elements...
	# TODO: impl-for from-stream Array
	from-stream -> |_
		_

length.
	doc. "Difference between and and start values."
	test. |
		[ (range 5 10 2) ] -> 5
		[ (range 5 10 3) ] -> 5
	|_:Range
		- _.end _.start

kind! Range @
	?nth ->
		test. |
			r = range 0 10 2
			[ r 2 ] -> ? 4
			[ r 6 ] -> empty ?
		|_ n:Nat
			it = + _.start (* _.step n)
			if (<? it _.end) it
	count ->
		test. |
			[ (range 0 2 0.5) ] -> 4
		|_
			round-down (/ length_ _.step)

	iterator ->
		test. |
			! seq=? (range 0 10 2) [ 0 2 4 6 8 ]
		~|range
			cur = Ref! range.start
			loop!
				case! (get cur)
					<=? range.end _
						end-loop!
					else
						<~ _
						set! cur (+ _ range.step
			# TODO:ES6 The following should be just as fast!
			# f = ~|case
			#	>=? _ range.end
			#		()
			#	else
			#		<~ _
			#		<~~ f (+ _ range.step
			# f range.start

Range
