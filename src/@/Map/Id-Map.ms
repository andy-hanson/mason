import
	todo SYNTAX use global.Map but rename it to Js-Map
	global
	...methods del-sub! set-sub!
	...Type.Method impl!
	...Type.Kind kind! self-kind!
	..@ count empty!
	..@-Type empty
	..? Opt->?
	..Seq.Stream
	.Map _ ?get has-key? @keys @values
	.Map-Type

Id-Map.
	| JavaScript's native Map type.
	| Only considers exactly identical keys =?; this makes it the fastest Map.
	global.Map

|| Define this first because it is needed for map literals.
impl! set-sub! Id-Map .!|key val
	.set key val

self-kind! Id-Map Map-Type
	empty -> |
		new Id-Map

kind! Id-Map Map
	count -> .|
		.size

	?get -> .|key
		Opt->? (.get key)

	has-key? -> .|key
		.has key

	@keys -> .|
		new Stream |
			.keys()

	@values -> .|
		new Stream |
			.values()

	empty! -> .!|
		.clear()

	del-sub! -> .|key
		with ?get this key
			.delete key
