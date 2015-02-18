use
	...methods <!
	...Type.Impl-Type self-type
	...Type.Kind
	..@-Type empty
	.Map!
	.Map-Type
use~
	.Splay-Tree!
debug use
	...!
	...@ each!
	..Seq sorted?
	..Map keys
	.Map! assoc!

Sorted-Map! = Kind
	doc. "
		Map! whose `keys` are in sorted order.
		This kind of Map! depends on an efficient `compare` between its keys.
	implementor-test. |type
		_ = empty type
		each! [ 1 3 5 4 2 ] |key
			assoc! _ key key
		! sorted? keys_

<! (self-type Sorted-Map!) Map-Type
	empty -> |
		empty Splay-Tree!

<! Sorted-Map! Map!

Sorted-Map!
