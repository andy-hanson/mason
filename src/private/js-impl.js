export	const
	// Kind.ms
	KindContains = function(_) {
		return _ != null && _[this['symbol-for-isa']] !== undefined
	},
	isEmpty = array => array.length === 0,

	// Method.ms
	buildStr = builder => {
		let s = ''
		builder(str => { s = s + str + '\n' })
		return s
	},

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

	hashCodeString = function() {
		let hash = 13
		for (let i = 0; i < this.length; i = i + 1)
			hash = ((hash + this.charCodeAt(i)) | 0) * 31
		return hash
	}
