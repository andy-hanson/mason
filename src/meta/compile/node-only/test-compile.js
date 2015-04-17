import { Suite } from 'benchmark'
import { Node } from 'esast/dist/ast'
import fs from 'fs'
import numeral from 'numeral'
import Expression from '../Expression'
import Cx, { SubContext } from '../private/Cx'
import lex from '../private/lex/lex'
import lexUngrouped from '../private/lex/ungrouped'
import lexGroup from '../private/lex/group'
import Stream from '../private/lex/Stream'
import parse from '../private/parse/parse'
import render from '../private/render'
import transpile from '../private/transpile/transpile'
import verify from '../private/verify/verify'
import { log } from '../private/U/util'
import { OptsFromObject } from '../private/Opts'


const eager = gen => {
	const arr = []
	for (let em of gen)
		arr.push(em)
	return arr
}

const test = tests => {
	const suite = new Suite()
	Object.keys(tests).forEach(name =>
		suite.add(name, tests[name]))
	suite.on('complete', function() {
		this.forEach(_ => {
			const ms = numeral(_.stats.mean * 1000).format('0.00')
			console.log(`${_.name}: ${ms}ms mean, ${_.hz}Hz`)
		})
	})
	suite.on('error', err => {
		throw err.target.error
	})
	suite.run()
}

export default () => {
	global.DEBUG = true

	const source = fs.readFileSync('./ms-test.ms', 'utf-8')
	const opts = OptsFromObject({
		inFile: './ms-test.ms'
	})
	const cx = new Cx(opts)

	const t = lex(cx, source)
	// log(`==>\n${t}`)
	const e = parse(cx, t)
	// log(`==>\n${e}`)
	const vr = verify(cx, e)
	// log(`+++\n${vr})
	const ast = transpile(cx, e, vr)
	// log(`==>\n${ast}`)
	const { code } = render(cx, ast)

	const tUngroupedEager =
		eager(lexUngrouped(new SubContext(cx), new Stream(source), false))

	// Benchmark has problems if I don't put these in global variables...
	global.lexUngroupedTest = () =>
		eager(lexUngrouped(new SubContext(cx), new Stream(source), false))
	global.lexGroupTest = () =>
		lexGroup(new SubContext(cx), tUngroupedEager[Symbol.iterator]())

	test({
		lexUngrouped: () => global.lexUngroupedTest(),
		lexGroup: () => global.lexGroupTest(),
		'lex (all)': () => lex(cx, source),
		parse: () => parse(cx, t),
		verify: () => verify(cx, e),
		transpile: () => transpile(cx, e, vr),
		render: () => render(cx, ast)
	})

	const
		eSize = treeSize(e, _ => _ instanceof Expression),
		astSize = treeSize(ast, _ => _ instanceof Node)
	log(`Expression tree size: ${eSize.size}.`)
	log(`ES AST size: ${astSize.size}, nLeaves: ${astSize.nLeaves}.`)
	log(`Output size: ${code.length} characters.`)
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
