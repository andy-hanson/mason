"use strict"

require("es6-shim")

const
	check = require("../check"),
	compile = require(".."),
	io = require("../U/io")

if (require.main === module) {
	const doTime = false
	if (doTime) console.time("compile all")

	let wasError = false
	io.processDir({
		inDir: "./src",
		outDir: "./js",
		processor: compile.processFile,
		verbose: false
	})
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
