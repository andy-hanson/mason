doc. "TODO"

use
	.Alias-Type
	.arithmetic-methods -> *
	.assert -> !=
	.bags.? -> ?none ?some
	.bags.Array -> ->Array
	.bags.Bag -> iterator
	.bags.Stream -> streaming
	.Bool -> and false not true
	.Fun -> call
	.js -> exists?
	.Object -> has-property?
	.pred-types -> Any
	.types.Pred-Type
	.types.Type -> subsumes?

Generator. Pred-Type
	doc. "TODO"
	predicate. |_
		and :Object ~(subsumes? Fun _.next)


each~.
	doc. "A generator that goes through every element of `bag`, yielding to `do-each` of it."
	test. |
		x = streaming ~|
			<~~ each~ (Array 1 2 3) ~|em
				<~ em
		!= (->Array x) (Array 1 2 3)
	~|bag:Bag do-each:Fun[Any Generator]
		\ TODO:ES6 for (let em of bag)
		iter = iterator bag
		de = do-each
		`for (let em of iter) yield* de(em)`
		()

map~.
	doc. "A generator that iterates through every element of `bag`, yielding the mapped value."
	test. |
		x = streaming ~|
			two-four-six <~~ map~ (Array.of 1 2 3) ~|em
				<~ em
				* 2 em
			!= (->Array two-four-six) (Array.of 2 4 6)
		!= (->Array x) (Array.of 1 2 3)
	~|:Bag bag:Bag mapper:Fun[Any Generator]
		arr = `[]`\ new Array
		\ TODO:ES6 for (let em of bag)
		iter = iterator bag
		`for (let em of iter) arr.push(yield* mapper(em))`
		arr

if~.
	doc. "Runs through the sub-generator only if `condition`. Returns a `?` of the result."
	test. |
		stream = streaming ~|
			a <~~ if~ true ~|
				<~ 1
				2
			!= a (?some 2)
			b <~~ if~ false ~|
				<~ 3
			!= b ?none
		!= (->Array stream) (Array.of 1)

	~|:? condition:Bool result:Fun[Generator]
		case
			condition
				_ <~~ result ()
				?some_
			else
				?none

unless~.
	doc. "Opposite of if~."
	|condition:Bool result:Fun[Generator]
		if~ (not condition) result

\ TODO: Others...

Generator
