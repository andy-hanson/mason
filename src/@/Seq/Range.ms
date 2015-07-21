use
	...compare <? <=?
	...control opr
	...Function noop thunk
	...math.Number Nat round-down sign
	...math.methods + - * /
	...Type.Kind kind! self-kind!
	...Type.Method impl! self-impl!
	...Type.Pred-Type Opt
	...Type.Tuple
	..@ _ count iterator
	..@-Type _ empty from-stream
	.Seq ?nth
use-debug
	...compare =?
	...math.Number infinity
	..?
	.Seq seq=? take'

Range. Tuple
	doc. "Seq of Numbers taking fixed steps."
	props.
		. [ "start" Number
		. [ "end" Number
		. [ "step" Number
	post-construct. !|_
		in
			assert! =? (sign _.step) (sign (- _.end _.start
		noop _
	test. !|
		assert! seq=? [ 0 1 2 ] (take' (range 0 infinity) 3

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
self-impl! empty Range (thunk (range 0 0))
self-impl! from-stream Range |_
	# We can't build a Range out of arbitrary elements...
	# TODO: impl-for from-stream Array
	_

length.
	doc. "Difference between and and start values."
	test. |
		[ (range 5 10 2) ] -> 5
		[ (range 5 10 3) ] -> 5
	|_:Range
		- _.end _.start

impl! iterator Range
	test. !|
		assert! seq=? (range 0 10 2) [ 0 2 4 6 8 ]
	.~!|
		cur ::= .start
		for!
			if! <=? .end cur
				break!
			<~ cur
			cur := + cur .step

kind! Range @
# TODO: Restore test when impl!
impl! ?nth Range
	test. |
		r = range 0 10 2
		[ r 2 ] -> ? 4
		[ r 6 ] -> empty ?
	.|n:Nat
		# TODO: Function if-test ?
		it = + .start (* .step n)
		if <? it .end
			it

impl! count Range
	test. |
		[ (range 0 2 0.5) ] -> 4
	.|
		round-down (/ (length this) .step)
