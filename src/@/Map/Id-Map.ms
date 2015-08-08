use
	...Type.Method impl! self-impl!
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

	global.Map

kind! Id-Map Map
self-kind! Id-Map Map-Type

# TODO: class attributes
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

self-impl! empty Id-Map |
	new Id-Map

impl! count Id-Map .|
	.size

impl! ?get Id-Map .|key
	Opt->? (.get key)

impl! has-key? Id-Map .|key
	.has key

impl! keys Id-Map .|
	new Stream |
		.keys()

impl! values Id-Map .|
	new Stream |
		.values()

impl! empty! Id-Map .!|
	.clear()

impl! assoc! Id-Map .!|key val
	.set key val

impl! un-assoc! Id-Map .|key
	with ?get this key
		.delete key
