use
	..assert -> !
	..bags.? -> Opt->?
	..bags.Seq -> seq=?
	..bags.Stream
	..Comparable -> =?
	..Comparable! -> <!
	..js -> global new
	.Map -> ?get has-key? keys values
	.Map! -> empty! delete! set!
	..types.Method -> impl!

Identity-Map! =
	doc. "TODO"
	test. |
		_ = new Identity-Map!
		set! _ 1 2
		! =? _[1] 2
		key-1 =
			a. 1
		set! _ key-1 3
		! =? _[key-1] 3
		key-2 =
			a. 1
		set! _ key-2 4
		\ The two keys have different identity, so they map to different values.
		! =? _[key-1] 3
		! =? _[key-2] 4

		! seq=? keys_ [ 1 key-1 key-2 ]
		! seq=? values_ [ 2 3 4 ]

	global.Map

<! Identity-Map! Map!
impl! ?get Identity-Map! |_ key
	Opt->? (_.get key)
impl! has-key? Identity-Map! |_ key
	_.has key
impl! keys Identity-Map! |_
	Stream
		make-iterator. |
			_.keys ()
impl! values Identity-Map! |_
	Stream
		make-iterator. |
			_.values ()
impl! empty! Identity-Map! |_
	_.clear ()
impl! delete! Identity-Map! |_ key
	_.delete key
impl! set! Identity-Map! |_ key val
	_.set key val

Identity-Map!
