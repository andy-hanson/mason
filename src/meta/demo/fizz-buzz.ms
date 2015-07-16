use
	...@.@ empty? map'
	...@.Seq.Range range
	...math.Number divisible? infinity Nat
	...Object Object->Map
	...Type.Type =>
use-debug
	...@.Seq.Seq seq=? take'

make-fizz-buzz.
	doc. "
		Infinite Seq of Fizz Buzz game.
		Spec is an Obj whose values are divisors and
		whose keys are strings to be printed when the divisor matches.
	test. !|
		fizz-buzz =
			# TODO:DISPLAYNAME Should be able to move this to prev line...
			make-fizz-buzz
				Fizz. 3
				Buzz. 5
		assert! seq=? (take' fizz-buzz 6)
			. 1
			. 2
			. "Fizz"
			. 4
			. "Buzz"
			. "Fizz"

		fizz-buzz-jazz =
			make-fizz-buzz
				Fizz. 3
				Jazz. 4
				Buzz. 5
		assert! seq=? (take' fizz-buzz-jazz 17)
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
			. "FizzJazz"
			. 13
			. 14
			. "FizzBuzz"
			. "Jazz"
			. 17
	|spec
		# TODO: map Map to Array is hard
		tests = => Array (map' (Object->Map spec) |_
			# TODO:SYNTAX array destructure
			shout:String. _[0]
			divisor:Nat. _[1]
		map' (range 1 infinity) |n
			s ::= ""
			for! tests
				if! divisible? n _.divisor
					s := "{s}{_.shout}"
			# TODO:SYNTAX ternary operator
			case
				empty? s
					n
				else
					s
