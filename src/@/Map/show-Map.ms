use
	...Obj flag?
	...show
	...Str
	...Type.Method impl!
	...Type.Type => type-of
	..@ map'
	.Map
	.Weak-Id-Map!

impl! show Map
	test. |
		m =
			1 -> 2
		[ m ] -> "\n\t1 -> 2"
		# TODO:SYNTAX [ m repr. ]
		# TODO
		# [ m (repr. true) ] -> "
		#	Hash-Map!
		#		1 -> 2
	|_ opts
		# TODO: map Map to Array
		parts = map' _ |pair
			key val = pair
			"{show key opts} -> {show val opts}"
		type = case
			flag? opts "repr"
				show type-of_ opts
			else
				""
		"
			{type}
				{=> Str parts "\n\t"}

impl! show Weak-Id-Map! |
	"<a Weak-Id-Map!>"
