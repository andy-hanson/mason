if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'esast/dist/render'], function (exports, module, _esastDistRender) {
	'use strict';

	module.exports = render;

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	var _r = _interopRequire(_esastDistRender);

	function render(cx, ast) {
		return cx.opts.sourceMap() ? _esastDistRender.renderWithSourceMap(ast, cx.opts.modulePath(), './' + cx.opts.jsBaseName()) : _r(ast);
	}
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3JlbmRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7a0JBRXdCLE1BQU07Ozs7OztBQUFmLFVBQVMsTUFBTSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUU7QUFDdkMsU0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUN6QixpQkFKVSxtQkFBbUIsQ0FJVCxHQUFHLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsU0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFHLEdBQzNFLEdBQUUsR0FBRyxDQUFDLENBQUE7RUFDUCIsImZpbGUiOiJtZXRhL2NvbXBpbGUvcHJpdmF0ZS9yZW5kZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgciwgeyByZW5kZXJXaXRoU291cmNlTWFwIH0gZnJvbSAnZXNhc3QvZGlzdC9yZW5kZXInXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbmRlcihjeCwgYXN0KSB7XG5cdHJldHVybiBjeC5vcHRzLnNvdXJjZU1hcCgpID9cblx0XHRyZW5kZXJXaXRoU291cmNlTWFwKGFzdCwgY3gub3B0cy5tb2R1bGVQYXRoKCksIGAuLyR7Y3gub3B0cy5qc0Jhc2VOYW1lKCl9YCkgOlxuXHRcdHIoYXN0KVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=