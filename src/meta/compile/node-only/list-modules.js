import { singleCharLoc, StartPos } from 'esast/dist/Loc'
import fs from 'q-io/fs'
import { relative } from 'path'
import { ListSimple, Module, Quote } from '../Expression'
import Cx from '../private/Cx'
import { OptsFromObject } from '../private/Opts'
import transpile from '../private/transpile/transpile'
import render from '../private/render'
import { flatMap } from '../private/U/Bag'
import { some } from '../private/U/Op'
import Vr from '../private/Vr'

// Searches a directory and creates a module whose default export is
// a list of the paths of every module in that directory, relative to it.
export default (dirPath, opts) =>
	fs.listTree(dirPath).then(files => {
		const ext = '.js'
		const moduleFiles = flatMap(files, f => {
			if (!f.endsWith(ext))
				return []
			if (opts.exclude && opts.exclude.test(f))
				return []
			const noExt = f.slice(0, f.length - ext.length)
			return [ `./${relative(dirPath, noExt)}` ]
		}).sort()
		// Dummy Loc. We will not use source maps.
		const loc = singleCharLoc(StartPos)
		const val = ListSimple(loc, moduleFiles.map(f => Quote.forString(loc, f)))
		const e = Module(loc, [], [], [], [], [], some(val))
		const cx = new Cx(OptsFromObject({
			includeSourceMap: false,
			includeModuleDisplayName: false
		}))
		const ast = transpile(cx, e, new Vr())
		return render(cx, ast)
	})
