import
	msl.Object empty-Object!
	msl.Type.Impl-Type _ Self-Type
	msl.Type.Kind kind?
	..tests

tests "Impl-Type"
	Impl-Type -> !|
		A = new Kind
			name.
		B = new Kind
			name.
		C = class
			todo  empty class
			"dummy" |
				this
		kind! B A
		kind! C B
		assert! kind? B A
		assert! kind? C B
		assert! kind? C A
		forbid! kind? A B

	Self-Type -> !|
		x = empty-Object!()
		m = new Method
			name.
		impl! m (new Self-Type x) |
			1
		assert! =? (m x) 1

