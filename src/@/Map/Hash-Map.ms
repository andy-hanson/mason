use
	...Function thunk
	...methods freeze
	...Type.Alias-Type
	...Type.Kind self-kind!
	...Type.Method self-impl!
	..@-Type empty
	.Hash-Map!
	.Map-Type

Hash-Map. Alias-Type
	alias-of. Hash-Map!

self-kind! Hash-Map Map-Type
self-impl! empty Hash-Map (thunk (freeze (empty Hash-Map!
