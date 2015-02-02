use
	.Map!
	..methods <!
	..Type.Kind
debug use
	..!
	..@ each!
	..@.Seq sorted?
	..Map keys
	.Map! assoc!
	..methods empty

Sorted-Map! = Kind
	doc. "
		Map! whose `keys` are in sorted order.
		This kind of Map! depends on an efficient `compare` between its keys.
	implementor-test. |type
		_ = empty type
		each! [ 1 3 5 4 2 ] |key
			assoc! _ key key
		! sorted? keys_

<! Sorted-Map! Map!

Sorted-Map!
