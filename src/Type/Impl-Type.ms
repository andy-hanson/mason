use
	.Kind _ kind! unchecked-kind!
use~ # TODO: use-debug
	..compare =?
	..Object empty-Object!
	.Method impl!
	.Type contains?
use-debug
	.Kind kind?

Impl-Type. new Kind
	doc. "
		TODO:REST
		Every Impl-Type should have a `prototype` property.
	test. !|
		A = Kind
			doc. "A"
		B = Kind
			doc. "B"
		C = class
			# TODO: empty class
			"dummy" |
				this
		kind! B A
		kind! C B
		assert! kind? B A
		assert! kind? C B
		assert! kind? C A
		forbid! kind? A B

unchecked-kind! Function Impl-Type # Function isa Function, so can't use kind!
kind! Kind Impl-Type

region Self-Type
	Self-Type. class
		do!
			kind! _ Impl-Type
		# TODO: class attributes
		# doc. "
		#	Impl-Type with exactly one member.
		#	Calling impl! on it will directly modify an Object to contain method implementations.

		construct! prototype:Object
			.prototype = prototype

	# TODO: class attributes
	Self-Type.test = !|
		x = empty-Object!()
		impl! contains? (new Self-Type x) |
			1
		assert! =? (contains? x) 1

