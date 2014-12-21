use
	..bags.Bag -> map
	.Map -> keys
	..methods -> => type-of
	..show -> inspect
	..Str
	..types.Method -> impl!

impl! inspect Map
	test. |
		m =
			1 -> 2
		[ m ] -> "
			Hash-Map!
				1 -> 2
	|_
		parts = map keys_ |key
			"{inspect key} -> {inspect _[key]}"
		"
			{type-of_}
				{=> Str parts "\n\t"}

impl! show Map
	test. |
		m =
			1 -> 2
			3 -> 4
		[ m ] -> "
			1 -> 2
			3 -> 4
	|_
		parts = map keys_ |key
			"{key} -> {_[key]}"
		=> Str parts "\n"
