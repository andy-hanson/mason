if (typeof define !== 'function') var define = require('amdefine')(module);define(["exports", "module", "../../CompileError", "../../Expression", "../Lang", "../Token", "../U/Bag", "../U/Op", "../U/type", "../U/util", "./Px", "./parseBlock", "./parseLocalDeclares"], function (exports, module, _CompileError, _Expression, _Lang, _Token, _UBag, _UOp, _UType, _UUtil, _Px, _parseBlock, _parseLocalDeclares) {
	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	module.exports = tryParseUse;
	var code = _CompileError.code;
	var LocalDeclare = _Expression.LocalDeclare;
	var Use = _Expression.Use;
	var UseDo = _Expression.UseDo;
	var UseKeywords = _Lang.UseKeywords;

	var Token = _interopRequire(_Token);

	var DotName = _Token.DotName;
	var Group = _Token.Group;
	var Keyword = _Token.Keyword;
	var Name = _Token.Name;
	var repeat = _UBag.repeat;
	var tail = _UBag.tail;
	var None = _UOp.None;
	var opIf = _UOp.opIf;
	var some = _UOp.some;

	var type = _interopRequire(_UType);

	var assert = _UUtil.assert;
	var lazy = _UUtil.lazy;

	var Px = _interopRequire(_Px);

	// TODO:ES6
	var PB = _parseBlock;
	var ParseLocalDeclares = _parseLocalDeclares;

	function tryParseUse(px, k) {
		type(px, Px, k, UseKeywords);
		if (!px.tokens.isEmpty()) {
			const l0 = px.tokens.head();
			assert(Group.isLine(l0));
			if (Keyword.is(k)(l0.tokens.head())) return {
				uses: px.w(l0.tokens.tail(), parseUse, k),
				rest: px.tokens.tail()
			};
		}
		return { uses: [], rest: px.tokens };
	}

	function parseUse(px, k) {
		type(px, Px, k, UseKeywords);

		var _PB$takeBlockLinesFromEnd = PB.takeBlockLinesFromEnd(px);

		const before = _PB$takeBlockLinesFromEnd.before;
		const lines = _PB$takeBlockLinesFromEnd.lines;

		px.check(before.isEmpty(), function () {
			return "Did not expect anything after " + code(k) + " other than a block";
		});
		return lines.map(function (line) {
			return px.w(line.tokens, useLine, k);
		});
	}

	// TODO:ES6 Just use module imports, no AssignDestructure needed
	function useLine(px, k) {
		const tReq = px.tokens.head();

		var _px$wt = px.wt(tReq, parseRequire);

		const path = _px$wt.path;
		const name = _px$wt.name;

		if (k === "use!") {
			px.check(px.tokens.size() === 1, function () {
				return "Unexpected " + px.tokens[1];
			});
			return UseDo(px.loc, path);
		} else {
			const isLazy = k === "use~" || k === "use-debug";

			var _px$w = px.w(px.tokens.tail(), parseThingsUsed, name, isLazy);

			const used = _px$w.used;
			const opUseDefault = _px$w.opUseDefault;

			return Use(px.loc, path, used, opUseDefault);
		}
	}

	function parseThingsUsed(px, name, isLazy) {
		const useDefault = function () {
			return LocalDeclare(px.loc, name, None, isLazy, false);
		};
		if (px.tokens.isEmpty()) return { used: [], opUseDefault: some(useDefault()) };else {
			const hasDefaultUse = Keyword.isFocus(px.tokens.head());
			const opUseDefault = opIf(hasDefaultUse, useDefault);
			const rest = hasDefaultUse ? px.tokens.tail() : px.tokens;
			const used = px.w(rest, ParseLocalDeclares.default).map(function (l) {
				px.check(l.name !== "_", function () {
					return "" + code("_") + " not allowed as import name.";
				});
				l.isLazy = isLazy;
				return l;
			});
			return { used: used, opUseDefault: opUseDefault };
		}
	}

	function parseRequire(px) {
		assert(px.tokens.size() === 1);
		const t = px.tokens.head();
		if (t instanceof Name) return { path: t.name, name: t.name };else if (t instanceof DotName) return parseLocalRequire(px);else {
			px.check(Group.isSpaced(t), "Not a valid module name.");
			return px.w(t.tokens, parseLocalRequire);
		}
	}

	function parseLocalRequire(px) {
		const first = px.tokens.head();
		let parts = [];
		if (first instanceof DotName) parts = first.nDots === 1 ? ["."] : repeat("..", first.nDots - 1);else px.check(first instanceof Name, first.loc, "Not a valid part of module path.");
		parts.push(first.name);
		px.tokens.tail().each(function (t) {
			px.check(t instanceof DotName && t.nDots === 1, t.loc, "Not a valid part of module path.");
			parts.push(t.name);
		});
		return {
			path: parts.join("/"),
			name: px.tokens.last().name
		};
	}
});
//# sourceMappingURL=../../../../meta/compile/private/parse/parseUse.js.map