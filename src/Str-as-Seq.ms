\ TODO: Move

use
	.assert -> !
	.bags.? -> Opt->? get-or
	.bags.Array
	.bags.Array!
	.bags.Bag -> builder count iterator map
	.bags.Bag-Type
	.bags.Seq
	.Comparable -> =?
	.Comparable! -> <!
	.Fun -> identity ignore
	.methods -> => empty
	.pred-types -> Opt
	.show
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
	|Str bag ?joiner:Opt[Str]
		ignore Str \ TODO: ignored vars
		joiner = get-or (Opt->? ?joiner) ""
		(map (=> Array bag) show).join joiner
