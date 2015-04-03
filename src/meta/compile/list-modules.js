import { generate } from 'escodegen'
import fs from 'q-io/fs'
import { basename, relative } from 'path'
import Cx from './Cx'
import { BlockDo, Call, ELiteral, ListSimple, Module,
	ModuleDefaultExport, UseDo } from './Expression'
import Opts from './Opts'
import Span, { single, StartPos } from './Span'
import transpile from './transpile'
import { emptyVr } from './Vr'

const name = 'modules-list'

// Searches a directory and creates a module
// whose default export is the path of every module in that directory.
// TODO:USE* Don't use UseDo, use Use*.
export default dirPath =>
	fs.listTree(dirPath).then(files => {
		// TODO: This is kind of kludge-y...
		const jsFiles = files.filter(f => f.endsWith('.js') && basename(f) !== `${name}.js`)
		const relativeFiles = jsFiles.map(f => `./${relative(dirPath, f)}`)
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
