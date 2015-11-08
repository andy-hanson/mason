import
	..control opr
	..js defined? id=?
	..private.bootstrap msDef
	..to-string _ inspect
	..Type.Kind self-kind!
	..Type.Method self-impl!
	..Type.Type extract
	.@ empty? iterator
	.@-Type _ empty from-stream
	.Seq.Seq

|| I've measured and code is at least twice as fast when using a single option type
|| rather than a ?, ?Some, ?None type heirarchy.

?. class kind Seq
	| A Seq with 0 or 1 elements.
	todo MORE

	do
		self-kind! _ @-Type

	static
		empty |
			?None

		from-stream |_
			iter = iterator_
			value done = iter.next()
			cond done ?None (?some value)

	construct .val
		pass

	empty? |
		id=? this ?None

	iterator ~!|
		unless empty? this
			<~ .val

	to-string |
		inspect this

	inspect |
		case
			empty? this
				'?None
			else
				"?some {inspect .val}"

empty-marker =
	| `_.val` on an empty `?` will return this.
	new Object

?None. new ? empty-marker
?some. |_
	new ? _

self-impl! extract ?some |case
	empty?_
		null
	else
		[_.val]

msDef 'some ?some
msDef 'None ?None

region Functions
	Opt->?. |_
		| `?` containing the value iff it is defined.
		todo  `if-test defined? _` ?
		if defined?_
			_

	?->Opt. |_:?
		| Extracts the value from a `?`, or returns undefined.
		case
			empty?_
				undefined
			else
				_.val

	todo  Just use first?
	un-?. |_:? ~fail-message
		| Tries to extract the value out of a `?`. Throws an error if it is empty.
		forbid empty?_ throw opr fail-message "Tried to force empty `?`."
		_.val

	?-or. |_:? ~or-else
		| If empty, defaults to `or` - else returns its value.
		case
			empty?_
				or-else
			else
				_.val
