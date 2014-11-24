\ Put some code here and run `node --harmony src/test-compile`
Any = 1
? = 1
empty? = 1

get-or.
	doc. "If ?some, gets the value. Else defaults to `or`."
	test. |
		"TODO"
	|:Any _:? ~or:Any
		case
			empty?_
				or
			else
				_.val
