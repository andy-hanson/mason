import
	...Type.Method self-impl!
	...Type.Kind _ kind!
	..@-Type empty
	.Map
import~
	.Splay-Tree
import-debug
	...compare sorted?
	.Map assoc! keys

Sorted-Map. new Kind
	| Map whose `keys` are in sorted order.
	| This kind of Map depends on an efficient `compare` between its keys.
	name.
	implementor-test. !|type
		_ = empty type
		for! key in [1 3 5 4 2]
			assoc! _ key key
		assert! sorted? keys_

kind! Sorted-Map Map

self-impl! empty Sorted-Map |
	empty Splay-Tree
