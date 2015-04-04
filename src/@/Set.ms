use
	..Bool and
	..compare =? same?
	..Type.Type => contains? type-of
	..Type.Kind _ kind! self-kind!
	..Type.Method _ impl!
	.@ _ all? count keep
	.@-Type _ empty from-stream
use~
	.Hash-Set!
use-debug
	.@ --
	.Stream

Set = Kind
	doc. "@ without repeat values."

self-kind! Set @-Type
	empty -> |
		empty Hash-Set!
	from-stream -> |_
		from-stream Hash-Set! _
kind! Set @

impl! =? Set
	doc. "Two Sets are =? if they have the same type and contain the same values."
	test. |
		a = => Set [ 1 2 ]
		b = => Set [ 1 2 ]
		[ a b ] -> true
		[ a [ -- b [ 1 ] ] ] -> false
	|a b
		and (same? type-of a b) ~(same? count a b) ~(all? a contains?[b]

set=?.
	doc. "Whether two @s have the same values, regardless of order or count."
	test. |
		[ [ 1 2 3 ] [ 3 2 1 ] ] -> true
		[ [ 1 ] [ 1 1 1 ] ] -> true
		[ [ 1 2 ] [ 1 2 3 ] ] -> false
	|a:@ b:@
		=? (=> Set a) (=> Set b

intersect. Method
	doc. "TODO"
	test. |
		[ (=> Set [ 1 2 ]) (=> Set [ 2 3 ]) ] -> => Stream [ 2 ]
	default. |a b
		keep a contains?[(=> Set b)]

Set
