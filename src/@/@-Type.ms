use
	..control returning
	..methods sub
	..Type.Kind _ self-kind!
	..Type.Method _ impl!
	..Type.Type =>
	.@ _ ++!
use-debug
	.Seq.Range

@-Type. new Kind
	doc. "Any sub-type of @."

impl! sub @-Type .|
	this

empty. new Method
	doc. "
		Given a type, makes an instance which is `empty?`.
		Should always return the same thing iff immutable.

from-stream. new Method
	doc. "
		|_ stream:@
		Creates a new value of this type by reading out from an @'s iterator.
	test. |
		[ Array (new Range 0 5) ] -> [ 0 1 2 3 4 ]
	args. [ "type" "stream" ]
	default. .|stream
		returning (empty this) !|_
			++! _ stream

# TODO: Do this in @.ms
self-kind! @ @-Type
# self-impl! empty @ |
#	[ ]

impl! => @-Type .|stream
	from-stream this stream
