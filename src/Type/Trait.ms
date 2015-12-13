import
	..compare =?
	..js defined? exists? js-sub
	..private.bootstrap addProperty implContains msDef
	.Method impl! propagate-method-down! propagate-static-down! self-impl!
import~
	.Impl-Type Self-Type

Trait. class
	todo doc

	do
		implContains _ .|_
			|| Cast to boolean so we return `false` and not `undefined`.
			and exists?_ (Boolean (js-sub _ .symbol-for-isa))

	construct params
		todo :Str
		.name = params.name
		todo :Array[Trait]
		.super-traits = []

		todo :Array[Impl-Type]
		.implementors:Array = case params.implementors
			defined?_
				|| Frozen implementors signals that this is a closed Trait.
				Object.freeze_
			else
				[]

		.symbol-for-isa = Symbol "isa-#(.name)"
		.prototype = Object.create null

		addProperty .prototype .symbol-for-isa true

		for .implementors
			on-implementor! _ this
		if defined? params.super-traits
			for params.super-traits
				unchecked-trait! this _

msDef 'trait |-name super-traits static-defs proto-defs
	todo other params
	todo SYNTAX with new Trait (name. -name super-traits.)
	k = new Trait
		name. -name
		super-traits.
	with k
		assign-defs! _ static-defs
		assign-defs! _.prototype proto-defs

can-subtype?. |_:Trait
	| Whether a Trait accepts new subtypes.
	not Object.isFrozen _.implementors

|| Making something an instance of Impl-Type is difficult because trait! checks that it's already an Impl-Type...
unchecked-trait!. !|implementor trt
	| trait! without any checks.
	| Necessary if trying to implement Impl-Type itself.
	trt.implementors.push implementor
	on-implementor! implementor trt

@concrete-implementors. |trt:Trait todo :@[Impl-Type]
	| List of Impl-Types inheriting from this.
	| Does not include inheriting Traits, but does include their implementors.
	todo @for~
	@for trt.implementors
		case
			:Trait
				... @concrete-implementors_
			else
				. _

trait!. !|implementor trt:Trait method-impls
	| Makes one Impl-Type a subtype of a Trait.
	| Traits can subtype each other.
	todo  Assert no circular chains of trait!.
	todo implementor:Impl-Type
	assert can-subtype? trt throw "#trt is not open to new subtypes."
	forbid has-trait? implementor trt

	unchecked-trait! implementor trt
	if defined? method-impls
		for method-impls
			todo SYNTAX Array destructure
			impl! (js-sub _ 0) implementor (js-sub _ 1)

msDef 'traitDo trait!

self-trait!. !|implementor:Object trt:Trait method-impls
	todo doc
	trait! (new Self-Type implementor) trt
	if defined? method-impls
		for method-impls
			todo SYNTAX Array destructure
			self-impl! (js-sub _ 0) implementor (js-sub _ 1)

has-trait?. |implementor trt:Trait
	| Whether one Impl-Type is a subtype of a Trait.
	| implementor may itself be a Trait.
	todo implementor:Impl-Type
	case implementor
		:Trait
			_.super-traits.some |super-trait
				or (=? super-trait trt) (has-trait? super-trait trt)
		else
			implementor.prototype:trt

region Private
	@p-all = &(Object.getOwnPropertyNames_.concat Object.getOwnPropertySymbols_)

	on-implementor! = !|_ trt
		if :Trait
			_.super-traits.push trt
		inherit-methods! _ trt

	inherit-methods! = !|implementor trt
		rec! = !|trt
			for @p-all trt.prototype
				propagate-method-down! implementor _ (js-sub trt.prototype _)
			|| Do not take non-enumerable properties from the trait.
			for Object.keys trt
				todo Better way to ignore these properties? Make them non-enumerable?
				switch _
					'name 'super-traits 'implementors 'symbol-for-isa 'prototype
						pass
					else
						propagate-static-down! implementor _ (js-sub trt _)
			|| Do take symbols...
			todo neater (++)
			for Object.getOwnPropertySymbols trt
				propagate-static-down! implementor _ (js-sub trt _)
			for trt.super-traits
				rec! _
		rec! trt

	assign-defs! = !|assignee definitions
		| Copy properties from definitions to assignee, *not* calling getters.
		for Object.getOwnPropertyNames definitions
			Object.defineProperty assignee _ (Object.getOwnPropertyDescriptor definitions _)
		for Object.getOwnPropertySymbols definitions
			Object.defineProperty assignee _ (Object.getOwnPropertyDescriptor definitions _)
