use
	..@ -> map
	.Map -> keys
	..methods -> => type-of
	..Object -> flag?
	..show
	..Str
	..types.Method -> impl!

impl! show Map
	test. |
		m =
			1 -> 2
		\ TODO:SYNTAX [ repr. ]
		r =
			repr.
		[ m ] -> "\n\t1 -> 2"
		[ m r ] -> "
			Hash-Map!
				1 -> 2
	|_ opts
		\ TODO map pairs_
		parts = map keys_ |key
			"{show key opts} -> {show _[key] opts}"
		type = case
			flag? opts "repr"
				show type-of_ opts
			else
				""
		"
			{type}
				{=> Str parts "\n\t"}
