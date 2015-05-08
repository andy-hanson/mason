use
	..@.? ?-or
	..Obj flag? ?p
	..show
	.Method impl!
	.Type
use-debug
	.Method

impl! show Type
	test. |
		[ Method ] -> "Method"
	|type opts
		case
			flag? opts "repr"
				show.default type opts
			else
				?-or (?p type "displayName") "<anonymous Type>"
