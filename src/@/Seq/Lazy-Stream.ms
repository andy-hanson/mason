use
	...Fun _ thunk
	...Generator! _ each~ empty-Generator
	...math.Num Nat
	...math.methods -
	...Type.Kind kind! self-kind!
	...Type.Tuple
	..@ count iterator
	..@! ++!
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
	...math.Num infinity
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

kind! Lazy-Stream Seq
	iterator ->
		test. |
			! =? [ 1 2 ] (build |yield
				_ = => Lazy-Stream (Stream ~|
					yield 1
					<~ 1
					yield 2
					<~ 2
					yield 3
				! seq=? [ 1 ] (take' _ 1
				! seq=? [ 1 2 ] (take' _ 2
		~|_
			<~~ iterator _.cache
			<~~ _.caching-iterator

	?nth -> |stream n:Nat
		?-or (?nth stream.cache n) ~
			n-left = - n (count stream.cache
			?nth (Stream stream.caching-iterator) n-left

lazy-streaming.
	doc. "Creates a Lazy-Stream from a generator."
	test. |
		fibonaccis = Stream ~|
			<~ 1
			<~ 1
			<~~ each~ (range 2 infinity) ~|i
				# This is *not* an exponential blowup because these are cached.
				<~ + fibonaccis[(- i 1] fibonaccis[(- i 2]
		! seq=? (take' fibonaccis 10) [ 1 1 2 3 5 8 13 21 34 55 ]
	|stream:Fun[Generator!]
		cash = empty Array!
		# TODO: Don't use each~
		iter = each~ (Stream stream) ~|_
			++! cash [ _ ]
			<~ _
		Lazy-Stream iter cash

Lazy-Stream
