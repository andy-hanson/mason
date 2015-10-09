import
	..compare =?
	..js defined? js== js-sub
	..private.bootstrap implContains pAdd
	.Method impl! propagate-method-down! self-impl!
import~
	..@.@
	.Impl-Type Self-Type
	..methods freeze frozen?

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

can-subtype?. |_:Kind
	| Whether a Kind accepts new subtypes.
	not frozen? _.implementors

|| Making something an instance of Impl-Type is difficult because kind! checks that it's already an Impl-Type...
unchecked-kind!. !|implementor kind
	| kind! without any checks.
	| Necessary if trying to implement Impl-Type itself.
	kind.implementors.push implementor
	on-implementor! implementor kind

concrete-implementors. |:@ kind:Kind todo  :@[Impl-Type]
	| List of Impl-Types inheriting from this.
	| Does not include inheriting Kinds, but does include their implementors.
	@for kind.implementors
		case!
			:Kind
				... concrete-implementors_
			else
				. _

kind!. !|implementor kind:Kind method-impls
	| Makes one Impl-Type a subtype of a Kind.
	| Kinds can subtype each other.
	todo  Assert no circular chains of kind!.
	todo implementor:Impl-Type
	assert! can-subtype? kind throw! "{kind} is not open to new subtypes."
	forbid! kind? implementor kind

	unchecked-kind! implementor kind
	if! defined? method-impls
		for! method-impls
			todo SYNTAX Array destructure
			impl! (js-sub _ 0) implementor (js-sub _ 1)

self-kind!. !|implementor:Object kind:Kind method-impls
	todo doc
	kind! (new Self-Type implementor) kind
	if! defined? method-impls
		for! method-impls
			todo SYNTAX Array destructure
			self-impl! (js-sub _ 0) implementor (js-sub _ 1)

kind?. |implementor kind:Kind
	| Whether one Impl-Type is a subtype of a Kind.
	| implementor may itself be a Kind.
	todo implementor:Impl-Type
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
