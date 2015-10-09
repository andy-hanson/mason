import
	msl.@.? ?None ?some
	msl.@.Range range-incl length
	msl.@.Seq.Seq ?nth seq=? take~
	..tests

tests "Range"
	Range -> !|
		assert! seq=? [0 1 2] (take~ (new Range 0 Number.POSITIVE_INFINITY) 3)

	iterator -> !|
		todo assert! seq=? (new Range 0 10 2) [0 2 4 6 8]
		pass

	?nth ->
		r = new Range 0 10 2
		[r 2] -> ?some 4
		[r 6] -> ?None

	count ->
		[(new Range 0 2 0.5)] -> 4

	range-incl -> !|
		todo
		pass

	length ->
		[(new Range 5 10 2)] -> 5
		[(new Range 5 10 3)] -> 5
