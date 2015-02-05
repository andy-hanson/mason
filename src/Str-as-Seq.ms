\ TODO: Move

use
	.@ _ count iterator map
	.@.? Opt->? get-or
	.@.Array
	.@.@-Type _ from-stream
	.@.Seq
	.Fun ignore thunk
	.methods => <! empty
	.show
	.Str
	.Type.Impl-Type self-type
	.Type.Method impl! impl-for
	.Type.Pred-Type Opt
debug use
	.!
	.Fun identity
	.methods =?

test. |
	! =? [ "1" "2" "3" ] (map "123" identity)

<! Str Seq
	count -> |_
		_.length
	\ TODO:ES6 should be built-in
	\ TODO: How does this handle Unicode?
	iterator -> impl-for iterator Array

<! (self-type Str) @-Type
	empty -> thunk ""
	\ TODO
	from-stream -> impl-for from-stream (self-type Array)

impl! => (self-type Str) @
	test. |
		[ Str [ 1 2 3 ] ] -> "123"
		[ Str [ 1 2 3 ] ", " ] -> "1, 2, 3"
	|Str _ ?joiner:Opt[Str]
		ignore Str \ TODO: ignored vars
		joiner = get-or (Opt->? ?joiner) ""
		(=> Array (map _ show)).join joiner
