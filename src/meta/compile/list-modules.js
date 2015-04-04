import fs from 'q-io/fs'
import { relative } from 'path'
import { BlockDo, ELiteral, ListSimple, Module, ModuleDefaultExport } from './Expression'
import Cx from './private/Cx'
import Opts from './private/Opts'
import { single, StartPos } from './private/Span'
import transpile from './private/transpile/transpile'
import render from './private/render'
import { emptyVr } from './private/Vr'

// Searches a directory and creates a module whose default export is
// a list of the paths of every module in that directory, relative to it.
export default dirPath =>
	fs.listTree(dirPath).then(files => {
		const ext = '.js'
		const jsFiles = files.filter(f => f.endsWith(ext))
		const relativeFiles = jsFiles.map(f => {
			const noExt = f.slice(0, f.length - ext.length)
			return `./${relative(dirPath, noExt)}`
		})
		const sortedFiles = relativeFiles.sort()
		// Dummy span. We will not use source maps.
		const span = single(StartPos)
		const val = ListSimple(span, sortedFiles.map(f => ELiteral(span, f, String)))
		const e = Module(span, [], [], [], BlockDo(span, [ ModuleDefaultExport(span, val) ]))
		const cx = new Cx(Opts({ inFile: 'modules-list.ms', checks: true }))
		const ast = transpile(cx, e, emptyVr())
		return render(cx, ast).code
	})
