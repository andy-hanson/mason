use
	...@.@ ++! fold keep' map
	...@.@-Type empty
	...@.Range
	...@.Seq.Seq set-nth!
	...@.Seq.Stream
	...@.Set.Id-Set
	...compare =?
	...js defined? js-sub
	...math.Number int/ Nat remainder square
	...math.methods +
use-debug
	...@.Seq.Seq seq=? take

# Least-significant to most-significant, but order doesn't matter.
digits = |_
	base = 10
	new Stream ~!|
		left ::= _
		for!
			<~ remainder left base
			left := int/ left base
			if! =? left 0
				break!

happy-step = |_
	# TODO: sum function?
	fold (map digits_ square) +

cache = [ ]
set-nth! cache 1 true

happy?.
	doc. "http://rosettacode.org/wiki/Happy_numbers"
	|n:Nat
		stepped-through = empty Id-Set
		cur ::= n
		n-happy? = for
			case! js-sub cache cur
				defined?_
					break _
				else
					if! cur:stepped-through
						break false
					# TODO: +!
					++! stepped-through [ cur ]
					cur := happy-step cur
		with n-happy?
			set-nth! cache n _
			for! stepped-through
				set-nth! cache _ n-happy?

happy-numbers:Stream[Nat].
	doc. "Stream of all happy numbers."
	test. !|
		assert! seq=? (take happy-numbers 8)
			. 1
			. 7
			. 10
			. 13
			. 19
			. 23
			. 28
			. 31
	keep' (new Range 1 Number.POSITIVE_INFINITY) happy?
