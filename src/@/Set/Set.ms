import
	...compare =? same?
	...Type.Type => has-instance? type-of
	..@ _ all? count empty @keep
import~
	.Hash-Set

Set. kind @
	| @ without repeat values.
	todo more doc

	static
		empty |
			empty Hash-Set

	=? |other
		| Two Sets are =? if they have the same type and contain the same values.
		and (same? type-of this other) (same? count this other) (all? this |_
			:other

intersect. method |@intersect-with
	todo doc
	@keep this has-instance?[(=> Set @intersect-with)]

set=?. |a:@ b:@
	| Whether two @s have the same values, regardless of order or count.
	=? (=> Set a) (=> Set b)
