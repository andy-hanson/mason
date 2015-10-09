import
	...Type.Method self-impl!
	...Type.Kind _ kind!
	..@-Type empty
	.Map
import~
	.Splay-Tree

Sorted-Map. new Kind
	| Map whose `keys` are in sorted order.
	| This kind of Map depends on an efficient `compare` between its keys.
	name.

kind! Sorted-Map Map

self-impl! empty Sorted-Map |
	empty Splay-Tree
