use
	.Bool -> false true
	.Comparable -> =?
	.js -> js+
	.js-impl -> new-Set
	.methods -> empty?
	.Obj -> flag? p ?p @p
	.Str -> indent
	.Symbol
	.types.Method -> impl!
	.types.util -> type-of
use~
	.@ -> map
	.@.? -> get-or
	.Fun

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
			~x. a
		\ TODO:SYNTAX [ repr. ]
		r =
			repr.
		[ a ] -> "
			Obj
				x. <recursive>
				displayName. a
		[ a r ] -> "
			Obj
				x. <recursive>
				displayName. "a"
		[ () ] -> "()"
		[ undefined ] -> "undefined"
	wrap. |impl _ opts
		case
			showing.has _
				"<recursive>"
			else
				showing.add _
				x:Str = impl _ opts
				showing.delete _
				x
	default. |_ opts
		case
			=? _ ()
				"()"
			=? _ undefined
				"undefined"
			else
				key-vals = map @p_ |key
					val:Str = show (p _ key) opts
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

impl! show Fun
	test. |
		a = |
			1
		[ a ] -> "a"
		[ Obj ] -> "Object"
		[ (Fun "" "") ] -> "<anonymous Fun>"
	|:Str _
		get-or (?p _ "displayName") ~
			\ Every function has name property - empty string means anonymous function.
			name = p _ "name"
			case name
				empty?_
					"<anonymous Fun>"
				else
					_

\ See private.boot-order for when show is attached to _ms.

show
