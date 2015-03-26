use
	..Bool false not
	..compare =?
	..control End-Loop if loop
	..Fun _ Pred
	..math.methods - +
	..methods freeze sub
	..Str indent
	..Type => type-of
	..Type.Kind _ kind! self-kind!
	..Type.Method _ impl! self-impl!
	..@ _ ++ count empty? iterator
	.@-Type _ empty from-stream
use~
	..control Ref! get mod! set!
	..show
	.? _ un-?
	.Array
	.Array!
	..math.Num Nat
	.Seq! ++>!
	.Stream
use-debug
	..! _ !not
	..compare <?
	..Try fails?

Seq = Kind
	doc. "@ whose values are in a meaningful order."

kind! Seq @

self-kind! Seq @-Type
self-impl! empty Seq |
	empty Array

region ???
	<++'. Method
		doc. "
			TODO:REST
			(There is no `++>'` because `++` by default adds to the right for Seqs.)
		test. |
			"TODO"
		|_:@ left-added:@
			=> type-of_ (++ left-added _

region Very first and last
	first.
		doc. "First value in iteration order."
		test. |
			[ [ 1 2 ] ] -> 1
			! fails? |
				first [ ]
		|_
			un-? ?first_ "Can not take first of empty."

	?first. Method
		doc. "First value in iteration order, if non-empty."
		test. |
			[ [ 1 2 ] ] -> ? 1
			[ [ ] ] -> empty ?
		default. |_
			?nth _ 0

	last.
		doc. "Last value in iteration order."
		test. |
			[ [ 1 2 ] ] -> 2
			! fails? |
				last [ ]
		|_
			un-? ?last_ "Can not take `last` of empty."

	?last. Method
		doc. "Last value in iteration order, if non-empty."
		test. |
			[ [ 1 2 ] ] -> ? 2
			[ [ ] ] -> empty ?
		default. |_
			if (not empty?_) ~_[(- count_ 1)]

	tail. Method
		doc. "
			All elements but the first.
			TODO: Eager for Linked-Lists.
		test. |
			[ [ 1 2 ] ] -> => Stream [ 2 ]
			[ [ ] ] -> [ ]
		default. |case
			empty?_
				_
			else
				drop _ 1

	rtail. Method
		doc. "
			All elements but the last.
			TODO: Eager for finger trees.
		test. |
			[ [ 1 2 ] ] -> => Stream [ 1 ]
			[ [ ] ] -> [ ]
		default. |case
			empty?_
				_
			else
				take _ (- count_ 1

region Search
	seq=?.
		doc. "
			Whether two @s share the same elements in the same order.
			The types of the @s do not matter.
			Equivalent to `=? (=> Array @a) (=> Array @b)`, but may not have to fully unlazy both.
		test. |
			s = Stream ~|
				<~ 1
			! seq=? s [ 1 ]
			!not seq=? s [ 2 ]
		|@a:@ @b:@
			iter-a = iterator @a
			iter-b = iterator @b
			loop () |
				next-a = iter-a.next()
				next-b = iter-b.next()
				case
					next-a.done
						\ =? If the same length and all so far are =?.
						End-Loop next-b.done
					next-b.done
						End-Loop false
					not (=? next-a.value next-b.value)
						End-Loop false
					else
						()

	?nth. Method
		doc. |_ n:Nat
			"
				`n`th element in iteration order, if there are at least that many values.
				0th is the first."
		test. |
			[ [ 0 1 ] 1 ] -> ? 1
			[ [ 0 1 ] 2 ] -> empty ?
		default. |_ n:Nat
			iter = iterator_
			i = Ref! 0
			\ TODO:SYNTAX Loop return value
			ans = Ref! (empty ?
			loop!
				value done = iter.next()
				case!
					done
						end-loop!
					=? (get i) n
						set! ans (? value
						end-loop!
					else
						mod! i +[1]
			get ans

	impl! sub Seq
		doc. "Nth value in iteration order."
		test. |
			! =? [ 0 1 ][1] 1
			! fails? |
				[ 0 1 ][2]
		|_ n:Nat
			un-? (?nth _ n) ~"
				No element at index {n} for
					{indent (show _}

region Update
	slice. Method
		doc. "
			The elements from index start (inclusive) to end (exclusive).
			Takes as much as possible.
			Result length should be - end start, unless `end` was past the end.
		test. |
			[ [ 0 1 2 3 ] 1 3 ] -> => Stream [ 1 2 ]
		default. |:@ _ start:Nat end:Nat
			take (drop _ start) (- end start

	slice'. Method
		doc. "Type-preserving slice."
		test. |
			[ [ 0 1 2 3 ] 1 3 ] -> [ 1 2 ]
		default. |_ start:Nat end:Nat
			=> type-of_ (slice _ start end

	take.
		doc. "Stream including only the first count-to-take elements."
		test. |
			[ [ 0 1 2 ] 2 ] -> => Stream [ 0 1 ]
			\ OK if not enough to satisfy count-to-take
			[ [ 0 ] 2 ] -> => Stream [ 0 ]
			_ = [ 0 1 2 3 4 ]
			! seq=? _ (++ (take _ 2) (drop _ 2
		|_ count-to-take:Nat
			Stream ~|
				iter = iterator_
				i = Ref! 0
				loop!
					case!
						=? (get i) count-to-take
							end-loop!
						else
							value done = iter.next()
							case!
								done
									end-loop!
								else
									<~ value
									mod! i +[1]

	take-while.
		doc. "Stream stopping (and not including) the first element not satisfying while?."
		test. |
			[ [ 1 2 -1 3 ] <?[0] ] -> => Stream [ 1 2 ]
		|_ while?:Pred
			Stream ~|
				iter = iterator_
				loop!
					value done = iter.next()
					case!
						done
							end-loop!
						while? value
							<~ value
						else
							end-loop!


	drop. Method
		doc. "Stream without the first count-to-drop elements."
		test. |
			[ [ 0 1 2 3 ] 2 ] -> => Stream [ 2 3 ]
		default. |:@ _ count-to-drop:Nat
			Stream ~|
				iter = iterator_
				i = Ref! 0
				loop!
					case!
						=? (get i) count-to-drop
							end-loop!
						else
							case!
								iter.next().done
									end-loop!
								else
									mod! i +[1]
				<~~ iter

	\ TODO: drop-while

region Combination
	zip.
		doc. "
			Seq of zipper applied to corresponding elements of @a and @b.
			Ends as soon as either of them does, discarding extra elements.
			(Corresponding means: with the same index.)
		test. |
			[ [ 1 2 ] [ 10 20 30 ] + ] -> => Stream [ 11 22 ]
		|@a:@ @b:@ zipper:Fun[2]
			Stream ~|
				iter-a = iterator @a
				iter-b = iterator @b
				loop!
					next-a = iter-a.next()
					case!
						next-a.done
							end-loop!
						else
							next-b = iter-b.next()
							case!
								next-b.done
									end-loop!
								else
									<~ zipper next-a.value next-b.value

	zip'.
		doc. "Type-preserving zip."
		test. |
			[ [ 1 2 ] [ 10 20 ] + ] -> [ 11 22 ]
		|@a:@ @b:@ zipper:Fun[2]
			=> (type-of @a) (zip @a @b zipper

region TODO: put somewhere
	groups-of.
		doc. "Seq of consecutive groups of `group-size` elements."
		test. |
			! seq=? [ [ 1 2 ] [ 3 4 ] ] (groups-of 2 [ 1 2 3 4 ])
			\ Throws away non-full groups
			! seq=? [ [ 1 2 3 ] ] (groups-of 3 [ 1 2 3 4 ])
			! seq=? [ [] [] [] ] (take (groups-of 0 [ 1 2 3 4 ]) 3)
		|:Seq[Array] group-size:Nat _
			case
				=? group-size 0
					\ TODO: repeat-forever [ ]
					Stream ~|
						loop!
							<~ [ ]
				else
					Stream ~|
						iter = iterator_
						loop! outer
							next-group = empty Array!
							loop!
								value done = iter.next()
								case!
									done
										end-loop! outer
									else
										++>! next-group [ value ]
										case! count next-group
											=? _ group-size
												end-loop!
											else
												()
							<~ freeze next-group

	reverse. Method
		doc. "Seq with the opposite order."
		test. |
			[ [ 1 2 ] ] -> [ 2 1 ]
		default. |:Array _
			(from-stream Array! _).reverse()

	split.
		doc. "Subseqs separated by elements where split? is true."
		test. |
			[ [ 1 0 1 ] =?[0] ] -> => Stream [ [ 1 ] [ 1 ] ]
			[ [ 0 ] =?[0] ] -> => Stream [ [] [] ]
		|_ split?:Pred
			Stream ~|
				iter = iterator_
				prev-idx = Ref! 0
				cur-idx = Ref! 0
				loop!
					value done = iter.next()
					~next-idx = + 1 (get cur-idx
					case!
						done
							<~ slice' _ (get prev-idx) (get cur-idx)
							end-loop!
						split? value
							<~ slice' _ (get prev-idx) (get cur-idx)
							set! prev-idx next-idx
							set! cur-idx next-idx
						else
							set! cur-idx next-idx

Seq
