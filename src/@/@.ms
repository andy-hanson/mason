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
	.Seq.Seq +>! ++>! first seq=? @tail
	.Seq.Stream
	.Set.Set

@. new Kind
	| "Bag". Contains a variable number of elements. Most things implementing `iterator` should be @s.
	| If the iteration order of an @ is meaningful and `+ a b` is the concatenation, it is a Seq.
	| If an @ only stores a given element once, it is a Set.
	name.

do-inspect = |_ recurse
	case
		empty? _
			"empty {_.constructor.name}"
		else
			content =
				todo  @for:Array
				show-ems = => Array @for em of _
					indent (recurse em)
				"\n\t. {show-ems.join "\n\t. "}"
			"{_.constructor.name}{content}"

impl! to-string @ .|
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
	args. 1
	default. .|
		(iterator this).next().done

region Using iterator
	impl! contains? @ .|em:Any
		| Whether one of the elements =? em.
		any? this |em-compare
			=? em em-compare

	fold. |_:@ b c
		| Keeps a state variable `acc` and keeps applying `folder acc em` for the elements, in order.
		| Returns the final value.
		| If empty?_, fails unless a `start` value for `acc` is provided. Otherwise `acc` starts as the first element.
		start rest folder = case
			defined? c
				start. b
				folder. c
				rest. _
			else
				start. first_
				folder. b
				rest. @tail_

		acc ::= start
		for! rest
			acc := folder acc _
		acc

	any?. |_:@ pred?:Opt[Pred]
		| Whether pred? is true for at least one element.
		pred? := opr pred? identity
		not empty? (?find _ pred?)

	all?. |_:@ pred?:Opt[Pred]
		| Whether pred? is true for every element.
		pred? := opr pred? identity
		empty? (?find _ |em
			not pred? em

	?find. |_ pred?:Pred
		| First element for which pred? is true.
		| (To find all, use `keep`.)
		todo SYNTAX for-else
		Opt->? for elem of _
			if! pred? elem
				break elem

	count. new Method
		| Number of elements.
		name.
		args. 1
		default. .|
			fold this 0 +[1]

region Lazy functions, and their eager versions.
	|| Eager versions are Methods if certain types can do them faster.

	@keep. new Method
		| Only the elements that satisfy `keep-if?`.
		name.
		args. 2
		default. .|keep-if?:Pred
			todo SYNTAX Shouldn't need => type-of_
			=> (type-of this) @for this
				if! keep-if? _
					. _

	@keep~. |filtered:@ keep-if?:Pred
		| Lazy keep.
		todo SYNTAX @for~
		new Stream ~!|
			for! filtered
				if! keep-if?_
					<~ _

	todo  Method
	@map. |_:@ mapper:Function
		todo doc
		todo SYNTAX Shouldn't need => type-of_
		=> type-of_ @for elem of _
			mapper elem

	@map~. |mapped:@ mapper:Function
		| Lazy map.
		todo SYNTAX @for~
		new Stream ~!|
			for! mapped
				<~ mapper_

	todo  Better name?
	@flat-map. new Method
		| "Like `map`, but each mapping produces multiple values."
		name.
		args. 2
		default. .|mapper:Function[Any @]
			todo SYNTAX Shouldn't need => type-of_
			=> (type-of this) @for this
				... mapper_

	@flat-map~. |mapped:@ mapper:Function[Any @]
		| Lazy flat-map.
		todo SYNTAX @for~
		new Stream ~!|
			for! mapped
				<~~ iterator mapper_

	@flatten. new Method
		| For an @ containing many @, produces an @ containing all of their entries combined.
		| This does *not* consider more than 1 nested level, and there *every* element of _ must be an @.
		| More efficient than `fold + _`.
		name.
		args. 2
		default. .|
			todo SYNTAX Shouldn't need => type-of_
			=> (type-of this) @for this
				... _

	@flatten~. |flattened
		| Lazy flatten.
		todo SYNTAX @for~
		new Stream ~!|
			for! flattened
				<~~ iterator_

	++. new Method
		| Concatenation. Sets should override this.
		name.
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

	++~. |:Stream @a @b
		| Lazy ++.
		todo SYNTAX @for~
		new Stream ~!|
			<~~ iterator @a
			<~~ iterator @b

	todo  Move to Set?
	--. new Method
		| @ without any of the elements in `remove`.
		| Removes the *first* occurrence of each element.
		name.
		args.
			. "_"
			. ["@remove" @]
		default. .|@remove
			=> (type-of this) (--~ this @remove)

	--~. |:@ @removed-from @remove:@
		| Lazy --.
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

	impl! =? @ .|@other
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
		args. ["_" "added"]
		todo  Lazy default?
		default. .!|added
			+>! this added

	++!. new Method
		| Adds new elements.
		| For Seqs these are added on the right; use `<++!` to add on the left.
		name.
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
		args.
			. "_"
			. ["@removed" @]

	--!. new Method
		| Removes all elements in `removed` once.
		| For Seqs these are removed starting from the left.
		name.
		args.
			. "_"
			. ["@removed" @]
