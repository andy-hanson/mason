use
	.? -> ?none ?some get-or Opt->?
	..arithmetic-methods -> +
	.Array -> ->Array
	..assert -> ! !=
	..Bool -> false not true
	..Comparable -> =?
	..Fun -> identity Pred
	..generators -> Generator
	..math.Num -> divisible? even? increment
	..pred-types -> Any Nat Opt
	.Seq -> seq
	.Stream -> streaming
	..Symbol
	..types.Interface
	..types.Method -> impl!

region Methods
	iterator. Method
		doc. |:Generator _
			"Creates a new generator which yields the values in the Bag. Should create a new one every time."
		symbol. Symbol.iterator

	count. Method
		doc. "Number of elements in it."
		default. |:Nat _
			fold _ 0 increment

	empty?. Method
		doc. "Whether `count` will return 0."
		default. |:Bool _
			(iterator_.next ()).done

	map. Method
		doc. "TODO"
		test. |
			!= (->Array (map (seq 1 2 3) increment)) (seq 2 3 4)
		default. |_:Bag mapper:Fun[Any Any]
			streaming ~|
				\ TODO:ES6 `for (let value of _)`
				iter = iterator_
				`for (let em of iter) yield mapper(em)`
				()

	keep. Method
		doc. "Bag with only the elements that satisfy `keep-if?`."
		test. |
			!= (keep (Array.of 1 2) even?) (Array.of 2)
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
			!= (toss (Array.of 1 2) even?) (Array.of 1)
		|_:Bag toss-if?:Pred
			keep _ |em
				not (toss-if? em)

	flat-map. Method
		doc. "TODO"
		test. |
			x = flat-map (Array 1 2 3 4) |case
				divisible? _ 2
					Array _ _
				else
					?some _
			!= (->Array x) (Array 1 2 2 3 4 4)
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
			!= (fold (Array 1 2 3) 4 +) 10
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

Bag = Interface
	doc. "A group of elements, not necessarily ordered."
	methods.
		. iterator

impl! + Bag
	doc. "TODO"
	test. |
		!= (->Array (+ (seq 0) (seq 1))) (seq 0 1)
	|bag1 bag2:Bag
		streaming ~|
			<~~ iterator bag1
			<~~ iterator bag2

contains?. Method
	doc. "TODO"
	test. |
		! (contains? (seq 0) 0)
		! (not (contains? (seq 0) 1))
	default. |_ em:Any
		any? _ |em-compare
			=? em em-compare

any?.
	doc. "TODO"
	test. |
		! (any? (seq 0 1) even?)
		! (not (any? (seq 1 3) even?))
	|_:Bag pred:Opt[Pred]
		\ TODO: Better optional arguments
		p = get-or (Opt->? pred) identity
		not  (empty? (keep _ pred))

all?.
	doc. "TODO"
	test. |
		! (all? (seq 0 2) even?)
		! (not (all? (seq 0 1) even?))
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

Bag
