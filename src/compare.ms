use
	.js id=?
	.Type.Method
use~
	.@.@ _ all? empty? iterator
	.@.@-Type from-stream
	.@.? un-?
	.@.Seq.Seq _ first tail
	.control opr
	.Function identity
	.Object object=?
	.Type.Pred-Type Opt
use-debug
	.@.@ count
	.@.? ?None ?some
	.Try fails?

compare. new Method
	name.
	doc. "
		A Number < 0 if a < b, > 0 if a > b, and = 0 if a = b.
		It could be implemented as:
			case
				<? a b
					-1
				>? a b
					1
				else
					0
		But instead, other comparison operators are defined in terms of this.
		`compare a b` should always be `* -1 (compare b a)`.
	args. 2

=?. new Method
	name.
	doc. "
		Whether two objects are considered equivalent.
		Generally, if two values are `=?`, then most Functions called on them should return the same results.
		`=?` defaults to `object=?`.
		Values can be `=?` but not `object=?` if they are conceptually the same, but have different representations.
		For example, two Sets with the same values might internally have different ordering.

		Values of different types should generally not be =?.
		For example, [1 2 3] is not `=?` (=> Stream [1 2 3]), but it is `seq=?`.
		Unlike other comparison methods, `=?` should not make assertions about type.
	args. 2
	allow-null?. true
	default. .|other
		or (id=? this other) (object=? this other)

<?. new Method
	name.
	doc. "
		Whether `lesser` comes before `greater` in these values' ordering.
		Same as `not  (>=? lesser greater)`.
	args. 2
	default. .|other
		<? (compare this other) 0

<=?. new Method
	name.
	doc. "<? or =?."
	args. 2
	default. .|other
		<=? (compare this other) 0

>?. new Method
	name.
	args. 2
	default. .|other
		>? (compare this other) 0

>=?. new Method
	name.
	args. 2
	default. .|other
		>=? (compare this other) 0

region Misc
	same?.
		doc. "Whether two values have the same `f`."
		test. |
			[count [1] [2]] -> true
			[count [] [1]] -> false
		|f:Function a b
			=? (f a) (f b)


region Min/max
	min. |_:@
		min-by _ identity

	?min. |_:@
		?min-by _ identity

	min-by. |_:@ by:Function
		un-? (?min-by _ by) "Can not take min of empty."

	?min-by. |_:@ by:Function
		unless empty?_
			iter = iterator_
			value = iter.next().value
			cur-min ::= value
			cur-min-by ::= by value
			for
				value done = iter.next()
				if! done
					break cur-min
				value-by = by value
				if! >? cur-min-by value-by
					cur-min := value
					cur-min-by := value-by

	# TODO: Method, specialize on Sorted-Set
	max.
		doc. "An element that is >=? all others. Fails when empty."
		test. |
			[[1 3 2]] -> 3
			[[2 1 2]] -> 2 # Doesn't have to be unique
			assert! fails? |
				max []
		|_:@
			max-by _ identity

	?max.
		doc. "Like max, but returns empty ? for empty."
		test. |
			[[1]] -> ?some 1
			[[]] -> ?None
		|_:@
			?max-by _ identity

	max-by.
		doc. "
			An element whose `by em` is >=? all other elements' `by em`s.
			Like `max (map _ by)` except the mapping is not applied to the result.
		test. |
			[["five" "six" "seven"] count] -> "seven"
			assert! fails? |
				max-by [] identity
		|_:@ by:Function
			un-? (?max-by _ by) "Can not take max of empty."

	?max-by.
		doc. "Like max-by, but returns empty ? for empty."
		test. |
			[[1] identity] -> ?some 1
			[[] identity] -> ?None
		|_:@ by:Function
			unless empty?_
				iter = iterator_
				value = iter.next().value
				cur-max ::= value
				cur-max-by ::= by value
				for
					value done = iter.next()
					if! done
						break cur-max
					value-by = by value
					if! <? cur-max-by value-by
						cur-max := value
						cur-max-by := value-by

region Sorting
	sorted?.
		doc. "Whether it is already in sorted order."
		test. |
			[[]] -> true
			[[1 2 3]] -> true
			[[3 2 1]] -> false
			[["six" "five" "seven"] count] -> true
		|seq:Seq sort-by:Opt[Function]
			sort-by := opr sort-by identity
			case seq
				empty?_
					true
				else
					sb-prev ::= sort-by first_
					all? tail_ |em
						sb-cur = sort-by em
						with <? sb-prev sb-cur
							sb-prev := sb-cur

	sort. new Method
		name.
		doc. "
			Puts the elements in sorted order.
			Order is determined by calling `compare`.
			Optional `sort-by` determines an attribute of elements to be compared.
		test. |
			[[3 2 1]] -> [1 2 3]
			[["five" "six" "seven"] count] -> ["six" "five" "seven"]
			["bac"] -> "abc"
		args.
			2
			# . ["_" @] # TODO: @
			# . ["?sort-by" Opt[Function]]
		default. .|sort-by
			sort-by := opr sort-by identity
			# Ensure that we create a *new* Array, because we're about to mutate it.
			sorted = from-stream Array this
			sorted.sort |a b
				compare (sort-by a) (sort-by b)
			sorted
