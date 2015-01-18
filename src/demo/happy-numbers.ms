use
	..!
	..@ -> each! fold keep map
	..@.Array!
	..@.Identity-Set!
	..@.Seq -> seq=? take
	..@.Seq! -> set-nth!
	..@.Stream
	..Bool -> and not true
	..control -> returning
	..js -> defined? js-sub
	..math.Num -> Nat nats square
	..methods -> + +! contains? empty

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
		stepped-through = empty Identity-Set!
		loop = |cur
			case js-sub cache cur
				defined?_
					_
				else
					and (not (contains? stepped-through cur)) ~
						+! stepped-through [ cur ]
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
	keep nats happy?
