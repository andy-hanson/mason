"use strict"

const
	type = require("./type"),
	U = require("./index")

const abstractType = function(name, superType) {
	type(name, String, superType, Object)
	return {
		prototype: Object.create(superType.prototype),
		getName: function() { return name },
		toString: function() { return name }
	}
}

const recordType = function(name, superType, members) {
	type(name, String, superType, Object, members, Object)
	const prototype = Object.create(superType.prototype)

	Object.keys(members).forEach(function(key) { type(members[key], Object) })

	const theType = function(babyMembers)
	{
		const baby = Object.create(prototype)
		Object.keys(members).forEach(function(key)
		{
			const val = babyMembers[key]
			if (global.DEBUG && !type.isa(val, members[key]))
				throw new Error("Bad " + key + ": is " + val + ", should be a " + members[key])
			baby[key] = val
		})
		return Object.freeze(baby)
	}
	theType.prototype = prototype // Used for type tests
	theType.getName = theType.toString = function() { return name }
	theType.prototype.type = function() { return theType }
	return theType
}

const inspect = function(x) {
	let s = x.type().getName() + " {"
	Object.keys(x).forEach(function(key) {
		const val = x[key]
		const str = (val instanceof Array) ? val.join(",\n") : toStr(val)
		s += "\n\t" + key + ": " + U.indented(str)
	})
	return s + "\n}"
}

const toStr = function(x) {
	if (x === null) return "null"
	if (x === undefined) return "undefined"
	return x.toString()
}

module.exports = {
	abstractType: abstractType,
	recordType: recordType
}