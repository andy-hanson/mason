import
	msl.@.@-Type from-stream
	...tests

tests "Map-Type"
	from-stream -> |
		todo  Better test
		m =
			1 -> 2
			3 -> 4
		hm = empty Hash-Map
		hm[1] = 2
		hm[3] = 4
		[Hash-Map m] -> hm
