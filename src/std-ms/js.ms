doc. "TODO"

use
	.assert -> ! !=
	.bags.Array
	.bags.Bag -> each!
	.Bool -> false not true
	.Comparable -> =?
	.Error
	.Fun -> delegate-to
	.math.Num -> not-a-number
	.Object -> add-property!
	.types.Type -> !subsumes

global. `global`

identical?.
	doc. "
		For objects, whether they are the same place in memory.
		For primitive types, whether they have the same data.

	test. |
		! (identical? "a" "a")
		! (not (identical? (Array.of "a") (Array.of "a")))

	Object.is

truthy?.
	doc. "Whether javascript's `if` statement would consider the value to be true."
	test. |
		falsy =
			. ()
			. `undefined`
			. 0
			. not-a-number
			. ""
			. false
		each! falsy |_
			! (not truthy?_)
		! (truthy? Array.empty)
		! (truthy? true)

	|:Bool a
		`!!a`

new.
	doc. "
		Emulates JavaScript's `new` keyword.
		Creates a new object whose prototype is `constructor.prototype` and calls the constructor on it.
		Wierd things may happen if you try to create a new Error this way.

	test. |
		My-Fun-Type = |a
			add-property! this "a" a
		x:My-Fun-Type = new My-Fun-Type 1
		!= x.a 1

	|constructor:Fun
		in
			! (not (=? constructor Error))
		out
			!subsumes constructor res
		boundConstructor = Fun.prototype.bind.apply constructor `arguments`
		`new boundConstructor`

js-typeof. |a
	`typeof a`
