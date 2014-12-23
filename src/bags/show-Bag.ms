use
	.Array
	.Bag -> map
	.Deque!
	..methods -> => empty? type-of
	..show -> inspect
	..Str -> indent
	..types.Method -> impl! impl-for

impl! inspect Bag
	test. |
		[ (=> Deque! [ 1 2 3 ]) ] -> "
			=> Deque!
				. 1
				. 2
				. 3

		[ [ 1 2 3 ] ] -> "
			=> Array
				. 1
				. 2
				. 3
	|case
		empty?_
			"empty {type-of_}"
		else
			"
				=> {type-of_}
					{indent show_}

impl! show Bag
	test. |
		[ [ 1 2 3 ] ] -> "
			. 1
			. 2
			. 3
	|case
		empty?_
			"[ ]"
		else
			show-ems = => Array (map _ |em
				". {em}"
			show-ems.join "\n"

\ Explicit impl!s for Array so that it doesn't act like a Map
impl! inspect Array (impl-for inspect Bag)
impl! show Array (impl-for show Bag)
