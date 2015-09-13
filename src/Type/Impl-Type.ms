use
	.Kind _ kind! unchecked-kind!
use~ todo  use-debug
	..compare =?
	..Object empty-Object!
	.Method _ impl!
use-debug
	.Kind kind?

Impl-Type. new Kind
	| Every Impl-Type should have a `prototype` property.
	todo more doc
	name.
	test. !|
		todo make sure this is actually running
		A = new Kind
		B = new Kind
		C = class
			todo  empty class
			"dummy" |
				this
		kind! B A
		kind! C B
		assert! kind? B A
		assert! kind? C B
		assert! kind? C A
		forbid! kind? A B

unchecked-kind! Function Impl-Type || Function isa Function, so can't use kind!
kind! Kind Impl-Type

Self-Type. class
	| Impl-Type with exactly one member.
	| Calling impl! on it will directly modify an Object to contain method implementations.
	do!
		kind! _ Impl-Type

		todo  class attriburtes
		_.test = !|
			x = empty-Object!()
			m = new Method
				name.
			impl! m (new Self-Type x) |
				1
			assert! =? (m x) 1

	construct! prototype:Object
		.prototype = prototype
