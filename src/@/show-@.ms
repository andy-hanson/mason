use
	..@ _ map
	..methods => empty?
	..Obj flag?
	..show
	..Str _ indent
	..Type type-of
	..Type.Method impl! impl-for
	.Array
debug use~
	..Bool true
	..methods empty
	.Deque!

impl! show @
	test. |
		d = => Deque! [ 1 2 3 ]
		[ d ] -> "
			\n\t. 1
				. 2
				. 3
		\ TODO:SYNTAX [ d repr. ]
		[ d (repr. true) ] -> "
			=> Deque!
				. 1
				. 2
				. 3
		[ (empty Deque!) ] -> "[ ]"
		[ (empty Deque!) (repr. true) ] -> "empty Deque!"

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
