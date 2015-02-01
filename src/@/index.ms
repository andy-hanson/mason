use
	..Bool _ and not
	..Comparable =? <?
	..Fun _ Act identity Pred
	..js reference=?
	..methods => + - -! contains? empty empty?
	..Obj
	..Symbol
	..Type type-of
	..Type.Kind
	..Type.Method _ impl!
	..Type.Pred-Type Any Opt
use~
	..Generator!
	..math.Num Nat
	..Ref! _ get mod! set!
	.? _ get-or Opt->?
	.Array
	.Hash-Set!
	.Seq seq=?
	.Stream
debug use~
	.@-Type
	..Bool false true
	..! _ !not
	..math.Num divisible?

@. Kind
	doc. "TODO"
	implementor-test. |@-type
		! (contains? @-Type @-type) "Be sure to make your @ type a @-Type."
		_ = empty @-type
		! empty? _

iterator. Method
	doc. |:Generator! _
		"Creates a new Generator! which yields the values in the @. Should create a new one every time."
	symbol. Symbol.iterator

region Using iterator
	impl! contains? @
		doc. "TODO"
		test. |
			! contains? [ 0 ] 0
			!not contains? [ 0 ] 1
		|_ em:Any
			any? _ |em-compare
				=? em em-compare

	fold.
		doc. "TODO"
		test. |
			[ [ 1 2 3 ] 4 + ] -> 10
		|_:@ start:Any folder:Fun[2]
			acc = Ref! start
			each! _ |em
				mod! acc |x
					folder x em
			get acc

	each!. Method
		doc. "Calls do-for-each on every element in the @."
		test. |
			"TODO"
		default. |_ do-for-each:Act
			\ TODO:ES6 `for (let value of _)`
			iter = iterator_
			loop!
				value done = iter.next ()
				case!
					done
						end-loop!
					else
						do-for-each value

	any?.
		doc. "TODO"
		test. |
			! any? [ 0 1 ] =?[1]
			!not any? [ 0 1 ] =?[2]
		|_:@ pred:Opt[Pred]
			\ TODO:SYNTAX Optional args
			p = get-or (Opt->? pred) identity
			not (empty? (keep _ p

	all?.
		doc. "TODO"
		test. |
			! all? [ 0 0 ] =?[0]
			!not all? [ 0 1 ] =?[0]
		|_:@ pred:Opt[Pred]
			\ TODO:SYNTAX Optional args
			p = get-or (Opt->? pred) identity
			not (any? _ |em
				not (p em)

	?find.
		doc. "TODO"
		test. |
			"TODO"
		|_ pred:Pred
			iter = iterator_
			\ TODO:SYNTAX Return from loop
			found = Ref! (empty ?
			loop!
				value done = iter.next ()
				case!
					done
						end-loop!
					pred value
						set! found (? value
						end-loop!
					else
						()
			get found

	count. Method
		doc. "Number of elements in it."
		test. |
			"TODO"
		default. |:Nat _:@
			fold _ 0 +[1]

	impl! empty? @
		doc. "Whether `count` will return 0."
		test. |
			"TODO"
		|:Bool _
			(iterator_.next ()).done

region Using from-stream
	keep. Method
		doc. "@ with only the elements that satisfy `keep-if?`."
		test. |
			[ [ 1 2 ] =?[2] ] -> => Stream [ 2 ]
		default. |_:@ keep-if?:Pred
			Stream ~|
				iter = iterator_
				loop!
					value done = iter.next ()
					case!
						done
							end-loop!
						keep-if? value
							<~ value
						else
							()

	map. Method
		doc. "TODO"
		test. |
			[ [ true false ] not ] -> => Stream [ false true ]
		default. |_:@ mapper:Fun
			Stream ~|
				iter = iterator_
				loop!
					value done = iter.next ()
					case!
						done
							end-loop!
						else
							<~ mapper value

	map'.
		doc. "TODO"
		test. |
			"TODO"
		|_:@ mapper:Fun
			=> type-of_ (map _ mapper

	fold-map.
		doc. "
			Since this is also a fold, it eagerly evaluates streams.
		test. |
			f = |acc em
				here. + 1 em
				next. + 1 acc
			[ [ 1 2 3 ] 0 f ] ->
				mapped. [ 2 3 4 ]
				folded. 3
		|_:@ start:Any mapper-folder:Fun[2 Obj]
			acc = Ref! start
			mapped. => Array (map _ |em
				here:Any next:Any = mapper-folder (get acc) em
				set! acc next
				here
			folded. get acc

	\ TODO: Better name?
	flat-map. Method
		doc. "TODO"
		test. |
			f = |case
				divisible? _ 2
					[ _ _ ]
				else
					[ _ ]
			[ [ 1 2 3 4 ] f ] -> => Stream [ 1 2 2 3 4 4 ]
		default. |_ mapper:Fun[Any @]
			flatten (map _ mapper

	\ TODO: Just use variadic `+`
	flatten.
		doc. "TODO"
		test. |
			"TODO"
		|_:@[@]
			Stream ~|
				iter = iterator_
				loop!
					value done = iter.next ()
					case!
						done
							end-loop!
						else
							flat-mapped:@ = value
							<~~ iterator flat-mapped

	impl! + @
		doc. "TODO"
		test. |
			[ [ 0 ] [ 1 ] ] -> [ 0 1 ]
		|:@ _ add:@
			Stream ~|
				<~~ iterator_
				<~~ iterator add \+=> type-of_ _ add

	impl! - @
		doc. "
			@ with the *first* instances of each in `remove` taken out.
			Most efficient for Sets.
		test. |
			[ [ 1 2 1 ] [ 1 ] ] -> [ 2 1 ]
		|:@ _ remove:@
			Stream ~|
				iter = iterator_
				remove-us = => Hash-Set! remove
				loop!
					value done = iter.next ()
					case!
						done
							end-loop!
						else
							case! value
								:remove-us
									-! remove-us [ value ]
								else
									<~ value

region Unsorted
	impl! =? @
		test. |
			! =? [ 1 ] [ 1 ]
		|a b
			and (reference=? (type-of a) (type-of b)) ~(seq=? a b

	max-by.
		doc. "TODO"
		test. |
			[ [ "five" "six" "seven" ] "" count ] -> "seven"
		|_:@ default:Any by:Fun
			max-val = Ref! default
			fold _ (by default) |cur-max-by em
				em-by = by em
				case
					<? cur-max-by em-by
						set! max-val em
						em-by
					else
						cur-max-by
			get max-val

	\ TODO: Method, specialize on Sorted-Set
	max.
		doc. "TODO"
		test. |
			"TODO"
		|_:@ default:Any
			max-by _ default identity

	\ TODO: min method, specialize on Sorted-Set


@
