import
	...Type.Kind self-kind!
	...Type.Method self-impl!
	..@-Type _ empty from-stream
	.Map
import~
	.Id-Map

Map-Type. kind @-Type
	| Map or any sub-type.

	do
		todo Do this in Map.ms ?
		self-kind! Map _

	static
		empty |
			empty Id-Map

	from-stream |stream
		map = empty this
		for stream
			todo SYNTAX Array destructure
			map[_[0]] = _[1]
		map

todo move
|| Can't use map literals to define methods becuase this is a dependency of Id-Map
self-impl! empty Map |
	empty Id-Map
