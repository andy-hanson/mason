use
	..assert -> !=
	..bags.? -> ?none get-or
	..bags.Array
	..bags.Bag -> each! empty? map
	..bags.Seq
	..basic-methods -> freeze sub
	..Bool -> not
	..error -> oh-no!
	..Fun -> identity
	.Hash-Map
	.Map! -> set!
	..math.Num -> increment
	..pred-types -> Any
	..types.Interface
	..types.Method -> impl! impl-direct!

?get. Method
	doc. |:? _ key:Any
		"?some of the value corresponding to `key`, or ?none if not `has-key? _ key`."

has-key?. Method
	doc. |:Bool _ key:Any
		"Whether the key is in the Map."
	default. |_ key:Any
		not (empty? (?get _ key))

keys. Method
	doc. |:Seq _
		"Seq of every key that the Map `has-key?`."

values. Method
	doc. |:Seq _
		"Seq of every value in the Map."
	default. |_
		map keys_ |key
			_[key]

keys-values. Method
	doc. |:Seq[Any]
		"Every \{ key, val }."
	default. |_
		map keys_ |k
			key. k
			val. _[k]

Map = Interface
	doc. "Mapping from keys to values."
	methods.
		. sub
		. ?get
		. has-key?
		. keys
		. keys-values

make-map.
	doc. "TODO"
	test. |
		map = make-map (Array.of 1 2) increment
		!= map[1] 2
		!= map[2] 3

	|keys:Bag mapper:Fun
		map = Hash-Map.new-empty ()
		each! keys |key
			set! map key (mapper key)
		freeze map

impl! sub Map |map key:Any
	get-or (?get map key) ~(oh-no! "{map} does not contain {key}.")

impl-direct! sub Map identity

Map
