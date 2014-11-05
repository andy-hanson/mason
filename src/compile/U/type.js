"use strict"

const
	assert = require("assert")

Function.prototype.getName = function() { return this.name }

const type = module.exports = function() {
	if (!global.DEBUG) return
	for (let i = 0; i < arguments.length; i += 2)
		typePair(arguments[i], arguments[i + 1])
}

const typePair = function(instance, itsType) {
	if (itsType instanceof Array) {
		assert(itsType.length === 1)
		const emType = itsType[0]
		type(instance, Array)
		instance.forEach(function(em) { type(em, emType); })
	}
	if (!type.isa(instance, itsType)) {
		if (instance === null) throw new Error("Value null")
		if (instance === undefined) throw new Error("Value undefined")
		const strType =
			(itsType instanceof Array) ?
			"[" + itsType[0].getName() + "]" :
			(itsType instanceof Set) ?
			"{" + require("./Sq").toArray(itsType.values()) + "}" :
			itsType.getName()
		throw new Error(instance + " is not a " + strType)
	}
}

type.isa = function(instance, itsType) {
	switch (true) {
		case itsType.prototype !== undefined:
			return instance != null && itsType.prototype.isPrototypeOf(Object(instance))
		case itsType instanceof Array: {
			assert(itsType.length === 1)
			const emType = itsType[0]
			return (instance instanceof Array) &&
				instance.every(function(em) { return type.isa(em, emType) })
		}
		case require("./Op").prototype.isPrototypeOf(itsType):
			return instance instanceof Array &&
				instance.length < 2 &&
				(instance.length === 0 || type.isa(instance[0], itsType.type))
		case itsType instanceof Set:
			return itsType.has(instance)
		default:
			throw new Error("Not a type: " + itsType)
	}
}
