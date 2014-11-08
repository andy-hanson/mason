use
	.? -> get-or
	.assert -> ! != !fails
	.arithmetic-methods -> + *
	.Bag -> each!
	.bit-arithmetic -> bit-and hexidecimal
	.Bool -> not
	.Comparable -> =?
	.Fun -> identity-memoize
	.Method -> impl!
	.Num -> Int round-towards-0
	.Object -> ?get-property get-property own-properties
	.Str
	.Symbol

max-hash-code = hexidecimal "7fffffff"

keep-small = |_
	bit-and _ max-hash-code

hash-code. Method
	doc. |:Int _
		"TODO"
	test. |
		a =
			x. 1
			y. 2
		b =
			x. 1
			y. 1
		!= (hash-code a) (hash-code a)
		! (not (=? (hash-code a) (hash-code b)))
		!fails |
			hash-code ()

	default. identity-memoize |_
		\ TODO: Better hashing algorithm
		hash ::= 17
		each! own-properties_ |prop
			hash := keep-small (* hash 23)
			hash := keep-small (+ hash (hash-code (get-property _ prop)))
		hash

impl! hash-code Bool |case
	_
		1
	else
		0

impl! hash-code Str |_
	hash ::= 0
	mhc = max-hash-code
	\ TODO: each-with-index!
	`for (let i = 0; i < _.length; i++) hash = (31 * hash + _.charCodeAt(i)) & mhc`
	hash

impl! hash-code Symbol Symbol.keyFor

impl! hash-code Num |case
	=? _ round-towards-0_ \ Don't use Int because that also checks that its' small
		bit-and _ max-hash-code

\sym-prototype-hash = Symbol "prototype-hash"
\next-prototype-hash ::= 0
\prototype-hash = |_
\	proto = Object.getPrototypeOf _
\	get-or (?get-property proto sym-prototype-hash) |
\		add-property! proto sym-prototyp-hash next-prototype-hash
\		next-prototype-hash := increment next-prototype-hash
