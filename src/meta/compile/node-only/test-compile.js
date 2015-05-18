import { Suite } from 'benchmark'
import { Node } from 'esast/dist/ast'
import fs from 'fs'
import numeral from 'numeral'
import compile from '../compile'
import CompileError from '../CompileError'
import Expression from '../Expression'
import CompileContext from '../private/CompileContext'
import CompileOptions from '../private/CompileOptions'
import lexUngrouped from '../private/lex/ungrouped'
import lexGroup from '../private/lex/group'
import parse from '../private/parse/parse'
import render from '../private/render'
import transpile from '../private/transpile/transpile'
import verify from '../private/verify'
import formatCompileErrorForConsole from './formatCompileErrorForConsole'

export const
	test = () => doTest(false),
	perfTest = () => doTest(true)

const doTest = includePerfTest => {
	const source = fs.readFileSync('./ms-test.ms', 'utf-8')
	const opts = {
		inFile: './ms-test.ms',
		includeAmdefine: false,
		includeSourceMap: true,
		includeModuleName: false,
		forceNonLazyModule: true,
		useStrict: false
	}
	const cx = new CompileContext(new CompileOptions(opts))

	try {
		const ug = lexUngrouped(cx, source)
		// console.log(ug)
		const t = lexGroup(cx, ug)
		// console.log(`==>\n${t}`)
		const e = parse(cx, t)
		// console.log(`==>\n${e}`)
		const vr = verify(cx, e)
		// console.log(`+++\n${vr}`)
		const ast = transpile(cx, e, vr)
		// console.log(`==>\n${ast}`)
		const { code } = render(cx, ast)

		cx.warnings.forEach(w => console.log(w))

		if (includePerfTest) {
			// Benchmark has problems if I don't put these in global variables...
			global.lexUngroupedTest = () =>
				lexUngrouped(cx, source)
			const tUngrouped = global.lexUngroupedTest()
			global.lexGroupTest = () =>
				lexGroup(cx, tUngrouped)

			global.cmp = () =>
				compile(source, opts)
			benchmark({
				lexUngrouped: () => global.lexUngroupedTest(),
				lexGroup: () => global.lexGroupTest(),
				parse: () => parse(cx, t),
				verify: () => verify(cx, e),
				transpile: () => transpile(cx, e, vr),
				render: () => render(cx, ast),
				all: () => global.cmp()
			})
		} else {
			console.log(`Expression tree size: ${treeSize(e, _ => _ instanceof Expression).size}.`)
			console.log(`ES AST size: ${treeSize(ast, _ => _ instanceof Node).size}.`)
			console.log(`Output size: ${code.length} characters.`)
			console.log(`==>\n${code}`)
		}
	} catch (error) {
		if (error instanceof CompileError)
			console.log(formatCompileErrorForConsole(error))
		else
			throw error
	}
}

const
	benchmark = tests => {
		const suite = new Suite()
		Object.keys(tests).forEach(name =>
			suite.add(name, tests[name]))
		suite.on('complete', function() {
			this.forEach(_ => {
				const ms = numeral(_.stats.mean * 1000).format('0.00')
				console.log(`${_.name}: ${ms}ms`)
			})
		})
		suite.on('error', err => {
			throw err.target.error
		})
		suite.run()
	},

	treeSize = (tree, cond) => {
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
