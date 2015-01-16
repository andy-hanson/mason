"use strict"

if (require.main !== module)
	return

require("es6-shim")

const
	check = require("../check"),
	compile = require(".."),
	io = require("../U/io"),
	nomnom = require("nomnom")

const all = function(opts) {
	const doTime = false
	if (doTime) console.time("compile all")

	let wasError = false
	io.processDir({
		inDir: "./src",
		outDir: "./js",
		processor: compile.processFile(opts),
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

const flow = function(opts) {
	io.watchAndProcessDir({
		inDir: "./src",
		outDir: "./js",
		processor: compile.processFile(opts),
		verbose: true
	})
}

const checks = function(command) {
	return command.option("checks", {
		abbr: "c",
		flag: true,
		default: true,
		help: "Include in/out/type checks"
	})
}

checks(nomnom.command("all")).callback(all).help("Compile everything!")
checks(nomnom.command("flow")).callback(flow).help("Compile files when they are saved.")

nomnom.parse()
