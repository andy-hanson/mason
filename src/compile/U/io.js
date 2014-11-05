"use strict"

const
	fs = require("q-io/fs"),
	path = require("path"),
	type = require("./type"),
	Q = require("q")

const removeTreeIfExists = function(path) {
	return fs.exists(path).then(function(exists) {
		if (exists)
			return fs.removeTree(path)
	})
}

const corresponding = function(inDir, outDir, inFile) {
	return path.join(outDir, path.relative(inDir, inFile))
}

const process = function(inDir, outDir, fileMatch, processor) {
	return removeTreeIfExists(outDir)
	.then(function() { return fs.listTree(inDir) }).then(function(inFiles) {
		return Q.all(inFiles.map(function(inFile) {
			if (!fileMatch(inFile)) return
			return fs.read(inFile).then(function(inContent) {
				const inSubDir = path.dirname(inFile)
				const outSubDir = corresponding(inDir, outDir, inSubDir)
				const outs = processor(inFile, inContent, outSubDir)
				type(outs, Array)
				return Q.all(outs.map(function(outSingle) {
					const outName = outSingle.name
					const outContent = outSingle.content
					type(outName, String, outContent, String)
					const outPath = path.join(outSubDir, outName)
					return fs.makeTree(path.dirname(outPath))
					.then(function() { return fs.write(outPath, outContent) })
				}))
			})
		}))
	})
}

module.exports = {
	process: process
}
