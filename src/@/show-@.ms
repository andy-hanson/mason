use
	..methods >? empty?
	..Obj flag?
	..show
	..Str _ indent
	..Type => type-of
	..Type.Method impl! impl-for
	..@ _ count map
	.Array
	.Seq take
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
				ems = map _ |em
					indent (show em opts
				show-ems end = case
					>? count_ 100
						show-ems. take ems 100
						end. "\n\t..."
					else
						show-ems. ems
						end. ""
				"\n\t. {=> Str show-ems "\n\t. "}{end}"
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
