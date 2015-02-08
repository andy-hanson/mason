use
	..@
	..@.@! ++!
	..@.Array!
	..@.? get-or Opt->?
	..@.@-Type
	..methods empty
	..Type.Pred-Type Opt
	.Map! _ get-or-add!
debug use
	..!
	..methods =?

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
	|map:Map! key added:@ @-type:Opt[@-Type]
		\ TODO:SYNTAX Optional arguments
		_ = get-or-add! map key ~
			empty (get-or (Opt->? @-type) Array!
		++! _ added
