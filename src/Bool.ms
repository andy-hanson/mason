use
	.js global
	.private.js-impl i-true i-false

Bool =
	doc. "Either true or false."
	global.Boolean

true. i-true
false. i-false

not.
	doc. "True iff `a` isn't."
	test. |
		[ false ] -> true
		[ true ] -> false
	|_:Bool
		case
			_
				false
			else
				true

\ TODO: Variadic

and.
	doc. "True iff both `a` and `b` are."
	test. |
		[ false false ] -> false
		[ false true ] -> false
		[ true false ] -> false
		[ true true ] -> true
	|cond-0:Bool ~cond-1:Bool
		case
			cond-0
				cond-1
			else
				false

nand.
	doc. "True if either of `a` or `b` is false."
	test. |
		[ false false ] -> true
		[ false true ] -> true
		[ true false ] -> true
		[ true true ] -> false
	|a:Bool ~b:Bool
		case
			a
				not b
			else
				true

or.
	doc. "True iff either `a` or `b` is."
	test. |
		[ false false ] -> false
		[ false true ] -> true
		[ true false ] -> true
		[ true true ] -> true
	|cond-0:Bool ~cond-1:Bool
		case
			cond-0
				true
			else
				cond-1

nor.
	doc. "True iff both `a` and `b` are false."
	test. |
		[ false false ] -> true
		[ false true ] -> false
		[ true false ] -> false
		[ true true ] -> false
	|a:Bool ~b:Bool
		case
			a
				false
			else
				not b

implies.
	doc. "
		Whether `then` is true whenever `if` is.
		Always true when `if` is false.
	test. |
		[ false false ] -> true
		[ false true ] -> true
		[ true false ] -> false
		[ true true ] -> true
	|if:Bool ~then:Bool
		case
			if
				then
			else
				true

xor.
	doc. "True if `a` and `b` differ."
	test. |
		[ false false ] -> false
		[ false true ] -> true
		[ true false ] -> true
		[ true true ] -> false
	|a:Bool b:Bool
		case
			a
				not b
			else
				b

Bool
