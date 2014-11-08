use
	.? -> ?none
	.Bool -> not
	.error -> oh-no!
	.Interface
	.Method
	.pred-types -> Any
	.Seq -> empty?

get. Method
	doc. |:Any _ key:Any
		"Value corresponding to `key`. Fails if not `has-key? _ key`."
	default. |map key:Any
		case ?get map key
			empty?_
				oh-no! "{map} does not contain {key}."
			else
				_.val

?get. Method
	doc. |:? _ key:Any
		"?some of the value corresponding to `key`, or ?none if not `has-key? _ key`."
\	default. |_ key:Any
\		case
\			has? _ key
\				?some (get _ key)
\			else
\				?none


has-key?. Method
	doc. |:Bool _ key:Any
		"Whether the key is in the Map."
	default. |map key:Any
		not (empty? (?get map key))

keys. Method
	doc. |:Seq _
		"Seq of every key that the Map `has-key?`."

keys-values. Method
	doc. |:Seq[Any]
		"Every \{ key, val }."
	default. |map
		(keys map).map |_
			key. _
			val. get map _

Map = Interface
	doc. "Mapping from keys to values."
	methods.
		. get
		. ?get
		. has-key?
		. keys
		. keys-values

Map
