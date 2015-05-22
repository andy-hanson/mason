if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', '../CompileError', 'esast/dist/Loc'], function (exports, module, _CompileError, _esastDistLoc) {
	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _CompileError2 = _interopRequireDefault(_CompileError);

	let CompileContext = (function () {
		function CompileContext(opts) {
			_classCallCheck(this, CompileContext);

			this.opts = opts;
			this.warnings = [];
		}

		_createClass(CompileContext, [{
			key: 'check',
			value: function check(cond, loc, message) {
				if (!cond) this.fail(loc, message);
			}
		}, {
			key: 'fail',
			value: function fail(loc, message) {
				throw (0, _CompileError2.default)(warning(loc, message));
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

		return CompileContext;
	})();

	module.exports = CompileContext;

	const unlazy = function (_) {
		return _ instanceof Function ? _() : _;
	},
	      warning = function (loc, message) {
		loc = unlazy(loc);
		message = unlazy(message);
		if (loc instanceof _esastDistLoc.Pos) loc = (0, _esastDistLoc.singleCharLoc)(loc);
		return (0, _CompileError.Warning)(loc, message);
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL0NvbXBpbGVDb250ZXh0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0tBR3FCLGNBQWM7QUFDdkIsV0FEUyxjQUFjLENBQ3RCLElBQUksRUFBRTt5QkFERSxjQUFjOztBQUVqQyxPQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtBQUNoQixPQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQTtHQUNsQjs7ZUFKbUIsY0FBYzs7VUFNN0IsZUFBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRTtBQUN6QixRQUFJLENBQUMsSUFBSSxFQUNSLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQ3hCOzs7VUFFRyxjQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUU7QUFDbEIsVUFBTSw0QkFBYSxPQUFPLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUE7SUFDekM7OztVQUVHLGNBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRTtBQUNsQixRQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUE7SUFDekM7OztVQUVLLGdCQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFO0FBQzFCLFFBQUksSUFBSSxFQUNQLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQ3hCOzs7U0F0Qm1CLGNBQWM7OztrQkFBZCxjQUFjOztBQXlCbkMsT0FDQyxNQUFNLEdBQUcsVUFBQSxDQUFDO1NBQUksQ0FBQyxZQUFZLFFBQVEsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDO0VBQUE7T0FFN0MsT0FBTyxHQUFHLFVBQUMsR0FBRyxFQUFFLE9BQU8sRUFBSztBQUMzQixLQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQ2pCLFNBQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7QUFDekIsTUFBSSxHQUFHLDBCQWpDQSxHQUFHLEFBaUNZLEVBQ3JCLEdBQUcsR0FBRyxrQkFsQ0ssYUFBYSxFQWtDSixHQUFHLENBQUMsQ0FBQTtBQUN6QixTQUFPLGtCQXBDYyxPQUFPLEVBb0NiLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQTtFQUM1QixDQUFBIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL0NvbXBpbGVDb250ZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBpbGVFcnJvciwgeyBXYXJuaW5nIH0gZnJvbSAnLi4vQ29tcGlsZUVycm9yJ1xuaW1wb3J0IHsgUG9zLCBzaW5nbGVDaGFyTG9jIH0gZnJvbSAnZXNhc3QvZGlzdC9Mb2MnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXBpbGVDb250ZXh0IHtcblx0Y29uc3RydWN0b3Iob3B0cykge1xuXHRcdHRoaXMub3B0cyA9IG9wdHNcblx0XHR0aGlzLndhcm5pbmdzID0gW11cblx0fVxuXG5cdGNoZWNrKGNvbmQsIGxvYywgbWVzc2FnZSkge1xuXHRcdGlmICghY29uZClcblx0XHRcdHRoaXMuZmFpbChsb2MsIG1lc3NhZ2UpXG5cdH1cblxuXHRmYWlsKGxvYywgbWVzc2FnZSkge1xuXHRcdHRocm93IENvbXBpbGVFcnJvcih3YXJuaW5nKGxvYywgbWVzc2FnZSkpXG5cdH1cblxuXHR3YXJuKGxvYywgbWVzc2FnZSkge1xuXHRcdHRoaXMud2FybmluZ3MucHVzaCh3YXJuaW5nKGxvYywgbWVzc2FnZSkpXG5cdH1cblxuXHR3YXJuSWYoY29uZCwgbG9jLCBtZXNzYWdlKSB7XG5cdFx0aWYgKGNvbmQpXG5cdFx0XHR0aGlzLndhcm4obG9jLCBtZXNzYWdlKVxuXHR9XG59XG5cbmNvbnN0XG5cdHVubGF6eSA9IF8gPT4gXyBpbnN0YW5jZW9mIEZ1bmN0aW9uID8gXygpIDogXyxcblxuXHR3YXJuaW5nID0gKGxvYywgbWVzc2FnZSkgPT4ge1xuXHRcdGxvYyA9IHVubGF6eShsb2MpXG5cdFx0bWVzc2FnZSA9IHVubGF6eShtZXNzYWdlKVxuXHRcdGlmIChsb2MgaW5zdGFuY2VvZiBQb3MpXG5cdFx0XHRsb2MgPSBzaW5nbGVDaGFyTG9jKGxvYylcblx0XHRyZXR1cm4gV2FybmluZyhsb2MsIG1lc3NhZ2UpXG5cdH1cbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9