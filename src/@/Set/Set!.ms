use
	...Type.Kind _ kind! self-kind!
	..@!
	..@-Type empty
	..@-Type _ from-stream
	.Set
use~
	.Hash-Set!
use-debug
	...! _ !not
	...Type.Type contains?
	..@ empty?
	..@! ++! --! empty!

Set! = Kind
	doc. "Mutable Set."
	implementor-test. !|type
		_ = empty type
		++! _ [ 1 2 ]
		! contains? _ 1
		! contains? _ 2
		!not contains? _ 3
		--! _ [ 1 2 ]
		! empty? _
		++! _ [ 1 2 3 ]
		empty! _
		! empty? _

self-kind! Set! @-Type
	empty -> |
		empty Hash-Set!
	from-stream -> |_
		from-stream Hash-Set! _

# TODO: Way to determine which one of these is more important
kind! Set! Set
kind! Set! @!

Set!
