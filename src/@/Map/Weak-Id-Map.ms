use
	...control returning
	...Type.Kind kind! self-kind!
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
	empty -> |
		new Weak-Id-Map

kind! Weak-Id-Map Map
	?get -> |_ key
		Opt->? (_.get key
	has-key? -> |_ key
		_.has key
	assoc! -> !|_ key val
		_.set key val
	un-assoc! -> |_ key
		returning (?get _ key) !|
			_.delete key
	# TODO: unsupported Function?
	keys -> !|
		throw! "Weak-Id-Map does not support `keys`."
	empty! -> !|
		throw! "Weak-Id-Map does not support `empty!`."
