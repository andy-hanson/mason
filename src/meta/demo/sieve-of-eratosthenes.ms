use
	...@.? Some
	...@.Map.Map! assoc! un-assoc!
	...@.Map.Id-Map!
	...@.Map.multi-map! add-to-@!
	...@.Seq.Range range
	...@.Seq.Stream
	...math.Number infinity square
	...math.methods + *
	...Type.Type =>
use-debug
	...@.@ any?
	...@.Seq.Seq take
	...math.Number divisible?

# http://stackoverflow.com/questions/13463417/the-genuine-sieve-of-eratosthenes-in-python-why-is-heapq-slower-than-dict
primes.
	doc. "Infinite Seq of Numbers > 2, each divisible only by itself and one."
	test. !|
		is-prime? = |_
			not any? (range 2 _) divisible?[_]
		for! take primes 20
			assert! is-prime? _
	Stream ~!|
		<~ 2
		<~ 3
		# Maps a composite number to its prime factors.
		prime-factors = => Id-Map!
			9 -> [ 3 ]
		for! candidate in range 5 infinity 2
			# un-assoc! is to save memory - we won't need to look up this value any more.
			case! un-assoc! prime-factors candidate
				:Some factors
					for! factors
						key = + candidate (* 2 _
						# TODO: Function to add single element
						add-to-@! prime-factors key [ _ ]
				else
					<~ candidate
					assoc! prime-factors (square candidate) [ candidate ]
