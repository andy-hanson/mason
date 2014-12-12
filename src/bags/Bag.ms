use
	.? -> get-or Opt->?
	..assert -> ! !not
	.Bag-Type
	..Bool -> false not true
	..Comparable -> =?
	..Fun -> identity Pred
	..generators -> Generator!
	..maps.Map! -> set!
	..math.Num -> divisible? Nat
	..methods -> => + empty empty?
	..pred-types -> Any Opt
	..Ref -> get mod! ref
	.Stream
	..Symbol
	..types.Interface
	..types.Method -> impl!
	..types.Type -> contains?

region Bag
	iterator. Method
		doc. |:Generator! _
			"Creates a new Generator! which yields the values in the Bag. Should create a new one every time."
		symbol. Symbol.iterator

	Bag = Interface
		doc. "TODO"
		implementor-test. |bag-type
			! (contains? Bag-Type bag-type) "Be sure to make your Bag type a Bag-Type."
			_ = empty bag-type
			! empty?_

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

	builder. Method
		doc. |:Builder _
			"A new Builder of the same type as this Bag."

	\ TODO: Not public
	\ TODO: REFORM
	from-stream. |_ stream:Bag
		b = builder_
		iter = iterator stream
		loop!
			value done = iter.next ()
			case!
				done
					end-loop!
				else
					build-next! b value

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

	each!. Method
		doc. "Calls do-for-each on every element in the Bag."
		test. |
			"TODO"
		default. |_ do-for-each:Fun
			\ TODO:ES6 `for (let value of _)`
			iter = iterator_
			loop!
				value done = iter.next ()
				case!
					done
						end-loop!
					else
						do-for-each value

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
		iter = iterator_
		\ TODO:SYNTAX Return from loop
		found = ref (empty ?
		loop!
			value done = iter.next ()
			case!
				done
					end-loop!
				pred value
					set! found (=> ? [ value ]
					end-loop!
				else
					()
		get found

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

	impl! empty? Bag
		doc. "Whether `count` will return 0."
		|:Bool _
			(iterator_.next ()).done

	flat-map. Method
		doc. "TODO"
		test. |
			f = |case
				divisible? _ 2
					[ _ _ ]
				else
					[ _ ]
			[ [ 1 2 3 4 ] f ] -> [ 1 2 2 3 4 4 ]
		default. |_ mapper:Fun[Any Bag]
			from-stream _ (flat-map (=> Stream _) mapper)

	impl! + Bag
		doc. "TODO"
		test. |
			[ [ 0 ] [ 1 ] ] -> [ 0 1 ]
		|:Bag _ bag2:Bag
			from-stream _ (+ (=> Stream _) bag2)

region Set methods
	impl! contains? Bag
		doc. "TODO"
		test. |
			! contains? [ 0 ] 0
			!not contains? [ 0 ] 1
		|_ em:Any
			any? _ |em-compare
				=? em em-compare

Bag
