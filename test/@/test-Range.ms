import
	msl.@.Range length
	msl.Try fails?
	..tests

tests "Range"
	Range -> !|
		assert! seq=? [0 1 2] (@take~ (new Range 0 Number.POSITIVE_INFINITY) 3)
		|| Can't construct range with wrong sign of step
		assert! fails? |
			new Range 0 10 -1

	iterator -> !|
		todo assert! seq=? (new Range 0 10 2) [0 2 4 6 8]
		pass

	?nth ->
		r = new Range 0 10 2
		[r 2] -> ?some 4
		[r 6] -> ?None

	count ->
		[(new Range 0 2 0.5)] -> 4

	length ->
		[(new Range 5 10 2)] -> 5
		[(new Range 5 10 3)] -> 5

	@reverse ->
		[(new Range 0 5)] -> new Range 4 -1
		[(new Range 5 0)] -> new Range 1 6
		[(new Range 0 5 2)] -> new Range 4 0 -2
