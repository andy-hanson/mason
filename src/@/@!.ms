use
	..Type.Kind _ kind! self-kind!
	..Type.Method _ self-impl!
	.@
	.@-Type _ empty
use~
	.Seq.Array!
	.Seq.Seq! ++>!
use-debug
	..! _ !not
	..compare =?
	..Type.Type contains?
	.@ empty?

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
		for! em in [ 1 2 3 4 ]
			! contains? _ em
		!not contains? _ 5
		empty! _
		for! em in [ 1 2 3 4 ]
			!not contains? _ em
		! empty? _

self-kind! @! @-Type
self-impl! empty @! |
	empty Array!

kind! @! @

empty!. Method
	doc. "Mutates this collection so that it will be `empty?`."
	args. 1

++!. Method
	doc. "
		Adds new elements.
		For Seqs these are added on the right; use `<++!` to add on the left.
	test. |
		"TODO:impl-test"
	args.
		. "_"
		. [ "added" @
	# TODO: Lazy default?
	default. |_ added
		++>! _ added

--!. Method
	doc. "
		Removes all elements in `removed` once.
		For Seqs these are removed starting from the left.
	args.
		. "_"
		. [ "@removed" @
	test. |
		"TODO:impl-test"

@!
