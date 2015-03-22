require("es6-shim")
require("source-map-support").install()
import Opts from "./Opts"
import type from "./U/type"
const
	lex = require("./lex"),
	parse = require("./parse"),
	render = require("./render"),
	verify = require("./verify")

// Speed boost by turning this off
global.DEBUG = true

export default function compile(src, opts) {
	type(src, String, opts, Object)
	opts = Opts(opts)

	const e = parse(lex(src, opts), opts)
	const vr = verify(e, opts)
	const _ = render(e, opts, vr).toStringWithSourceMap({ file: opts.jsBaseName() })
	const code = _.code, map = _.map
	type(code, String, map, require("source-map").SourceMapGenerator)
	// TODO: There must be a better way of doing this...
	const sourceMap = JSON.parse(map.toString())
	return { js: code, sourceMap: sourceMap }
}
