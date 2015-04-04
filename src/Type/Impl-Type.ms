use
	..private.bootstrap Fun Obj
	.Kind _ kind! unchecked-kind!
	.Obj-Type
use-debug
	..! _ !not
	..compare =?
	..Obj! empty-Obj!
	.Kind kind?
	.Method impl!
	.Type contains?

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
		kind! B A
		kind! C B
		! kind? B A
		! kind? C B
		! kind? C A
		!not kind? A B

unchecked-kind! Obj-Type Impl-Type # Obj-Type isa Obj-Type, so can't use kind!
unchecked-kind! Fun Impl-Type # Fun isa Fun, so can't use kind!
kind! Kind Impl-Type

region Self-Type
	# TODO: Wrap-Type (and make 'prototype' a Method, not a property)
	Self-Type. Obj-Type
		doc. "
			Impl-Type with exactly one member.
			Calling impl! on it will directly modify an Obj to contain method implementations.
		props.
			prototype. Obj
		test. |
			x = empty-Obj!()
			impl! contains? (self-type x) |
				1
			! =? (contains? x) 1

	kind! Self-Type Impl-Type

	self-type. |_:Obj
		Self-Type (prototype. _

Impl-Type
