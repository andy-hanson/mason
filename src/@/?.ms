use
	..Fun ignore thunk
	..js defined? reference=?
	..Type.Impl-Type self-type
	..Type.Kind kind!
	..Type.Method impl!
	..Type.Wrap-Type
	..@ empty? iterator
	.@-Type _ empty from-stream
	.Seq
use~
	..Try oh-no!
debug use~
	..! _ !not
	..Try fails?
? = Wrap-Type
	doc. "
		A Seq with 0 or 1 elements.
		TODO: MORE

empty-marker =
	doc. "`_.val` on an empty `?` will return this."
empty-? =
	? empty-marker

region Is Seq
	kind! (self-type ?) @-Type

	impl! from-stream (self-type ?) |_ stream
		ignore _ \ TODO:Ignored vars
		iter = iterator stream
		value done = iter.next ()
		case
			done
				empty-?
			else
				? value

	impl! empty (self-type ?) (thunk empty-?

	kind! ? Seq

	impl! empty? ? |_
		reference=? _ empty-?

	impl! iterator ? ~|case!
		empty?_
			()
		else
			<~ _.val

region Funs
	Opt->?.
		doc. "`?` containing the value iff it is defined."
		test. |
			[ 0 ] -> ? 0
			[ () ] -> ? ()
			[ undefined ] -> empty ?
		|case
			defined?_
				? _
			else
				empty ?

	?->Opt.
		doc. "Extracts the value from a `?`, or returns undefined."
		test. |
			[ (? 0) ] -> 0
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
			[ (? 1) ] -> 1
			! fails? |
				un-? (empty ?)
		|_:? ~fail-message
			case
				empty?_
					oh-no! (?-or (Opt->? fail-message) "Tried to force empty `?`."
				else
					_.val

	?-or.
		doc. "If empty, defaults to `or` - else returns its value."
		test. |
			[ (empty ?) 1 ] -> 1
			[ (? 1) 2 ] -> 1
		|_:? ~or
			case
				empty?_
					or
				else
					_.val

?
