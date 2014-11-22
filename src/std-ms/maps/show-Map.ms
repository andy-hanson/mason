use
	..bags.Array
	..bags.Bag -> map
	..basic-methods -> =>
	.Map -> keys
	..show -> inspect
	..types.Method -> impl!

impl! inspect Map
	test. |
		m =
			1 -> 2
			3 -> 4
		[ m ] -> "
			1 -> 2
			3 -> 4
	|_
		parts = map keys_ |key
			"{inspect key} -> {inspect _[key]}"
		arr = => Array parts
		arr.join "\n"
