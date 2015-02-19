use
	..Fun ignore
	..Type.Impl-Type self-type
	..Type.Kind _ kind!
	.@!
	.@-Type empty
	.@-Type _ from-stream
	.Set
use~
	.Hash-Set!
debug use~
	..! _ !not
	..Type contains?
	..@ empty?
	.@! ++! --! empty!

Set! = Kind
	doc. "Mutable Set."
	implementor-test. |type
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

kind! (self-type Set!) @-Type
	empty -> |
		empty Hash-Set!
	from-stream -> |set _
		ignore set \ TODO:SYNTAX Ignored vars
		from-stream Hash-Set! _


\ TODO: Way to determine which one of these is more important
kind! Set! Set
kind! Set! @!

Set!
