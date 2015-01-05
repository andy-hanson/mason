use
	..assert -> !
	.? -> get-or Opt->?
	.Bag -> count iterator
	.Bag-Type -> from-stream
	..Comparable -> =? <? >=?
	..Comparable! -> <!
	..control -> if
	..Fun -> ignore thunk
	..math.Num -> Nat round-down sign
	..methods -> => + - * / empty length
	..pred-types -> Opt
	.Seq -> ?nth seq=?
	..types.Method -> impl!
	..types.Record-Type
	..types.util -> self-type

Range = Record-Type
	doc. "TODO"
	members.
		start. Num
		end. Num
		step. Num
	post-construct. |_
		in
			! =? (sign _.step) (sign (- _.end _.start))

\ TODO: SYNTAX
range. |-start-:Num -end-:Num -step-:Opt[Num]
	Range
		start. -start-
		end. -end-
		step. get-or (Opt->? -step-) (sign (- end start))

impl! length Range
	doc. "TODO"
	test. |
		[ (range 5 10 2) ] -> 5
	|_
		- _.end _.start

impl! from-stream (self-type Range) |_ stream
	ignore _ \ TODO:Ignored vars
	stream

<! Range Bag
	?nth ->
		test. |
			r = range 0 10 2
			[ r 2 ] -> => ? [ 4 ]
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

<! (self-type Range) Bag-Type
	empty -> thunk (range 0 0)

Range
