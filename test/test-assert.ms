import
	msl.assert assert-call! assert-this-call! assert-call-with!
	msl.Try fails-with?
	.tests

tests 'assert
	assert-call! -> !|
		assert-call! +
			[1 1] -> 2
		nope = "
			+ of:
				1
				1
			Should =?:
				3
			Got:
				2
		assert fails-with? nope !|
			assert-call! +
				[1 1] -> 3

	assert-this-call! -> !|
		todo
		pass

	assert-call-with! -> !|
		assert-call-with! same?[to-string] +
			[1 2] -> "3"
		todo test failure
