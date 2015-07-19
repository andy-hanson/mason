use
	...control returning
	...Type.Kind kind! self-kind!
	..@ count empty!
	..@-Type empty
	..? Opt->?
	..Seq.Stream
	.Map _ assoc! ?get has-key? keys un-assoc! values
	.Map-Type
use-debug
	...compare =?
	..Seq.Seq seq=?

Id-Map.
	doc. "
		JavaScript's native Map type.
		Only considers exactly identical keys =?; this makes it the fastest Map.
	test. !|
		# TODO: Just use generic Map test
		_ = empty Id-Map
		assoc! _ 1 2
		assert! =? _[1] 2
		key-1 =
			a. 1
		assoc! _ key-1 3
		assert! =? _[key-1] 3
		key-2 =
			a. 1
		assoc! _ key-2 4
		# The two keys have different identity, so they map to different values.
		assert! =? _[key-1] 3
		assert! =? _[key-2] 4

		assert! seq=? keys_ [ 1 key-1 key-2 ]
		assert! seq=? values_ [ 2 3 4 ]

	global.Map

self-kind! Id-Map Map-Type
	empty -> |
		new Id-Map

kind! Id-Map Map
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
