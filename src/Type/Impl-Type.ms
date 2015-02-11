use
	..Bool or
	..js defined? reference=?
	..methods <! <?
	..private.bootstrap Fun Obj
	.Kind _ unchecked-implementor!
	.Method impl!
	.Obj-Type
use~
	..Map each-pair!
debug use~
	..! _ !not
	..methods =? empty
	..Obj!
	..Type contains?
	.Kind can-subtype?

Impl-Type. Kind
	doc. "
		TODO:REST
		Every Impl-Type should have a `prototype` property.
	test. |
		A = Kind
			doc. "A"
		B = Kind
			doc. "B"
		C = Obj-Type
			props.
				c.
		<! B A
		<! C B
		! <? B A
		! <? C B
		! <? C A
		!not <? A B

impl! <? Impl-Type
	doc. "
		Whether one Impl-Type is a subtype of a Kind."
		implementor may itself be a Kind.
	test. "See Impl-Type.test."
	|implementor:Impl-Type kind:Kind
		case implementor
			:Kind
				_.super-kinds.some |super
					\ TODO: Just use `=? super kind` ?
					or (reference=? super kind) ~(<? super kind)
			else
				_ = implementor.prototype
				:kind

impl! <! Impl-Type
	doc. "
		Makes one Impl-Type a subtype of a Kind.
		Kinds can subtype each other.
	test. "See Impl-Type.test."
	\ TODO: Assert no circular chains of <!.
	|implementor kind:Kind method-impls
		in
			! (can-subtype? kind) ~"{kind} is not open to new subtypes."
			!not <? implementor kind

		unchecked-implementor! implementor kind
		case! method-impls
			defined?_
				each-pair! _ |method implementation
					impl! method implementor implementation
			else
				()

unchecked-implementor! Obj-Type Impl-Type \ Obj-Type isa Obj-Type, so can't use <!
unchecked-implementor! Fun Impl-Type \ Fun isa Fun, so can't use <!
<! Kind Impl-Type

region Self-Type
	\ TODO: Wrap-Type (and make 'prototype' a Method, not a property)
	Self-Type. Obj-Type
		doc. "
			Impl-Type with exactly one member.
			Calling impl! on it will directly modify an Obj to contain method implementations.
		props.
			prototype. Obj
		test. |
			x = empty Obj!
			impl! contains? (self-type x) |
				1
			! =? (contains? x) 1

	<! Self-Type Impl-Type

	self-type. |_:Obj
		Self-Type (prototype. _

Impl-Type
