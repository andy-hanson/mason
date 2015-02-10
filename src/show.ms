use
	.Bool _ true
	.js js+
	.private.bootstrap p+! ms
	.private.js-impl new-Set
	.methods =? empty?
	.Obj flag? p ?p @p
	.Str _ indent
	.Symbol
	.Type => type-of
	.Type.Method _ impl!
use~
	.@ -- map
	.@.? get-or
	.@.Array
	.Fun
debug use
	.Bool false
	.Obj

showing = new-Set()

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
		[ a ] -> "
			Obj
				x. <recursive>
				displayName. a
		\ TODO:SYNTAX [ a repr. ]
		[ a (repr. true) ] -> "
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
				\ Don't show "prototype" because that is treated as an instance of itself and causes errors.
				props = -- @p_ [ "prototype" ]
				key-vals = => Array (map props |key
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
		\ TODO:SYNTAX (repr.)
		show _ (repr. true)

\ TODO:MOVE
impl! show Str
	test. |
		[ "a" ] -> "a"
		\ TODO:SYNTAX [ "a" repr. ]
		[ "a" (repr. true) ] -> "\"a\""
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
		\ TODO: Fix displayName!
		\a = |
		\	1
		\ [ a ] -> "a"
		[ Obj ] -> "Obj"
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

p+! ms "show" show

show
