use
	.? -> ?none ?some get-or Opt->?
	..arithmetic-methods -> + -
	..assert -> ! != !fails
	..basic-methods -> sub
	..Bool -> and false not or true
	..Comparable -> =? <=? >=?
	..control -> if
	..Error -> oh-no!
	..Fun -> curry identity Pred thunk
	..generators -> Generator
	..math.Num -> divisible? Nat
	..pred-types -> Any Opt
	.Stream -> streaming
	..Symbol
	..types.Interface -> implementor-direct!
	..types.Method -> impl! impl-direct!

region Methods
	iterator. Method
		doc. |:Generator _
			"Creates a new generator which yields the values in the Bag. Should create a new one every time."
		symbol. Symbol.iterator

	count. Method
		doc. "Number of elements in it."
		default. |:Nat _
			fold _ 0 |cur-count
				+ cur-count 1

	empty?. Method
		doc. "Whether `count` will return 0."
		default. |:Bool _
			(iterator_.next ()).done

	map. Method
		doc. "TODO"
		test. |
			! (seq=? (map [ true false ] not) [ false true ])
		default. |_:Bag mapper:Fun[Any Any]
			streaming ~|
				\ TODO:ES6 `for (let value of _)`
				iter = iterator_
				`for (let em of iter) yield mapper(em)`
				()

	keep. Method
		doc. "Bag with only the elements that satisfy `keep-if?`."
		test. |
			! (seq=? (keep [ 1 2 ] (curry =? 2)) [ 2 ])
		default. |_:Bag keep-if?:Pred
			streaming ~|
				\ TODO:ES6 `for (let value of _)`
				iter = iterator_
				ki = keep-if?
				`for (let em of iter) if (ki(em)) yield em`
				()

	toss.
		doc. "Bag without any elements that satisfy `toss-if?`."
		test. |
			! (seq=? (toss [ 1 2 ] (curry =? 2)) [ 1 ])
		|_:Bag toss-if?:Pred
			keep _ |em
				not (toss-if? em)

	flat-map. Method
		doc. "TODO"
		test. |
			x = flat-map [ 1 2 3 4 ] |case
				divisible? _ 2
					[ _ _ ]
				else
					?some _
			! (seq=? x [ 1 2 2 3 4 4 ] )
		default. |_:Bag mapper:Fun[Any Bag]
			streaming ~|
				x:Bag = _
				iter = iterator x
				loop!
					value done = iter.next ()
					case! done
						_
							end-loop!
						else
							<~~ iterator (mapper value)


region Functions requiring just the iterator
	fold.
		doc. "TODO"
		test. |
			!= (fold [ 1 2 3 ] 4 +) 10
		|_:Bag start:Any folder:Fun[Any Any Any]
			acc ::= start
			each! _ |em
				acc := folder acc em
			acc

	each!.
		doc. |_ do-for-each:Fun
			"TODO"
		test. |
			"TODO"
		|_ do-for-each:Fun
			\ TODO:ES6 `for (let value of _)`
			iter = iterator_
			f = do-for-each
			`for (let em of iter) f(em)`
			()

region Sequence methods
	?nth. Method
		doc. |:Any _ n:Nat
			"`n`th element in iteration order. 0th is the first."
		test. |
			!= (?nth [ 0 1 ] 1) (?some 1)
			!= (?nth [ 0 1 ] 2) ?none
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
			!= (nth [ 0 1 ] 1) 1
			!fails |
				nth [ 0 1 ] 2
		default. |_ n
			get-or (?nth _ n) ~(oh-no! "Bag only has {count_} elements, so can't return element {n}")

	slice. Method
		doc. "
			Bag containing the elements from index start (inclusive) to end (exclusive).
			Takes as much as possible.
			Result length should be - end start, unless `end` was past the end.

		test. |
			! (seq=? (slice [ 0 1 2 3 ] 1 3) [ 1 2 ])

		default. |:Bag _ start:Nat end:Nat
			take (drop _ start) (- end start)

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
			streaming ~|
				iter = iterator_
				i ::= 0
				loop!
					value done = iter.next ()
					i := + i 1
					case!
						or done ~(=? i count-to-take)
							end-loop!
						else
							<~ value

	drop. Method
		doc. "TODO"
		test. |
			"TODO"
		default. |:Bag _ count-to-drop:Nat
			streaming ~|
				iter = iterator_
				i ::= 0
				\ Discard count-to-drop values:
				loop!
					value done = iter.next ()
					i := + i 1
					case!
						or done ~(=? i count-to-drop)
							end-loop!
						else
							()
				\ And give out the rest
				loop!
					value done = iter.next ()
					case!
						done
							end-loop!
						else
							<~ value

	?first. Method
		doc. "TODO"
		test. |
			!= (?first [ 0 ]) (?some 0)
			!= (?first []) ?none
		default. |:Any _
			?nth _ 0

	tail. Method
		doc. "TODO"
		test. |
			! (empty? (tail [ 0 ]))
			! (empty? (tail []))
			! (seq=? (tail [ 0 1 ]) [ 1 ])

		default. |:Bag _
			drop _ 1

	?last. Method
		doc. "TODO"
		test. |
			"TODO"
		default. |:Any _
			?nth _ (- count_ 1)

	right-tail. Method
		doc. "TODO"
		default. |:Bag _
			take _ (- count_ 1)

region Combination
	\ TODO: Variadic
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

Bag = Interface
	doc. "TODO"
	methods.
		. iterator

impl! + Bag
	doc. "TODO"
	test. |
		() \ TODO
		\ != (->Array (+ [ 0 ] [ 1 ])) [ 0 1 ]
	|bag1 bag2:Bag
		streaming ~|
			<~~ iterator bag1
			<~~ iterator bag2

\ TODO: Move these
contains?. Method
	doc. "TODO"
	test. |
		! (contains? [ 0 ] 0)
		! (not (contains? [ 0 ] 1))
	default. |_ em:Any
		any? _ |em-compare
			=? em em-compare

any?.
	doc. "TODO"
	test. |
		! (any? [ 0 1 ] (curry =? 1))
		! (not (any? [ 0 1 ] (curry =? 2)))
	|_:Bag pred:Opt[Pred]
		\ TODO: Better optional arguments
		p = get-or (Opt->? pred) identity
		not  (empty? (keep _ pred))

all?.
	doc. "TODO"
	test. |
		! (all? [ 0 0 ] (curry =? 0))
		! (not (all? [ 0 1 ] (curry =? 0)))
	|_:Bag pred:Opt[Pred]
		\ TODO: Better optional arguments
		p = get-or (Opt->? pred) identity
		empty? (toss _ p)

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
		! (seq=? [ 1 ] s)
	|bag0:Bag bag1:Bag
		all? (zip bag0 bag1 =?)

empty. Method
	doc. "TODO"

Bag-Type. Interface
	doc. "TODO"
	methods.
		. empty

impl! sub Bag-Type identity
implementor-direct! Bag Bag-Type
impl! empty Bag (thunk [])

Bag
