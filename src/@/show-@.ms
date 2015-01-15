use
	.Array
	..@ -> map
	.Deque!
	..methods -> => empty empty? type-of
	..Object -> flag?
	..show
	..Str -> indent
	..types.Method -> impl! impl-for

impl! show @
	test. |
		\ TODO:SYNTAX [ repr. ]
		r =
			repr.
		d = => Deque! [ 1 2 3 ]
		[ d ] -> "
			\n\t. 1
				. 2
				. 3
		[ d r ] -> "
			=> Deque!
				. 1
				. 2
				. 3
		[ (empty Deque!) ] -> "[ ]"
		[ (empty Deque!) r ] -> "empty Deque!"

	|_ opts
		content = case
			empty?_
				"[ ]"
			else
				\ TODO: mk-Str
				ems = map _ |em
					indent (show em opts
				"
					\n\t. {=> Str ems "\n\t. "}
		case
			flag? opts "repr"
				case
					empty?_
						"empty {type-of_}"
					else
						"=> {type-of_}{content}"
			else
				content

\ Explicit impl!s for Array so that it doesn't act like a Map
impl! show Array (impl-for show @)
