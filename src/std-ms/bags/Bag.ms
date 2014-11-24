use
	.? -> ?none ?some get-or Opt->?
	..arithmetic-methods -> + -
	.Array -> ->Array
	..assert -> ! !not
	.Bag-Type -> empty
	..basic-methods -> => freeze sub
	..Bool -> and false not or true
	..Comparable -> =? <=? >=?
	..control -> if
	..Fun -> identity Pred thunk
	..generators -> Generator
	..maps.Map! -> set!
	..math.Num -> divisible? Nat
	..pred-types -> Any Opt
	..Ref -> get mod! ref
	..show
	.Stream -> streaming
	..Symbol
	..Try -> fails? oh-no!
	..types.Interface -> implementor!
	..types.Method -> impl!
	..types.util -> self-type
	..types.Type -> subsumes?

region Bag
	iterator. Method
		doc. |:Generator _
			"Creates a new generator which yields the values in the Bag. Should create a new one every time."
		symbol. Symbol.iterator

	Bag = Interface
		doc. "TODO"
		implementor-test. |bag-type
			! (subsumes? Bag-Type bag-type) "Be sure to make your Bag type a Bag-Type."
			_ = empty bag-type
			! empty?_
		methods.
			. iterator

region Builder
	build-next!. Method
		doc. "Adds a new element to the Builder."

	build-result. Method
		doc. "
			Result of building.
			build-next! should not be called after this has.

	Builder. Interface
		doc. "
			Something capable of incrementally generating a Bag.
			Relied on by various Bag methods, such as map and filter.
		methods.
			. build-next!
			. build-result

	builder. Method
		doc. |:Builder _
			"A new Builder of the same type as this Bag."

	\ TODO: Not public
	from-stream. |_ stream:Bag
		b = builder_
		iter = iterator stream
		bn = build-next!
		`for (let em of iter) bn(b, em)`
		build-result b

region Functions using just the iterator
	fold.
		doc. "TODO"
		test. |
			[ [ 1 2 3 ] 4 + ] -> 10
		|_:Bag start:Any folder:Fun[Any Any Any]
			acc = ref start
			each! _ |em
				mod! acc |x
					folder x em
			get acc

	each!.
		doc. "Calls do-for-each on every element in the Bag."
		test. |
			"TODO"
		|_ do-for-each:Fun
			\ TODO:ES6 `for (let value of _)`
			iter = iterator_
			f = do-for-each
			`for (let em of iter) f(em)`
			()

	any?.
		doc. "TODO"
		test. |
			! any? [ 0 1 ] =?[1]
			!not any? [ 0 1 ] =?[2]
		|_:Bag pred:Opt[Pred]
			\ TODO: Better optional arguments
			p = get-or (Opt->? pred) identity
			not (empty? (keep (=> Stream _) p))

	all?.
		doc. "TODO"
		test. |
			! all? [ 0 0 ] =?[0]
			!not all? [ 0 1 ] =?[0]
		|_:Bag pred:Opt[Pred]
			\ TODO: Better optional arguments
			p = get-or (Opt->? pred) identity
			x = any? _ |em
				not (p em)
			not x

	?first-where. |_ pred:Pred
		s = ?some
		\ TODO:ES6 for (let em of _)
		iter = iterator_
		`for (let em of  iter) if (pred(em)) return s(em)`
		?none

region Methods only needing iterator
	count. Method
		doc. "Number of elements in it."
		default. |:Nat _
			fold _ 0 +[1]

region Methods using builder
	keep. Method
		doc. "Bag with only the elements that satisfy `keep-if?`."
		test. |
			[ [ 1 2 ] =?[2] ] -> [ 2 ]
		default. |_:Bag keep-if?:Pred
			from-stream _ (keep (=> Stream _) keep-if?)

	map. Method
		doc. "TODO"
		test. |
			[ [ true false ] not ] -> [ false true ]
		default. |_:Bag mapper:Fun[Any Any]
			from-stream _ (map (=> Stream _) mapper)

	empty?. Method
		doc. "Whether `count` will return 0."
		default. |:Bool _
			(iterator_.next ()).done

	flat-map. Method
		doc. "TODO"
		test. |
			f = |case
				divisible? _ 2
					[ _ _ ]
				else
					?some_
			[ [ 1 2 3 4 ] f ] -> [ 1 2 2 3 4 4 ]
		default. |_ mapper:Fun[Any Bag]
			b = builder_
			iter = iterator_
			bn = build-next!
			`for (let em of iter) for (let innerEm of iterator(mapper(em))) bn(b, innerEm)`
			build-result b

	impl! + Bag
		doc. "TODO"
		test. |
			[ [ 0 ] [ 1 ] ] -> [ 0 1 ]
		|:Bag _ bag2:Bag
			from-stream _ (+ (=> Stream _) bag2)

region Set methods
	contains?. Method
		doc. "TODO"
		test. |
			! contains? [ 0 ] 0
			!not contains? [ 0 ] 1
		default. |_ em:Any
			any? _ |em-compare
				=? em em-compare

Bag
