\ TODO: Move

use
	.@ _ count iterator map
	.@.Array
	.@.@-Type _ empty from-stream
	.@.Seq
	.control opr
	.Fun noop thunk
	.show
	.Str
	.Type =>
	.Type.Impl-Type self-type
	.Type.Kind kind! self-kind!
	.Type.Method impl! impl-for
	.Type.Pred-Type Opt
debug use
	.!
	.compare =?
	.Fun identity

test. |
	! =? [ "1" "2" "3" ] (map "123" identity)

self-kind! Str @-Type
	empty -> thunk ""
	\ TODO
	from-stream -> |_
		from-stream Array _

impl! => (self-type Str) @
	test. |
		[ Str [ 1 2 3 ] ] -> "123"
		[ Str [ 1 2 3 ] ", " ] -> "1, 2, 3"
	|Str _ ?joiner:Opt[Str]
		noop Str
		joiner = opr ?joiner ""
		(=> Array (map _ show)).join joiner

kind! Str Seq
	count -> |_
		_.length
	\ TODO:ES6 should be built-in
	\ TODO: How does this handle Unicode?
	iterator -> impl-for iterator Array
