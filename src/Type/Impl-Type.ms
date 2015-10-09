import
	.Kind _ kind! unchecked-kind!

Impl-Type. new Kind
	| Every Impl-Type should have a `prototype` property.
	todo more doc
	name.

unchecked-kind! Function Impl-Type || Function isa Function, so can't use kind!
kind! Kind Impl-Type

Self-Type. class
	| Impl-Type with exactly one member.
	| Calling impl! on it will directly modify an Object to contain method implementations.
	do!
		kind! _ Impl-Type

	construct! prototype:Object
		.prototype = prototype
