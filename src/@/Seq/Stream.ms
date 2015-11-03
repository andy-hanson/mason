import
	...Generator
	...Type.Kind self-kind!
	..@ iterator
	..@-Type _ empty from-stream
	.Seq

Stream. class kind Seq
	| A Stream is a @ whose elements are the outputs of a Generator.
	| Unlike a Generator, a Stream can be used multiple times.

	do
		self-kind! _ @-Type

	static
		empty |
			new Stream ~!|
				pass

		from-stream |_
			new this |
				iterator_

	construct make-iterator:Function[Generator]
		Object.defineProperty this Symbol.iterator
			value. make-iterator
