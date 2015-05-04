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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9ub2RlLW9ubHkvZ3VscC1tYXNvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7a0JBV3dCLE1BQU07Ozs7Ozs7Ozs7Ozs7O0FBRjlCLE9BQU0sSUFBSSxHQUFHLFlBQVksQ0FBQTs7QUFFVixVQUFTLE1BQU0sQ0FBQyxJQUFJLEVBQUU7QUFDcEMsTUFBSSxHQUFHLElBQUksSUFBSSxFQUFHLENBQUE7QUFDbEIsU0FBTyxVQVpDLEdBQUcsQ0FZQSxVQUFTLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFO0FBQ2xDLE9BQUksSUFBSSxDQUFDLE9BQU8sRUFDZixPQUFPLENBQUMsR0FBRyxnQkFBYyxJQUFJLENBQUMsSUFBSSxDQUFHLENBQUE7QUFDdEMsT0FBSSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQ2hCLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUEsS0FDVixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRTtBQUN6QixRQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxjQW5CYixXQUFXLENBbUJrQixJQUFJLEVBQUUseUJBQXlCLENBQUMsQ0FBQyxDQUFBO0FBQ3BFLFdBQU8sRUFBRSxFQUFFLENBQUE7SUFDWCxNQUNJO0FBQ0osVUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDMUMsVUFBTSxPQUFPLEdBQUcsWUFBVyxVQXhCUixnQkFBZ0IsQ0F3QlMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFBO0FBQzlELFFBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsRUFBRTtBQUN6RCxZQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ2pCLFdBQU0sSUFBSSxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQTtLQUN2QztBQUNELFVBQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTs7bUJBQ2pDLFVBQVEsR0FBRyxFQUFFLE9BQU8sQ0FBQzs7VUFBMUMsUUFBUSxZQUFSLFFBQVE7VUFBRSxNQUFNLFlBQU4sTUFBTTs7QUFFeEIsWUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7WUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLDhCQTFCRSx1QkFBdUIsQ0EwQkQsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUFBLENBQUMsQ0FBQTtBQUN6RSxRQUFJLE1BQU0sMEJBQXdCLEVBQUU7QUFDbkMsV0FBTSxPQUFPLEdBQUcsK0JBQTZCLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7OztBQUcvRCxTQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxjQXJDZCxXQUFXLENBcUNtQixJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQTtBQUNsRCxZQUFPLEVBQUUsRUFBRSxDQUFBO0tBQ1gsTUFBTTtXQUNFLElBQUksR0FBZ0IsTUFBTSxDQUExQixJQUFJO1dBQUUsU0FBUyxHQUFLLE1BQU0sQ0FBcEIsU0FBUzs7QUFDdkIscUJBQWUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFBO0FBQy9CLFNBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDaEMsU0FBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUE7QUFDbkIsT0FBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtLQUNkO0lBQ0Q7R0FDRCxDQUFDLENBQUE7RUFDRiIsImZpbGUiOiJtZXRhL2NvbXBpbGUvbm9kZS1vbmx5L2d1bHAtbWFzb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQbHVnaW5FcnJvciwgcmVwbGFjZUV4dGVuc2lvbiB9IGZyb20gJ2d1bHAtdXRpbCdcbmltcG9ydCB7IG9iaiB9IGZyb20gJ3Rocm91Z2gyJ1xuaW1wb3J0IGFwcGx5U291cmNlTWFwIGZyb20gJ3ZpbnlsLXNvdXJjZW1hcHMtYXBwbHknXG5pbXBvcnQgY29tcGlsZSBmcm9tICcuLi9jb21waWxlJ1xuaW1wb3J0IENvbXBpbGVFcnJvciBmcm9tICcuLi9Db21waWxlRXJyb3InXG5pbXBvcnQgbWFuZ2xlUGF0aCBmcm9tICcuLi9wcml2YXRlL21hbmdsZVBhdGgnXG5pbXBvcnQgZm9ybWF0Q29tcGlsZUVycm9yRm9yQ29uc29sZSwgeyBmb3JtYXRXYXJuaW5nRm9yQ29uc29sZSB9XG5cdGZyb20gJy4vZm9ybWF0Q29tcGlsZUVycm9yRm9yQ29uc29sZSdcblxuY29uc3QgTmFtZSA9ICdndWxwLW1hc29uJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBndWxwTXMob3B0cykge1xuXHRvcHRzID0gb3B0cyB8fCB7IH1cblx0cmV0dXJuIG9iaihmdW5jdGlvbihmaWxlLCBlbmMsIGNiKSB7XG5cdFx0aWYgKG9wdHMudmVyYm9zZSlcblx0XHRcdGNvbnNvbGUubG9nKGBDb21waWxpbmcgJHtmaWxlLnBhdGh9YClcblx0XHRpZiAoZmlsZS5pc051bGwoKSlcblx0XHRcdGNiKG51bGwsIGZpbGUpXG5cdFx0ZWxzZSBpZiAoZmlsZS5pc1N0cmVhbSgpKSB7XG5cdFx0XHR0aGlzLmVtaXQoJ2Vycm9yJywgbmV3IFBsdWdpbkVycm9yKE5hbWUsICdTdHJlYW1pbmcgbm90IHN1cHBvcnRlZCcpKVxuXHRcdFx0cmV0dXJuIGNiKClcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRjb25zdCBzcmMgPSBmaWxlLmNvbnRlbnRzLnRvU3RyaW5nKCd1dGY4Jylcblx0XHRcdGNvbnN0IG91dEZpbGUgPSBtYW5nbGVQYXRoKHJlcGxhY2VFeHRlbnNpb24oZmlsZS5wYXRoLCAnLmpzJykpXG5cdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9wdHMsICdpbkZpbGUnKSkge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhvcHRzKVxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2luRmlsZSBzZXQgYnkgc3RyZWFtJylcblx0XHRcdH1cblx0XHRcdGNvbnN0IGFsbE9wdHMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRzLCB7IGluRmlsZTogZmlsZS5wYXRoIH0pXG5cdFx0XHRjb25zdCB7IHdhcm5pbmdzLCByZXN1bHQgfSA9IGNvbXBpbGUoc3JjLCBhbGxPcHRzKVxuXG5cdFx0XHR3YXJuaW5ncy5mb3JFYWNoKHcgPT4gY29uc29sZS5sb2coZm9ybWF0V2FybmluZ0ZvckNvbnNvbGUodywgZmlsZS5wYXRoKSkpXG5cdFx0XHRpZiAocmVzdWx0IGluc3RhbmNlb2YgQ29tcGlsZUVycm9yKSB7XG5cdFx0XHRcdGNvbnN0IG1lc3NhZ2UgPSBmb3JtYXRDb21waWxlRXJyb3JGb3JDb25zb2xlKHJlc3VsdCwgZmlsZS5wYXRoKVxuXHRcdFx0XHQvLyBOb3QgY2IobmV3IFBsdWdpbkVycm9yKC4uLikpLlxuXHRcdFx0XHQvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2d1bHBqcy9ndWxwL2lzc3Vlcy83MSNpc3N1ZWNvbW1lbnQtNTM5NDIyNzlcblx0XHRcdFx0dGhpcy5lbWl0KCdlcnJvcicsIG5ldyBQbHVnaW5FcnJvcihOYW1lLCBtZXNzYWdlKSlcblx0XHRcdFx0cmV0dXJuIGNiKClcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnN0IHsgY29kZSwgc291cmNlTWFwIH0gPSByZXN1bHRcblx0XHRcdFx0YXBwbHlTb3VyY2VNYXAoZmlsZSwgc291cmNlTWFwKVxuXHRcdFx0XHRmaWxlLmNvbnRlbnRzID0gbmV3IEJ1ZmZlcihjb2RlKVxuXHRcdFx0XHRmaWxlLnBhdGggPSBvdXRGaWxlXG5cdFx0XHRcdGNiKG51bGwsIGZpbGUpXG5cdFx0XHR9XG5cdFx0fVxuXHR9KVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=