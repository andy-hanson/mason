use
	..Bool -> not
	..Comparable -> =?
	..Fun -> identity
	..methods -> + empty empty? freeze sub
	..pred-types -> Any
	..types.Interface
	..types.Method -> impl!
	..types.util -> self-type
use~
	..!
	..@ -> each! map
	..@.? -> un-?
	.Hash-Map!
	.Map! -> assoc!

Map = Interface
	doc. "Mapping from keys to values."

?get. Method
	doc. |:? _ key:Any
		"`?` containing the value corresponding to `key`, if any."

has-key?. Method
	doc. |:Bool _ key:Any
		"Whether the key is in the Map."
	default. |_ key:Any
		not (empty? (?get _ key

keys. Method
	doc. |:@ _
		"Every key that the Map `has-key?`."

values. Method
	doc. |:@ _
		"Every value in the Map."
	default. |_
		map keys_ |key
			_[key]

keys-values. Method
	doc. |:@[Any]
		"Every \{ key, val }."
	default. |_
		map keys_ |k
			key. k
			val. _[k]

make-map.
	doc. "TODO"
	test. |
		map = make-map [ 1 2 ] |x
			+ x 1
		! =? map[1] 2
		! =? map[2] 3
	|keys:@ mapper:Fun
		map = empty Hash-Map!
		each! keys |key
			assoc! map key (mapper key)
		freeze map

impl! sub Map |map key:Any
	un-? (?get map key) ~"{map} does not contain {key}."

impl! empty? Map |_
	empty? keys_

\ TODO: impl! sub Map-Type identity
impl! sub (self-type Map) identity

each-pair!.
	doc. "TODO"
	test. |
		"TODO"
	|_:Map do-each:Fun
		each! keys_ |key
			do-each key _[key]

Map
