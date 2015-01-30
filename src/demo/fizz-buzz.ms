use
	..@ map
	..@.Seq drop
	..math.Num divisible? nats
debug use
	..!
	..@.Seq seq=? take

fizz-buzz.
	doc. "TODO"
	test. |
		! seq=? (take fizz-buzz 16)
			. 1
			. 2
			. "Fizz"
			. 4
			. "Buzz"
			. "Fizz"
			. 7
			. 8
			. "Fizz"
			. "Buzz"
			. 11
			. "Fizz"
			. 13
			. 14
			. "Fizz Buzz"
			. 16
	map (drop nats 1) |case
		divisible? _ 15
			"Fizz Buzz"
		divisible? _ 3
			"Fizz"
		divisible? _ 5
			"Buzz"
		else
			_

