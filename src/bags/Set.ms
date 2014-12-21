use
	.Bag -> all? count
	..Bool -> and false true
	..Comparable -> =?
	..Comparable! -> <!
	.Hash-Set!
	..methods -> - => contains? type-of
	..types.Interface
	..types.Method -> impl!

Set = Interface
	doc. "TODO"

<! Set Bag

impl! =? Set
	doc. "TODO"
	test. |
		a = => Hash-Set! [ 1 2 ]
		b = => Hash-Set! [ 1 2 ]
		[ a b ] -> true
		[ a [ - b [ 1 ] ] ] -> false
	|set0 set1
		\ TODO: Variadic `and`
		and (=? (type-of set0) (type-of set1)) ~
			and (=? (count set0) (count set1)) ~
				all? set0 contains?[set1]

Set
