import { generate } from 'escodegen'
import fs from 'q-io/fs'
import { basename, relative } from 'path'
import { BlockDo, Call, ELiteral, ListSimple, Module,
	ModuleDefaultExport, UseDo } from './Expression'
import Cx from './private/Cx'
import Opts from './private/Opts'
import Span, { single, StartPos } from './private/Span'
import transpile from './private/transpile/transpile'
import { emptyVr } from './private/Vr'

const name = 'modules-list'

// Searches a directory and creates a module
// whose default export is the path of every module in that directory.
// TODO:USE* Don't use UseDo, use Use*.
export default dirPath =>
	fs.listTree(dirPath).then(files => {
		const ext = '.js'
		const jsFiles = files.filter(f => f.endsWith(ext)
			// TODO: This is kind of kludge-y...
			&& basename(f) !== `${name}.js`)
		const relativeFiles = jsFiles.map(f => {
			const noExt = f.slice(0, f.length - ext.length)
			return `./${relative(dirPath, noExt)}`
		})
		// Sort so that module loading is deterministic.
		const sortedFiles = relativeFiles.sort()
		const span = single(StartPos)
		const uses = sortedFiles.map(f => UseDo(span, f))
		const Req = ELiteral(span, 'require', 'js')
		// TODO:USE* Get rid of this.
		const MsGetModule = ELiteral(span, 'msGetModule', 'js')
		const modules = sortedFiles.map(f =>
			Call(span, MsGetModule, [ Call(span, Req, [ ELiteral(span, f, String) ]) ]))
		const e = Module(span, uses, [], [],
			BlockDo(span, [
				ModuleDefaultExport(span,
					ListSimple(span, modules))]))
		const opts = Opts({ inFile: `${name}.ms`, checks: true })
		const cx = new Cx(opts)
		const ast = transpile(cx, e, emptyVr())
		return generate(ast)
	})
