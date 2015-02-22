use
	..Bool and
	..compare =? same?
	..Fun ignore
	..Type => contains? type-of
	..Type.Impl-Type self-type
	..Type.Kind _ kind!
	..Type.Method _ impl!
	..@ _ all? count keep
	.@-Type _ empty from-stream
use~
	.Hash-Set!
debug use~
	..Bool false true
	..@ --
	.Stream

Set = Kind
	doc. "@ without repeat values."

kind! Set @
kind! (self-type Set) @-Type
	empty -> |
		empty Hash-Set!
	from-stream -> |set _
		ignore set \ TODO:SYNTAX Ignored vars
		from-stream Hash-Set! _

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
