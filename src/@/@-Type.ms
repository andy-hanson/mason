import
	..methods sub
	..Type.Kind self-kind!
	..Type.Type =>
	.@ _ ++!

@-Type. kind
	| Any sub-type of @.

	do
		todo  Do this in @.ms
		self-kind! @ _

	sub |
		this

	=> |stream
		from-stream this stream

empty. method |
	| Given a type, makes an instance which is `empty?`.
	| Should always return the same thing iff immutable.
	abstract

from-stream. method |stream:@
	| Creates a new value of this type by reading out from an @'s iterator.
	with empty this
		++! _ stream
