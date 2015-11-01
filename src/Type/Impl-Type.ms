import
	.Kind _ kind! unchecked-kind!

Impl-Type. kind
	| Every Impl-Type should have a `prototype` property.
	todo more doc

unchecked-kind! Function Impl-Type || Function isa Function, so can't use kind!
kind! Kind Impl-Type

Self-Type. class kind Impl-Type
	| Impl-Type with exactly one member.
	| Calling impl! on it will directly modify an Object to contain method implementations.

	construct! prototype:Object
		.prototype = prototype
