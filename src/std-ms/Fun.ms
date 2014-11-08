doc. "TODO"

use
	.? -> get-or
	.Array -> ->Array
	.Alias-Type
	.arithmetic-methods -> +
	.assert -> ! !=
	.basic-methods -> sub
	.js -> global new
	.Num -> increment
	.Map -> ?get
	.Map! -> set!
	.Method -> impl-direct!
	.Number
	.Object
	.Str
	.pred-types -> Any
	.Seq -> <+ seq
	.Type -> subsumes?
	.Weak-Identity-Map!

Fun = global.Function

Act. Alias-Type
	doc. "TODO"
	alias-of. Fun

Pred. Alias-Type
	doc. "TODO"
	alias-of. Fun

apply.
	doc. "Calls the function with the given arguments list."
	test. |
		!= (apply + (seq 1 2)) 3
	|f:Fun arguments:Seq
		apply-with-this f () arguments

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
		!= (apply-with-this f 1 (Array.of 2)) 3
	|f:Fun new-this:Any arguments:Seq
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
			Array.of a b c
		one-two = curry all-3 1 2
		!= (one-two 3) (Array.of 1 2 3)

	|f:Fun \ ...args TODO:ES6
		args = ->Array (<+ (Array.prototype.slice.call `arguments` 1) ())
		Fun.prototype.bind.apply f args

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
		|arg
			in
				! (subsumes? Object arg) "
					Can only use objects for identity-memoize'd functions.

			get-or (?get wm arg) |
				ans = fun arg
				wm.set arg ans
				ans

\wms = `[]`
\wm-obj = |case
\	:Object
\		_
\	else
\		\ TODO: Use get-or
\		case `wms[_]`
\			:Any
\				_
\			else
\				`wms[_] = global.Object(_)`
\				`wms[_]`

thunk.
	doc. "Makes function which, when called, returns `a`."
	test. |
		!= ((thunk 1) ()) 1
	|a |
		a

Fun
