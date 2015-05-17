import CompileError from './CompileError'
import CompileContext from './private/CompileContext'
import CompileOptions from './private/CompileOptions'
import lexUngrouped from './private/lex/ungrouped'
import lexGroup from './private/lex/group'
import parse from './private/parse/parse'
import render from './private/render'
import transpile from './private/transpile/transpile'
import { type } from './private/util'
import verify from './private/verify'

// See private/Opts.js for description of opts
export default function compile(source, opts) {
	type(source, String)
	const cx = new CompileContext(new CompileOptions(opts))
	try {
		const e = parse(cx, lexGroup(cx, lexUngrouped(cx, source)))
		const vr = verify(cx, e)
		const ast = transpile(cx, e, vr)
		let result
		if (cx.opts.includeSourceMap()) {
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
