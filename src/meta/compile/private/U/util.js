export const
	assert = cond => {
		if (!cond)
			throw new Error('Assertion failed.')
	},

	log = _ => console.log(
		_ === null ? 'null' :
		_ === undefined ? 'undefined' :
		_.toString()),

	lazy = get => {
		let cached
		return () => {
			if (cached === undefined) {
				cached = get()
				assert(cached !== undefined)
			}
			return cached
		}
	},

	// -0 is negative
	isPositive = n => n >= 0 && 1 / n !== -Infinity,

	implementMany = (holder, methodName, nameToImpl) => {
		Object.keys(nameToImpl).forEach(name => {
			holder[name].prototype[methodName] = nameToImpl[name]
		})
		return function(target) { return target[methodName].apply(null, arguments) }
	},

	implementMany2 = (methodName, pairs) => {
		pairs.forEach(([ type, impl ]) => { type.prototype[methodName] = impl })
		// TODO:ES6 spread
		return function() { return arguments[0][methodName](...arguments) }
	},

	// TODO:ES6 Just use `new Set`
	newSet = function() {
		const set = new Set()
		for (let i = 0; i < arguments.length; i = i + 1)
			arguments[i].forEach(s => s.forEach(_ => set.add(_)))
		return set
	},

	// TODO:ES6 Just use `new Map`
	newMap = mapMembers => {
		const map = new Map()
		mapMembers.forEach(([ key, val ]) => map.set(key, val))
		return map
	}
