use
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
use~ todo  use-debug
	...math.methods +
	..Range
	.Seq seq=? take~
use-debug
	...compare =?
	...control build

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

todo class attributes
Lazy-Stream.test = !|
	fibonaccis = new Lazy-Stream ~!|
		<~ 1
		<~ 1
		for! new Range 2 Number.POSITIVE_INFINITY
			|| This is *not* an exponential blowup because these are cached.
			<~ + fibonaccis[(- _ 1)] fibonaccis[(- _ 2)]
	assert! seq=? (take~ fibonaccis 10) [1 1 2 3 5 8 13 21 34 55]

todo  class method
impl! iterator Lazy-Stream
	test. !|
		assert! =? [1 2] (build !|yield
			_ = new Lazy-Stream ~!|
				yield 1
				<~ 1
				yield 2
				<~ 2
				yield 3
			assert! seq=? [1] (take~ _ 1)
			assert! seq=? [1 2] (take~ _ 2)
	.~!|
		<~~ iterator .cache
		<~~ .caching-iterator
