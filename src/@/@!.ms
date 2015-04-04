use
	..Type.Kind _ kind! self-kind!
	..Type.Method _ self-impl!
	.@
	.@-Type _ empty
use~
	.Array!
	.Seq! ++>!
use-debug
	..! _ !not
	..compare =?
	..Type.Type contains?
	.@ each! empty?

@! = Kind
	doc. "Mutable @."
	implementor-test. |type
		# TODO:KLUDGE because Array and Array! are the same thing (also in Seq!.ms)
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

self-kind! @! @-Type
self-impl! empty @! |
	empty Array!

kind! @! @

empty!. Method
	doc. "Mutates this collection so that it will be `empty?`."

++!. Method
	doc. "
		Adds new elements.
		For Seqs these are added on the right; use `<++!` to add on the left.
	test. |
		"TODO:impl-test"
	# TODO: Lazy default?
	default. |_ added
		++>! _ added

--!. Method
	doc. |_ removed:@
		"
			Removes all elements in `removed` once.
			For Seqs these are removed starting from the left.
	test. |
		"TODO:impl-test"

@!
