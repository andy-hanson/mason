use
	.js -> global

Bool =
	doc. "TODO"
	global.Boolean

true. `true`
false. `false`

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
	|a:Bool ~b:Bool
		case
			a
				true
			else
				b

nand.
	doc. "True if either of `a` or `b` is false."
	test. |
		[ false false ] -> true
		[ false true ] -> true
		[ true false ] -> true
		[ true true ] -> false
	|a:Bool ~b:Bool
		not (and a ~b)

nor.
	doc. "True iff both `a` and `b` are false."
	test. |
		[ false false ] -> true
		[ false true ] -> false
		[ true false ] -> false
		[ true true ] -> false
	|a:Bool ~b:Bool
		not (or a ~b)

not.
	doc. "True iff `a` isn't."
	test. |
		[ false ] -> true
		[ true ] -> false
	|a:Bool
		case
			a
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
	|a:Bool b:Bool
		case
			a
				not b
			else
				b

Bool
