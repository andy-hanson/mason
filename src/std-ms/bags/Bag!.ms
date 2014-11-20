use
	.? -> ?none ?some
	..assert -> !
	.Bag -> Bag-Type empty empty? seq=?
	..Comparable -> =?
	.Deque!
	..types.Interface -> implementor!
	..types.Method
	..types.util -> self-type

Bag! = Interface
	doc. "TODO"

\ TODO: Unordered
+!. Method
	doc. |_ added:Bag
		"TODO"
	default. |_ added:Bag
		+>! _ added
<+!. Method
	doc. |_ added:Bag
		"TODO"
+>!. Method
	doc. |_ added:Bag
		"TODO"
?<pop!. Method
	doc. |:? _
		"TODO"
?pop>!. Method
	doc. |:? _
		"TODO"
clear!. Method
	doc. |_
		"TODO"

\ TODO: Pattern for implementors of an interface being tested
bag!-test. |type:Bag-Type
	_ = empty type
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

	\ TODO: Stress test

implementor! Bag! Bag

implementor! (self-type Bag!) Bag-Type
	empty -> |
		empty Deque!

Bag!

