import
	msl.Object Object-Key
	msl.Try fails-with?
	msl.Type.Kind can-subtype? concrete-implementors
	..tests

tests 'Kind
	Kind -> !|
		region Inheritance chans - one way
			A = kind
			B = kind
			C = class kind B
			kind! B A
			c = new C
			assert! c:A

		region Inheritance chains
			X = kind
			Y = kind
			Z = class kind Y
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
		X = kind
		Y = kind
		Z = class kind X
		W = class kind Y
		kind! Y X
		[X] -> [Z W]

	self-kind! -> !|
		todo
		pass
