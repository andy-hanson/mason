use
	.@.@ _ count empty? iterator map
	.@.@-Type _ empty from-stream
	.@.Seq.Seq
	.compare =? sort
	.control opr
	.Function noop thunk
	.show
	.Type.Impl-Type self-type
	.Type.Kind kind! self-kind!
	.Type.Method impl! impl-double! impl-for
	.Type.Pred-Type Opt
	.Type.Type =>
use-debug
	.!
	.Function identity

# TODO: Move

test. |
	! =? "123" (map "123" identity

self-kind! String @-Type
	empty -> thunk ""
	# TODO
	from-stream -> |_
		from-stream Array _

# TODO: self-impl-double! ?
impl-double! => (self-type String) @
	test. |
		[ String [ 1 2 3 ] ] -> "123"
		[ String [ 1 2 3 ] ", " ] -> "1, 2, 3"
	|str _ joiner:Opt[String]
		noop str
		joiner := opr joiner ""
		(=> Array (map _ show)).join joiner

# TODO: Should this be necessary?
impl! sort String
	test. |
		"TODO"
	|_ ?sort-by:Opt[Function]
		=> String (sort.default _ ?sort-by)

kind! String Seq
	count -> |_
		_.length
	empty? -> |_
		=? 0 _.length
	# TODO:ES6 should be built-in
	# TODO: How does this handle Unicode?
	iterator -> impl-for iterator Array
