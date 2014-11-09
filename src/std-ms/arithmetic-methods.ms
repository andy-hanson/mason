\ TODO: Merge with basic-methods?

use
	.types.Method

+. Method
	doc. |a b
		"Combines two values of the same type into a greater value of that type."

-. Method
	doc. |a b
		"Inverse of `+`. Takes `b` away from `a`. `+ b res` should be `a`."

*. Method
	doc. |a b
		"`b` copies of `a`."

/. Method
	doc. |a b
		"Inverse of `*`. `* b res` should be `a`."
