use
	..@
	..@.Array!
	..@.? get-or Opt->?
	..@.@-Type
	..methods +! empty
	..pred-types Opt
	.Map! _ get-or-add!

add-to-@!. |map:Map! key added:@ @-type:Opt[@-Type]
	\ TODO:SYNTAX Optional arguments
	_ = get-or-add! map key ~
		empty (get-or (Opt->? @-type) Array!
	+! _ added
