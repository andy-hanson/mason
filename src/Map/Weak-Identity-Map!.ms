use
	..@.? Opt->?
	..control returning
	..js global new
	..methods <! empty empty!
	..Try oh-no!
	..Type.Impl-Type self-type
	..Type.Method impl!
	..Map ?get has-key? keys
	.Map-Type
	.Map! _ assoc! un-assoc!

Weak-Identity-Map! =
	doc. "
		Map! which can only hold have Objs as keys and stops holding them when they are garbage collected.
		Good for caches.
		It does not have the full functionality of a Map! because there is no way to iterate over the keys.
	global.WeakMap

<! (self-type Weak-Identity-Map!) Map-Type
impl! empty (self-type Weak-Identity-Map!) new

<! Weak-Identity-Map! Map!
impl! ?get Weak-Identity-Map! |_ key
	Opt->? (_.get key
impl! has-key? Weak-Identity-Map! |_ key
	_.has key
impl! keys Weak-Identity-Map! |
	oh-no! "Can't get keys of Weak-Identity-Map! because the garbage collector can freely change this."
impl! empty! Weak-Identity-Map! |
	oh-no! "
		Can't empty Weak-Identity-Map! for some reason.
		https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/clear"
impl! assoc! Weak-Identity-Map! |_ key val
	_.set key val
impl! un-assoc! Weak-Identity-Map! |_ key
	returning (?get _ key) |
		_.delete key


Weak-Identity-Map!
