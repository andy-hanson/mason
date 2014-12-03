"use strict"

require("es6-shim")

const
	check = require("./compile/check"),
	compile = require("./compile")

// Speed boost by turning this off
global.DEBUG = true

if (require.main === module) {
	const doTime = false
	if (doTime) console.time("compile all")

	let wasError = false
	compile.dirToDir("./src", "./js")
	.catch(function(e) {
		wasError = true
		// When not in DEBUG mode, don't show the full stack trace.
		if (e instanceof check.CompileError && !global.DEBUG)
			console.warn(e.message)
		else
			throw e
	})
	.then(function() {
		if (doTime) console.timeEnd("compile all")
	})
	.done()
}
