if (typeof define !== 'function') var define = require('amdefine')(module);define(["exports", "../../Expression", "../Lang", "../Token", "../U/Op", "../U/type", "../U/util", "./Px", "./parseBlock", "./parseExpr"], function (exports, _Expression, _Lang, _Token, _UOp, _UType, _UUtil, _Px, _parseBlock, _parseExpr) {
	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	// Don't use export default because that causes circular dependency problems.
	exports.parseCase = parseCase;
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var Assign = _Expression.Assign;
	var BlockWrap = _Expression.BlockWrap;
	var CaseDo = _Expression.CaseDo;
	var CaseVal = _Expression.CaseVal;
	var CaseDoPart = _Expression.CaseDoPart;
	var CaseValPart = _Expression.CaseValPart;
	var LocalDeclare = _Expression.LocalDeclare;
	var CaseKeywords = _Lang.CaseKeywords;
	var Keyword = _Token.Keyword;
	var ifElse = _UOp.ifElse;
	var None = _UOp.None;
	var opIf = _UOp.opIf;
	var some = _UOp.some;

	var type = _interopRequire(_UType);

	var lazy = _UUtil.lazy;

	var Px = _interopRequire(_Px);

	// TODO:ES6
	var PB = _parseBlock;
	var ParseExpr = _parseExpr;

	function parseCase(px, k, casedFromFun) {
		type(px, Px, k, CaseKeywords, casedFromFun, Boolean);
		const isVal = k === "case";

		var _PB$takeBlockLinesFromEnd = PB.takeBlockLinesFromEnd(px);

		const before = _PB$takeBlockLinesFromEnd.before;
		const lines = _PB$takeBlockLinesFromEnd.lines;

		const opCased = (function () {
			if (casedFromFun) {
				px.checkEmpty(before, "Can't give focus to case - it is the function's implicit first argument.");
				return None;
			} else return opIf(!before.isEmpty(), function () {
				return px.w(before, function () {
					return Assign.focus(px.loc, ParseExpr.default(px));
				});
			});
		})();

		const l = lines.last();

		var _ref = Keyword.isElse(l.tokens.head()) ? {
			partLines: lines.rtail(),
			opElse: some(px.w(l.tokens.tail(), isVal ? PB.justBlockVal : PB.justBlockDo))
		} : {
			partLines: lines,
			opElse: None
		};

		const partLines = _ref.partLines;
		const opElse = _ref.opElse;

		const parts = partLines.map(function (line) {
			var _px$w = px.w(line.tokens, isVal ? PB.takeBlockValFromEnd : PB.takeBlockDoFromEnd);

			const before = _px$w.before;
			const block = _px$w.block;

			const test = px.w(before, ParseExpr.default);
			return (isVal ? CaseValPart : CaseDoPart)(line.loc, test, block);
		});

		return (isVal ? CaseVal : CaseDo)(px.loc, opCased, parts, opElse);
	}
});
//# sourceMappingURL=../../../../meta/compile/private/parse/parseCase.js.map