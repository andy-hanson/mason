use
	.js -> global
	.types.Method -> impl!
	.show -> inspect-impl

Bool =
	doc. "TODO"
	global.Boolean

true. `true`
false. `false`

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

nand.
	doc. "True if either of `a` or `b` is false."
	test. |
		[ false false ] -> true
		[ false true ] -> true
		[ true false ] -> true
		[ true true ] -> false
	|cond-0:Bool ~cond-1:Bool
		not (and cond-0 ~cond-1)

nor.
	doc. "True iff both `a` and `b` are false."
	test. |
		[ false false ] -> true
		[ false true ] -> false
		[ true false ] -> false
		[ true true ] -> false
	|cond-0:Bool ~cond-1:Bool
		not (or cond-0 ~cond-1)

not.
	doc. "True iff `a` isn't."
	test. |
		[ false ] -> true
		[ true ] -> false
	|cond:Bool
		case
			cond
				false
			else
				true

xor.
	doc. "True if `a` and `b` differ."
	test. |
		[ false false ] -> false
		[ false true ] -> true
		[ true false ] -> true
		[ true true ] -> false
	|cond-0:Bool cond-1:Bool
		case
			cond-0
				not cond-1
			else
				cond-1

Bool
