use
	..@ each! fold keep map
	..@.@! ++!
	..@.@-Type empty
	..@.Array!
	..@.Id-Set!
	..@.Range range
	..@.Seq! set-nth!
	..@.Stream
	..Bool _ and not true
	..control returning
	..js defined? js-sub
	..math.Num _ infinity Nat square
	..math.methods +
	..Type contains?
debug use
	..!
	..@.Seq seq=? take


digits = |_:Nat
	map (_.toString 10) Num.parseInt

step =
	|:Nat _:Nat
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
						++! stepped-through [ cur ]
						loop (step cur
		returning (loop n) |ans:Bool
			each! stepped-through |_
				set-nth! cache _ ans
			set-nth! cache n ans

happy-numbers:Stream[Nat].
	doc. "Stream of all happy numbers."
	test. |
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
