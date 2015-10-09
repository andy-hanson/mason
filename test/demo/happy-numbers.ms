import
	msl.@.@ ++! fold @keep~ @map
	msl.@.Seq.Seq seq=? set-nth! take
	msl.@.Set.Id-Set
	msl.js defined? js-sub
	msl.math.Number Nat remainder square
	..tests

|| Least-significant to most-significant, but order doesn't matter.
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
	todo  + ...(@map digits_ square)
	fold (@map digits_ square) +

cache = []
set-nth! cache 1 true

happy?.
	| http://rosettacode.org/wiki/Happy_numbers
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
					todo  +!
					++! stepped-through [cur]
					cur := happy-step cur
		with n-happy?
			set-nth! cache n _
			for! stepped-through
				set-nth! cache _ n-happy?

happy-numbers:Stream[Nat].
	| Stream of all happy numbers.
	@keep~ (new Range 1 Number.POSITIVE_INFINITY) happy?


tests "demo"
	happy-numbers -> !|
		assert! seq=? (take happy-numbers 8)
			. 1
			. 7
			. 10
			. 13
			. 19
			. 23
			. 28
			. 31
