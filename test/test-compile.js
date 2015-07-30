// Code for `gulp test-compile` and `gulp perf-test-compile`

import { Suite } from 'benchmark'
import { Node } from 'esast/dist/ast'
import fs from 'fs'
import numeral from 'numeral'
import compile from '../dist/meta/compile/compile'
import CompileError from '../dist/meta/compile/CompileError'
import MsAst from '../dist/meta/compile/MsAst'
import CompileContext from '../dist/meta/compile/private/CompileContext'
import CompileOptions from '../dist/meta/compile/private/CompileOptions'
import lex from '../dist/meta/compile/private/lex'
import parse from '../dist/meta/compile/private/parse/parse'
import render from '../dist/meta/compile/private/render'
import transpile from '../dist/meta/compile/private/transpile/transpile'
import verify from '../dist/meta/compile/private/verify'
import formatCompileErrorForConsole from
	'../dist/meta/compile/node-only/formatCompileErrorForConsole'

export const
	test = () => doTest(false),
	perfTest = () => doTest(true)

const doTest = isPerfTest => {
	const source = fs.readFileSync('test/test-compile.ms', 'utf-8')
	const opts = {
		inFile: './test-compile.ms',
		includeAmdefine: false,
		includeSourceMap: true,
		includeModuleName: false,
		forceNonLazyModule: true,
		useStrict: false
	}
	const context = new CompileContext(new CompileOptions(opts))

	try {
		const rootToken = lex(context, source)
		// console.log(`==>\n${rootToken}`)
		const msAst = parse(context, rootToken)
		// console.log(`==>\n${msAst}`)
		const verifyResults = verify(context, msAst)
		// console.log(`+++\n${verifyResults.___}`)
		const esAst = transpile(context, msAst, verifyResults)
		// console.log(`==>\n${esAst}`)
		const { code } = render(context, esAst)

		for (const _ of context.warnings)
			console.log(_)

		if (isPerfTest)
			benchmark({
				lex() { lex(context, source) },
				parse() { parse(context, rootToken) },
				verify() { verify(context, msAst) },
				transpile() { transpile(context, msAst, verifyResults) },
				render() { render(context, esAst) },
				all() { compile(source, opts) }
			})
		else {
			console.log(`Expression tree size: ${treeSize(msAst, _ => _ instanceof MsAst).size}.`)
			console.log(`ES AST size: ${treeSize(esAst, _ => _ instanceof Node).size}.`)
			console.log(`Output size: ${code.length} characters.`)
			console.log(`==>\n${code}`)
		}
	} catch (error) {
		if (error instanceof CompileError)
			console.log(formatCompileErrorForConsole(error))
		throw error
	}
}

const
	benchmark = tests => {
		const suite = new Suite()
		for (const name in tests)
			suite.add(name, tests[name])
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
					for (const name in node) {
						const child = node[name]
						if (child instanceof Array)
							child.forEach(visit)
						else
							visit(child)
					}
				} else
					nLeaves = nLeaves + 1
		}
		visit(tree)
		return { size: visited.size, nLeaves }
	}
