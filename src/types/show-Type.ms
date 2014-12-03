use
	..bags.Bag -> empty?
	.Method -> impl!
	..Object -> ?get-property
	..show -> inspect show-impl
	.Type

impl! show-impl Type
	test. |
		[ Method ] -> "Method"
	|type
		case ?get-property type "displayName"
			empty?_
				inspect type
			else
				_.val

()
