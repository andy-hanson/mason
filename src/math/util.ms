import
	..@.@ _ fold
	.methods + /

average. |@vals:@[Number]
	todo doc
	sum = 0
	count = 0
	for @vals
		sum := + sum _
		count := + 1 count
	/ sum count

sum. |@vals:@[Number]
	todo doc
	fold @vals 0 +
