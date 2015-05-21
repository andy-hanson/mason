import { Suite } from 'benchmark'
import { Node } from 'esast/dist/ast'
import fs from 'fs'
import numeral from 'numeral'
import compile from '../compile'
import CompileError from '../CompileError'
import MsAst from '../MsAst'
import CompileContext from '../private/CompileContext'
import CompileOptions from '../private/CompileOptions'
import lex from '../private/lex'
import parse from '../private/parse/parse'
import render from '../private/render'
import transpile from '../private/transpile/transpile'
import verify from '../private/verify'
import formatCompileErrorForConsole from './formatCompileErrorForConsole'

export const
	test = () => doTest(false),
	perfTest = () => doTest(true)

const doTest = isPerfTest => {
	const source = fs.readFileSync('./ms-test.ms', 'utf-8')
	const opts = {
		inFile: './ms-test.ms',
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

		context.warnings.forEach(w => console.log(w))

		if (isPerfTest)
			benchmark({
				lex: () => lex(context, source),
				parse: () => parse(context, rootToken),
				verify: () => verify(context, msAst),
				transpile: () => transpile(context, msAst, verifyResults),
				render: () => render(context, esAst),
				all: () => compile(source, opts)
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
