"use strict";

const
	chalk = require("chalk"),
	Opts = require("./Opts"),
	Lang = require("./Lang"),
	lex = require("./lex"),
	parse = require("./parse"),
	path = require("path"),
	render = require("./render"),
	type = require("./U/type"),
	verify = require("./verify")

// Speed boost by turning this off
global.DEBUG = true

const compile = function(src, opts) {
	type(src, String, opts, Opts)
	const e = parse(lex(src, opts), opts)
	const vr = verify(e, opts)
	const _$ = render(e, opts, vr).toStringWithSourceMap({ file: opts.jsBaseName() })
	const code = _$.code, map = _$.map
	type(code, String, map, require("source-map").SourceMapGenerator)
	return [
		{
			name: opts.jsBaseName(),
			content: code
		},
		{
			name: opts.sourceMapPathRelToJs(),
			content: map.toString()
		}
	]
}

const isMason = function(p) { return path.extname(p) === Lang.fileExtension; }
const isJs = function(p) { return path.extname(p) === ".js" }
const isMasonOrJs = function(p) { return isMason(p) || isJs(p) }

const processFile = function(inFile, inContent, outDir) {
	if (isMason(inFile)) {
		const opts = Opts({ inFile: inFile, outDir: outDir })
		try {
			return compile(inContent, opts)
		}
		catch (e) {
			const prepend = chalk.green(inFile + " ")
			e.stack = prepend + e.stack
			e.message = prepend + e.message
			throw e
		}
	}
	else if (isJs(inFile))
		return [ {
			name: path.basename(inFile),
			content: inContent
		} ]
	else
		return [ ]
}

module.exports = {
	processFile: processFile
}
