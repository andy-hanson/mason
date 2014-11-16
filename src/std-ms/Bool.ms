use
	.assert -> !=
	.js -> global

Bool =
	doc. "TODO"
	global.Boolean

true. `true`
false. `false`

and.
	doc. "True iff both `a` and `b` are."
	test. |
		!= (and false false) false
		!= (and false true) false
		!= (and true false) false
		!= (and true true) true
	|a:Bool ~b:Bool
		case
			a
				b
			else
				false

or.
	doc. "True iff either `a` or `b` is."
	test. |
		!= (or false false) false
		!= (or false true) true
		!= (or true false) true
		!= (or true true) true
	|a:Bool ~b:Bool
		case
			a
				true
			else
				b

nand.
	doc. "True if either of `a` or `b` is false."
	test. |
		!= (nand false false) true
		!= (nand false true) true
		!= (nand true false) true
		!= (nand true true) false
	|a:Bool ~b:Bool
		not (and a ~b)

nor.
	doc. "True iff both `a` and `b` are false."
	test. |
		!= (nor false false) true
		!= (nor false true) false
		!= (nor true false) false
		!= (nor true true) false
	|a:Bool ~b:Bool
		not (or a ~b)

not.
	doc. "True iff `a` isn't."
	test. |
		!= (not false) true
		!= (not true) false
	|a:Bool
		case
			a
				false
			else
				true

xor.
	doc. "True if `a` and `b` differ."
	test. |
		!= (xor false false) false
		!= (xor false true) true
		!= (xor true false) true
		!= (xor true true) false
	|a:Bool b:Bool
		case
			a
				not b
			else
				b

Bool
