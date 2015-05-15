use
	...@.@ empty? flat-map' map'
	...@.Seq.Range range
	...control if
	...math.Number divisible? infinity Nat
	...Object Object->Map
	...Type.Type =>
use-debug
	...!
	...@.Seq.Seq seq=? take'

make-fb = |spec
	map' (range 1 infinity) |n
		# TODO: map Map to Array is hard
		parts = flat-map' (Object->Map spec) |_
			divisor:Nat = _.val
			shout:String = _.key
			if (divisible? n divisor) shout
		case parts
			empty?_
				n
			else
				=> String parts " "

fizz-buzz.
	doc. "Infinite Seq of Fizz Buzz game."
	test. |
		! seq=? (take' fizz-buzz 6)
			. 1
			. 2
			. "Fizz"
			. 4
			. "Buzz"
			. "Fizz"
	make-fb
		Fizz. 3
		Buzz. 5

fizz-buzz-jazz.
	doc. "Infinite Seq of Fizz Buzz Jazz game."
	test. |
		! seq=? (take' fizz-buzz-jazz 17)
			. 1
			. 2
			. "Fizz"
			. "Jazz"
			. "Buzz"
			. "Fizz"
			. 7
			. "Jazz"
			. "Fizz"
			. "Buzz"
			. 11
			. "Fizz Jazz"
			. 13
			. 14
			. "Fizz Buzz"
			. "Jazz"
			. 17
	make-fb
		Fizz. 3
		Jazz. 4
		Buzz. 5
