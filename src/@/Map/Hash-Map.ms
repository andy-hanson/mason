use
	...Fun thunk
	...private.js-impl i-make-map
	...methods freeze
	...Obj! p+!
	...private.bootstrap ms
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

\ TODO: MOVE?
p+! ms "map" |...args
	hm = empty Hash-Map!
	i-make-map hm assoc! args
	freeze hm

Hash-Map
