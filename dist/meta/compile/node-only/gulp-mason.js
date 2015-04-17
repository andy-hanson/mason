if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'gulp-util', 'through2', 'vinyl-sourcemaps-apply', '../compile', '../CompileError', '../private/manglePath', './formatCompileErrorForConsole'], function (exports, module, _gulpUtil, _through2, _vinylSourcemapsApply, _compile2, _CompileError, _privateManglePath, _formatCompileErrorForConsole) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	module.exports = gulpMs;

	var _applySourceMap = _interopRequire(_vinylSourcemapsApply);

	var _compile3 = _interopRequire(_compile2);

	var _CompileError2 = _interopRequire(_CompileError);

	var _manglePath = _interopRequire(_privateManglePath);

	var _formatCompileErrorForConsole2 = _interopRequire(_formatCompileErrorForConsole);

	const Name = 'gulp-mason';

	function gulpMs(opts) {
		opts = opts || {};
		return _through2.obj(function (file, enc, cb) {
			if (opts.verbose) console.log('Compiling ' + file.path);
			if (file.isNull()) cb(null, file);else if (file.isStream()) {
				this.emit('error', new _gulpUtil.PluginError(Name, 'Streaming not supported'));
				return cb();
			} else {
				const src = file.contents.toString('utf8');
				const outFile = _manglePath(_gulpUtil.replaceExtension(file.path, '.js'));
				if (Object.prototype.hasOwnProperty.call(opts, 'inFile')) {
					console.log(opts);
					throw new Error('inFile set by stream');
				}
				const allOpts = Object.assign({}, opts, { inFile: file.path });

				var _compile = _compile3(src, allOpts);

				const warnings = _compile.warnings;
				const result = _compile.result;

				warnings.forEach(function (w) {
					return console.log(_formatCompileErrorForConsole.formatWarningForConsole(w, file.path));
				});
				if (result instanceof _CompileError2) {
					const message = _formatCompileErrorForConsole2(result, file.path);
					// Not cb(new PluginError(...)).
					// See https://github.com/gulpjs/gulp/issues/71#issuecomment-53942279
					this.emit('error', new _gulpUtil.PluginError(Name, message));
					return cb();
				} else {
					const code = result.code;
					const sourceMap = result.sourceMap;

					_applySourceMap(file, sourceMap);
					file.contents = new Buffer(code);
					file.path = outFile;
					cb(null, file);
				}
			}
		});
	}
});
//# sourceMappingURL=../../../meta/compile/node-only/gulp-mason.js.map