import assert from 'assert'
import fs from 'fs'
import Cx from './Cx'
import Expression from './Expression'
import lex from './lex'
import parse from './parse'
import render from './render'
import transpile from './transpile'
import verify from './verify'
import { log } from './U'
import Opts from './Opts'

module.exports = () => {
	global.DEBUG = true
	global.LOG_TIME = true

	function time(fun) {
		if (global.LOG_TIME)
			console.time(fun.name)
		const res = fun.apply(null, Array.prototype.slice.call(arguments, 1))
		if (global.LOG_TIME)
			console.timeEnd(fun.name)
		return res
	}

	const source = fs.readFileSync('./ms-test.ms', 'utf-8')
	const opts = Opts({
		inFile: './ms-test.ms',
		checks: true
	})
	const cx = new Cx(opts)

	console.time('all')
	const t = time(lex, cx, source)
	// log(`==>\n${t}`)
	const e = time(parse, cx, t)
	// log(`==>\n${e}`)
	const vr = time(verify, cx, e)
	// log(`+++\n${vr})
	const ast = time(transpile, cx, e, vr)
	// log(`==>\n${ast}`)
	const { code, map } = time(render, cx, ast)
	time(function renderSourceMap(_) { return _.toString() }, map)
	console.timeEnd('all')
	log(`Expression tree size: ${treeSize(e, _ => _ instanceof Expression)}`)
	log(`ES AST size: ${treeSize(ast, _ => _.type !== undefined)}`)
	log(`==>\n${code}`)
}

const treeSize = (tree, cond) => {
	const visited = new Set()
	const visit = node => {
		if (node != null && !visited.has(node) && cond(node)) {
			visited.add(node)
			Object.getOwnPropertyNames(node).forEach(name => {
				const child = node[name]
				if (child instanceof Array)
					child.forEach(visit)
				else
					visit(child)
			})
		}
	}
	visit(tree)
	return visited.size
}
