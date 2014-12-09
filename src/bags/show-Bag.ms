use
	.Array
	.Bag -> map
	.Deque!
	..methods -> => empty? type-of
	..show -> inspect-impl show-impl
	..types.Method -> impl! impl-for

impl! inspect-impl Bag
	test. |
		[ (=> Deque! [ 1 2 3 ]) ] -> "(Deque!)[ 1 2 3 ]"
		[ [ 1 2 3 ] ] -> "(Array)[ 1 2 3 ]"
	|_
		"({type-of_}){_}"

impl! show-impl Bag
	test. |
		[ [ 1 2 3 ] ] -> "[ 1 2 3 ]"
	|case
		empty?_
			"[ ]"
		else
			show-ems = => Array (map _ show)
			"[ {show-ems.join " "} ]"

\ Explicit impl!s for Array so that it doesn't act like a Map
impl! inspect-impl Array (impl-for inspect-impl Bag)
impl! show-impl Array (impl-for show-impl Bag)
