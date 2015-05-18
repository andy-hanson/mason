use
	..Boolean and not
	..compare =?
	..Function Action identity Pred
	..js defined? id=?
	..math.methods +
	..private.bootstrap msDef
	..Type.Type => contains? type-of
	..Type.Kind
	..Type.Method _ impl!
	..Type.Pred-Type Any Opt
use~
	..control opr
	# TODO: Try eager use
	..math.Number Nat
	.@! --!
	.@-Type empty
	.?
	.Seq.Seq first seq=? tail
	.Seq.Stream
	.Set.Set!
use-debug
	..control build
	..! _ !not
	..math.Number divisible?
	..Try fails?
	.@-Type
	.Map.Weak-Id-Map!

@ = Kind
	doc. "
		"Bag". Contains a variable number of elements. Most things implementing `iterator` should be @s.
		If the iteration order of an @ is meaningful and `+ a b` is the concatenation, it is a Seq.
		If an @ only stores a given element once, it is a Set.
	implementor-test. |@-type
		if! (not (=? @-type Weak-Id-Map!))
			! (contains? @-Type @-type) "Be sure to make your @ type a @-Type."
			_ = empty @-type
			! empty? _

iterator. Method
	doc. "Creates a new Generator! which yields the values in the @."
	args. 1
msDef "iterator" iterator

empty?. Method
	doc. "Whether `count` is 0. Often much faster."
	test. |
		[ [ ] ] -> true
		[ [ 1 ] ] -> false
	args. 1
	default. |_
		iterator_.next().done

region Using iterator
	impl! contains? @
		doc. "Whether one of the elements =? em."
		test. |
			! contains? [ 0 ] 0
			!not contains? [ 0 ] 1
		|_ em:Any
			any? _ |em-compare
				=? em em-compare

	fold.
		doc. "
			Keeps a state variable `acc` and keeps applying `folder acc em` for the elements, in order.
			Returns the final value.
			If empty?_, fails unless a `start` value for `acc` is provided. Otherwise `acc` starts as the first element.
		test. |
			[ [ 1 2 3 ] + ] -> 6
			[ [ 1 2 3 ] 4 + ] -> 10
		|_:@ b c
			start rest folder = case
				defined? c
					start. b
					folder. c
					rest. _
				else
					start. first_
					folder. b
					rest. tail_

			acc ::= start
			iter = iterator rest
			loop!
				value done = iter.next()
				case!
					done
						end-loop!
					else
						acc := folder acc value
			acc

	each!. Method
		doc. "Calls do-for-each on every element in the @, in order."
		test. |
			! =? [ 1 2 3 ] (build |yield
				each! [ 1 2 3 ] yield
		args. 2
		default. |_ do-for-each:Action
			iter = iterator_
			loop!
				value done = iter.next()
				case!
					done
						end-loop!
					else
						do-for-each value

	any?.
		doc. "Whether pred? is true for at least one element."
		test. |
			[ [ 0 1 ] =?[1] ] -> true
			[ [ 0 1 ] =?[2] ] -> false
		|_:@ ?pred?:Opt[Pred]
			pred? = opr ?pred? identity
			not (empty? (?find _ pred?

	all?.
		doc. "Whether pred? is true for every element."
		test. |
			[ [ 0 0 ] =?[0] ] -> true
			[ [ 0 1 ] =?[0] ] -> false
		|_:@ ?pred?:Opt[Pred]
			pred? = opr ?pred? identity
			empty? (?find _ |em
				not (pred? em

	?find.
		doc. "
			First element for which pred? is true.
			(To find all, use `keep`.)
		test. |
			[ [ 0 1 ] =?[1] ] -> ? 1
			[ [ 0 ] =?[1] ] -> empty ?
		|_ pred?:Pred
			iter = iterator_
			# TODO:SYNTAX Return from loop
			found ::= empty ?
			loop!
				value done = iter.next()
				case!
					done
						end-loop!
					pred? value
						found := ? value
						end-loop!
					else
						pass
			found

	count. Method
		doc. "Number of elements."
		test. |
			[ [ ] ] -> 0
			[ [ 1 2 3 ] ] -> 3
		args. 1
		default. |:Nat _:@
			fold _ 0 +[1]

region Lazy functions, and their eager versions.
	# Eager versions are Methods if certain types can do them faster.
	keep. Method
		doc. "Only the elements that satisfy `keep-if?`."
		test. |
			[ [ 1 2 ] =?[2] ] -> [ 2 ]
		args. 2
		default. |_:@ keep-if?:Pred
			=> type-of_ (keep' _ keep-if?

	keep'.
		doc. "Lazy keep."
		test. |
			[ [ 1 2 ] =?[2] ] -> => Stream [ 2 ]
		|_:@ keep-if?:Pred
			Stream ~|
				iter = iterator_
				loop!
					value done = iter.next()
					case!
						done
							end-loop!
						keep-if? value
							<~ value
						else
							pass

	# TODO: Method
	map.
		doc. "TODO"
		test. |
			[ [ true false ] not ] -> [ false true ]
		|_:@ mapper:Function
			=> type-of_ (map' _ mapper

	map'.
		doc. "Lazy map."
		test. |
			[ [ true false ] not ] -> => Stream [ false true ]
		|_:@ mapper:Function
			Stream ~|
				iter = iterator_
				loop!
					value done = iter.next()
					case!
						done
							end-loop!
						else
							<~ mapper value


	# TODO: Preserve type as long as it is not Stream or Lazy-Stream?
	fold-map.
		doc. "
			Performs a map while also carrying some state from one element to the next.
			`mapper-folder` takes in the state and the element,
			and produces `here` (the mapped value) and `next` (the next state value).
			Unlike map, this must be eagerly evaluated, like fold.
		test. |
			f = |acc em
				here. + 1 em
				next. + 1 acc
			[ [ 1 2 3 ] 0 f ] ->
				mapped. [ 2 3 4 ]
				folded. 3
		|_:@ start:Any mapper-folder:Function[2 Object]
			acc ::= start
			mapped. => Array (map _ |em
				here:Any next:Any = mapper-folder acc em
				acc := next
				here
			folded. acc

	# TODO: Better name?
	flat-map. Method
		doc. "Like `map`, but each mapping produces multiple values."
		test. |
			f = |a
				[ a a ]
			[ [ 1 2 ] f ] -> [ 1 1 2 2 ]
		args. 2
		default. |_ mapper:Function[Any @]
			=> type-of_ (flat-map' _ mapper

	flat-map'.
		doc. "Lazy flat-map."
		test. |
			f = |case
				divisible? _ 2
					[ _ _ ]
				else
					[ _ ]
			[ [ 1 2 3 4 ] f ] -> => Stream [ 1 2 2 3 4 4 ]
		args. 2
		|_:@ mapper:Function[Any @]
			# Same as `flatten (map _ mapper)`, but with smaller stacktrace.
			Stream ~|
				iter = iterator_
				loop!
					value done = iter.next()
					case!
						done
							end-loop!
						else
							<~~ iterator (mapper value


	flatten. Method
		doc. "
			For an @ containing many @, produces an @ containing all of their entries combined.
			This does *not* consider more than 1 nested level, and there *every* element of _ must be an @.
			More efficient than `fold + _`.
		test. |
			[ [ [ 1 2 ] [ 3 ] [ ] ] ] -> [ 1 2 3 ]
		args. 2
		default. |_
			=> type-of_ flatten'_

	flatten'.
		doc. "Lazy flatten."
		test. |
			[ [ [ 1 2 ] [ 3 ] [ ] ] ] -> => Stream [ 1 2 3 ]
			# Ignores further nested @s.
			[ [ [ 1 ] [ [ 2 ] ] ] ] -> => Stream [ 1 [ 2 ] ]
			# Must be at least one nested level
			! fails? |
				=> Array (flatten [ [ 1 ] 2 [ 3 ] ]
		|_:@[@]
			Stream ~|
				iter = iterator_
				loop!
					value done = iter.next()
					case!
						done
							end-loop!
						else
							<~~ iterator value


	++. Method
		doc. "Type-preserving +."
		test. |
			[ [ 0 ] [ 1 ] ] -> [ 0 1 ]
		args.
			. [ "@a" @
			. [ "@b" @
		default. |@a @b
			=> (type-of @a) (++' @a @b

	++'.
		doc. "Concatenation. Sets should override this."
		test. |
			[ [ 0 ] [ 1 ] ] -> => Stream [ 0 1 ]
		|:Stream @a @b
			Stream ~|
				<~~ iterator @a
				<~~ iterator @b

	# TODO: Move to Set?
	--. Method
		doc. "
			@ without any of the elements in `remove`.
			Removes the *first* occurrence of each element.
		test. |
			[ [ 1 2 1 ] [ 1 ] ] -> [ 2 1 ]
		args.
			. "_"
			. [ "@remove" @
		default. |_ @remove
			=> type-of_ (--' _ @remove

	--'.
		doc. "Lazy --."
		test. |
			[ [ 1 2 1 ] [ 1 ] ] -> => Stream [ 2 1 ]
		|:@ _ @remove:@
			Stream ~|
				iter = iterator_
				@remove-remaining = => Set! @remove
				loop!
					value done = iter.next()
					case!
						done
							end-loop!
						else
							case! value
								:@remove-remaining
									# TODO: -!
									--! @remove-remaining [ value ]
								else
									<~ value


	impl! =? @
		test. |
			! =? [ 1 ] [ 1 ]
		|@a @b
			and (id=? (type-of @a) (type-of @b)) ~(seq=? @a @b

@
