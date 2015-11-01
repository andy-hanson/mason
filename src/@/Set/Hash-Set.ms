import
	...Type.Kind self-kind!
	..@ ++! --! empty! iterator
	..@-Type _ empty
	..Map.Map @keys
	..Map.Hash-Map
	.Set

Hash-Set. class kind Set
	| Set that considers elements equal using =?.
	| Relies on an efficient hash-code implementation.
	do!
		self-kind! _ @-Type

	static
		empty |
			new this (empty Hash-Map)

	construct! .map:Hash-Map
		pass

	iterator |
		iterator (@keys .map)


	todo Make default falling back to +!
	++! !|@added
		for! @added
			.map[_] := true

	todo Make default falling back to -!
	--! !|@deleted
		for! @deleted
			del! .map[_]

	empty! !|
		empty! .map
