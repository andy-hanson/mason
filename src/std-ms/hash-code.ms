use
	.? -> get-or
	.arithmetic-methods -> + *
	.assert -> ! !not
	.bags.Bag -> contains? each! empty? flat-map fold toss
	.Bool -> nor not
	.Comparable -> =?
	.control -> if!
	.Fun -> identity-memoize
	.math.bit-arithmetic -> bit-and hexidecimal
	.math.Num -> Int round-towards-0
	.Object -> ?get-property own-properties
	.Ref -> get mod! ref
	.Str
	.Symbol
	.Try -> fails?
	.types.Method -> impl! impl-for

max-hash-code = hexidecimal "7fffffff"

keep-small = |_
	bit-and _ max-hash-code

\ TODO: empty Weak-Identity-Map!
hashes = `new global.WeakMap()`

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
		! =? (hash-code a) (hash-code a)
		! (not (=? (hash-code a) (hash-code b)))
		! fails? |
			hash-code ()
		\ TODO: Check that it handles recursive values

	default. |:Int _
		case
			hashes.has _
				hashes.get _
			:Fun
				\ TODO: Want to do other case below but it seems to cause infinite loop
				(impl-for hash-code Fun) _
			else
				\ Set it now so we don't recurse infinitely
				hashes.set _ 17
				props = own-properties_
				vals = flat-map own-properties_ |name
					?get-property _ name
				hash = fold vals 17 |acc val
					x = keep-small (* acc 23)
					keep-small (+ (hash-code val) x)
				hashes.set _ hash
				hash

\ Since default hash-code only works on objects, let's implement hash-code for primitives.
impl! hash-code Bool |case
	_
		1
	else
		0

impl! hash-code Fun |fun
	\ TODO: There must be something better than this.
	hash-code case ?get-property fun "displayName"
		empty?_
			fun.toString ()
		else
			_.val

impl! hash-code Str
	test. |
		! =? (hash-code "a") (hash-code "a")
		!not =? (hash-code "a") (hash-code "b")
	|_
		mhc = max-hash-code
		\ TODO: each-with-index!
		`let hash = 13`
		`for (let i = 0; i < _.length; i++) hash = (31 * hash + _.charCodeAt(i)) & mhc`
		`hash`

impl! hash-code Symbol
	test. |
		sym = Symbol "test"
		! =? (hash-code sym) (hash-code sym)
	|:Int
		\ TODO:ES6 (currently this returns undefined)
		0 \ Symbol.keyFor _

impl! hash-code Num |case
	=? _ round-towards-0_ \ Don't use Int because that also checks that its' small
		bit-and _ max-hash-code
	else
		\ TODO: This could be better
		hash-code "{_}"

hash-code
