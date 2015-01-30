use
	..Comparable! <!
	.Map!
	..types.Interface
debug use
	..!
	..@ each!
	..@.Seq sorted?
	.Map keys
	.Map! assoc!
	..methods empty

Sorted-Map! = Interface
	doc. "TODO"
	implementor-test. |type
		_ = empty type
		each! [ 1 3 5 4 2 ] |key
			assoc! _ key key
		! sorted? keys_

<! Sorted-Map! Map!

Sorted-Map!
