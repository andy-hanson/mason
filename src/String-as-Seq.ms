import
	.@.@ _ count empty?
	.@.@-Type _ empty from-stream
	.@.Seq.Seq
	.compare =? sort
	.control opr
	.Function thunk
	.to-string
	.Type.Impl-Type Self-Type
	.Type.Kind kind! self-kind!
	.Type.Method impl! impl-double! self-impl!
	.Type.Pred-Type Opt
	.Type.Type =>
import-debug
	.@.@ @map
	.Function identity

todo  Move

test. !|
	assert! =? "123" (@map "123" identity)

self-kind! String @-Type
self-impl! empty String (thunk "")
todo
self-impl! from-stream String |_
	from-stream Array _

todo  self-impl-double! ?
impl-double! => (new Self-Type String) @
	test. |
		[String [1 2 3]] -> "123"
		[String [1 2 3] ", "] -> "1, 2, 3"
	|vals joiner:Opt[String]
		joiner := opr joiner ""
		arr = @for vals
			to-string_
		arr.join joiner

todo  Should this be necessary?
impl! sort String
	test. !|
		todo
		pass
	.|?sort-by:Opt[Function]
		(sort.default.call this ?sort-by).join ""

kind! String Seq
impl! count String .|
	.length
impl! empty? String .|
	=? 0 .length
