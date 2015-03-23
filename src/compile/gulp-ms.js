import { PluginError, replaceExtension } from 'gulp-util'
import { obj } from 'through2'
import applySourceMap from 'vinyl-sourcemaps-apply'
import compile from "./index"

const Name = 'gulp-ms'

export default function gulpMs() {
	return obj((file, enc, cb) => {
		if (file.isNull())
			cb(null, file)
		else if (file.isStream())
			cb(new PluginError(Name, 'Streaming not supported'))
		else {
			const src = file.contents.toString('utf8')
			const outFile = replaceExtension(file.path, '.js')
			const opts = {
				inFile: file.path,
				checks: true
			}
			try {
				const data = compile(src, opts)
				applySourceMap(file, data.sourceMap)
				file.contents = new Buffer(data.js)
				file.path = outFile
				cb(null, file)
			} catch (err) {
				cb(new PluginError(Name, err))
			}
		}
	})
}
