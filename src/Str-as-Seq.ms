\ TODO: Move

use
	.@ _ count iterator map
	.@.Array
	.@.@-Type _ empty from-stream
	.@.Seq
	.control opr
	.Fun ignore thunk
	.show
	.Str
	.Type =>
	.Type.Impl-Type self-type
	.Type.Kind kind!
	.Type.Method impl! impl-for
	.Type.Pred-Type Opt
debug use
	.!
	.Fun identity
	.methods =?

test. |
	! =? [ "1" "2" "3" ] (map "123" identity)

kind! Str Seq
	count -> |_
		_.length
	\ TODO:ES6 should be built-in
	\ TODO: How does this handle Unicode?
	iterator -> impl-for iterator Array

kind! (self-type Str) @-Type
	empty -> thunk ""
	\ TODO
	from-stream -> impl-for from-stream (self-type Array)

impl! => (self-type Str) @
	test. |
		[ Str [ 1 2 3 ] ] -> "123"
		[ Str [ 1 2 3 ] ", " ] -> "1, 2, 3"
	|Str _ ?joiner:Opt[Str]
		ignore Str \ TODO: ignored vars
		joiner = opr ?joiner ""
		(=> Array (map _ show)).join joiner
