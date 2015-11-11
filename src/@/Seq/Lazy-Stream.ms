import
	...Function thunk
	...math.Number Nat
	...math.methods -
	...Type.Kind self-kind!
	...Type.Method impl! self-impl!
	..@ count empty? iterator
	..@-Type _ empty from-stream
	.Seq _ ?nth
	.Stream

Lazy-Stream. class kind Seq
	| Like Stream, but caches its elements as it produces them.
	| If you want to stream the results of an expensive computation and use it multiple times, use this.
	| If you have a cheap computation or only need to iterate through it once, use Stream.

	do
		self-kind! _ @-Type
		todo  move to `static`
		self-impl! empty _ (thunk (new _ *!|
			pass

	static
		from-stream |_
			new this |
				iterator_

	construct stream:Function
		todo stream:Function[Generator]
		.cache = []
		todo ES6
		todo We wrap this in a Stream because `for` calls [Symbol.iterator]().
		todo We should be able to do `for` on both @s and unwrapped iterators.
		strm = new Stream stream
		todo  `this` in constructor
		self = this
		todo iterator @for~
		get-caching-iterator = *!|
			for strm
				todo  +>!
				self.cache.push _
				<- _
		.caching-iterator = get-caching-iterator()

	?nth |n:Nat
		todo higher-order function for this pattern
		case ?nth .cache n
			empty?_
				n-left = - n (count .cache)
				?nth (Stream .caching-iterator) n-left
			else
				_

todo  class method
impl! iterator Lazy-Stream .*!|
	<-* iterator .cache
	<-* .caching-iterator
