use
	..math.Num Nat
	..methods <! empty
	..Type.Impl-Type self-type
	..Type.Kind
	..Type.Method
	..@
	.@!
	.@-Type
	.?
	.Seq _
use~
	.Deque!
debug use~
	..!
	..methods =? empty?
	.Array
	.Array!
	.Seq seq=?

Seq! = Kind
	doc. "TODO"
	implementor-test. |type
		\ KLUDGE because Array and Array! are the same thing
		_ = case type
			=? _ Array
				empty Array!
			else
				empty type
		+>! _ [ 1 2
		<+! _ [ -2 -1
		! seq=? _ [ -2 -1 1 2
		! =? ?pop>!_ (? 2
		! =? ?<pop!_ (? -2
		! =? ?pop>!_ (? 1
		! =? ?<pop!_ (? -1
		! =? ?pop>!_ (empty ?
		! empty? _
		+>! _ [ 1 2 3

<! Seq! @!
<! Seq! Seq

<+!. Method
	doc. |_ added:@
		"TODO"
+>!. Method
	doc. |_ added:@
		"TODO"

?<pop!. Method
	doc. |:? _
		"TODO"
?pop>!. Method
	doc. |:? _
		"TODO"

set-nth!. Method
	doc. |_ n:Nat
		"TODO"

<! (self-type Seq!) @-Type
	empty -> |
		empty Deque!

Seq!
