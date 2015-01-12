"use strict"

require("es6-shim")

// TODO: Make as small as possible.

// This object contains functions called upon by compiled code.
const ms = exports["ms"] = Object.create(null)
Object.defineProperty(global, "_ms", { value: ms })

const set = function(object, key, val) {
	// TODO:ES6 `writable` shouldn't need to be explicit
	Object.defineProperty(object, key, { value: val, writable: false })
}

const assignMany = function(target, keysVals) {
	let i = 0
	while (i < keysVals.length) {
		const key = keysVals[i++]
		const val = keysVals[i++]
		Object.defineProperty(target, key,
			(val instanceof Lazy) ?
			{ get: val.get, enumerable: true } :
			{ value: val, writable: false, enumerable: true })
	}
}

// TODO!!!
exports["sym-sub"] = "impl-sub" //Symbol("sub")
exports["sym-contains?"] = "impl-contains?" //Symbol("contains?")
exports["sym-type-of"] = "impl-type-of" //Symbol("type-of")

function Lazy(make) {
	const baby = Object.create(Lazy.prototype)
	let cached
	Object.defineProperty(baby, "get", {
		value: function() {
			if (cached === undefined) {
				cached = make()
				if (cached === undefined)
					throw new Error("Lazy value can't be undefined. Made by:\n" + make)
			}
			return cached
		}
	})
	return baby
}
set(ms, "Lazy", Lazy)

set(ms, "unlazy", function(a) {
	return (a instanceof Lazy) ? a.get() : a
})

set(ms, "dictify", function(target) {
	assignMany(Object(target), global.Array.prototype.slice.call(arguments, 1))
	return target
})

// TODO:ES6 ...args
set(ms, "mkArray", function() {
	return Object.freeze(Array.prototype.slice.call(arguments))
})

set(ms, "Dict", function Dict() {
	const baby = Object.create(Dict.prototype)
	assignMany(baby, arguments)
	return baby
})
exports["Dict"] = ms.Dict

set(ms, "contains", function(type, value) {
	if (type == null)
		throw new Error("Type missing")
	const test = type[exports["sym-contains?"]]
	if (test == null)
		throw new Error(ms.show(type) + " does not implement `contains?`")
	return test(type, value)
})

set(ms, "checkContains", function(type, value, name) {
	if (!ms.contains(type, value))
		throw new Error(name + " is no " + ms.show(type) + ", is " + value)
})

// TODO:ES6 ...args
set(ms, "sub", function(subbed) {
	if (subbed == null)
		throw new Error("subbed missing")
	const sub = subbed[exports["sym-sub"]]
	if (sub == null)
		throw new Error(ms.show(subbed) + " does not implement `sub`")
	return sub.apply(null, arguments)
})

// Overwritten by show.ms
ms.show = function(x) {
	if (typeof x !== "string")
		return x.toString()
		// TODO: //throw new Error("Should only be using Strs here until this is defined for real in show.ms.")
	return x
}

// TODO:ES6 ...args
set(ms, "mkStr", function() {
	return Array.prototype.slice.call(arguments).map(ms.show).join("")
})

// TODO: See which of these are really needed.
exports["Array"] = Array
const Bool = exports["Bool"] = Boolean
const Fun = exports["Fun"] = Function
const Num = exports["Num"] = Number
exports["Object"] = Object
const Str = exports["Str"] = String
exports["Symbol"] = Symbol

exports["oh-no!"] = function(message) {
	throw new global.Error(ms.unlazy(message))
}

exports["own-properties"] = function(object) {
	return Object.getOwnPropertyNames(object).concat(Object.getOwnPropertySymbols(object))
}

exports["global"] = global

// TODO: get-property
exports["get"] = function(object, key) {
	const x = object[key]
	if (x === undefined)
		throw new Error("Undefined member " + key)
	return x
}

// TODO: Use this instead of js literals where possible
exports["get-or-undefined"] = function(object, key) {
	return object[key]
}

// TODO: set-property!
exports["set!"] = set

exports["set-mutable!"] = function(object, key, val) {
	Object.defineProperty(object, key, { value: val, writable: true })
}

exports["has?"] = function(object, key) {
	return Object.prototype.hasOwnProperty.call(object, key)
}

exports["has-or-in-proto?"] = function(object, key) {
	return object[key] !== undefined
}

// TODO: Make sure I'm using the right one
exports["exists?"] = function(a) {
	return a !== undefined
}

exports["any?"] = function(a) {
	return a != null
}

exports["true"] = true
exports["false"] = false

exports["proto-impl-contains?!"] = function(proto, impl) {
	set(proto, exports["sym-contains?"], impl)
}

// TODO: Kill me
exports["type-of-contains?!"] = function(fun, typeOf) {
	exports["proto-impl-contains?!"](fun, function(ignore, _) {
		return typeof _ === typeOf
	})
}


exports["proto-impl-contains?!"](Fun.prototype, function(fun, _) {
	return _ instanceof fun
})
// Except for Fun itself
// Actually, this helps us catch all Callables, not just Fun_s
// TODO: Separate Fun from Callable
exports["type-of-contains?!"](Fun, "function")

exports["type-of-contains?!"](Bool, "boolean")

exports["type-of-contains?!"](Str, "string")

exports["proto-impl-contains?!"](Object, function(ignore, _) {
	if (_ == null)
		return false
	switch (typeof _) {
		case "boolean":
		case "undefined":
		case "number":
		case "string":
			return false
		default:
			return true
	}
})

exports["type-of-contains?!"](Symbol, "symbol")

exports["type-of-contains?!"](Num, "number")

exports["extend!"] = Object.assign

// TODO: Only use in Interface.ms - get rid of.
exports["ignore"] = function() { }

exports["new-array"] = function() { return [ ] }

exports["writable?"] = function(object, property) {
	const desc = Object.getOwnPropertyDescriptor(object, property)
	return desc == null || desc.writable
}



const assert = require("assert")

function getImpl(method, args) {
	const target = args[0]
	if (target == null) {
		return method["default"]
	} else {
		const _ = target[method["impl-symbol"]]
		if (_ == undefined)
			return method["default"]
		else
			return _
	}
}

const make_callable_method_old = function(method) {
	const sym = method["impl-symbol"]
	const def = method.default
	if (method.wrap === undefined) {
		return function(a, b, c, d, e, f, g, h) {
			//assert(h === undefined)
			let impl
			if (a == null)
				impl = def
			else {
				impl = a[sym]
				if (impl === undefined)
					impl = def
			}
			return impl(a, b, c, d, e, f, g, h)
		}
	} else {
		return function() {
			const args = Array.prototype.slice.call(arguments, 0)
			return method.wrap(getImpl(method, args), args)
		}
	}
}

exports["make-callable-method"] = function(method) {
	const sym = method["impl-symbol"]
	if (method.wrap !== undefined) {
		// TODO
		return make_callable_method_old(method)
	}
	else {
		// TODO: Ensure does not contain quotes
		assert(typeof sym === "string")
		const f = Function("def", [
			"return function(a, b, c, d, e, f, g, h) { \
			var impl; \
			if (a == null) impl = def; \
			else { impl = a[\"" + sym + "\"]; if (impl === undefined) impl = def } \
			return impl(a, b, c, d, e, f, g, h) }"
		].join("\n"))(method.default)
		return f
	}
}
