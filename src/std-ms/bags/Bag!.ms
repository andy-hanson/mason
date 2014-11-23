use
	.? -> ?none ?some
	.Array
	.Array!
	..assert -> !
	.Bag -> empty? seq=?
	.Bag-Type -> empty
	..Comparable -> =?
	.Deque!
	..types.Interface -> implementor!
	..types.Method
	..types.util -> self-type

Bag! = Interface
	doc. "TODO"
	implementor-test. |type
		\ KLUDGE because Array and Array! are the same thing
		_ = case type
			=? _ Array
				empty Array!
			else
				empty type
		+>! _ [ 1 2 ]
		<+! _ [ -2 -1 ]
		! seq=? _ [ -2 -1 1 2 ]
		! =? ?pop>!_ (?some 2)
		! =? ?<pop!_ (?some -2)
		! =? ?pop>!_ (?some 1)
		! =? ?<pop!_ (?some -1)
		! =? ?pop>!_ ?none
		! empty? _
		+>! _ [ 1 2 3 ]
		clear! _
		! empty? _

<+!. Method
	doc. |_ added:Bag
		"TODO"
+>!. Method
	doc. |_ added:Bag
		"TODO"
\ TODO: Unordered
+!. Method
	doc. |_ added:Bag
		"TODO"
	default. +>!
?<pop!. Method
	doc. |:? _
		"TODO"
?pop>!. Method
	doc. |:? _
		"TODO"
clear!. Method
	doc. |_
		"TODO"


implementor! Bag! Bag

implementor! (self-type Bag!) Bag-Type
	empty -> |
		empty Deque!

Bag!

