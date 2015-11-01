todo  Move

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
	.Type.Method impl-double!
	.Type.Pred-Type Opt
	.Type.Type =>

self-kind! String @-Type
	empty -> thunk ""
	todo Should probably convert to string.
	from-stream -> |_
		from-stream Array _

todo  self-impl-double! ?
impl-double! => (new Self-Type String) @ |vals joiner:Opt[String]
	joiner := opr joiner ""
	arr = @for vals
		to-string_
	arr.join joiner

kind! String Seq
	count -> .|
		.length
	empty? -> .|
		=? 0 .length
	todo  Should this be necessary?
	sort -> .|?sort-by:Opt[Function]
		(sort.default.call this ?sort-by).join ""
