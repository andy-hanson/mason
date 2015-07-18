use
	..compare =?
	..js defined? js-sub
	..private.bootstrap implContains pAdd
	..private.js-impl isEmpty KindContains
	.Method impl! propagate-method-down! self-impl!
	.Obj-Type
use~
	..@.@
	.Impl-Type _ self-type
	..methods freeze frozen?
use-debug
	..Try _ fails-with?
	.Method
	.Type contains?

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
	test. !|
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
			assert! contains? A c

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
			assert! contains? X z

		region Method makes sure to do impl! on all Concrete-Type_s inheriting from an Kind.
			asdf = Method
				doc. "asdf_s its arguments."
			impl! asdf X |
				1
			assert! =? (asdf z) 1
			assert! contains? X z

		region Closed Kind
			Closed = Kind
				implementors. [ C Z ]
			assert! fails-with? "Closed is not open to new subtypes." !|
				kind! X Closed

	props.
		name. String
		super-kinds. Array # TODO: [~Kind]
		prototype. Object
		# TODO: Allow doc on prop
		# doc. "If immutable, this Kind does not accept new subtypes."
		implementors. Array # TODO: [~Impl-Type]
		symbol-for-isa. Symbol
	extensible. true
	defaults.
		super-kinds. |
			Array 0
		prototype. |
			Object.create null
		implementors. |
			Array 0
		symbol-for-isa. |_
			Symbol "isa-{_.name}"
	post-construct. !|_
		pAdd _.prototype _.symbol-for-isa true
		unless! isEmpty _.implementors
			for! implementor in _.implementors
				on-implementor! implementor _
			freeze _.implementors

implContains Kind KindContains

can-subtype?.
	doc. "Whether a Kind accepts new subtypes."
	test. |
		[ Impl-Type ] -> true
		[ Try ] -> false
	|_:Kind
		not frozen? _.implementors

# Making something an instance of Impl-Type is difficult because kind! checks that it's already an Impl-Type...
unchecked-kind!.
	doc. "
		kind! without any checks.
		Necessary if trying to implement Impl-Type itself.
	!|implementor kind
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
		[ X ] -> [ W Z ]
	|:@[Impl-Type] kind:Kind
		@for kind.implementors
			case!
				:Kind
					... concrete-implementors_
				else
					. _

kind!.
	doc. "
		Makes one Impl-Type a subtype of a Kind.
		Kinds can subtype each other.
	test. "See Impl-Type.test."
	# TODO: Assert no circular chains of kind!.
	# TODO implementor:Impl-Type
	!|implementor kind:Kind method-impls
		in
			assert! can-subtype? kind throw! "{kind} is not open to new subtypes."
			forbid! kind? implementor kind

		unchecked-kind! implementor kind
		if! defined? method-impls
			for! method-impls
				# TODO:SYNTAX Array destructure
				impl! (js-sub _ 0) implementor (js-sub _ 1)

self-kind!.
	doc. "TODO"
	test. !|
		pass # TODO
	!|implementor:Object kind:Kind method-impls
		kind! (self-type implementor) kind
		if! defined? method-impls
			for! method-impls
				# TODO:SYNTAX Array destructure
				self-impl! (js-sub _ 0) implementor (js-sub _ 1)

kind?.
	doc. "
		Whether one Impl-Type is a subtype of a Kind."
		implementor may itself be a Kind.
	test. "See Impl-Type.test."
	# TODO implementor:Impl-Type
	|implementor kind:Kind
		case implementor
			:Kind
				_.super-kinds.some |super-kind
					or (=? super-kind kind) (kind? super-kind kind
			else
				_ = implementor.prototype
				:kind

region Private
	@p-all = |_
		Object.getOwnPropertyNames_.concat Object.getOwnPropertySymbols_

	on-implementor! = !|_ kind
		if! :Kind
			_.super-kinds.push kind
		inherit-methods! _ kind

	inherit-methods! = !|implementor kind
		rec! = !|kind
			for! name in @p-all kind.prototype
				propagate-method-down! implementor name (js-sub kind.prototype name
			for! kind.super-kinds
				rec! _
		rec! kind
