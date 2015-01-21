use
	..@
	..@.Array!
	..@.? -> get-or Opt->?
	..@.@-Type
	.Map! -> get-or-update!
	..methods -> +! empty
	..pred-types -> Opt

add-to-@!. |map:Map! key added:@ @-type:Opt[@-Type]
	\ TODO:SYNTAX Optional arguments
	_ = get-or-update! map key ~
		empty (get-or (Opt->? @-type) Array!
	+! _ added
