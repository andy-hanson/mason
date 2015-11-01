import
	...compare =? same?
	...Type.Type => type-of
	...Type.Kind _ kind! self-kind!
	...Type.Method
	..@ _ all? count @keep
	..@-Type _ empty
import~
	.Hash-Set

Set. new Kind
	| @ without repeat values.
	todo more
	name.

self-kind! Set @-Type
	empty -> |
		empty Hash-Set

kind! Set @
	=? -> .|other
		| Two Sets are =? if they have the same type and contain the same values.
		and (same? type-of this other) (same? count this other) (all? this |_
			:other

set=?. |a:@ b:@
	| Whether two @s have the same values, regardless of order or count.
	=? (=> Set a) (=> Set b)

intersect. new Method
	todo doc
	name.
	args. 2
	default. .|@intersect-with
		@keep this |_
			_:(=> Set @intersect-with)
