if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'esast/dist/render'], function (exports, module, _esastDistRender) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	module.exports = render;

	var _r = _interopRequire(_esastDistRender);

	function render(cx, ast) {
		return cx.opts.sourceMap() ? _esastDistRender.renderWithSourceMap(ast, cx.opts.modulePath(), './' + cx.opts.jsBaseName()) : _r(ast);
	}
});
//# sourceMappingURL=../../../meta/compile/private/render.js.map