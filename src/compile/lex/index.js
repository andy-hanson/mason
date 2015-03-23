import Opts from "../Opts"
import type from "../U/type"
import group from "./group"
import Stream from "./Stream"
import ungrouped from "./ungrouped"

module.exports = function lex(str, opts) {
	type(str, String, opts, Opts)
	// Lexing algorithm requires trailing newline
	str = str + "\n"
	return group(ungrouped(opts, new Stream(str), false), opts)
}
