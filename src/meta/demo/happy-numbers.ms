use
	...@.@ fold keep map
	...@.@! ++!
	...@.@-Type empty
	...@.Seq.Array!
	...@.Seq.Range range
	...@.Seq.Seq! set-nth!
	...@.Seq.Stream
	...@.Set.Id-Set!
	...compare =?
	...js defined? js-sub
	...math.Number infinity int/ Nat remainder square
	...math.methods +
	...Type.Type contains?
use-debug
	...!
	...@.Seq.Seq seq=? take

# Least-significant to most-significant, but order doesn't matter.
digits = |_
	base = 10
	Stream ~!|
		left ::= _
		for!
			<~ remainder left base
			left := int/ left base
			if! =? left 0
				break!

happy-step = |_
	# TODO: sum function?
	fold (map digits_ square) +

cache = empty Array!
set-nth! cache 1 true

happy?.
	doc. "http://rosettacode.org/wiki/Happy_numbers"
	|n:Nat
		stepped-through = empty Id-Set!
		cur ::= n
		# TODO:SYNTAX Loop return value
		res ::= null
		for!
			case! js-sub cache cur
				defined?_
					res := _
					break!
				else
					if! contains? stepped-through cur
						res := false
						break!
					# TODO: +!
					++! stepped-through [ cur ]
					cur := happy-step cur

		for! stepped-through
			set-nth! cache _ res
		set-nth! cache n res
		res

happy-numbers:Stream[Nat].
	doc. "Stream of all happy numbers."
	test. !|
		! seq=? (take happy-numbers 8)
			. 1
			. 7
			. 10
			. 13
			. 19
			. 23
			. 28
			. 31
	keep (range 1 infinity) happy?
