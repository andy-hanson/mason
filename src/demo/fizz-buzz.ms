use
	..@ empty? flat-map map
	..@.Range range
	..control if
	..math.Num divisible? infinity Nat
	..Obj Obj->Map
	..Str
	..Type =>
use-debug
	..!
	..@.Seq seq=? take

make-fb = |spec
	map (range 1 infinity) |n
		parts = flat-map (Obj->Map spec) |_
			divisor:Nat = _.val
			shout:Str = _.key
			if (divisible? n divisor) shout
		case parts
			empty?_
				n
			else
				=> Str parts " "

fizz-buzz.
	doc. "Infinite Seq of Fizz Buzz game."
	test. |
		! seq=? (take fizz-buzz 6)
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
		! seq=? (take fizz-buzz-jazz 17)
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
