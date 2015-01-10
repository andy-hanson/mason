use
	..assert -> ! !not
	.Bag -> iterator
	.Bag-Type -> from-stream
	..Comparable! -> <!
	..Fun -> ignore thunk
	..js -> reference=?
	..methods -> => contains? empty empty?
	..pred-types -> Any
	.Seq
	..Try -> fails? oh-no!
	..types.Method -> impl!
	..types.Record-Type
	..types.util -> self-type

? = Record-Type
	doc. "
		A Seq with 0 or 1 elements.
		Its content can never be null.
	members.
		val.

full-? = |x
	?
		val. x
empty-? =
	?
		val. undefined

region Is Seq
	<! ? Seq

	impl! empty? ? |_
		reference=? _ empty-?

	impl! iterator ? ~|case!
		empty?_
			()
		else
			<~ _.val

	<! (self-type ?) Bag-Type

	impl! from-stream (self-type ?) |_ stream
		ignore _ \ TODO:Ignored vars
		iter = iterator stream
		value done = iter.next ()
		case
			done
				empty ?
			else
				full-? value

	impl! empty (self-type ?) (thunk empty-?

region Funs
	Opt->?.
		doc. "`?` containing the value iff it is neither null nor undefined."
		test. |
			[ 0 ]  -> => ? [ 0 ]
			[ () ] -> empty ?
		|case
			:Any
				full-? _
			else
				empty ?

	?->Opt.
		doc. "Extracts the value from a `?`, or returns null."
		test. |
			[ (=> ? [ 0 ]) ] -> 0
			!not contains? Any (?->Opt (empty ?))
		|_:?
			_.val

	\ TODO: Just use first?
	un-?.
		doc. "Tries to extract the value out of a `?`. Throws an error if it is empty."
		test. |
			[ (=> ? [ 1 ]) ] -> 1
			! fails? |
				un-? (empty ?)
		|_:?
			case
				empty?_
					oh-no! "Tried to force empty `?`."
				else
					_.val

	get-or.
		doc. "If ?some, gets the value. Else defaults to `or`."
		test. |
			"TODO"
		|:Any _:? ~or:Any
			case
				empty?_
					or
				else
					_.val

?
