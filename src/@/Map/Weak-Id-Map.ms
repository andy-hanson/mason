use
	global WeakMap
	...Type.Kind kind! self-kind!
	...Type.Method impl! self-impl!
	..@ empty!
	..@-Type empty
	..? Opt->?
	.Map _ assoc! ?get has-key? keys un-assoc!
	.Map-Type

Weak-Id-Map.
	| Map which can only hold have Objects as keys and stops holding them when they are garbage collected.
	| Good for caches.
	| It does not have the full functionality of a Map because there is no way to iterate over the keys.
	WeakMap

self-kind! Weak-Id-Map Map-Type
self-impl! empty Weak-Id-Map |
	new Weak-Id-Map

kind! Weak-Id-Map Map
impl! ?get Weak-Id-Map .|key
	Opt->? (.get key)
impl! has-key? Weak-Id-Map .|key
	.has key
impl! assoc! Weak-Id-Map .!|key val
	.set key val
impl! un-assoc! Weak-Id-Map .|key
	with ?get this key
		.delete key

todo  unsupported! Function?
impl! keys Weak-Id-Map .!|
	ignore this
	throw! "Weak-Id-Map does not support `keys`."

impl! empty! Weak-Id-Map .!|
	ignore this
	throw! "Weak-Id-Map does not support `empty!`."
