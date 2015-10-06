import
	..control opr
	..js defined? id=?
	..private.bootstrap msDef
	..to-string
	..Type.Kind kind! self-kind!
	..Type.Method self-impl!
	..Type.Pred-Type
	..Type.Type extract
	.@ empty? iterator
	.@-Type _ empty from-stream
	.Seq.Seq
import-debug
	..compare =?
	..Try fails?

?. class
	| A Seq with 0 or 1 elements.
	todo MORE

	do!
		self-kind! _ @-Type
		kind! _ Seq

	static
		empty |
			?None

		from-stream |_
			iter = iterator_
			value done = iter.next()
			cond done ?None (?some value)

	construct! .val
		pass

	empty? |
		id=? this ?None

	iterator ~!|
		unless! empty? this
			<~ .val

	to-string |
		case
			empty? this
				"None"
			else
				"?some {.val}"

empty-marker =
	| `_.val` on an empty `?` will return this.
	new Object

?None. new ? empty-marker
?some. |_
	new ? _

msDef "some" ?some
msDef "None" ?None

region Functions
	Opt->?.
		| `?` containing the value iff it is defined.
		test. |
			[0] -> ?some 0
			[null] -> ?some null
			[undefined] -> ?None
		|_
			todo  `if-test defined? _` ?
			if defined?_
				_

	?->Opt.
		| Extracts the value from a `?`, or returns undefined.
		test. |
			[(?some 0)] -> 0
			forbid! defined? (?->Opt ?None)
		|_:?
			case
				empty?_
					undefined
				else
					_.val

	todo  Just use first?
	un-?.
		| Tries to extract the value out of a `?`. Throws an error if it is empty.
		test. |
			[(?some 1)] -> 1
			assert! fails? |
				un-? ?None
		|_:? ~fail-message
			forbid! empty?_ throw! opr fail-message "Tried to force empty `?`."
			_.val

	?-or.
		| If empty, defaults to `or` - else returns its value.
		test. |
			[?None 1] -> 1
			[(?some 1) 2] -> 1
		|_:? ~or-else
			case
				empty?_
					or-else
				else
					_.val

Some. new Pred-Type
	todo doc
	name.
	predicate. |_
		and :? not empty?_
	todo  Move to test of self-impl!
	test. !|
		case! ?some 1
			:Some val
				assert! =? val 1

self-impl! extract Some |case
	:Some
		[_.val]
	else
		null
