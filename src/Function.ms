import
	.methods sub
	.Type.Alias-Type
	.Type.Method impl! self-impl!
import~
	.@.@ _ ++
	.@.@-Type empty
	.@.Map.Hash-Map
	.@.Map.Map _ get-or-add!
	.@.Map.Weak-Id-Map
	.@.Seq.Seq rtail last
	.Object Object->Map
	.Type.Pred-Type ObjLit
	.Type.Type =>

Action. new Alias-Type
	| A function returning nothing.
	| Function[Number] describes a Function taking nothing and returning a Number;
	| Action[Number] describes a Function taking a Number and returning nothing.
	name.
	alias-of. Function

Pred. new Alias-Type
	| Function[Any Boolean].
	name.
	alias-of. Function

todo kill
apply. |_:Function args:@
	| Calls the function with the given arguments list.
	_ ...args

todo kill
call. |_:Function ...args
	| Calls the function with the given arguments.
	_ ...args

todo kill
fun-copy. |_:Function
	| Creates a new function with identical functionality.
	| *Does* copy any values captured by its scope.
	| Does *not* copy any properties on the old function.
	|| Fill in `this` as null.
	Function.prototype.call.bind _ null

identity. |_
	| Outputs its input unmodified.
	_

region Memoize
	todo perf.ms?
	id-memoize. |_:Function
		| When an Object is passed into `fun`, stores the result in a Weak-Id-Map
		| and uses that if the exact same (`id=?`) Object is used again.
		wm = empty Weak-Id-Map
		|arg:Object
			get-or-add! wm arg ~(_ arg)

	hash-memoize. |_:Function
		| Stores the argument every time you call it,
		| and re-uses the result if called again with the same argument.
		| This will make those arguments unavailable for garbage collection...
		hm = empty Hash-Map
		|arg:Object
			get-or-add! hm arg ~(_ arg)

spread. |:@ fun:Function ...args
	| Applies `fun`, starting with the given args, to each entry in an arguments list or map.
	todo ES6 Non-last rest arg?
	todo  right uncons
	init-args = rtail args
	last-arg = last args
	@spreaded = case last-arg
		:Map
			todo Mapping map is hard...
			=> Array _
		:@
			@for elem in _
				[elem]
		:ObjLit
			=> Array Object->Map_
		else
			throw! "Can only spread a @, Map, or ObjLit, not {_}"
	todo SYNTAX @for -> Array
	@for @spreaded
		all-args = ++ init-args _
		. fun ...all-args

spread!. !|fun ...args
	todo doc
	spread fun ...args

todo kill?
thunk. |_
	| Makes a function which, when called, returns `_`.
	|
		_

curry =
	| Creates a function which calls `f` with the given arguments first.
	Function "f" "return Function.prototype.bind.apply(f, arguments)"
	todo ES6
	todo f ...args
	todo	Function.prototype.bind.call f null ...args

impl! sub Function .|...args
	curry this ...args

self-impl! sub Function |
	| Subbing Function does nothing and is only for documentation.
	| Function[Number String] takes a Number and returns a String.
	| Function[2] takes 2 arguments.
	| Function[2 String] takes 2 arguments and returns a String.
	| Function without a sub is assumed to be a one-argument function, so never write Function[1].
	Function
