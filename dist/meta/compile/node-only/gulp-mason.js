if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'gulp-util', 'through2', 'vinyl-sourcemaps-apply', '../compile', '../CompileError', '../private/manglePath', './formatCompileErrorForConsole'], function (exports, module, _gulpUtil, _through2, _vinylSourcemapsApply, _compile2, _CompileError, _privateManglePath, _formatCompileErrorForConsole) {
	'use strict';

	module.exports = gulpMs;

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	var _applySourceMap = _interopRequire(_vinylSourcemapsApply);

	var _compile3 = _interopRequire(_compile2);

	var _CompileError2 = _interopRequire(_CompileError);

	var _manglePath = _interopRequire(_privateManglePath);

	var _formatCompileErrorForConsole2 = _interopRequire(_formatCompileErrorForConsole);

	const Name = 'gulp-mason';

	function gulpMs(_ref) {
		var _ref2 = _ref;
		let opts = _ref2 === undefined ? {} : _ref2;

		return (0, _through2.obj)(function (file, enc, cb) {
			if (opts.verbose) console.log('Compiling ' + file.path);
			if (file.isNull()) cb(null, file);else if (file.isStream()) {
				this.emit('error', new _gulpUtil.PluginError(Name, 'Streaming not supported'));
				return cb();
			} else {
				const src = file.contents.toString('utf8');
				const outFile = (0, _manglePath)((0, _gulpUtil.replaceExtension)(file.path, '.js'));
				if (Object.prototype.hasOwnProperty.call(opts, 'inFile')) throw new Error('inFile set by stream');
				const allOpts = Object.assign({}, opts, { inFile: file.path });

				var _compile = (0, _compile3)(src, allOpts);

				const warnings = _compile.warnings;
				const result = _compile.result;

				warnings.forEach(function (w) {
					return console.log((0, _formatCompileErrorForConsole.formatWarningForConsole)(w, file.path));
				});
				if (result instanceof _CompileError2) {
					const message = (0, _formatCompileErrorForConsole2)(result, file.path);
					// Not cb(new PluginError(...)).
					// See https://github.com/gulpjs/gulp/issues/71#issuecomment-53942279
					this.emit('error', new _gulpUtil.PluginError(Name, message));
					return cb();
				} else {
					const code = result.code;
					const sourceMap = result.sourceMap;

					(0, _applySourceMap)(file, sourceMap);
					file.contents = new Buffer(code);
					file.path = outFile;
					cb(null, file);
				}
			}
		});
	}
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9ub2RlLW9ubHkvZ3VscC1tYXNvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7a0JBV3dCLE1BQU07Ozs7Ozs7Ozs7Ozs7O0FBRjlCLE9BQU0sSUFBSSxHQUFHLFlBQVksQ0FBQTs7QUFFVixVQUFTLE1BQU0sQ0FBQyxJQUFVLEVBQUU7Y0FBWixJQUFVO01BQVYsSUFBSSx5QkFBRyxFQUFHOztBQUN4QyxTQUFPLGNBWEMsR0FBRyxFQVdBLFVBQVMsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUU7QUFDbEMsT0FBSSxJQUFJLENBQUMsT0FBTyxFQUNmLE9BQU8sQ0FBQyxHQUFHLGdCQUFjLElBQUksQ0FBQyxJQUFJLENBQUcsQ0FBQTtBQUN0QyxPQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFDaEIsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQSxLQUNWLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFO0FBQ3pCLFFBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGNBbEJiLFdBQVcsQ0FrQmtCLElBQUksRUFBRSx5QkFBeUIsQ0FBQyxDQUFDLENBQUE7QUFDcEUsV0FBTyxFQUFFLEVBQUUsQ0FBQTtJQUNYLE1BQ0k7QUFDSixVQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUMxQyxVQUFNLE9BQU8sR0FBRyxpQkFBVyxjQXZCUixnQkFBZ0IsRUF1QlMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFBO0FBQzlELFFBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsRUFDdkQsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO0FBQ3hDLFVBQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTs7bUJBQ2pDLGVBQVEsR0FBRyxFQUFFLE9BQU8sQ0FBQzs7VUFBMUMsUUFBUSxZQUFSLFFBQVE7VUFBRSxNQUFNLFlBQU4sTUFBTTs7QUFFeEIsWUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7WUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLGtDQXZCRSx1QkFBdUIsRUF1QkQsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUFBLENBQUMsQ0FBQTtBQUN6RSxRQUFJLE1BQU0sMEJBQXdCLEVBQUU7QUFDbkMsV0FBTSxPQUFPLEdBQUcsb0NBQTZCLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7OztBQUcvRCxTQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxjQWxDZCxXQUFXLENBa0NtQixJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQTtBQUNsRCxZQUFPLEVBQUUsRUFBRSxDQUFBO0tBQ1gsTUFBTTtXQUNFLElBQUksR0FBZ0IsTUFBTSxDQUExQixJQUFJO1dBQUUsU0FBUyxHQUFLLE1BQU0sQ0FBcEIsU0FBUzs7QUFDdkIsMEJBQWUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFBO0FBQy9CLFNBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDaEMsU0FBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUE7QUFDbkIsT0FBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtLQUNkO0lBQ0Q7R0FDRCxDQUFDLENBQUE7RUFDRiIsImZpbGUiOiJtZXRhL2NvbXBpbGUvbm9kZS1vbmx5L2d1bHAtbWFzb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQbHVnaW5FcnJvciwgcmVwbGFjZUV4dGVuc2lvbiB9IGZyb20gJ2d1bHAtdXRpbCdcbmltcG9ydCB7IG9iaiB9IGZyb20gJ3Rocm91Z2gyJ1xuaW1wb3J0IGFwcGx5U291cmNlTWFwIGZyb20gJ3ZpbnlsLXNvdXJjZW1hcHMtYXBwbHknXG5pbXBvcnQgY29tcGlsZSBmcm9tICcuLi9jb21waWxlJ1xuaW1wb3J0IENvbXBpbGVFcnJvciBmcm9tICcuLi9Db21waWxlRXJyb3InXG5pbXBvcnQgbWFuZ2xlUGF0aCBmcm9tICcuLi9wcml2YXRlL21hbmdsZVBhdGgnXG5pbXBvcnQgZm9ybWF0Q29tcGlsZUVycm9yRm9yQ29uc29sZSwgeyBmb3JtYXRXYXJuaW5nRm9yQ29uc29sZSB9XG5cdGZyb20gJy4vZm9ybWF0Q29tcGlsZUVycm9yRm9yQ29uc29sZSdcblxuY29uc3QgTmFtZSA9ICdndWxwLW1hc29uJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBndWxwTXMob3B0cyA9IHsgfSkge1xuXHRyZXR1cm4gb2JqKGZ1bmN0aW9uKGZpbGUsIGVuYywgY2IpIHtcblx0XHRpZiAob3B0cy52ZXJib3NlKVxuXHRcdFx0Y29uc29sZS5sb2coYENvbXBpbGluZyAke2ZpbGUucGF0aH1gKVxuXHRcdGlmIChmaWxlLmlzTnVsbCgpKVxuXHRcdFx0Y2IobnVsbCwgZmlsZSlcblx0XHRlbHNlIGlmIChmaWxlLmlzU3RyZWFtKCkpIHtcblx0XHRcdHRoaXMuZW1pdCgnZXJyb3InLCBuZXcgUGx1Z2luRXJyb3IoTmFtZSwgJ1N0cmVhbWluZyBub3Qgc3VwcG9ydGVkJykpXG5cdFx0XHRyZXR1cm4gY2IoKVxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGNvbnN0IHNyYyA9IGZpbGUuY29udGVudHMudG9TdHJpbmcoJ3V0ZjgnKVxuXHRcdFx0Y29uc3Qgb3V0RmlsZSA9IG1hbmdsZVBhdGgocmVwbGFjZUV4dGVuc2lvbihmaWxlLnBhdGgsICcuanMnKSlcblx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3B0cywgJ2luRmlsZScpKVxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2luRmlsZSBzZXQgYnkgc3RyZWFtJylcblx0XHRcdGNvbnN0IGFsbE9wdHMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRzLCB7IGluRmlsZTogZmlsZS5wYXRoIH0pXG5cdFx0XHRjb25zdCB7IHdhcm5pbmdzLCByZXN1bHQgfSA9IGNvbXBpbGUoc3JjLCBhbGxPcHRzKVxuXG5cdFx0XHR3YXJuaW5ncy5mb3JFYWNoKHcgPT4gY29uc29sZS5sb2coZm9ybWF0V2FybmluZ0ZvckNvbnNvbGUodywgZmlsZS5wYXRoKSkpXG5cdFx0XHRpZiAocmVzdWx0IGluc3RhbmNlb2YgQ29tcGlsZUVycm9yKSB7XG5cdFx0XHRcdGNvbnN0IG1lc3NhZ2UgPSBmb3JtYXRDb21waWxlRXJyb3JGb3JDb25zb2xlKHJlc3VsdCwgZmlsZS5wYXRoKVxuXHRcdFx0XHQvLyBOb3QgY2IobmV3IFBsdWdpbkVycm9yKC4uLikpLlxuXHRcdFx0XHQvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2d1bHBqcy9ndWxwL2lzc3Vlcy83MSNpc3N1ZWNvbW1lbnQtNTM5NDIyNzlcblx0XHRcdFx0dGhpcy5lbWl0KCdlcnJvcicsIG5ldyBQbHVnaW5FcnJvcihOYW1lLCBtZXNzYWdlKSlcblx0XHRcdFx0cmV0dXJuIGNiKClcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnN0IHsgY29kZSwgc291cmNlTWFwIH0gPSByZXN1bHRcblx0XHRcdFx0YXBwbHlTb3VyY2VNYXAoZmlsZSwgc291cmNlTWFwKVxuXHRcdFx0XHRmaWxlLmNvbnRlbnRzID0gbmV3IEJ1ZmZlcihjb2RlKVxuXHRcdFx0XHRmaWxlLnBhdGggPSBvdXRGaWxlXG5cdFx0XHRcdGNiKG51bGwsIGZpbGUpXG5cdFx0XHR9XG5cdFx0fVxuXHR9KVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=