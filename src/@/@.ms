import
	..compare =?
	..Function identity Pred
	..js defined? id=?
	..math.methods +
	..to-string _ inspect
	..String indent
	..Type.Method
	..Type.Kind
	..Type.Method impl!
	..Type.Pred-Type Any Opt
	..Type.Type => contains? type-of
import~
	..control opr
	.? Opt->?
	.Seq.Seq +>! ++>! first seq=? tail
	.Seq.Stream
	.Set.Set
import-debug
	..math.Number divisible?
	..Try fails?
	.@-Type empty
	.? ?None ?some
	.Map.Weak-Id-Map
	.Seq.Deque

@. new Kind
	| "Bag". Contains a variable number of elements. Most things implementing `iterator` should be @s.
	| If the iteration order of an @ is meaningful and `+ a b` is the concatenation, it is a Seq.
	| If an @ only stores a given element once, it is a Set.
	name.
	implementor-test. !|@-type
		unless! =? @-type Weak-Id-Map
			todo assert! @-type:@-Type throw! "Be sure to make your @ type a @-Type."
			_ = empty @-type
			assert! empty? _


do-inspect = |_ recurse
	case
		empty? _
			"empty {_.constructor.name}"
		else
			content =
				todo  @for:Array
				show-ems = => Array @for em in _
					indent (recurse em)
				"\n\t. {show-ems.join "\n\t. "}"
			"{_.constructor.name}{content}"

impl! to-string @
	test. |
		d = => Deque [1 2 3]
		[d] -> "
			Deque
				. 1
				. 2
				. 3
		[(empty Deque)] -> "empty Deque"
	.|
		do-inspect this to-string

impl! inspect @ .|
	do-inspect this inspect

iterator. new Method
	| Creates a new Generator which yields the values in the @.
	name.
	args. 1
	impl-symbol. Symbol.iterator

empty?. new Method
	| Whether `count` is 0. Often much faster.
	name.
	test. |
		[[]] -> true
		[[1]] -> false
	args. 1
	default. .|
		(iterator this).next().done

region Using iterator
	impl! contains? @
		| Whether one of the elements =? em.
		test. !|
			assert! 0:[0]
			forbid! 1:[0]
		.|em:Any
			any? this |em-compare
				=? em em-compare

	fold.
		| Keeps a state variable `acc` and keeps applying `folder acc em` for the elements, in order.
		| Returns the final value.
		| If empty?_, fails unless a `start` value for `acc` is provided. Otherwise `acc` starts as the first element.
		test. |
			[[1 2 3] +] -> 6
			[[1 2 3] 4 +] -> 10
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
		| Whether pred? is true for at least one element.
		test. |
			[[0 1] =?[1]] -> true
			[[0 1] =?[2]] -> false
		|_:@ pred?:Opt[Pred]
			pred? := opr pred? identity
			not empty? (?find _ pred?)

	all?.
		| Whether pred? is true for every element.
		test. |
			[[0 0] =?[0]] -> true
			[[0 1] =?[0]] -> false
		|_:@ pred?:Opt[Pred]
			pred? := opr pred? identity
			empty? (?find _ |em
				not pred? em

	?find.
		| First element for which pred? is true.
		| (To find all, use `keep`.)
		test. |
			[[0 1] =?[1]] -> ?some 1
			[[0] =?[1]] -> ?None
		|_ pred?:Pred
			todo SYNTAX for-else
			Opt->? for elem in _
				if! pred? elem
					break elem

	count. new Method
		| Number of elements.
		name.
		test. |
			[[]] -> 0
			[[1 2 3]] -> 3
		args. 1
		default. .|
			fold this 0 +[1]

region Lazy functions, and their eager versions.
	|| Eager versions are Methods if certain types can do them faster.

	@keep. new Method
		| Only the elements that satisfy `keep-if?`.
		name.
		test. |
			[[1 2] =?[2]] -> [2]
		args. 2
		default. .|keep-if?:Pred
			todo SYNTAX Shouldn't need => type-of_
			=> (type-of this) @for this
				if! keep-if? _
					. _

	@keep~.
		| Lazy keep.
		test. |
			[[1 2] =?[2]] -> => Stream [2]
		|filtered:@ keep-if?:Pred
			todo SYNTAX @for~
			new Stream ~!|
				for! filtered
					if! keep-if?_
						<~ _

	todo  Method
	@map.
		todo doc
		test. |
			[[1 2] =?[2]] -> [false true]
		|_:@ mapper:Function
			todo SYNTAX Shouldn't need => type-of_
			=> type-of_ @for elem in _
				mapper elem

	@map~.
		| Lazy map.
		test. |
			[[1 2] =?[2]] -> => Stream [false true]
		|mapped:@ mapper:Function
			todo SYNTAX @for~
			new Stream ~!|
				for! mapped
					<~ mapper_

	todo  Better name?
	@flat-map. new Method
		| "Like `map`, but each mapping produces multiple values."
		name.
		test. |
			f = |a
				[a a]
			[[1 2] f] -> [1 1 2 2]
		args. 2
		default. .|mapper:Function[Any @]
			todo SYNTAX Shouldn't need => type-of_
			=> (type-of this) @for this
				... mapper_

	@flat-map~.
		| Lazy flat-map.
		test. |
			f = |case
				divisible? _ 2
					[_ _]
				else
					[_]
			[[1 2 3 4] f] -> => Stream [1 2 2 3 4 4]
		args. 2
		|mapped:@ mapper:Function[Any @]
			todo SYNTAX @for~
			new Stream ~!|
				for! mapped
					<~~ iterator mapper_

	@flatten. new Method
		| For an @ containing many @, produces an @ containing all of their entries combined.
		| This does *not* consider more than 1 nested level, and there *every* element of _ must be an @.
		| More efficient than `fold + _`.
		name.
		test. |
			[[[1 2] [3] []]] -> [1 2 3]
		args. 2
		default. .|
			todo SYNTAX Shouldn't need => type-of_
			=> (type-of this) @for this
				... _

	@flatten~.
		| Lazy flatten.
		test. |
			[[[1 2] [3] []]] -> => Stream [1 2 3]
			|| Ignores further nested @s.
			[[[1] [[2]]]] -> => Stream [1 [2]]
			|| Must be at least one nested level
			assert! fails? |
				=> Array (@flatten~ [[1] 2 [3]])
		|flattened
			todo SYNTAX @for~
			new Stream ~!|
				for! flattened
					<~~ iterator_

	++. new Method
		| Concatenation. Sets should override this.
		name.
		test. |
			[[0] [1]] -> [0 1]
		args.
			. ["@a" @]
			. ["@b" @]
		default. .|@other
			todo SYNTAX @for -> type-of a
			todo SYNTAX Just build without @for
			=> (type-of this) @for
				... this
				... @other
				break!

	++~.
		| Lazy ++.
		test. |
			[[0] [1]] -> => Stream [0 1]
		|:Stream @a @b
			todo SYNTAX @for~
			new Stream ~!|
				<~~ iterator @a
				<~~ iterator @b

	todo  Move to Set?
	--. new Method
		| @ without any of the elements in `remove`.
		| Removes the *first* occurrence of each element.
		name.
		test. |
			[[1 2 1] [1]] -> [2 1]
		args.
			. "_"
			. ["@remove" @]
		default. .|@remove
			=> (type-of this) (--~ this @remove)

	--~.
		| Lazy --.
		test. |
			[[1 2 1] [1]] -> => Stream [2 1]
		|:@ @removed-from @remove:@
			todo SYNTAX @for~
			new Stream ~!|
				@remove-remaining = => Set @remove
				for! @removed-from
					case!
						:@remove-remaining
							todo  -!
							--! @remove-remaining [_]
						else
							<~ _

	impl! =? @
		test. !|
			assert! =? [1] [1]
		.|@other
			and (id=? (type-of this) (type-of @other)) (seq=? this @other)

region Mutator methods
	empty!. new Method
		| Mutates this collection so that it will be `empty?`.
		name.
		args. 1

	todo  implement
	+!. new Method
		todo doc
		name.
		test. !|
			pass todo impl-test
		args.
			. "_"
			. "added"
		todo  Lazy default?
		default. .!|added
			+>! this added

	++!. new Method
		| Adds new elements.
		| For Seqs these are added on the right; use `<++!` to add on the left.
		name.
		test. !|
			pass todo impl-test
		args.
			. "_"
			. ["@added" @]
		todo  Lazy default?
		default. .!|@added
			++>! this @added

	todo  implement
	-!. new Method
		todo doc
		name.
		test. !|
			pass todo impl-test
		args.
			. "_"
			. ["@removed" @]

	--!. new Method
		| Removes all elements in `removed` once.
		| For Seqs these are removed starting from the left.
		name.
		test. !|
			pass todo impl-test
		args.
			. "_"
			. ["@removed" @]
