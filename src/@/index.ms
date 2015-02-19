use
	..Bool _ and not
	..Fun _ Act identity Pred
	..js defined? reference=?
	..math.methods +
	..methods =? <?
	..Obj
	..Obj! p+!
	..private.bootstrap ms
	..Type => contains? type-of
	..Type.Kind
	..Type.Method _ impl!
	..Type.Pred-Type Any Opt
use~
	..control if if! opr Ref! get set!
	..Generator!
	..math.Num Nat
	.@! --!
	.@-Type empty
	.? _ un-?
	.Array
	.Seq first seq=? tail
	.Set!
	.Stream
debug use~
	..Bool false true
	..control build
	..! _ !not
	..math.Num divisible?
	..Try fails?
	.@-Type
	.Map.Weak-Identity-Map!

@. Kind
	doc. "
		"Bag". Contains a variable number of elements. Most things implementing `iterator` should be @s.
		If the iteration order of an @ is meaningful and `+ a b` is the concatenation, it is a Seq.
		If an @ only stores a given element once, it is a Set.
	implementor-test. |@-type
		if! (not (=? @-type Weak-Identity-Map!)) |
			! (contains? @-Type @-type) "Be sure to make your @ type a @-Type."
			_ = empty @-type
			! empty? _

iterator. Method
	doc. |:Generator! _
		"Creates a new Generator! which yields the values in the @. Should create a new one every time."

empty?. Method
	doc. "Whether `count` is 0. Often much faster."
	test. |
		[ [ ] ] -> true
		[ [ 1 ] ] -> false
	default. |:Bool _
		iterator_.next().done

\ TODO:ES6 Should not need this
p+! ms "iterator" iterator

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

			acc = Ref! start
			iter = iterator rest
			loop!
				value done = iter.next()
				case!
					done
						end-loop!
					else
						set! acc (folder (get acc) value
			get acc

	each!. Method
		doc. "Calls do-for-each on every element in the @, in order."
		test. |
			! =? [ 1 2 3 ] (build |yield
				each! [ 1 2 3 ] yield
		default. |_ do-for-each:Act
			\ TODO:ES6 `for (let value of _)`
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
			\ TODO:SYNTAX Return from loop
			found = Ref! (empty ?
			loop!
				value done = iter.next()
				case!
					done
						end-loop!
					pred? value
						set! found (? value
						end-loop!
					else
						()
			get found

	count. Method
		doc. "Number of elements."
		test. |
			[ [ ] ] -> 0
			[ [ 1 2 3 ] ] -> 3
		default. |:Nat _:@
			fold _ 0 +[1]

region Lazy functions, and their eager versions.
	\ Eager versions are Methods if certain types can do them faster.
	keep.
		doc. "Only the elements that satisfy `keep-if?`."
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
							()

	keep'. Method
		doc. "Type-preserving `keep`."
		test. |
			[ [ 1 2 ] =?[2] ] -> [ 2 ]
		default. |_:@ keep-if?:Pred
			=> type-of_ (keep _ keep-if?

	map.
		doc. "Stream with `mapper` applied indiviually to the original elements."
		test. |
			[ [ true false ] not ] -> => Stream [ false true ]
		|_:@ mapper:Fun
			Stream ~|
				iter = iterator_
				loop!
					value done = iter.next()
					case!
						done
							end-loop!
						else
							<~ mapper value

	map'.
		doc. "Type-preserving `map`."
		test. |
			[ [ true false ] not ] -> [ false true ]
		|_:@ mapper:Fun
			=> type-of_ (map _ mapper

	\ TODO: Preserve type as long as it is not Stream or Lazy-Stream?
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
		|_:@ start:Any mapper-folder:Fun[2 Obj]
			acc = Ref! start
			mapped. => Array (map _ |em
				here:Any next:Any = mapper-folder (get acc) em
				set! acc next
				here
			folded. get acc

	\ TODO: Better name?
	flat-map.
		doc. "Like `map`, but each mapping produces multiple values."
		test. |
			f = |case
				divisible? _ 2
					[ _ _ ]
				else
					[ _ ]
			[ [ 1 2 3 4 ] f ] -> => Stream [ 1 2 2 3 4 4 ]
		|_:@ mapper:Fun[Any @]
			\ Same as `flatten (map _ mapper)`, but with smaller stacktrace.
			Stream ~|
				iter = iterator_
				loop!
					value done = iter.next()
					case!
						done
							end-loop!
						else
							<~~ iterator (mapper value

	flat-map'. Method
		doc. "Type-preserving flat-map."
		test. |
			\ TODO:SYNTAX [ a | a a ]
			f = |a
				[ a a ]
			[ [ 1 2 ] f ] -> [ 1 1 2 2 ]
		default. |_ mapper:Fun[Any @]
			=> type-of_ (flat-map _ mapper

	flatten.
		doc. "
			For an @ containing many @, produces an @ containing all of their entries combined.
			This does *not* consider more than 1 nested level, and there *every* element of _ must be an @.
			More efficient than `fold + _`.
		test. |
			[ [ [ 1 2 ] [ 3 ] [ ] ] ] -> => Stream [ 1 2 3 ]
			\ Ignores further nested @s.
			[ [ [ 1 ] [ [ 2 ] ] ] ] -> => Stream [ 1 [ 2 ] ]
			\ Must be at least one nested level
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

	flatten'. Method
		doc. "Type-preserving flatten."
		test. |
			[ [ [ 1 2 ] [ 3 ] [ ] ] ] -> [ 1 2 3 ]
		default. |_
			=> type-of_ flatten_

	++.
		doc. "Concatenation. Sets should override this."
		test. |
			[ [ 0 ] [ 1 ] ] -> => Stream [ 0 1 ]
		|:Stream @a @b
			Stream ~|
				<~~ iterator @a
				<~~ iterator @b

	++'. Method
		doc. "Type-preserving +."
		test. |
			[ [ 0 ] [ 1 ] ] -> [ 0 1 ]
		default. |@a @b
			=> (type-of @a) (++ @a @b

	--.
		doc. "
			@ without any of the elements in `remove`.
			Removes the *first* occurrence of each element.
		test. |
			[ [ 1 2 1 ] [ 1 ] ] -> => Stream [ 2 1 ]
		|:@ _ remove:@
			Stream ~|
				iter = iterator_
				remove-us = => Set! remove
				loop!
					value done = iter.next()
					case!
						done
							end-loop!
						else
							case! value
								:remove-us
									--! remove-us [ value ]
								else
									<~ value

	--'. Method
		doc. "Type-preserving --."
		test. |
			"TODO"
		default. |_ remove:@
			=> type-of_ (-- _ remove

	impl! =? @
		test. |
			! =? [ 1 ] [ 1 ]
		|@a @b
			and (reference=? (type-of @a) (type-of @b)) ~(seq=? @a @b

region Min/max (TODO: its own file?)
	\ TODO: Method, specialize on Sorted-Set
	max.
		doc. "An element that is >=? all others. Fails when empty."
		test. |
			[ [ 1 3 2 ] ] -> 3
			[ [ 2 1 2 ] ] -> 2 \ Doesn't have to be unique
			! fails? |
				max [ ]
		|_:@
			un-? ?max_ "Can not take max of empty."

	?max.
		doc. "Like max, but returns empty ? for empty."
		test. |
			[ [ 1 ] ] -> ? 1
			[ [ ] ] -> empty ?
		|_:@
			?max-by _ identity

	max-by.
		doc. "
			An element whose `by em` is >=? all other elements' `by em`s.
			Like `max (map _ by)` except the mapping is not applied to the result.
		test. |
			[ [ "five" "six" "seven" ] count ] -> "seven"
			! fails? |
				max-by [ ] identity
		|_:@ by:Fun
			un-? (?max-by _ by) "Can not take max of empty."

	?max-by.
		doc. "Like max-by, but returns empty ? for empty."
		test. |
			[ [ 1 ] identity ] -> ? 1
			[ [ ] identity ] -> empty ?
		|_:@ by:Fun
			if (not empty?_) |
				iter = iterator_
				value = iter.next().value
				cur-max = Ref! value
				cur-max-by = Ref! (by value
				loop!
					value done = iter.next()
					case!
						done
							end-loop!
						else
							value-by = by value
							if! (<? (get cur-max-by) value-by) |
								set! cur-max value
								set! cur-max-by value-by
				get cur-max


	\ TODO: min method, specialize on Sorted-Set


@
