use
	..@
	..@.Array!
	..@.? get-or Opt->?
	..@.@-Type
	.Map! _ get-or-add!
	..methods +! empty
	..pred-types Opt

add-to-@!. |map:Map! key added:@ @-type:Opt[@-Type]
	\ TODO:SYNTAX Optional arguments
	_ = get-or-add! map key ~
		empty (get-or (Opt->? @-type) Array!
	+! _ added
