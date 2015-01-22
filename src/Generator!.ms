doc. "TODO"

use
	.@.?
	.@ -> iterator
	.@.Seq -> seq=?
	.Bool -> and false true
	.Comparable -> =?
	.Fun
	.js-impl -> each-generator
	.Js-Method
	.methods -> contains? empty
	.Obj
	.pred-types -> Any
	.types.Method -> impl!
	.types.Pred-Type
	.types.util -> self-type
use~
	.!
	.@.Stream

Generator! = Pred-Type
	doc. "TODO"
	predicate. |_
		\ TODO: `impl? _ gen-next!`
		and :Obj ~(contains? Fun _.next)

impl! empty (self-type Generator!)
	doc. "TODO"
	~|
		()

gen-next!. Js-Method
	doc. "TODO"
	impl-name. "next"

if~.
	doc. "Runs through the sub-generator only if `condition`. Returns a `?` of the result."
	test. |
		stream = Stream ~|
			a <~~ if~ true ~|
				<~ 1
				2
			! =? a (? 2
			b <~~ if~ false ~|
				<~ 3
			! =? b (empty ?)
		! seq=? stream [ 1 ]

	~|:? condition:Bool result:Fun[Generator!]
		case
			condition
				_ <~~ result ()
				? _
			else
				empty ?

each~.
	doc. "A generator that goes through every element of `_`, yielding to `do-each` of it."
	test. |
		x = Stream ~|
			<~~ each~ [ 1 2 3 ] ~|em
				<~ em
		! seq=? x [ 1 2 3 ]
	|_:@ do-each:Fun[Any Generator!]
		each-generator iterator_ do-each

\ TODO: Others...

Generator!
