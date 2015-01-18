"use strict"

const ms = require("./private/bootstrap").ms

module.exports = {
	// js.ms
	"i!": function(a) { return !a },
	"i~": function(a) { return ~a },
	"i-bar": function(a, b) { return a | b },
	"i-delete": function(a, b) { delete a[b] },
	"i-false": false,
	"i-global": global,
	"i-new": function(constructor, args) {
		return new (Function.prototype.bind.apply(constructor, [constructor].concat(args)))
	},
	"i-oh-no!": function(error) {
		throw module.exports["make-Error"](error)
	},
	"i-sub": function(a, b) { return a[b] },
	"i-set": function(a, b, c) { a[b] = c },
	"i-true": true,
	"i-typeof": function(a) { return typeof a },

	// Generator.ms
	"each-generator": function*(iter, doEach) {
		for (let em of iter)
			yield* doEach(em)
	},

	// Try.ms
	"i-always-do-after": function(tried, finallyDo) {
		try {
			return tried()
		}
		finally {
			finallyDo()
		}
	},
	"i-try": function(makeSuccess, tried) {
		try {
			return makeSuccess(tried())
		}
		catch (e) {
			return e
		}
	},
	"make-Error": function(error) {
		let err
		try {
			err = ms.unlazy(error)
		}
		catch (e) {
			return e
			//return new Error ("Error making error: " + e.message)
		}
		if (err instanceof Error)
			return err
		if (typeof err === "string")
			return new Error(err)
		if (err == null)
			return new Error("Oh no!")
		return new Error("Argument to `oh-no!` must be Error or String")
	},

	// modules.ms (TODO:ES6: remove)
	"i-require": require,

	// Array.ms
	"array-iterator": function*(_) {
		for (let i = 0; i < _.length; i++)
			yield _[i]
	},

	// show.ms
	"new-Set": function() { return new global.Set() },

	// Hash-Map.ms
	"i-make-map": function(hm, assoc, args) {
		let i = 0
		while (i < args.length) {
			const key = args[i]
			i++
			const val = args[i]
			i++
			assoc(hm, key, val)
		}
	},

	// Record-Type.ms
	"build-str": function(builder) {
		let s = ""
		builder(function(str) { s += str + "\n" })
		return s
	},

	// time.ms
	"i-time*": function(times, timeMe) {
		let i = times
		const out = []
		while (i--)
			out.push(timeMe())
		return out
	}
}

const binOps = [ "&", "^", "<<", ">>", ">>>", "===", "<", ">", "<=", ">=", "+", "-", "*", "/", "%" ]
binOps.forEach(function(op) {
	module.exports["i" + op] = Function("a", "b", "return a " + op + " b")
})
