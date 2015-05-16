use
	esast.dist.mangle-identifier unmangle
	..Object flag?
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
				unmangle type.name
