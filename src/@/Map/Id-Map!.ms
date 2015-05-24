use
	...control returning
	...js new
	...Type.Kind kind! self-kind!
	..@ count
	..@! empty!
	..@-Type empty
	..? Opt->?
	..Seq.Stream
	.Map ?get has-key? keys values
	.Map! _ assoc! un-assoc!
	.Map-Type
use-debug
	...!
	...compare =?
	..Seq.Seq seq=?

Id-Map! =
	doc. "
		JavaScript's native Map type.
		Only considers exactly identical keys =?; this makes it the fastest Map.
	test. !|
		# TODO: Just use generic Map! test
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
		# The two keys have different identity, so they map to different values.
		! =? _[key-1] 3
		! =? _[key-2] 4

		! seq=? keys_ [ 1 key-1 key-2 ]
		! seq=? values_ [ 2 3 4 ]

	global.Map

self-kind! Id-Map! Map-Type
	empty -> |
		new Id-Map!

kind! Id-Map! Map!
	count -> |_
		_.size
	?get -> |_ key
		Opt->? (_.get key
	has-key? -> |_ key
		_.has key
	keys -> |_
		Stream |
			_.keys()
	values -> |_
		Stream |
			_.values()
	empty! -> !|_
		_.clear()
	assoc! -> !|_ key val
		_.set key val
	un-assoc! -> |_ key
		returning (?get _ key) !|
			_.delete key

Id-Map!
