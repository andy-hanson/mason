todo  Move

import
	.@.@ _ count empty empty? from-stream @map
	.@.Seq.Seq
	.compare =? sort
	.control opr
	.to-string
	.Type.Impl-Type Self-Type
	.Type.Kind kind!
	.Type.Method impl-double! self-impl!
	.Type.Pred-Type Opt
	.Type.primitive Str
	.Type.Type =>

self-impl! empty String |
	""

self-impl! from-stream String |_
	todo Should probably convert to string.
	from-stream Array _

todo  self-impl-double! ?
impl-double! => (new Self-Type String) @ |vals joiner:Opt[Str]
	joiner := opr joiner ""
	todo @for:Array
	(=> Array (@map vals to-string)).join joiner

kind! String Seq
	count -> .|
		.length
	empty? -> .|
		=? 0 .length
	todo  Should this be necessary?
	sort -> .|?sort-by:Opt[Function]
		(sort.default.call this ?sort-by).join ""
