use
	...Type.Impl-Type self-type
	...Type.Kind _ kind!
	..@-Type empty
	.Map!
	.Map-Type
use~
	.Splay-Tree!
debug use
	...!
	...@ each!
	...compare sorted?
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

kind! (self-type Sorted-Map!) Map-Type
	empty -> |
		empty Splay-Tree!

kind! Sorted-Map! Map!

Sorted-Map!
