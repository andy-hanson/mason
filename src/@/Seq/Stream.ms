use
	...Function thunk
	...Generator _ empty-Generator
	...Type.Kind kind! self-kind!
	...Type.Method impl! self-impl!
	...Type.Wrap-Type
	..@ iterator
	..@-Type _ empty from-stream
	.Seq
use-debug
	.Seq seq=?

Stream. Wrap-Type
	doc. "
		A Stream is a @ whose elements are the outputs of a Generator.
		Unlike a Generator, a Stream can be used multiple times.
	wrapped-type. Function[Generator]
	test. !|
		_ = Stream ~!|
			<~ 1
			<~ 2
		assert! seq=? _ [ 1 2 ]
		# Streams can be used twice!
		assert! seq=? _ [ 1 2 ]

self-kind! Stream @-Type
self-impl! empty Stream (thunk (Stream |
	empty-Generator
self-impl! from-stream Stream |_
	Stream |
		iterator_

impl! iterator Stream .|
	.val()
kind! Stream Seq
