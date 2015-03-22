"use strict";

require("es6-shim")
require("source-map-support").install()
const
	Opts = require("./Opts"),
	lex = require("./lex"),
	parse = require("./parse"),
	render = require("./render"),
	type = require("./U/type"),
	verify = require("./verify")

// Speed boost by turning this off
global.DEBUG = true

module.exports = compile
function compile(src, opts) {
	type(src, String, opts, Object)
	opts = Opts(opts)

	const e = parse(lex(src, opts), opts)
	const vr = verify(e, opts)
	const _$ = render(e, opts, vr).toStringWithSourceMap({ file: opts.jsBaseName() })
	const code = _$.code, map = _$.map
	type(code, String, map, require("source-map").SourceMapGenerator)
	// TODO: There must be a better way of doing this...
	const sourceMap = JSON.parse(map.toString())
	return { js: code, sourceMap: sourceMap }
}
