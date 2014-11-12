use
	.Bool -> and false nor true
	.js -> identical?
	.Object -> inspect=?
	.types.Interface
	.types.Method
	.types.Type -> subsumes?

compare. Method
	doc. "A Num < 0 if a < b, > 0 if a > b, and = 0 if a = b."

=?. Method
	doc. "TODO"
	default. inspect=?
<?. Method
	doc. "TODO"
	default. |a b
		<? (compare a b) 0
<=?. Method
	doc. "TODO"
	default. |a b
		<=? (compare a b) 0
>?. Method
	doc. "TODO"
	default. |a b
		>? (compare a b) 0
>=?. Method
	doc. "TODO"
	default. |a b
		>=? (compare a b) 0

Comparable. Interface
	doc. "TODO"
	methods.
		. =?
		. <?
		. <=?
		. >?
		. >=?
