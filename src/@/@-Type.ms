use
	..control returning
	..Function identity
	..methods sub
	..Type.Kind _ self-kind!
	..Type.Method _ impl! self-impl!
	..Type.Type =>
	.@
use~
	.@! ++!
use-debug
	.Seq.Range range

@-Type = Kind
	doc. "Any sub-type of @."

impl! sub @-Type identity

empty. Method
	doc. "
		Given a type, makes an instance which is `empty?`.
		Should always return the same thing iff immutable.

from-stream. Method
	doc. "
		|_ stream:@
		Creates a new value of this type by reading out from an @'s iterator.
	test. |
		[ Array (range 0 5) ] -> [ 0 1 2 3 4 ]
	default. |type stream
		returning (empty type) |_
			++! _ stream

# TODO: Do this in @.ms
self-kind! @ @-Type
self-impl! empty @ |
	empty Array

impl! => @-Type from-stream

@-Type
