"use strict"

const
	group = require("./group"),
	ungrouped = require("./ungrouped"),
	Opts = require("../Opts"),
	Stream = require("./Stream"),
	type = require("../U/type")

module.exports = function lex(str, opts) {
	type(str, String, opts, Opts)
	str = str + "\n" // Lexing algorithm requires trailing newline
	return group(ungrouped(new Stream(str), false), opts)
}
