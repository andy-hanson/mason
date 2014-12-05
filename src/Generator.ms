doc. "TODO"

use
	.Alias-Type
	.arithmetic-methods -> *
	.assert -> !
	.bags.?
	.bags.Array!
	.bags.Bag -> iterator
	.bags.Bag-Type -> empty
	.bags.Seq -> seq=?
	.bags.Stream -> streaming
	.basic-methods -> =>
	.Bool -> and false true
	.Comparable -> =?
	.Fun
	.Object
	.pred-types -> Any
	.types.Pred-Type
	.types.Type -> contains?

Generator! = Pred-Type
	doc. "TODO"
	predicate. |_
		and :Object ~(contains? Fun _.next)

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
		de  \ TODO:Ignored vars
		iter \ TODO:Ignored vars
		`for (let em of iter) yield* de(em)`
		()

\ TODO: Get rid of
map~.
	doc. "A generator that iterates through every element of `bag`, yielding the mapped value."
	test. |
		x = streaming ~|
			two-four-six <~~ map~ [ 1 2 3 ] ~|em
				<~ em
				* 2 em
			! (seq=? two-four-six [ 2 4 6 ])
		! seq=? x [ 1 2 3 ]
	~|:Bag bag:Bag mapper:Fun[Any Generator!]
		arr = empty Array!
		mapper \ TODO:Ignored vars
		\ TODO:ES6 for (let em of bag)
		iter = iterator bag
		iter \ TODO:Ignored vars
		`for (let em of iter) arr.push(yield* mapper(em))`
		arr

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

\ TODO: Others...

Generator!
