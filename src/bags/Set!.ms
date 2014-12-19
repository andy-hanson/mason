use
	..assert -> ! !not
	.Bag!
	..Comparable! -> <!
	..methods -> +! -! contains? empty empty? empty!
	..types.Interface

Set! = Interface
	doc. "TODO"
	implementor-test. |type
		_ = empty type
		+! _ [ 1 2 ]
		! contains? _ 1
		! contains? _ 2
		!not contains? _ 3
		-! _ [ 1 2 ]
		! empty? _
		+! _ [ 1 2 3 ]
		empty! _
		! empty? _

<! Set! Bag!

Set!
