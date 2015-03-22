import Opts from "../Opts"
import type from "../U/type"
const
	assert = require("assert"),
	T = require("../T"),
	Px = require("./Px"),
	parseBlock = require("./parseBlock")

module.exports = function parse(t, opts) {
	type(t, T.Group, opts, Opts)
	// Lexer always puts the whole file in a block.
	assert(t.k === "->")
	const px = Px({ span: t.span, sqt: t.sqt })
	return parseBlock.parseModule(px, opts.moduleName())
}
