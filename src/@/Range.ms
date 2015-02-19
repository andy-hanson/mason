use
	..@ _ count iterator
	..compare <? <=?
	..control if opr Ref! get set!
	..Fun ignore thunk
	..math.Num _ Nat round-down sign
	..math.methods + - * /
	..Type.Impl-Type self-type
	..Type.Kind kind!
	..Type.Method impl!
	..Type.Pred-Type Opt
	..Type.Obj-Type
	.@-Type _ empty from-stream
	.Seq ?nth
debug use~
	..!
	.? _
	..compare =?
	..math.Num infinity
	.Seq seq=? take

Range = Obj-Type
	doc. "Seq of Nums taking fixed steps."
	props.
		start. Num
		end. Num
		step. Num
	post-construct. |_
		in
			! =? (sign _.step) (sign (- _.end _.start
		ignore _
	test. |
		! seq=? [ 0 1 2 ] (take (range 0 infinity) 3

\ TODO:SYNTAX
range. |-start-:Num -end-:Num ?step:Opt[Num]
	-step- = opr ?step (sign (- -end- -start-
	Range
		start. -start-
		end. -end-
		step. -step-

kind! (self-type Range) @-Type
	empty -> thunk (range 0 0)


length.
	doc. "Difference between and and start values."
	test. |
		[ (range 5 10 2) ] -> 5
		[ (range 5 10 3) ] -> 5
	|_:Range
		- _.end _.start

impl! from-stream (self-type Range) |_ stream
	ignore _ \ TODO:Ignored vars
	stream

kind! Range @
	?nth ->
		test. |
			r = range 0 10 2
			[ r 2 ] -> ? 4
			[ r 6 ] -> empty ?
		|_ n:Nat
			it = + _.start (* _.step n)
			if (<? it _.end) |
				it
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
			\ TODO:ES6 The following should be just as fast!
			\f = ~|case
			\	>=? _ range.end
			\		()
			\	else
			\		<~ _
			\		<~~ f (+ _ range.step
			\f range.start

Range
