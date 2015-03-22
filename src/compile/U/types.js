import type, { isa } from "./type"
import { indented } from "./index"

export function abstractType(name, superType) {
	type(name, String, superType, Object)
	return {
		prototype: Object.create(superType.prototype),
		getName: function() { return name },
		toString: function() { return name }
	}
}

export function recordType(name, superType, members) {
	type(name, String, superType, Object, members, Object)
	const prototype = Object.create(superType.prototype)

	Object.keys(members).forEach(function(key) { type(members[key], Object) })

	const theType = function(babyMembers)
	{
		const baby = Object.create(prototype)
		Object.keys(members).forEach(function(key)
		{
			const val = babyMembers[key]
			if (global.DEBUG && !isa(val, members[key]))
				throw new Error("Bad " + key + ": is " + val + ", should be a " + members[key])
			baby[key] = val
		})
		return Object.freeze(baby)
	}
	// Used for type tests
	theType.prototype = prototype
	theType.getName = theType.toString = function() { return name }
	theType.prototype.type = function() { return theType }
	theType.prototype.toString = function() { return inspect(this) }
	return theType
}

function inspect(_) {
	let s = _.type().getName() + " {"
	Object.keys(_).forEach(function(key) {
		const val = _[key]
		const str = val instanceof Array ? val.join(",\n") : toStr(val)
		s = s + "\n\t" + key + ": " + indented(str)
	})
	return s + "\n}"
}

const toStr = function(_) {
	if (_ === null) return "null"
	if (_ === undefined) return "undefined"
	return _.toString()
}
