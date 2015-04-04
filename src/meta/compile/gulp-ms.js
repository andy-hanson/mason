import { PluginError, replaceExtension } from 'gulp-util'
import { obj } from 'through2'
import applySourceMap from 'vinyl-sourcemaps-apply'
import compile from './compile'
import CompileError from './CompileError'
import formatCompileErrorForConsole, { formatWarningForConsole }
	from './formatCompileErrorForConsole'
import manglePath from './private/manglePath'

const Name = 'gulp-ms'

export default function gulpMs(opts) {
	opts = opts || { }
	// TODO: Move to Opts.js
	if (opts.checks === undefined)
		opts.checks = true

	return obj((file, enc, cb) => {
		if (opts.verbose)
			console.log(`Compiling ${file.path}`)
		if (file.isNull())
			cb(null, file)
		else if (file.isStream())
			cb(new PluginError(Name, 'Streaming not supported'))
		else {
			const src = file.contents.toString('utf8')
			const outFile = manglePath(replaceExtension(file.path, '.js'))
			const { warnings, result } = compile(src, file.path, opts)
			warnings.forEach(w => console.log(formatWarningForConsole(w, file.path)))
			if (result instanceof CompileError) {
				console.log(formatCompileErrorForConsole(result, file.path))
				cb(new PluginError(Name, result.message))
			} else {
				const { code, sourceMap } = result
				applySourceMap(file, sourceMap)
				file.contents = new Buffer(code)
				file.path = outFile
				cb(null, file)
			}
		}
	})
}
