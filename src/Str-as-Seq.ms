\ TODO: Lots more to do! including builder!

use
	.bags.Array
	.bags.Bag -> count iterator
	.bags.Bag-Type -> empty
	.bags.Seq
	.Str
	.types.Interface -> implementor!
	.types.Method -> impl-for
	.types.util -> self-type

\ TODO: Could share code with Array
implementor! Str Seq
	count -> impl-for count Array
	iterator -> impl-for iterator Array

implementor! (self-type Str) Bag-Type
	empty -> |
		""
