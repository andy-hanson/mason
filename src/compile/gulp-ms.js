import chalk from "chalk"
import { PluginError, replaceExtension } from 'gulp-util'
import { obj } from 'through2'
import applySourceMap from 'vinyl-sourcemaps-apply'
import compile from "./index"
import { CompileError } from "./check"

const Name = 'gulp-ms'

export default function gulpMs(opts) {
	opts = opts || { }
	// TODO: NEATER
	if (opts.checks === undefined)
		opts.checks = true

	return obj((file, enc, cb) => {
		if (file.isNull())
			cb(null, file)
		else if (file.isStream())
			cb(new PluginError(Name, 'Streaming not supported'))
		else {
			const src = file.contents.toString('utf8')
			const outFile = replaceExtension(file.path, '.js')
			try {
				const data = compile(src, file.path, opts)
				applySourceMap(file, data.sourceMap)
				file.contents = new Buffer(data.js)
				file.path = outFile
				cb(null, file)
			} catch (err) {
				const anno = chalk.magenta("error ") + chalk.green(file.path) + " "
				err.message = anno + err.message
				err.stack = anno + err.stack
				if (err instanceof CompileError) {
					console.log(err.message)
					cb(new PluginError(Name, "Error Mason source."))
				}
				else
					cb(new PluginError(Name, err))
			}
		}
	})
}
