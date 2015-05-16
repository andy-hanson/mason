import { singleCharLoc, StartPos } from 'esast/dist/Loc'
import fs from 'q-io/fs'
import { relative } from 'path'
import { BagSimple, Module, Quote } from '../Expression'
import Cx from '../private/Cx'
import { OptsFromObject } from '../private/Opts'
import transpile from '../private/transpile/transpile'
import render from '../private/render'
import { flatOpMap, opIf } from '../private/U/op'
import VerifyResults from '../private/VerifyResults'

// Searches a directory and creates a module whose default export is
// a list of the paths of every module in that directory, relative to it.
export default (dirPath, opts) =>
	fs.listTree(dirPath).then(files => {
		const ext = '.js'
		const moduleFiles = flatOpMap(files, _ =>
			opIf(_.endsWith(ext) && !(opts.exclude && opts.exclude.test(_)), () =>
				`./${relative(dirPath, _.slice(0, _.length - ext.length))}`))
		// Dummy Loc. We will not use source maps.
		const loc = singleCharLoc(StartPos)
		// Sort to keep it deterministic.
		const modulesBag = BagSimple(loc, moduleFiles.sort().map(_ => Quote.forString(loc, _)))
		const module = Module(loc, [ ], [ ], [ ], [ ], [ ], modulesBag)
		const cx = new Cx(OptsFromObject({
			includeSourceMap: false,
			includeModuleName: false
		}))
		return render(cx, transpile(cx, module, new VerifyResults()))
	})
