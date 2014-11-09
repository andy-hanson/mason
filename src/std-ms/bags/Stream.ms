use
	.Array -> ->Array
	..assert -> !=
	.Bag -> all? iterator
	..Comparable -> =?
	..Fun
	..Generator
	.Seq -> zip
	..types.Interface -> implementor!
	..types.Method -> impl!
	..types.Record-Type

Stream = Record-Type
	doc. "TODO"
	members.
		make-iterator. Fun[Generator]

\ TODO: Sugar
impl! iterator Stream |_
	_.make-iterator ()
implementor! Stream Seq

impl! =? Stream |s1 s2
	all? (zip s1 s2 =?)

streaming.
	doc. "TODO"
	test. |
		_ = streaming ~|
			<~ 1
			<~ 2
		!= ->Array_ (Array.of 1 2)
		\ They can be used twice!
		!= ->Array_ (Array.of 1 2)
	|make-gen:Fun[Generator]
		Stream
			make-iterator. make-gen

Stream
