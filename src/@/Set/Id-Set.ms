import
	todo SYNTAX use global.Set but rename it to Js-Set
	global
	...Type.Kind kind! self-kind!
	...Type.Method impl! self-impl!
	...Type.Type contains?
	..@ ++! --! count empty!
	..@-Type _ empty
	.Set

Id-Set. global.Set

self-kind! Id-Set @-Type
self-impl! empty Id-Set |
	new Id-Set

kind! Id-Set Set
impl! count Id-Set .|
	.size

todo  Make default falling back to +!
impl! ++! Id-Set .!|@added
	for! @added
		.add _

impl! empty! Id-Set .!|
	.clear()

todo  Make default falling back to -!
impl! --! Id-Set .!|@deleted
	for! @deleted
		.delete _

impl! contains? Id-Set .|_
	.has_
