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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL0N4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0tBR3FCLEVBQUU7QUFDWCxXQURTLEVBQUUsQ0FDVixJQUFJLEVBQUU7eUJBREUsRUFBRTs7QUFFckIsT0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7QUFDaEIsT0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUE7R0FDbEI7O2VBSm1CLEVBQUU7O1VBTWpCLGVBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUU7QUFDekIsUUFBSSxDQUFDLElBQUksRUFDUixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUN4Qjs7O1VBRUcsY0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFO0FBQ2xCLFVBQU0sZUFBYSxPQUFPLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUE7SUFDekM7OztVQUVLLGdCQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFO0FBQzFCLFFBQUksSUFBSSxFQUNQLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQTtJQUMxQzs7O1NBbEJtQixFQUFFOzs7a0JBQUYsRUFBRTs7QUFxQnZCLE9BQ0MsTUFBTSxHQUFHLFVBQUEsQ0FBQztTQUFJLENBQUMsWUFBWSxRQUFRLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQztFQUFBO09BRTdDLE9BQU8sR0FBRyxVQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUs7QUFDM0IsS0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUNqQixTQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQ3pCLE1BQUksR0FBRywwQkE3QkEsR0FBRyxBQTZCWSxFQUNyQixHQUFHLEdBQUcsY0E5QkssYUFBYSxDQThCSixHQUFHLENBQUMsQ0FBQTtBQUN6QixTQUFPLGNBaENjLE9BQU8sQ0FnQ2IsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0VBQzVCLENBQUEiLCJmaWxlIjoibWV0YS9jb21waWxlL3ByaXZhdGUvQ3guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcGlsZUVycm9yLCB7IFdhcm5pbmcgfSBmcm9tICcuLi9Db21waWxlRXJyb3InXG5pbXBvcnQgeyBQb3MsIHNpbmdsZUNoYXJMb2MgfSBmcm9tICdlc2FzdC9kaXN0L0xvYydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3gge1xuXHRjb25zdHJ1Y3RvcihvcHRzKSB7XG5cdFx0dGhpcy5vcHRzID0gb3B0c1xuXHRcdHRoaXMud2FybmluZ3MgPSBbXVxuXHR9XG5cblx0Y2hlY2soY29uZCwgbG9jLCBtZXNzYWdlKSB7XG5cdFx0aWYgKCFjb25kKVxuXHRcdFx0dGhpcy5mYWlsKGxvYywgbWVzc2FnZSlcblx0fVxuXG5cdGZhaWwobG9jLCBtZXNzYWdlKSB7XG5cdFx0dGhyb3cgQ29tcGlsZUVycm9yKHdhcm5pbmcobG9jLCBtZXNzYWdlKSlcblx0fVxuXG5cdHdhcm5JZihjb25kLCBsb2MsIG1lc3NhZ2UpIHtcblx0XHRpZiAoY29uZClcblx0XHRcdHRoaXMud2FybmluZ3MucHVzaCh3YXJuaW5nKGxvYywgbWVzc2FnZSkpXG5cdH1cbn1cblxuY29uc3Rcblx0dW5sYXp5ID0gXyA9PiBfIGluc3RhbmNlb2YgRnVuY3Rpb24gPyBfKCkgOiBfLFxuXG5cdHdhcm5pbmcgPSAobG9jLCBtZXNzYWdlKSA9PiB7XG5cdFx0bG9jID0gdW5sYXp5KGxvYylcblx0XHRtZXNzYWdlID0gdW5sYXp5KG1lc3NhZ2UpXG5cdFx0aWYgKGxvYyBpbnN0YW5jZW9mIFBvcylcblx0XHRcdGxvYyA9IHNpbmdsZUNoYXJMb2MobG9jKVxuXHRcdHJldHVybiBXYXJuaW5nKGxvYywgbWVzc2FnZSlcblx0fVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=