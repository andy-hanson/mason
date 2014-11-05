"use strict";

const
	chalk = require("chalk"),
	io = require("./U/io"),
	Opts = require("./Opts"),
	Lang = require("./Lang"),
	lex = require("./lex"),
	parse = require("./parse"),
	path = require("path"),
	render = require("./render"),
	type = require("./U/type"),
	verify = require("./verify")

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

// Returns a promise
const dirToDir = function(inDir, outDir) {
	type(inDir, String, outDir, String);
	const isMason = function(p) { return path.extname(p) === Lang.fileExtension; }
	return io.process(inDir, outDir, isMason, function(inPath, inContent, outPath) {
		const jsBaseName = path.basename(inPath, Lang.fileExtension) + ".js";
		try {
			return compile(inContent, Opts({
				jsBaseName: jsBaseName,
				sourceMapPathRelToJs: jsBaseName + ".map",
				msPathRelToJs: path.relative(outPath, inPath)
			}))
		}
		catch (e) {
			const prepend = chalk.green(inPath + " ")
			e.stack = prepend + e.stack
			e.message = prepend + e.message
			throw e
		}
	})
}

module.exports = {
	dirToDir: dirToDir
}
