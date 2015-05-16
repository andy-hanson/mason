use
	...math.Number Nat
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
	doc. "Makes `_` into `+ added _`."
	args.
		. "_"
		. [ "added" @
++>!. Method
	doc. "Makes `_` into `+ _ added`."
	args.
		. "_"
		. [ "added" @

?<pop!. Method
	doc. "Takes one element off the left side, if not empty?."
	args. 1
	returns. ?
?pop>!. Method
	doc. "Takes one element off the right side, if not empty?."
	args. 1
	returns. ?

set-nth!. Method
	doc. "Makes `_[n]` be `val`."
	args.
		. "_"
		. [ "n" Nat
		. "val"

Seq!
