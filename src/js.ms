doc. "TODO"

use
	.arithmetic-methods -> +
	.assert -> ! !not
	.bags.Array
	.bags.Bag -> each!
	.basic-methods -> =>
	.Bool -> false not true
	.Comparable -> =?
	.Fun
	.math.Num -> not-a-number
	.Object -> add-property!
	.Try -> Error

global. `global`

reference=?.
	doc. "
		For objects, whether they are the same place in memory.
		For primitive types, whether they have the same data.

	test. |
		! reference=? "a" "a"
		!not reference=? [ "a" ] [ "a" ]

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
		! truthy? []
		! truthy? true

	|:Bool a
		a \ TODO:Ignored vars
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
		! =? x.a 1

	|constructor:Fun
		in
			!not reference=? constructor Error
		boundConstructor = Fun.prototype.bind.apply constructor `arguments`
		boundConstructor \ TODO:Ignored vars
		`new boundConstructor`

js-typeof.
	doc. "JavaScript's `typeof` operator."
	|a
		a \ TODO:Ignored vars
		`typeof a`

apply-with-this.
	doc. "
		Like `apply`, and also makes the hidden parameter `this` to be `new-this`.
		Acts like `new-this.f ...arguments` if `f` were in the prototype chain of `new-this`.
	test. |
		f = |a
			+ this a
		[ f 1 [ 2 ] ] -> 3
	|f:Fun new-this arguments:Bag
		\ TODO:ES6 ...args
		Fun.prototype.apply.call f new-this (=> Array arguments)

call-with-this.
	doc. "Like `apply-with-this` but does not take a list."
	test. |
		f = |a
			+ this a
		! =? (call-with-this f 1 2) 3
	|f:Fun new-this \ TODO:ES6 ...args
		apply-with-this f new-this (Array.prototype.slice.call `arguments` 2)