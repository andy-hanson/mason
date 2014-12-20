use
	.Array
	.Bag -> from-stream
	..Comparable! -> <!
	..Fun -> identity
	..methods -> => empty sub
	.Range -> range
	..types.Interface
	..types.Method -> impl!
	..types.util -> self-type

Bag-Type = Interface
	doc. "Any sub-type of Bag."

impl! sub Bag-Type identity

\ TODO: Do this in Bag.ms
<! (self-type Bag) Bag-Type
impl! empty (self-type Bag) |
	empty Array

impl! => Bag-Type Bag
	doc. "TODO"
	test. |
		[ Array (range 0 5) ] -> [ 0 1 2 3 4 ]
	|type bag
		from-stream type.prototype bag

Bag-Type
