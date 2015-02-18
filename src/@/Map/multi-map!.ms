use
	...control opr
	...Type.Pred-Type Opt
	...@
	..@! ++!
	..Array!
	..@-Type _ empty
	.Map! _ get-or-add!
debug use
	...!
	...methods =?

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
