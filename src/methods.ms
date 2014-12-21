use
	.bags.? -> get-or Opt->?
	.Bool
	.Object
	.pred-types -> Any
	.private.bootstrap -> sym-contains? sym-sub sym-type-of
	.types.Method
	.types.Type

region Arithmetic operators
	+. Method
		doc. |a b
			"Combines two values of the same type into a greater value of that type."

	-. Method
		doc. |a b
			"Inverse of `+`. Takes `b` away from `a`. `+ b res` should be `a`."

	*. Method
		doc. |a b
			"`b` copies of `a`."

	/. Method
		doc. |a b
			"Inverse of `*`. `* b res` should be `a`."

	+!. Method
		doc. |a b
			"TODO"

	-!. Method
		doc. |a b
			"TODO"

region Basics
	sub. Method
		doc. "
			Implementing this allows the use of the special syntax `a[b]`.
		impl-symbol. sym-sub

	=>. Method
		doc. |convert-to:Type convert-me
			"Converts a value to a given type."

region Collection
	empty. Method
		doc. "
			Instance of a type which is `empty?`.
			Should always return the same thing iff immutable.

	empty?. Method
		doc. "TODO"

	empty!. Method
		doc. "TODO"

region Unsorted
	freeze. Method
		doc. "
			Returns a compacted and immutable version of an object.
			Does not have to return the same value, but often does.
		default. |_
			Object.freeze _

	\ TODO: rename to impl-type-of
	\ TODO: Move to types.util
	type-of. Method
		doc. "
			Returns the most specific Impl-Type associated with some value.
			This method won't always work for JavaScript objects,
			but every Record-Type and Enum should implement this automatically.
		\ TODO: Should be able to just make it here. No need for syms.
		impl-symbol. sym-type-of
		default. |case
			\ TODO: ?get-property-or-in-prototype
			:Any
				get-or (Opt->? _.constructor) Object
			else
				Object

	length. Method
		doc. "TODO"

	contains?. Method
		doc. |:Bool type:Type value
			"TODO"
		impl-symbol. sym-contains?
