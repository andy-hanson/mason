if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', '../../Expression', '../Lang', '../Token', '../U/Op', '../U/type', './Px', './parseBlock', './parseExpr'], function (exports, _Expression, _Lang, _Token, _UOp, _UType, _Px, _parseBlock, _parseExpr) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	// Don't use export default because that causes circular dependency problems.
	exports.parseCase = parseCase;

	var _type = _interopRequire(_UType);

	var _Px2 = _interopRequire(_Px);

	function parseCase(px, k, casedFromFun) {
		_type(px, _Px2, k, _Lang.CaseKeywords, casedFromFun, Boolean);
		const isVal = k === 'case';

		var _PB$takeBlockLinesFromEnd = _parseBlock.takeBlockLinesFromEnd(px);

		const before = _PB$takeBlockLinesFromEnd.before;
		const lines = _PB$takeBlockLinesFromEnd.lines;

		const opCased = (function () {
			if (casedFromFun) {
				px.checkEmpty(before, 'Can\'t give focus to case - it is the function\'s implicit first argument.');
				return _UOp.None;
			} else return _UOp.opIf(!before.isEmpty(), function () {
				return px.w(before, function () {
					return _Expression.Assign.focus(px.loc, _parseExpr.default(px));
				});
			});
		})();

		const l = lines.last();

		var _ref = _Token.Keyword.isElse(l.tokens.head()) ? {
			partLines: lines.rtail(),
			opElse: _UOp.some(px.w(l.tokens.tail(), isVal ? _parseBlock.justBlockVal : _parseBlock.justBlockDo))
		} : {
			partLines: lines,
			opElse: _UOp.None
		};

		const partLines = _ref.partLines;
		const opElse = _ref.opElse;

		const parts = partLines.map(function (line) {
			var _px$w = px.w(line.tokens, isVal ? _parseBlock.takeBlockValFromEnd : _parseBlock.takeBlockDoFromEnd);

			const before = _px$w.before;
			const block = _px$w.block;

			const test = px.w(before, _parseExpr.default);
			return (isVal ? _Expression.CaseValPart : _Expression.CaseDoPart)(line.loc, test, block);
		});

		return (isVal ? _Expression.CaseVal : _Expression.CaseDo)(px.loc, opCased, parts, opElse);
	}
});

// TODO:ES6
//# sourceMappingURL=../../../../meta/compile/private/parse/parseCase.js.map