if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', '../CompileError', 'esast/dist/Loc'], function (exports, module, _CompileError, _esastDistLoc) {
	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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
			key: 'warn',
			value: function warn(loc, message) {
				this.warnings.push(warning(loc, message));
			}
		}, {
			key: 'warnIf',
			value: function warnIf(cond, loc, message) {
				if (cond) this.warn(loc, message);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL0N4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0tBR3FCLEVBQUU7QUFDWCxXQURTLEVBQUUsQ0FDVixJQUFJLEVBQUU7eUJBREUsRUFBRTs7QUFFckIsT0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7QUFDaEIsT0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUE7R0FDbEI7O2VBSm1CLEVBQUU7O1VBTWpCLGVBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUU7QUFDekIsUUFBSSxDQUFDLElBQUksRUFDUixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUN4Qjs7O1VBRUcsY0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFO0FBQ2xCLFVBQU0sZUFBYSxPQUFPLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUE7SUFDekM7OztVQUVHLGNBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRTtBQUNsQixRQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUE7SUFDekM7OztVQUVLLGdCQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFO0FBQzFCLFFBQUksSUFBSSxFQUNQLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQ3hCOzs7U0F0Qm1CLEVBQUU7OztrQkFBRixFQUFFOztBQXlCdkIsT0FDQyxNQUFNLEdBQUcsVUFBQSxDQUFDO1NBQUksQ0FBQyxZQUFZLFFBQVEsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDO0VBQUE7T0FFN0MsT0FBTyxHQUFHLFVBQUMsR0FBRyxFQUFFLE9BQU8sRUFBSztBQUMzQixLQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQ2pCLFNBQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7QUFDekIsTUFBSSxHQUFHLDBCQWpDQSxHQUFHLEFBaUNZLEVBQ3JCLEdBQUcsR0FBRyxjQWxDSyxhQUFhLENBa0NKLEdBQUcsQ0FBQyxDQUFBO0FBQ3pCLFNBQU8sY0FwQ2MsT0FBTyxDQW9DYixHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUE7RUFDNUIsQ0FBQSIsImZpbGUiOiJtZXRhL2NvbXBpbGUvcHJpdmF0ZS9DeC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21waWxlRXJyb3IsIHsgV2FybmluZyB9IGZyb20gJy4uL0NvbXBpbGVFcnJvcidcbmltcG9ydCB7IFBvcywgc2luZ2xlQ2hhckxvYyB9IGZyb20gJ2VzYXN0L2Rpc3QvTG9jJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDeCB7XG5cdGNvbnN0cnVjdG9yKG9wdHMpIHtcblx0XHR0aGlzLm9wdHMgPSBvcHRzXG5cdFx0dGhpcy53YXJuaW5ncyA9IFtdXG5cdH1cblxuXHRjaGVjayhjb25kLCBsb2MsIG1lc3NhZ2UpIHtcblx0XHRpZiAoIWNvbmQpXG5cdFx0XHR0aGlzLmZhaWwobG9jLCBtZXNzYWdlKVxuXHR9XG5cblx0ZmFpbChsb2MsIG1lc3NhZ2UpIHtcblx0XHR0aHJvdyBDb21waWxlRXJyb3Iod2FybmluZyhsb2MsIG1lc3NhZ2UpKVxuXHR9XG5cblx0d2Fybihsb2MsIG1lc3NhZ2UpIHtcblx0XHR0aGlzLndhcm5pbmdzLnB1c2god2FybmluZyhsb2MsIG1lc3NhZ2UpKVxuXHR9XG5cblx0d2FybklmKGNvbmQsIGxvYywgbWVzc2FnZSkge1xuXHRcdGlmIChjb25kKVxuXHRcdFx0dGhpcy53YXJuKGxvYywgbWVzc2FnZSlcblx0fVxufVxuXG5jb25zdFxuXHR1bmxhenkgPSBfID0+IF8gaW5zdGFuY2VvZiBGdW5jdGlvbiA/IF8oKSA6IF8sXG5cblx0d2FybmluZyA9IChsb2MsIG1lc3NhZ2UpID0+IHtcblx0XHRsb2MgPSB1bmxhenkobG9jKVxuXHRcdG1lc3NhZ2UgPSB1bmxhenkobWVzc2FnZSlcblx0XHRpZiAobG9jIGluc3RhbmNlb2YgUG9zKVxuXHRcdFx0bG9jID0gc2luZ2xlQ2hhckxvYyhsb2MpXG5cdFx0cmV0dXJuIFdhcm5pbmcobG9jLCBtZXNzYWdlKVxuXHR9XG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==