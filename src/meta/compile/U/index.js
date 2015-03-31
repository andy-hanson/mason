import assert from 'assert'
import chalk from 'chalk'
import type from './type'

export const
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

	code = chalk.bold.green,

	setUnion = function() {
		const s = new Set()
		for (let i = 0; i < arguments.length; i = i + 1)
			for (let x of arguments[i].values())
				s.add(x)
		return s
	},

	pAdd = (obj, newName, newVal) => {
		if (Object.prototype.hasOwnProperty.call(obj, newName))
			throw new Error(`Already has property ${newName}, have ${Object.keys(obj)}`)
		const _ = clone(obj)
		_[newName] = newVal
		return _
	}

const clone = obj => {
	const nu = Object.create(Object.getPrototypeOf(obj))
	Object.getOwnPropertyNames(obj).forEach(name => {
		nu[name] = obj[name]
	})
	return nu
}
