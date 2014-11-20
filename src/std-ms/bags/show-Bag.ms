use
	.Array
	.Bag -> map
	.Deque!
	..basic-methods -> => type-of
	..show -> inspect
	..types.Method -> impl!

impl! inspect Bag
	test. |
		[ (=> Deque! [ 1 2 3 ]) ] -> "(Deque!)[ 1 2 3 ]"
	|_
		"({type-of_}){_}"

impl! show Bag
	test. |
		[ [ 1 2 3 ] ] -> "[ 1 2 3 ]"
	|_
		show-ems = => Array (map _ show)
		"[ {show-ems.join " "} ]"
