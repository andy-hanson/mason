"use strict"

require("es6-shim")

const
	compile = require(".."),
	io = require("../U/io")

if (require.main === module)
	io.watchAndProcessDir({
		inDir: "./src",
		outDir: "./js",
		processor: compile.processFile,
		verbose: true
	})
