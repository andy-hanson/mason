use
	.bags.Bag -> map
	.basic-methods -> type-of
	.Bool -> false true
	.Fun -> identity ignore
	.js -> reference=?
	.Object -> own-enumerable-properties
	.Str -> indent
	.types.Method -> impl!

\ TODO: empty Identity-Set!
inspecting = `new Set`
\ `show` often delegates to `inspect`, and vice versa, so that's an OK recursion.
showing = `new Set`

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
		reference=? _ ()
			"()"
		reference=? _ `undefined`
			"undefined"
		else
			key-vals = map own-enumerable-properties_ |key
				\ TODO: get-property
				val:Str = inspect `_[key]`
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
			`"<recursive>"` \TODO: "<recursive>"
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
		ignore _ \ TODO:Ignored vars
		`"\"" + _ + "\""`

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

`_ms.show = show`

show
