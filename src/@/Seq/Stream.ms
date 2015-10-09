import
	...Function thunk
	...Generator _ empty-Generator
	...Type.Kind kind! self-kind!
	...Type.Method self-impl!
	..@ iterator
	..@-Type _ empty from-stream
	.Seq

Stream. class
	| A Stream is a @ whose elements are the outputs of a Generator.
	| Unlike a Generator, a Stream can be used multiple times.

	do!
		self-kind! _ @-Type
		kind! _ Seq
		todo
		self-impl! empty _ (thunk (new _ |
			empty-Generator

	static
		from-stream |_
			new this |
				iterator_

	construct! make-iterator:Function[Generator]
		Object.defineProperty this Symbol.iterator
			value. make-iterator
