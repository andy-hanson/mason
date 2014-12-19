doc. "TODO"

use
	.assert -> !
	.bags.?
	.bags.Bag -> iterator
	.bags.Seq -> seq=?
	.bags.Stream -> streaming
	.Bool -> and false true
	.Comparable -> =?
	.Fun
	.js-impl -> each-generator
	.methods -> => contains? empty
	.Object
	.pred-types -> Any
	.types.Pred-Type

\ TODO: `gen-next!` method and destroy uses of `.next`

Generator! = Pred-Type
	doc. "TODO"
	predicate. |_
		and :Object ~(contains? Fun _.next)

if~.
	doc. "Runs through the sub-generator only if `condition`. Returns a `?` of the result."
	test. |
		stream = streaming ~|
			a <~~ if~ true ~|
				<~ 1
				2
			! =? a (=> ? [ 2 ])
			b <~~ if~ false ~|
				<~ 3
			! =? b (empty ?)
		! seq=? stream [ 1 ]

	~|:? condition:Bool result:Fun[Generator!]
		case
			condition
				_ <~~ result ()
				=> ? [ _ ]
			else
				empty ?

each~.
	doc. "A generator that goes through every element of `bag`, yielding to `do-each` of it."
	test. |
		x = streaming ~|
			<~~ each~ [ 1 2 3 ] ~|em
				<~ em
		! seq=? x [ 1 2 3 ]
	|bag:Bag do-each:Fun[Any Generator!]
		each-generator (iterator bag) do-each

\ TODO: Others...

Generator!
