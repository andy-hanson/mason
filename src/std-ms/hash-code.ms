use
	.? -> get-or
	.arithmetic-methods -> + *
	.assert -> ! != !fails
	.bags.Bag -> contains? each!
	.Bool -> if! nor not
	.Comparable -> =?
	.Fun -> identity-memoize
	.math.bit-arithmetic -> bit-and hexidecimal
	.math.Num -> Int round-towards-0
	.Object -> ?get-property get-property own-properties
	.Str -> ->Str
	.Symbol
	.types.Method -> impl!

max-hash-code = hexidecimal "7fffffff"

keep-small = |_
	bit-and _ max-hash-code

hash-code =  Method
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
		case
			:Fun
				\ Possible that it is callable without having Fun.prototype.
				hash-code ->Str_
			else
				hash ::= 17
				each! own-properties_ |prop
					hash := keep-small (* hash 23)
					hash := keep-small (+ hash (hash-code (get-property _ prop)))
				hash

\ Since default hash-code only works on objects, let's implement hash-code for primitives.
impl! hash-code Bool |case
	_
		1
	else
		0
impl! hash-code Fun |_
	hash-code ->Str_
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
	else
		\ TODO: This could be better
		hash-code "{_}"

hash-code
