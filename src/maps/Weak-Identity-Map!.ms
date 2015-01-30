use
	..@.? Opt->?
	..Comparable! <!
	..control returning
	..js global new
	.Map ?get has-key? keys
	.Map! _ assoc! un-assoc!
	..methods empty empty!
	..Try oh-no!
	..types.Method impl!
	..types.util self-type

Weak-Identity-Map! =
	doc. "TODO"
	global.WeakMap

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

impl! empty (self-type Weak-Identity-Map!) new

Weak-Identity-Map!
