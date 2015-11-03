import
	msl.@.Map.multi-map add-to-@! group
	...tests


tests 'multi-map
	add-to-@! -> !|
		_ = empty Map
		add-to-@! _ 1 [1]
		assert =? _[1] [1]
		add-to-@! _ 1 [1]
		assert =? _[1] [1 1]

	group -> |
		@sample = [1 "1" 2 "2"]
		[@sample to-string] ->
			"1" -> [1 "1"]
			"2" -> [2 "2"]
		|| Each map value is a subset of it.
		|| You shouldn't use `group-by` if all you need is `keep`.
		assert seq=? (group @sample to-string)["1"] (@keep @sample |_
			=? to-string_ "1"
