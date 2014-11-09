doc. "TODO"
\TODO: More tests

use
	.Array -> ->Array
	.arithmetic -> decrement increment
	.arithmetic-methods -> =? >=
	.assert -> ! !=
	.Bag -> count iterator
	.Bool -> or
	.error -> oh-no!
	.Fun
	.Generator
	.Interface -> implementor!
	.logic -> false not
	.Method -> impl!
	.pred-types -> Any Nat
	.Record-Type
	.Stream -> streaming

seq. |
	Array.prototype.slice.call `arguments`

region Methods
	nth. Method
		doc. |:Any _ n:Nat
			"`n`th element in iteration order. 0th is the first."
		default. |_ n:Nat
			iter = iterator_
			i ::= 0
			\ TODO:ES6 for (let em of _)
			`for (let em of iter) { if (i == n) return em; i++; }`
			oh-no! "Sequence only has {i} elements, so can't return element {n}"

	slice. Method
		doc. |:Seq _ start:Nat end:Nat
			"Seq containing the elements from index start (inclusive) to end (exclusive)."
		default. |_ start:Nat end:Nat
			in
				>= end start

			streaming ~|
				iter = iterator_
				i ::= 0
				loop!
					value done = iter.next ()
					i := increment i
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

	tail. Method
		doc. |:Seq _
			"TODO"
		default. |_
			slice _ 1 count_

	last. Method
		doc. |:Any _
			"TODO"
		default. |_
			nth _ (decrement count_)

	right-tail. Method
		doc. |:Any _
			"TODO"
		default. |_
			slice _ 0 (decrement count_)


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
	methods.
		. first
		. tail
		. last
		. right-tail
		. nth
	super. Bag

Seq
