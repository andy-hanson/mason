use
	..Fun thunk
	..js-impl i-make-map
	..methods empty freeze
	..Obj! p+!
	..private.bootstrap ms
	..types.Alias-Type
	..types.Method impl!
	..types.util self-type
	.Hash-Map!
	.Map! assoc!

Hash-Map = Alias-Type
	alias-of. Hash-Map!

impl! empty (self-type Hash-Map) (thunk (freeze (empty Hash-Map!

p+! ms "map" |...args
	hm = empty Hash-Map!
	i-make-map hm assoc! args
	freeze hm

Hash-Map
