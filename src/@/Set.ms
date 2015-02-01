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
	doc. "TODO"

<! Set @

impl! =? Set
	doc. "TODO"
	test. |
		\ TODO: => Set
		a = => Hash-Set! [ 1 2 ]
		b = => Hash-Set! [ 1 2 ]
		[ a b ] -> true
		[ a [ - b [ 1 ] ] ] -> false
	|set0 set1
		\ TODO: Variadic `and`
		and (=? (type-of set0) (type-of set1)) ~
			and (=? (count set0) (count set1)) ~
				all? set0 contains?[set1]

set=?.
	doc. "TODO"
	test. |
		[ [ 1 2 3 ] [ 3 2 1 ] ] -> true
		[ [ 1 2 ] [ 1 2 3 ] ] -> false
	|a:@ b:@
		\ TODO: => Set a ... => Set b
		=? (=> Hash-Set! a) (=> Hash-Set! b)

Set
