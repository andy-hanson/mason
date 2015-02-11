use
	..control returning
	..Fun identity
	..methods <! empty sub
	..Type =>
	..Type.Impl-Type self-type
	..Type.Method _ impl!
	..Type.Kind
	..Map
use~
	.Hash-Map!
	.Map! assoc*!

Map-Type = Kind
	doc. "Any sub-type of Map."

impl! sub Map-Type identity

\ TODO: Do this in index.ms
<! (self-type Map) Map-Type
impl! empty (self-type Map) |
	empty Hash-Map!

from-map. Method
	doc. |_ map:Map
		"Creates a new Map that is map? to `map`."
	test. |
		"TODO"
	default. |type map:Map
		returning (empty type) |_
			assoc*! _ map

impl! => Map-Type Map from-map

Map-Type