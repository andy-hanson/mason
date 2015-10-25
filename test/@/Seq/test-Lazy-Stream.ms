import
	msl.@.Seq.Lazy-Stream
	msl.control build
	...tests

tests 'Lazy-Stream
	Lazy-Stream -> !|
		fibonaccis = new Lazy-Stream ~!|
			<~ 1
			<~ 1
			for! new Range 2 Number.POSITIVE_INFINITY
				|| This is *not* an exponential blowup because these are cached.
				<~ + fibonaccis[(- _ 1)] fibonaccis[(- _ 2)]
		assert! seq=? (@take~ fibonaccis 10) [1 1 2 3 5 8 13 21 34 55]

	iterator -> !|
		assert! =? [1 2] (build !|yield
			_ = new Lazy-Stream ~!|
				yield 1
				<~ 1
				yield 2
				<~ 2
				yield 3
			assert! seq=? [1] (@take~ _ 1)
			assert! seq=? [1 2] (@take~ _ 2)
