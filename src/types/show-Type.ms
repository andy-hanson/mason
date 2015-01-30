use
	.Method impl!
	..methods empty?
	..Obj ?p
	..show
	.Type
debug use
	.Method

impl! show Type
	test. |
		[ Method ] -> "Method"
	|type
		case ?p type "displayName"
			empty?_
				type.toString ()
			else
				_.val

()
