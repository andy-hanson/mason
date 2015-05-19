use
	...Type.Kind _ kind! self-kind!
	..@-Type empty
	.Map!
	.Map-Type
use~
	.Splay-Tree!
use-debug
	...!
	...compare sorted?
	.Map keys
	.Map! assoc!

Sorted-Map! = Kind
	doc. "
		Map! whose `keys` are in sorted order.
		This kind of Map! depends on an efficient `compare` between its keys.
	implementor-test. |type
		_ = empty type
		for! key in [ 1 3 5 4 2 ]
			assoc! _ key key
		! sorted? keys_

self-kind! Sorted-Map! Map-Type
	empty -> |
		empty Splay-Tree!

kind! Sorted-Map! Map!

Sorted-Map!
