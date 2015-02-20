use
	...control returning
	...js global new
	...Type.Impl-Type self-type
	...Type.Kind kind!
	...Type.Method impl!
	..@! empty!
	..@-Type empty
	..? Opt->?
	..Stream
	..Map ?get has-key? keys values
	.Map! _ assoc! un-assoc!
	.Map-Type
debug use
	...!
	...compare =?
	..Seq seq=?

Id-Map! =
	doc. "
		JavaScript's native Map type.
		Only considers exactly identical keys =?; this makes it the fastest Map.
	test. |
		\ TODO: Just use generic Map! test
		_ = empty Id-Map!
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

kind! (self-type Id-Map!) Map-Type
impl! empty (self-type Id-Map!) new

kind! Id-Map! Map!
impl! ?get Id-Map! |_ key
	Opt->? (_.get key)
impl! has-key? Id-Map! |_ key
	_.has key
impl! keys Id-Map! |_
	\ TODO: bind _ "keys"
	Stream |
		_.keys ()
impl! values Id-Map! |_
	\ TODO: bind _ "keys"
	Stream |
		_.values ()
impl! empty! Id-Map! |_
	_.clear ()
impl! assoc! Id-Map! |_ key val
	_.set key val
impl! un-assoc! Id-Map! |_ key
	returning (?get _ key) |
		_.delete key


Id-Map!

