use
	...Obj flag?
	...show
	...Str
	...Type => type-of
	...Type.Method impl!
	...@ map
	..Map
	.Weak-Id-Map!
use-debug
	...Bool true

impl! show Map
	test. |
		m =
			1 -> 2
		[ m ] -> "\n\t1 -> 2"
		# TODO:SYNTAX [ m repr. ]
		[ m (repr. true) ] -> "
			Hash-Map!
				1 -> 2
	|_ opts
		parts = map _ |pair
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
