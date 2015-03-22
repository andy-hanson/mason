const
	assert = require("assert"),
	Opts = require("../Opts"),
	T = require("../T"),
	type = require("../U/type"),
	Px = require("./Px"),
	parseBlock = require("./parseBlock")

module.exports = function parse(t, opts) {
	type(t, T.Group, opts, Opts)
	// Lexer always puts the whole file in a block.
	assert(t.k === "->")
	const px = Px({ span: t.span, sqt: t.sqt })
	return parseBlock.parseModule(px, opts.moduleName())
}
