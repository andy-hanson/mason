if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', '../../CompileError', '../../Expression', '../Token', '../U/Bag', './parseExpr', './parseSingle', './vars'], function (exports, _CompileError, _Expression, _Token, _UBag, _parseExpr, _parseSingle, _vars) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	exports.parseSpaced = parseSpaced;

	var _parseSingle2 = _interopRequire(_parseSingle);

	function parseSpaced() {
		const h = _vars.tokens.head(),
		      rest = _vars.tokens.tail();
		switch (true) {
			case h instanceof _Token.Keyword:
				if (h.k === ':') {
					_vars.cx.check(!_Token.Keyword.isColon(rest.head()), h.loc, function () {
						return 'Two ' + h + ' in a row';
					});
					const eType = _vars.w(rest, parseSpaced);
					const focus = _Expression.LocalAccess.focus(h.loc);
					return _Expression.Call.contains(h.loc, eType, focus);
				} else if (h.k === '~') return _Expression.Lazy(h.loc, _vars.w(rest, parseSpaced));
			default:
				{
					const memberOrSubscript = function (e, t) {
						const loc = t.loc;
						if (t instanceof _Token.DotName) {
							_vars.cx.check(t.nDots === 1, loc, 'Too many dots!');
							return _Expression.Member(loc, e, t.name);
						} else if (t instanceof _Token.Group) {
							if (t.k === '[') return _Expression.Call.sub(loc, _UBag.unshift(e, _vars.w(t.tokens, _parseExpr.parseExprParts)));
							if (t.k === '(') {
								_vars.cx.check(t.tokens.isEmpty(), loc, function () {
									return 'Use ' + _CompileError.code('(a b)') + ', not ' + _CompileError.code('a(b)');
								});
								return _Expression.Call(loc, e, []);
							}
						} else _vars.cx.fail(loc, 'Expected member or sub, not ' + t);
					};
					return rest.reduce(memberOrSubscript, _vars.wt(h, _parseSingle2));
				}
		}
	}
});
//# sourceMappingURL=../../../../meta/compile/private/parse/parseSpaced.js.map