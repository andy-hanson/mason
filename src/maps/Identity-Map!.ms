use
	..assert -> !
	..@.? -> Opt->?
	..@.Seq -> seq=?
	..@.Stream
	..Comparable -> =?
	..Comparable! -> <!
	..control -> returning
	..js -> global new
	.Map -> ?get has-key? keys values
	.Map! -> assoc! un-assoc!
	..methods -> empty empty!
	..types.Method -> impl!
	..types.util -> self-type

Identity-Map! =
	doc. "TODO"
	test. |
		\ TODO: Just use generic Map! test
		_ = empty Identity-Map!
		assoc! _ 1 2
		! =? _[1] 2
		key-1 =
			a. 1
		assoc! _ key-1 3
		! =? _[key-1] 3
		key-2 =
			a. 1
		assoc! _ key-2 4
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
impl! assoc! Identity-Map! |_ key val
	_.set key val
impl! un-assoc! Identity-Map! |_ key
	returning (?get _ key) |
		_.delete key

impl! empty (self-type Identity-Map!) new

Identity-Map!

