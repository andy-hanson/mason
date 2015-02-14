"use strict"

const assert = require("assert")
require("es6-shim")

const pAdd = function(object, key, val) {
	Object.defineProperty(object, key, {
		value: val,
		enumerable: true,
		writable: false // TODO:ES6 `writable` shouldn't need to be explicit
	})
}

// region Builtin Funs for use by the compiler
	// This object contains functions called upon by compiled code.
	const ms = exports["ms"] = {}
	pAdd(global, "_ms", ms)

	// TODO: Shouldn't need if we statically check.
	pAdd(ms, "get", function(object, key) {
		if (!Object.prototype.hasOwnProperty.call(object, key)) {
			throw new Error("Module " + object.displayName + " does not have " + key)
		}
		return object[key]
	})

	pAdd(ms, "bool", function(b) {
		if (typeof b !== "boolean")
			throw new Error("Expected Bool, got " + b)
		return b
	})

	// TODO:ES6 fun(...arg) should do this for me.
	pAdd(ms, "arr", function(a) {
		if (a instanceof Array)
			return a
		const out = []
		const iter = ms.iterator(a) // ms.iterator created by @/index.ms
		while (true) {
			const _ = iter.next()
			if (_.done)
				break
			else
				out.push(_.value)
		}
		return out
	})

	// For use by Obj-Type.ms
	pAdd(ms, "checkNoExtras", function(_this, _, rtName) {
		// If there was some key in `_` that we didn't copy:
		if (Object.keys(_).length > Object.keys(_this).length) {
			Object.getOwnPropertyNames(_).forEach(function(name) {
				if (name !== "displayName")
					if (!Object.prototype.hasOwnProperty.call(_this, name))
						throw new Error("Extra prop " + name + " for " + rtName)
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
				{ get: _ms.unlazy.bind(null, val), enumerable: true } :
				{ value: val, writable: false, enumerable: true })
		}
	}

	function Lazy(make) {
		this.cached = undefined
		this.make = make
	}
	pAdd(ms, "lazy", function(_) { return new Lazy(_) })
	pAdd(ms, "unlazy", function(_) {
		if (_ instanceof Lazy) {
			let c = _.cached
			if (c === undefined) {
				c = _.cached = _.make()
				_.make = undefined // Make available to garbage collector
				if (c === undefined)
					throw new Error("Lazy value can't be undefined. Made by:\n" + _.make)
			}
			return c
		}
		else return _
	})

	pAdd(ms, "set", function(_, k0, v0, k1, v1, k2, v2, k3) {
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
			pAdd(_, k, v)
	}

	pAdd(ms, "lset", function(_, k0, v0, k1, v1, k2, v2, k3) {
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

	// Overwritten by show.ms
	ms.show = function(x) {
		if (typeof x !== "string" && typeof x !== "number")
			throw new Error("Should only be using Strs or Nums here until this is defined for real in show.ms.")
		return x.toString()
	}

// region Funs used by bootstrapping code
	exports.Array = Array
	exports.Fun = Function
	exports.Obj = Object
	exports.Str = String
	exports.Symbol = Symbol
	exports["p+!"] = pAdd

// region Contains
	// Some Types want to implement contains? before it is officially defined.
	const containsImplSymbol = exports["contains?-impl-symbol"] = "impl-contains?"
	exports["impl-contains?!"] = function(type, impl) {
		Object.defineProperty(type.prototype, exports["contains?-impl-symbol"], {
			value: impl,
			enumerable: false
		})
	};
	// Overwritten by Type.ms
	ms.checkContains = function() { }

	Object[containsImplSymbol] = function(ignore, _) {
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
	};

	// An object is a Function if its typeof is `function`.
	// This helps us catch any callabe Obj-Type.
	// TODO: Separate Fun from Callable
	// Since these are primitives, we can't use `instanceof`.
	[ Function, Boolean, String, Symbol, Number ].forEach(function(type) {
		const typeOf = type.name.toLowerCase()
		type[containsImplSymbol] = function(ignore, _) {
			return typeof _ === typeOf
		}
	})