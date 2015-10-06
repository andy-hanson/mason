import
	..compare =?
	..js defined? js== js-sub
	..private.bootstrap implContains pAdd
	.Method impl! propagate-method-down! self-impl!
import~
	..@.@
	.Impl-Type Self-Type
	..methods freeze frozen?
	todo below: use-debug
	..Try fails-with?
	.Method
import-debug
	.Impl-Type

Kind. class
	| A Kind is like a tag you can apply to a Concrete-Type to signify that it belongs in some category.
	| That category is typically a group of types all of which implement the same set of methods.
	| Type checking for Kind membership is O(1).

	| The `prototype` on a Kind is not meant to be used as a prototype.
	| It stores the impl!_s that have been done on the Kind0.
	| impl! and kind! make sure that Concrete-Types receive the methods of their Kinds.
	| They require the Kind to correctly track super-kinds and implementors.

	do!
		implContains _ .|_
			| Cast to boolean so we return `false` and not `undefined`.
			Boolean and (not js== _ null) (js-sub _ .symbol-for-isa)

	construct! params
		assert! params.name:String

		Object.defineProperty this "name"
			value. params.name

		.super-kinds = case params.super-kinds
			defined?_
				todo  :Array
				_
			else
				[]

		.implementors = case params.implementors
			defined?_
				todo  :Array[Impl-Type]
				freeze_
			else
				[]

		.symbol-for-isa = case params.symbol-for-isa
			defined?_
				todo  :Symbol
				_
			else
				Symbol "isa-{.name}"

		.prototype = case params.prototype
			defined?_
				todo  :Object
				_
			else
				Object.create null

		pAdd .prototype .symbol-for-isa true
		for! .implementors
			on-implementor! _ this


todo  class attributes
Kind.test = !|
	region Inheritance chans - one way
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
		c = new C
		assert! c:A

	region Inheritance chains
		X = new Kind
			name.
		Y = new Kind
			name.
		Z = class
			todo  empty class
			"dummy" |
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

can-subtype?.
	| Whether a Kind accepts new subtypes.
	test. |
		[Impl-Type] -> true
	|_:Kind
		not frozen? _.implementors

|| Making something an instance of Impl-Type is difficult because kind! checks that it's already an Impl-Type...
unchecked-kind!.
	| kind! without any checks.
	| Necessary if trying to implement Impl-Type itself.
	!|implementor kind
		kind.implementors.push implementor
		on-implementor! implementor kind

concrete-implementors.
	| List of Impl-Types inheriting from this.
	| Does not include inheriting Kinds, but does include their implementors.
	test. |
		X = new Kind
			name.
		Y = new Kind
			name.
		Z = class
			todo  empty class
			"dummy" |
				this
		W = class
			todo  empty class
			"dummy" |
				this
		kind! Y X
		kind! Z X
		kind! W Y
		[X] -> [W Z]
	|:@ kind:Kind todo  :@[Impl-Type]
		@for kind.implementors
			case!
				:Kind
					... concrete-implementors_
				else
					. _

kind!.
	| Makes one Impl-Type a subtype of a Kind.
	| Kinds can subtype each other.
	test. "See Impl-Type.test."
	todo  Assert no circular chains of kind!.
	todo implementor:Impl-Type
	!|implementor kind:Kind method-impls
		in
			assert! can-subtype? kind throw! "{kind} is not open to new subtypes."
			forbid! kind? implementor kind

		unchecked-kind! implementor kind
		if! defined? method-impls
			for! method-impls
				todo SYNTAX Array destructure
				impl! (js-sub _ 0) implementor (js-sub _ 1)

self-kind!.
	todo doc
	test. !|
		todo
		pass
	!|implementor:Object kind:Kind method-impls
		kind! (new Self-Type implementor) kind
		if! defined? method-impls
			for! method-impls
				todo SYNTAX Array destructure
				self-impl! (js-sub _ 0) implementor (js-sub _ 1)

kind?.
	| Whether one Impl-Type is a subtype of a Kind.
	| implementor may itself be a Kind.
	test. "See Impl-Type.test."
	todo implementor:Impl-Type
	|implementor kind:Kind
		case implementor
			:Kind
				_.super-kinds.some |super-kind
					or (=? super-kind kind) (kind? super-kind kind)
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
			for! property in @p-all kind.prototype
				propagate-method-down! implementor property (js-sub kind.prototype property)
			for! kind.super-kinds
				rec! _
		rec! kind
