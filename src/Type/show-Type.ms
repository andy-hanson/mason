use
	esast.dist.mangle-identifier unmangle
	..Object flag?
	..show
	.Method _ impl!
	.Type

impl! show Type
	test. |
		[ Method ] -> "Method"
	.|opts
		case
			flag? opts "repr"
				show.default this opts
			else
				unmangle .name

impl! show Method
	test. !|
		pass # TODO
	.|opts
		case
			flag? opts "repr"
				show.default this opts
			else
				unmangle .name
