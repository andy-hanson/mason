use
	...control returning
	...Type.Kind kind! self-kind!
	...Type.Method impl! self-impl!
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
self-impl! empty Id-Map |
	new Id-Map

kind! Id-Map Map

impl! count Id-Map .|
	.size

impl! ?get Id-Map .|key
	Opt->? (.get key)

impl! has-key? Id-Map .|key
	.has key

impl! keys Id-Map .|
	Stream |
		.keys()

impl! values Id-Map .|
	Stream |
		.values()

impl! empty! Id-Map .!|
	.clear()

impl! assoc! Id-Map .!|key val
	.set key val

impl! un-assoc! Id-Map .|key
	returning (?get this key) !|
		.delete key
