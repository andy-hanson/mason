use
	..!
	..@ -> each!
	..@.Seq -> sorted?
	..Comparable! -> <!
	.Map -> keys
	.Map! -> assoc!
	..methods -> empty
	..types.Interface

Sorted-Map! = Interface
	doc. "TODO"
	implementor-test. |type
		_ = empty type
		each! [ 1 3 5 4 2 ] |key
			assoc! _ key key
		! sorted? keys_

<! Sorted-Map! Map!

Sorted-Map!
