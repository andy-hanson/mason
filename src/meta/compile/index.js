import CompileError from './CompileError'
import Cx from './Cx'
import lex from './lex'
import parse from './parse'
import Opts from './Opts'
import render from './render'
import transpile from './transpile'
import { pAdd } from './U'
import type from './U/type'
import verify from './verify'

// Speed boost by turning this off
global.DEBUG = true

export default function compile(src, inFilePath, opts) {
	type(src, String, opts, Object)
	opts = new Opts(pAdd(opts, 'inFile', inFilePath))
	const cx = new Cx(opts)
	try {
		const e = parse(cx, lex(cx, src))
		const vr = verify(cx, e)
		const ast = transpile(cx, e, vr)
		const { code, map } = render(cx, ast)
		// TODO: There must be a better way of doing this...
		const sourceMap = JSON.parse(map.toString())
		return { warnings: cx.warnings, result: { code, sourceMap } }
	} catch (error) {
		if (error instanceof CompileError)
			return { warnings: cx.warnings, result: error }
		else
			throw error
	}
}
