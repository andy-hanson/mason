use
	...Object flag?
	...show
	...Type.Method impl!
	...Type.Type => type-of
	..@ map'
	.Map
	.Weak-Id-Map

impl! show Map
	test. |
		m =
			1 -> 2
		[ m ] -> "\n\t1 -> 2"
		# TODO:SYNTAX [ m repr. ]
		# TODO
		# [ m (repr. true) ] -> "
		#	Hash-Map
		#		1 -> 2
	.|opts
		# TODO: map Map to Array
		# TODO:SYNTAX Array destructure
		parts = map' this |pair
			"{show pair[0] opts} -> {show pair[1] opts}"
		type = case
			flag? opts "repr"
				show (type-of this) opts
			else
				""
		"
			{type}
				{=> String parts "\n\t"}

impl! show Weak-Id-Map |
	"<a Weak-Id-Map>"
