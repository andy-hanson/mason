const { bool, unlazy } = _ms

export	const
	// Boolean.ms
	// TODO:ES6 ...args
	iAnd = function() {
		const args = arguments
		switch (args.length) {
			case 0: return true
			case 1: return bool(args[0])
			case 2: return bool(args[0]) && bool(unlazy(args[1]))
			case 3: return bool(args[0]) && bool(unlazy(args[1])) && bool(unlazy(args[2]))
			default:
				if (!bool(args[0]))
					return false
				for (let i = 1; i < args.length; i = i + 1)
					if (!bool(unlazy(args[i])))
						return false
				return true
		}
	},

	// TODO:ES6 (...args) => {
	iOr = function() {
		const args = arguments
		switch (args.length) {
			case 0: return false
			case 1: return bool(args[0])
			case 2: return bool(args[0]) || bool(unlazy(args[1]))
			case 3: return bool(args[0]) || bool(unlazy(args[1])) || bool(unlazy(args[2]))
			default:
				if (bool(args[0]))
					return true
				for (let i = 1; i < args.length; i = i + 1)
					if (bool(unlazy(args[i])))
						return true
				return true
		}
	},

	// Kind.ms
	KindContains = (kind, _) =>
		_ != null && _[kind['symbol-for-isa']] !== undefined,
	isEmpty = array => array.length === 0,

	// show.ms
	newSet = () => new Set(),

	// Obj-Type.ms and Method.ms and Wrap-Type.ms
	buildStr = builder => {
		let s = ''
		builder(str => { s = s + str + '\n' })
		return s
	},
	// Obj-Type.ms
	addOne = _ => _ + 1,

	// perf-test.ms
	timeStar = (times, timeMe) => {
		let i = times
		const out = []
		while (i > 0) {
			i = i - 1
			out.push(timeMe(i))
		}
		return out
	},

	// Function.ms
	// TODO:ES6 (f, ...args) => Function.prototype.bind.call(f, null, ...args)
	iCurry = function(f) {
		return Function.prototype.bind.apply(f, arguments)
	},

	// Method.js
	// TODO: Should be doable in Mason...
	methodArgNames = nArgs => {
		const res = [ ]
		const a = 'a'.charCodeAt(0)
		for (let i = 0; i < nArgs; i = i + 1)
			res.push(String.fromCharCode(a + i))
		return res.join(',')
	}

// hash-code.ms
const hashes = new WeakMap()
export const
	hashCodeDefault = (_, hashCode) => {
		if (_ === null)
			return 108
		if (_ === undefined)
			return 109

		let hash = hashes.get(_)
		if (hash !== undefined)
			return hash

		// Don't recurse infinitely.
		hashes.set(_, 17)

		hash = 17
		for (let key in _)
			hash = (hashCode(_[key]) + ((hash * 23) | 0)) | 0

		hashes.set(_, hash)
		return hash
	},

	hashCodeString = _ => {
		let hash = 13
		for (let i = 0; i < _.length; i = i + 1)
			hash = ((hash + _.charCodeAt(i)) | 0) * 31
		return hash
	}
