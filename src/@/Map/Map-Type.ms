import
	...Type.Kind _ kind! self-kind!
	...Type.Method impl! self-impl!
	..@-Type _ empty from-stream
	.Map _ assoc!
import~
	.Id-Map

Map-Type. new Kind
	| Map or any sub-type.
	name.

todo  Do this in Map.ms ?
self-kind! Map Map-Type
self-impl! empty Map |
	empty Id-Map

kind! Map-Type @-Type
impl! from-stream Map-Type .|stream
	map = empty this
	for! stream
		todo SYNTAX Array destructure
		assoc! map _[0] _[1]
	map
