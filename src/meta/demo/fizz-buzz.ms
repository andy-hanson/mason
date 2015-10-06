import
	...@.@ empty? @map~
	...@.Range
	...math.Number divisible? Nat
	...Object Object->Map
	...Type.Type =>
import-debug
	...@.Seq.Seq seq=? take~

make-fizz-buzz.
	| Infinite Seq of Fizz Buzz game.
	| `spec` is an Obj whose values are divisors and
	| whose keys are strings to be printed when the divisor matches.
	test. !|
		fizz-buzz = make-fizz-buzz (Fizz. 3 Buzz. 5)
		assert! seq=? (take~ fizz-buzz 6)
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
		assert! seq=? (take~ fizz-buzz-jazz 17)
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
		todo  map Map to Array is hard
		todo @for:Array
		tests = => Array (@map~ (Object->Map spec) |_
			todo SYNTAX array destructure
			shout:String. _[0]
			divisor:Nat. _[1]
		@map~ (new Range 1 Number.POSITIVE_INFINITY) |n
			s ::= ""
			for! tests
				if! divisible? n _.divisor
					s := "{s}{_.shout}"
			cond (empty? s) n s
