if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'chalk', '../CompileError', '../private/util'], function (exports, _chalk, _CompileError, _privateUtil) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	exports.default = function (error, modulePath) {
		return format(error.warning, modulePath, 'error');
	};

	const formatWarningForConsole = function (warning, modulePath) {
		(0, _privateUtil.type)(warning, _CompileError.Warning, modulePath, String);
		// Extra space to match up with 'error'
		return format(warning, modulePath, 'warn ');
	};

	exports.formatWarningForConsole = formatWarningForConsole;
	const format = function (warning, modulePath, kind) {
		const message = (0, _privateUtil.iteratorToArray)((0, _CompileError.formatCode)(warning.message, _chalk.green)).join('');
		return '' + (0, _chalk.blue)(modulePath) + '\n' + (0, _chalk.magenta)(kind) + ' ' + _chalk.bold.red(warning.loc) + ' ' + message;
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9ub2RlLW9ubHkvZm9ybWF0Q29tcGlsZUVycm9yRm9yQ29uc29sZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O21CQUllLFVBQUMsS0FBSyxFQUFFLFVBQVU7U0FBSyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDO0VBQUE7O0FBRXpFLE9BQU0sdUJBQXVCLEdBQUcsVUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFLO0FBQy9ELG1CQUx5QixJQUFJLEVBS3hCLE9BQU8sZ0JBTkosT0FBTyxFQU1RLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQTs7QUFFMUMsU0FBTyxNQUFNLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQTtFQUMzQyxDQUFBOztTQUpZLHVCQUF1QixHQUF2Qix1QkFBdUI7QUFNcEMsT0FBTSxNQUFNLEdBQUcsVUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBSztBQUM3QyxRQUFNLE9BQU8sR0FBRyxpQkFYUixlQUFlLEVBV1Msa0JBWmYsVUFBVSxFQVlnQixPQUFPLENBQUMsT0FBTyxTQWI1QyxLQUFLLENBYStDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7QUFDNUUsY0FBVSxXQWRGLElBQUksRUFjRyxVQUFVLENBQUMsVUFBSyxXQWRWLE9BQU8sRUFjVyxJQUFJLENBQUMsU0FBSSxPQWRsQixJQUFJLENBY21CLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQUksT0FBTyxDQUFFO0VBQ2xGLENBQUEiLCJmaWxlIjoibWV0YS9jb21waWxlL25vZGUtb25seS9mb3JtYXRDb21waWxlRXJyb3JGb3JDb25zb2xlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYmx1ZSwgZ3JlZW4sIG1hZ2VudGEsIGJvbGQgfSBmcm9tICdjaGFsaydcbmltcG9ydCB7IFdhcm5pbmcsIGZvcm1hdENvZGUgfSBmcm9tICcuLi9Db21waWxlRXJyb3InXG5pbXBvcnQgeyBpdGVyYXRvclRvQXJyYXksIHR5cGUgfSBmcm9tICcuLi9wcml2YXRlL3V0aWwnXG5cbmV4cG9ydCBkZWZhdWx0IChlcnJvciwgbW9kdWxlUGF0aCkgPT4gZm9ybWF0KGVycm9yLndhcm5pbmcsIG1vZHVsZVBhdGgsICdlcnJvcicpXG5cbmV4cG9ydCBjb25zdCBmb3JtYXRXYXJuaW5nRm9yQ29uc29sZSA9ICh3YXJuaW5nLCBtb2R1bGVQYXRoKSA9PiB7XG5cdHR5cGUod2FybmluZywgV2FybmluZywgbW9kdWxlUGF0aCwgU3RyaW5nKVxuXHQvLyBFeHRyYSBzcGFjZSB0byBtYXRjaCB1cCB3aXRoICdlcnJvcidcblx0cmV0dXJuIGZvcm1hdCh3YXJuaW5nLCBtb2R1bGVQYXRoLCAnd2FybiAnKVxufVxuXG5jb25zdCBmb3JtYXQgPSAod2FybmluZywgbW9kdWxlUGF0aCwga2luZCkgPT4ge1xuXHRjb25zdCBtZXNzYWdlID0gaXRlcmF0b3JUb0FycmF5KGZvcm1hdENvZGUod2FybmluZy5tZXNzYWdlLCBncmVlbikpLmpvaW4oJycpXG5cdHJldHVybiBgJHtibHVlKG1vZHVsZVBhdGgpfVxcbiR7bWFnZW50YShraW5kKX0gJHtib2xkLnJlZCh3YXJuaW5nLmxvYyl9ICR7bWVzc2FnZX1gXG59XG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==