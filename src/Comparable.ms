use
	.Bool -> or
	.js -> identical?
	.Object -> inspect=?
	.types.Interface
	.types.Method

compare. Method
	doc. "A Num < 0 if a < b, > 0 if a > b, and = 0 if a = b."

=?. Method
	doc. "TODO"
	default. |:Bool a b
		or (identical? a b) ~(inspect=? a b)
<?. Method
	doc. "TODO"
	default. |:Bool a b
		<? (compare a b) 0
<=?. Method
	doc. "TODO"
	default. |:Bool a b
		<=? (compare a b) 0
>?. Method
	doc. "TODO"
	default. |:Bool a b
		>? (compare a b) 0
>=?. Method
	doc. "TODO"
	default. |:Bool a b
		>=? (compare a b) 0

Comparable. Interface
	doc. "TODO"
	methods.
		. =?
		. <?
		. <=?
		. >?
		. >=?
