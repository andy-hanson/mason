use
	..assert -> ! != !fails
	..basic-methods -> sub
	.Bag -> each! empty? iterator map
	..Bool -> and not
	..Error -> oh-no!
	..Fun -> call curry
	..js -> identical?
	..Num
	..Object -> set-property! extend!
	..pred-types -> Any
	.Seq
	..Str -> ->Str
	..Symbol
	..types.Interface -> implementor!
	..types.Method -> impl! impl-direct! impl-override!
	..types.Record-Type
	..types.Type -> subsumes? !subsumes

? = Record-Type
	doc. "
		A Bag with 0 or 1 elements.
		Either `?none` or `?some`.
		Its content can never be null.

	members.
		\ `undefined` for none.
		val. \ TODO: Nullable

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

impl! empty? ? |_
	identical? _ ?none

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

Opt->?. |case
	:Any
		?some_
	else
		?none

impl! map ? |_ f:Fun
	case
		empty?_
			_
		else
			?some (f _.val)

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

get-or. |_:? ~or
	case
		empty?_
			or
		else
			_.val

region sub
	impl-direct! sub ?
		doc. "`?[A]` matches a `?` containing an `A`, or ?none."
		test. |
			! (subsumes? ?[Num] (?some 0))
			! (subsumes? ?[Num] ?none)
			! (not (subsumes? ?[Num] (?some "0")))
		|? Em-Type:Type
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
		!subsumes ? subsumed name
		each! subsumed |_
			!subsumes ?-sub.Element-Type _ name

?
