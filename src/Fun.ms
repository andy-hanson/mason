use
	.assert -> !
	.bags.? -> get-or un-?
	.bags.Array
	.bags.Bag -> map
	.bags.Seq -> ?last pop> seq=?
	.Comparable -> =?
	.js -> global
	.maps.Map -> ?get keys
	.maps.Weak-Identity-Map!
	.methods -> => + empty empty? sub
	.Object -> ?get-property get-property
	.pred-types -> Any
	.Ref -> get ref mod!
	.show -> show-impl
	.Str
	.Try -> oh-no!
	.types.Alias-Type
	.types.Method -> impl!
	.types.Type -> contains?
	.types.util -> self-type

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

\ TODO: Consider whether this is needed.
Pred. Alias-Type
	doc. "
		Basically, Fun[Any Bool].

	alias-of. Fun

apply.
	doc. "Calls the function with the given arguments list."
	test. |
		[ + [ 1 2 ] ] -> 3
	|f:Fun arguments:Bag
		Fun.prototype.apply.call f () (=> Array arguments)

call.
	doc. "Calls the function with the given arguments."
	test. |
		[ + 1 2 ] -> 3
	|f:Fun ...args
		apply f args \ TODO:ES6

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
impl! sub Method curry

bind.
	doc. "TODO"
	test. |
		"TODO"
	|f:Fun ...args
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
		! =? f1.displayName "f1"
		! =? f2.displayName "f2"
		! =? (f1 1) (f2 1)

	|_:Fun |...args
		\ TODO:SYNTAX Splat call
		Fun.prototype.apply.call _ () args

impl! sub (self-type Fun)
	doc. "
		Subbing Fun does nothing and is only for documentation.
		E.g. Fun[Int Str] takes an Int and returns a Str.

	test. |
		! =? Fun[Fun Fun] Fun
	|
		Fun

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
		comps = ref 0
		get-a = identity-memoize |x
			mod! comps +[1]
			x.a
		a1 =
			a. 1
		! =? (get-a a1) 1
		! =? (get-a a1) 1
		! =? (get comps) 1
		a2 =
			a. 2
		! =? (get-a a2) 2
		! =? (get comps) 2
	|fun:Fun
		wm = empty Weak-Identity-Map!
		|arg:Any
			in
				! (contains? Object arg) "
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
	|:Bag fun:Fun ...rest
		init-args = pop> rest
		\ TODO: last
		spreaded = un-? (?last rest)
		case spreaded
			:Bag
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
				oh-no! "Can only spread a Bag or Map, not {_}"

spread!. spread

thunk.
	doc. "Makes function which, when called, returns `a`."
	test. |
		! =? (call (thunk 1)) 1
	|a |
		a

impl! show-impl Fun
	test. |
		a = |
			1
		[ a ] -> "a"
		[ Object ] -> "Object"
		[ (Fun "" "") ] -> "<anonymous Fun>"
	|:Str _
		get-or (?get-property _ "displayName") ~
			\ Every function has name property - empty string means anonymous function.
			name = get-property _ "name"
			case name
				empty?_
					"<anonymous Fun>"
				else
					_

Fun
