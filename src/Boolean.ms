implies.
	doc. "
		Whether `then` is true whenever `if` is.
		Always true when `if` is false.
	test. |
		[false false] -> true
		[false true] -> true
		[true false] -> false
		[true true] -> true
	|if?:Boolean ~then?:Boolean
		case
			if?
				then?
			else
				true

xor.
	doc. "True if `a` and `b` differ."
	test. |
		[false false] -> false
		[false true] -> true
		[true false] -> true
		[true true] -> false
	|a:Boolean b:Boolean
		case
			a
				not b
			else
				b
