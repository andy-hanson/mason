import
	...compare =? same?
	...Type.Type => type-of
	...Type.Kind _ kind! self-kind!
	...Type.Method _ impl! self-impl!
	..@ _ all? count @keep
	..@-Type _ empty
import~
	.Hash-Set
import-debug
	..@ --

Set. new Kind
	| @ without repeat values.
	todo more
	name.

self-kind! Set @-Type
kind! Set @

self-impl! empty Set |
	empty Hash-Set

impl! =? Set
	| Two Sets are =? if they have the same type and contain the same values.
	test. |
		a = => Set [1 2]
		b = => Set [1 2]
		[a b] -> true
		[a [-- b [1]]] -> false
	.|other
		and (same? type-of this other) (same? count this other) (all? this |_
			:other

set=?.
	| Whether two @s have the same values, regardless of order or count.
	test. |
		[[1 2 3] [3 2 1]] -> true
		[[1] [1 1 1]] -> true
		[[1 2] [1 2 3]] -> false
	|a:@ b:@
		=? (=> Set a) (=> Set b)

intersect. new Method
	todo doc
	name.
	test. |
		[(=> Set [1 2]) (=> Set [2 3])] -> => Set [2]
	args. 2
	default. .|@intersect-with
		@keep this |_
			_:(=> Set @intersect-with)
