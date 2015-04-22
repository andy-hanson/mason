if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', '../CompileError', 'esast/dist/Loc'], function (exports, module, _CompileError, _esastDistLoc) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _CompileError2 = _interopRequire(_CompileError);

	let Cx = (function () {
		function Cx(opts) {
			_classCallCheck(this, Cx);

			this.opts = opts;
			this.warnings = [];
		}

		_createClass(Cx, [{
			key: 'check',
			value: function check(cond, loc, message) {
				if (!cond) this.fail(loc, message);
			}
		}, {
			key: 'fail',
			value: function fail(loc, message) {
				throw _CompileError2(warning(loc, message));
			}
		}, {
			key: 'warnIf',
			value: function warnIf(cond, loc, message) {
				if (cond) this.warnings.push(warning(loc, message));
			}
		}]);

		return Cx;
	})();

	module.exports = Cx;

	const unlazy = function (_) {
		return _ instanceof Function ? _() : _;
	},
	      warning = function (loc, message) {
		loc = unlazy(loc);
		message = unlazy(message);
		if (loc instanceof _esastDistLoc.Pos) loc = _esastDistLoc.singleCharLoc(loc);
		return _CompileError.Warning(loc, message);
	};
});
//# sourceMappingURL=../../../meta/compile/private/Cx.js.map