if (typeof define !== 'function') var define = require('amdefine')(module);define(["exports", "module", "esast/dist/Loc", "../Cx", "../U/Bag", "../U/type", "../U/Slice", "../Token"], function (exports, module, _esastDistLoc, _Cx, _UBag, _UType, _USlice, _Token) {
	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var Loc = _interopRequire(_esastDistLoc);

	var locType = _esastDistLoc.locType;
	var SubContext = _Cx.SubContext;
	var head = _UBag.head;
	var isEmpty = _UBag.isEmpty;
	var last = _UBag.last;

	var type = _interopRequire(_UType);

	var Slice = _interopRequire(_USlice);

	var T = _interopRequire(_Token);

	let Px = (function (_SubContext) {
		function Px(cx, tokens, loc) {
			_classCallCheck(this, Px);

			_get(Object.getPrototypeOf(Px.prototype), "constructor", this).call(this, cx);
			type(tokens, Slice);
			this.tokens = tokens;
			this.loc = loc;
		}

		_inherits(Px, _SubContext);

		_createClass(Px, {
			check: {
				value: function check(cond, loc, message) {
					if (message === undefined) {
						message = loc;
						_get(Object.getPrototypeOf(Px.prototype), "check", this).call(this, cond, this.loc, message);
					} else _get(Object.getPrototypeOf(Px.prototype), "check", this).call(this, cond, loc, message);
				}
			},
			checkEmpty: {
				value: function checkEmpty(tokens, message) {
					_get(Object.getPrototypeOf(Px.prototype), "check", this).call(this, tokens.isEmpty(), function () {
						return locFromTokens(tokens);
					}, message);
				}
			},
			fail: {
				value: function fail(loc, message) {
					if (message === undefined) {
						message = loc;
						_get(Object.getPrototypeOf(Px.prototype), "fail", this).call(this, this.loc, message);
					} else _get(Object.getPrototypeOf(Px.prototype), "fail", this).call(this, loc, message);
				}
			},
			w: {
				value: function w(tokens, fun, arg, arg2, arg3) {
					const t = this.tokens;
					this.tokens = tokens;
					const s = this.loc;
					this.loc = tokens.isEmpty() ? this.loc : locFromTokens(tokens);
					const res = fun(this, arg, arg2, arg3);
					this.tokens = t;
					this.loc = s;
					return res;
				}
			},
			wt: {
				value: function wt(t, fun, arg) {
					return this.w(new Slice([t]), fun, arg);
				}
			}
		});

		return Px;
	})(SubContext);

	module.exports = Px;

	const locFromTokens = function (ts) {
		return Loc(ts.head().loc.start, ts.last().loc.end);
	};
});
//# sourceMappingURL=../../../../meta/compile/private/parse/Px.js.map