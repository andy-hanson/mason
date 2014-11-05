doc. "TODO"

use
	.Array
	.basic-methods -> type-of
	.Bool
	.Fun -> identity
	.Interface
	.js -> global identical?
	.Method -> impl! impl-override!
	.Num
	.Object -> add-property! get-property has-property? own-property-names
	.Pred-Type
	.pred-types -> Null Union
	.Record-Type
	.Symbol
	.Type

Str = global.String

indent.
	doc. "TODO"
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
			parts = _.map |x
				->Str x
			parts.join ", "
		:Bool
			_.toString ()
		:Num
			base = 10
			_.toString base
		:Str
			"\"{_}\""
		:Symbol
			_.name
		:Object
			key-vals = (Object.keys _).map |key
				val = (get-property _ key).toString `undefined`
				\ TODO: Recursive ->Str needs checks
				\val = ->Str (get-property _ key)
				"{key}. {indent val}"

			"
				{type-of _}
					{key-vals.join "\n\t"}

		else
			`throw new Error("Impossible value: "+_)`
			()

\ This is what is used by quote interpolation
->Str. Method
	doc. "TODO"
	impl-symbol. `_ms.symStr`
	default. inspect

\ TODO: These are all Type_s. impl! on Type once.
\ TODO: Use 'nom' method here
get-nom = |_
	_.displayName

\ TODO: Move!!!
impl! ->Str Method get-nom
impl! ->Str Interface get-nom
impl! ->Str Record-Type get-nom
impl! ->Str Fun |_
	case
		`_.displayName !== undefined` \has-property? _ "nom"
			_.displayName
		`_.name !== ""`
			_.name
		else
			_.toString ()
impl! ->Str Pred-Type get-nom

impl! ->Str Str identity

add-property! `_ms` "str" ->Str

Str

