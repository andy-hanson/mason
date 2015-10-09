import
	msl.@.?
	msl.methods sub
	msl.Type.Alias-Type
	..tests

tests "Alias-Type"
	Alias-Type -> !|
		A = new Alias-Type
			name.
			alias-of. String
		assert! "0":A
		forbid! =? A String

	sub ->
		?2 = new Alias-Type
			name.
			alias-of. ?
		[?2 String] -> ?[String]
