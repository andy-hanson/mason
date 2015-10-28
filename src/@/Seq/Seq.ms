import
	...compare =?
	...Function Pred
	...math.methods - +
	...methods sub
	...String indent
	...Type.Kind _ kind! self-kind!
	...Type.Method _ impl!
	...Type.Type => type-of
	..@ _ ++ count empty? iterator
	..@-Type _ empty from-stream
import~
	...math.Number Nat
	...to-string
	..? Opt->? un-?
	.Stream

Seq. new Kind
	| @ whose values are in a meaningful order.
	name.

kind! Seq @

self-kind! Seq @-Type

region TODO
	todo  Review name...
	<++~. new Method
		| (There is no `++>~` because `++~` by default adds to the right for Seqs.)
		todo more doc
		name.
		args. 2
		default. .|left-added:@
			=> (type-of this) (++ left-added this)

region Very first and last
	first. |_
		| First value in iteration order.
		un-? ?first_ "Can not take first of empty."

	?first. new Method
		| First value in iteration order, if non-empty.
		name.
		args. 1
		default. .|
			?nth this 0

	last. |_
		| Last value in iteration order.
		un-? ?last_ "Can not take last of empty."

	?last. new Method
		| Last value in iteration order, if non-empty.
		name.
		args. 1
		default. .|
			unless empty? this
				this[(- (count this) 1)]

	@tail. new Method
		| All elements but the first.
		todo Eager for Linked-Lists.
		name.
		args. 1
		default. .|
			cond (empty? this) this (@drop this 1)

	@rtail. new Method
		| All elements but the last.
		todo Eager for finger trees.
		name.
		args. 1
		default. .|
			cond (empty? this) this (@take this (- (count this) 1))

region Search
	seq=?. |@a:@ @b:@
		| Whether two @s share the same elements in the same order.
		| The types of the @s do not matter.
		| Equivalent to `=? (=> Array @a) (=> Array @b)`, but may not have to fully unlazy both.
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
		| `n`th element in iteration order, if there are at least that many values.
		| 0th is the first.
		name.
		args.
			. '_
			. ['n Nat]
		default. .|n
			i ::= 0
			todo SYNTAX for-else
			Opt->? for elem of this
				case! elem
					=? i n
						break _
					else
						todo  Incr
						i := + 1 i

	impl! sub Seq .|n:Nat
		| Nth value in iteration order.
		un-? (?nth this n) ~"
			No element at index {n} for
				{indent (to-string this)}

region Update
	@slice. new Method
		| The elements from index start (inclusive) to end (exclusive).
		| Takes as much as possible.
		| Result length should be - end start, unless `end` was past the end.
		name.
		args.
			. '_
			. ['start Nat]
			. ['end Nat]
		default. .|start end
			=> (type-of this) (@slice~ this start end)

	@slice~. |:@ _ start end
		| Lazy `@slice`.
		@take~ (@drop~ _ start) (- end start)

	@take. new Method
		todo doc
		name.
		args.
			. '_
			. ['count-to-take Nat]
		default. .|count-to-take
			=> (type-of this) (@take~ this count-to-take)

	@take~. |_ count-to-take:Nat
		| Stream including only the first count-to-take elements.
		todo SYNTAX @for~
		case
			=? 0 count-to-take
				empty Stream
			else
				todo SYNTAX @for~
				new Stream ~!|
					n ::= count-to-take
					for! elem of _
						<~ elem
						n := - n 1
						if! =? 0 n
							break!

	todo eager version
	@take-while~. |_ while?:Pred
		| Stream stopping (and not including) the first element not satisfying while?.
		todo SYNTAX @for~
		new Stream ~!|
			for! elem of _
				unless! while? elem
					break!
				<~ elem

	@drop. new Method
		todo doc
		name.
		args.
			. '_
			. ['count-to-drop Nat]
		default. .|count-to-drop
			=> (type-of this) (@drop~ this count-to-drop)

	@drop~.
		| Stream without the first count-to-drop elements.
		|_ count-to-drop
			todo SYNTAX @for~
			new Stream ~!|
				iter = iterator_
				i ::= 0
				for!
					if! =? i count-to-drop
						break!
					if! iter.next().done
						break!
					i := + 1 i
				<~~ iter

	todo  @drop-while~

region Combination
	@zip. |@a:@ @b:@ zipper:Function[2]
		| Type-preserving zip~.
		todo doc the other way around (primarily on zip, short on zip~)
		=> (type-of @a) (@zip~ @a @b zipper)

	@zip~. |@a:@ @b:@ zipper:Function[2]
		| Seq of zipper applied to corresponding elements of @a and @b.
		| Ends as soon as either of them does, discarding extra elements.
		| (Corresponding means: with the same index.)
		todo SYNTAX @for~
		new Stream ~!|
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
	@groups-of~. |group-size:Nat _ todo  :Seq[Array]
		| Seq of consecutive groups of `group-size` elements.
		case
			=? group-size 0
				todo  repeat-forever []
				new Stream ~!|
					for!
						<~ []
			else
				todo SYNTAX @for~
				new Stream ~!|
					iter = iterator_
					for!
						next-group = []
						for!
							value done = iter.next()
							if! done
								break!
							++>! next-group [value]
							if! =? group-size (count next-group)
								break!
						unless! =? group-size (count next-group)
							break!
						<~ next-group

	@indexes. |_:Seq
		todo doc
		0...count_

	@reverse. new Method
		| Seq with the opposite order.
		name.
		args. 1
		default. .|
			(from-stream Array this).reverse()

	@reverse~. new Method
		todo doc
		name.
		args. 1
		default. .|
			arr = => Array this
			todo SYNTAX @for~
			new Stream ~!|
				for! @reverse (@indexes arr)
					<~ arr[_]

	@split~. |_ split?:Pred
		| Subseqs separated by elements where split? is true.
		todo  Allocate current group; don't wait to call slice.
		todo SYNTAX @for~
		new Stream ~!|
			iter = iterator_
			prev-idx ::= 0
			cur-idx ::= 0
			for!
				value done = iter.next()
				~next-idx = + 1 cur-idx
				case!
					done
						<~ @slice _ prev-idx cur-idx
						break!
					split? value
						<~ @slice _ prev-idx cur-idx
						prev-idx := next-idx
						cur-idx := next-idx
					else
						cur-idx := next-idx

region Mutator methods
	todo Implement
	<+!. new Method
		todo doc
		name.
		args. ['_ 'added]

	<++!. new Method
		| Makes `_` into `+ added _`.
		name.
		args.
			. '_
			. ['@added @]
		default. .!|@added
			for! @reverse~ @added
				<+! this _

	todo Implement
	+>!. new Method
		todo doc
		name.
		args. ['_ 'added]

	++>!. new Method
		| Makes `_` into `+ _ added`.
		name.
		args.
			. '_
			. ['@added @]
		default. .!|@added
			for! @added
				+>! this _


	?<pop!. new Method
		| Takes one element off the left side, if not empty?.
		name.
		args. 1
		todo  returns. ?
	?pop>!. new Method
		| Takes one element off the right side, if not empty?.
		name.
		args. 1
		todo  returns. ?
