use
	...Function thunk
	...Generator _ empty-Generator
	...Type.Kind kind! self-kind!
	...Type.Method self-impl!
	..@ iterator
	..@-Type _ empty from-stream
	.Seq _ seq=?

Stream. class
	do!
		self-kind! _ @-Type
		kind! _ Seq
		# TODO
		self-impl! empty _ (thunk (new _ |
			empty-Generator

	# TODO: class attributes
	# doc. "
	#	A Stream is a @ whose elements are the outputs of a Generator.
	#	Unlike a Generator, a Stream can be used multiple times.

	static
		from-stream |_
			new this |
				iterator_

	construct! make-iterator:Function[Generator]
		Object.defineProperty this Symbol.iterator
			value. make-iterator

# TODO: class attributes
Stream.test = !|
	_ = new Stream ~!|
		<~ 1
		<~ 2
	assert! seq=? _ [ 1 2 ]
	# Streams can be used twice!
	assert! seq=? _ [ 1 2 ]
