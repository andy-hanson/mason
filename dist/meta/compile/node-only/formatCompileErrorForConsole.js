if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'chalk', '../CompileError', '../private/U/Bag', '../private/U/util'], function (exports, _chalk, _CompileError, _privateUBag, _privateUUtil) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	exports.default = function (error, modulePath) {
		return format(error.warning, modulePath, 'error');
	};

	const formatWarningForConsole = function (warning, modulePath) {
		(0, _privateUUtil.type)(warning, _CompileError.Warning, modulePath, String);
		// Extra space to match up with 'error'
		return format(warning, modulePath, 'warn ');
	};

	exports.formatWarningForConsole = formatWarningForConsole;
	const format = function (warning, modulePath, kind) {
		// Turn code green
		const message = (0, _privateUBag.toArray)((0, _CompileError.formatCode)(warning.message, _chalk.green)).join('');
		return '' + (0, _chalk.blue)(modulePath) + '\n' + (0, _chalk.magenta)(kind) + ' ' + _chalk.bold.red(warning.loc) + ' ' + message;
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9ub2RlLW9ubHkvZm9ybWF0Q29tcGlsZUVycm9yRm9yQ29uc29sZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O21CQUtlLFVBQUMsS0FBSyxFQUFFLFVBQVU7U0FBSyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDO0VBQUE7O0FBRXpFLE9BQU0sdUJBQXVCLEdBQUcsVUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFLO0FBQy9ELG9CQUxRLElBQUksRUFLUCxPQUFPLGdCQVBKLE9BQU8sRUFPUSxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUE7O0FBRTFDLFNBQU8sTUFBTSxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUE7RUFDM0MsQ0FBQTs7U0FKWSx1QkFBdUIsR0FBdkIsdUJBQXVCO0FBTXBDLE9BQU0sTUFBTSxHQUFHLFVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUs7O0FBRTdDLFFBQU0sT0FBTyxHQUFHLGlCQWJSLE9BQU8sRUFhUyxrQkFkUCxVQUFVLEVBY1EsT0FBTyxDQUFDLE9BQU8sU0FmcEMsS0FBSyxDQWV1QyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0FBQ3BFLGNBQVUsV0FoQkYsSUFBSSxFQWdCRyxVQUFVLENBQUMsVUFBSyxXQWhCVixPQUFPLEVBZ0JXLElBQUksQ0FBQyxTQUFJLE9BaEJsQixJQUFJLENBZ0JtQixHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFJLE9BQU8sQ0FBRTtFQUNsRixDQUFBIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9ub2RlLW9ubHkvZm9ybWF0Q29tcGlsZUVycm9yRm9yQ29uc29sZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGJsdWUsIGdyZWVuLCBtYWdlbnRhLCBib2xkIH0gZnJvbSAnY2hhbGsnXG5pbXBvcnQgeyBXYXJuaW5nLCBmb3JtYXRDb2RlIH0gZnJvbSAnLi4vQ29tcGlsZUVycm9yJ1xuaW1wb3J0IHsgdG9BcnJheSB9IGZyb20gJy4uL3ByaXZhdGUvVS9CYWcnXG5pbXBvcnQgeyB0eXBlIH0gZnJvbSAnLi4vcHJpdmF0ZS9VL3V0aWwnXG5cbmV4cG9ydCBkZWZhdWx0IChlcnJvciwgbW9kdWxlUGF0aCkgPT4gZm9ybWF0KGVycm9yLndhcm5pbmcsIG1vZHVsZVBhdGgsICdlcnJvcicpXG5cbmV4cG9ydCBjb25zdCBmb3JtYXRXYXJuaW5nRm9yQ29uc29sZSA9ICh3YXJuaW5nLCBtb2R1bGVQYXRoKSA9PiB7XG5cdHR5cGUod2FybmluZywgV2FybmluZywgbW9kdWxlUGF0aCwgU3RyaW5nKVxuXHQvLyBFeHRyYSBzcGFjZSB0byBtYXRjaCB1cCB3aXRoICdlcnJvcidcblx0cmV0dXJuIGZvcm1hdCh3YXJuaW5nLCBtb2R1bGVQYXRoLCAnd2FybiAnKVxufVxuXG5jb25zdCBmb3JtYXQgPSAod2FybmluZywgbW9kdWxlUGF0aCwga2luZCkgPT4ge1xuXHQvLyBUdXJuIGNvZGUgZ3JlZW5cblx0Y29uc3QgbWVzc2FnZSA9IHRvQXJyYXkoZm9ybWF0Q29kZSh3YXJuaW5nLm1lc3NhZ2UsIGdyZWVuKSkuam9pbignJylcblx0cmV0dXJuIGAke2JsdWUobW9kdWxlUGF0aCl9XFxuJHttYWdlbnRhKGtpbmQpfSAke2JvbGQucmVkKHdhcm5pbmcubG9jKX0gJHttZXNzYWdlfWBcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9