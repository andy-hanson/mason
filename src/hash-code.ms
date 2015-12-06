import
	global WeakMap
	.@.@ empty?
	.js defined? id=? js* js- js+ js-bar js-sub
	.math.Number Int
	.Type.Method _ impl!

hash-code. new Method
	| Integer used to identify a value in a Hash-Map (or Hash-Set).
	| This should have a high probability of being different than the hash-codes of the other values in the map.
	name.
	args. []
	returns. Int
	allow-null?. true
	default. .|
		switch this
			null
				108
			undefined
				109
			else
				|| Overriden for primitives, so safe to use WeakMap here.
				cached = hashes-cache.get this
				cond (defined? cached) cached
					|| Don't recurse infinitely.
					hashes-cache.set this 17
					hash = 17
					for key of Object.keys this
						val = js-sub this key
						val-hash = hash-code val
						hash := js-bar (js* hash 23) 0
						hash := js-bar (js+ hash val-hash) 0
					hashes-cache.set this hash
					hash

hashes-cache = new WeakMap

region Since default hash-code only works on Objects, let's implement hash-code for primitives.
	impl! hash-code Boolean .|
		cond this 1 0

	impl! hash-code Function .|
		todo There must be something better than this.
		hash-code case .name
			empty?_
				.toString()
			else
				_

	todo Memoize this one too?
	impl! hash-code String .|
		hash = 13
		i = .length
		for
			hash := js+ hash (.charCodeAt i)
			hash := js-bar hash 0
			hash := js* hash 31

			if id=? i 0
				break
			i := js- i 1
		hash

	impl! hash-code Symbol |
		todo ES6 (currently this returns undefined)
		todo Symbol.keyFor _
		42

	todo  This treats small floats as equivalent.
	impl! hash-code Number .|
		js-bar this 0
