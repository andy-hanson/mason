import
	msl.@.Seq.Seq seq=?
	...tests

tests "Stream"
	Stream -> !|
		_ = new Stream ~!|
			<~ 1
			<~ 2
		assert! seq=? _ [1 2]
		|| Streams can be used twice!
		assert! seq=? _ [1 2]
