\ TODO: Lots more to do! including builder!
\ TODO: Move to bags

use
	.bags.Array
	.bags.Bag -> count iterator
	.bags.Bag-Type -> empty
	.bags.Seq
	.Comparable! -> <!
	.Str
	.types.Method -> impl-for
	.types.util -> self-type

\ TODO: Could share code with Array
<! Str Seq
	count -> impl-for count Array
	iterator -> impl-for iterator Array

<! (self-type Str) Bag-Type
	empty -> |
		""
