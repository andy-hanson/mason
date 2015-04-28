use
	...@.@ each! empty?
	...@.Map.Map! assoc! un-assoc!
	...@.Map.Id-Map!
	...@.Map.multi-map! add-to-@!
	...@.Seq.Range range
	...@.Seq.Stream
	...Generator! each~
	...math.Num infinity square
	...math.methods + *
	...Type.Type =>
use-debug
	...!
	...@.@ any?
	...@.Seq.Seq take'
	...Bool not
	...math.Num divisible?

# http://stackoverflow.com/questions/13463417/the-genuine-sieve-of-eratosthenes-in-python-why-is-heapq-slower-than-dict
primes.
	doc. "Infinite Seq of Num > 2, each divisible only by itself and one."
	test. |
		is-prime? = |_
			not (any? (range 2 _) divisible?[_]
		each! (take' primes 20) ![is-prime?]
	Stream ~|
		<~ 2
		<~ 3
		# Maps a composite number to its prime factors.
		prime-factors = => Id-Map!
			9 -> [ 3 ]
		<~~ each~ (range 5 infinity 2) ~|candidate
			# un-assoc! is to save memory - we won't need to look up this value any more.
			case! un-assoc! prime-factors candidate
				empty?_
					<~ candidate
					assoc! prime-factors (square candidate) [ candidate ]
				else
					each! _.val |factor
						key = + candidate (* 2 factor
						add-to-@! prime-factors key [ factor ]
