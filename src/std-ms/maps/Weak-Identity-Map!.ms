use
	..bags.? -> Opt->?
	..js -> global
	.Map -> ?get
	.Map! -> clear! delete! set!
	..types.Interface -> implementor!
	..types.Method -> impl!

Weak-Identity-Map! =
	doc. "TODO"
	global.WeakMap

\ TODO: has-key?, keys

\ TODO: Same for Map!
\ TODO: implementor! sugar for many impl!s
impl! clear! Weak-Identity-Map! |_
	_.clear ()
impl! ?get Weak-Identity-Map! |_ key
	Opt->? (_.get key)
impl! delete! Weak-Identity-Map! |_ key
	_.delete key
impl! set! Weak-Identity-Map! |_ key val
	_.set key val

implementor! Weak-Identity-Map! Map!

Weak-Identity-Map!
