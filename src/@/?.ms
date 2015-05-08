use
	..Bool and not
	..control opr
	..js defined? id=?
	..Type.Kind kind! self-kind!
	..Type.Method impl! self-impl!
	..Type.Pred-Type
	..Type.Wrap-Type
	..Type.Type extract
	.@ empty? iterator
	.@-Type _ empty from-stream
	.Seq.Seq
use~
	..Try oh-no!
use-debug
	..! _ !not
	..compare =?
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
	self-kind! ? @-Type

	self-impl! from-stream ? |stream
		iter = iterator stream
		value done = iter.next ()
		case
			done
				empty-?
			else
				? value

	self-impl! empty ? |
		empty-?

	kind! ? Seq

	impl! empty? ? |_
		id=? _ empty-?

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

	# TODO: Just use first?
	un-?.
		doc. "Tries to extract the value out of a `?`. Throws an error if it is empty."
		test. |
			[ (? 1) ] -> 1
			! fails? |
				un-? (empty ?)
		|_:? ~fail-message
			case
				empty?_
					oh-no! (opr fail-message "Tried to force empty `?`."
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

Some. Pred-Type
	doc. "TODO"
	predicate. |_
		and :? ~(not empty?_
	test. |
		case ? 1
			:Some val
				! =? val 1

self-impl! extract Some |case
	:Some
		[ _.val ]
	else
		()

?
