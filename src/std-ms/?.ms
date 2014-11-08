use
	.assert -> ! != !fails
	.basic-methods -> sub
	.Bag -> each! empty? iterator map
	.Bool -> and not
	.Error -> oh-no!
	.Fun -> call curry
	.Interface -> implementor!
	.js -> identical?
	.Method -> impl! impl-direct! impl-override!
	.Num
	.Object -> set-property! extend!
	.pred-types -> Any
	.Record-Type
	.Seq
	.Str -> ->Str
	.Symbol
	.Type -> subsumes? !subsumes

? = Record-Type
	doc. "A Bag with 0 or 1 elements - an optional value."

	members.
		\ `undefined` for none.
		val.

implementor! ? Bag

?some.
	doc. "`?` with the given element."
	|some-of:Any
		?
			val. some-of

?none.
	doc. "? with no element."
	?
		val. `undefined`

impl! empty? ? |op
	_ = op.val
	not :Any

impl! ->Str ? |case
	empty?_
		"?none"
	else
		"?some {_.val}"

impl! iterator ? ~|case!
	empty?_
		()
	else
		<~ _.val

Opt->?. |_
	?
		val. _

\ TODO: Pattern for type-preserving `map`. `map` is just a function.
\impl! map ? |_ f:Fun
\	case
\		empty?_
\			_
\		else
\			?some (f _.val)

un-?.
	doc. "Tries to extract the value out of a `?`. Throws an error if it is empty."
	test. |
		!= 1 (un-? (?some 1))
		!fails |
			un-? ?none
	|_:?
		case
			empty?_
				oh-no! "Tried to force `?none`."
			else
				_.val

get-or. |_:? or:Fun[Any]
	case
		empty?_
			call or
		else
			_.val

region sub
	impl-direct! sub ?
		doc. "`?[A]` matches a `?` containing an `A`, or ?none."
		test. |
			! (subsumes? ?[Num] (?some 0))
			! (subsumes? ?[Num] ?none)
			! (not (subsumes? ?[Num] (?some "0")))
		|Em-Type
			?-Sub
				Element-Type. Em-Type

	?-Sub = Record-Type
		doc. "Used by ?[A]"
		members.
			Element-Type. Type

	implementor! ?-Sub Type
	impl! subsumes? ?-Sub |?-sub subsumed
		and (subsumes? ? subsumed) ~(map subsumed (curry subsumes? ?-sub.em-type))
	impl-override! !subsumes ?-Sub |?-sub subsumed name
		!subsumes ? subsumed
		each! subsumed (curry !subsumes ?-sub)

?
