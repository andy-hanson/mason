\ TODO: Put this somewhere else

use
	.bags.? -> get-or
	.Object -> ?get-property
	.private.bootstrap -> sym-sub sym-type-of
	.types.Method
	.types.Type

freeze. Method
	doc. "TODO"
	default. |_
		Object.freeze _

sub. Method
	doc. "
		This method has no special meaning and shouldn't be used polymorphically.
		Implement it to be able to subscript like `a[b]`.

	impl-symbol. sym-sub

type-of. Method
	doc. "TODO"
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
