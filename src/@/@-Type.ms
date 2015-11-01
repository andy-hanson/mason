import
	..methods sub
	..Type.Kind self-kind!
	..Type.Method
	..Type.Type =>
	.@ _ ++!

@-Type. kind
	| Any sub-type of @.

	do!
		todo  Do this in @.ms
		self-kind! @ _

	sub |
		this

	=> |stream
		from-stream this stream

empty. new Method
	| Given a type, makes an instance which is `empty?`.
	| Should always return the same thing iff immutable.
	name.

from-stream. new Method
	| Creates a new value of this type by reading out from an @'s iterator.
	name.
	args. ['type 'stream]
	default. .|stream
		with empty this
			++! _ stream
