use
	.assert -> ! !call
	.bags.Array -> ->Array
	.bags.Bag -> map
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

Str =
	doc. "TODO"
	global.String

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

Str
