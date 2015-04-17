if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', '../../Expression', '../Token', '../Lang', '../U/type', '../U/util', './Px', './parseBlock', './parseExpr', './parseSpaced'], function (exports, module, _Expression, _Token, _Lang, _UType, _UUtil, _Px, _parseBlock, _parseExpr, _parseSpaced) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	module.exports = parseSingle;

	var _type = _interopRequire(_UType);

	var _Px2 = _interopRequire(_Px);

	function parseSingle(px) {
		_type(px, _Px2);
		const t = px.tokens.head();
		_UUtil.assert(px.tokens.size() === 1);
		switch (true) {
			case t instanceof _Token.CallOnFocus:
				return _Expression.Call(px.loc, access(px, t.name), [_Expression.LocalAccess.focus(px.loc)]);
			case t instanceof _Token.Literal:
				return _Expression.ELiteral(t.loc, t.value, t.k);
			case t instanceof _Token.Name:
				return access(px, t.name);
			case t instanceof _Token.Keyword:
				if (t.k === '_') return _Expression.LocalAccess.focus(px.loc);
				if (_Lang.SpecialKeywords.has(t.k)) return _Expression.Special(px.loc, t.k);
			// Else fallthrough to fail
			case t instanceof _Token.Group:
				switch (t.k) {
					case 'sp':
						return px.w(t.tokens, _parseSpaced.parseSpaced);
					case '->':
						return px.w(t.tokens, _parseBlock.blockWrap, 'val');
					case '"':
						return _Expression.Quote(px.loc, t.tokens.map(function (tSub) {
							return px.wt(tSub, parseSingle);
						}));
					case '(':
						return px.w(t.tokens, _parseExpr.default);
					case '[':
						return _Expression.ListSimple(px.loc, px.w(t.tokens, _parseExpr.parseExprParts));
					default:
					// fallthrough
				}
			case t instanceof _Token.DotName:
				if (t.nDots === 3) return _Expression.Splat(px.loc, _Expression.LocalAccess(px.loc, t.name));
			// Else fallthrough to fail
			default:
				px.fail('Unexpected ' + t);
		}
	}

	const access = function (px, name) {
		return _Lang.JsGlobals.has(name) ? _Expression.GlobalAccess(px.loc, name) : _Expression.LocalAccess(px.loc, name);
	};
});

// TODO:ES6
//# sourceMappingURL=../../../../meta/compile/private/parse/parseSingle.js.map