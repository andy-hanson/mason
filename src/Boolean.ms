use
	.private.js-impl iAnd iOr

not.
	doc. "Negation of a Boolean."
	test. |
		[ false ] -> true
		[ true ] -> false
	|_:Boolean
		case
			_
				false
			else
				true

and.
	doc. "
		True iff all conditions are true.
		Equivalent to `all? args`.
		All arguments after the first may be lazy."
	test. |
		[ false false ] -> false
		[ false true ] -> false
		[ true false ] -> false
		[ true true ] -> true
		[ true true false ] -> false
	iAnd

nand.
	doc. "Negation of and."
	test. |
		[ false false ] -> true
		[ false true ] -> true
		[ true false ] -> true
		[ true true ] -> false
		[ true true false ] -> true
	|...args
		not (and ...args

or.
	doc. "
		True iff any condition is true.
		Equivalent to `any? args`.
		All arguments after the first may be lazy.
	test. |
		[ false false ] -> false
		[ false true ] -> true
		[ true false ] -> true
		[ true true ] -> true
		[ false false true ] -> true
	iOr

nor.
	doc. "Negation of or."
	test. |
		[ false false ] -> true
		[ false true ] -> false
		[ true false ] -> false
		[ true true ] -> false
		[ false false true ] -> false
	|...args
		not (or ...args)

implies.
	doc. "
		Whether `then` is true whenever `if` is.
		Always true when `if` is false.
	test. |
		[ false false ] -> true
		[ false true ] -> true
		[ true false ] -> false
		[ true true ] -> true
	|if?:Boolean ~then?:Boolean
		case
			if?
				then?
			else
				true

xor.
	doc. "True if `a` and `b` differ."
	test. |
		[ false false ] -> false
		[ false true ] -> true
		[ true false ] -> true
		[ true true ] -> false
	|a:Boolean b:Boolean
		case
			a
				not b
			else
				b
