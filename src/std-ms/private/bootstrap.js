"use strict"

// TODO: Make as small as possible.

// This object contains functions called upon by compiled code.
const ms = exports["ms"] = Object.create(null)
Object.defineProperty(global, "_ms", { value: ms })

const set = function(object, key, val) {
	Object.defineProperty(object, key, { value: val })
}

const assignMany = function(target, keysVals) {
	let i = 0
	while (i < keysVals.length) {
		const key = keysVals[i++]
		const val = keysVals[i++]
		Object.defineProperty(target, key,
			(val instanceof Lazy) ?
			{ get: val.get, enumerable: true } :
			{ value: val, enumerable: true })
	}
}

// TODO: Probably don't need to define these here
const symSub = exports["sym-sub"] = Symbol("sub")
const symSubsumes = exports["sym-subsumes?"] = Symbol("subsumes?")
const symCheckSubsumes = exports["sym-!subsumes"] = Symbol("!subsumes")
exports["sym-type-of"] = Symbol("type-of")

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
	return Object.freeze(baby)
})
exports["Dict"] = ms.Dict

set(ms, "subsumes", function(type, value) {
	if (type == null)
		throw new Error("Type missing")
	const test = type[symSubsumes]
	if (test == null)
		throw new Error(ms.show(type) + " does not implement `subsumes?`")
	return test(type, value)
})

set(ms, "checkSubsumes", function(type, value, name) {
	if (type == null)
		throw new Error("Type missing")
	const check = type[symCheckSubsumes]
	if (check == null)
		throw new Error(ms.show(type) + " does not implement `!subsumes`")
	check(type, value, name)
})

// TODO:ES6 ...args
set(ms, "sub", function(subbed) {
	if (subbed == null)
		throw new Error("subbed missing")
	const sub = subbed[symSub]
	if (sub == null)
		throw new Error(ms.show(subbed) + " does not implement `sub`")
	return sub.apply(null, arguments)
})

set(ms, "KLUDGE_defaultExport", function(module, _default) {
	if (_default == null)
		return
	const td = typeof _default
	if (td !== "object" && td !== "function")
		throw new Error("TODO:ES6 Non-object default export")
	const exports = module.exports
	set(module, "exports", _default)
	Object.getOwnPropertyNames(exports).forEach(function(name) {
		set(_default, name, exports[name])
	})
})

// Overwritten by show.ms
ms.show = function(x) {
	if (typeof x !== "string")
		throw new Error("Should only be using Strs here until this is defined for real in show.ms.")
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
	throw new global.Error(ms.unlazy(msg))
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

exports["proto-impl-sub?!"] = function(proto, impl) {
	set(proto, symSubsumes, impl)
}
exports["proto-impl-!sub!"] = function(proto, impl) {
	set(proto, syms["!sub"], impl)
}

// TODO: Kill me
exports["type-of-sub?!"] = function(fun, typeOf) {
	exports["proto-impl-sub?!"](fun, function(ignore, _) {
		return typeof _ === typeOf
	})
}


exports["proto-impl-sub?!"](Fun.prototype, function(fun, _) {
	return _ instanceof fun
})
// Except for Fun itself
// Actually, this helps us catch all Callables, not just Fun_s
// TODO: Separate Fun from Callable
exports["type-of-sub?!"](Fun, "function")

exports["type-of-sub?!"](Bool, "boolean")

exports["type-of-sub?!"](Str, "string")

exports["proto-impl-sub?!"](Object, function(ignore, _) {
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

exports["type-of-sub?!"](Symbol, "symbol")

exports["type-of-sub?!"](Num, "number")

// TODO: Use subsumes? method
exports["type-!sub"] = function(type, subsumed, name) {
	// TODO: Assert name is a Str, etc.
	const impl = type[symSubsumes]
	if (!impl(type, subsumed))
		// TODO: ms.show(type), ms.show(subsumed)
		throw new Error("Variable " + name + " is no " + type + ", is " + subsumed)
}

// Don't set permanently because that will be done by `implementor! Fun Type`
// TODO: Check that above is true
exports["set-mutable!"](Fun.prototype, symCheckSubsumes, exports["type-!sub"])

exports["extend!"] = Object.assign
