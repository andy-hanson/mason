use
	.Bool -> false true
	.Comparable -> =?
	.Fun
	.js -> js+ js-sub
	.js-impl -> new-Set
	.methods -> type-of
	.Object -> flag? get-property own-enumerable-properties
	.Str -> indent
	.Symbol
	.types.Method -> impl!
use~
	.@ -> map

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
		[ () ] -> "()"
		[ undefined ] -> "undefined"
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
				js+ "\"" (js+ _ "\"")
			else
				_

\ TODO: show-Symbol.ms
impl! show Symbol
	test. |
		\ TODO:ES6
		\ [ (Symbol "name") ] -> "<Symbol name>"
		[ (Symbol "name") ] -> "<Symbol>"
	|
		\ TODO:ES6 _.name
		"<Symbol>"

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

\ See private.boot-order for when show is attached to _ms.

show
