import
	msl.Type.Impl-Type _ Self-Type
	msl.Type.Kind kind?
	..tests

tests 'Impl-Type
	Impl-Type -> !|
		A = new Kind
			name.
		B = new Kind
			name.
		C = class
		kind! B A
		kind! C B
		assert! kind? B A
		assert! kind? C B
		assert! kind? C A
		forbid! kind? A B

	Self-Type -> !|
		m = new Method
			name.
		x = new Object
		impl! m (new Self-Type x) |
			1
		assert! =? (m x) 1
