if (typeof define !== 'function') var define = require('amdefine')(module);define(["exports", "../../CompileError", "../../Expression", "../Token", "../U/Bag", "../U/type", "../U/util", "./Px", "./parseSingle", "./parseExpr"], function (exports, _CompileError, _Expression, _Token, _UBag, _UType, _UUtil, _Px, _parseSingle, _parseExpr) {
	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	exports.parseSpaced = parseSpaced;
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var code = _CompileError.code;
	var Call = _Expression.Call;
	var Lazy = _Expression.Lazy;
	var LocalAccess = _Expression.LocalAccess;
	var Member = _Expression.Member;
	var DotName = _Token.DotName;
	var Group = _Token.Group;
	var Keyword = _Token.Keyword;
	var unshift = _UBag.unshift;

	var type = _interopRequire(_UType);

	var assert = _UUtil.assert;
	var lazy = _UUtil.lazy;

	var Px = _interopRequire(_Px);

	var parseSingle = _interopRequire(_parseSingle);

	// TODO:ES6
	var PE = _parseExpr;

	function parseSpaced(px) {
		type(px, Px);
		const h = px.tokens.head(),
		      rest = px.tokens.tail();
		switch (true) {
			case h instanceof Keyword:
				if (h.k === ":") {
					px.check(!Keyword.isColon(rest.head()), h.loc, function () {
						return "Two " + h + " in a row";
					});
					const eType = px.w(rest, parseSpaced);
					const focus = LocalAccess.focus(h.loc);
					return Call.contains(h.loc, eType, focus);
				} else if (h.k === "~") return Lazy(h.loc, px.w(rest, parseSpaced));
			default:
				{
					const memberOrSubscript = function (px) {
						return function (e, t) {
							const loc = t.loc;
							if (t instanceof DotName) {
								px.check(t.nDots === 1, loc, "Too many dots!");
								return Member(loc, e, t.name);
							} else if (t instanceof Group) {
								if (t.k === "[") return Call.sub(loc, unshift(e, px.w(t.tokens, PE.parseExprParts)));
								if (t.k === "(") {
									px.check(t.tokens.isEmpty(), loc, function () {
										return "Use " + code("(a b)") + ", not " + code("a(b)");
									});
									return Call(loc, e, []);
								}
							} else px.fail(loc, "Expected member or sub, not " + t);
						};
					};
					return rest.reduce(memberOrSubscript(px), px.wt(h, parseSingle));
				}
		}
	}
});
//# sourceMappingURL=../../../../meta/compile/private/parse/parseSpaced.js.map