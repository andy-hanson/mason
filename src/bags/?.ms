use
	..assert -> ! !not
	.Bag -> iterator
	.Bag-Type -> from-stream
	..Comparable! -> <!
	..Fun -> ignore thunk
	..js -> defined? reference=?
	..methods -> => empty empty?
	.Seq
	..Try -> fails? oh-no!
	..types.Method -> impl!
	..types.Record-Type
	..types.util -> self-type

empty-marker =
	doc. "`_.val` on an empty `?` will return this."

? = Record-Type
	doc. "
		A Seq with 0 or 1 elements.
		TODO: MORE
	members.
		val.

full-? = |x
	?
		val. x
empty-? =
	?
		val. empty-marker

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
		doc. "`?` containing the value iff it is defined."
		test. |
			[ 0 ]  -> => ? [ 0 ]
			[ () ] -> => ? [ () ]
			[ undefined ] -> empty ?
		|case
			defined?_
				full-? _
			else
				empty ?

	?->Opt.
		doc. "Extracts the value from a `?`, or returns undefined."
		test. |
			[ (=> ? [ 0 ]) ] -> 0
			!not defined? (?->Opt (empty ?
		|_:?
			case
				empty?_
					undefined
				else
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
		doc. "If empty, defaults to `or` - else returns its value."
		test. |
			"TODO"
		|_:? ~or
			case
				empty?_
					or
				else
					_.val

?
