if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'gulp-util', 'through2', 'vinyl-sourcemaps-apply', '../compile', '../CompileError', '../private/manglePath', './formatCompileErrorForConsole'], function (exports, module, _gulpUtil, _through2, _vinylSourcemapsApply, _compile2, _CompileError, _privateManglePath, _formatCompileErrorForConsole) {
	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _applySourceMap = _interopRequireDefault(_vinylSourcemapsApply);

	var _compile3 = _interopRequireDefault(_compile2);

	var _CompileError2 = _interopRequireDefault(_CompileError);

	var _manglePath = _interopRequireDefault(_privateManglePath);

	var _formatCompileErrorForConsole2 = _interopRequireDefault(_formatCompileErrorForConsole);

	const Name = 'gulp-mason';

	module.exports = function () {
		let opts = arguments[0] === undefined ? {} : arguments[0];

		return (0, _through2.obj)(function (file, enc, cb) {
			if (opts.verbose) console.log('Compiling ' + file.path);
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

				warnings.forEach(function (w) {
					return console.log((0, _formatCompileErrorForConsole.formatWarningForConsole)(w, file.path));
				});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9ub2RlLW9ubHkvZ3VscC1tYXNvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFTQSxPQUFNLElBQUksR0FBRyxZQUFZLENBQUE7O2tCQUVWLFlBQWdCO01BQWYsSUFBSSxnQ0FBRyxFQUFHOztBQUN6QixTQUFPLGNBWEMsR0FBRyxFQVdBLFVBQVMsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUU7QUFDbEMsT0FBSSxJQUFJLENBQUMsT0FBTyxFQUNmLE9BQU8sQ0FBQyxHQUFHLGdCQUFjLElBQUksQ0FBQyxJQUFJLENBQUcsQ0FBQTtBQUN0QyxPQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFDaEIsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQSxLQUNWLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFO0FBQ3pCLFFBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGNBbEJiLFdBQVcsQ0FrQmtCLElBQUksRUFBRSx5QkFBeUIsQ0FBQyxDQUFDLENBQUE7QUFDcEUsV0FBTyxFQUFFLEVBQUUsQ0FBQTtJQUNYLE1BQ0k7QUFDSixVQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUMxQyxVQUFNLE9BQU8sR0FBRyx5QkFBVyxjQXZCUixnQkFBZ0IsRUF1QlMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFBO0FBQzlELFFBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsRUFDdkQsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO0FBQ3hDLFVBQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTs7bUJBQ2pDLHVCQUFRLEdBQUcsRUFBRSxPQUFPLENBQUM7O1VBQTFDLFFBQVEsWUFBUixRQUFRO1VBQUUsTUFBTSxZQUFOLE1BQU07O0FBRXhCLFlBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDO1lBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0F2QkUsdUJBQXVCLEVBdUJELENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FBQSxDQUFDLENBQUE7QUFDekUsUUFBSSxNQUFNLGtDQUF3QixFQUFFO0FBQ25DLFdBQU0sT0FBTyxHQUFHLDRDQUE2QixNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBOzs7QUFHL0QsU0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsY0FsQ2QsV0FBVyxDQWtDbUIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUE7QUFDbEQsWUFBTyxFQUFFLEVBQUUsQ0FBQTtLQUNYLE1BQU07V0FDRSxJQUFJLEdBQWdCLE1BQU0sQ0FBMUIsSUFBSTtXQUFFLFNBQVMsR0FBSyxNQUFNLENBQXBCLFNBQVM7O0FBQ3ZCLGtDQUFlLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQTtBQUMvQixTQUFJLENBQUMsUUFBUSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ2hDLFNBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFBO0FBQ25CLE9BQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7S0FDZDtJQUNEO0dBQ0QsQ0FBQyxDQUFBO0VBQ0YiLCJmaWxlIjoibWV0YS9jb21waWxlL25vZGUtb25seS9ndWxwLW1hc29uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGx1Z2luRXJyb3IsIHJlcGxhY2VFeHRlbnNpb24gfSBmcm9tICdndWxwLXV0aWwnXG5pbXBvcnQgeyBvYmogfSBmcm9tICd0aHJvdWdoMidcbmltcG9ydCBhcHBseVNvdXJjZU1hcCBmcm9tICd2aW55bC1zb3VyY2VtYXBzLWFwcGx5J1xuaW1wb3J0IGNvbXBpbGUgZnJvbSAnLi4vY29tcGlsZSdcbmltcG9ydCBDb21waWxlRXJyb3IgZnJvbSAnLi4vQ29tcGlsZUVycm9yJ1xuaW1wb3J0IG1hbmdsZVBhdGggZnJvbSAnLi4vcHJpdmF0ZS9tYW5nbGVQYXRoJ1xuaW1wb3J0IGZvcm1hdENvbXBpbGVFcnJvckZvckNvbnNvbGUsIHsgZm9ybWF0V2FybmluZ0ZvckNvbnNvbGUgfVxuXHRmcm9tICcuL2Zvcm1hdENvbXBpbGVFcnJvckZvckNvbnNvbGUnXG5cbmNvbnN0IE5hbWUgPSAnZ3VscC1tYXNvbidcblxuZXhwb3J0IGRlZmF1bHQgKG9wdHMgPSB7IH0pID0+IHtcblx0cmV0dXJuIG9iaihmdW5jdGlvbihmaWxlLCBlbmMsIGNiKSB7XG5cdFx0aWYgKG9wdHMudmVyYm9zZSlcblx0XHRcdGNvbnNvbGUubG9nKGBDb21waWxpbmcgJHtmaWxlLnBhdGh9YClcblx0XHRpZiAoZmlsZS5pc051bGwoKSlcblx0XHRcdGNiKG51bGwsIGZpbGUpXG5cdFx0ZWxzZSBpZiAoZmlsZS5pc1N0cmVhbSgpKSB7XG5cdFx0XHR0aGlzLmVtaXQoJ2Vycm9yJywgbmV3IFBsdWdpbkVycm9yKE5hbWUsICdTdHJlYW1pbmcgbm90IHN1cHBvcnRlZCcpKVxuXHRcdFx0cmV0dXJuIGNiKClcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRjb25zdCBzcmMgPSBmaWxlLmNvbnRlbnRzLnRvU3RyaW5nKCd1dGY4Jylcblx0XHRcdGNvbnN0IG91dEZpbGUgPSBtYW5nbGVQYXRoKHJlcGxhY2VFeHRlbnNpb24oZmlsZS5wYXRoLCAnLmpzJykpXG5cdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9wdHMsICdpbkZpbGUnKSlcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdpbkZpbGUgc2V0IGJ5IHN0cmVhbScpXG5cdFx0XHRjb25zdCBhbGxPcHRzID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0cywgeyBpbkZpbGU6IGZpbGUucGF0aCB9KVxuXHRcdFx0Y29uc3QgeyB3YXJuaW5ncywgcmVzdWx0IH0gPSBjb21waWxlKHNyYywgYWxsT3B0cylcblxuXHRcdFx0d2FybmluZ3MuZm9yRWFjaCh3ID0+IGNvbnNvbGUubG9nKGZvcm1hdFdhcm5pbmdGb3JDb25zb2xlKHcsIGZpbGUucGF0aCkpKVxuXHRcdFx0aWYgKHJlc3VsdCBpbnN0YW5jZW9mIENvbXBpbGVFcnJvcikge1xuXHRcdFx0XHRjb25zdCBtZXNzYWdlID0gZm9ybWF0Q29tcGlsZUVycm9yRm9yQ29uc29sZShyZXN1bHQsIGZpbGUucGF0aClcblx0XHRcdFx0Ly8gTm90IGNiKG5ldyBQbHVnaW5FcnJvciguLi4pKS5cblx0XHRcdFx0Ly8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9ndWxwanMvZ3VscC9pc3N1ZXMvNzEjaXNzdWVjb21tZW50LTUzOTQyMjc5XG5cdFx0XHRcdHRoaXMuZW1pdCgnZXJyb3InLCBuZXcgUGx1Z2luRXJyb3IoTmFtZSwgbWVzc2FnZSkpXG5cdFx0XHRcdHJldHVybiBjYigpXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb25zdCB7IGNvZGUsIHNvdXJjZU1hcCB9ID0gcmVzdWx0XG5cdFx0XHRcdGFwcGx5U291cmNlTWFwKGZpbGUsIHNvdXJjZU1hcClcblx0XHRcdFx0ZmlsZS5jb250ZW50cyA9IG5ldyBCdWZmZXIoY29kZSlcblx0XHRcdFx0ZmlsZS5wYXRoID0gb3V0RmlsZVxuXHRcdFx0XHRjYihudWxsLCBmaWxlKVxuXHRcdFx0fVxuXHRcdH1cblx0fSlcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9