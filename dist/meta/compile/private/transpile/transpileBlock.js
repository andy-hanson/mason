if (typeof define !== 'function') var define = require('amdefine')(module);define(["exports", "module", "esast/dist/ast", "esast/dist/util", "../../Expression", "../U/Bag", "../U/Op", "../U/util", "./esast-util", "./util"], function (exports, module, _esastDistAst, _esastDistUtil, _Expression, _UBag, _UOp, _UUtil, _esastUtil, _util) {
	"use strict";

	var BlockStatement = _esastDistAst.BlockStatement;
	var ReturnStatement = _esastDistAst.ReturnStatement;
	var toStatements = _esastDistUtil.toStatements;
	var BlockVal = _Expression.BlockVal;
	var LocalDeclare = _Expression.LocalDeclare;
	var flatMap = _UBag.flatMap;
	var isEmpty = _UBag.isEmpty;
	var ifElse = _UOp.ifElse;
	var opIf = _UOp.opIf;
	var None = _UOp.None;
	var assert = _UUtil.assert;
	var declare = _esastUtil.declare;
	var t = _util.t;
	var maybeWrapInCheckContains = _util.maybeWrapInCheckContains;
	var ReturnRes = _util.ReturnRes;

	module.exports = function (_, tx, lead, opResDeclare, opOut) {
		if (lead === undefined) lead = [];
		if (opResDeclare === undefined) opResDeclare = opOut = None;
		const body = flatMap(_.lines, function (line) {
			return toStatements(t(tx)(line));
		});
		const fin = ifElse(opResDeclare, function (rd) {
			assert(_ instanceof BlockVal);
			const returned = maybeWrapInCheckContains(t(tx)(_.returned), tx, rd.opType, "res");
			return ifElse(opOut, function (o) {
				return [declare(rd, returned)].concat(o, [ReturnRes]);
			}, function () {
				return [ReturnStatement(returned)];
			});
		}, function () {
			return opOut.concat(opIf(_ instanceof BlockVal, function () {
				return ReturnStatement(t(tx)(_.returned));
			}));
		});
		return BlockStatement(lead.concat(body, fin));
	};
});
//# sourceMappingURL=../../../../meta/compile/private/transpile/transpileBlock.js.map