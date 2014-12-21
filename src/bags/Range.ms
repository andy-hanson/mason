use
	..assert -> !
	.? -> get-or Opt->?
	.Array
	.Bag -> count iterator
	.Bag-Type -> from-stream
	..Comparable -> =? <? >=?
	..Comparable! -> <!
	..control -> if
	..Fun -> thunk
	..math.Num -> Nat round-down sign
	..methods -> => + - * / empty length
	..pred-types -> Opt
	..Ref -> get mod! ref
	.Seq -> ?nth seq=?
	..types.Method -> impl! impl-for
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

impl! from-stream (self-type Range) (impl-for from-stream (self-type Array

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
		~|_
			i = ref _.start
			loop!
				case!
					>=? (get i) _.end
						end-loop!
					else
						<~ (get i)
						mod! i +[_.step]

<! (self-type Range) Bag-Type
	empty -> thunk (range 0 0)

Range
