use
	.? -> ?none ?some
	.arithmetic-methods -> +
	.Array -> ->Array
	.assert -> ! !=
	.Bool -> false not true
	.Comparable -> =?
	.Fun -> Pred
	.generators -> Generator
	.Interface
	.Method -> impl!
	.Num -> divisible? even? increment
	.pred-types -> Any Nat
	.Seq -> seq
	.Stream -> streaming
	.Symbol

region Methods
	iterator. Method
		doc. |:Generator _
			"Creates a new generator which yields the values in the Bag. Should create a new one every time."
		symbol. Symbol.iterator

	count. Method
		doc. |:Nat _
			"Number of elements in it."
		default. |_
			fold _ 0 increment

	empty?. Method
		doc. |:Bool _
			"Whether `count` will return 0. (May be faster.)"
		default. |_
			(iterator_.next ()).done

region Derived (override for efficiency/typing)
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

	\ TODO: Pattern for type-preserving `map`. `map` is just a function.
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

	where.
		doc. "TODO"
		test. |
			!= (->Array (where (seq 1 2 3 4) even?)) (seq 2 4)
		|_:Bag pred:Pred
			streaming ~|
				\ TODO:ES6 `for (let value of _)`
				iter = iterator_
				`for (let em of iter) if (pred(em)) yield em`
				()

	flat-map.
		doc. "TODO"
		test. |
			x = flat-map (Array 1 2 3 4) |case
				divisible? _ 2
					Array _ _
				else
					?some _
			!= (->Array x) (Array 1 2 2 3 4 4)

		|_:Bag mapper:Fun[Any Bag]
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

region Pure iterator functions
	fold.
		doc. "TODO"
		test. |
			!= (fold (Array 1 2 3) 4 +) 10
		|_:Bag start:Any folder:Fun[Any Any Any]
			acc ::= start
			each! _ |em
				acc := folder acc em
			acc

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

	|_ pred:Pred
		not  (empty? (where _ pred))

all?.
	doc. "TODO"
	test. |
		! (all? (seq 0 2) even?)
		! (not (all? (seq 0 1) even?))
	|_ pred:Pred
		not-pred = |_
			not (pred _)
		empty? (where _ not-pred)

?first-where. |_ pred:Pred
	s = ?some
	\ TODO:ES6 for (let em of _)
	iter = iterator_
	`for (let em of  iter) if (pred(em)) return s(em)`
	?none

Bag
