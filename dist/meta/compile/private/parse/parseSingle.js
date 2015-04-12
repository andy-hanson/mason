if (typeof define !== 'function') var define = require('amdefine')(module);define(["exports", "module", "../../Expression", "../Token", "../Lang", "../U/type", "../U/util", "./Px", "./parseBlock", "./parseExpr", "./parseSpaced"], function (exports, module, _Expression, _Token, _Lang, _UType, _UUtil, _Px, _parseBlock, _parseExpr, _parseSpaced) {
	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	module.exports = parseSingle;
	var Call = _Expression.Call;
	var ListSimple = _Expression.ListSimple;
	var ELiteral = _Expression.ELiteral;
	var GlobalAccess = _Expression.GlobalAccess;
	var LocalAccess = _Expression.LocalAccess;
	var Quote = _Expression.Quote;
	var Special = _Expression.Special;
	var Splat = _Expression.Splat;
	var This = _Expression.This;
	var CallOnFocus = _Token.CallOnFocus;
	var DotName = _Token.DotName;
	var Group = _Token.Group;
	var Keyword = _Token.Keyword;
	var Literal = _Token.Literal;
	var Name = _Token.Name;
	var JsGlobals = _Lang.JsGlobals;
	var SpecialKeywords = _Lang.SpecialKeywords;

	var type = _interopRequire(_UType);

	var assert = _UUtil.assert;
	var lazy = _UUtil.lazy;

	var Px = _interopRequire(_Px);

	// TODO:ES6
	var PB = _parseBlock;
	var ParseExpr = _parseExpr;
	var PS = _parseSpaced;

	function parseSingle(px) {
		type(px, Px);
		const t = px.tokens.head();
		assert(px.tokens.size() === 1);
		switch (true) {
			case t instanceof CallOnFocus:
				return Call(px.loc, access(px, t.name), [LocalAccess.focus(px.loc)]);
			case t instanceof Literal:
				return ELiteral(t.loc, t.value, t.k);
			case t instanceof Name:
				return access(px, t.name);
			case t instanceof Keyword:
				if (t.k === "_") return LocalAccess.focus(px.loc);
				if (SpecialKeywords.has(t.k)) return Special(px.loc, t.k);
			// Else fallthrough to fail
			case t instanceof Group:
				switch (t.k) {
					case "sp":
						return px.w(t.tokens, PS.parseSpaced);
					case "->":
						return px.w(t.tokens, PB.blockWrap, "val");
					case "\"":
						return Quote(px.loc, t.tokens.map(function (tSub) {
							return px.wt(tSub, parseSingle);
						}));
					case "(":
						return px.w(t.tokens, ParseExpr.default);
					case "[":
						return ListSimple(px.loc, px.w(t.tokens, ParseExpr.parseExprParts));
					default:
					// fallthrough
				}
			case t instanceof DotName:
				if (t.nDots === 3) return Splat(px.loc, LocalAccess(px.loc, t.name));
			// Else fallthrough to fail
			default:
				px.fail("Unexpected " + t);
		}
	}

	const access = function (px, name) {
		return JsGlobals.has(name) ? GlobalAccess(px.loc, name) : LocalAccess(px.loc, name);
	};
});
//# sourceMappingURL=../../../../meta/compile/private/parse/parseSingle.js.map