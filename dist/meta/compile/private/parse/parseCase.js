if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', '../../Expression', '../Token', '../U/Op', './parseBlock', './parseExpr', './vars'], function (exports, _Expression, _Token, _UOp, _parseBlock, _parseExpr, _vars) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	// Don't use export default because that causes circular dependency problems.
	exports.parseCase = parseCase;

	function parseCase(k, casedFromFun) {
		const isVal = k === 'case';

		var _takeBlockLinesFromEnd = _parseBlock.takeBlockLinesFromEnd();

		const before = _takeBlockLinesFromEnd.before;
		const lines = _takeBlockLinesFromEnd.lines;

		const opCased = (function () {
			if (casedFromFun) {
				_vars.checkEmpty(before, 'Can\'t give focus to case - it is the function\'s implicit first argument.');
				return _UOp.None;
			} else return _UOp.opIf(!before.isEmpty(), function () {
				return _vars.w(before, function () {
					return _Expression.Assign.focus(_vars.loc, _parseExpr.parseExpr());
				});
			});
		})();

		const l = lines.last();

		var _ref = _Token.Keyword.isElse(l.tokens.head()) ? {
			partLines: lines.rtail(),
			opElse: _UOp.some(_vars.w(l.tokens.tail(), isVal ? _parseBlock.justBlockVal : _parseBlock.justBlockDo))
		} : {
			partLines: lines,
			opElse: _UOp.None
		};

		const partLines = _ref.partLines;
		const opElse = _ref.opElse;

		const parts = partLines.map(function (line) {
			var _w = _vars.w(line.tokens, isVal ? _parseBlock.takeBlockValFromEnd : _parseBlock.takeBlockDoFromEnd);

			const before = _w.before;
			const block = _w.block;

			const test = _vars.w(before, _parseExpr.parseExpr);
			return (isVal ? _Expression.CaseValPart : _Expression.CaseDoPart)(line.loc, test, block);
		});

		return (isVal ? _Expression.CaseVal : _Expression.CaseDo)(_vars.loc, opCased, parts, opElse);
	}
});
//# sourceMappingURL=../../../../meta/compile/private/parse/parseCase.js.map