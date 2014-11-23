use
	.? -> ?none ?some get-or Opt->?
	..arithmetic-methods -> + -
	.Array -> ->Array
	..assert -> ! !not
	..basic-methods -> => freeze sub
	..Bool -> and false not or true
	..Comparable -> =? <=? >=?
	..control -> if
	..Fun -> identity Pred thunk
	..generators -> Generator
	..math.Num -> divisible? Nat
	..pred-types -> Any Opt
	..show
	.Stream -> streaming
	..Symbol
	..Try -> fails? oh-no!
	..types.Interface -> implementor!
	..types.Method -> impl!
	..types.util -> self-type

region Bag
	iterator. Method
		doc. |:Generator _
			"Creates a new generator which yields the values in the Bag. Should create a new one every time."
		symbol. Symbol.iterator

	Bag = Interface
		doc. "TODO"
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
			acc ::= start
			each! _ |em
				acc := folder acc em
			acc

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

	seq=?.
		doc. "
			Whether two bags share the same elements in the same order.
			The types of the bags does not matter.
			Equivalent to `=? (->Array bag0) (->Array bag1)`

		test. |
			s = streaming ~|
				<~ 1
			! seq=? s [ 1 ]
			!not seq=? s [ 2 ]
		|bag0:Bag bag1:Bag
			and (=? (count bag0) (count bag1)) ~(all? (zip bag0 bag1 =?))

region Methods only needing iterator
	count. Method
		doc. "Number of elements in it."
		default. |:Nat _
			fold _ 0 |cur-count
				+ cur-count 1


	?nth. Method
		doc. |:Any _ n:Nat
			"`n`th element in iteration order. 0th is the first."
		test. |
			[ [ 0 1 ] 1 ] -> ?some 1
			[ [ 0 1 ] 2 ] -> ?none
		default. |_ n:Nat
			iter = iterator_
			i ::= 0
			\ TODO:ES6 for (let em of _)
			s = ?some
			`for (let em of iter) { if (i == n) return s(em); i++; }`
			?none

	\ TODO: sub
	nth. Method
		doc. "TODO"
		test. |
			! =? (nth [ 0 1 ] 1) 1
			! fails? |
				nth [ 0 1 ] 2
		default. |_ n:Nat
			get-or (?nth _ n) ~(oh-no! "Bag only has {count_} elements, so can't return element {n}")

	?first. Method
		doc. "TODO"
		test. |
			[ [ 0 ] ] -> ?some 0
			[ [] ] -> ?none
		default. |:Any _
			?nth _ 0

	<pop. Method
		doc. "TODO"
		test. |
			[ [] ] -> []
			[ [ 0 ] ] -> []
			[ [ 0 1 ] ] -> [ 1 ]

		default. |:Bag _
			drop _ 1

	?last. Method
		doc. "TODO"
		test. |
			"TODO"
		default. |:Any _
			?nth _ (- count_ 1)

	pop>. Method
		doc. "TODO"
		test. |
			"TODO"
		default. |:Bag _
			take _ (- count_ 1)

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

	slice. Method
		doc. "
			Bag containing the elements from index start (inclusive) to end (exclusive).
			Takes as much as possible.
			Result length should be - end start, unless `end` was past the end.

		test. |
			[ [ 0 1 2 3 ] 1 3 ] -> [ 1 2 ]

		default. |:Bag _ start:Nat end:Nat
			from-stream _ (slice (=> Stream _) start end)

	?slice.
		doc. "TODO"
		test. |
			"TODO"
		|:?[Bag] _ start:Nat end:Nat
			if (and (>=? end start) ~(<=? end count_))
				slice _ start end

	take. Method
		doc. "TODO"
		test. |
			"TODO"
		default. |:Bag _ count-to-take:Nat
			from-stream _ (take (=> Stream _) count-to-take)

	drop. Method
		doc. "TODO"
		test. |
			"TODO"
		default. |:Bag _ count-to-drop:Nat
			from-stream _ (drop (=> Stream _) count-to-drop)

	impl! + Bag
		doc. "TODO"
		test. |
			[ [ 0 ] [ 1 ] ] -> [ 0 1 ]
		|:Bag _ bag2:Bag
			from-stream _ (+ (=> Stream _) bag2)

region Combination
	\ TODO: Variadic
	\ TODO: Builder? (whose?)
	zip. |s0:Bag s1:Bag zipper:Fun[Any Any Any]
		streaming ~|
			iter0 = iterator s0
			iter1 = iterator s1
			loop!
				next0 = iter0.next ()
				next1 = iter1.next ()
				case!
					or next0.done next1.done
						end-loop!
					else
						<~ zipper next0.value next1.value

region Set methods
	contains?. Method
		doc. "TODO"
		test. |
			! contains? [ 0 ] 0
			!not contains? [ 0 ] 1
		default. |_ em:Any
			any? _ |em-compare
				=? em em-compare

region TODO: put somewhere
	reverse. Method
		doc. "TODO"
		test. |
			[ [ 1 2 ] ] -> [ 2 1 ]
		default. |_
			arr = ->Array_
			reverse-stream = streaming ~|
				i ::= count arr
				loop!
					case!
						=? i 0
							end-loop!
						else
							i := - i 1
							<~ arr[i]
			from-stream _ reverse-stream

Bag
