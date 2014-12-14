use
	..bags.Array!
	..bags.? -> get-or Opt->?
	..bags.Bag
	..bags.Bag-Type
	.Map! -> get-or-update!
	..methods -> +! empty
	..pred-types -> Opt

add-to-bag!. |map:Map! key added:Bag bag-type:Opt[Bag-Type]
	\ TODO:SYNTAX Optional arguments
	bt = get-or (Opt->? bag-type) Array!
	bag = get-or-update! map key ~(empty bt
	+! bag added



