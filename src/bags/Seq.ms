use
	.? -> get-or
	.Array
	.Array!
	..assert -> ! !not
	.Bag -> all? count iterator
	.Bag-Type -> from-stream
	..Bool -> and false not or true
	..Comparable -> =? <? <=? >=?
	..Comparable! -> <!
	..control -> if returning
	..Fun
	..math.Num -> Nat
	..methods -> => + - empty empty? freeze sub type-of
	..pred-types -> Any
	..Ref! -> get mod! ref set!
	.Seq! -> +>!
	.Stream -> streaming
	..Try -> fails? oh-no!
	..types.Interface
	..types.Method -> impl!
	..types.util -> self-type

Seq = Interface
	doc. "TODO"

<! Seq Bag

<! (self-type Seq) Bag-Type
impl! empty (self-type Seq) |
	empty Array

region Search
	seq=?.
		doc. "
			Whether two Seqs share the same elements in the same order.
			The types of the Seqs do not matter.
			Equivalent to `=? (=> Array seq-0) (=> Array seq-1)`
		test. |
			s = streaming ~|
				<~ 1
			! seq=? s [ 1 ]
			!not seq=? s [ 2 ]
		|seq-0:Bag seq-1:Bag
			\ TODO:PERF Don't check counts up front, do it while zipping
			and (=? (count seq-0) (count seq-1)) ~(all? (zip seq-0 seq-1 =?))

	?first. Method
		doc. "TODO"
		test. |
			[ [ 0 ] ] -> => ? [ 0 ]
			[ [] ] -> empty ?
		default. |:Any _
			?nth _ 0

	?last. Method
		doc. "TODO"
		test. |
			"TODO"
		default. |:Any _
			?nth _ (- count_ 1)

	?nth. Method
		doc. |:Any _ n:Nat
			"`n`th element in iteration order. 0th is the first."
		test. |
			[ [ 0 1 ] 1 ] -> => ? [ 1 ]
			[ [ 0 1 ] 2 ] -> empty ?
		default. |_ n:Nat
			iter = iterator_
			i = ref 0
			\ TODO:SYNTAX Loop return value
			ans = ref (empty ?
			loop!
				value done = iter.next ()
				case!
					done
						end-loop!
					=? (get i) n
						set! ans (=> ? [ value ]
						end-loop!
					else
						mod! i +[1]
			get ans

	impl! sub Seq
		doc. "TODO"
		test. |
			! =? [ 0 1 ][1] 1
			! fails? |
				[ 0 1 ][2]
		|_ n:Nat
			get-or (?nth _ n) ~(oh-no! "No element at index {n} for {_}")

region Update
	?<pop. Method
		doc. "TODO"
		test. |
			[ [ ] ] -> => ? [ ]
			[ [ 0 ] ] -> => ? [ [ ] ]
			[ [ 0 1 ] ] -> => ? [ [ 1 ] ]
		default. |:Bag _
			if (not empty?_) |
				<pop_

	?pop>. Method
		doc. "TODO"
		test. |
			[ [ ] ] -> => ? [ ]
			[ [ 0 ] ] -> => ? [ [ ] ]
			[ [ 0 1 ] ] -> => ? [ [ 0 ] ]
		default. |:Bag _
			if (not empty?_) |
				pop>_

	<pop. Method
		doc. "TODO"
		test. |
			[ [ ] ] -> []
			[ [ 0 ] ] -> []
			[ [ 0 1 ] ] -> [ 1 ]
		default. |:Bag _
			drop _ 1

	pop>. Method
		doc. "TODO"
		test. |
			"TODO"
		default. |:Bag _
			take _ (- count_ 1)

	?slice.
		doc. "TODO"
		test. |
			"TODO"
		|:?[Bag] _ start:Nat end:Nat
			if (and (>=? end start) ~(<=? end count_))
				slice _ start end

	slice. Method
		doc. "
			Bag containing the elements from index start (inclusive) to end (exclusive).
			Takes as much as possible.
			Result length should be - end start, unless `end` was past the end.

		test. |
			[ [ 0 1 2 3 ] 1 3 ] -> [ 1 2 ]

		default. |:Bag _ start:Nat end:Nat
			from-stream type-of_ (take (drop _ start) (- end start)

	take. Method
		doc. "TODO"
		test. |
			"TODO"
		default. |:Bag _ count-to-take:Nat
			from-stream type-of_ (streaming ~|
				iter = iterator_
				i = ref 0
				loop!
					case!
						=? (get i) count-to-take
							end-loop!
						else
							value done = iter.next ()
							case!
								done
									end-loop!
								else
									<~ value
									mod! i +[1]

	drop. Method
		doc. "TODO"
		test. |
			"TODO"
		default. |:Bag _ count-to-drop:Nat
			from-stream type-of_ (streaming ~|
				iter = iterator_
				i = ref 0
				loop!
					case!
						=? (get i) count-to-drop
							end-loop!
						else
							case!
								(iter.next ()).done
									end-loop!
								else
									mod! i +[1]
				<~~ iter

	tail. Method
		doc. "TODO"
		test. |
			"TODO"
		default. |_
			drop _ 1

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

region TODO: put somewhere
	groups-of.
		doc. "TODO"
		test. |
			! seq=? [ [ 1 2 ] [ 3 4 ] ] (groups-of 2 [ 1 2 3 4 ])
			\ Throws away non-full groups
			! seq=? [ [ 1 2 3 ] ] (groups-of 3 [ 1 2 3 4 ])
			! seq=? [ [] [] [] ] (take (groups-of 0 [ 1 2 3 4 ]) 3)
		|:Seq group-size:Nat _
			case
				=? group-size 0
					\ TODO: repeat-forever [ ]
					streaming ~|
						loop!
							<~ [ ]
				else
					streaming ~|
						iter = iterator_
						loop! outer
							next-group = empty Array!
							loop!
								value done = iter.next ()
								case!
									done
										end-loop! outer
									else
										+>! next-group [ value ]
										case! count next-group
											=? _ group-size
												end-loop!
											else
												()
							<~ freeze next-group

	reverse. Method
		doc. "TODO"
		test. |
			[ [ 1 2 ] ] -> [ 2 1 ]
		default. |_
			arr = => Array _
			reverse-stream = streaming ~|
				i = ref (count arr)
				loop!
					case!
						=? (get i) 0
							end-loop!
						else
							mod! i |_
								- _ 1
							<~ arr[(get i)]
			from-stream type-of_ reverse-stream

region Sorting
	sorted?.
		doc. "Whether the list is already in sorted order."
		test. |
			[ [ ] ] -> true
			[ [ 1 2 3 ] ] -> true
			[ [ 3 2 1 ] ] -> false
		|seq:Bag
			case ?first seq
				empty?_
					true
				else
					prev = ref _.val
					all? (tail seq) |em
						returning (<? (get prev) em) |
							set! prev em

	\ TODO: sort, sort-by

Seq
