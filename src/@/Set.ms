use
	..@ _ all? count
	..Bool and
	..methods => =? <! contains?
	..Type type-of
	..Type.Kind
	..Type.Method impl!
use~
	.Hash-Set!
debug use~
	..Bool false true
	..methods -

Set = Kind
	doc. "@ without repeat values."

<! Set @

impl! =? Set
	doc. "Two Sets are =? if they have the same type and contain the same values."
	test. |
		\ TODO: => Set
		a = => Hash-Set! [ 1 2 ]
		b = => Hash-Set! [ 1 2 ]
		[ a b ] -> true
		[ a [ - b [ 1 ] ] ] -> false
	|a b
		\ TODO: Variadic `and`
		and (=? (type-of a) (type-of b)) ~
			and (=? (count a) (count b)) ~
				all? a contains?[b]

set=?.
	doc. "Whether two @s have the same values, regardless of order or count."
	test. |
		[ [ 1 2 3 ] [ 3 2 1 ] ] -> true
		[ [ 1 ] [ 1 1 1 ] ] -> true
		[ [ 1 2 ] [ 1 2 3 ] ] -> false
	|a:@ b:@
		\ TODO: => Set a ... => Set b
		=? (=> Hash-Set! a) (=> Hash-Set! b)

Set
