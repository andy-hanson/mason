use
	...compare =?
	...Function Pred
	...math.methods - +
	...methods freeze sub
	...String indent
	...Type.Kind _ kind! self-kind!
	...Type.Method _ impl! self-impl!
	...Type.Type => type-of
	..@ _ ++ count empty? iterator
	..@-Type _ empty from-stream
use~
	...math.Number Nat
	...show
	..? Opt->? un-?
	.Stream
use-debug
	...compare <?
	...Try fails?
	..?

Seq. Kind
	doc. "@ whose values are in a meaningful order."

kind! Seq @

self-kind! Seq @-Type
self-impl! empty Seq |
	[ ]

region TODO
	# TODO: Review name...
	<++'. new Method
		doc. "
			TODO:REST
			(There is no `++>'` because `++` by default adds to the right for Seqs.)
		test. !|
			pass # TODO
		args. 2
		default. .|left-added:@
			=> (type-of this) (++ left-added this)

region Very first and last
	first.
		doc. "First value in iteration order."
		test. |
			[ [ 1 2 ] ] -> 1
			assert! fails? |
				first [ ]
		|_
			un-? ?first_ "Can not take first of empty."

	?first. new Method
		doc. "First value in iteration order, if non-empty."
		test. |
			[ [ 1 2 ] ] -> ? 1
			[ [ ] ] -> empty ?
		args. 1
		default. .|
			?nth this 0

	last.
		doc. "Last value in iteration order."
		test. |
			[ [ 1 2 ] ] -> 2
			assert! fails? |
				last [ ]
		args. 1
		|_
			un-? ?last_ "Can not take last of empty."

	?last. new Method
		doc. "Last value in iteration order, if non-empty."
		test. |
			[ [ 1 2 ] ] -> ? 2
			[ [ ] ] -> empty ?
		args. 1
		default. .|
			unless empty? this
				this[(- (count this) 1)]

	tail. new Method
		doc. "
			All elements but the first.
			TODO: Eager for Linked-Lists.
		test. |
			[ [ 1 2 ] ] -> [ 2 ]
			[ [ ] ] -> [ ]
		args. 1
		default. .|
			case this
				empty?_
					_
				else
					drop _ 1

	rtail. new Method
		doc. "
			All elements but the last.
			TODO: Eager for finger trees.
		test. |
			[ [ 1 2 ] ] -> [ 1 ]
			[ [ ] ] -> [ ]
		args. 1
		default. .|
			case this
				empty?_
					_
				else
					take _ (- count_ 1)

region Search
	seq=?.
		doc. "
			Whether two @s share the same elements in the same order.
			The types of the @s do not matter.
			Equivalent to `=? (=> Array @a) (=> Array @b)`, but may not have to fully unlazy both.
		test. !|
			s = Stream ~!|
				<~ 1
			assert! seq=? s [ 1 ]
			forbid! seq=? s [ 2 ]
		|@a:@ @b:@
			iter-a = iterator @a
			iter-b = iterator @b
			for
				next-a = iter-a.next()
				next-b = iter-b.next()
				case!
					next-a.done
						break next-b.done
					next-b.done
						break false
					=? next-a.value next-b.value
						pass
					else
						break false

	?nth. new Method
		doc. "
			|_ n:Nat
			`n`th element in iteration order, if there are at least that many values.
			0th is the first."
		test. |
			[ [ 0 1 ] 1 ] -> ? 1
			[ [ 0 1 ] 2 ] -> empty ?
		args.
			. "_"
			. [ "n" Nat
		default. .|n
			i ::= 0
			# TODO:SYNTAX for-else
			Opt->? for elem in this
				case! elem
					=? i n
						break _
					else
						# TODO: Incr
						i := + 1 i

	impl! sub Seq
		doc. "Nth value in iteration order."
		test. !|
			assert! =? [ 0 1 ][1] 1
			assert! fails? |
				[ 0 1 ][2]
		.|n:Nat
			un-? (?nth this n) ~"
				No element at index {n} for
					{indent (show this)}

region Update
	slice-args =
		. "_"
		. [ "start" Nat
		. [ "end" Nat

	slice. new Method
		doc. "
			The elements from index start (inclusive) to end (exclusive).
			Takes as much as possible.
			Result length should be - end start, unless `end` was past the end.
		test. |
			[ [ 0 1 2 3 ] 1 3 ] -> [ 1 2 ]
		args. slice-args
		default. .|start end
			=> (type-of this) (slice' this start end)

	slice'.
		doc. "Lazy slice."
		test. |
			[ [ 0 1 2 3 ] 1 3 ] -> => Stream [ 1 2 ]
		args. slice-args
		|:@ _ start end
			take' (drop' _ start) (- end start

	take. new Method
		doc. "TODO"
		args.
			. "_"
			. [ "count-to-take" Nat
		default. .|count-to-take
			=> (type-of this) (take' this count-to-take)

	take'.
		doc. "Stream including only the first count-to-take elements."
		test. |
			[ [ 0 1 2 ] 2 ] -> => Stream [ 0 1 ]
			# OK if not enough to satisfy count-to-take
			[ [ 0 ] 2 ] -> => Stream [ 0 ]
			_ = [ 0 1 2 3 4 ]
			assert! seq=? _ (++ (take' _ 2) (drop' _ 2
		|_ count-to-take:Nat
			# TODO:SYNTAX @for~
			case
				=? 0 count-to-take
					empty Stream
				else
					Stream ~!|
						n ::= count-to-take
						for! elem in _
							<~ elem
							n := - n 1
							if! =? 0 n
								break!

	# TODO: eager version

	take-while'.
		doc. "Stream stopping (and not including) the first element not satisfying while?."
		test. |
			[ [ 1 2 -1 3 ] <?[0] ] -> => Stream [ 1 2 ]
		|_ while?:Pred
			# TODO:SYNTAX @for~
			Stream ~!|
				for! elem in _
					unless! while? elem
						break!
					<~ elem

	drop. new Method
		doc. "TODO"
		args.
			. "_"
			. [ "count-to-drop" Nat
		default. .|count-to-drop
			=> (type-of this) (drop' this count-to-drop)

	drop'.
		doc. "Stream without the first count-to-drop elements."
		test. |
			[ [ 0 1 2 3 ] 2 ] -> => Stream [ 2 3 ]
		|_ count-to-drop
			# TODO:SYNTAX @for~
			Stream ~!|
				iter = iterator_
				i ::= 0
				for!
					if! =? i count-to-drop
						break!
					if! iter.next().done
						break!
					i := + 1 i
				<~~ iter

	# TODO: drop-while'

region Combination
	zip.
		doc. "Type-preserving zip."
		test. |
			[ [ 1 2 ] [ 10 20 ] + ] -> [ 11 22 ]
		|@a:@ @b:@ zipper:Function[2]
			=> (type-of @a) (zip' @a @b zipper

	zip'.
		doc. "
			Seq of zipper applied to corresponding elements of @a and @b.
			Ends as soon as either of them does, discarding extra elements.
			(Corresponding means: with the same index.)
		test. |
			[ [ 1 2 ] [ 10 20 30 ] + ] -> => Stream [ 11 22 ]
		|@a:@ @b:@ zipper:Function[2]
			# TODO:SYNTAX @for~
			Stream ~!|
				iter-a = iterator @a
				iter-b = iterator @b
				for!
					next-a = iter-a.next()
					if! next-a.done
						break!
					next-b = iter-b.next()
					if! next-b.done
						break!
					<~ zipper next-a.value next-b.value

region TODO: put somewhere
	groups-of'.
		doc. "Seq of consecutive groups of `group-size` elements."
		test. !|
			assert! seq=? [ [ 1 2 ] [ 3 4 ] ] (groups-of' 2 [ 1 2 3 4 ])
			# Tosses off partial group at end (e.g. no [ 4 ])
			assert! seq=? [ [ 1 2 3 ] ] (groups-of' 3 [ 1 2 3 4 ])
			assert! seq=? [ [] [] [] ] (take' (groups-of' 0 [ 1 ]) 3)
		|:Seq[Array] group-size:Nat _
			case
				=? group-size 0
					# TODO: repeat-forever [ ]
					Stream ~!|
						for!
							<~ [ ]
				else
					Stream ~!|
						iter = iterator_
						for!
							next-group = [ ]
							for!
								value done = iter.next()
								if! done
									break!
								++>! next-group [ value ]
								if! =? group-size (count next-group)
									break!
							unless! =? group-size (count next-group)
								break!
							# TODO: Really freeze?
							<~ freeze next-group

	# TODO: reverse'?
	reverse. new Method
		doc. "Seq with the opposite order."
		test. |
			[ [ 1 2 ] ] -> [ 2 1 ]
		args. 1
		default. .|
			(from-stream Array this).reverse()

	split'.
		doc. "Subseqs separated by elements where split? is true."
		test. |
			[ [ 1 0 1 ] =?[0] ] -> => Stream [ [ 1 ] [ 1 ] ]
			[ [ 0 ] =?[0] ] -> => Stream [ [] [] ]
		|_ split?:Pred
			# TODO: Allocate current group; don't wait to call slice.
			Stream ~!|
				iter = iterator_
				prev-idx ::= 0
				cur-idx ::= 0
				for!
					value done = iter.next()
					~next-idx = + 1 cur-idx
					case!
						done
							<~ slice _ prev-idx cur-idx
							break!
						split? value
							<~ slice _ prev-idx cur-idx
							prev-idx := next-idx
							cur-idx := next-idx
						else
							cur-idx := next-idx

region Mutator methods
	<++!. new Method
		doc. "Makes `_` into `+ added _`."
		args.
			. "_"
			. [ "added" @
	++>!. new Method
		doc. "Makes `_` into `+ _ added`."
		args.
			. "_"
			. [ "added" @

	?<pop!. new Method
		doc. "Takes one element off the left side, if not empty?."
		args. 1
		# TODO: returns. ?
	?pop>!. new Method
		doc. "Takes one element off the right side, if not empty?."
		args. 1
		# TODO: returns. ?

	set-nth!. new Method
		doc. "Makes `_[n]` be `val`."
		args.
			. "_"
			. [ "n" Nat
			. "val"
