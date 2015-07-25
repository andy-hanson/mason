use
	.compare =?
	.js js-bar
	.math.Number Int
	.private.js-impl hashCodeDefault hashCodeString
	.Type.Method _ impl!

hash-code. new Method
	doc. "
		Integer used to identify a value in a Hash-Map (or Hash-Set).
		This should have a high probability of being different than the hash-codes of the other values in the map.
	test. !|
		a =
			x. 1
			y. 2
		b =
			x. 1
			y. 1
		assert! =? (hash-code a) (hash-code a
		forbid! =? (hash-code a) (hash-code b
		# TODO: Check that it handles recursive values
	args. 1
	returns. Int
	allow-null?. true
	default. .|
		hashCodeDefault this hash-code

# Since default hash-code only works on Objects, let's implement hash-code for primitives.
impl! hash-code Boolean .|
	case this
		_
			1
		else
			0

impl! hash-code Function .|
	# TODO: There must be something better than this.
	hash-code case .name
		=? 0 _.length # TODO: empty?_
			.toString()
		else
			_

# TODO: Memoize this one too?
impl! hash-code String
	test. !|
		assert! =? (hash-code "a") (hash-code "a")
		forbid! =? (hash-code "a") (hash-code "b")
	hashCodeString

impl! hash-code Symbol
	test. !|
		sym = Symbol "test"
		assert! =? (hash-code sym) (hash-code sym)
	|
		# TODO:ES6 (currently this returns undefined)
		42 # Symbol.keyFor _

# TODO: This treats small floats as equivalent.
impl! hash-code Number .|
	js-bar this 0
