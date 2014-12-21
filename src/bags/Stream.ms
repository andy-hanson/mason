use
	..assert -> !
	.Bag -> iterator
	.Bag-Type
	..Bool -> and
	..Comparable -> =?
	..Comparable! -> <!
	..Fun -> ignore thunk
	..Generator!
	..methods -> => contains? empty
	.Seq -> seq=?
	..types.Method -> impl!
	..types.Record-Type
	..types.util -> self-type

Stream = Record-Type
	doc. "
		A Stream is a Bag whose elements are the outputs of a Generator!.
		Unlike a Generator!, a Stream can be used multiple times.

	members.
		make-iterator. Fun[Generator!]

<! Stream Seq
impl! iterator Stream |_
	_.make-iterator ()

impl! =? Stream |s1 s2
	and (contains? Stream s2) ~(seq=? s1 s2

streaming.
	doc. "Creates a Stream whose values are the yields of the Generator! produced by make-gen."
	test. |
		_ = streaming ~|
			<~ 1
			<~ 2
		! seq=? _ [ 1 2 ]
		\ They can be used twice!
		! seq=? _ [ 1 2 ]
	|make-gen:Fun[Generator!]
		Stream
			make-iterator. make-gen

empty-stream = streaming ~|
	()
<! (self-type Stream) Bag-Type
impl! empty (self-type Stream) (thunk empty-stream)

impl! => (self-type Stream) Bag |Stream _
	ignore Stream \ TODO:Ignored vars
	streaming |
		iterator_

Stream
