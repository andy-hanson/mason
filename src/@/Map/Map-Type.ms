use
	...Type.Kind _ kind! self-kind!
	..@
	..@-Type _ empty from-stream
	.Map
use~
	.Id-Map!
	.Map! assoc!
use-debug
	.Hash-Map!

Map-Type. Kind
	doc. "Any sub-type of Map."

# TODO: Do this in Map.ms ?
self-kind! Map Map-Type
	empty -> |
		empty Id-Map!

kind! Map-Type @-Type
	from-stream ->
		test. |
			# TODO: Better test
			m =
				1 -> 2
				3 -> 4
			hm = empty Hash-Map!
			assoc! hm 1 2
			assoc! hm 3 4
			[ Hash-Map! m ] -> hm
		|type stream:@
			map = empty type
			for! stream
				# TODO:SYNTAX Array destructure
				assoc! map _[0] _[1]
			map
