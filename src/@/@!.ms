use
	..@
	.@-Type
	..Comparable! <!
	..methods +! empty
	..types.Interface
	..types.Method impl!
	..types.util self-type
use~
	.Seq! +>!
debug use~
	..! _ !not
	..@ each!
	.Array
	.Array!
	..Comparable =?
	..methods contains? empty? empty!



@! = Interface
	doc. "TODO"
	implementor-test. |type
		\ KLUDGE because Array and Array! are the same thing (also in Seq!.ms)
		_ = case type
			=? _ Array
				empty Array!
			else
				empty type
		+! _ [ 1 2 ]
		+! _ [ 3 4 ]
		each! [ 1 2 3 4 ] |em
			! contains? _ em
		!not contains? _ 5
		empty! _
		each! [ 1 2 3 4 ] |em
			!not contains? _ em
		! empty? _

<! @! @

\ TODO: impl! +! @! +>!
impl! +! @! |_ added
	+>! _ added

<! (self-type @!) @-Type
	empty -> |
		empty @!

@!
