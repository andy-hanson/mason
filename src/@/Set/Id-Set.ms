import
	todo SYNTAX use global.Set but rename it to Js-Set
	global
	...Type.Kind kind! self-kind!
	...Type.Type contains?
	..@ ++! --! count empty!
	..@-Type _ empty
	.Set

Id-Set. global.Set

self-kind! Id-Set @-Type
	todo This should be the default.
	empty -> |
		new Id-Set

kind! Id-Set Set
	count -> .|
		.size

	todo  Make default falling back to +!
	++! -> .!|@added
		for @added
			.add _

	empty! -> .!|
		.clear()

	todo  Make default falling back to -!
	--! -> .!|@deleted
		for @deleted
			.delete _

	contains? -> .|_
		.has_
