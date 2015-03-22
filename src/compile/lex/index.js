const
	group = require("./group"),
	ungrouped = require("./ungrouped"),
	Opts = require("../Opts"),
	Stream = require("./Stream"),
	type = require("../U/type")

module.exports = function lex(str, opts) {
	type(str, String, opts, Opts)
	// Lexing algorithm requires trailing newline
	str = str + "\n"
	return group(ungrouped(opts, new Stream(str), false), opts)
}
