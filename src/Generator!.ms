doc. "TODO"

use
	.assert -> !
	.bags.?
	.bags.Bag -> iterator
	.bags.Bag-Type -> empty
	.bags.Seq -> seq=?
	.bags.Stream -> streaming
	.basic-methods -> =>
	.Bool -> and false true
	.Comparable -> =?
	.Fun -> ignore
	.Object
	.pred-types -> Any
	.types.Pred-Type
	.types.Type -> contains?

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
	~|bag:Bag do-each:Fun[Any Generator!]
		\ TODO:ES6 for (let em of bag)
		iter = iterator bag
		de = do-each
		ignore de iter \ TODO:Ignored vars
		`for (let em of iter) yield* de(em)`
		()

\ TODO: Others...

Generator!
