import CompileError from './CompileError'
import Cx from './private/Cx'
import lexUngrouped from './private/lex/ungrouped'
import lexGroup from './private/lex/group'
import parse from './private/parse/parse'
import { OptsFromObject } from './private/Opts'
import render from './private/render'
import transpile from './private/transpile/transpile'
import { type } from './private/U/util'
import verify from './private/verify'

// See private/Opts.js for description of opts
export default function compile(source, opts = { }) {
	type(source, String, opts, Object)
	const cx = new Cx(OptsFromObject(opts))
	try {
		const e = parse(cx, lexGroup(cx, lexUngrouped(cx, source)))
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
