if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', '../CompileError', 'esast/dist/Loc'], function (exports, module, _CompileError, _esastDistLoc) {
	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _CompileError2 = _interopRequireDefault(_CompileError);

	class CompileContext {
		constructor(opts) {
			this.opts = opts;
			this.warnings = [];
		}

		check(cond, loc, message) {
			if (!cond) this.fail(loc, message);
		}

		fail(loc, message) {
			throw (0, _CompileError2.default)(warning(loc, message));
		}

		warn(loc, message) {
			this.warnings.push(warning(loc, message));
		}

		warnIf(cond, loc, message) {
			if (cond) this.warn(loc, message);
		}
	}

	module.exports = CompileContext;

	const unlazy = _ => _ instanceof Function ? _() : _,
	      warning = (loc, message) => {
		loc = unlazy(loc);
		message = unlazy(message);
		if (loc instanceof _esastDistLoc.Pos) loc = (0, _esastDistLoc.singleCharLoc)(loc);
		return (0, _CompileError.Warning)(loc, message);
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL0NvbXBpbGVDb250ZXh0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFHZSxPQUFNLGNBQWMsQ0FBQztBQUNuQyxhQUFXLENBQUMsSUFBSSxFQUFFO0FBQ2pCLE9BQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO0FBQ2hCLE9BQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFBO0dBQ2xCOztBQUVELE9BQUssQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRTtBQUN6QixPQUFJLENBQUMsSUFBSSxFQUNSLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0dBQ3hCOztBQUVELE1BQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFO0FBQ2xCLFNBQU0sNEJBQWEsT0FBTyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFBO0dBQ3pDOztBQUVELE1BQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFO0FBQ2xCLE9BQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQTtHQUN6Qzs7QUFFRCxRQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUU7QUFDMUIsT0FBSSxJQUFJLEVBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUE7R0FDeEI7RUFDRDs7a0JBdkJvQixjQUFjOztBQXlCbkMsT0FDQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxRQUFRLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQztPQUU3QyxPQUFPLEdBQUcsQ0FBQyxHQUFHLEVBQUUsT0FBTyxLQUFLO0FBQzNCLEtBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDakIsU0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQUN6QixNQUFJLEdBQUcsMEJBakNBLEdBQUcsQUFpQ1ksRUFDckIsR0FBRyxHQUFHLGtCQWxDSyxhQUFhLEVBa0NKLEdBQUcsQ0FBQyxDQUFBO0FBQ3pCLFNBQU8sa0JBcENjLE9BQU8sRUFvQ2IsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0VBQzVCLENBQUEiLCJmaWxlIjoibWV0YS9jb21waWxlL3ByaXZhdGUvQ29tcGlsZUNvbnRleHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcGlsZUVycm9yLCB7IFdhcm5pbmcgfSBmcm9tICcuLi9Db21waWxlRXJyb3InXG5pbXBvcnQgeyBQb3MsIHNpbmdsZUNoYXJMb2MgfSBmcm9tICdlc2FzdC9kaXN0L0xvYydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tcGlsZUNvbnRleHQge1xuXHRjb25zdHJ1Y3RvcihvcHRzKSB7XG5cdFx0dGhpcy5vcHRzID0gb3B0c1xuXHRcdHRoaXMud2FybmluZ3MgPSBbXVxuXHR9XG5cblx0Y2hlY2soY29uZCwgbG9jLCBtZXNzYWdlKSB7XG5cdFx0aWYgKCFjb25kKVxuXHRcdFx0dGhpcy5mYWlsKGxvYywgbWVzc2FnZSlcblx0fVxuXG5cdGZhaWwobG9jLCBtZXNzYWdlKSB7XG5cdFx0dGhyb3cgQ29tcGlsZUVycm9yKHdhcm5pbmcobG9jLCBtZXNzYWdlKSlcblx0fVxuXG5cdHdhcm4obG9jLCBtZXNzYWdlKSB7XG5cdFx0dGhpcy53YXJuaW5ncy5wdXNoKHdhcm5pbmcobG9jLCBtZXNzYWdlKSlcblx0fVxuXG5cdHdhcm5JZihjb25kLCBsb2MsIG1lc3NhZ2UpIHtcblx0XHRpZiAoY29uZClcblx0XHRcdHRoaXMud2Fybihsb2MsIG1lc3NhZ2UpXG5cdH1cbn1cblxuY29uc3Rcblx0dW5sYXp5ID0gXyA9PiBfIGluc3RhbmNlb2YgRnVuY3Rpb24gPyBfKCkgOiBfLFxuXG5cdHdhcm5pbmcgPSAobG9jLCBtZXNzYWdlKSA9PiB7XG5cdFx0bG9jID0gdW5sYXp5KGxvYylcblx0XHRtZXNzYWdlID0gdW5sYXp5KG1lc3NhZ2UpXG5cdFx0aWYgKGxvYyBpbnN0YW5jZW9mIFBvcylcblx0XHRcdGxvYyA9IHNpbmdsZUNoYXJMb2MobG9jKVxuXHRcdHJldHVybiBXYXJuaW5nKGxvYywgbWVzc2FnZSlcblx0fVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=