use
	..!
	..@ -> any? each!
	..@.Seq -> take
	..@.Range -> range
	..@.Stream
	..Bool -> not
	..Generator! -> each~
	..maps.Map! -> assoc! un-assoc!
	..maps.Identity-Map!
	..maps.multi-map! -> add-to-@!
	..math.Num -> divisible? square
	..methods -> + * empty empty?

is-prime? = |_
	not (any? (range 2 _) divisible?[_]

\ http://stackoverflow.com/questions/13463417/the-genuine-sieve-of-eratosthenes-in-python-why-is-heapq-slower-than-dict
primes.
	doc. "TODO"
	test. |
		each! (take primes 100000) |_
			! is-prime? _

	Stream ~|
		<~ 2
		<~ 3
		\ Maps a composite number to its prime factors.
		\ TODO: => Identity-Map! [ 9 -> [ 3 ] ]
		prime-factors = empty Identity-Map!
		assoc! prime-factors 9 [ 3 ]
		<~~ each~ (range 5 150 2) ~|candidate
			\ un-assoc! is to save memory - we won't need to look up this value any more.
			case un-assoc! prime-factors candidate
				empty?_
					<~ candidate
					assoc! prime-factors (square candidate) [ candidate ]
				else
					each! _.val |factor
						key = + candidate (* 2 factor
						add-to-@! prime-factors key [ factor ]
