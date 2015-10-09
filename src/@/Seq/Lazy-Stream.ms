import
	...Function call thunk
	...math.Number Nat
	...math.methods -
	...Type.Kind kind! self-kind!
	...Type.Method impl! self-impl!
	..@ count iterator
	..@-Type _ empty from-stream
	..? Some
	.Seq _ ?nth
	.Stream

Lazy-Stream. class
	| Like Stream, but caches its elements as it produces them.
	| If you want to stream the results of an expensive computation and use it multiple times, use this.
	| If you have a cheap computation or only need to iterate through it once, use Stream.

	do!
		self-kind! _ @-Type
		todo  move to `static`
		self-impl! empty _ (thunk (new _ ~!|
			pass
		kind! _ Seq

	static
		from-stream |_
			new this |
				iterator_

	construct! stream:Function
		todo stream:Function[Generator]
		.cache = []
		todo ES6
		todo We wrap this in a Stream because `for!` calls [Symbol.iterator]().
		todo We should be able to do `for!` on both @s and unwrapped iterators.
		strm = new Stream stream
		self = this todo  `this` in constructor
		.caching-iterator = call ~!|
			for! strm
				todo  +>!
				self.cache.push _
				<~ _

	?nth |n:Nat
		todo higher-order function for this pattern
		case ?nth .cache n
			:Some
				_
			else
				n-left = - n (count .cache)
				?nth (Stream .caching-iterator) n-left

todo  class method
impl! iterator Lazy-Stream .~!|
	<~~ iterator .cache
	<~~ .caching-iterator
