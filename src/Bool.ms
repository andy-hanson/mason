use
	.js global
	.private.js-impl iTrue iFalse iAnd iOr
debug use~
	.Try oh-no!

Bool =
	doc. "
		JavaScript's native Boolean type.
		Either true or false.
	global.Boolean

true. iTrue
false. iFalse

not.
	doc. "Negation of a Bool."
	test. |
		[ false ] -> true
		[ true ] -> false
	|_:Bool
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
		\ No need to run any condition after false.
		[ true false ~(oh-no!()) ] -> false
	iAnd

nand.
	doc. "Negation of and."
	test. |
		[ false false ] -> true
		[ false true ] -> true
		[ true false ] -> true
		[ true true ] -> false
		[ true true false ] -> true
		\ No need to run any condition after false.
		[ true false ~(oh-no!()) ] -> true
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
		\ No need to run any condition after true.
		[ false true ~(oh-no!()) ] -> true
	iOr

nor.
	doc. "Negation of or."
	test. |
		[ false false ] -> true
		[ false true ] -> false
		[ true false ] -> false
		[ true true ] -> false
		[ false false true ] -> false
		\ No need to run any condition after true.
		[ false true ~(oh-no!()) ] -> false
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
