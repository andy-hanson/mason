use
	..assert -> !=
	..bags.? -> ?none get-or
	..bags.Array
	..bags.Bag -> each! empty? map
	..bags.Seq
	..basic-methods -> freeze sub
	..Bool -> not
	..error -> oh-no!
	..Fun
	.Hash-Map
	.Map! -> set!
	..math.Num -> increment
	..pred-types -> Any
	..types.Interface
	..types.Method -> impl!

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
		map keys |k
			key. k
			val. map[k]

Map = Interface
	doc. "Mapping from keys to values."
	methods.
		. sub
		. ?get
		. has-key?
		. keys
		. keys-values

\get. Method
\	doc. |:Any _ key:Any
\		"Value corresponding to `key`. Fails if not `has-key? _ key`."
\	default. |map key:Any
\		case ?get map key
\			empty?_
\				oh-no! "{map} does not contain {key}."
\			else
\				_.val

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

Map
