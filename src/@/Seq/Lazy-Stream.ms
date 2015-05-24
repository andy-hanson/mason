use
	...Function call thunk
	...Generator! _ empty-Generator
	...math.Number Nat
	...math.methods -
	...Type.Js-Method js-impl!
	...Type.Kind kind! self-kind!
	...Type.Tuple
	..@ count iterator
	..@-Type _ empty from-stream
	..? ?-or
	.Array!
	.Seq _ ?nth
	.Stream
use-debug
	...!
	...compare =?
	...control build
	...math.methods +
	...math.Number infinity
	...Type.Type =>
	.Range range
	.Seq seq=? take'

Lazy-Stream = Tuple
	doc. "
		Like Stream, but caches its elements as it produces them.
		If you want to stream the results of an expensive computation and use it multiple times, use this.
		If you have a cheap computation or only need to iterate through it once, use Stream.
	props.
		. [ "caching-iterator" Generator!
		. [ "cache" Array!

self-kind! Lazy-Stream @-Type
	empty -> thunk (Lazy-Stream empty-Generator (empty Array!

	from-stream -> |_
		lazy-streaming |
			iterator_

js-impl! iterator Lazy-Stream
	test. !|
		! =? [ 1 2 ] (build !|yield
			_ = => Lazy-Stream (Stream ~!|
				yield 1
				<~ 1
				yield 2
				<~ 2
				yield 3
			! seq=? [ 1 ] (take' _ 1
			! seq=? [ 1 2 ] (take' _ 2
	~!|
		<~~ iterator this.cache
		<~~ this.caching-iterator

kind! Lazy-Stream Seq
	?nth -> |stream n:Nat
		?-or (?nth stream.cache n) ~
			n-left = - n (count stream.cache
			?nth (Stream stream.caching-iterator) n-left

lazy-streaming.
	doc. "Creates a Lazy-Stream from a generator."
	test. |
		fibonaccis = Stream ~!|
			<~ 1
			<~ 1
			for! range 2 infinity
				# This is *not* an exponential blowup because these are cached.
				<~ + fibonaccis[(- _ 1] fibonaccis[(- _ 2
		! seq=? (take' fibonaccis 10) [ 1 1 2 3 5 8 13 21 34 55 ]
	|stream:Function[Generator!]
		cache = empty Array!
		# TODO:ES6
		# We wrap this in a Stream because `for!` calls [Symbol.iterator]().
		# We should be able to do `for!` on both @s and unwrapped iterators.
		strm = Stream stream
		iter = call ~!|
			for! strm
				# TODO: +>!
				cache.push _
				<~ _
		Lazy-Stream iter cache

Lazy-Stream
