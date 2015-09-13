use
	global WeakMap
	.compare =?
	.js id=? js* js- js+ js-bar js-sub
	.math.Number Int
	.Type.Method _ impl!

hash-code. new Method
	| Integer used to identify a value in a Hash-Map (or Hash-Set).
	| This should have a high probability of being different than the hash-codes of the other values in the map.
	name.
	test. !|
		a =
			x. 1
			y. 2
		b =
			x. 1
			y. 1
		assert! =? (hash-code a) (hash-code a)
		forbid! =? (hash-code a) (hash-code b)
		todo  Check that it handles recursive values
	args. 1
	returns. Int
	allow-null?. true
	default. .|
		case
			id=? this null
				108
			id=? this undefined
				109
			else
				case hashes-cache.get this
					id=? _ undefined
						|| Don't recurse infinitely.
						hashes-cache.set this 17
						hash ::= 17

						for! key in Object.keys this
							val = js-sub this key
							val-hash = hash-code val
							hash := js-bar (js* hash 23) 0
							hash := js-bar (js+ hash val-hash) 0

						hashes-cache.set this hash
						hash
					else
						_

hashes-cache = new WeakMap

region Since default hash-code only works on Objects, let's implement hash-code for primitives.
	impl! hash-code Boolean .|
		cond this 1 0

	impl! hash-code Function .|
		todo  There must be something better than this.
		hash-code case .name
			=? 0 _.length todo  empty?_
				.toString()
			else
				_

	todo  Memoize this one too?
	impl! hash-code String
		test. !|
			assert! =? (hash-code "a") (hash-code "a")
			forbid! =? (hash-code "a") (hash-code "b")
		.|
			hash ::= 13
			i ::= .length
			for!
				hash := js+ hash (.charCodeAt i)
				hash := js-bar hash 0
				hash := js* hash 31

				if! id=? i 0
					break!
				i := js- i 1
			hash

	impl! hash-code Symbol
		test. !|
			sym = Symbol "test"
			assert! =? (hash-code sym) (hash-code sym)
		|
			todo ES6 (currently this returns undefined)
			todo Symbol.keyFor _
			42

	todo  This treats small floats as equivalent.
	impl! hash-code Number .|
		js-bar this 0
