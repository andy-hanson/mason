use
	.?
	.Array
	.Array!
	..assert -> !
	.Bag -> empty?
	.Bag-Type -> empty
	.Bag!
	..basic-methods -> =>
	..Comparable -> =?
	..Comparable! -> <!
	.Deque!
	.Seq -> seq=?
	..types.Interface
	..types.Method
	..types.util -> self-type

Seq! = Interface
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
		! =? ?pop>!_ (=> ? [ 2 ])
		! =? ?<pop!_ (=> ? [ -2 ])
		! =? ?pop>!_ (=> ? [ 1 ])
		! =? ?<pop!_ (=> ? [ -1 ])
		! =? ?pop>!_ (empty ?)
		! empty? _
		+>! _ [ 1 2 3 ]

<! Seq! Bag!
<! Seq! Seq

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

<! (self-type Seq!) Bag-Type
	empty -> |
		empty Deque!

Seq!
