use
	...@.@ fold keep map map'
	...@.@! ++!
	...@.@-Type empty
	...@.Seq.Array!
	...@.Seq.Range range
	...@.Seq.Seq! set-nth!
	...@.Seq.Stream
	...@.Set.Id-Set!
	...Boolean and not
	...control returning
	...js defined? js-sub
	...math.Number infinity Nat square
	...math.methods +
	...Type.Type contains?
use-debug
	...!
	...@.Seq.Seq seq=? take'

digits = |_:Nat
	# TODO: map String to Array
	map' (_.toString 10) Number.parseInt

step = |:Nat _:Nat
	fold (map digits_ square) 0 +

cache = empty Array!
set-nth! cache 1 true

happy?.
	doc. "http://rosettacode.org/wiki/Happy_numbers"
	|n:Nat
		stepped-through = empty Id-Set!
		loop = |cur
			case js-sub cache cur
				defined?_
					_
				else
					and (not (contains? stepped-through cur)) ~
						# TODO: <+>!
						++! stepped-through [ cur ]
						loop (step cur
		returning (loop n) |ans
			for! stepped-through
				set-nth! cache _ ans
			set-nth! cache n ans

happy-numbers:Stream[Nat].
	doc. "Stream of all happy numbers."
	test. |
		! seq=? (take' happy-numbers 8)
			. 1
			. 7
			. 10
			. 13
			. 19
			. 23
			. 28
			. 31
	keep (range 1 infinity) happy?
