"use strict";

const
	assert = require("assert"),
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
	const t = lex(src, opts)
	const e = parse(t, opts)
	const vr = verify(e, opts)
	const j = render(e, opts, vr)
	const cm = j.toStringWithSourceMap({ file: opts.jsBaseName })
	const code = cm.code
	const map = cm.map
	type(code, String, map, require("source-map").SourceMapGenerator,
		opts.jsBaseName, String, opts.sourceMapPathRelToJs, String)
	return [
		{
			name: opts.jsBaseName,
			content: code
		},
		{
			name: opts.sourceMapPathRelToJs,
			content: map.toString()
		}
	]
}

const isMason = function(p) { return path.extname(p) === Lang.fileExtension; }
const isJs = function(p) { return path.extname(p) === ".js" }
const isMasonOrJs = function(p) { return isMason(p) || isJs(p) }

const processFile = function(inPath, inContent, outPath) {
	if (isMason(inPath)) {
		const jsBaseName = path.basename(inPath, Lang.fileExtension) + ".js";
		const opts = Opts({
			jsBaseName: jsBaseName,
			sourceMapPathRelToJs: jsBaseName + ".map", // TODO: Make this method, not property
			msPathRelToJs: path.relative(outPath, inPath)
		})
		try {
			return compile(inContent, opts)
		}
		catch (e) {
			const prepend = chalk.green(inPath + " ")
			e.stack = prepend + e.stack
			e.message = prepend + e.message
			throw e
		}
	}
	else if (isJs(inPath))
		return [ {
			name: path.basename(inPath),
			content: inContent
		} ]
	else
		return [ ]
}

module.exports = {
	processFile: processFile
}
