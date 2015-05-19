use
	...Function identity
	...methods sub
	...Type.Method impl! self-impl!
	...Type.Kind _ kind! self-kind!
	..@
	..@-Type _ empty from-stream
	.Map
use~
	.Hash-Map!
	.Map! assoc!

Map-Type = Kind
	doc. "Any sub-type of Map."

kind! Map-Type @-Type

# TODO: Do this in index.ms
self-kind! Map Map-Type
self-impl! empty Map |
	empty Hash-Map!

impl! sub Map-Type identity

impl! from-stream Map-Type
	test. |
		# TODO: Better test
		m =
			1 -> 2
			3 -> 4
		[ Hash-Map! m ] ->
			1 -> 2
			3 -> 4
	|type stream:@
		map = empty type
		for! stream
			assoc! map _.key _.val
		map

Map-Type