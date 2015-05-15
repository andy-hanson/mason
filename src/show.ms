use
	.compare =?
	.Function spread!
	.js js+
	.private.bootstrap msDef
	.private.js-impl newSet
	.Object flag? p @p
	.String indent
	.Type.Method _ impl!
	.Type.Type => type-of
use~
	.@.@ -- empty? map

showing = newSet()

show = Method
	doc.
		"
			|:String _ opts
			Converts the value to a string for string interpolation.
			This is the method called when you do `\{...}`.
			For a more detailed String representation of data, use `inspect`.
	test. |
		# TODO: How to not include displayName
		a =
			~x. a
		[ a ] -> "
			Object
				x. <recursive>
				displayName. a
		# TODO:SYNTAX [ a repr. ]
		[ a (repr. true) ] -> "
			Object
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
				x:String = impl _ opts
				showing.delete _
				x
	default. |_ opts
		case
			=? _ ()
				"()"
			=? _ undefined
				"undefined"
			else
				# Don't show "prototype" because that is treated as an instance of itself and causes errors.
				props = -- @p_ [ "prototype" ]
				key-vals = => Array (map props |key
					val:String = show (p _ key) opts
					"{key}. {indent val}"
				"
					{type-of_}
						{key-vals.join "\n\t"}

msDef "show" show

repr.
	doc. "
		Shows it with the `repr` flag set.
		For debug printing, there is the helper function `console.dbg!`.
	|_
		# TODO:SYNTAX (repr.)
		show _ (repr. true)

spread! impl! show
	String ->
		test. |
			[ "a" ] -> "a"
			# TODO:SYNTAX [ "a" repr. ]
			[ "a" (repr. true) ] -> "\"a\""
		|_ opts
			case
				flag? opts "repr"
					js+ "\"" (js+ _ "\"")
				else
					_

	Number ->
		test. |
			[ 12 ] -> "12"
			[ -1.0 ] -> "-1"
		|_
			base = 10
			_.toString base

	Symbol ->
		test. |
			# TODO:ES6
			# [ (Symbol "name") ] -> "<Symbol name>"
			[ (Symbol "name") ] -> "<Symbol>"
		|
			# TODO:ES6 _.name
			"<Symbol>"

	Boolean ->
		test. |
			[ true ] -> "true"
			[ false ] -> "false"
		|case
			_
				"true"
			else
				"false"

	Function ->
		test. |
			# TODO:DISPLAYNAME
			a =
				doc. "a"
				|
					1
			[ a ] -> "a"
			[ Object ] -> "Object"
			[ (Function "" "") ] -> "<anonymous Function>"
		|:String fun
			case fun.displayName
				:String
					_
				else
					case fun.name
						# Every Function has `name` property, but for anonymous Functions it is empty.
						empty?_
							"<anonymous Function>"
						else
							_

show
