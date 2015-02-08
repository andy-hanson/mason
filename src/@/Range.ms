use
	..@ _ count iterator
	..control if
	..Fun ignore thunk
	..math.Num _ Nat round-down sign
	..methods + - * / <! <? >=? empty length
	..Type.Impl-Type self-type
	..Type.Method impl!
	..Type.Pred-Type Opt
	..Type.Obj-Type
	.@-Type _ from-stream
	.? get-or Opt->?
	.Seq ?nth
debug use~
	..!
	.? _
	..methods =?
	.Seq seq=?

Range = Obj-Type
	doc. "Seq of Nums taking fixed steps."
	members.
		start. Num
		end. Num
		step. Num
	post-construct. |_
		in
			! =? (sign _.step) (sign (- _.end _.start))
		ignore _

\ TODO: SYNTAX
range. |-start-:Num -end-:Num -step-:Opt[Num]
	Range
		start. -start-
		end. -end-
		step. get-or (Opt->? -step-) (sign (- end start))

impl! length Range
	doc. "Difference between and and start values."
	test. |
		[ (range 5 10 2) ] -> 5
		[ (range 5 10 3) ] -> 5
	|_
		- _.end _.start

impl! from-stream (self-type Range) |_ stream
	ignore _ \ TODO:Ignored vars
	stream

<! Range @
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
			! seq=? (range 0 10 2) [0 2 4 6 8]
		~|range
			handle = ~|case!
				>=? _ range.end
					()
				else
					<~ _
					<~~ handle (+ _ range.step)
			<~~ handle range.start

<! (self-type Range) @-Type
	empty -> thunk (range 0 0)

Range
