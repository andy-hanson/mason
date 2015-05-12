use
	.@.@ _ count empty? iterator map
	.@.@-Type _ empty from-stream
	.@.Seq.Seq
	.compare =? sort
	.control opr
	.Fun _ noop thunk
	.show
	.Str
	.Type.Impl-Type self-type
	.Type.Kind kind! self-kind!
	.Type.Method impl! impl-double! impl-for
	.Type.Pred-Type Opt
	.Type.Type =>
use-debug
	.!
	.Fun identity

# TODO: Move

test. |
	! =? "123" (map "123" identity

self-kind! Str @-Type
	empty -> thunk ""
	# TODO
	from-stream -> |_
		from-stream Array _

impl-double! => (self-type Str) @
	test. |
		[ Str [ 1 2 3 ] ] -> "123"
		[ Str [ 1 2 3 ] ", " ] -> "1, 2, 3"
	|Str _ ?joiner:Opt[Str]
		noop Str
		joiner = opr ?joiner ""
		(=> Array (map _ show)).join joiner

impl! sort Str
	test. |
		"TODO"
	|:Str _ ?sort-by:Opt[Fun]
		=> Str (sort.default _ ?sort-by)

kind! Str Seq
	count -> |_
		_.length
	empty? -> |_
		=? 0 _.length
	# TODO:ES6 should be built-in
	# TODO: How does this handle Unicode?
	iterator -> impl-for iterator Array
