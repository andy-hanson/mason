if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'chalk', '../CompileError', '../private/U/Bag', '../private/U/type'], function (exports, _chalk, _CompileError, _privateUBag, _privateUType) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _type = _interopRequire(_privateUType);

	exports.default = function (error, modulePath) {
		return format(error.warning, modulePath, 'error');
	};

	const formatWarningForConsole = function (warning, modulePath) {
		_type(warning, _CompileError.Warning, modulePath, String);
		// Extra space to match up with 'error'
		return format(warning, modulePath, 'warn ');
	};

	exports.formatWarningForConsole = formatWarningForConsole;
	const format = function (warning, modulePath, kind) {
		// Turn code green
		const message = _privateUBag.toArray(_CompileError.formatCode(warning.message, _chalk.green)).join('');
		return '' + _chalk.blue(modulePath) + '\n' + _chalk.magenta(kind) + ' ' + _chalk.bold.red(warning.loc) + ' ' + message;
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9ub2RlLW9ubHkvZm9ybWF0Q29tcGlsZUVycm9yRm9yQ29uc29sZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OzttQkFLZSxVQUFDLEtBQUssRUFBRSxVQUFVO1NBQUssTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQztFQUFBOztBQUV6RSxPQUFNLHVCQUF1QixHQUFHLFVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBSztBQUMvRCxRQUFLLE9BQU8sZ0JBUEosT0FBTyxFQU9RLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQTs7QUFFMUMsU0FBTyxNQUFNLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQTtFQUMzQyxDQUFBOztTQUpZLHVCQUF1QixHQUF2Qix1QkFBdUI7QUFNcEMsT0FBTSxNQUFNLEdBQUcsVUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBSzs7QUFFN0MsUUFBTSxPQUFPLEdBQUcsYUFiUixPQUFPLENBYVMsY0FkUCxVQUFVLENBY1EsT0FBTyxDQUFDLE9BQU8sU0FmcEMsS0FBSyxDQWV1QyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0FBQ3BFLGNBQVUsT0FoQkYsSUFBSSxDQWdCRyxVQUFVLENBQUMsVUFBSyxPQWhCVixPQUFPLENBZ0JXLElBQUksQ0FBQyxTQUFJLE9BaEJsQixJQUFJLENBZ0JtQixHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFJLE9BQU8sQ0FBRTtFQUNsRixDQUFBIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9ub2RlLW9ubHkvZm9ybWF0Q29tcGlsZUVycm9yRm9yQ29uc29sZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGJsdWUsIGdyZWVuLCBtYWdlbnRhLCBib2xkIH0gZnJvbSAnY2hhbGsnXG5pbXBvcnQgeyBXYXJuaW5nLCBmb3JtYXRDb2RlIH0gZnJvbSAnLi4vQ29tcGlsZUVycm9yJ1xuaW1wb3J0IHsgdG9BcnJheSB9IGZyb20gJy4uL3ByaXZhdGUvVS9CYWcnXG5pbXBvcnQgdHlwZSBmcm9tICcuLi9wcml2YXRlL1UvdHlwZSdcblxuZXhwb3J0IGRlZmF1bHQgKGVycm9yLCBtb2R1bGVQYXRoKSA9PiBmb3JtYXQoZXJyb3Iud2FybmluZywgbW9kdWxlUGF0aCwgJ2Vycm9yJylcblxuZXhwb3J0IGNvbnN0IGZvcm1hdFdhcm5pbmdGb3JDb25zb2xlID0gKHdhcm5pbmcsIG1vZHVsZVBhdGgpID0+IHtcblx0dHlwZSh3YXJuaW5nLCBXYXJuaW5nLCBtb2R1bGVQYXRoLCBTdHJpbmcpXG5cdC8vIEV4dHJhIHNwYWNlIHRvIG1hdGNoIHVwIHdpdGggJ2Vycm9yJ1xuXHRyZXR1cm4gZm9ybWF0KHdhcm5pbmcsIG1vZHVsZVBhdGgsICd3YXJuICcpXG59XG5cbmNvbnN0IGZvcm1hdCA9ICh3YXJuaW5nLCBtb2R1bGVQYXRoLCBraW5kKSA9PiB7XG5cdC8vIFR1cm4gY29kZSBncmVlblxuXHRjb25zdCBtZXNzYWdlID0gdG9BcnJheShmb3JtYXRDb2RlKHdhcm5pbmcubWVzc2FnZSwgZ3JlZW4pKS5qb2luKCcnKVxuXHRyZXR1cm4gYCR7Ymx1ZShtb2R1bGVQYXRoKX1cXG4ke21hZ2VudGEoa2luZCl9ICR7Ym9sZC5yZWQod2FybmluZy5sb2MpfSAke21lc3NhZ2V9YFxufVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=