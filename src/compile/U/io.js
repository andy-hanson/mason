"use strict"

const
	chalk = require("chalk"),
	fs = require("q-io/fs"),
	path = require("path"),
	type = require("./type"),
	Q = require("q"),
	Sq = require("./Sq"),
	watch = require("watch")

const removeTreeIfExists = function(path) {
	return fs.exists(path).then(function(exists) {
		if (exists)
			return fs.removeTree(path)
	})
}

const corresponding = function(inDir, outDir, inFile) {
	return path.join(outDir, path.relative(inDir, inFile))
}

const processSingle = function(inDir, outDir, processor, inFile, log) {
	return fs.read(inFile).then(function(inContent) {
		const inSubDir = path.dirname(inFile)
		const outSubDir = corresponding(inDir, outDir, inSubDir)
		const outs = processor(inFile, inContent, outSubDir)
		type(outs, Array)
		if (!Sq.isEmpty(outs))
			log("Compiling " + chalk.green(inFile))
		return Q.all(outs.map(function(outSingle) {
			type(outSingle.name, String, outSingle.content, String)
			const outPath = path.join(outSubDir, outSingle.name)
			log("Writing to " + outPath)
			return fs.makeTree(path.dirname(outPath))
			.then(function() { return fs.write(outPath, outSingle.content) })
		}))
	})
}

const logger = function(opts) {
	return opts.verbose ? console.log : function() { }
}

// Returns a promise
const processDir = function(opts) {
	const inDir = opts.inDir, outDir = opts.outDir, processor = opts.processor
	const log = logger(opts)
	type(inDir, String, outDir, String, processor, Function)

	return removeTreeIfExists(outDir)
	.then(function() { return fs.listTree(inDir) })
	.then(function(inFiles) {
		return Q.all(inFiles.map(function(inFile) {
			return fs.stat(inFile).then(function(stats) {
				if (stats.isFile())
					return processSingle(inDir, outDir, processor, inFile, log)
			})
		}))
	})
}

// Returns nothing and prevents node.js from ever finishing.
const watchAndProcessDir = function(opts) {
	const inDir = opts.inDir, outDir = opts.outDir, processor = opts.processor
	const log = logger(opts)
	type(inDir, String, outDir, String, processor, Function)

	watch.createMonitor("./src", { interval: 500 }, function(monitor) {
		const compileAndWrite = function(inFile, stats) {
			if (stats.isFile())
				processSingle(inDir, outDir, processor, inFile, log).done()
			else if (stats.isDirectory()) {
				// TODO:PERF
				log("Compiling all")
				processDir(inDir, outDir, processor).done()
			}
		}

		monitor.on("created", compileAndWrite)

		monitor.on("changed", function(inFile, curStats, prevStats) {
			if (curStats.isFile() && prevStats.isFile())
				compileAndWrite(inFile, curStats)
			else {
				log("Unusual stat change of " + chalk.green(inFile))
				// console.log("from:")
				// console.log("%j", prevStats)
				// console.log("to:")
				// console.log("%j", curStats)
				log("Compiling all")
				process(inDir, outDir, processor).done()
			}
		})

		monitor.on("removed", function(inFile, stats) {
			// KLUDGE: Currently stats does not work, so we assume it's a file.
			// if (stats.isFile()) {
			if (true) {
				const inSubDir = path.dirname(inFile)
				const outSubDir = corresponding(inDir, outDir, inSubDir)
				const outs = processor(inFile, "", outSubDir)
				Q.all(outs.map(function(outSingle) {
					const outPath = path.join(outSubDir, outSingle.name)
					log("Deleting " + chalk.green(outPath))
					return fs.remove(outPath)
				}))
				.done()
			}
			else if (stats.isDirectory()) {
				// TODO: PERF
				log("Compiling all")
				process(inDir, outDir, processor).done()
			}
		})
	})
}


module.exports = {
	processDir: processDir,
	watchAndProcessDir: watchAndProcessDir
}
