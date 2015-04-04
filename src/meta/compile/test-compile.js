import fs from 'fs'
import Expression from './Expression'
import { ESNode } from './private/esast'
import Cx from './private/Cx'
import lex from './private/lex/lex'
import parse from './private/parse/parse'
import render from './private/render'
import transpile from './private/transpile/transpile'
import verify from './private/verify/verify'
import { log } from './private/U/util'
import Opts from './private/Opts'

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
	const
		eSize = treeSize(e, _ => _ instanceof Expression),
		astSize = treeSize(ast, _ => _ instanceof ESNode)
	log(`Expression tree size: ${eSize.size}`)
	log(`ES AST size: ${astSize.size}, nLeaves: ${astSize.nLeaves}`)
	log(`==>\n${code}`)
}

const treeSize = (tree, cond) => {
	const visited = new Set()
	let nLeaves = 0
	const visit = node => {
		if (node != null && !visited.has(node))
			if (cond(node)) {
				visited.add(node)
				Object.getOwnPropertyNames(node).forEach(name => {
					const child = node[name]
					if (child instanceof Array)
						child.forEach(visit)
					else
						visit(child)
				})
			} else
				nLeaves = nLeaves + 1
	}
	visit(tree)
	return { size: visited.size, nLeaves }
}
