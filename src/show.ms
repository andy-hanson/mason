use
	.bags.Bag -> map
	.Bool -> false true
	.Comparable -> =?
	.Fun -> identity
	.js -> js-sub
	.js-impl -> new-Set
	.methods -> type-of
	.Object -> get-property own-enumerable-properties
	.private.bootstrap -> ms set!
	.Str -> indent
	.types.Method -> impl!

inspecting = new-Set ()
\ `show` often delegates to `inspect`, and vice versa, so that's an OK recursion.
showing = new-Set ()

inspect. Method
	doc. |:Str _
		"TODO"
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
	wrap. |impl args
		case args[0]
			inspecting.has _
				"<recursive>"
			else
				inspecting.add _
				x = Fun.prototype.apply.call impl () args
				inspecting.delete _
				x
	default. |case
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


show. Method
	doc. |:Str _
		"
			Converts the value to a string for string interpolation.
			This is the method called when you do `\{...}`.
			For a more detailed Str representation of data, use `inspect`.
	wrap. |impl args
		case js-sub args 0
			showing.has _
				"<recursive>"
			else
				showing.add _
				\ TODO:SYNTAX Splat call
				x:Str = Fun.prototype.apply.call impl () args
				showing.delete _
				x
	default. inspect

\ TODO:MOVE
impl! inspect Str
	test. |
		[ "a" ] -> "\"a\""
	|_
		"\"{_}\""

\ TODO: show-Bool.ms?
impl! inspect Bool
	test. |
		[ true ] -> "true"
		[ false ] -> "false"
	|case
		_
			"true"
		else
			"false"

\ TODO: MOVE
impl! show Str identity

set! ms "show" show

show
