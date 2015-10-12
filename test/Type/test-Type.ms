import
	msl.Type.Type type-of
	..tests

tests "Type"
	extract -> !|
		todo syntax-test.ms
		My-Type = new Object
		self-impl! extract My-Type |case
			=? _ "extractable"
				[1 2]
			else
				null

		f = |case
			:My-Type a b
				"{a}{b}"
			else
				"not extractable"

		assert! =? "12" (f "extractable")
		assert! =? "not extractable" f()

	type-of ->
		[Type] -> Kind
		[null] -> Object

