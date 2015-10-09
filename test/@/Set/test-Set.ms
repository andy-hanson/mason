import
	msl.@.@ --
	msl.@.Set.Set intersect set=?
	...tests

tests "Set"
	=? ->
		a = => Set [1 2]
		b = => Set [1 2]
		[a b] -> true
		[a [-- b [1]]] -> false

	set=? ->
		[[1 2 3] [3 2 1]] -> true
		[[1] [1 1 1]] -> true
		[[1 2] [1 2 3]] -> false

	intersect ->
		[(=> Set [1 2]) (=> Set [2 3])] -> => Set [2]