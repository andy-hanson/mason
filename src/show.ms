use
	.Function spread!
	.js id=? js+
	.private.bootstrap msDef
	.private.js-impl newSet
	.Object flag? p @p
	.String indent
	.Type.Method _ impl!
	.Type.Type => type-of
use~
	.@.@ -- empty? map

showing = newSet()

show. Method
	doc.
		"
			Converts the value to a string for string interpolation.
			This is the method called when you do `\{...}`.
			For a more detailed String representation of data, use `inspect`.
	test. |
		# TODO:DISPLAYNAME How to not include name
		a =
			~x. a
		[ a ] -> "
			Object
				x. <recursive>
				name. a
		# TODO:SYNTAX [ a repr. ]
		[ a (repr. true) ] -> "
			Object
				x. <recursive>
				name. "a"
		[ null ] -> "null"
		[ undefined ] -> "undefined"
	args. [ "_" "opts"
	returns. String
	allow-null?. true
	wrap. |impl _ opts
		case
			showing.has _
				"<recursive>"
			else
				showing.add _
				x:String = impl.call _ opts
				showing.delete _
				x
	default. .|opts
		case
			id=? this null
				"null"
			id=? this undefined
				"undefined"
			else
				# Don't show "prototype" because that is treated as an instance of itself and causes errors.
				props = -- (@p this) [ "prototype" ]
				key-vals = => Array (map props |key
					val:String = show (p this key) opts
					"{key}. {indent val}"
				"
					{type-of this}
						{key-vals.join "\n\t"}

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
		.|opts
			case
				flag? opts "repr"
					js+ "\"" (js+ this "\"")
				else
					this

	Number ->
		test. |
			[ 12 ] -> "12"
			[ -1.0 ] -> "-1"
		.|
			base = 10
			.toString base

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
		.|
			case
				this
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
		.|
			case .name
				# Every Function has `name` property, but for anonymous Functions it is empty.
				empty?_
					"<anonymous Function>"
				else
					_

msDef "show" show
msDef "repr" repr
