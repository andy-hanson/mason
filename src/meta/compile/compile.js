import CompileError from './CompileError'
import Cx from './private/Cx'
import lex from './private/lex/lex'
import parse from './private/parse/parse'
import { OptsFromObject } from './private/Opts'
import render from './private/render'
import transpile from './private/transpile/transpile'
import type from './private/U/type'
import verify from './private/verify'

// Speed boost by turning this off
global.DEBUG = true

// See private/Opts.js for description of opts
export default function compile(source, opts) {
	type(source, String, opts, Object)
	const cx = new Cx(OptsFromObject(opts))
	try {
		const e = parse(cx, lex(cx, source))
		const vr = verify(cx, e)
		const ast = transpile(cx, e, vr)
		let result
		if (cx.opts.sourceMap()) {
			const { code, map } = render(cx, ast)
			result = { code, sourceMap: map.toJSON() }
		} else
			result = render(cx, ast)
		return { warnings: cx.warnings, result }
	} catch (error) {
		if (error instanceof CompileError)
			return { warnings: cx.warnings, result: error }
		else
			throw error
	}
}
