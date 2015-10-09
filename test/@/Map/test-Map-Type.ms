import
	msl.@.@-Type from-stream
	msl.@.Map.Hash-Map
	...tests

tests "Map-Type"
	from-stream -> |
		todo  Better test
		m =
			1 -> 2
			3 -> 4
		hm = empty Hash-Map
		assoc! hm 1 2
		assoc! hm 3 4
		[Hash-Map m] -> hm
