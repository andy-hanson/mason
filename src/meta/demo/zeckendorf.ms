use
	...!
	...@ fold-map
	...@.Seq reverse tail take-while
	...@.Stream
	...compare =? <=?
	...math.Num Nat
	...math.methods + -
	...Str
	...Type =>

fibs =
	rec = ~|prev:Nat cur:Nat
		<~ cur
		<~~ rec cur (+ prev cur)
	Stream rec[0 1]

zeckendorf.
	doc. "http://rosettacode.org/wiki/Zeckendorf_number_representation"
	test. |
		[ 0 ] -> ""
		[ 1 ] -> "1"
		[ 19 ] -> "101001"
		[ 1111 ] -> "100001010000001"
	|n:Nat
		z-fibs = tail fibs # Don't include the first `1`, so `[ 1 2 3 5 8 ... ]`.
		candidate-fibs = reverse (take-while z-fibs |_
			<=? _ n # Highest numbers go first
		mapped folded = fold-map candidate-fibs n |left fib
			case fib
				<=? _ left
					here. 1
					next. - left _
				else
					here. 0
					next. left
		! =? 0 folded # We should have managed to add up to `n` exactly.
		=> Str mapped
