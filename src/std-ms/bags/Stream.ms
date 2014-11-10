use
	.Array -> ->Array
	..assert -> !=
	.Bag -> all? iterator
	..Comparable -> =?
	..Fun -> identity
	..Generator
	.Seq -> zip
	..types.Interface -> implementor!
	..types.Method -> impl!
	..types.Record-Type

Stream = Record-Type
	doc. "
		A Stream is a sequence whose values are the outputs of a generator.
		Unlike a Generator, a Stream can be used multiple times.

	members.
		make-iterator. Fun[Generator]

implementor! Stream Seq
impl! iterator Stream |_
	_.make-iterator ()

impl! =? Stream |s1 s2
	all? (zip s1 s2 =?)

->Stream. Method
	doc. "TODO"
impl! ->Stream Bag |_
	streaming |
		iterator_

streaming.
	doc. "Creates a Stream whose values are the yields of the generator produced by make-gen."
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
