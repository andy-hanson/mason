if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'esast/dist/Loc', '../Cx', '../U/type', '../U/Slice'], function (exports, module, _esastDistLoc, _Cx, _UType, _USlice) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

	var _Loc = _interopRequire(_esastDistLoc);

	var _type = _interopRequire(_UType);

	var _Slice = _interopRequire(_USlice);

	let Px = (function (_SubContext) {
		function Px(cx, tokens, loc) {
			_classCallCheck(this, Px);

			_get(Object.getPrototypeOf(Px.prototype), 'constructor', this).call(this, cx);
			_type(tokens, _Slice);
			this.tokens = tokens;
			this.loc = loc;
		}

		_inherits(Px, _SubContext);

		_createClass(Px, [{
			key: 'check',
			value: function check(cond, loc, message) {
				if (message === undefined) {
					message = loc;
					_get(Object.getPrototypeOf(Px.prototype), 'check', this).call(this, cond, this.loc, message);
				} else _get(Object.getPrototypeOf(Px.prototype), 'check', this).call(this, cond, loc, message);
			}
		}, {
			key: 'checkEmpty',
			value: function checkEmpty(tokens, message) {
				_get(Object.getPrototypeOf(Px.prototype), 'check', this).call(this, tokens.isEmpty(), function () {
					return locFromTokens(tokens);
				}, message);
			}
		}, {
			key: 'fail',
			value: function fail(loc, message) {
				if (message === undefined) {
					message = loc;
					_get(Object.getPrototypeOf(Px.prototype), 'fail', this).call(this, this.loc, message);
				} else _get(Object.getPrototypeOf(Px.prototype), 'fail', this).call(this, loc, message);
			}
		}, {
			key: 'w',
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
		}, {
			key: 'wt',
			value: function wt(t, fun, arg) {
				return this.w(new _Slice([t]), fun, arg);
			}
		}]);

		return Px;
	})(_Cx.SubContext);

	module.exports = Px;

	const locFromTokens = function (ts) {
		return _Loc(ts.head().loc.start, ts.last().loc.end);
	};
});
//# sourceMappingURL=../../../../meta/compile/private/parse/Px.js.map