doc. "TODO"
\TODO: More tests

use
<<<<<<< HEAD
	.? -> ?none ?some get-or
	.Array -> ->Array
	..arithmetic-methods -> -
	..assert -> ! != !fails
	.Bag -> count iterator
	..Bool -> and if not or unless
	..Comparable -> =? <=? >=?
	..Error -> oh-no!
	..Fun
	..Generator
	..math.Num -> decrement increment Nat
	..pred-types -> Any
=======
	.Array -> ->Array
	..arithmetic-methods -> =? >=
	..assert -> ! !=
	.Bag -> count iterator
	..Bool -> or
	..error -> oh-no!
	..Fun
	..Generator
	..logic -> false not
	..Num -> decrement increment
	..pred-types -> Any Nat
>>>>>>> 9ddb097... Added missing files
	.Stream -> streaming
	..types.Interface -> implementor!
	..types.Method -> impl!
	..types.Record-Type

seq. |
	Array.prototype.slice.call `arguments`

region Methods
<<<<<<< HEAD
	?nth. Method
		doc. |:Any _ n:Nat
			"`n`th element in iteration order. 0th is the first."
		test. |
			!= (?nth (seq 0 1) 1) (?some 1)
			!= (?nth (seq 0 1) 2) ?none
=======
	nth. Method
		doc. |:Any _ n:Nat
			"`n`th element in iteration order. 0th is the first."
>>>>>>> 9ddb097... Added missing files
		default. |_ n:Nat
			iter = iterator_
			i ::= 0
			\ TODO:ES6 for (let em of _)
<<<<<<< HEAD
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
				Takes as much as possible
				Result length should be end - start.

		test. |
			!= (slice (seq 0 1 2 3) 1 3) (seq 1 2)

		default. |:Seq _ start:Nat end:Nat
			take (drop _ start) (- end start)

	?slice. |:?[Seq] _ start:Nat end:Nat
		if (and (>=? end start) ~(<=? end count_))
			slice _ start end

	take. Method
		default. |:Seq _ count-to-take:Nat
=======
			`for (let em of iter) { if (i == n) return em; i++; }`
			oh-no! "Sequence only has {i} elements, so can't return element {n}"

	slice. Method
		doc. |:Seq _ start:Nat end:Nat
			"Seq containing the elements from index start (inclusive) to end (exclusive)."
		default. |_ start:Nat end:Nat
			in
				>= end start

>>>>>>> 9ddb097... Added missing files
			streaming ~|
				iter = iterator_
				i ::= 0
				loop!
					value done = iter.next ()
					i := increment i
<<<<<<< HEAD
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
=======
					! (not done) "Cannot take range {start} to {end} of sequence with count {i}"
					case! i
						=? _ start
							end-loop!
						else
							()

				loop!
					value done = iter.next ()
					i := increment i
					! (not done) "Cannot take range {start} to {end} of sequence with count {i}"
					<~ value
					case! i
						=? _ end
							end-loop!
						else
							()

	first. Method
		doc. |:Any _
			"TODO"
		default. |_
			nth _ 0
>>>>>>> 9ddb097... Added missing files

	tail. Method
		doc. |:Seq _
			"TODO"
<<<<<<< HEAD
		test. |
			\ TODO: (empty Array)
			!= (tail (seq 0)) `[]`
			!= (tail `[]`) `[]`
		default. |_
			drop _ 1

	?last. Method
		doc. |:Any _
			"TODO"
		default. |_
			?nth _ (decrement count_)
=======
		default. |_
			slice _ 1 count_

	last. Method
		doc. |:Any _
			"TODO"
		default. |_
			nth _ (decrement count_)
>>>>>>> 9ddb097... Added missing files

	right-tail. Method
		doc. |:Any _
			"TODO"
		default. |_
<<<<<<< HEAD
			take _ (decrement count_)
=======
			slice _ 0 (decrement count_)

>>>>>>> 9ddb097... Added missing files

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

region ???
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


Seq = Interface
	doc. "TODO"
<<<<<<< HEAD

implementor! Seq Bag
=======
	methods.
		. first
		. tail
		. last
		. right-tail
		. nth
	super. Bag
>>>>>>> 9ddb097... Added missing files

Seq
