import
	..compare =?
	..Function Action identity Pred
	..js defined? id=?
	..math.methods +
	..to-string _ inspect
	..String indent
	..Type.Method
	..Type.Pred-Type Any Opt
	..Type.Type => has-instance? type-of
import~
	..control opr
	.? Opt->?
	.Seq.Seq +>! ++>! first seq=? @tail
	.Seq.Stream
	.Set.Set

@. kind
	| "Bag". Contains a variable number of elements. Most things implementing `iterator` should be @s.
	| If the iteration order of an @ is meaningful and `+ a b` is the concatenation, it is a Seq.
	| If an @ only stores a given element once, it is a Set.

	has-instance? |em:Any
		| Whether one of the elements =? em.
		any? this |em-compare
			=? em em-compare

	=? |@other
		and (id=? (type-of this) (type-of @other)) (seq=? this @other)

	to-string |
		do-inspect this to-string
	inspect |
		do-inspect this inspect

do-inspect = |_ recurse
	case
		empty? _
			"empty #(_.constructor.name)"
		else
			content =
				todo  @for:Array
				show-ems = => Array @for em of _
					. indent (recurse em)
				"\n\t. #(show-ems.join "\n\t. ")"
			"#(_.constructor.name)#content"

iterator. new Method
	| Creates a new Generator which yields the values in the @.
	name.
	args. []
	impl-symbol. Symbol.iterator

empty?. method |
	| Whether `count` is 0. Often much faster.
	(iterator this).next().done

region Using iterator
	each!. !|_:@ do-for-each!:Action
		| A `for` loop in function form.
		| Prefer e.g. `each! @foo bar!` over the more verbose:
		|	for @foo
		|		bar!_
		| Also consider `each! @foo &bar` for instance methods.
		for elem of _
			do-for-each! elem

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

		acc = start
		for rest
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
			if pred? elem
				break elem

	count. method |
		| Number of elements.
		fold this 0 +[1]

region Lazy functions, and their eager versions.
	|| Eager versions are Methods if certain types can do them faster.

	@keep. method |keep-if?:Pred
		| Only the elements that satisfy `keep-if?`.
		todo SYNTAX Shouldn't need => type-of_
		=> (type-of this) @for this
			if keep-if? _
				. _

	@keep~. |filtered:@ keep-if?:Pred
		| Lazy keep.
		todo SYNTAX @for~
		new Stream *!|
			for filtered
				if keep-if?_
					yield _

	todo  Method
	@map. |_:@ mapper:Function
		todo doc
		todo SYNTAX Shouldn't need => type-of_
		=> type-of_ @for elem of _
			. mapper elem

	@map~. |mapped:@ mapper:Function
		| Lazy map.
		todo SYNTAX @for~
		new Stream *!|
			for mapped
				yield mapper_

	todo  Better name?
	@flat-map. method |mapper:Function[Any @]
		| "Like `map`, but each mapping produces multiple values."
		todo SYNTAX Shouldn't need => type-of_
		=> (type-of this) @for this
			... mapper_

	@flat-map~. |mapped:@ mapper:Function[Any @]
		| Lazy flat-map.
		todo SYNTAX @for~
		new Stream *!|
			for mapped
				yield* iterator mapper_

	@flatten. method |
		| For an @ containing many @, produces an @ containing all of their entries combined.
		| This does *not* consider more than 1 nested level, and there *every* element of _ must be an @.
		| More efficient than `fold + _`.
		todo SYNTAX Shouldn't need => type-of_
		=> (type-of this) @for this
			... _

	@flatten~. |flattened
		| Lazy flatten.
		todo SYNTAX @for~
		new Stream *!|
			for flattened
				yield* iterator_

	++. method |@other:@
		| Concatenation. Sets should override this.
		todo SYNTAX build type-of a
		=> (type-of this)
			... this
			... @other

	++~. |:Stream @a @b
		| Lazy ++.
		todo SYNTAX @for~
		new Stream *!|
			yield* iterator @a
			yield* iterator @b

	todo  Move to Set?
	--. method |@remove:@
		| @ without any of the elements in `remove`.
		| Removes the *first* occurrence of each element.
		=> (type-of this) (--~ this @remove)

	--~. |:@ @removed-from @remove:@
		| Lazy --.
		todo SYNTAX @for~
		new Stream *!|
			@remove-remaining = => Set @remove
			for @removed-from
				case
					:@remove-remaining
						todo  -!
						--! @remove-remaining [_]
					else
						yield _

region Mutator methods
	empty!. method |
		| Mutates this collection so that it will be `empty?`.
		abstract

	todo  implement
	+!. method !|added
		todo doc
		+>! this added

	++!. method !|@added:@
		| Adds new elements.
		| For Seqs these are added on the right; use `<++!` to add on the left.
		++>! this @added

	todo  implement
	-!. method |@removed:@
		todo doc
		abstract

	--!. method |@removed:@
		| Removes all elements in `removed` once.
		| For Seqs these are removed starting from the left.
		abstract
