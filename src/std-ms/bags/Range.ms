use
	..arithmetic-methods -> + - * /
	..assert -> !
	.? -> ?none ?some get-or Opt->?
	.Array
	.Bag -> ?nth builder count iterator seq=?
	.Bag-Type -> empty
	..basic-methods -> length
	..Comparable -> =? <? >=?
	..control -> if
	..Fun -> thunk
	..math.Num -> Nat round-down sign
	..pred-types -> Opt
	.Stream -> streaming
	..types.Interface -> implementor!
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

impl! length Range |_
	- _.end _.start

implementor! Range Bag
	builder -> impl-for builder Array
	?nth ->
		test. |
			r = range 0 10 2
			[ r 2 ] -> ?some 4
			[ r 6 ] -> ?none
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
			! seq=? (range 0 10 2) [0 2 4 8]
		~|_
			i ::= _.start
			loop!
				case!
					>=? i _.end
						end-loop!
					else
						<~ i
						i := + i _.step

implementor! (self-type Range) Bag-Type
	empty -> thunk (range 0 0)

