use
	...compare <? <=?
	...control if opr
	...Function noop thunk
	...math.Number Nat round-down sign
	...math.methods + - * /
	...Type.Js-Method js-impl!
	...Type.Kind kind! self-kind!
	...Type.Pred-Type Opt
	...Type.Tuple
	..@ _ count iterator
	..@-Type _ empty from-stream
	.Seq ?nth
use-debug
	...!
	...compare =?
	...math.Number infinity
	..?
	.Seq seq=? take'

Range = Tuple
	doc. "Seq of Numbers taking fixed steps."
	props.
		. [ "start" Number
		. [ "end" Number
		. [ "step" Number
	post-construct. !|_
		in
			! =? (sign _.step) (sign (- _.end _.start
		noop _
	test. !|
		! seq=? [ 0 1 2 ] (take' (range 0 infinity) 3

range. |start:Number end:Number step:Opt[Number]
	step := opr step (sign (- end start
	Range start end step

range-incl.
	doc. "TODO"
	test. !|
		pass # TODO
	|start:Number end:Number step:Opt[Number]
		step := opr step (sign (- end start
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

js-impl! iterator Range
	test. |
		! seq=? (range 0 10 2) [ 0 2 4 6 8 ]
	~!|
		cur ::= this.start
		for!
			if! <=? this.end cur
				break!
			<~ cur
			cur := + cur this.step

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

Range
