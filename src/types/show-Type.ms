use
	..methods empty?
	..Obj ?p
	..show
	.Method impl!
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
