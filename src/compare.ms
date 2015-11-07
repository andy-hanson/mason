import
	.js defined? id=?
	.Type.Method
import~
	.@.@ _ all? empty? iterator
	.@.@-Type from-stream
	.@.? un-?
	.@.Seq.Seq _ first @tail
	.control opr
	.Function identity
	.Object object=?
	.Type.Pred-Type Opt

compare. method |other
	| A Number < 0 if a < b, > 0 if a > b, and = 0 if a = b.
	| It could be implemented as:

	|	 case
	|		<? a b
	|			-1
	|		>? a b
	|			1
	|		else
	|			0

	| But instead, other comparison operators are defined in terms of this.
	| `compare a b` should always be `* -1 (compare b a)`.
	abstract

=?. new Method
	| Whether two objects are considered equivalent.
	| Generally, if two values are `=?`, then most Functions called on them should return the same results.
	| `=?` defaults to `object=?`.
	| Values can be `=?` but not `object=?` if they are conceptually the same, but have different representations.
	| For example, two Sets with the same values might internally have different ordering.

	| Values of different types should generally not be =?.
	| For example, [1 2 3] is not `=?` (=> Stream [1 2 3]), but it is `seq=?`.
	| Unlike other comparison methods, `=?` should not make assertions about type.
	name.
	allow-null?. true
	args. ['other]
	default. .|other
		or (id=? this other) (object=? this other)

<?. method |other
	| Whether `lesser` comes before `greater` in these values' ordering.
	| Same as `not  (>=? lesser greater)`.
	<? (compare this other) 0

<=?. method |other
	| <? or =?.
	<=? (compare this other) 0

>?. method |other
	todo doc
	>? (compare this other) 0

>=?. method |other
	todo doc
	>=? (compare this other) 0

region Misc
	same?. |f:Function a b
		| Whether two values have the same `f`.
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
				if done
					break cur-min
				value-by = by value
				if >? cur-min-by value-by
					cur-min := value
					cur-min-by := value-by

	todo  Method, specialize on Sorted-Set
	max. |_:@
		| An element that is >=? all others. Fails when empty.
		max-by _ identity

	?max. |_:@
		| Like max, but returns empty ? for empty.
		?max-by _ identity

	max-by. |_:@ by:Function
		| An element whose `by em` is >=? all other elements' `by em`s.
		| Like `max (map _ by)` except the mapping is not applied to the result.
		un-? (?max-by _ by) "Can not take max of empty."

	?max-by. |_:@ by:Function
		| Like max-by, but returns empty ? for empty.
		unless empty?_
			iter = iterator_
			value = iter.next().value
			cur-max ::= value
			cur-max-by ::= by value
			for
				value done = iter.next()
				if done
					break cur-max
				value-by = by value
				if <? cur-max-by value-by
					cur-max := value
					cur-max-by := value-by

region Sorting
	sorted?. |seq:Seq sort-by:Opt[Function]
		| Whether it is already in sorted order.
		sort-by := opr sort-by identity
		case seq
			empty?_
				true
			else
				sb-prev ::= sort-by first_
				all? @tail_ |em
					sb-cur = sort-by em
					with <? sb-prev sb-cur
						sb-prev := sb-cur

	todo sort-by: Opt[Function]
	sort. method |sort-by
		| Puts the elements in sorted order.
		| Order is determined by calling `compare`.
		| Optional `sort-by` determines an attribute of elements to be compared.

		|| Ensure that we create a *new* Array, because we're about to mutate it.
		with from-stream Array this
			_.sort case sort-by
				defined?_
					|a b
						compare (sort-by a) (sort-by b)
				else
					compare
