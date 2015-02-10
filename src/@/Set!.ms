use
	..Fun ignore
	..methods <! empty
	..Type.Impl-Type self-type
	..Type.Kind
	.@!
	.@-Type _ from-stream
	.Set
use~
	.Hash-Set!
debug use~
	..! _ !not
	..methods empty? empty!
	..Type contains?
	.@! ++! --!

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

<! (self-type Set!) @-Type
	empty -> |
		empty Hash-Set!
	from-stream -> |set _
		ignore set \ TODO:SYNTAX Ignored vars
		from-stream Hash-Set! _


\ TODO: Way to determine which one of these is more important
<! Set! Set
<! Set! @!

Set!
