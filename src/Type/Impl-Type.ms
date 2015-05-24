use
	.Kind _ kind! unchecked-kind!
	.Obj-Type
use-debug
	..! _ !not
	..compare =?
	..Object! empty-Object!
	.Kind kind?
	.Method impl!
	.Type contains?

Impl-Type = Kind
	doc. "
		TODO:REST
		Every Impl-Type should have a `prototype` property.
	test. !|
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
unchecked-kind! Function Impl-Type # Function isa Function, so can't use kind!
kind! Kind Impl-Type

region Self-Type
	# TODO: Wrap-Type (and make 'prototype' a Method, not a property)
	Self-Type. Obj-Type
		doc. "
			Impl-Type with exactly one member.
			Calling impl! on it will directly modify an Object to contain method implementations.
		props.
			prototype. Object
		test. !|
			x = empty-Object!()
			impl! contains? (self-type x) |
				1
			! =? (contains? x) 1

	kind! Self-Type Impl-Type

	self-type. |_:Object
		Self-Type (prototype. _

Impl-Type
