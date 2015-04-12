if (typeof define !== 'function') var define = require('amdefine')(module);define(["exports", "../CompileError", "esast/dist/Loc", "./U/type"], function (exports, _CompileError, _esastDistLoc, _UType) {
	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var CompileError = _interopRequire(_CompileError);

	var Warning = _CompileError.Warning;

	var Loc = _interopRequire(_esastDistLoc);

	var Pos = _esastDistLoc.Pos;
	var singleCharLoc = _esastDistLoc.singleCharLoc;

	var type = _interopRequire(_UType);

	let Cx = function Cx(opts) {
		_classCallCheck(this, Cx);

		this.opts = opts;
		this.warnings = [];
	};

	exports.default = Cx;

	// Intended to be inherited by specific contexts.

	let SubContext = exports.SubContext = (function () {
		function SubContext(cx) {
			_classCallCheck(this, SubContext);

			this.cx = cx;
		}

		_createClass(SubContext, {
			check: {
				value: function check(cond, loc, message) {
					if (!cond) this.fail(loc, message);
				}
			},
			fail: {
				value: function fail(loc, message) {
					throw CompileError(warning(loc, message));
				}
			},
			warnIf: {
				value: function warnIf(cond, loc, message) {
					if (cond) this.cx.warnings.push(warning(loc, message));
				}
			},
			opts: {
				value: function opts() {
					return this.cx.opts;
				}
			}
		});

		return SubContext;
	})();

	const unlazy = function (_) {
		return _ instanceof Function ? _() : _;
	};

	const warning = function (loc, message) {
		loc = unlazy(loc);
		message = unlazy(message);
		if (loc instanceof Pos) loc = singleCharLoc(loc);
		type(loc, Loc, message, String);
		return Warning(loc, message);
	};
});
//# sourceMappingURL=../../../meta/compile/private/Cx.js.map