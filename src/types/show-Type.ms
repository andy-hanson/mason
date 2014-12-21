use
	.Method -> impl!
	..methods -> empty?
	..Object -> ?get-property
	..show -> inspect
	.Type

impl! show Type
	test. |
		[ Method ] -> "Method"
	|type
		case ?get-property type "displayName"
			empty?_
				inspect type
			else
				_.val

()
