use
	.Method -> impl!
	..methods -> empty?
	..Object -> ?get-property
	..show
	.Type

impl! show Type
	test. |
		[ Method ] -> "Method"
	|type
		case ?get-property type "displayName"
			empty?_
				type.toString ()
			else
				_.val

		\ TODO
		\case ?get-property type "displayName"
		\	empty?_
		\		inspect type
		\	else
		\		_.val

()
