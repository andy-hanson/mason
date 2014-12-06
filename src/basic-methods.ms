\ TODO: Put this somewhere else

use
	.bags.? -> get-or
	.Object -> ?get-property
	.private.bootstrap -> sym-sub sym-type-of
	.types.Method
	.types.Type

freeze. Method
	doc. "
		Returns a compacted and immutable version of an object.
		Does not have to return the same value, but often does.
	default. |_
		Object.freeze _

sub. Method
	doc. "
		Implementing this allows the use of the special syntax `a[b]`.
	impl-symbol. sym-sub

\ TODO: rename to impl-type-of
type-of. Method
	doc. "
		Returns the most specific Impl-Type associated with some value.
		This method won't always work for JavaScript objects,
		but every Record-Type and Enum should implement this automatically.
	\ TODO: Should be able to just make it here. No need for syms.
	impl-symbol. sym-type-of
	default. |_
		get-or (?get-property _ "constructor") Object

\ TODO: Find better place for this. math-methods?
length. Method
	doc. "TODO"

=>. Method
	doc. |convert-to:Type convert-me
		"Converts a value to a given type."
