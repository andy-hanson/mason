use
	...Type.Kind kind! self-kind!
	..@ ++! --! empty! iterator
	..@-Type _ empty
	..Map.Map keys
	..Map.Hash-Map
	..Map.Map assoc! un-assoc!
	.Set

Hash-Set. class
	| Set that considers elements equal using =?.
	| Relies on an efficient hash-code implementation.
	do!
		self-kind! _ @-Type
		kind! _ Set

	static
		empty |
			new this (empty Hash-Map)

	construct! .map:Hash-Map
		pass

	iterator |
		iterator (keys .map)


	todo Make default falling back to +!
	++! !|@added
		for! @added
			assoc! .map _ true

	todo Make default falling back to -!
	--! !|@deleted
		for! @deleted
			un-assoc! .map _

	empty! !|
		empty! .map
