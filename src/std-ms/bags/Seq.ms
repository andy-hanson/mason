\TODO: More tests

use
	.? -> ?none ?some get-or
	.Array -> ->Array
	..arithmetic-methods -> -
	..assert -> ! != !fails
	.Bag -> all? count empty? iterator
	..basic-methods -> sub
	..Bool -> and if not or unless
	..Comparable -> =? <=? >=?
	..Error -> oh-no!
	..Fun
	..Generator
	..math.Num -> decrement increment Nat
	..pred-types -> Any
	.Stream -> streaming
	..types.Interface -> implementor!
	..types.Method -> impl! impl-direct!
	..types.Record-Type
	..types.Type -> subsumes?

\ TODO: REMOVE
seq. |
	Array.prototype.slice.call `arguments`

region Methods
	?nth. Method
		doc. |:Any _ n:Nat
			"`n`th element in iteration order. 0th is the first."
		test. |
			!= (?nth (seq 0 1) 1) (?some 1)
			!= (?nth (seq 0 1) 2) ?none
		default. |_ n:Nat
			iter = iterator_
			i ::= 0
			\ TODO:ES6 for (let em of _)
			s = ?some
			`for (let em of iter) { if (i == n) return s(em); i++; }`
			?none

	nth. Method
		doc. "TODO"
		test. |
			!= (nth (seq 0 1) 1) 1
			!fails |
				nth (seq 0 1) 2
		default. |_ n
			get-or (?nth _ n) ~(oh-no! "Sequence only has {count_} elements, so can't return element {n}")

	slice. Method
		doc. |:Seq _ start:Nat end:Nat
			"
				Seq containing the elements from index start (inclusive) to end (exclusive).
				Takes as much as possible.
				Result length should be end - start.

		test. |
			! (seq=? (slice (Array.of 0 1 2 3) 1 3) (Array.of 1 2))

		default. |:Seq _ start:Nat end:Nat
			take (drop _ start) (- end start)

	?slice. |:?[Seq] _ start:Nat end:Nat
		if (and (>=? end start) ~(<=? end count_))
			slice _ start end

	take. Method
		default. |:Seq _ count-to-take:Nat
			streaming ~|
				iter = iterator_
				i ::= 0
				loop!
					value done = iter.next ()
					i := increment i
					case!
						or done ~(=? i count-to-take)
							end-loop!
						else
							<~ value

	drop. Method
		default. |:Seq _ count-to-drop:Nat
			streaming ~|
				iter = iterator_
				i ::= 0
				\ Discard count-to-drop values:
				loop!
					value done = iter.next ()
					i := increment i
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
		doc. |:Any _
			"TODO"
		test. |
			!= (?first (seq 0)) (?some 0)
			\ TODO: (empty Array)
			!= (?first `[]`) ?none
		default. |_
			?nth _ 0

	tail. Method
		doc. |:Seq _
			"TODO"
		test. |
			\ TODO: (empty Array)
			! (empty? (tail (Array.of 0)))
			! (empty? (tail `[]`))
			! (seq=? (tail (Array.of 0 1)) (Array.of 1))

		default. |_
			drop _ 1

	?last. Method
		doc. |:Any _
			"TODO"
		default. |_
			?nth _ (decrement count_)

	right-tail. Method
		doc. |:Any _
			"TODO"
		default. |_
			take _ (decrement count_)

region Adding elements
	+>. Method
		doc. |:Seq _:Seq em:Any
			"
				Pronounced "plus-right."
				TODO

		test. |
			!= (->Array (+> (seq 0) 1)) (seq 0 1)
		default. |_:Seq em:Any
			\ TODO: then~ iterator_ ~| { ~< em }
			streaming ~|
				<~~ iterator_
				<~ em

	<+. Method
		doc. |:Seq _:Seq em:Any
			"
				Pronounced "left-plus".
				TODO

		test. |
			!= (->Array (<+ (seq 1) 0)) (seq 0 1)
		default. |_:Seq em:Any
			streaming ~|
				<~ em
				<~~ iterator_

region Combination
	\ TODO: Variadic
	zip. |s0:Seq s1:Seq zipper:Fun[Any Any Any]
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


seq=?.
	doc. "
		Whether two sequences share the same elements, regardless of their types.
		Equivalent to `=? (->Array seq0) (->Array seq1)`

	test. |
		s = streaming ~|
			<~ 1
		! (seq=? (Array.of 1) s)
	|seq0:Seq seq1:Seq
		all? (zip seq0 seq1 =?)

Seq = Interface
	doc. "
		A Seq is any Bag whose elements are in a consistent order.
		Basically, any Bag that's not a Set.

implementor! Seq Bag

impl-direct! sub Seq |
	Seq

Seq
