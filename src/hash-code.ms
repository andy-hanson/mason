use
	.compare =?
	.js js-bar
	.math.Number Int
	.private.js-impl hashCodeDefault hashCodeString
	.Type.Method _ impl!
use-debug
	.! _ !not

keep-small = |_
	js-bar _ 0

hash-code. Method
	doc. "
		Integer used to identify a value in a Hash-Map! (or Hash-Set!).
		This should have a high probability of being different than the hash-codes of the other values in the map.
	test. !|
		a =
			x. 1
			y. 2
		b =
			x. 1
			y. 1
		! =? (hash-code a) (hash-code a
		!not =? (hash-code a) (hash-code b
		# TODO: Check that it handles recursive values
	args. 1
	returns. Int
	allow-null?. true
	default. |_
		hashCodeDefault _ hash-code

# Since default hash-code only works on Objects, let's implement hash-code for primitives.
impl! hash-code Boolean |case
	_
		1
	else
		0

impl! hash-code Function |fun
	# TODO: There must be something better than this.
	hash-code case fun.name
		=? 0 _.length # TODO: empty?_
			fun.toString()
		else
			_

# TODO: Memoize this one too?
impl! hash-code String
	test. !|
		! =? (hash-code "a") (hash-code "a")
		!not =? (hash-code "a") (hash-code "b")
	hashCodeString

impl! hash-code Symbol
	test. !|
		sym = Symbol "test"
		! =? (hash-code sym) (hash-code sym)
	|:Int
		# TODO:ES6 (currently this returns undefined)
		42 # Symbol.keyFor _

# TODO: This treats small floats as equivalent.
impl! hash-code Number keep-small
