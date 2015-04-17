if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', '../../CompileError', '../../Expression', '../Token', '../U/Bag', '../U/type', './Px', './parseSingle', './parseExpr'], function (exports, _CompileError, _Expression, _Token, _UBag, _UType, _Px, _parseSingle, _parseExpr) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	exports.parseSpaced = parseSpaced;

	var _type = _interopRequire(_UType);

	var _Px2 = _interopRequire(_Px);

	var _parseSingle2 = _interopRequire(_parseSingle);

	function parseSpaced(px) {
		_type(px, _Px2);
		const h = px.tokens.head(),
		      rest = px.tokens.tail();
		switch (true) {
			case h instanceof _Token.Keyword:
				if (h.k === ':') {
					px.check(!_Token.Keyword.isColon(rest.head()), h.loc, function () {
						return 'Two ' + h + ' in a row';
					});
					const eType = px.w(rest, parseSpaced);
					const focus = _Expression.LocalAccess.focus(h.loc);
					return _Expression.Call.contains(h.loc, eType, focus);
				} else if (h.k === '~') return _Expression.Lazy(h.loc, px.w(rest, parseSpaced));
			default:
				{
					const memberOrSubscript = function (px) {
						return function (e, t) {
							const loc = t.loc;
							if (t instanceof _Token.DotName) {
								px.check(t.nDots === 1, loc, 'Too many dots!');
								return _Expression.Member(loc, e, t.name);
							} else if (t instanceof _Token.Group) {
								if (t.k === '[') return _Expression.Call.sub(loc, _UBag.unshift(e, px.w(t.tokens, _parseExpr.parseExprParts)));
								if (t.k === '(') {
									px.check(t.tokens.isEmpty(), loc, function () {
										return 'Use ' + _CompileError.code('(a b)') + ', not ' + _CompileError.code('a(b)');
									});
									return _Expression.Call(loc, e, []);
								}
							} else px.fail(loc, 'Expected member or sub, not ' + t);
						};
					};
					return rest.reduce(memberOrSubscript(px), px.wt(h, _parseSingle2));
				}
		}
	}
});

// TODO:ES6
//# sourceMappingURL=../../../../meta/compile/private/parse/parseSpaced.js.map