use
	..assert -> !
	..bags.Array!
	..bags.Bag -> any? each!
	..bags.Seq -> take
	..bags.Range -> range
	..bags.Stream -> streaming
	..Bool -> not
	..Generator! -> each~
	..maps.Map! -> assoc! get-or-update! un-assoc!
	..maps.Identity-Map!
	..math.Num -> divisible?
	..methods -> + * +! empty empty?

square = |x
	* x x

is-prime? = |_
	not (any? (range 2 _) divisible?[_]

\ TODO: This should use a Multi-Map!
\ http://stackoverflow.com/questions/13463417/the-genuine-sieve-of-eratosthenes-in-python-why-is-heapq-slower-than-dict
primes.
	doc. "TODO"
	test. |
		each! (take primes 100000) |_
			! is-prime? _

	streaming ~|
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
						list = get-or-update! prime-factors key ~(empty Array!
						+! list [ factor ]
