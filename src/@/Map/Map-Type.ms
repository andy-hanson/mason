import
	...Type.Kind _ kind! self-kind!
	...Type.Method impl! self-impl!
	..@-Type _ empty from-stream
	.Map _ assoc!
import~
	.Id-Map
import-debug
	.Hash-Map

Map-Type. new Kind
	| Map or any sub-type.
	name.

todo  Do this in Map.ms ?
self-kind! Map Map-Type
self-impl! empty Map |
	empty Id-Map

kind! Map-Type @-Type
impl! from-stream Map-Type
	test. |
		todo  Better test
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
			todo SYNTAX Array destructure
			assoc! map _[0] _[1]
		map
