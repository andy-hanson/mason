if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', '../../Expression', '../Token', '../Lang', '../U/util', './parseBlock', './parseExpr', './parseSpaced', './vars'], function (exports, module, _Expression, _Token, _Lang, _UUtil, _parseBlock, _parseExpr, _parseSpaced, _vars) {
	'use strict';

	module.exports = parseSingle;

	function parseSingle() {
		const t = _vars.tokens.head();
		_UUtil.assert(_vars.tokens.size() === 1);
		switch (true) {
			case t instanceof _Token.CallOnFocus:
				return _Expression.Call(_vars.loc, access(t.name), [_Expression.LocalAccess.focus(_vars.loc)]);
			case t instanceof _Token.Literal:
				return _Expression.ELiteral(t.loc, t.value, t.k);
			case t instanceof _Token.Name:
				return access(t.name);
			case t instanceof _Token.Keyword:
				if (t.k === '_') return _Expression.LocalAccess.focus(_vars.loc);
				if (_Lang.SpecialKeywords.has(t.k)) return _Expression.Special(_vars.loc, t.k);
			// Else fallthrough to fail
			case t instanceof _Token.Group:
				switch (t.k) {
					case 'sp':
						return _vars.w(t.tokens, _parseSpaced.parseSpaced);
					case '->':
						return _vars.w(t.tokens, _parseBlock.blockWrap, 'val');
					case '"':
						return _Expression.Quote(_vars.loc, t.tokens.map(function (tSub) {
							return _vars.wt(tSub, parseSingle);
						}));
					case '(':
						return _vars.w(t.tokens, _parseExpr.parseExpr);
					case '[':
						return _Expression.ListSimple(_vars.loc, _vars.w(t.tokens, _parseExpr.parseExprParts));
					default:
					// fallthrough
				}
			case t instanceof _Token.DotName:
				if (t.nDots === 3) return _Expression.Splat(_vars.loc, _Expression.LocalAccess(_vars.loc, t.name));
			// Else fallthrough to fail
			default:
				_vars.cx.fail('Unexpected ' + t);
		}
	}

	const access = function (name) {
		return _Lang.JsGlobals.has(name) ? _Expression.GlobalAccess(_vars.loc, name) : _Expression.LocalAccess(_vars.loc, name);
	};
});
//# sourceMappingURL=../../../../meta/compile/private/parse/parseSingle.js.map