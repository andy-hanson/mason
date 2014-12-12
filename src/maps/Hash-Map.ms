use
	..Fun -> thunk
	.Hash-Map!
	..js-impl -> i-make-map
	.Map! -> set!
	..methods -> empty freeze
	..Object! -> add-property!
	..private.bootstrap -> ms
	..types.Alias-Type
	..types.Method -> impl!
	..types.util -> self-type

Hash-Map = Alias-Type
	alias-of. Hash-Map!

impl! empty (self-type Hash-Map) (thunk (freeze (empty Hash-Map!

add-property! ms "map"  |...args
	hm = empty Hash-Map!
	i-make-map hm set! args
	freeze hm

Hash-Map
