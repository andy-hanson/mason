import
	...compare =? same?
	...Type.Type => type-of
	...Type.Kind self-kind!
	..@ _ all? count @keep
	..@-Type _ empty
import~
	.Hash-Set

Set. kind @
	| @ without repeat values.
	todo more doc

	do
		self-kind! _ @-Type

	static
		empty |
			empty Hash-Set

	=? |other
		| Two Sets are =? if they have the same type and contain the same values.
		and (same? type-of this other) (same? count this other) (all? this |_
			:other

intersect. method |@intersect-with
	todo doc
	@keep this |_
		_:(=> Set @intersect-with)

set=?. |a:@ b:@
	| Whether two @s have the same values, regardless of order or count.
	=? (=> Set a) (=> Set b)
