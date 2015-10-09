import
	msl.@.@ any?
	msl.@.? Some
	msl.@.Map.Map un-assoc!
	msl.@.Map.Id-Map
	msl.@.Map.multi-map add-to-@!
	msl.@.Seq.Seq take
	msl.math.Number square
	..tests

primes.
	| http://stackoverflow.com/questions/13463417/the-genuine-sieve-of-eratosthenes-in-python-why-is-heapq-slower-than-dict
	| Infinite Seq of Numbers > 2, each divisible only by itself and one.
	new Stream ~!|
		<~ 2
		<~ 3
		|| Maps a composite number to its prime factors.
		prime-factors = => Id-Map
			9 -> [3]
		for! candidate in new Range 5 Number.POSITIVE_INFINITY 2
			|| un-assoc! is to save memory - we won't need to look up this value any more.
			case! un-assoc! prime-factors candidate
				:Some factors
					for! factors
						key = + candidate (* 2 _)
						todo  Function to add single element
						add-to-@! prime-factors key [_]
				else
					<~ candidate
					assoc! prime-factors (square candidate) [candidate]

tests "demo"
	primes -> !|
		is-prime? = |_
			not any? (new Range 2 _) divisible?[_]
		for! take primes 20
			assert! is-prime? _
