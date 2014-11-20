doc. "TODO"

use
	.assert -> ! !call
	.bags.Array -> ->Array
	.bags.Bag -> map
	.basic-methods -> type-of
	.Bool
	.Fun -> identity
	.js -> global identical?
	.math.Num
	.Object -> add-property! get-property has-property? own-property-names
	.pred-types -> Null Union
	.Symbol
	.types.Interface
	.types.Method -> impl! impl-override!
	.types.Pred-Type
	.types.Record-Type
	.types.Type -> !subsumes
	.types.util -> self-type

Str = global.String

indent.
	doc. "
		Adds a `\\t` to all `\\n` in `str`.
		Does *not* do anything to the first line.

	test. |
		s = "
			a
			b

		s-indented = "
			a
				b

		!call indent
			[ s ] -> s-indented
			[ "a" ] -> "a"

	|str:Str
		"{str.replace `/\n/g` "\n\t"}"

\ TODO: Do more to prevent infinite recursion
inspect. Method
	doc. |:Str _
		"TODO"
	default. |case
		identical? _ `null`
			"null"
		identical? _ `undefined`
			"undefined"
		:Array \ TODO: impl! elsewhere
			\ TODO: use `map` method
			parts = _.map show
			parts.join ", "
		:Bool
			_.toString ()
		:Num
			base = 10
			_.toString base
		:Str
			"\"{_}\""
		:Symbol
			"<Symbol>"
		:Object
			key-vals = (Object.keys _).map |key
				\ TODO: Recursive ->Str needs checks
				val:Str = show `_[key]`
				"{key}. {indent val}"

			"
				{type-of_.displayName}:
					{key-vals.join "\n\t"}

		else
			`throw new Error("Impossible value: "+_)`
			()

\ This is what is used by quote interpolation
show. Method
	doc. |:Str _
		"
			Converts the value to a string for string interpolation.
			This is the method called when you do `\{...}`.
			For a more detailed Str representation of data, use `inspect`.
			`->Str` defaults to `inspect`.
	default. inspect

\ TODO: These are all Type_s. impl! on Type once.
\ TODO: Use 'nom' method here
get-nom = |_
	_.displayName

\ TODO: Move!!!

impl! show Method get-nom
impl! show Interface get-nom
impl! show Record-Type get-nom
impl! show Str identity

add-property! `_ms` "str" show

Str

