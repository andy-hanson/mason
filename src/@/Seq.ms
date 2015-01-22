use
	..@ -> all? count iterator
	.@-Type -> from-stream
	..Bool -> and false not or true
	..Comparable -> compare =? <? <=? >=?
	..Comparable! -> <!
	..control -> if returning
	..Fun -> identity Pred
	..js -> defined?
	..methods -> => + - empty empty? freeze sub
	..pred-types -> Any Opt
	..Str -> indent
	..types.Interface
	..types.Method -> impl!
	..types.util -> self-type type-of
use~
	..! -> !not
	.? -> get-or Opt->?
	.Array
	.Array!
	..math.Num -> Nat
	..Ref! -> get mod! ref set!
	.Seq! -> +>!
	..show
	.Stream
	..Try -> fails? oh-no!

Seq = Interface
	doc. "TODO"

<! Seq @

<! (self-type Seq) @-Type
impl! empty (self-type Seq) |
	empty Array

region Search
	seq=?.
		doc. "
			Whether two Seqs share the same elements in the same order.
			The types of the Seqs do not matter.
			Equivalent to `=? (=> Array seq-0) (=> Array seq-1)`
		test. |
			s = Stream ~|
				<~ 1
			! seq=? s [ 1 ]
			!not seq=? s [ 2 ]
		|seq-0:@ seq-1:@
			\ TODO:PERF Don't check counts up front, do it while zipping
			and (=? (count seq-0) (count seq-1)) ~(all? (zip seq-0 seq-1 =?))

	?first. Method
		doc. "TODO"
		test. |
			[ [ 0 ] ] -> ? 0
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
			[ [ 0 1 ] 1 ] -> ? 1
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
						set! ans (? value
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
			get-or (?nth _ n) ~
				oh-no! "
					No element at index {n} for
						{indent (show _}

region Update
	?<pop. Method
		doc. "TODO"
		test. |
			[ [ ] ] -> empty ?
			[ [ 0 ] ] -> ? [ ]
			[ [ 0 1 ] ] -> ? [ 1 ]
		default. |:@ _
			if (not empty?_) |
				<pop_

	?pop>. Method
		doc. "TODO"
		test. |
			[ [ ] ] -> empty ?
			[ [ 0 ] ] -> ? [ ]
			[ [ 0 1 ] ] -> ? [ 0 ]
		default. |:@ _
			if (not empty?_) |
				pop>_

	<pop. Method
		doc. "TODO"
		test. |
			[ [ ] ] -> []
			[ [ 0 ] ] -> []
			[ [ 0 1 ] ] -> [ 1 ]
		default. |:@ _
			drop _ 1

	pop>. Method
		doc. "TODO"
		test. |
			"TODO"
		default. |:@ _
			take _ (- count_ 1

	?slice.
		doc. "TODO"
		test. |
			"TODO"
		|:?[@] _ start:Nat end:Nat
			if (and (>=? end start) ~(<=? end count_))
				slice _ start end

	slice. Method
		doc. "
			The elements from index start (inclusive) to end (exclusive).
			Takes as much as possible.
			Result length should be - end start, unless `end` was past the end.

		test. |
			[ [ 0 1 2 3 ] 1 3 ] -> [ 1 2 ]

		default. |:@ _ start:Nat end:Nat
			from-stream type-of_ (take (drop _ start) (- end start)

	take. Method
		doc. "TODO"
		test. |
			"TODO"
		default. |:@ _ count-to-take:Nat
			from-stream type-of_ (Stream ~|
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

	take-while.
		doc. "TODO"
		test. |
			[ [ 1 2 -1 3 ] <?[0] ] -> [ 1 2 ]
		|:@ _ while:Pred
			from-stream type-of_ (Stream ~|
				iter = iterator_
				loop!
					value:Any done = iter.next ()
					case!
						done
							end-loop!
						while value
							<~ value
						else
							end-loop!

	drop. Method
		doc. "TODO"
		test. |
			"TODO"
		default. |:@ _ count-to-drop:Nat
			from-stream type-of_ (Stream ~|
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

	\ TODO: drop-while

	tail. Method
		doc. "TODO"
		test. |
			"TODO"
		default. |_
			drop _ 1

region Combination
	\ TODO: Variadic
	\ TODO: Builder? (whose?)
	zip. |s0:@ s1:@ zipper:Fun[2]
		Stream ~|
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
					Stream ~|
						loop!
							<~ [ ]
				else
					Stream ~|
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
			reverse-stream = Stream ~|
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
		doc. "Whether it is already in sorted order."
		test. |
			[ [ ] ] -> true
			[ [ 1 2 3 ] ] -> true
			[ [ 3 2 1 ] ] -> false
			[ [ "six" "five" "seven" ] count ] -> true
		|seq:Seq sort-by:Opt[Fun]
			\ TODO:SYNTAX Optional args
			sb = get-or (Opt->? sort-by) identity
			case ?first seq
				empty?_
					true
				else
					\ TODO: Use `sliding`
					prev = ref _.val
					all? (tail seq) |em
						returning (<? (sb (get prev)) (sb em)) |
							set! prev em

	sort. Method
		doc. "
			Puts the elements in sorted order.
			Order is determined by calling `compare`.
			Optional `sort-by` determines an attribute of elements to be compared.
		test. |
			[ [ 3 2 1 ] ] -> [ 1 2 3 ]
			[ [ "five" "six" "seven" ] count ] -> [ "six" "five" "seven" ]
		default. |_:@ sort-by:Opt[Fun]
			sort=> type-of_ _ sort-by

	\ KLUDGE: because others are so slow...
	impl! sort Str |_ sort-by:Opt[Fun]
		case
			defined? sort-by
				sort.default sort _ sort-by
			else
				((_.split "").sort ()).join ""

	sort=>.
		|Res-Type:@-Type _:@ sort-by:Opt[Fun]
			\ TODO:SYNTAX Optional args
			sb = get-or (Opt->? sort-by) identity
			arr = => Array! _
			arr.sort |a b
				compare (sb a) (sb b)
			=> Res-Type arr

Seq
