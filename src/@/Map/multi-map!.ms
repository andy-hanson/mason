use
	...control opr
	...Fun
	...Type.Pred-Type Opt
	..@ _ each!
	..@! ++!
	..Array!
	..@-Type _ empty
	.Map! _ get-or-add!
use-debug
	...!
	...compare =?
	...show
	..@ keep
	..Seq seq=?

add-to-@!.
	doc. "
		Treat `map` as a multi-map and add `added` to the @ associated with `key`.
		`@-type` is the type to use to create the `@` if it's not already there.
	test. |
		_ = empty Map!
		add-to-@! _ 1 [ 1 ]
		! =? _[1] [ 1 ]
		add-to-@! _ 1 [1 ]
		! =? _[1] [ 1 1 ]
	|map:Map! key added:@ ?@-type:Opt[@-Type]
		_ = get-or-add! map key ~
			empty (opr ?@-type Array!
		++! _ added

group.
	doc. "
		Creates groups of elements which all have the same result for some function.
		`(group @x f)[k]` should be `f
	test. |
		@sample = [ 1 "1" 2 "2" ]
		[ @sample show ] ->
			"1" -> [ 1 "1" ]
			"2" -> [ 2 "2" ]
		# Each map value is a subset of it.
		# You shouldn't use `group-by` if all you need is `keep`.
		! seq=? (group @sample show)["1"] (keep @sample |_
			=? show_ "1"
	|@value:@ group-by:Fun
		map = empty Map!
		each! @value |val
			key = group-by val
			add-to-@! map key [ val ]
		map
