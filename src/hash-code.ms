use
	.@ fold map
	.@.Array
	.Bool
	.Comparable =?
	.Fun
	.js reference=?
	.maps.Weak-Identity-Map!
	.math.bit-arithmetic bit-and hexidecimal
	.math.Num _ Int round-towards-0
	.methods + * empty empty?
	.Obj p ?p @p-all
	.Str
	.Symbol
	.types.Method _ impl! impl-for
debug use
	.! _ !not

max-hash-code = hexidecimal "7fffffff"

keep-small = |_
	bit-and _ max-hash-code

hashes = empty Weak-Identity-Map!

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
		!not =? (hash-code a) (hash-code b
		\ TODO: Check that it handles recursive values

	default. |:Int _
		case
			reference=? _ ()
				108
			reference=? _ undefined
				109
			hashes.has _
				hashes.get _
			:Fun
				\ TODO: Want to do other case below but it seems to cause infinite loop
				(impl-for hash-code Fun) _
			else
				\ Set it now so we don't recurse infinitely
				hashes.set _ 17
				\ TODO: Should this be a function in Obj.ms?
				vals = map @p-all_ |name
					p _ name
				hash = fold vals 17 |acc val
					x = keep-small (* acc 23)
					keep-small (+ (hash-code val) x)
				hashes.set _ hash
				hash

\ Since default hash-code only works on Objs, let's implement hash-code for primitives.
impl! hash-code Bool |case
	_
		1
	else
		0

impl! hash-code Fun |fun
	\ TODO: There must be something better than this.
	hash-code case ?p fun "displayName"
		empty?_
			fun.toString ()
		else
			_.val

impl! hash-code Str
	test. |
		! =? (hash-code "a") (hash-code "a")
		!not =? (hash-code "a") (hash-code "b")
	|_
		reducer = |hash ch
			keep-small (* 31 (+ hash (ch.charCodeAt 0)))
		Array.prototype.reduce.call _ reducer 13

impl! hash-code Symbol
	test. |
		sym = Symbol "test"
		! =? (hash-code sym) (hash-code sym)
	|:Int
		\ TODO:ES6 (currently this returns undefined)
		42 \ Symbol.keyFor _

impl! hash-code Num |case
	=? _ round-towards-0_ \ Don't use Int because that also checks that its' small
		bit-and _ max-hash-code
	else
		\ TODO: This could be better
		hash-code "{_}"

hash-code
