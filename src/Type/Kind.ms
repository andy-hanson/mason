use
	..Bool or not
	..compare =?
	..js defined? js-sub
	..private.bootstrap impl-contains?! Obj p+! Str
	..private.js-impl isEmpty KindContains
	.Method impl! propagate-method-down! self-impl!
	.Obj-Type
use~
	..@ _ each! flat-map
	..control if!
	.Impl-Type _ self-type
	..methods freeze frozen?
use-debug
	..! _ !not
	..@.Stream
	..Try _ fails-with?
	..Type => contains?
	.Method

Kind. Obj-Type
	doc. "
		A Kind is like a tag you can apply to a Concrete-Type to signify that it belongs in some category.
		That category is typically a group of types all of which implement the same set of methods.
		Type checking for Kind membership is O(1).
		-
		The `prototype` on a Kind is not meant to be used as a prototype.
		It stores the impl!_s that have been done on the Kind0.
		impl! and kind! make sure that Concrete-Types receive the methods of their Kinds.
		They require the Kind to correctly track super-kinds and implementors.
	test. |
		region Inheritance chans - one way
			A = Kind
				doc. "A"
			B = Kind
				doc. "B"
			C = Obj-Type
				props.
					c.
			kind! B A
			kind! C B
			c = C
				c. 1
			! contains? A c

		region Inheritance chains
			X = Kind
				doc. "X"
			Y = Kind
				doc. "Y"
			Z = Obj-Type
				props.
					x.
			kind! Z Y
			kind! Y X
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

		region Closed Kind
			Closed = Kind
				implementors. [ C Z ]
			! fails-with? "Closed is not open to new subtypes." |
				kind! X Closed

	props.
		displayName. Str
		super-kinds. Array # TODO: [~Kind]
		prototype. Obj
		# TODO: Allow doc on prop
		# doc. "If immutable, this Kind does not accept new subtypes."
		implementors. Array # TODO: [~Impl-Type]
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
		case!
			isEmpty _.implementors
				()
			else
				_.implementors.forEach |implementor
					on-implementor! implementor _
				freeze _.implementors

impl-contains?! Kind KindContains

can-subtype?.
	doc. "Whether a Kind accepts new subtypes."
	test. |
		[ Impl-Type ] -> true
		[ Try ] -> false
	|_:Kind
		not (frozen? _.implementors

# Making something an instance of Impl-Type is difficult because kind! checks that it's already an Impl-Type...
unchecked-kind!.
	doc. "
		kind! without any checks.
		Necessary if trying to implement Impl-Type itself.
	|implementor kind
		kind.implementors.push implementor
		on-implementor! implementor kind

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
			props.
				z.
		W = Obj-Type
			props.
				w.
		kind! Y X
		kind! Z X
		kind! W Y
		[ X ] -> => Stream [ W Z ]
	|:@[Impl-Type] kind:Kind
		flat-map kind.implementors |case
			:Kind
				concrete-implementors_
			else
				[ _ ]

kind!.
	doc. "
		Makes one Impl-Type a subtype of a Kind.
		Kinds can subtype each other.
	test. "See Impl-Type.test."
	# TODO: Assert no circular chains of kind!.
	|implementor:Impl-Type kind:Kind method-impls
		in
			! (can-subtype? kind) ~"{kind} is not open to new subtypes."
			!not kind? implementor kind

		unchecked-kind! implementor kind
		case! method-impls
			defined?_
				each! _ |pair
					impl! pair.key implementor pair.val
			else
				()

self-kind!.
	doc. "TODO"
	test. |
		"TODO"
	|implementor:Obj kind:Kind method-impls
		kind! (self-type implementor) kind
		if! (defined? method-impls) |
			each! method-impls |pair
				self-impl! pair.key implementor pair.val

kind?.
	doc. "
		Whether one Impl-Type is a subtype of a Kind."
		implementor may itself be a Kind.
	test. "See Impl-Type.test."
	|implementor:Impl-Type kind:Kind
		case implementor
			:Kind
				_.super-kinds.some |super
					or (=? super kind) ~(kind? super kind
			else
				_ = implementor.prototype
				:kind

region Private
	@p-all = |_
		(Obj.getOwnPropertyNames _).concat (Obj.getOwnPropertySymbols _)

	on-implementor! = |implementor kind
		case! implementor
			:Kind
				_.super-kinds.push kind
			else
				()
		inherit-methods! implementor kind

	inherit-methods! = |implementor kind
		rec! = |kind
			(@p-all kind.prototype).forEach |name
				propagate-method-down! implementor name (js-sub kind.prototype name)
			kind.super-kinds.forEach rec!
		rec! kind


Kind
