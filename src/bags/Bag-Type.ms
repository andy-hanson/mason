use
	.Array
	.Bag -> from-stream
	..basic-methods -> => sub
	..Fun -> identity
	.Range -> range
	..types.Interface -> implementor!
	..types.Method -> impl!
	..types.util -> self-type

empty. Method
	doc. "
		Instance of this Bag-Type which is `empty?`.
		Should always return the same thing iff immutable.
Bag-Type = Interface
	doc. "Any sub-type of Bag."

impl! sub Bag-Type identity
implementor! (self-type Bag) Bag-Type
impl! empty (self-type Bag) |
	empty Array

impl! => Bag-Type Bag
	doc. "TODO"
	test. |
		[ Array (range 0 5) ] -> [ 0 1 2 3 4 ]
	|type bag
		from-stream type.prototype bag


Bag-Type
