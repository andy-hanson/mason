const
	assert = require("assert"),
	type = require("./type")

// Because console.log just gives me [object Object], whose bright idea was that?
const log = function(x) {
	if (x === null) console.log("null")
	else if (x === undefined) console.log("undefined")
	else console.log(x.toString())
}

const indent = function(n) {
	type(n, Number)
	return '\t'.repeat(n)
}

const indented = function(str) {
	type(str, String)
	return str.replace(/\n/g, '\n\t')
}

const _with = function(obj, replacedName, replacedVal) {
	assert(Object.prototype.hasOwnProperty.call(obj, replacedName))
	const nu = Object.create(Object.getPrototypeOf(obj))
	let didReplace = false
	Object.getOwnPropertyNames(obj).forEach(function(name) {
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

const ignore = function() { }

const trimRight = function(str) { return str.replace(/\s+$/, "") }

const implementMany = function(holder, methodName, dict) {
	Object.keys(dict).forEach(function(name) {
		holder[name].prototype[methodName] = dict[name]
	})
}

const code = function(str) {
	type(str, String)
	return "`" + str + "`"
}

module.exports = {
	log: log,
	indent: indent,
	indented: indented,
	with: _with,
	ignore: ignore,
	trimRight: trimRight,
	implementMany: implementMany,
	code: code
}
