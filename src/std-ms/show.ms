use
	.bags.Array
	.bags.Bag -> map
	.basic-methods -> type-of
	.Bool -> false true
	.Fun -> identity
	.js -> identical?
	.math.Num
	.Object -> own-enumerable-properties
	.Str -> indent
	.Try -> oh-no!
	.types.Interface
	.types.Method -> impl!
	.types.Pred-Type
	.types.Record-Type

\ TODO: empty Identity-Set!
inspecting. `new Set`

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
		identical? _ ()
			"()"
		identical? _ `undefined`
			"undefined"
		else
			oh-no! `"Boot error: inspect-impl not yet implemented for " + _`

show =
	doc. |:Str _
		"
			Converts the value to a string for string interpolation.
			This is the method called when you do `\{...}`.
			For a more detailed Str representation of data, use `inspect`.
	|case
		inspecting.has _
			`"<recursive>"` \"<recursive>"
		else
			inspecting.add _
			x = show-impl_
			inspecting.delete _
			x

show-impl. Method
	doc. "TODO"
	default. inspect-impl

impl! inspect-impl Str
	test. |
		[ "a" ] -> "\"a\""
	|_
		_ \ TODO:Ignored vars
		`"\"" + _ + "\""`

impl! inspect-impl Object
	|_
		key-vals = map own-enumerable-properties_ |key
			\ TODO: get-property
			val:Str = inspect `_[key]`
			"{key}. {indent val}"
		x = "
			{type-of_}
				{key-vals.join "\n\t"}
		x

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
