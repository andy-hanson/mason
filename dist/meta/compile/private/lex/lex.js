if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', './group', './ungrouped'], function (exports, module, _group, _ungrouped) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	module.exports = lex;

	var _group2 = _interopRequire(_group);

	var _ungrouped2 = _interopRequire(_ungrouped);

	function lex(cx, str) {
		// Lexing algorithm requires trailing newline
		str = str + '\n';
		const ug = _ungrouped2(cx, str);
		return _group2(cx, ug);
	}
});
//# sourceMappingURL=../../../../meta/compile/private/lex/lex.js.map