use
	..@ map
	..methods =>
	..Obj flag?
	..show
	..Str
	..Type type-of
	..Type.Method impl!
	..Map _ keys
	.Weak-Identity-Map!

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

impl! show Weak-Identity-Map!
	|
		"<a Weak-Identity-Map!>"
