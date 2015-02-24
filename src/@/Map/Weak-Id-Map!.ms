use
	...control returning
	...js global new
	...Try oh-no!
	...Type.Kind kind! self-kind!
	...Type.Method impl! self-impl!
	..@! empty!
	..@-Type empty
	..? Opt->?
	..Map ?get has-key? keys
	.Map-Type
	.Map! _ assoc! un-assoc!

Weak-Id-Map! =
	doc. "
		Map! which can only hold have Objs as keys and stops holding them when they are garbage collected.
		Good for caches.
		It does not have the full functionality of a Map! because there is no way to iterate over the keys.
	global.WeakMap

self-kind! Weak-Id-Map! Map-Type
self-impl! empty Weak-Id-Map! |
	new Weak-Id-Map!

kind! Weak-Id-Map! Map!
impl! ?get Weak-Id-Map! |_ key
	Opt->? (_.get key
impl! has-key? Weak-Id-Map! |_ key
	_.has key
impl! keys Weak-Id-Map! |
	oh-no! "Can't get keys of Weak-Id-Map! because the garbage collector can freely change this."
impl! empty! Weak-Id-Map! |
	oh-no! "
		Can't empty Weak-Id-Map! for some reason.
		https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/clear"
impl! assoc! Weak-Id-Map! |_ key val
	_.set key val
impl! un-assoc! Weak-Id-Map! |_ key
	returning (?get _ key) |
		_.delete key


Weak-Id-Map!
