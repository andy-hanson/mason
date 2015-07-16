use
	...Type.Kind _ kind! self-kind!
	..@!
	..@-Type empty
	..@-Type _ from-stream
	.Set
use~
	.Hash-Set!
use-debug
	...Type.Type contains?
	..@ empty?
	..@! ++! --! empty!

Set!. Kind
	doc. "Mutable Set."
	implementor-test. !|type
		_ = empty type
		++! _ [ 1 2 ]
		assert! contains? _ 1
		assert! contains? _ 2
		forbid! contains? _ 3
		--! _ [ 1 2 ]
		assert! empty? _
		++! _ [ 1 2 3 ]
		empty! _
		assert! empty? _

self-kind! Set! @-Type
	empty -> |
		empty Hash-Set!
	from-stream -> |_
		from-stream Hash-Set! _

# TODO: Way to determine which one of these is more important
kind! Set! Set
kind! Set! @!
