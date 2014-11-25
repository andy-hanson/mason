"use strict"

require("es6-shim")

const
	check = require("./compile/check"),
	compile = require("./compile")

// Speed boost by turning this off
global.DEBUG = true

if (require.main === module)
	runSample()

function runSample() {
	const doTime = false

	const goodStacktrace = true // Good but slow and kludge-y.

	const runIt = function() {
		if (doTime) console.time("run sample")
		require("./std-js")()
		if (doTime) console.timeEnd("run sample")
	}

	if (doTime) console.time("compile all")

	let wasError = false
	compile.dirToDir("./src/std-ms", "./src/std-js")
	.catch(function(e) {
		wasError = true
		if (e instanceof check.CompileError && !global.DEBUG)
			console.warn(e.message)
		else
			throw e
	})
	.then(function() {
		if (doTime) console.timeEnd("compile all")
		if (!wasError && !goodStacktrace)
			runIt()
	})
	.done()

	if (goodStacktrace)
		// Better hope it takes less than 10 seconds to compile. (Takes 2 on my machine.)
		setTimeout(runIt, 10000)
}
