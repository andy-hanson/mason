use
	...Function thunk
	...Generator! _ empty-Generator
	...Type.Js-Method js-impl!
	...Type.Kind kind! self-kind!
	...Type.Wrap-Type
	..@ iterator
	..@-Type _ empty from-stream
	.Seq
use-debug
	.Seq seq=?

Stream. Wrap-Type
	doc. "
		A Stream is a @ whose elements are the outputs of a Generator!.
		Unlike a Generator!, a Stream can be used multiple times.
	wrapped-type. Function[Generator!]
	test. !|
		_ = Stream ~!|
			<~ 1
			<~ 2
		assert! seq=? _ [ 1 2 ]
		# Streams can be used twice!
		assert! seq=? _ [ 1 2 ]

self-kind! Stream @-Type
	empty -> thunk (Stream |
		empty-Generator
	from-stream -> |_
		Stream |
			iterator_

js-impl! iterator Stream |
	this.val()
kind! Stream Seq
