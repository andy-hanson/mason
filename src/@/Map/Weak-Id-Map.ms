use
	...control returning
	...Function noop
	...Type.Kind kind! self-kind!
	...Type.Method impl! self-impl!
	..@ empty!
	..@-Type empty
	..? Opt->?
	.Map _ assoc! ?get has-key? keys un-assoc!
	.Map-Type

Weak-Id-Map.
	doc. "
		Map which can only hold have Objects as keys and stops holding them when they are garbage collected.
		Good for caches.
		It does not have the full functionality of a Map because there is no way to iterate over the keys.
	global.WeakMap

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
	returning (?get this key) !|
		.delete key

# TODO: unsupported! Function?
impl! keys Weak-Id-Map .!|
	noop this
	throw! "Weak-Id-Map does not support `keys`."

impl! empty! Weak-Id-Map .!|
	noop this
	throw! "Weak-Id-Map does not support `empty!`."
