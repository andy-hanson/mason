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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL2xleC9sZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBR3dCLEdBQUc7Ozs7OztBQUFaLFVBQVMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUU7O0FBRXBDLEtBQUcsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFBO0FBQ2hCLFFBQU0sRUFBRSxHQUFHLFlBQVUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0FBQzdCLFNBQU8sUUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7RUFDcEIiLCJmaWxlIjoibWV0YS9jb21waWxlL3ByaXZhdGUvbGV4L2xleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBncm91cCBmcm9tICcuL2dyb3VwJ1xuaW1wb3J0IHVuZ3JvdXBlZCBmcm9tICcuL3VuZ3JvdXBlZCdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbGV4KGN4LCBzdHIpIHtcblx0Ly8gTGV4aW5nIGFsZ29yaXRobSByZXF1aXJlcyB0cmFpbGluZyBuZXdsaW5lXG5cdHN0ciA9IHN0ciArICdcXG4nXG5cdGNvbnN0IHVnID0gdW5ncm91cGVkKGN4LCBzdHIpXG5cdHJldHVybiBncm91cChjeCwgdWcpXG59XG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==