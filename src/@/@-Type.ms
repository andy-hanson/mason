use
	..control returning
	..Fun identity
	..methods <! empty sub
	..Type =>
	..Type.Impl-Type self-type
	..Type.Kind
	..Type.Method _ impl!
	..@
use~
	.@! ++!
	.Array
debug use~
	.Range range

@-Type = Kind
	doc. "Any sub-type of @."

impl! sub @-Type identity

\ TODO: Do this in index.ms
<! (self-type @) @-Type
impl! empty (self-type @) |
	empty Array

from-stream. Method
	doc. |_ stream:@
		"Creates a new value of this type by reading out from an @'s iterator."
	test. |
		[ Array (range 0 5) ] -> [ 0 1 2 3 4 ]
	default. |type stream
		returning (empty type) |_
			++! _ stream

impl! => @-Type @ from-stream

@-Type
