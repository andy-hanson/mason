export const
	assert = cond => {
		if (!cond)
			throw new Error('Assertion failed.')
	},

	// -0 is negative
	isPositive = n => n >= 0 && 1 / n !== -Infinity,

	implementMany = (holder, methodName, nameToImpl) => {
		Object.keys(nameToImpl).forEach(name => {
			holder[name].prototype[methodName] = nameToImpl[name]
		})
		return function(target) { return target[methodName].apply(null, arguments) }
	},

	// TODO:ES6 Just use `new Set`
	newSet = function() {
		const set = new Set()
		for (let i = 0; i < arguments.length; i = i + 1)
			arguments[i].forEach(_ => set.add(_))
		return set
	},

	// TODO:ES6 map.keys()
	mapKeys = map => {
		const res = [ ]
		map.forEach((value, key) => res.push(key))
		return res
	}
