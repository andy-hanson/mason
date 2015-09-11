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
		cond if? then? true

xor.
	doc. "True if `a` and `b` differ."
	test. |
		[false false] -> false
		[false true] -> true
		[true false] -> true
		[true true] -> false
	|a:Boolean b:Boolean
		cond a (not b) b
