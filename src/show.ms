use
	.bags.Bag -> map
	.Bool -> false true
	.Comparable -> =?
	.Fun
	.js -> js-sub
	.js-impl -> new-Set
	.methods -> type-of
	.Object -> flag? get-property own-enumerable-properties
	.private.bootstrap -> ms set!
	.Str -> indent
	.types.Method -> impl!

showing = new-Set ()

show = Method
	doc. |:Str _ opts
		"
			Converts the value to a string for string interpolation.
			This is the method called when you do `\{...}`.
			For a more detailed Str representation of data, use `inspect`.
	test. |
		\ TODO: How to not include displayName
		a =
			x. ~a
		\ TODO:SYNTAX [ repr. ]
		r =
			repr.
		[ a ] -> "
			Dict
				x. <recursive>
				displayName. a
		[ a r ] -> "
			Dict
				x. <recursive>
				displayName. "a"
		\ TODO
		\ [ () ] -> "()"
		\ [ undefined ] -> "undefined
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
	default. |_ opts
		case
			=? _ ()
				"()"
			=? _ undefined
				"undefined"
			else
				key-vals = map own-enumerable-properties_ |key
					val:Str = show (get-property _ key) opts
					"{key}. {indent val}"
				"
					{type-of_}
						{key-vals.join "\n\t"}

repr.
	doc. "
		Shows it with the `repr` flag set.
		For debug printing, there is the helper function `console.dbg!`.
	|_
		show _
			repr.

\ TODO:MOVE
impl! show Str
	test. |
		\ TODO:SYNTAX [ repr. ]
		r =
			repr.
		[ "a" ] -> "a"
		[ "a" r ] -> "\"a\""
	|_ opts
		case
			flag? opts "repr"
				`'"' + _ + '"'` \"\"{_}\""
			else
				_

\ TODO: show-Bool.ms?
impl! show Bool
	test. |
		[ true ] -> "true"
		[ false ] -> "false"
	|case
		_
			"true"
		else
			"false"

set! ms "show" show

show
