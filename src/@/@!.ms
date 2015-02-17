use
	..methods <! empty
	..Type.Impl-Type self-type
	..Type.Kind
	..Type.Method
	..@
	.@-Type
use~
	.Array!
	.Seq! ++>!
debug use~
	..! _ !not
	..@ each!
	..methods =? empty? empty!
	..Type contains?
	.Array

@! = Kind
	doc. "Mutable @."
	implementor-test. |type
		\ KLUDGE because Array and Array! are the same thing (also in Seq!.ms)
		_ = case type
			=? _ Array
				empty Array!
			else
				empty type
		++! _ [ 1 2 ]
		++! _ [ 3 4 ]
		each! [ 1 2 3 4 ] |em
			! contains? _ em
		!not contains? _ 5
		empty! _
		each! [ 1 2 3 4 ] |em
			!not contains? _ em
		! empty? _

<! @! @

++!. Method
	doc. "
		Adds new elements.
		For Seqs these are added on the right; use `<++!` to add on the left.
	test. |
		"TODO:impl-test"
	\ TODO: Lazy default?
	default. |_ added
		++>! _ added

--!. Method
	doc. |_ removed:@
		"
			Removes all elements in `removed` once.
			For Seqs these are removed starting from the left.
	test. |
		"TODO:impl-test"

<! (self-type @!) @-Type
	empty -> |
		empty Array!

@!
