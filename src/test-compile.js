"use strict"

require("./index")
const
	lex = require("./compile/lex"),
	Opts = require("./compile/Opts"),
	parse = require("./compile/parse"),
	render = require("./compile/render"),
	U = require("./compile/U"),
	verify = require("./compile/verify")

const doTime = false

const time = function(f) {
	if (doTime)
		console.time(f.name)
	const res = f.apply(null, Array.prototype.slice.call(arguments, 1))
	if (doTime)
		console.timeEnd(f.name)
	return res
}

const source = require("fs").readFileSync("ms-test.ms", "utf-8")
const opts = Opts({
	jsBaseName: "<jsBaseName>",
	msPathRelToJs: "<msPathRelToOut>",
	sourceMapPathRelToJs: "<sourceMapPathRelToOut>"
})

const t = time(lex, source, opts)
// U.log("==>\n" + t)
const e = time(parse, t, opts)
//U.log("==>\n" + e)
const vr = verify(e, opts)
//U.log("+++\n" + vr)
const j = time(render, e, opts, vr)
U.log("==>\n" + j)
