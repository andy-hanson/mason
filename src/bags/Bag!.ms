use
	.Array
	.Array!
	..assert -> ! !not
	.Bag -> each!
	.Bag-Type
	..Comparable -> =?
	..Comparable! -> <!
	..methods -> +! empty empty? empty!
	.Seq! -> +>!
	..types.Interface
	..types.Method -> impl!
	..types.util -> self-type
	..types.Type -> contains?

Bag! = Interface
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

<! Bag! Bag

impl! +! Bag! |_ added
	+>! _ added

<! (self-type Bag!) Bag-Type
	empty -> |
		empty Array!

Bag!
