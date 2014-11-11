use
	.assert -> !=
	.Fun
	.maps.Map
	.pred-types -> Any

switch.
	doc. "Calls the Fun that `cases` associates with `val`."
	test. |
		two = switch 1
			1 -> |
				2
			2 -> |
				3
		!= two 2
	|val:Any cases:Map[Any Fun]
		cases[val] ()
