if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'esast/dist/render'], function (exports, module, _esastDistRender) {
	'use strict';

	module.exports = render;

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	var _r = _interopRequire(_esastDistRender);

	function render(cx, ast) {
		return cx.opts.includeSourceMap() ? (0, _esastDistRender.renderWithSourceMap)(ast, cx.opts.modulePath(), './' + cx.opts.jsBaseName()) : (0, _r)(ast);
	}
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3JlbmRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7a0JBRXdCLE1BQU07Ozs7OztBQUFmLFVBQVMsTUFBTSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUU7QUFDdkMsU0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEdBQ2hDLHFCQUpVLG1CQUFtQixFQUlULEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxTQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUcsR0FDM0UsUUFBRSxHQUFHLENBQUMsQ0FBQTtFQUNQIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL3JlbmRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByLCB7IHJlbmRlcldpdGhTb3VyY2VNYXAgfSBmcm9tICdlc2FzdC9kaXN0L3JlbmRlcidcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVuZGVyKGN4LCBhc3QpIHtcblx0cmV0dXJuIGN4Lm9wdHMuaW5jbHVkZVNvdXJjZU1hcCgpID9cblx0XHRyZW5kZXJXaXRoU291cmNlTWFwKGFzdCwgY3gub3B0cy5tb2R1bGVQYXRoKCksIGAuLyR7Y3gub3B0cy5qc0Jhc2VOYW1lKCl9YCkgOlxuXHRcdHIoYXN0KVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=