use
	.Bool _ not or true
	.js id=?
	.Type.Method
use~
	.@ _ all? empty? iterator
	.@.@-Type from-stream
	.@.Array
	.@.Array!
	.@.? un-?
	.@.Seq _ first tail
	.control if if! opr returning Ref! get set!
	.Fun _ identity
	.Obj obj=?
	.Type.Pred-Type Opt
use-debug
	.!
	.@ count
	.@.?
	.@.@-Type empty
	.Bool false
	.Try fails?

compare. Method
	doc. "
		A Num < 0 if a < b, > 0 if a > b, and = 0 if a = b.
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

=?. Method
	doc. "
		Whether two objects are considered equivalent.
		Generally, if two values are `=?`, then most functions called on them should return the same results.
		`=?` defaults to `obj=?`.
		Values can be `=?` but not `obj=?` if they are conceptually the same, but have different representations.
		For example, two Sets with the same values might internally have different ordering.

		Values of different types should generally not be =?.
		For example, [ 1 2 3 ] is not `=?` (=> Stream [ 1 2 3 ]), but it is `seq=?`.
		Unlike other comparison methods, `=?` should not make assertions about type.

	default. |:Bool a b
		or (id=? a b) ~(obj=? a b

<?. Method
	doc. "
		Whether `lesser` comes before `greater` in these values' ordering.
		Same as `not  (>=? lesser greater)`.
	default. |:Bool lesser greater
		<? (compare lesser greater) 0

<=?. Method
	doc. "<? or =?."
	default. |:Bool lesser greater
		<=? (compare lesser greater) 0

region Misc
	same?.
		doc. "Whether two values have the same `f`."
		test. |
			[ count [ 1 ] [ 2 ] ] -> true
			[ count [ ] [ 1 ] ] -> false
		|f:Fun a b
			=? (f a) (f b)


region Min/max
	# TODO: Method, specialize on Sorted-Set
	max.
		doc. "An element that is >=? all others. Fails when empty."
		test. |
			[ [ 1 3 2 ] ] -> 3
			[ [ 2 1 2 ] ] -> 2 # Doesn't have to be unique
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
			if (not empty?_) ~
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

region Sorting
	sorted?.
		doc. "Whether it is already in sorted order."
		test. |
			[ [ ] ] -> true
			[ [ 1 2 3 ] ] -> true
			[ [ 3 2 1 ] ] -> false
			[ [ "six" "five" "seven" ] count ] -> true
		|seq:Seq ?sort-by:Opt[Fun]
			sort-by = opr ?sort-by identity
			case seq
				empty?_
					true
				else
					sb-prev = Ref! (sort-by first_
					all? tail_ |em
						sb-cur = sort-by em
						returning (<? (get sb-prev) sb-cur) |
							set! sb-prev sb-cur

	sort. Method
		doc. "
			Puts the elements in sorted order.
			Order is determined by calling `compare`.
			Optional `sort-by` determines an attribute of elements to be compared.
		test. |
			[ [ 3 2 1 ] ] -> [ 1 2 3 ]
			[ [ "five" "six" "seven" ] count ] -> [ "six" "five" "seven" ]
		default. |:Array _:@ ?sort-by:Opt[Fun]
			sort-by = opr ?sort-by identity
			# Ensure that we create a *new* Array!, because we're about to mutate it.
			sorted = from-stream Array! _
			sorted.sort |a b
				compare (sort-by a) (sort-by b
			sorted


