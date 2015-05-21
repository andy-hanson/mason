if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'esast/dist/render'], function (exports, module, _esastDistRender) {
	'use strict';

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	var _render = _interopRequire(_esastDistRender);

	module.exports = function (context, esAst) {
		return context.opts.includeSourceMap() ? (0, _esastDistRender.renderWithSourceMap)(esAst, context.opts.modulePath(), './' + context.opts.jsBaseName()) : (0, _render)(esAst);
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3JlbmRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O2tCQUVlLFVBQUMsT0FBTyxFQUFFLEtBQUs7U0FDN0IsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxHQUM5QixxQkFKZSxtQkFBbUIsRUFJZCxLQUFLLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsU0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFHLEdBQ3ZGLGFBQU8sS0FBSyxDQUFDO0VBQUEiLCJmaWxlIjoibWV0YS9jb21waWxlL3ByaXZhdGUvcmVuZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJlbmRlciwgeyByZW5kZXJXaXRoU291cmNlTWFwIH0gZnJvbSAnZXNhc3QvZGlzdC9yZW5kZXInXG5cbmV4cG9ydCBkZWZhdWx0IChjb250ZXh0LCBlc0FzdCkgPT5cblx0Y29udGV4dC5vcHRzLmluY2x1ZGVTb3VyY2VNYXAoKSA/XG5cdFx0cmVuZGVyV2l0aFNvdXJjZU1hcChlc0FzdCwgY29udGV4dC5vcHRzLm1vZHVsZVBhdGgoKSwgYC4vJHtjb250ZXh0Lm9wdHMuanNCYXNlTmFtZSgpfWApIDpcblx0XHRyZW5kZXIoZXNBc3QpXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==