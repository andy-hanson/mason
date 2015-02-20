use
	.js global
	.methods sub
	.private.js-impl i-curry
	.Type.Alias-Type
	.Type.Impl-Type self-type
	.Type.Method _ impl!
use~
	.@ _ ++ each! map
	.@.@-Type empty
	.@.Seq rtail last
	.@.Map
	.@.Map.Hash-Map!
	.@.Map.Map! get-or-add!
	.@.Map.Weak-Id-Map!
	.Obj _ Obj->Map
	.Try oh-no!
debug use~
	.!
	.@.Seq seq=?
	.compare =?
	.control build
	.math.methods +

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
	|_:Fun args:@
		_ ...args

call.
	doc. "Calls the function with the given arguments."
	test. |
		[ + 1 2 ] -> 3
	|_:Fun ...args
		_ ...args

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

region Memoize
	\ TODO: perf.ms?
	id-memoize.
		doc. "
			When an Obj is passed into `fun`, stores the result in a `Weak-Id-Map!`
			and uses that if the exact same (`id=?`) Obj is used again.
		test. |
			! seq=? [ 1 2 1 ] (build |yield
				get-a = id-memoize |x
					yield x.a
					x.a
				a1 = a. 1
				! =? (get-a a1) 1
				! =? (get-a a1) 1
				a2 = a. 2
				! =? (get-a a2) 2
				a1b = a. 1
				! =? (get-a a1b) 1
		|_:Fun
			wm = empty Weak-Id-Map!
			|arg:Obj
				get-or-add! wm arg ~(_ arg

	hash-memoize.
		doc. "
			Stores the argument every time you call it,
			and re-uses the result if called again with the same argument.
			This will make those arguments unavailable for garbage collection...

		test. |
			! seq=? [ 1 2 ] (build |yield
				get-a = hash-memoize |x
					yield x.a
					x.a
				a1 = call | \ TODO:DISPLAYNAME
					a. 1
				! =? (get-a a1) 1
				! =? (get-a a1) 1
				a2 = a. 2
				! =? (get-a a2) 2
				a1b = call | \ TODO:DISPLAYNAME
					a. 1
				! =? a1 a1b
				! =? (get-a a1b) 1
		|_:Fun
			hm = empty Hash-Map!
			|arg:Obj
				get-or-add! hm arg ~(_ arg

spread.
	doc. "Applies `fun`, starting with the given args, to each entry in an arguments list or map."
	test. |
		all-4 = |a b c d
			[ a b c d ]
		x = spread all-4 1 2 3
			. 4
			. 5
		! seq=? x
			. [ 1 2 3 4 ]
			. [ 1 2 3 5 ]

		y = spread all-4 1 2
			3 -> 4
			5 -> 6
		! seq=? y
			. [ 1 2 3 4 ]
			. [ 1 2 5 6 ]

		z = spread all-4 1 2
			three. 4
			five. 6
		! seq=? z
			. [ 1 2 "three" 4 ]
			. [ 1 2 "five" 6 ]
			. [ 1 2 "displayName" "z" ] \ TODO:DISPLAYNAME

	\ TODO:SYNTAX Non-last rest arg?
	|:@ fun:Fun ...args
		init-args = rtail args
		last-arg = last args
		@spreaded = case last-arg
			:Map
				map _ |pair
					key val = pair
					[ key val ]
			:@
				map _ |em
					[ em ]
			:Obj
				map Obj->Map_ |pair
					key val = pair
					[ key val ]
			else
				oh-no! "Can only spread a @ or Map, not {_}"
		map @spreaded |spreaded
			all-args = ++ init-args spreaded
			fun ...all-args

spread!.
	doc. "TODO"
	test. |
		! =? [ 1 2 3 ] (build |yield!
			f = |a b c
				yield! a
				yield! b
				yield! c
			spread! f 1
				2 -> 3
	|fun ...args
		each! (spread fun ...args) ignore

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
