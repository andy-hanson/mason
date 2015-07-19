if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'gulp-util', 'through2', 'vinyl-sourcemaps-apply', '../compile', '../CompileError', '../private/manglePath', './formatCompileErrorForConsole'], function (exports, module, _gulpUtil, _through2, _vinylSourcemapsApply, _compile2, _CompileError, _privateManglePath, _formatCompileErrorForConsole) {
	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _applySourceMap = _interopRequireDefault(_vinylSourcemapsApply);

	var _compile3 = _interopRequireDefault(_compile2);

	var _CompileError2 = _interopRequireDefault(_CompileError);

	var _manglePath = _interopRequireDefault(_privateManglePath);

	var _formatCompileErrorForConsole2 = _interopRequireDefault(_formatCompileErrorForConsole);

	const Name = 'gulp-mason';

	module.exports = opts => {
		// TODO:ES6 Optional arguments
		if (opts === undefined) opts = {};
		return (0, _through2.obj)(function (file, enc, cb) {
			if (opts.verbose) console.log(`Compiling ${ file.path }`);
			if (file.isNull()) cb(null, file);else if (file.isStream()) {
				this.emit('error', new _gulpUtil.PluginError(Name, 'Streaming not supported'));
				return cb();
			} else {
				const src = file.contents.toString('utf8');
				const outFile = (0, _manglePath.default)((0, _gulpUtil.replaceExtension)(file.path, '.js'));
				if (Object.prototype.hasOwnProperty.call(opts, 'inFile')) throw new Error('inFile set by stream');
				const allOpts = Object.assign({}, opts, { inFile: file.path });

				var _compile = (0, _compile3.default)(src, allOpts);

				const warnings = _compile.warnings;
				const result = _compile.result;

				for (const _ of warnings) console.log((0, _formatCompileErrorForConsole.formatWarningForConsole)(_, file.path));
				if (result instanceof _CompileError2.default) {
					const message = (0, _formatCompileErrorForConsole2.default)(result, file.path);
					// Not cb(new PluginError(...)).
					// See https://github.com/gulpjs/gulp/issues/71#issuecomment-53942279
					this.emit('error', new _gulpUtil.PluginError(Name, message));
					return cb();
				} else {
					const code = result.code;
					const sourceMap = result.sourceMap;

					(0, _applySourceMap.default)(file, sourceMap);
					file.contents = new Buffer(code);
					file.path = outFile;
					cb(null, file);
				}
			}
		});
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9ub2RlLW9ubHkvZ3VscC1tYXNvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFTQSxPQUFNLElBQUksR0FBRyxZQUFZLENBQUE7O2tCQUVWLElBQUksSUFBSTs7QUFFdEIsTUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFLElBQUksR0FBRyxFQUFHLENBQUE7QUFDbEMsU0FBTyxjQWJDLEdBQUcsRUFhQSxVQUFTLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFO0FBQ2xDLE9BQUksSUFBSSxDQUFDLE9BQU8sRUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxHQUFFLElBQUksQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUE7QUFDdEMsT0FBSSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQ2hCLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUEsS0FDVixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRTtBQUN6QixRQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxjQXBCYixXQUFXLENBb0JrQixJQUFJLEVBQUUseUJBQXlCLENBQUMsQ0FBQyxDQUFBO0FBQ3BFLFdBQU8sRUFBRSxFQUFFLENBQUE7SUFDWCxNQUNJO0FBQ0osVUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDMUMsVUFBTSxPQUFPLEdBQUcseUJBQVcsY0F6QlIsZ0JBQWdCLEVBeUJTLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQTtBQUM5RCxRQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLEVBQ3ZELE1BQU0sSUFBSSxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQTtBQUN4QyxVQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7O21CQUNqQyx1QkFBUSxHQUFHLEVBQUUsT0FBTyxDQUFDOztVQUExQyxRQUFRLFlBQVIsUUFBUTtVQUFFLE1BQU0sWUFBTixNQUFNOztBQUV4QixTQUFLLE1BQU0sQ0FBQyxJQUFJLFFBQVEsRUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0ExQnVCLHVCQUF1QixFQTBCdEIsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO0FBQ25ELFFBQUksTUFBTSxrQ0FBd0IsRUFBRTtBQUNuQyxXQUFNLE9BQU8sR0FBRyw0Q0FBNkIsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTs7O0FBRy9ELFNBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGNBckNkLFdBQVcsQ0FxQ21CLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFBO0FBQ2xELFlBQU8sRUFBRSxFQUFFLENBQUE7S0FDWCxNQUFNO1dBQ0UsSUFBSSxHQUFnQixNQUFNLENBQTFCLElBQUk7V0FBRSxTQUFTLEdBQUssTUFBTSxDQUFwQixTQUFTOztBQUN2QixrQ0FBZSxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUE7QUFDL0IsU0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUNoQyxTQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQTtBQUNuQixPQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO0tBQ2Q7SUFDRDtHQUNELENBQUMsQ0FBQTtFQUNGIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9ub2RlLW9ubHkvZ3VscC1tYXNvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBsdWdpbkVycm9yLCByZXBsYWNlRXh0ZW5zaW9uIH0gZnJvbSAnZ3VscC11dGlsJ1xuaW1wb3J0IHsgb2JqIH0gZnJvbSAndGhyb3VnaDInXG5pbXBvcnQgYXBwbHlTb3VyY2VNYXAgZnJvbSAndmlueWwtc291cmNlbWFwcy1hcHBseSdcbmltcG9ydCBjb21waWxlIGZyb20gJy4uL2NvbXBpbGUnXG5pbXBvcnQgQ29tcGlsZUVycm9yIGZyb20gJy4uL0NvbXBpbGVFcnJvcidcbmltcG9ydCBtYW5nbGVQYXRoIGZyb20gJy4uL3ByaXZhdGUvbWFuZ2xlUGF0aCdcbmltcG9ydCBmb3JtYXRDb21waWxlRXJyb3JGb3JDb25zb2xlLCB7IGZvcm1hdFdhcm5pbmdGb3JDb25zb2xlIH1cblx0ZnJvbSAnLi9mb3JtYXRDb21waWxlRXJyb3JGb3JDb25zb2xlJ1xuXG5jb25zdCBOYW1lID0gJ2d1bHAtbWFzb24nXG5cbmV4cG9ydCBkZWZhdWx0IG9wdHMgPT4ge1xuXHQvLyBUT0RPOkVTNiBPcHRpb25hbCBhcmd1bWVudHNcblx0aWYgKG9wdHMgPT09IHVuZGVmaW5lZCkgb3B0cyA9IHsgfVxuXHRyZXR1cm4gb2JqKGZ1bmN0aW9uKGZpbGUsIGVuYywgY2IpIHtcblx0XHRpZiAob3B0cy52ZXJib3NlKVxuXHRcdFx0Y29uc29sZS5sb2coYENvbXBpbGluZyAke2ZpbGUucGF0aH1gKVxuXHRcdGlmIChmaWxlLmlzTnVsbCgpKVxuXHRcdFx0Y2IobnVsbCwgZmlsZSlcblx0XHRlbHNlIGlmIChmaWxlLmlzU3RyZWFtKCkpIHtcblx0XHRcdHRoaXMuZW1pdCgnZXJyb3InLCBuZXcgUGx1Z2luRXJyb3IoTmFtZSwgJ1N0cmVhbWluZyBub3Qgc3VwcG9ydGVkJykpXG5cdFx0XHRyZXR1cm4gY2IoKVxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGNvbnN0IHNyYyA9IGZpbGUuY29udGVudHMudG9TdHJpbmcoJ3V0ZjgnKVxuXHRcdFx0Y29uc3Qgb3V0RmlsZSA9IG1hbmdsZVBhdGgocmVwbGFjZUV4dGVuc2lvbihmaWxlLnBhdGgsICcuanMnKSlcblx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3B0cywgJ2luRmlsZScpKVxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2luRmlsZSBzZXQgYnkgc3RyZWFtJylcblx0XHRcdGNvbnN0IGFsbE9wdHMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRzLCB7IGluRmlsZTogZmlsZS5wYXRoIH0pXG5cdFx0XHRjb25zdCB7IHdhcm5pbmdzLCByZXN1bHQgfSA9IGNvbXBpbGUoc3JjLCBhbGxPcHRzKVxuXG5cdFx0XHRmb3IgKGNvbnN0IF8gb2Ygd2FybmluZ3MpXG5cdFx0XHRcdGNvbnNvbGUubG9nKGZvcm1hdFdhcm5pbmdGb3JDb25zb2xlKF8sIGZpbGUucGF0aCkpXG5cdFx0XHRpZiAocmVzdWx0IGluc3RhbmNlb2YgQ29tcGlsZUVycm9yKSB7XG5cdFx0XHRcdGNvbnN0IG1lc3NhZ2UgPSBmb3JtYXRDb21waWxlRXJyb3JGb3JDb25zb2xlKHJlc3VsdCwgZmlsZS5wYXRoKVxuXHRcdFx0XHQvLyBOb3QgY2IobmV3IFBsdWdpbkVycm9yKC4uLikpLlxuXHRcdFx0XHQvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2d1bHBqcy9ndWxwL2lzc3Vlcy83MSNpc3N1ZWNvbW1lbnQtNTM5NDIyNzlcblx0XHRcdFx0dGhpcy5lbWl0KCdlcnJvcicsIG5ldyBQbHVnaW5FcnJvcihOYW1lLCBtZXNzYWdlKSlcblx0XHRcdFx0cmV0dXJuIGNiKClcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnN0IHsgY29kZSwgc291cmNlTWFwIH0gPSByZXN1bHRcblx0XHRcdFx0YXBwbHlTb3VyY2VNYXAoZmlsZSwgc291cmNlTWFwKVxuXHRcdFx0XHRmaWxlLmNvbnRlbnRzID0gbmV3IEJ1ZmZlcihjb2RlKVxuXHRcdFx0XHRmaWxlLnBhdGggPSBvdXRGaWxlXG5cdFx0XHRcdGNiKG51bGwsIGZpbGUpXG5cdFx0XHR9XG5cdFx0fVxuXHR9KVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=