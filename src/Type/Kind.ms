use
	..Bool and true
	..js defined? global js-sub
	..private.bootstrap Array impl-contains?! Obj p+! Str Symbol
	.Method propagate-method-down!
	.Obj-Type
use~
	..@ _ flat-map
	.Impl-Type
	..Obj can-get-p?
debug use~
	..!
	..@.Stream
	..methods => =? <! contains?
	.Method _ impl!

Kind. Obj-Type
	doc. "
		A Kind is like a tag you can apply to a Concrete-Type to signify that it belongs in some category.
		That category is typically a group of types all of which implement the same set of methods.
		Type checking for Kind membership is O(1).
		-
		The `prototype` on a Kind is not meant to be used as a prototype.
		It stores the impl!_s that have been done on the Kind0.
		impl! and <! make sure that Concrete-Types receive the methods of their Kinds.
		They require the Kind to correctly track super-kinds and implementors.
	test. |
		region Inheritance chans - one way
			A = Kind
				doc. "A"
			B = Kind
				doc. "B"
			C = Obj-Type
				members.
					c.
			<! B A
			<! C B
			c = C
				c. 1
			! contains? A c

		region Inheritance chains
			X = Kind
				doc. "X"
			Y = Kind
				doc. "Y"
			Z = Obj-Type
				members.
					x.
			<! Z Y
			<! Y X
			z = Z
				x. 1
			! contains? X z

		region Method makes sure to do impl! on all Concrete-Type_s inheriting from an Kind.
			asdf = Method
				doc. "asdf_s its arguments."
			impl! asdf X |
				1
			! =? (asdf z) 1
			! contains? X z
	members.
		displayName. Str
		~super-kinds. Array \ TODO: [~Kind]
		prototype. Obj
		implementors. Array \ TODO: [~Impl-Type]
		symbol-for-isa. Symbol
	extensible.
	defaults.
		super-kinds. |
			global.Array 0
		prototype. |
			Obj.create ()
		implementors. |
			global.Array 0
		symbol-for-isa. |_
			name:Str = _.displayName
			Symbol "isa-{name}"
	post-construct. |_
		p+! _.prototype _.symbol-for-isa true

\ Making something an instance of Impl-Type is difficult because implementor! checks that it's already an Impl-Type...
unchecked-implementor!.
	doc. "
		implementor! without any checks.
		Necessary if trying to implement Impl-Type itself.
	|implementor kind
		kind.implementors.push implementor
		case! implementor
			:Kind
				_.super-kinds.push kind
			else
				()
		inherit-methods! implementor kind

own-properties = |_
	(Obj.getOwnPropertyNames _).concat (Obj.getOwnPropertySymbols _)

inherit-methods! = |implementor kind
	rec! = |kind
		(own-properties kind.prototype).forEach |name
			\ TODO: use getp
			propagate-method-down! implementor name (js-sub kind.prototype name)
		kind.super-kinds.forEach rec!
	rec! kind

concrete-implementors.
	doc. "
		List of Impl-Types inheriting from this.
		Does not include inheriting Kinds, but does include their implementors.
	test. |
		X = Kind
			doc. "X"
		Y = Kind
			doc. "Y"
		Z = Obj-Type
			members.
				z.
		W = Obj-Type
			members.
				w.
		<! Y X
		<! Z X
		<! W Y
		[ X ] -> => Stream [ W Z ]
	|:@[Impl-Type] kind:Kind
		flat-map kind.implementors |case
			:Kind
				concrete-implementors_
			else
				[ _ ]

impl-contains?! Kind |kind _
	and can-get-p?_ ~(defined? (js-sub _ kind.symbol-for-isa
	\`_ != null && _[kind["symbol-for-isa"]] !== undefined`
	\p-with-proto? _ kind.symbol-for-isa

Kind
