use
	..Fun _ ignore thunk
	..Generator! _ each~
	..math.Num Nat
	..math.methods -
	..methods <! empty empty?
	..Type.Impl-Type self-type
	..Type.Obj-Type
	..@ count iterator
	.@! ++!
	.@-Type _ from-stream
	.Array!
	.Seq _ ?nth
	.Stream
debug use~
	..!
	..control build
	..math.methods +
	..math.Num infinity
	..methods =?
	..Type =>
	.Range range
	.Seq seq=? take

Lazy-Stream = Obj-Type
	doc. "
		Like Stream, but caches its elements as it produces them.
		If you want to stream the results of an expensive computation and use it multiple times, use this.
		If you have a cheap computation or only need to iterate through it once, use Stream.
	props.
		caching-iterator. Generator!
		cache. Array!

<! (self-type Lazy-Stream) @-Type
	empty -> thunk (Lazy-Stream
		caching-iterator. empty Generator!
		cache. empty Array!

	from-stream -> |_ stream
		ignore _ \ TODO:Ignored vars
		lazy-streaming |
			iterator stream

<! Lazy-Stream Seq
	iterator ->
		test. |
			! =? [ 1 2 ] (build |yield
				_ = => Lazy-Stream (Stream ~|
					yield 1
					<~ 1
					yield 2
					<~ 2
					yield 3
				! seq=? [ 1 ] (take _ 1
				! seq=? [ 1 2 ] (take _ 2
		~|_
			<~~ iterator _.cache
			<~~ _.caching-iterator

	?nth -> |stream n:Nat
		case ?nth stream.cache n
			empty?_
				left = - n (count stream.cache
				?nth (Stream stream.caching-iterator) left
			else
				_

lazy-streaming.
	doc. "Creates a Lazy-Stream from a generator."
	test. |
		fibonaccis = Stream ~|
			<~ 1
			<~ 1
			<~~ each~ (range 2 infinity) ~|i
				\ This is *not* an exponential blowup because these are cached.
				<~ + fibonaccis[(- i 1] fibonaccis[(- i 2]
		! seq=? (take fibonaccis 10) [ 1 1 2 3 5 8 13 21 34 55 ]
	|stream:Fun[Generator!]
		cash = empty Array!
		Lazy-Stream
			caching-iterator. each~ (Stream stream) ~|_
				++! cash [ _ ]
				<~ _
			cache. cash

Lazy-Stream
