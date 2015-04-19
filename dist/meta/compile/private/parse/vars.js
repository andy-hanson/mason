if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'esast/dist/Loc', '../U/Slice'], function (exports, _esastDistLoc, _USlice) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _Loc = _interopRequire(_esastDistLoc);

	var _Slice = _interopRequire(_USlice);

	let cx, tokens, loc;

	exports.cx = cx;
	exports.tokens = tokens;
	exports.loc = loc;
	const init = function (_cx, _tokens, _loc) {
		exports.cx = cx = _cx;
		exports.tokens = tokens = _tokens;
		exports.loc = loc = _loc;
	},
	      uninit = function () {
		exports.cx = cx = exports.tokens = tokens = exports.loc = loc = undefined;
	},
	      check = function (cond, message) {
		return cx.check(cond, loc, message);
	},
	      checkEmpty = function (tokens, message) {
		return cx.check(tokens.isEmpty(), function () {
			return locFromTokens(tokens);
		}, message);
	},
	      w = function (_tokens, fun, arg, arg2) {
		const t = tokens;
		exports.tokens = tokens = _tokens;
		const l = loc;
		exports.loc = loc = tokens.isEmpty() ? loc : locFromTokens(tokens);
		const res = fun(arg, arg2);
		exports.tokens = tokens = t;
		exports.loc = loc = l;
		return res;
	},
	      wt = function (t, fun, arg) {
		return w(new _Slice([t]), fun, arg);
	};

	exports.init = init;
	exports.uninit = uninit;
	exports.check = check;
	exports.checkEmpty = checkEmpty;
	exports.w = w;
	exports.wt = wt;
	const locFromTokens = function (ts) {
		return _Loc(ts.head().loc.start, ts.last().loc.end);
	};
});
//# sourceMappingURL=../../../../meta/compile/private/parse/vars.js.map