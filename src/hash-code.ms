use
	.@.@ empty? fold map
	.@.@-Type empty
	.@.Map.Weak-Id-Map!
	.compare =?
	.js id=?
	.math.bit-arithmetic bit-and hexidecimal
	.math.Number Int round-towards-0
	.math.methods + *
	.Object p ?p @p-all
	.Type.Method _ impl! impl-for
use-debug
	.! _ !not

max-hash-code = hexidecimal "7fffffff"

keep-small = |_
	bit-and _ max-hash-code

hashes = empty Weak-Id-Map!

hash-code = Method
	doc.
		"
			|:Int _
			Integer used to identify a value in a Hash-Map! (or Hash-Set!).
			This should have a high probability of being different than the hash-codes of the other values in the map.
	test. |
		a =
			x. 1
			y. 2
		b =
			x. 1
			y. 1
		! =? (hash-code a) (hash-code a)
		!not =? (hash-code a) (hash-code b
		# TODO: Check that it handles recursive values

	default. |:Int _
		case
			id=? _ ()
				108
			id=? _ undefined
				109
			hashes.has _
				hashes.get _
			:Function
				# TODO: Want to do other case below but it seems to cause infinite loop
				(impl-for hash-code Function) _
			else
				# Set it now so we don't recurse infinitely
				hashes.set _ 17
				# TODO: Should this be a function in Object.ms?
				vals = map @p-all_ |name
					p _ name
				hash = fold vals 17 |acc val
					x = keep-small (* acc 23)
					keep-small (+ (hash-code val) x)
				hashes.set _ hash
				hash

# Since default hash-code only works on Objects, let's implement hash-code for primitives.
impl! hash-code Boolean |case
	_
		1
	else
		0

impl! hash-code Function |fun
	# TODO: There must be something better than this.
	hash-code case ?p fun "displayName"
		empty?_
			case fun.name
				=? 0 _.length # TODO: empty?_
					fun.toString()
				else
					_
		else
			_.val

impl! hash-code String
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
		# TODO:ES6 (currently this returns undefined)
		42 # Symbol.keyFor _

impl! hash-code Number |_
	# TODO: This treats small floats as equivalent.
	bit-and round-towards-0_ max-hash-code

hash-code
