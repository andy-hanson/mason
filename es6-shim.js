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

function def(type, name, impl) {
	if (type.prototype[name] === undefined)
		type.prototype[name] = impl
}

def(Array, Symbol.iterator, function*() {
	for (let i = 0; i < this.length; i = i + 1)
		yield this[i]
})
def(String, Symbol.iterator, Array.prototype[Symbol.iterator])

def(Set, Symbol.iterator, function() {
	const all = [ ]
	this.forEach(function(_) { all.push(_) })
	return all[Symbol.iterator]()
})

def(Map, Symbol.iterator, function() {
	const all = [ ]
	this.forEach(function(val, key) { all.push([ key, val ]) })
	return all[Symbol.iterator]()
})

def(Map, 'keys', function() {
	const keys = [ ]
	this.forEach(function(_value, key) { keys.push(key) })
	return keys[Symbol.iterator]()
})

def(Map, 'values', function() {
	const values = [ ]
	this.forEach(function(value) { values.push(value) })
	return values[Symbol.iterator]()
})
