import
	global WeakMap
	...methods del-sub! set-sub!
	...Type.Kind kind! self-kind!
	..@ empty!
	..@-Type empty
	..? Opt->?
	.Map _ ?get has-key? @keys
	.Map-Type

Weak-Id-Map.
	| Map which can only hold have Objects as keys and stops holding them when they are garbage collected.
	| Good for caches.
	| It does not have the full functionality of a Map because there is no way to iterate over the keys.
	WeakMap

self-kind! Weak-Id-Map Map-Type
	empty -> |
		new Weak-Id-Map

kind! Weak-Id-Map Map
	?get -> .|key
		Opt->? (.get key)

	has-key? -> .|key
		.has key

	set-sub! -> .!|key val
		.set key val

	del-sub! -> .|key
		with ?get this key
			.delete key

	todo  unsupported! Function?
	@keys -> !|
		throw! "Weak-Id-Map does not support `keys`."

	empty! -> !|
		throw! "Weak-Id-Map does not support `empty!`."
