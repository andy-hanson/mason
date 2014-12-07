use
	.assert -> !
	.bags.? -> Opt->? get-or
	.bags.Array
	.bags.Array!
	.bags.Bag -> builder count iterator map
	.bags.Bag-Type -> empty
	.bags.Seq
	.basic-methods -> =>
	.Comparable -> =?
	.Comparable! -> <!
	.Fun -> identity
	.pred-types -> Opt
	.Str
	.types.Method -> impl! impl-for
	.types.util -> self-type

test. |
	! =? [ "1" "2" "3" ] (map "123" identity)

<! Str Seq
	builder -> |
		empty Array!
	count -> |_
		_.length
	\ TODO:ES6 should be built-in
	iterator -> impl-for iterator Array

<! (self-type Str) Bag-Type
	empty -> |
		""

impl! => (self-type Str) Bag
	test. |
		[ Str [ 1 2 3 ] ] -> "123"
		[ Str [ 1 2 3 ] ", " ] -> "1, 2, 3"
	|ignore bag ?joiner:Opt[Str]
		ignore \ TODO: ignored vars
		joiner = get-or (Opt->? ?joiner) ""
		(=> Array bag).join joiner
