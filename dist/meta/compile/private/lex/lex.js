if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', '../Cx', './group', './ungrouped'], function (exports, module, _Cx, _group, _ungrouped) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	module.exports = lex;

	var _group2 = _interopRequire(_group);

	var _ungrouped2 = _interopRequire(_ungrouped);

	function lex(cx, str) {
		// Lexing algorithm requires trailing newline
		str = str + '\n';
		const lx = new _Cx.SubContext(cx);
		const ug = _ungrouped2(lx, str);
		return _group2(lx, ug);
	}
});
//# sourceMappingURL=../../../../meta/compile/private/lex/lex.js.map