use
	.Array
	..@
	..Comparable! -> <!
	..Fun -> identity
	..methods -> => empty sub
	.Range -> range
	..types.Interface
	..types.Method -> impl!
	..types.util -> self-type

@-Type = Interface
	doc. "Any sub-type of @."

impl! sub @-Type identity

\ TODO: Do this in index.ms
<! (self-type @) @-Type
impl! empty (self-type @) |
	empty Array

impl! => @-Type @
	doc. "TODO"
	test. |
		[ Array (range 0 5) ] -> [ 0 1 2 3 4 ]
	\ TODO: fun-copy
	|type _
		from-stream type _

from-stream. Method
	doc. |_ stream:@
		"
			TODO

@-Type
