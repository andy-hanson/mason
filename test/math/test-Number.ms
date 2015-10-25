import
	msl.Function spread!
	msl.math.Number sign near? square square-root near-0? mid
	msl.Try fails?
	..tests

tests 'Number
	Int -> !|
		assert-int! = !|_
			assert! _:Int
		forbid-int! = !|_
			forbid! _:Int
		spread! assert-int!
			. 1
			. Number.MIN_SAFE_INTEGER
			. Number.MAX_SAFE_INTEGER
		spread! forbid-int!
			. 1.1
			. - Number.MIN_SAFE_INTEGER 1
			. + Number.MAX_SAFE_INTEGER 1

	Nat -> !|
		assert! 0:Nat
		forbid! -1:Nat

	=? ->
		[Number.NaN Number.NaN] -> true

	sign ->
		[-8] -> -1
		[0] -> 0
		[8] -> 1

	remainder ->
		[2 3] -> 2
		[2 -3] -> 2
		[-2 3] -> -2
		[-2 -3] -> -2

	int/ ->
		[3 2] -> 1
		[-3 2] -> -2

	modulo ->
		[2 3] -> 2
		[2 -3] -> 2
		[-2 3] -> 1
		[-2 -3] -> 1

	divisible? ->
		[4 2] -> true
		[4 -2] -> true
		[3 2] -> false

	log -> |
		assert! near? (log 10 0.01) -2
		[2 8] -> 3

	square ->
		[3] -> 9

	square-root -> |
		[4] -> 2
		assert! fails? !|
			square-root -1

	near? ->
		[1000.9 1000 3] -> true
		[1000.9 1000 4] -> false
		[0.001001 0.001 3] -> true
		[0.001001 0.001 4] -> false
		[0.001 -0.001 1] -> false || Numbers with different signs are never near.
		region Behaves like `near-0?` when an arg is 0
			[0.00999 0 2] -> true
			[0 0.00999 2] -> true

	near-0? ->
		[0.00999 2] -> true
		[0.01 2] -> false

	neg ->
		[1] -> -1
		[0] -> -0

	mid ->
		[0 1] -> 0.5
