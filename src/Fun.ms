use
	.Comparable -> =?
	.js -> global
	.methods -> => + contains? empty sub
	.types.Alias-Type
	.types.Method -> impl!
	.types.util -> self-type
use~
	.!
	.@ -> map
	.@.? -> get-or un-?
	.@.Seq -> ?last pop> seq=?
	.@.Array
	.control -> build
	.maps.Map -> ?get keys
	.maps.Weak-Identity-Map!
	.Object
	.Try -> oh-no!

Fun =
	doc. "
		TODO
		<describe Fun vs Callable>
	global.Function

Act. Alias-Type
	doc. "
		A function returning nothing.
		Fun[Num] describes a function taking nothing and returning a Num;
		Act[Num] describes a function taking a Num and returning nothing.
	alias-of. Fun

Pred. Alias-Type
	doc. "Fun[Any Bool]."
	alias-of. Fun

apply.
	doc. "Calls the function with the given arguments list."
	test. |
		[ + [ 1 2 ] ] -> 3
	|f:Fun arguments:@
		Fun.prototype.apply.call f () (=> Array arguments)

call.
	doc. "Calls the function with the given arguments."
	test. |
		[ + 1 2 ] -> 3
	|called:Fun ...@argument
		apply called @argument \ TODO:ES6

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
		! =? f1.displayName "f1"
		! =? f2.displayName "f2"
		! =? (f1 1) (f2 1)

	|_:Fun |...args
		\ TODO:SYNTAX Splat call
		Fun.prototype.apply.call _ () args

identity.
	doc. "Outputs its input unmodified."
	test. |
		[ 1 ] -> 1
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
		comps = build |yield
			get-a = identity-memoize |x
				yield x.a
				x.a
			a1 =
				a. 1
			! =? (get-a a1) 1
			! =? (get-a a1) 1
			a2 =
				a. 2
			! =? (get-a a2) 2
		! seq=? comps [ 1 2 ]
	|fun:Fun
		wm = empty Weak-Identity-Map!
		|arg
			in
				! (contains? Object arg) "
					Can only use objects for identity-memoize'd functions, not {arg}.

			\ TODO: get-or-update!
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
		! seq=? x
			. [ 1 2 3 4 ]
			. [ 1 2 5 6 ]

		y = spread all-4 1 2 3
			. 4
			. 5
		! seq=? y
			. [ 1 2 3 4 ]
			. [ 1 2 3 5 ]

	\ TODO:SYNTAX Non-last rest arg?
	|:@ fun:Fun ...rest
		init-args = pop> rest
		\ TODO: last
		spreaded = un-? (?last rest
		case spreaded
			:@
				map _ |em
					all-args = + init-args [ em ]
					apply fun all-args
			:Map
				map keys_ |key
					all-args = + init-args
						. key
						. _[key]
					apply fun all-args
			else
				oh-no! "Can only spread a @ or Map, not {_}"

spread!. spread

thunk.
	doc. "Makes function which, when called, returns `a`."
	test. |
		! =? (call (thunk 1)) 1
	|a |
		a

impl! sub (self-type Fun)
	doc. "
		Subbing Fun does nothing and is only for documentation.
		E.g. Fun[Int Str] takes an Int and returns a Str.
	test. |
		! =? Fun[Fun Fun] Fun
	fun-copy identity

curry =
	doc. "Creates a function which calls `f` with the given arguments first."
	test. |
		+1 = +[1]
		! =? (+1 1) 2
		all-3 = |a b c
			[ a b c ]
		one-two = all-3[1 2]
		! =? (one-two 3) [ 1 2 3 ]

	|f:Fun  ...args
		Fun.prototype.bind.apply f (+ [()] args)

impl! sub Fun curry
\ TODO: Make Method a Callable
impl! sub Method curry

Fun
