import "es6-shim"
import fs from "fs"
import lex from "./lex"
import parse from "./parse"
import render from "./render"
import verify from "./verify"
import { log } from "./U"
import Opts from "./Opts"

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
		checks: true
	})

	const t = time(lex, source, opts)
	// log("==>\n" + t)
	const e = time(parse, t, opts)
	// log("==>\n" + e)
	const vr = verify(e, opts)
	// log("+++\n" + vr)
	const j = time(render, e, opts, vr)
	log("==>\n" + j)
}
