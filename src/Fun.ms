use
	.js global
	.methods empty sub
	.private.js-impl i-call i-curry
	.Type =>
	.Type.Alias-Type
	.Type.Impl-Type self-type
	.Type.Method _ impl!
use~
	.@ _ ++ map
	.@.Seq rtail last
	.@.Array
	.Map _ keys
	.Map.Map! get-or-add!
	.Map.Weak-Identity-Map!
	.Obj
	.Try oh-no!
debug use~
	.!
	.@.Seq seq=?
	.control build
	.math.methods +
	.methods =?

Fun =
	doc. "
		TODO
		<describe Fun vs Callable>
		sub does nothing, but here is the syntax.
		* Fun[Num Str] takes a Num and returns a Str.
		* Fun[2] takes 2 arguments.
		* Fun[2 Str] takes 2 arguments and returns a Str.
		* Fun without a sub is assumed to be a one-argument function, so never write Fun[1].
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
	i-call

fun-copy.
	doc. "
		Creates a new function with identical functionality.
		*Does* copy any values captured by its scope.
		Does *not* copy any properties on the old function.
	test. |
		f1 =
			doc. "f1"
			|_
				_
		f2 =
			doc. "f2"
			fun-copy f1
		! =? f1.doc "f1"
		! =? f2.doc "f2"
		! =? (f1 1) (f2 1)

	|_:Fun
		\ Fill in `this` as null.
		Fun.prototype.call.bind _ ()

identity.
	doc. "Outputs its input unmodified."
	test. |
		[ 1 ] -> 1
	|_
		_

ignore.
	doc. "Does nothing."
	|
		()

\ TODO: Handle multiple arguments
\ TODO: hash-memoize
identity-memoize.
	doc. "
		When an Obj is passed into `fun`, stores the result in a `Weak-Identity-Map!`
		and uses that if the exact same (`reference=?`) Obj is used again.
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
		|arg:Obj
			get-or-add! wm arg ~(fun arg)

\ TODO: Merge with apply?
\ TODO: Kill?
spread.
	doc. "Applies `fun`, starting with the given args, to each entry in an arguments list or map."
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
	|:@ fun:Fun ...args
		init-args = rtail args
		spreaded = last args
		case spreaded
			:@
				map _ |em
					all-args = ++ init-args [ em ]
					apply fun all-args
			:Map
				map keys_ |key
					all-args = ++ init-args [ key _[key] ]
					apply fun all-args
			else
				oh-no! "Can only spread a @ or Map, not {_}"

spread!. spread

thunk.
	doc. "Makes function which, when called, returns `a`."
	test. |
		! =? (thunk 1)() 1
	|a |
		a

curry =
	doc. "Creates a function which calls `f` with the given arguments first."
	test. |
		+1 = +[1]
		! =? (+1 1) 2
		all-3 = |a b c
			[ a b c ]
		one-two = all-3[1 2]
		! =? (one-two 3) [ 1 2 3 ]
	i-curry

impl! sub Fun curry
\ TODO: Make Method a Callable
impl! sub Method curry

impl! sub (self-type Fun)
	doc. "
		Subbing Fun does nothing and is only for documentation.
		E.g. Fun[Int Str] takes an Int and returns a Str.
	test. |
		! =? Fun[Fun Fun] Fun
	fun-copy identity

Fun
