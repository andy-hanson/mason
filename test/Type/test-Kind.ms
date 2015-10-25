import
	msl.Object Object-Key
	msl.Try fails-with?
	msl.Type.Kind can-subtype? concrete-implementors
	..tests

tests 'Kind
	Kind -> !|
		region Inheritance chans - one way
			A = new Kind
				name.
			B = new Kind
				name.
			C = class
				todo  empty class
				'dummy |
					this
			kind! B A
			kind! C B
			c = new C
			assert! c:A

		region Inheritance chains
			X = new Kind
				name.
			Y = new Kind
				name.
			Z = class
				todo  empty class
				'dummy |
					this
			kind! Z Y
			kind! Y X
			z = new Z
			assert! z:X

		region Method makes sure to do impl! on all Concrete-Type_s inheriting from an Kind.
			asdf = new Method
				name.
			impl! asdf X |
				1
			assert! =? (asdf z) 1
			assert! z:X

		region Closed Kind
			Closed = new Kind
				name.
				implementors. [C Z]

			assert! fails-with? "Closed is not open to new subtypes." !|
				kind! X Closed

	can-subtype? ->
		[@] -> true
		[Object-Key] -> false

	concrete-implementors -> |
		X = new Kind
			name.
		Y = new Kind
			name.
		Z = class
			todo  empty class
			'dummy |
				this
		W = class
			todo  empty class
			'dummy |
				this
		kind! Y X
		kind! Z X
		kind! W Y
		[X] -> [W Z]

	self-kind! -> !|
		todo
		pass
