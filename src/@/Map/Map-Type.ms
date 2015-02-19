use
	...control returning
	...Fun identity
	...methods sub
	...Type =>
	...Type.Impl-Type self-type
	...Type.Method _ impl!
	...Type.Kind _ kind!
	..@-Type _ empty
	..Map
use~
	.Hash-Map!
	.Map! assoc*!

Map-Type = Kind
	doc. "Any sub-type of Map."

kind! Map-Type @-Type

\ TODO: Do this in index.ms
kind! (self-type Map) Map-Type
impl! empty (self-type Map) |
	empty Hash-Map!

impl! sub Map-Type identity

from-map. Method
	doc. |_ map:Map
		"Creates a new Map that is map? to `map`."
	test. |
		"TODO"
	default. |type map:Map
		returning (empty type) |_
			assoc*! _ map

\ TODO: This isn't overriding @-Type's =>...
impl! => Map-Type from-map

Map-Type