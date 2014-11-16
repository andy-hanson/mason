doc. "TODO"

use
	.arithmetic-methods -> +
	.assert -> ! !=
	.bags.? -> get-or
	.bags.Array -> ->Array
	.bags.Bag -> each! map
	.basic-methods -> sub
	.Error -> oh-no!
	.js -> global new
	.maps.Map -> ?get keys
	.maps.Map! -> set!
	.maps.Weak-Identity-Map!
	.math.Num -> increment
	.Object
	.Str -> ->Str
	.pred-types -> Any
	.types.Alias-Type
	.types.Method -> impl! impl-direct!
	.types.Type -> subsumes?

Fun = global.Function

Act. Alias-Type
	doc. "
		A function returning nothing.
		Fun[Num] is a function taking nothing and returning a Num;
		Act[Num] is a function taking a Num and returning nothing.

	alias-of. Fun

\ TODO: Consider whether this is needed.
Pred. Alias-Type
	doc. "
		Basically, Fun[Any Bool].

	alias-of. Fun

apply.
	doc. "Calls the function with the given arguments list."
	test. |
		!= (apply + [ 1 2 ]) 3
	|f:Fun arguments:Bag
		Fun.prototype.apply.call f () (->Array arguments)

call.
	doc. "Calls the function with the given arguments."
	test. |
		!= (call + 1 2) 3
	|f:Fun
		apply f (Array.prototype.slice.call `arguments` 1) \ TODO:ES6

apply-with-this.
	doc. "Like `apply`, and also sets `f`'s `this` to be `new-this`."
	test. |
		f = |a
			+ this a
		!= (apply-with-this f 1 [ 2 ]) 3
	|f:Fun new-this:Any arguments:Bag
		\ TODO:ES6 f ...args
		Fun.prototype.apply.call f new-this (->Array arguments)

call-with-this.
	doc. "Like `call`, and also sets `f`'s `this` to be `new-this`."
	test. |
		f = |a
			+ this a
		!= (call-with-this f 1 2) 3
	|f:Fun new-this:Any \ TODO:ES6 ...args
		apply-with-this f new-this (Array.prototype.slice.call `arguments` 2)


curry.
	doc. "Creates a function which calls `f` with the given arguments first."
	test. |
		+1 = curry + 1
		!= (+1 1) 2
		all-3 = |a b c
			[ a b c ]
		one-two = curry all-3 1 2
		!= (one-two 3) [ 1 2 3 ]

	|f:Fun \ ...args TODO:ES6
		\ args = ->Array (+ (Array.prototype.slice.call `arguments` 1) [ () ])
		Fun.prototype.bind.apply f `[null].concat(global.Array.prototype.slice.call(arguments, 1))`

curry-with-this.
	doc. "TODO"
	test. |
		"TODO"
	|f:Fun \ ...args TODO:ES6
		args = Array.prototype.slice.call `arguments`
		Fun.prototype.bind.apply f args

fun-copy.
	doc. "
		Creates a new function with identical functionality to another one.
		Does *not* copy any properties on the old function.

	test. |
		f1 = |x
			x
		f2 =
			doc. "This is f2"
			fun-copy f1
		!= f1.displayName "f1"
		!= f2.displayName "f2"
		!= (f1 1) (f2 1)

	|_:Fun |
		Fun.prototype.apply.call _ () `arguments`

impl-direct! sub Fun
	doc. "
		Subbing Fun does nothing and is only for documentation.
		E.g. Fun[Int Str] takes an Int and returns a Str.

	test. |
		!= Fun[Fun Fun] Fun
	|
		Fun

identity.
	doc. "Outputs its input unmodified."
	test. |
		!= (identity identity) identity
	|a
		a

ignore.
	doc. "Does nothing."
	|
		()

\ TODO: Handle multiple arguments
\ TODO: hash-memoize
identity-memoize.
	doc. "TODO"
	test. |
		comps ::= 0
		get-a = identity-memoize |x
			comps := increment comps
			x.a
		a1 =
			a. 1
		!= (get-a a1) 1
		!= (get-a a1) 1
		!= comps 1
		a2 =
			a. 2
		!= (get-a a2) 2
		!= comps 2
	|fun:Fun
		wm = new Weak-Identity-Map!
		|arg:Any
			in
				! (subsumes? Object arg) "
					Can only use objects for identity-memoize'd functions, not {arg}.

			get-or (?get wm arg) ~
				ans = fun arg
				wm.set arg ans
				ans

\ TODO: Merge with apply?
spread.
	doc. "TODO"
	test. |
		all-4 = |a b c d
			[ a b c d ]
		x = spread all-4 1 2
			3 -> 4
			5 -> 6
		\ TODO: Shouldn't need ->Array
		!= (->Array x)
			. [ 1 2 3 4 ]
			. [ 1 2 5 6 ]

		y = spread all-4 1 2 3
			. 4
			. 5
		!= (->Array y)
			. [ 1 2 3 4 ]
			. [ 1 2 3 5 ]

	|fun:Fun
		init-args = Array.prototype.slice.call `arguments` 1 `arguments.length - 1`
		spreaded = `arguments[arguments.length - 1]`
		case spreaded
			:Bag
				map _ |em
					all-args = + init-args [ em ]
					apply fun all-args
			:Map
				map keys_ |key
					oth-args =
						. key
						. _[key]
					all-args = + init-args
						. key
						. _[key]
					apply fun all-args
			else
				oh-no! "Can only spread a Bag or Map, not {_}"

thunk.
	doc. "Makes function which, when called, returns `a`."
	test. |
		!= ((thunk 1) ()) 1
	|a |
		a

TODO. |
	oh-no! "This function has not yet been implemented."

\ TODO: MOVE
impl! ->Str Fun |case
	`_.displayName !== undefined` \has-property? _ "nom"
		_.displayName
	`_.name !== ""`
		_.name
	else
		_.toString ()

Fun
