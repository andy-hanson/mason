use
	...Type.Kind kind! self-kind!
	...Type.Method impl! self-impl!
	...Type.Wrap-Type
	..@ ++! --! empty! iterator
	..@-Type _ empty
	..Map.Map keys
	..Map.Hash-Map
	..Map.Map assoc! un-assoc!
	.Set

Hash-Set. Wrap-Type
	doc. "
		Set that considers elements equal using =?.
		Relies on an efficient hash-code implementation.
	wrapped-type. Hash-Map

self-kind! Hash-Set @-Type
self-impl! empty Hash-Set |
	Hash-Set (empty Hash-Map)

impl! iterator Hash-Set .|
	iterator (keys .val)

kind! Hash-Set Set

# TODO: Make default falling back to +!
impl! ++! Hash-Set .!|@added
	for! em in @added
		assoc! .val em true

# TODO: Make default falling back to -!
impl! --! Hash-Set .!|@deleted
	for! em in @deleted
		un-assoc! .val em

impl! empty! Hash-Set .!|
	empty! .val
