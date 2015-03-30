use
	...Fun thunk
	...private.js-impl makeMap
	...methods freeze
	...private.bootstrap msDef
	...Type.Alias-Type
	...Type.Kind self-kind!
	...Type.Method self-impl!
	..@-Type empty
	.Hash-Map!
	.Map! assoc!
	.Map-Type

Hash-Map = Alias-Type
	alias-of. Hash-Map!

self-kind! Hash-Map Map-Type
self-impl! empty Hash-Map (thunk (freeze (empty Hash-Map!

# TODO: MOVE?
msDef "map" |...args
	hm = empty Hash-Map!
	makeMap hm assoc! args
	freeze hm

Hash-Map
