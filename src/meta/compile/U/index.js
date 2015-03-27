import assert from 'assert'
import chalk from 'chalk'
import type from './type'

// Because console.log just gives me [object Object], whose bright idea was that?
export function log(x) {
	if (x === null) console.log('null')
	else if (x === undefined) console.log('undefined')
	else console.log(x.toString())
}

export function indent(n) {
	type(n, Number)
	return '\t'.repeat(n)
}

export function indented(str) {
	type(str, String)
	return str.replace(/\n/g, '\n\t')
}

export const isPositive = n =>
	// -0 is negative
	n >= 0 && 1 / n !== -Infinity

function clone(obj) {
	const nu = Object.create(Object.getPrototypeOf(obj))
	Object.getOwnPropertyNames(obj).forEach(name => {
		nu[name] = obj[name]
	})
	return nu
}

export function set(obj, replacedName, replacedVal) {
	assert(Object.prototype.hasOwnProperty.call(obj, replacedName))
	const nu = Object.create(Object.getPrototypeOf(obj))
	let didReplace = false
	Object.getOwnPropertyNames(obj).forEach(name => {
		if (name === replacedName) {
			assert(!didReplace)
			nu[name] = replacedVal
			didReplace = true
		}
		else
			nu[name] = obj[name]
	})
	assert(didReplace)
	return nu
}

export function pAdd(obj, newName, newVal) {
	if (Object.prototype.hasOwnProperty.call(obj, newName))
		throw new Error(`Already has property ${newName}, have ${Object.keys(obj)}`)
	const _ = clone(obj)
	_[newName] = newVal
	return _
}

export function trimRight(str) {
	return str.replace(/\s+$/, '')
}

export function implementMany(holder, methodName, nameToImpl) {
	Object.keys(nameToImpl).forEach(name => {
		holder[name].prototype[methodName] = nameToImpl[name]
	})
	return function(target) { return target[methodName].apply(null, arguments) }
}

export function implementMany2(methodName, pairs) {
	pairs.forEach(([ type, impl ]) => {
		// TODO:ES6 spread
		type.prototype[methodName] = function() {
			return impl.apply(null, [this].concat(Array.prototype.slice.call(arguments, 0)))
		}
	})
}

export function code(str) {
	type(str, String)
	return chalk.bold.green(str)
}

export function setUnion() {
	const s = new Set()
	for (let i = 0; i < arguments.length; i = i + 1)
		for (let x of arguments[i].values())
			s.add(x)
	return s
}
