"use strict"

require("es6-shim")
const
	fs = require("fs"),
	lex = require("../lex"),
	Opts = require("../Opts"),
	parse = require("../parse"),
	render = require("../render"),
	U = require("../U"),
	verify = require("../verify")

global.DEBUG = true

if (require.main === module) {
	const doTime = false

	const time = function(f) {
		if (doTime)
			console.time(f.name)
		const res = f.apply(null, Array.prototype.slice.call(arguments, 1))
		if (doTime)
			console.timeEnd(f.name)
		return res
	}

	const source = fs.readFileSync("./ms-test.ms", "utf-8")
	const opts = Opts({
		inFile: "./ms-test.ms",
		outDir: "fake-out",
		checks: false
	})

	const t = time(lex, source, opts)
	// U.log("==>\n" + t)
	const e = time(parse, t, opts)
	// U.log("==>\n" + e)
	const vr = verify(e, opts)
	// U.log("+++\n" + vr)
	const j = time(render, e, opts, vr)
	U.log("==>\n" + j)
}