\ TODO: Move

use
	.assert -> !
	.bags.? -> Opt->? get-or
	.bags.Array
	.bags.Bag -> count iterator map
	.bags.Bag-Type -> from-stream
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
	count -> |_
		_.length
	\ TODO:ES6 should be built-in
	iterator -> impl-for iterator Array

<! (self-type Str) Bag-Type
	empty -> |
		""
	\ TODO
	from-stream -> impl-for from-stream (self-type Array)

impl! => (self-type Str) Bag
	test. |
		[ Str [ 1 2 3 ] ] -> "123"
		[ Str [ 1 2 3 ] ", " ] -> "1, 2, 3"
	|Str bag ?joiner:Opt[Str]
		ignore Str \ TODO: ignored vars
		joiner = get-or (Opt->? ?joiner) ""
		(map (=> Array bag) show).join joiner
