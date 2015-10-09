implies. |if?:Boolean ~then?:Boolean
	| Whether `then` is true whenever `if` is.
	| Always true when `if` is false.
	cond if? then? true

xor. |a:Boolean b:Boolean
	| True if `a` and `b` differ.
	cond a (not b) b
