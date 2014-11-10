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
<<<<<<< HEAD
	..types.Method -> impl! impl-direct!
=======
	..types.Method -> impl! impl-direct! impl-override!
>>>>>>> 9ddb097... Added missing files
	..types.Record-Type
	..types.Type -> subsumes? !subsumes

? = Record-Type
<<<<<<< HEAD
	doc. "
		A Bag with 0 or 1 elements.
		Either `?none` or `?some`.
		Its content can never be null.

	members.
		val.

=======
	doc. "A Bag with 0 or 1 elements - an optional value."

	members.
		\ `undefined` for none.
		val.

implementor! ? Bag

>>>>>>> 9ddb097... Added missing files
?some.
	doc. "`?` with the given element."
	|some-of:Any
		?
			val. some-of

?none.
	doc. "? with no element."
	?
		val. `undefined`

<<<<<<< HEAD
implementor! ? Bag

\ Can't use implementor! map because ? is required to create maps
impl! empty? ? |_
	identical? _ ?none
=======
impl! empty? ? |op
	_ = op.val
	not :Any
>>>>>>> 9ddb097... Added missing files

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

<<<<<<< HEAD
Opt->?.
	doc. "?some unless the value is null/undefined."
	test. |
		!= (Opt->? 0) (?some 0)
		!= (Opt->? ()) ?none
	|case
		:Any
			?some_
		else
			?none

?->Opt.
	doc. "?none becomes undefined, ?some x becomes x."
	test. |
		!= (?->Opt (?some 0)) 0
		! (not (subsumes? Any (?->Opt ?none)))
	|_:?
		_.val

\ TODO: ?-builder
=======
Opt->?. |_
	?
		val. _

>>>>>>> 9ddb097... Added missing files
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

<<<<<<< HEAD
get-or.
	doc. "If ?some, gets the value. Else defaults to `or`."
	|:Any _:? ~or:Any
		case
			empty?_
				or
			else
				_.val
=======
get-or. |_:? ~or
	case
		empty?_
			or
		else
			_.val
>>>>>>> 9ddb097... Added missing files

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
<<<<<<< HEAD
	impl! !subsumes ?-Sub |?-sub subsumed name
=======
	impl-override! !subsumes ?-Sub |?-sub subsumed name
>>>>>>> 9ddb097... Added missing files
		!subsumes ? subsumed name
		each! subsumed |_
			!subsumes ?-sub.Element-Type _ name

?
