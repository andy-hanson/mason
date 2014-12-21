use
	.Array
	.Bag -> map
	.Deque!
	..methods -> => empty? type-of
	..show -> inspect
	..types.Method -> impl! impl-for

impl! inspect Bag
	test. |
		[ (=> Deque! [ 1 2 3 ]) ] -> "(Deque!)[ 1 2 3 ]"
		[ [ 1 2 3 ] ] -> "(Array)[ 1 2 3 ]"
	|_
		"({type-of_}){_}"

impl! show Bag
	test. |
		[ [ 1 2 3 ] ] -> "[ 1 2 3 ]"
	|case
		empty?_
			"[ ]"
		else
			show-ems = => Array (map _ show)
			"[ {show-ems.join " "} ]"

\ Explicit impl!s for Array so that it doesn't act like a Map
impl! inspect Array (impl-for inspect Bag)
impl! show Array (impl-for show Bag)
