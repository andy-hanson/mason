use
	..@.@ _ fold
	.methods + /
	.Number incr

average.
	doc. "TODO"
	test. |
		[ [ 0 1 2 ] ] -> 1
		[ [ ] ] -> Number.NaN
	|@vals:@[Number]
		sum ::= 0
		count ::= 0
		for! @vals
			sum := + sum _
			count := incr count
		/ sum count

sum.
	doc. "TODO"
	test. |
		[ [ 1 2 ] ] -> 3
		[ [ ] ] -> 0
	|@vals:@[Number]
		fold @vals 0 +