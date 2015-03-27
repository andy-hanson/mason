import 'es6-shim'
import { install } from 'source-map-support'
install()
import fs from 'fs'
import lex from './lex'
import parse from './parse'
import render from './render'
import transpile from './transpile'
import verify from './verify'
import { log } from './U'
import Opts from './Opts'

global.DEBUG = true

if (require.main === module) {
	global.LOG_TIME = true

	function time(f) {
		if (global.LOG_TIME)
			console.time(f.name)
		const res = f.apply(null, Array.prototype.slice.call(arguments, 1))
		if (global.LOG_TIME)
			console.timeEnd(f.name)
		return res
	}

	const source = fs.readFileSync('./ms-test.ms', 'utf-8')
	const opts = Opts({
		inFile: './ms-test.ms',
		checks: true
	})

	console.time('all')
	const t = time(lex, source, opts)
	// log(`==>\n${t}`)
	const e = time(parse, t, opts)
	// log(`==>\n${e}`)
	const vr = time(verify, e, opts)
	// log(`+++\n${vr})
	const ast = time(transpile, e, opts, vr)
	const { code, map } = time(render, ast, opts)
	time(function renderSourceMap(_) { return _.toString() }, map)
	console.timeEnd('all')
	log(`==>\n${code}`)
}
