import
	todo SYNTAX use global.Set but rename it to Js-Set
	global
	...Type.Kind kind! self-kind!
	...Type.Type contains?
	..@ ++! --! count each! empty!
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
		each! @added .&add

	empty! -> .!|
		.clear()

	todo  Make default falling back to -!
	--! -> .!|@deleted
		each! @deleted .&delete

	contains? -> .|_
		.has_
