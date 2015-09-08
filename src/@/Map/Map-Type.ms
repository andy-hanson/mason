use
	...Type.Kind _ kind! self-kind!
	...Type.Method impl! self-impl!
	..@-Type _ empty from-stream
	.Map _ assoc!
use~
	.Id-Map
use-debug
	.Hash-Map

Map-Type. new Kind
	name.
	doc. "Any sub-type of Map."

# TODO: Do this in Map.ms ?
self-kind! Map Map-Type
self-impl! empty Map |
	empty Id-Map

kind! Map-Type @-Type
impl! from-stream Map-Type
	test. |
		# TODO: Better test
		m =
			1 -> 2
			3 -> 4
		hm = empty Hash-Map
		assoc! hm 1 2
		assoc! hm 3 4
		[Hash-Map m] -> hm
	.|stream
		map = empty this
		for! stream
			# TODO:SYNTAX Array destructure
			assoc! map _[0] _[1]
		map
