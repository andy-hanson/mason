if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module'], function (exports, module) {
	'use strict';

	module.exports = function (path) {
		return path.replace(/!/g, 'bang').replace(/@/g, 'at').replace(/\?/g, 'q').replace(/\$/g, 'cash');
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL21hbmdsZVBhdGguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2tCQUFlLFVBQUEsSUFBSTtTQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FDekIsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FDbkIsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FDbkIsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUM7RUFBQSIsImZpbGUiOiJtZXRhL2NvbXBpbGUvcHJpdmF0ZS9tYW5nbGVQYXRoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgcGF0aCA9PlxuXHRwYXRoLnJlcGxhY2UoLyEvZywgJ2JhbmcnKVxuXHQucmVwbGFjZSgvQC9nLCAnYXQnKVxuXHQucmVwbGFjZSgvXFw/L2csICdxJylcblx0LnJlcGxhY2UoL1xcJC9nLCAnY2FzaCcpXG5cbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9