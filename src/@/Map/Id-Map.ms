import
	todo SYNTAX use global.Map but rename it to Js-Map
	global
	...methods del-sub! set-sub!
	...Type.Method impl!
	...Type.Trait trait!
	..@ count empty!
	..? Opt->?
	..Seq.Stream
	.Map _ ?get has-key? @keys @values

Id-Map.
	| JavaScript's native Map type.
	| Only considers exactly identical keys =?; this makes it the fastest Map.
	global.Map

|| Define this first because it is needed for map literals.
impl! set-sub! Id-Map .!|key val
	.set key val

trait! Id-Map Map
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
