use
	..@.@ _ fold
	.methods + /

average.
	todo doc
	test. |
		[[0 1 2]] -> 1
		[[]] -> Number.NaN
	|@vals:@[Number]
		sum ::= 0
		count ::= 0
		for! @vals
			sum := + sum _
			count := + 1 count
		/ sum count

sum.
	todo doc
	test. |
		[[1 2]] -> 3
		[[]] -> 0
	|@vals:@[Number]
		fold @vals 0 +
