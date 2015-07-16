use
	.@.@ _ count empty?
	.@.@-Type _ empty from-stream
	.@.Seq.Seq
	.compare =? sort
	.control opr
	.Function noop thunk
	.js js+
	.math.methods -
	.show
	.Type.Impl-Type self-type
	.Type.Kind kind! self-kind!
	.Type.Method impl! impl-double!
	.Type.Pred-Type Opt
	.Type.Type =>
use-debug
	.@.@ map
	.Function identity

# TODO: Move

test. !|
	assert! =? "123" (map "123" identity

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
		s ::= ""
		for! _
			s := js+ s show_
			s := js+ s joiner
		s.slice 0 (- s.length joiner.length

# TODO: Should this be necessary?
impl! sort String
	test. !|
		pass # TODO
	|_ ?sort-by:Opt[Function]
		=> String (sort.default _ ?sort-by)

kind! String Seq
	count -> |_
		_.length
	empty? -> |_
		=? 0 _.length
