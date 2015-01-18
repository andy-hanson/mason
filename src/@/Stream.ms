use
	..!
	..@ -> iterator
	.@-Type -> from-stream
	..Comparable! -> <!
	..Fun -> ignore thunk
	..Generator!
	..methods -> => empty
	.Seq -> seq=?
	..types.Method -> impl!
	..types.Record-Type
	..types.util -> self-type

Stream = Record-Type
	doc. "
		A Stream is a @ whose elements are the outputs of a Generator!.
		Unlike a Generator!, a Stream can be used multiple times.

	members.
		make-iterator. Fun[Generator!]

<! Stream Seq
impl! iterator Stream |_
	_.make-iterator ()

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

<! (self-type Stream) @-Type
impl! empty (self-type Stream) (thunk (streaming |
	empty Generator!
impl! from-stream (self-type Stream) |_ stream
	ignore _
	stream

impl! => (self-type Stream) @ |Stream _
	ignore Stream \ TODO:Ignored vars
	streaming |
		iterator_

Stream
