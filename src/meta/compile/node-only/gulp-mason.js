import { PluginError, replaceExtension } from 'gulp-util'
import { obj } from 'through2'
import applySourceMap from 'vinyl-sourcemaps-apply'
import compile from '../compile'
import CompileError from '../CompileError'
import manglePath from '../private/manglePath'
import formatCompileErrorForConsole, { formatWarningForConsole }
	from './formatCompileErrorForConsole'

const Name = 'gulp-mason'

export default function gulpMs(opts) {
	opts = opts || { }
	return obj(function(file, enc, cb) {
		if (opts.verbose)
			console.log(`Compiling ${file.path}`)
		if (file.isNull())
			cb(null, file)
		else if (file.isStream()) {
			this.emit('error', new PluginError(Name, 'Streaming not supported'))
			return cb()
		}
		else {
			const src = file.contents.toString('utf8')
			const outFile = manglePath(replaceExtension(file.path, '.js'))
			if (Object.prototype.hasOwnProperty.call(opts, 'inFile'))
				throw new Error('inFile set by stream')
			const allOpts = Object.assign({}, opts, { inFile: file.path })
			const { warnings, result } = compile(src, allOpts)

			warnings.forEach(w => console.log(formatWarningForConsole(w, file.path)))
			if (result instanceof CompileError) {
				const message = formatCompileErrorForConsole(result, file.path)
				// Not cb(new PluginError(...)).
				// See https://github.com/gulpjs/gulp/issues/71#issuecomment-53942279
				this.emit('error', new PluginError(Name, message))
				return cb()
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
