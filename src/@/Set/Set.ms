use
	...compare =? same?
	...Type.Type => contains? type-of
	...Type.Kind _ kind! self-kind!
	...Type.Method _ impl! self-impl!
	..@ _ all? count keep
	..@-Type _ empty from-stream
use~
	.Hash-Set
use-debug
	..@ --

Set. Kind
	doc. "@ without repeat values."

self-kind! Set @-Type
self-impl! empty Set |
	empty Hash-Set
self-impl! from-stream Set |_
	from-stream Hash-Set _
kind! Set @

impl! =? Set
	doc. "Two Sets are =? if they have the same type and contain the same values."
	test. |
		a = => Set [ 1 2 ]
		b = => Set [ 1 2 ]
		[ a b ] -> true
		[ a [ -- b [ 1 ] ] ] -> false
	.|other
		and (same? type-of this other) (same? count this other) (all? this contains?[other])

set=?.
	doc. "Whether two @s have the same values, regardless of order or count."
	test. |
		[ [ 1 2 3 ] [ 3 2 1 ] ] -> true
		[ [ 1 ] [ 1 1 1 ] ] -> true
		[ [ 1 2 ] [ 1 2 3 ] ] -> false
	|a:@ b:@
		=? (=> Set a) (=> Set b)

intersect. Method
	doc. "TODO"
	test. |
		[ (=> Set [ 1 2 ]) (=> Set [ 2 3 ]) ] -> => Set [ 2 ]
	args. 2
	default. .|@intersect-with
		keep this |_
			_:(=> Set @intersect-with)
