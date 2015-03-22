const
	gutil = require('gulp-util'),
		PluginError = gutil.PluginError,
	through = require('through2'),
	applySourceMap = require('vinyl-sourcemaps-apply')
const
	compile = require("./index")

const Name = 'gulp-ms'

module.exports = gulpMs
function gulpMs() {
	return through.obj(function(file, enc, cb) {
		if (file.isNull())
			cb(null, file)
		else if (file.isStream())
			cb(new PluginError(Name, 'Streaming not supported'))
		else {
			const src = file.contents.toString('utf8')
			const outFile = gutil.replaceExtension(file.path, '.js')

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
