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

		return _through2.obj(function (file, enc, cb) {
			if (opts.verbose) console.log('Compiling ' + file.path);
			if (file.isNull()) cb(null, file);else if (file.isStream()) {
				this.emit('error', new _gulpUtil.PluginError(Name, 'Streaming not supported'));
				return cb();
			} else {
				const src = file.contents.toString('utf8');
				const outFile = _manglePath(_gulpUtil.replaceExtension(file.path, '.js'));
				if (Object.prototype.hasOwnProperty.call(opts, 'inFile')) throw new Error('inFile set by stream');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9ub2RlLW9ubHkvZ3VscC1tYXNvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7a0JBV3dCLE1BQU07Ozs7Ozs7Ozs7Ozs7O0FBRjlCLE9BQU0sSUFBSSxHQUFHLFlBQVksQ0FBQTs7QUFFVixVQUFTLE1BQU0sQ0FBQyxJQUFVLEVBQUU7Y0FBWixJQUFVO01BQVYsSUFBSSx5QkFBRyxFQUFHOztBQUN4QyxTQUFPLFVBWEMsR0FBRyxDQVdBLFVBQVMsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUU7QUFDbEMsT0FBSSxJQUFJLENBQUMsT0FBTyxFQUNmLE9BQU8sQ0FBQyxHQUFHLGdCQUFjLElBQUksQ0FBQyxJQUFJLENBQUcsQ0FBQTtBQUN0QyxPQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFDaEIsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQSxLQUNWLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFO0FBQ3pCLFFBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGNBbEJiLFdBQVcsQ0FrQmtCLElBQUksRUFBRSx5QkFBeUIsQ0FBQyxDQUFDLENBQUE7QUFDcEUsV0FBTyxFQUFFLEVBQUUsQ0FBQTtJQUNYLE1BQ0k7QUFDSixVQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUMxQyxVQUFNLE9BQU8sR0FBRyxZQUFXLFVBdkJSLGdCQUFnQixDQXVCUyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUE7QUFDOUQsUUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxFQUN2RCxNQUFNLElBQUksS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUE7QUFDeEMsVUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBOzttQkFDakMsVUFBUSxHQUFHLEVBQUUsT0FBTyxDQUFDOztVQUExQyxRQUFRLFlBQVIsUUFBUTtVQUFFLE1BQU0sWUFBTixNQUFNOztBQUV4QixZQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQztZQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBdkJFLHVCQUF1QixDQXVCRCxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQUEsQ0FBQyxDQUFBO0FBQ3pFLFFBQUksTUFBTSwwQkFBd0IsRUFBRTtBQUNuQyxXQUFNLE9BQU8sR0FBRywrQkFBNkIsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTs7O0FBRy9ELFNBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGNBbENkLFdBQVcsQ0FrQ21CLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFBO0FBQ2xELFlBQU8sRUFBRSxFQUFFLENBQUE7S0FDWCxNQUFNO1dBQ0UsSUFBSSxHQUFnQixNQUFNLENBQTFCLElBQUk7V0FBRSxTQUFTLEdBQUssTUFBTSxDQUFwQixTQUFTOztBQUN2QixxQkFBZSxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUE7QUFDL0IsU0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUNoQyxTQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQTtBQUNuQixPQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO0tBQ2Q7SUFDRDtHQUNELENBQUMsQ0FBQTtFQUNGIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9ub2RlLW9ubHkvZ3VscC1tYXNvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBsdWdpbkVycm9yLCByZXBsYWNlRXh0ZW5zaW9uIH0gZnJvbSAnZ3VscC11dGlsJ1xuaW1wb3J0IHsgb2JqIH0gZnJvbSAndGhyb3VnaDInXG5pbXBvcnQgYXBwbHlTb3VyY2VNYXAgZnJvbSAndmlueWwtc291cmNlbWFwcy1hcHBseSdcbmltcG9ydCBjb21waWxlIGZyb20gJy4uL2NvbXBpbGUnXG5pbXBvcnQgQ29tcGlsZUVycm9yIGZyb20gJy4uL0NvbXBpbGVFcnJvcidcbmltcG9ydCBtYW5nbGVQYXRoIGZyb20gJy4uL3ByaXZhdGUvbWFuZ2xlUGF0aCdcbmltcG9ydCBmb3JtYXRDb21waWxlRXJyb3JGb3JDb25zb2xlLCB7IGZvcm1hdFdhcm5pbmdGb3JDb25zb2xlIH1cblx0ZnJvbSAnLi9mb3JtYXRDb21waWxlRXJyb3JGb3JDb25zb2xlJ1xuXG5jb25zdCBOYW1lID0gJ2d1bHAtbWFzb24nXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGd1bHBNcyhvcHRzID0geyB9KSB7XG5cdHJldHVybiBvYmooZnVuY3Rpb24oZmlsZSwgZW5jLCBjYikge1xuXHRcdGlmIChvcHRzLnZlcmJvc2UpXG5cdFx0XHRjb25zb2xlLmxvZyhgQ29tcGlsaW5nICR7ZmlsZS5wYXRofWApXG5cdFx0aWYgKGZpbGUuaXNOdWxsKCkpXG5cdFx0XHRjYihudWxsLCBmaWxlKVxuXHRcdGVsc2UgaWYgKGZpbGUuaXNTdHJlYW0oKSkge1xuXHRcdFx0dGhpcy5lbWl0KCdlcnJvcicsIG5ldyBQbHVnaW5FcnJvcihOYW1lLCAnU3RyZWFtaW5nIG5vdCBzdXBwb3J0ZWQnKSlcblx0XHRcdHJldHVybiBjYigpXG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0Y29uc3Qgc3JjID0gZmlsZS5jb250ZW50cy50b1N0cmluZygndXRmOCcpXG5cdFx0XHRjb25zdCBvdXRGaWxlID0gbWFuZ2xlUGF0aChyZXBsYWNlRXh0ZW5zaW9uKGZpbGUucGF0aCwgJy5qcycpKVxuXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvcHRzLCAnaW5GaWxlJykpXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignaW5GaWxlIHNldCBieSBzdHJlYW0nKVxuXHRcdFx0Y29uc3QgYWxsT3B0cyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdHMsIHsgaW5GaWxlOiBmaWxlLnBhdGggfSlcblx0XHRcdGNvbnN0IHsgd2FybmluZ3MsIHJlc3VsdCB9ID0gY29tcGlsZShzcmMsIGFsbE9wdHMpXG5cblx0XHRcdHdhcm5pbmdzLmZvckVhY2godyA9PiBjb25zb2xlLmxvZyhmb3JtYXRXYXJuaW5nRm9yQ29uc29sZSh3LCBmaWxlLnBhdGgpKSlcblx0XHRcdGlmIChyZXN1bHQgaW5zdGFuY2VvZiBDb21waWxlRXJyb3IpIHtcblx0XHRcdFx0Y29uc3QgbWVzc2FnZSA9IGZvcm1hdENvbXBpbGVFcnJvckZvckNvbnNvbGUocmVzdWx0LCBmaWxlLnBhdGgpXG5cdFx0XHRcdC8vIE5vdCBjYihuZXcgUGx1Z2luRXJyb3IoLi4uKSkuXG5cdFx0XHRcdC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZ3VscGpzL2d1bHAvaXNzdWVzLzcxI2lzc3VlY29tbWVudC01Mzk0MjI3OVxuXHRcdFx0XHR0aGlzLmVtaXQoJ2Vycm9yJywgbmV3IFBsdWdpbkVycm9yKE5hbWUsIG1lc3NhZ2UpKVxuXHRcdFx0XHRyZXR1cm4gY2IoKVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29uc3QgeyBjb2RlLCBzb3VyY2VNYXAgfSA9IHJlc3VsdFxuXHRcdFx0XHRhcHBseVNvdXJjZU1hcChmaWxlLCBzb3VyY2VNYXApXG5cdFx0XHRcdGZpbGUuY29udGVudHMgPSBuZXcgQnVmZmVyKGNvZGUpXG5cdFx0XHRcdGZpbGUucGF0aCA9IG91dEZpbGVcblx0XHRcdFx0Y2IobnVsbCwgZmlsZSlcblx0XHRcdH1cblx0XHR9XG5cdH0pXG59XG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==