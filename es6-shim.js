'use strict'

if (!Object.assign)
	Object.assign = function(target) {
		if (target === undefined || target === null)
			throw new TypeError('Cannot convert first argument to object')
		const to = Object(target)
		for (let i = 1; i < arguments.length; i = i + 1) {
			let nextSource = arguments[i]
			if (nextSource === undefined || nextSource === null)
				continue
			nextSource = Object(nextSource)
			const keysArray = Object.keys(Object(nextSource))
			for (let nextIndex = 0; nextIndex < keysArray.length; nextIndex = nextIndex + 1) {
				const nextKey = keysArray[nextIndex]
				const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey)
				if (desc !== undefined && desc.enumerable)
					to[nextKey] = nextSource[nextKey]
			}
		}
		return to
	}

function defIter(type, impl) {
	if (type.prototype[Symbol.iterator] === undefined)
		type.prototype[Symbol.iterator] = impl
}

defIter(Array, function*() {
	for (let i = 0; i < this.length; i = i + 1)
		yield this[i]
})
defIter(String, Array.prototype[Symbol.iterator])

defIter(Set, function() { return this.keys() })
