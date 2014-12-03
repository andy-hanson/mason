use
	.Array
	.Bag -> map
	.Deque!
	..basic-methods -> => type-of
	..show -> inspect-impl show-impl
	..types.Method -> impl!

impl! inspect-impl Bag
	test. |
		[ (=> Deque! [ 1 2 3 ]) ] -> "(Deque!)[ 1 2 3 ]"
	|_
		"({type-of_}){_}"

impl! show-impl Bag
	test. |
		[ [ 1 2 3 ] ] -> "[ 1 2 3 ]"
	|_
		show-ems = => Array (map _ show)
		"[ {show-ems.join " "} ]"
