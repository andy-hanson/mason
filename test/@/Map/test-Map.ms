import
	...tests

tests 'Map
	to-string ->
		[(empty Map)] -> "empty Map"
		todo SYNTAX
		m =
			1 -> 2
		[m] -> "Map\n\t1 -> 2"

	make-map ->
		[[1 2] +[1]] ->
			1 -> 2
			2 -> 3

	map=? ->
		m1 =
			1 -> 2
			3 -> 4
		m2 =
			1 -> 2
		[m1 m1] -> true
		[m1 m2] -> false
