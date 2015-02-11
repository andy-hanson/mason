use
	..Fun thunk
	..private.js-impl i-make-map
	..methods <! empty freeze
	..Obj! p+!
	..private.bootstrap ms
	..Type.Alias-Type
	..Type.Impl-Type self-type
	..Type.Method impl!
	.Hash-Map!
	.Map! assoc!
	.Map-Type

Hash-Map = Alias-Type
	alias-of. Hash-Map!

<! (self-type Hash-Map) Map-Type
impl! empty (self-type Hash-Map) (thunk (freeze (empty Hash-Map!

\ TODO: MOVE?
p+! ms "map" |...args
	hm = empty Hash-Map!
	i-make-map hm assoc! args
	freeze hm

Hash-Map
