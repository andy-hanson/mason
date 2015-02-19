use
	.Bool _ or
	.js reference=?
	.private.bootstrap ms Obj p+!
	.Type.Method
use~
	.Obj inspect=?

region Basics
	sub. Method
		doc. "Implementing this allows the use of the special syntax `a[b]`."
	p+! ms "sub" sub

region Comparison
	compare. Method
		doc. "
			A Num < 0 if a < b, > 0 if a > b, and = 0 if a = b.
			It could be implemented as:
				case
					<? a b
						-1
					>? a b
						1
					else
						0
			But instead, other comparison operators are defined in terms of this.
			`compare a b` should always be `* -1 (compare b a)`.

	=?. Method
		doc. "
			Whether two objects are considered equivalent.
			Generally, if two values are `=?`, then most functions called on them should return the same results.
			`=?` defaults to `inspect=?`.
			Values can be `=?` but not `inspect=?` if they are conceptually the same, but have different representations.
			For example, two Sets with the same values might internally have different ordering.

			Values of different types should generally not be =?.
			For example, [ 1 2 3 ] is not `=?` (=> Stream [ 1 2 3 ]), but it is `seq=?`.
			Unlike other comparison methods, `=?` should not make assertions about type.

		default. |:Bool a b
			or (reference=? a b) ~(inspect=? a b)

	<?. Method
		doc. "
			Whether `lesser` comes before `greater` in these values' ordering.
			Same as `not  (>=? lesser greater)`.
		default. |:Bool lesser greater
			<? (compare lesser greater) 0

	<=?. Method
		doc. "
			Same as `or (<? a b) ~(=? a b)`.
		default. |:Bool lesser greater
			<=? (compare lesser greater) 0
	>?. Method
		doc. "
			Whether `greater` comes after `lesser` in these values' ordering.
			Same as `not (<=? greater lesser)`.
		default. |:Bool greater lesser
			>? (compare greater lesser) 0
	>=?. Method
		doc. "
			Same as `or (>? a b) ~(=? a b)`.
		default. |:Bool greater lesser
			>=? (compare greater lesser) 0

region Unsorted
	\ TODO: Move these?
	freeze. Method
		doc. "
			Returns a compacted and immutable version of it.
			Does not have to return the same value, but often does.
		\ TODO: Lazy default?
		default. |_
			Obj.freeze _
	\ TODO: Lazy export?
	frozen?. |_
		Obj.isFrozen _

