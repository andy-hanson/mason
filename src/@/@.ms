use
	..compare =? <?
	..Function identity Pred
	..js defined? id=?
	..math.methods +
	..to-string
	..String indent
	..Type.Method
	..Type.Kind
	..Type.Method impl!
	..Type.Pred-Type Any Opt
	..Type.Type => contains? type-of
use~
	..control opr
	.? Opt->?
	.Seq.Seq ++>! first seq=? tail take'
	.Seq.Stream
	.Set.Set
use-debug
	..math.Number divisible?
	..Try fails?
	.@-Type empty
	.? ?None ?some
	.Map.Weak-Id-Map
	.Seq.Deque

@. new Kind
	doc. "
		"Bag". Contains a variable number of elements. Most things implementing `iterator` should be @s.
		If the iteration order of an @ is meaningful and `+ a b` is the concatenation, it is a Seq.
		If an @ only stores a given element once, it is a Set.
	implementor-test. !|@-type
		unless! =? @-type Weak-Id-Map
			# TODO
			# assert! @-type:@-Type throw! "Be sure to make your @ type a @-Type."
			_ = empty @-type
			assert! empty? _


impl! to-string @
	test. |
		d = => Deque [ 1 2 3 ]
		[ d ] -> "
			\n\t. 1
				. 2
				. 3
		# TODO:SYNTAX [ d repr. ]
		[ d (repr. true) ] -> "
			=> Deque
				. 1
				. 2
				. 3
		[ (empty Deque) ] -> "[ ]"
		[ (empty Deque) (repr. true) ] -> "empty Deque"

	.|
		content = case
			empty? this
				"[ ]"
			else
				# TODO: map (eager)
				ems = @for this
					indent to-string_
				show-ems end = case
					<? 100 (count this)
						show-ems. take' ems 100
						end. "\n\t..."
					else
						show-ems. ems
						end. ""
				"\n\t. {=> String show-ems "\n\t. "}{end}"

		case
			empty? this
				"empty {type-of this}"
			else
				"=> {type-of this}{content}"


iterator. new Method
	doc. "Creates a new Generator which yields the values in the @."
	args. 1
	impl-symbol. Symbol.iterator

empty?. new Method
	doc. "Whether `count` is 0. Often much faster."
	test. |
		[ [ ] ] -> true
		[ [ 1 ] ] -> false
	args. 1
	default. .|
		(iterator this).next().done

region Using iterator
	impl! contains? @
		doc. "Whether one of the elements =? em."
		test. !|
			assert! 0:[ 0 ]
			forbid! 1:[ 0 ]
		.|em:Any
			any? this |em-compare
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
			for! rest
				acc := folder acc _
			acc

	any?.
		doc. "Whether pred? is true for at least one element."
		test. |
			[ [ 0 1 ] =?[1] ] -> true
			[ [ 0 1 ] =?[2] ] -> false
		|_:@ pred?:Opt[Pred]
			pred? := opr pred? identity
			not empty? (?find _ pred?

	all?.
		doc. "Whether pred? is true for every element."
		test. |
			[ [ 0 0 ] =?[0] ] -> true
			[ [ 0 1 ] =?[0] ] -> false
		|_:@ pred?:Opt[Pred]
			pred? := opr pred? identity
			empty? (?find _ |em
				not pred? em

	?find.
		doc. "
			First element for which pred? is true.
			(To find all, use `keep`.)
		test. |
			[ [ 0 1 ] =?[1] ] -> ?some 1
			[ [ 0 ] =?[1] ] -> ?None
		|_ pred?:Pred
			# TODO:SYNTAX for-else
			Opt->? for elem in _
				if! pred? elem
					break elem

	count. new Method
		doc. "Number of elements."
		test. |
			[ [ ] ] -> 0
			[ [ 1 2 3 ] ] -> 3
		args. 1
		default. .|
			fold this 0 +[1]

region Lazy functions, and their eager versions.
	# Eager versions are Methods if certain types can do them faster.
	keep. new Method
		doc. "Only the elements that satisfy `keep-if?`."
		test. |
			[ [ 1 2 ] =?[2] ] -> [ 2 ]
		args. 2
		default. .|keep-if?:Pred
			# TODO:SYNTAX Shouldn't need => type-of_
			=> (type-of this) @for this
				if! keep-if? _
					. _

	keep'.
		doc. "Lazy keep."
		test. |
			[ [ 1 2 ] =?[2] ] -> => Stream [ 2 ]
		|filtered:@ keep-if?:Pred
			# TODO:SYNTAX @for~
			new Stream ~!|
				for! filtered
					if! keep-if?_
						<~ _

	# TODO: Method
	map.
		doc. "TODO"
		test. |
			[ [ 1 2 ] =?[2] ] -> [ false true ]
		|_:@ mapper:Function
			# TODO:SYNTAX Shouldn't need => type-of_
			=> type-of_ @for elem in _
				mapper elem

	map'.
		doc. "Lazy map."
		test. |
			[ [ 1 2 ] =?[2] ] -> => Stream [ false true ]
		|mapped:@ mapper:Function
			# TODO:SYNTAX @for~
			new Stream ~!|
				for! mapped
					<~ mapper_

	# TODO: Better name?
	flat-map. new Method
		doc. "Like `map`, but each mapping produces multiple values."
		test. |
			f = |a
				[ a a ]
			[ [ 1 2 ] f ] -> [ 1 1 2 2 ]
		args. 2
		default. .|mapper:Function[Any @]
			# TODO:SYNTAX Shouldn't need => type-of_
			=> (type-of this) @for this
				... mapper_

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
		|mapped:@ mapper:Function[Any @]
			# TODO:SYNTAX @for~
			new Stream ~!|
				for! mapped
					<~~ iterator mapper_

	flatten. new Method
		doc. "
			For an @ containing many @, produces an @ containing all of their entries combined.
			This does *not* consider more than 1 nested level, and there *every* element of _ must be an @.
			More efficient than `fold + _`.
		test. |
			[ [ [ 1 2 ] [ 3 ] [ ] ] ] -> [ 1 2 3 ]
		args. 2
		default. .|
			# TODO:SYNTAX Shouldn't need => type-of_
			=> (type-of this) @for this
				... _

	flatten'.
		doc. "Lazy flatten."
		test. |
			[ [ [ 1 2 ] [ 3 ] [ ] ] ] -> => Stream [ 1 2 3 ]
			# Ignores further nested @s.
			[ [ [ 1 ] [ [ 2 ] ] ] ] -> => Stream [ 1 [ 2 ] ]
			# Must be at least one nested level
			assert! fails? |
				=> Array (flatten [ [ 1 ] 2 [ 3 ] ]
		|flattened
			# TODO:SYNTAX @for~
			new Stream ~!|
				for! flattened
					<~~ iterator_

	++. new Method
		doc. "Concatenation. Sets should override this."
		test. |
			[ [ 0 ] [ 1 ] ] -> [ 0 1 ]
		args.
			. [ "@a" @
			. [ "@b" @
		default. .|@other
			# TODO:SYNTAX @for -> type-of a
			# TODO:SYNTAX Just build without @for
			=> (type-of this) @for
				... this
				... @other
				break!

	++'.
		doc. "Lazy ++."
		test. |
			[ [ 0 ] [ 1 ] ] -> => Stream [ 0 1 ]
		|:Stream @a @b
			# TODO:SYNTAX @for~
			new Stream ~!|
				<~~ iterator @a
				<~~ iterator @b

	# TODO: Move to Set?
	--. new Method
		doc. "
			@ without any of the elements in `remove`.
			Removes the *first* occurrence of each element.
		test. |
			[ [ 1 2 1 ] [ 1 ] ] -> [ 2 1 ]
		args.
			. "_"
			. [ "@remove" @
		default. .|@remove
			=> (type-of this) (--' this @remove)

	--'.
		doc. "Lazy --."
		test. |
			[ [ 1 2 1 ] [ 1 ] ] -> => Stream [ 2 1 ]
		|:@ @removed-from @remove:@
			# TODO:SYNTAX @for~
			new Stream ~!|
				@remove-remaining = => Set @remove
				for! @removed-from
					case!
						:@remove-remaining
							# TODO: -!
							--! @remove-remaining [ _ ]
						else
							<~ _

	impl! =? @
		test. !|
			assert! =? [ 1 ] [ 1 ]
		.|@other
			and (id=? (type-of this) (type-of @other)) (seq=? this @other)

region Mutator methods
	empty!. new Method
		doc. "Mutates this collection so that it will be `empty?`."
		args. 1

	++!. new Method
		doc. "
			Adds new elements.
			For Seqs these are added on the right; use `<++!` to add on the left.
		test. !|
			pass # TODO:impl-test
		args.
			. "_"
			. [ "added" @
		# TODO: Lazy default?
		default. .!|added
			++>! this added

	--!. new Method
		doc. "
			Removes all elements in `removed` once.
			For Seqs these are removed starting from the left.
		args.
			. "_"
			. [ "@removed" @
		test. !|
			pass # TODO:impl-test
