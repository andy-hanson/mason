use
	..Comparable! <!
	..types.Interface
	.@!
	.Set
debug use~
	..! _ !not
	..methods +! -! contains? empty empty? empty!

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

\ TODO: Way to determine which one of these is more important
<! Set! Set
<! Set! @!

Set!
