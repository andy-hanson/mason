use
	.bags.Array
	.bags.Bag -> empty? map
	.basic-methods -> type-of
	.Bool
	.Fun -> identity
	.js -> identical?
	.math.Num
	.Object -> ?get-property add-property! own-enumerable-properties
	.Str -> indent
	.Symbol
	.types.Interface
	.types.Method -> impl!
	.types.Record-Type

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
			\ TODO:ES6 _.name
			"<Symbol>"
		:Object
			key-vals = map own-enumerable-properties_ |key
				\ TODO: Recursive checks: already-inspected set
				val:Str = inspect `_[key]`
				"{key}. {indent val}"
			"
				{type-of_}:
					{key-vals.join "\n\t"}

		else
			`throw new Error("Impossible value: "+_)`
			()

\ This is what is used by quote interpolation
show = Method
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
\TODO: add-property! `_ms` "str" show
`_ms.show = show`

show
