use
	.methods sub
	.private.js-impl iCurry
	.Type.Alias-Type
	.Type.Method _ impl! self-impl!
use~
	.@.@ _ ++ map
	.@.@-Type empty
	.@.Map.Map
	.@.Map.Hash-Map!
	.@.Map.Map! get-or-add!
	.@.Map.Weak-Id-Map!
	.@.Seq.Seq rtail last
	.Object Object->Map
	.Try oh-no!
	.Type.Type =>
use-debug
	.!
	.@.Seq.Seq seq=?
	.compare =?
	.control build
	.math.methods +

Action. Alias-Type
	doc. "
		A function returning nothing.
		Function[Number] describes a Function taking nothing and returning a Number;
		Action[Number] describes a Function taking a Number and returning nothing.
	alias-of. Function

Pred. Alias-Type
	doc. "Function[Any Boolean]."
	alias-of. Function

apply.
	doc. "Calls the function with the given arguments list."
	test. |
		[ + [ 1 2 ] ] -> 3
	|_:Function args:@
		_ ...args

call.
	doc. "Calls the function with the given arguments."
	test. |
		[ + 1 2 ] -> 3
	|_:Function ...args
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

	|_:Function
		# Fill in `this` as null.
		Function.prototype.call.bind _ null

identity.
	doc. "Outputs its input unmodified."
	test. |
		[ 1 ] -> 1
	|_
		_

noop.
	doc. "Does nothing."
	|
		pass

region Memoize
	# TODO: perf.ms?
	id-memoize.
		doc. "
			When an Object is passed into `fun`, stores the result in a `Weak-Id-Map!`
			and uses that if the exact same (`id=?`) Object is used again.
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
		|_:Function
			wm = empty Weak-Id-Map!
			|arg:Object
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
				a1 = call | # TODO:DISPLAYNAME
					a. 1
				! =? (get-a a1) 1
				! =? (get-a a1) 1
				a2 = a. 2
				! =? (get-a a2) 2
				a1b = call | # TODO:DISPLAYNAME
					a. 1
				! =? a1 a1b
				! =? (get-a a1b) 1
		|_:Function
			hm = empty Hash-Map!
			|arg:Object
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
			. [ 1 2 "name" "z" ] # TODO:DISPLAYNAME

	# TODO:ES6 Non-last rest arg?
	|:@ fun:Function ...args
		# TODO: right uncons
		init-args = rtail args
		last-arg = last args
		@spreaded = case last-arg
			:Map
				# TODO: Mapping map is hard...
				=> Array _
			:@
				map _ |em
					[ em ]
			:Object
				=> Array Object->Map_
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
		for! spread fun ...args
			noop _

thunk.
	doc. "Makes function which, when called, returns `a`."
	test. |
		! =? (thunk 1)() 1
	|_
		|
			_

curry =
	doc. "Creates a function which calls `f` with the given arguments first."
	test. |
		+1 = +[1]
		! =? (+1 1) 2
		all-3 = |a b c
			[ a b c ]
		one-two = all-3[1 2]
		! =? (one-two 3) [ 1 2 3 ]
	iCurry

impl! sub Function curry
# TODO: Make Method a Callable
impl! sub Method curry

self-impl! sub Function
	doc. "
		Subbing Function does nothing and is only for documentation.
		* Function[Number String] takes a Number and returns a String.
		* Function[2] takes 2 arguments.
		* Function[2 String] takes 2 arguments and returns a String.
		* Function without a sub is assumed to be a one-argument function, so never write Function[1].
	test. |
		! =? Function[Function Function] Function
	|
		Function
