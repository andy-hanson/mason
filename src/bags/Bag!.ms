use
	.Array
	.Array!
	..assert -> ! !not
	.Bag -> contains? each! empty?
	.Bag-Type -> empty
	..Comparable -> =?
	.Seq! -> +>!
	..types.Interface -> implementor!
	..types.Method
	..types.util -> self-type

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
		clear! _
		each! [ 1 2 3 4 ] |em
			!not contains? _ em
		! empty?_

+!. Method
	doc. |_ added:Bag
		"TODO"
	default. |_ added
		+>! _ added

clear!. Method
	doc. |_
		"TODO"

\ TODO: delete!

implementor! Bag! Bag

implementor! (self-type Bag!) Bag-Type
	empty -> |
		empty Array!

Bag!
