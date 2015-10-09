import
	msl.@.? ?None ?some
	msl.@.@ +! ++ ++! ++~ -- --! --~ any? ?find @flatten @flatten~ @flat-map @flat-map~ fold @keep @keep~ @map @map~
	msl.@.Seq.Deque
	msl.Try fails?
	msl.Type.Type contains?
	..tests

tests "Kind"
	@ -> !|
		todo test-implementors
		todo !|@-type
		todo	unless! =? @-type Weak-Id-Map
		todo			todo assert! @-type:@-Type throw! "Be sure to make your @ type a @-Type."
		todo			_ = empty @-type
		todo			assert! empty? _
		pass

	to-string ->
		d = => Deque [1 2 3]
		[d] -> "
			Deque
				. 1
				. 2
				. 3
		[(empty Deque)] -> "empty Deque"

	empty? ->
		[[]] -> true
		[[1]] -> false

	contains? ->
		[[0] 0] -> true
		[[0] 1] -> false

	fold ->
		[[1 2 3] +] -> 6
		[[1 2 3] 4 +] -> 10

	any? ->
		[[0 1] =?[1]] -> true
		[[0 1] =?[2]] -> false

	all? ->
		[[0 0] =?[0]] -> true
		[[0 1] =?[0]] -> false

	?find ->
		[[0 1] =?[1]] -> ?some 1
		[[0] =?[1]] -> ?None

	count ->
		[[]] -> 0
		[[1 2 3]] -> 3

	@keep ->
		[[1 2] =?[2]] -> [2]

	@keep~ ->
		[[1 2] =?[2]] -> => Stream [2]

	@map ->
		[[1 2] =?[2]] -> [false true]

	@map~ ->
		[[1 2] =?[2]] -> => Stream [false true]

	@flat-map ->
		f = |a
			[a a]
		[[1 2] f] -> [1 1 2 2]

	@flat-map~ ->
		f = |case
			divisible? _ 2
				[_ _]
			else
				[_]
		[[1 2 3 4] f] -> => Stream [1 2 2 3 4 4]

	@flatten ->
		[[[1 2] [3] []]] -> [1 2 3]

	@flatten~ -> |
		[[[1 2] [3] []]] -> => Stream [1 2 3]
		|| Ignores further nested @s.
		[[[1] [[2]]]] -> => Stream [1 [2]]
		|| Must be at least one nested level
		assert! fails? |
			=> Array (@flatten~ [[1] 2 [3]])

	++ ->
		[[0] [1]] -> [0 1]

	++~ ->
		[[0] [1]] -> => Stream [0 1]

	-- ->
		[[1 2 1] [1]] -> [2 1]

	--~ ->
		[[1 2 1] [1]] -> => Stream [2 1]

	=? ->
		[[1] [1]] -> true

	+! -> !|
		todo impl-test
		pass

	++! -> !|
		todo impl-test
		pass

	-! -> !|
		todo impl-test
		pass

	--! -> !|
		todo impl-test
		pass
