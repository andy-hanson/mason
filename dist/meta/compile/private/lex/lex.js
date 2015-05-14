if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', './group', './ungrouped'], function (exports, module, _group, _ungrouped) {
	'use strict';

	module.exports = lex;

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	var _group2 = _interopRequire(_group);

	var _ungrouped2 = _interopRequire(_ungrouped);

	function lex(cx, str) {
		// Lexing algorithm requires trailing newline
		str = str + '\n';
		const ug = (0, _ungrouped2)(cx, str);
		return (0, _group2)(cx, ug);
	}
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL2xleC9sZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2tCQUd3QixHQUFHOzs7Ozs7OztBQUFaLFVBQVMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUU7O0FBRXBDLEtBQUcsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFBO0FBQ2hCLFFBQU0sRUFBRSxHQUFHLGlCQUFVLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQTtBQUM3QixTQUFPLGFBQU0sRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0VBQ3BCIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL2xleC9sZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZ3JvdXAgZnJvbSAnLi9ncm91cCdcbmltcG9ydCB1bmdyb3VwZWQgZnJvbSAnLi91bmdyb3VwZWQnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxleChjeCwgc3RyKSB7XG5cdC8vIExleGluZyBhbGdvcml0aG0gcmVxdWlyZXMgdHJhaWxpbmcgbmV3bGluZVxuXHRzdHIgPSBzdHIgKyAnXFxuJ1xuXHRjb25zdCB1ZyA9IHVuZ3JvdXBlZChjeCwgc3RyKVxuXHRyZXR1cm4gZ3JvdXAoY3gsIHVnKVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=