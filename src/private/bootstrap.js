"use strict"

const assert = require("assert")
require("es6-shim")

// This object contains functions called upon by compiled code.
const ms = exports["ms"] = {}

const set = function(object, key, val) {
	// TODO:ES6 `writable` shouldn't need to be explicit
	Object.defineProperty(object, key, { value: val, writable: false })
}

set(global, "_ms", ms)

// TODO: Shouldn't need if we statically check.
set(ms, "get", function(object, key) {
	if (!Object.prototype.hasOwnProperty.call(object, key))
		throw new Error("Module " + object.displayName + " does not have " + key)
	return object[key]
})

// For use by Record-Type.ms
set(ms, "checkNoExtras", function(_this, _, rtName) {
	// If there was some key in `_` that we didn't copy:
	if (Object.keys(_).length > Object.keys(_this).length) {
		Object.getOwnPropertyNames(_).forEach(function(name) {
			if (name !== "displayName")
				if (!Object.prototype.hasOwnProperty.call(_this, name))
					throw new Error("Extra member " + name + " for " + rtName)
		})
	}
})

const assignMany = function(target, keysVals) {
	let i = 0
	while (i < keysVals.length) {
		const key = keysVals[i++]
		const val = keysVals[i++]
		Object.defineProperty(target, key,
			(val instanceof Lazy) ?
			{ get: lazyGet.bind(null, val), enumerable: true } :
			{ value: val, writable: false, enumerable: true })
	}
}

// TODO!!!
exports["sym-contains?"] = "impl-contains?"

function Lazy(make) {
	this.cached = undefined
	this.make = make
}
const lazyGet = function(_) {
	let c = _.cached
	if (c === undefined) {
		c = _.cached = _.make()
		_.make = undefined // Make available to garbage collector
		if (c === undefined)
			throw new Error("Lazy value can't be undefined. Made by:\n" + _.make)
	}
	return c
}
set(ms, "lazy", function(_) { return new Lazy(_) })
set(ms, "unlazy", function(a) { return (a instanceof Lazy) ? lazyGet(a) : a })

set(ms, "set", function(_, k0, v0, k1, v1, k2, v2, k3) {
	_[k0] = v0
	if (k1 === undefined)
		return _
	_[k1] = v1
	if (k2 === undefined)
		return _
	_[k2] = v2
	assert(k3 === undefined)
	return _
})

const setOrLazy = function(_, k, v) {
	if (v0 instanceof Lazy)
		Object.setProperty(_, k0, { get: function() { return unlazy(v0) } })
	else
		_[k] = v
}

set(ms, "lset", function(_, k0, v0, k1, v1, k2, v2, k3) {
	setOrLazy(_, k0, v0)
	if (k1 === undefined)
		return _
	setOrLazy(_, k1, v1)
	if (k2 === undefined)
		return _
	setOrLazy(_, k2, v2)
	assert(k3 === undefined)
	return _
})

// Overwritten by methods.ms.
ms.checkContains = function() { }

// Overwritten by show.ms
ms.show = function(x) {
	if (typeof x !== "string" && typeof x !== "number")
		throw new Error("Should only be using Strs or Nums here until this is defined for real in show.ms.")
	return x.toString()
}

exports.Array = Array
exports.Fun = Function
exports.Obj = Object
exports.Str = String
exports.Symbol = Symbol

// TODO: p+!
exports["set!"] = set

// TODO: p+mut!
exports["set-mutable!"] = function(object, key, val) {
	Object.defineProperty(object, key, { value: val, writable: true })
}

exports["proto-impl-contains?!"] = function(proto, impl) {
	set(proto, exports["sym-contains?"], impl)
};

// TODO: Consider making everything an Object
exports["proto-impl-contains?!"](Object, function(ignore, _) {
	if (_ == null)
		return false
	switch (typeof _) {
		case "boolean":
		case "undefined":
		case "number":
		case "string":
		case "symbol":
			return false
		default:
			return true
	}
});

// An object is a Function if its typeof is `function`.
// This helps us catch any callabe Record-Type.
// TODO: Separate Fun from Callable
// Since these are primitives, we can't use `instanceof`.
[ Function, Boolean, String, Symbol, Number ].forEach(function(type) {
	const typeOf = type.name.toLowerCase()
	exports["proto-impl-contains?!"](type, function(ignore, _) {
		return typeof _ === typeOf
	})
})