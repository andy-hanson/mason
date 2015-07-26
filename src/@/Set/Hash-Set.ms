use
	...Type.Kind kind! self-kind!
	..@ ++! --! empty! iterator
	..@-Type _ empty
	..Map.Map keys
	..Map.Hash-Map
	..Map.Map assoc! un-assoc!
	.Set

Hash-Set. class
	# TODO: class attributes
	# doc. "
	#	Set that considers elements equal using =?.
	#	Relies on an efficient hash-code implementation.

	do!
		self-kind! _ @-Type
		kind! _ Set

	static
		empty |
			new this (empty Hash-Map)

	# TODO: `data map:Hash-Map`
	construct! map
		.map = map

	iterator |
		iterator (keys .map)


	# TODO: Make default falling back to +!
	++! !|@added
		for! em in @added
			assoc! .map em true

	# TODO: Make default falling back to -!
	--! !|@deleted
		for! em in @deleted
			un-assoc! .map em

	empty! !|
		empty! .map
