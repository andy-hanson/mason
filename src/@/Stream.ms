use
	..@ _ iterator
	..Fun _ ignore thunk
	..Generator!
	..methods <!
	..Type =>
	..Type.Impl-Type self-type
	..Type.Method impl!
	..Type.Wrap-Type
	.@-Type _ empty from-stream
	.Seq _
debug use~
	..!
	.Seq seq=?

Stream = Wrap-Type
	doc. "
		A Stream is a @ whose elements are the outputs of a Generator!.
		Unlike a Generator!, a Stream can be used multiple times.
	wrapped-type. Fun[Generator!]
	test. |
		_ = Stream ~|
			<~ 1
			<~ 2
		! seq=? _ [ 1 2 ]
		\ They can be used twice!
		! seq=? _ [ 1 2 ]

<! Stream Seq
impl! iterator Stream |_
	_.val ()

<! (self-type Stream) @-Type
impl! empty (self-type Stream) (thunk (Stream |
	empty Generator!
impl! from-stream (self-type Stream) |_ stream
	ignore _
	stream

impl! => (self-type Stream) @ |Stream _
	Stream |
		iterator_

Stream
