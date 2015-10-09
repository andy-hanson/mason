import
	todo SYNTAX use global.Map but rename it to Js-Map
	global
	...Type.Method impl! self-impl!
	...Type.Kind kind! self-kind!
	..@ count empty!
	..@-Type empty
	..? Opt->?
	..Seq.Stream
	.Map _ assoc! ?get has-key? @keys un-assoc! @values
	.Map-Type

Id-Map.
	| JavaScript's native Map type.
	| Only considers exactly identical keys =?; this makes it the fastest Map.
	global.Map

kind! Id-Map Map
self-kind! Id-Map Map-Type

self-impl! empty Id-Map |
	new Id-Map

impl! count Id-Map .|
	.size

impl! ?get Id-Map .|key
	Opt->? (.get key)

impl! has-key? Id-Map .|key
	.has key

impl! @keys Id-Map .|
	new Stream |
		.keys()

impl! @values Id-Map .|
	new Stream |
		.values()

impl! empty! Id-Map .!|
	.clear()

impl! assoc! Id-Map .!|key val
	.set key val

impl! un-assoc! Id-Map .|key
	with ?get this key
		.delete key
