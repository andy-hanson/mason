"use strict"

module.exports = {
	"each-generator": function(iter, doEach) {
		for (let em of iter)
			yield* doEach(em)
	},
	"i!": function(a) { return !a },
	"i~": function(a) { return ~a },
	"i-bar": function(a, b) { return a | b },
	"i-false": false,
	"i-global": global,
	"i-new": function(constructor) {
		return new (Function.prototype.bind.apply(constructor, arguments))
	},
	"i-sub": function(a, b) { return a[b] },
	"i-set": function(a, b, c) { a[b] = c },
	"i-true": true,
}

const binOps = [ "&", "^", "<<", ">>", ">>>", "===", "<", ">", "<=", ">=", "+", "-", "*", "/", "%" ]
binOps.forEach(function(op) {
	module.exports["i" + op] = Function("a", "b", "return a " + op + " b")
})


