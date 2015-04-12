if (typeof define !== 'function') var define = require('amdefine')(module);define(["exports", "module", "gulp-util", "through2", "vinyl-sourcemaps-apply", "../compile", "../CompileError", "../private/manglePath", "./formatCompileErrorForConsole"], function (exports, module, _gulpUtil, _through2, _vinylSourcemapsApply, _compile, _CompileError, _privateManglePath, _formatCompileErrorForConsole) {
	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	module.exports = gulpMs;
	var PluginError = _gulpUtil.PluginError;
	var replaceExtension = _gulpUtil.replaceExtension;
	var obj = _through2.obj;

	var applySourceMap = _interopRequire(_vinylSourcemapsApply);

	var compile = _interopRequire(_compile);

	var CompileError = _interopRequire(_CompileError);

	var manglePath = _interopRequire(_privateManglePath);

	var formatCompileErrorForConsole = _interopRequire(_formatCompileErrorForConsole);

	var formatWarningForConsole = _formatCompileErrorForConsole.formatWarningForConsole;

	const Name = "gulp-mason";

	function gulpMs(opts) {
		opts = opts || {};
		return obj(function (file, enc, cb) {
			if (opts.verbose) console.log("Compiling " + file.path);
			if (file.isNull()) cb(null, file);else if (file.isStream()) {
				this.emit("error", new PluginError(Name, "Streaming not supported"));
				return cb();
			} else {
				const src = file.contents.toString("utf8");
				const outFile = manglePath(replaceExtension(file.path, ".js"));
				if (Object.prototype.hasOwnProperty.call(opts, "inFile")) {
					console.log(opts);
					throw new Error("inFile set by stream");
				}
				const allOpts = Object.assign({}, opts, { inFile: file.path });

				var _compile = compile(src, allOpts);

				const warnings = _compile.warnings;
				const result = _compile.result;

				warnings.forEach(function (w) {
					return console.log(formatWarningForConsole(w, file.path));
				});
				if (result instanceof CompileError) {
					const message = formatCompileErrorForConsole(result, file.path);
					// Not cb(new PluginError(...)).
					// See https://github.com/gulpjs/gulp/issues/71#issuecomment-53942279
					this.emit("error", new PluginError(Name, message));
					return cb();
				} else {
					const code = result.code;
					const sourceMap = result.sourceMap;

					applySourceMap(file, sourceMap);
					file.contents = new Buffer(code);
					file.path = outFile;
					cb(null, file);
				}
			}
		});
	}
});
//# sourceMappingURL=../../../meta/compile/node-only/gulp-mason.js.map