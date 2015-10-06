import
	..methods sub
	..Type.Kind _ self-kind!
	..Type.Method _ impl!
	..Type.Type =>
	.@ _ ++!
import-debug
	.Range

@-Type. new Kind
	| Any sub-type of @.
	name.

impl! sub @-Type .|
	this

empty. new Method
	| Given a type, makes an instance which is `empty?`.
	| Should always return the same thing iff immutable.
	name.

from-stream. new Method
	| Creates a new value of this type by reading out from an @'s iterator.
	name.
	test. |
		[Array (new Range 0 5)] -> [0 1 2 3 4]
	args. ["type" "stream"]
	default. .|stream
		with empty this
			++! _ stream

todo  Do this in @.ms
self-kind! @ @-Type

impl! => @-Type .|stream
	from-stream this stream
