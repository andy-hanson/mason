use
	.methods sub
	.Type.Alias-Type
	.Type.Method impl! self-impl!
use~
	.@.@ _ ++
	.@.@-Type empty
	.@.Map.Hash-Map
	.@.Map.Map _ get-or-add!
	.@.Map.Weak-Id-Map
	.@.Seq.Seq rtail last
	.Object Object->Map
	.Type.Pred-Type ObjLit
	.Type.Type =>
use-debug
	.@.Seq.Seq seq=?
	.compare =?
	.control build
	.math.methods +

Action. new Alias-Type
	name.
	doc. "
		A function returning nothing.
		Function[Number] describes a Function taking nothing and returning a Number;
		Action[Number] describes a Function taking a Number and returning nothing.
	alias-of. Function

Pred. new Alias-Type
	name.
	doc. "Function[Any Boolean]."
	alias-of. Function

Thunk. new Alias-Type
	name.
	doc. "Function with no args returning a value."
	alias-of. Function

apply.
	doc. "Calls the function with the given arguments list."
	test. |
		[+ [1 2]] -> 3
	|_:Function args:@
		_ ...args

call.
	doc. "Calls the function with the given arguments."
	test. |
		[+ 1 2] -> 3
	|_:Function ...args
		_ ...args

fun-copy.
	doc. "
		Creates a new function with identical functionality.
		*Does* copy any values captured by its scope.
		Does *not* copy any properties on the old function.
	test. !|
		f1 =
			doc. "f1"
			|_
				_
		f2 =
			doc. "f2"
			fun-copy f1
		assert! =? f1.doc "f1"
		assert! =? f2.doc "f2"
		assert! =? (f1 1) (f2 1)

	|_:Function
		# Fill in `this` as null.
		Function.prototype.call.bind _ null

identity.
	doc. "Outputs its input unmodified."
	test. |
		[1] -> 1
	|_
		_

region Memoize
	# TODO: perf.ms?
	id-memoize.
		doc. "
			When an Object is passed into `fun`, stores the result in a Weak-Id-Map
			and uses that if the exact same (`id=?`) Object is used again.
		test. !|
			assert! seq=? [1 2 1] (build !|yield
				get-a = id-memoize |x
					yield x.a
					x.a
				a1 = a. 1
				assert! =? (get-a a1) 1
				assert! =? (get-a a1) 1
				a2 = a. 2
				assert! =? (get-a a2) 2
				a1b = a. 1
				assert! =? (get-a a1b) 1
		|_:Function
			wm = empty Weak-Id-Map
			|arg:Object
				get-or-add! wm arg ~(_ arg)

	hash-memoize.
		doc. "
			Stores the argument every time you call it,
			and re-uses the result if called again with the same argument.
			This will make those arguments unavailable for garbage collection...
		test. !|
			assert! seq=? [1 2] (build !|yield
				get-a = hash-memoize |x
					yield x.a
					x.a
				a1 = a. 1
				assert! =? (get-a a1) 1
				assert! =? (get-a a1) 1
				a2 = a. 2
				assert! =? (get-a a2) 2
				a1-copy = a. 1
				assert! =? (get-a a1-copy) 1
		|_:Function
			hm = empty Hash-Map
			|arg:Object
				get-or-add! hm arg ~(_ arg)

spread.
	doc. "Applies `fun`, starting with the given args, to each entry in an arguments list or map."
	test. !|
		all-4 = |a b c d
			[a b c d]
		assert! seq=? (spread all-4 1 2 3 [4 5])
			. [1 2 3 4]
			. [1 2 3 5]

		y = spread all-4 1 2
			3 -> 4
			5 -> 6
		assert! seq=? y
			. [1 2 3 4]
			. [1 2 5 6]

		assert! seq=? (spread all-4 1 2 (three. 4 five. 6))
			. [1 2 "three" 4]
			. [1 2 "five" 6]

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
				@for elem in _
					[elem]
			:ObjLit
				=> Array Object->Map_
			else
				throw! "Can only spread a @, Map, or ObjLit, not {_}"
		# TODO:SYNTAX @for -> Array
		@for @spreaded
			all-args = ++ init-args _
			. fun ...all-args

spread!.
	doc. "TODO"
	test. !|
		assert! =? [1 2 3] (build |yield!
			f = |a b c
				yield! a
				yield! b
				yield! c
			spread! f 1
				2 -> 3
	!|fun ...args
		spread fun ...args

thunk.
	doc. "Makes function which, when called, returns `a`."
	test. !|
		assert! =? (thunk 1)() 1
	|_
		|
			_

curry =
	doc. "Creates a function which calls `f` with the given arguments first."
	test. !|
		+1 = +[1]
		assert! =? (+1 1) 2
		all-3 = |a b c
			[a b c]
		one-two = all-3[1 2]
		assert! =? (one-two 3) [1 2 3]
	Function "f" "return Function.prototype.bind.apply(f, arguments)"
	# TODO:ES6
	# |f ...args
	#	Function.prototype.bind.call f null ...args

impl! sub Function .|...args
	curry this ...args

self-impl! sub Function
	doc. "
		Subbing Function does nothing and is only for documentation.
		* Function[Number String] takes a Number and returns a String.
		* Function[2] takes 2 arguments.
		* Function[2 String] takes 2 arguments and returns a String.
		* Function without a sub is assumed to be a one-argument function, so never write Function[1].
	test. !|
		assert! =? Function[Function Function] Function
	|
		Function
