use
	..bags.Array
	..bags.Bag -> map
	..basic-methods -> => type-of
	.Map -> keys
	..show -> inspect inspect-impl show-impl
	..Str -> indent
	..types.Method -> impl!

impl! inspect-impl Map
	test. |
		m =
			1 -> 2
		[ m ] -> "
			Hash-Map
				1 -> 2
	|_
		"
			{type-of_}
				{indent show-impl_}

impl! show-impl Map
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
