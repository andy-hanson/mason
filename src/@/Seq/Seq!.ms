use
	...math.Num Nat
	...Type.Kind _ kind! self-kind!
	...Type.Method
	..@
	..@!
	..@-Type _ empty
	..?
	.Seq
use~
	.Deque!
use-debug
	...!
	...compare =?
	..@ empty?
	.Array!
	.Seq seq=?

Seq! = Kind
	doc. "
		Mutable Seq.
		Array!s can efficiently change existing elements and add new ones on the right.
		Deque!s are like Arrays, but can add new values on the left.
	implementor-test. |type
		# KLUDGE because Array and Array! are the same thing
		_ = case type
			=? _ Array
				empty Array!
			else
				empty type
		++>! _ [ 1 2
		<++! _ [ -2 -1
		! seq=? _ [ -2 -1 1 2
		! =? ?pop>!_ (? 2
		! =? ?<pop!_ (? -2
		! =? ?pop>!_ (? 1
		! =? ?<pop!_ (? -1
		! =? ?pop>!_ (empty ?
		! empty? _
		++>! _ [ 1 2 3

self-kind! Seq! @-Type
	empty -> |
		empty Deque!

kind! Seq! @!
kind! Seq! Seq

<++!. Method
	doc. |_ added:@
		"Makes `_` into `+ added _`."

++>!. Method
	doc. |_ added:@
		"Makes `_` into `+ _ added`."

?<pop!. Method
	doc. |:? _
		"Takes one element off the left side, if not empty?."
?pop>!. Method
	doc. |:? _
		"Takes one element off the right side, if not empty?."

set-nth!. Method
	doc. |_ n:Nat val
		"Makes `_[n]` be `val`."

Seq!
