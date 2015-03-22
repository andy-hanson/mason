import Opts from "../Opts"
import type from "../U/type"
import Stream from "./Stream"
const
	group = require("./group"),
	ungrouped = require("./ungrouped")

module.exports = function lex(str, opts) {
	type(str, String, opts, Opts)
	// Lexing algorithm requires trailing newline
	str = str + "\n"
	return group(ungrouped(opts, new Stream(str), false), opts)
}
