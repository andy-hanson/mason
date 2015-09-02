use
	# TODO:SYNTAX use global.Set but rename it to Js-Set
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

# TODO: Make default falling back to +!
impl! ++! Id-Set .!|@added
	for! em in @added
		.add em

impl! empty! Id-Set .!|
	.clear()

# TODO: Make default falling back to -!
impl! --! Id-Set .!|@deleted
	for! em in @deleted
		.delete em

impl! contains? Id-Set .|_
	.has_
