use
	..Boolean and not
	..control opr
	..js defined? id=?
	..private.bootstrap msDef
	..Type.Js-Method js-impl!
	..Type.Kind kind! self-kind!
	..Type.Method self-impl!
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

?. Wrap-Type
	doc. "
		A Seq with 0 or 1 elements.
		TODO: MORE

empty-marker =
	doc. "`_.val` on an empty `?` will return this."
empty-? =
	? empty-marker

msDef "some" ?
msDef "None" empty-?

region Is Seq
	self-kind! ? @-Type
		from-stream -> |stream
			iter = iterator stream
			value done = iter.next()
			case
				done
					empty-?
				else
					? value

		empty -> |
			empty-?

	kind! ? Seq
		empty? -> |_
			id=? _ empty-?

	js-impl! iterator ? ~!|
		unless! empty? this
			<~ this.val

region Functions
	Opt->?.
		doc. "`?` containing the value iff it is defined."
		test. |
			[ 0 ] -> ? 0
			[ null ] -> ? null
			[ undefined ] -> empty ?
		|_
			# TODO: `if-test defined? _` ?
			if defined?_
				_

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
	# TODO: Move to test of self-impl!
	test. |
		case ? 1
			:Some val
				! =? val 1

self-impl! extract Some |case
	:Some
		[ _.val ]
	else
		null
