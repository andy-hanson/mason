use
	..methods empty?
	..Obj flag? ?p
	..show
	.Method impl!
	..Type
debug use
	.Method

impl! show Type
	test. |
		[ Method ] -> "Method"
	|type opts
		case
			flag? opts "repr"
				show.default type opts
			else
				case ?p type "displayName"
					empty?_
						"<anonymous Type>"
					else
						_.val

()
