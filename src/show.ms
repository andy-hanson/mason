use
	.bags.Bag -> map
	.Bool -> false true
	.Comparable -> =?
	.Fun -> identity
	.js-impl -> new-Set
	.methods -> type-of
	.Object -> get-property own-enumerable-properties
	.private.bootstrap -> ms set!
	.Str -> indent
	.types.Method -> impl!

inspecting = new-Set ()
\ `show` often delegates to `inspect`, and vice versa, so that's an OK recursion.
showing = new-Set ()

inspect.
	doc. "TODO"
	test. |
		\ TODO: How to not include displayName
		a =
			x. ~a
		inspect a

		[ a ] -> "
			Dict
				x. <recursive>
				displayName. "a"
		\ TODO
		\ [ () ] -> "()"
		\ [ undefined ] -> "undefined"
	|case
		inspecting.has _
			"<recursive>"
		else
			inspecting.add _
			x = inspect-impl_
			inspecting.delete _
			x

\ TODO: Do more to prevent infinite recursion
inspect-impl. Method
	doc. |:Str _
		"TODO"
	default. |case
		\ TODO: Use impl! for some of these cases
		=? _ ()
			"()"
		=? _ undefined
			"undefined"
		else
			key-vals = map own-enumerable-properties_ |key
				val:Str = inspect (get-property _ key
				"{key}. {indent val}"
			"
				{type-of_}
					{key-vals.join "\n\t"}

show =
	doc. |:Str _
		"
			Converts the value to a string for string interpolation.
			This is the method called when you do `\{...}`.
			For a more detailed Str representation of data, use `inspect`.
	|case
		showing.has _
			"<recursive>"
		else
			showing.add _
			x = show-impl_
			showing.delete _
			x

show-impl. Method
	doc. "TODO"
	default. inspect-impl

impl! inspect-impl Str
	test. |
		[ "a" ] -> "\"a\""
	|_
		"\"{_}\""

\ TODO: show-Bool.ms?
impl! inspect-impl Bool
	test. |
		[ true ] -> "true"
		[ false ] -> "false"
	|case
		_
			"true"
		else
			"false"

impl! show-impl Str identity

set! ms "show" show

show
