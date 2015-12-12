import
	..compare =?
	..js defined? exists? js-sub
	..private.bootstrap addProperty implContains msDef
	.Method impl! propagate-method-down! propagate-static-down! self-impl!
import~
	.Impl-Type Self-Type

Kind. class
	| A Kind is like a tag you can apply to a Concrete-Type to signify that it belongs in some category.
	| That category is typically a group of types all of which implement the same set of methods.
	| Type checking for Kind membership is O(1).

	| The `prototype` on a Kind is not meant to be used as a prototype.
	| It stores the impl!_s that have been done on the Kind0.
	| impl! and kind! make sure that Concrete-Types receive the methods of their Kinds.
	| They require the Kind to correctly track super-kinds and implementors.

	do
		implContains _ .|_
			|| Cast to boolean so we return `false` and not `undefined`.
			and exists?_ (Boolean (js-sub _ .symbol-for-isa))

	construct params
		todo :Str
		.name = params.name
		todo :Array[Kind]
		.super-kinds = []

		todo :Array[Impl-Type]
		.implementors:Array = case params.implementors
			defined?_
				|| Frozen implementors signals that this is a closed Kind.
				Object.freeze_
			else
				[]

		.symbol-for-isa = Symbol "isa-#(.name)"
		.prototype = Object.create null

		addProperty .prototype .symbol-for-isa true

		for .implementors
			on-implementor! _ this
		if defined? params.super-kinds
			for params.super-kinds
				unchecked-kind! this _

msDef 'kind |-name super-kinds static-defs proto-defs
	todo other params
	todo SYNTAX with new Kind (name. -name super-kinds.)
	k = new Kind
		name. -name
		super-kinds.
	with k
		assign-defs! _ static-defs
		assign-defs! _.prototype proto-defs

can-subtype?. |_:Kind
	| Whether a Kind accepts new subtypes.
	not Object.isFrozen _.implementors

|| Making something an instance of Impl-Type is difficult because kind! checks that it's already an Impl-Type...
unchecked-kind!. !|implementor knd
	| kind! without any checks.
	| Necessary if trying to implement Impl-Type itself.
	knd.implementors.push implementor
	on-implementor! implementor knd

@concrete-implementors. |knd:Kind todo :@[Impl-Type]
	| List of Impl-Types inheriting from this.
	| Does not include inheriting Kinds, but does include their implementors.
	todo @for~
	@for knd.implementors
		case
			:Kind
				... @concrete-implementors_
			else
				. _

kind!. !|implementor knd:Kind method-impls
	| Makes one Impl-Type a subtype of a Kind.
	| Kinds can subtype each other.
	todo  Assert no circular chains of kind!.
	todo implementor:Impl-Type
	assert can-subtype? knd throw "#knd is not open to new subtypes."
	forbid kind? implementor knd

	unchecked-kind! implementor knd
	if defined? method-impls
		for method-impls
			todo SYNTAX Array destructure
			impl! (js-sub _ 0) implementor (js-sub _ 1)

msDef 'kindDo kind!

self-kind!. !|implementor:Object knd:Kind method-impls
	todo doc
	kind! (new Self-Type implementor) knd
	if defined? method-impls
		for method-impls
			todo SYNTAX Array destructure
			self-impl! (js-sub _ 0) implementor (js-sub _ 1)

kind?. |implementor knd:Kind
	| Whether one Impl-Type is a subtype of a Kind.
	| implementor may itself be a Kind.
	todo implementor:Impl-Type
	case implementor
		:Kind
			_.super-kinds.some |super-kind
				or (=? super-kind knd) (kind? super-kind knd)
		else
			implementor.prototype:knd

region Private
	@p-all = &(Object.getOwnPropertyNames_.concat Object.getOwnPropertySymbols_)

	on-implementor! = !|_ knd
		if :Kind
			_.super-kinds.push knd
		inherit-methods! _ knd

	inherit-methods! = !|implementor knd
		rec! = !|knd
			for @p-all knd.prototype
				propagate-method-down! implementor _ (js-sub knd.prototype _)
			|| Do not take non-enumerable properties from the kind.
			for Object.keys knd
				todo Better way to ignore these properties? Make them non-enumerable?
				switch _
					'name 'super-kinds 'implementors 'symbol-for-isa 'prototype
						pass
					else
						propagate-static-down! implementor _ (js-sub knd _)
			|| Do take symbols...
			todo neater (++)
			for Object.getOwnPropertySymbols knd
				propagate-static-down! implementor _ (js-sub knd _)
			for knd.super-kinds
				rec! _
		rec! knd

	assign-defs! = !|assignee definitions
		| Copy properties from definitions to assignee, *not* calling getters.
		for Object.getOwnPropertyNames definitions
			Object.defineProperty assignee _ (Object.getOwnPropertyDescriptor definitions _)
		for Object.getOwnPropertySymbols definitions
			Object.defineProperty assignee _ (Object.getOwnPropertyDescriptor definitions _)
