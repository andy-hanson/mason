if (typeof define !== 'function') var define = require('amdefine')(module);define(["exports", "module", "../../CompileError", "../../Expression", "../Lang", "../Token", "../U/type", "../U/Bag", "../U/Op", "../U/util", "./parseLocalDeclares", "./parseSpaced", "./Px", "./parseCase", "./parseBlock"], function (exports, module, _CompileError, _Expression, _Lang, _Token, _UType, _UBag, _UOp, _UUtil, _parseLocalDeclares, _parseSpaced, _Px, _parseCase, _parseBlock) {
	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	module.exports = parseFun;
	var code = _CompileError.code;
	var BlockDo = _Expression.BlockDo;
	var BlockVal = _Expression.BlockVal;
	var Debug = _Expression.Debug;
	var Fun = _Expression.Fun;
	var LocalDeclare = _Expression.LocalDeclare;
	var CaseKeywords = _Lang.CaseKeywords;
	var KFun = _Lang.KFun;
	var DotName = _Token.DotName;
	var Group = _Token.Group;
	var Keyword = _Token.Keyword;

	var type = _interopRequire(_UType);

	var flatMap = _UBag.flatMap;

	var Op = _interopRequire(_UOp);

	var ifElse = _UOp.ifElse;
	var None = _UOp.None;
	var opIf = _UOp.opIf;
	var some = _UOp.some;
	var assert = _UUtil.assert;
	var lazy = _UUtil.lazy;

	var parseLocalDeclares = _interopRequire(_parseLocalDeclares);

	var parseSpaced = _parseSpaced.parseSpaced;

	var Px = _interopRequire(_Px);

	// TODO:ES6
	var PC = _parseCase;
	var PB = _parseBlock;

	function parseFun(px, k) {
		type(px, Px, k, KFun);

		var _tryTakeReturnType = tryTakeReturnType(px);

		const opReturnType = _tryTakeReturnType.opReturnType;
		const rest = _tryTakeReturnType.rest;

		px.check(!rest.isEmpty(), function () {
			return "Expected an indented block after " + code(k);
		});

		var _px$w = px.w(rest, argsAndBlock);

		const args = _px$w.args;
		const opRestArg = _px$w.opRestArg;
		const block = _px$w.block;
		const opIn = _px$w.opIn;
		const opOut = _px$w.opOut;

		// Need res declare if there is a return type or out condition.
		const opResDeclare = ifElse(opReturnType, function (rt) {
			return some(LocalDeclare.res(rt.loc, opReturnType));
		}, function () {
			return opOut.map(function (o) {
				return LocalDeclare.res(o.loc, opReturnType);
			});
		});
		return Fun(px.loc, k, args, opRestArg, block, opIn, opResDeclare, opOut);
	}

	const tryTakeReturnType = function (px) {
		if (!px.tokens.isEmpty()) {
			const h = px.tokens.head();
			if (Group.isSpaced(h) && Keyword.isColon(h.tokens.head())) return {
				opReturnType: some(px.w(h.tokens.tail(), parseSpaced)),
				rest: px.tokens.tail()
			};
		}
		return { opReturnType: None, rest: px.tokens };
	};

	const argsAndBlock = function (px) {
		const h = px.tokens.head();
		// Might be `|case`
		if (Keyword.isCaseOrCaseDo(h)) {
			const eCase = px.w(px.tokens.tail(), PC.parseCase, h.k, true);
			const args = [LocalDeclare.focus(h.loc)];
			return h.k === "case" ? {
				args: args, opRestArg: None, opIn: None, opOut: None,
				block: BlockVal(px.loc, [], eCase)
			} : {
				args: args, opRestArg: None, opIn: None, opOut: None,
				block: BlockDo(px.loc, [eCase])
			};
		} else {
			var _PB$takeBlockLinesFromEnd = PB.takeBlockLinesFromEnd(px);

			const before = _PB$takeBlockLinesFromEnd.before;
			const lines = _PB$takeBlockLinesFromEnd.lines;

			var _px$w = px.w(before, parseFunLocals);

			const args = _px$w.args;
			const opRestArg = _px$w.opRestArg;

			var _px$w2 = px.w(lines, tryTakeInOut);

			const opIn = _px$w2.opIn;
			const opOut = _px$w2.opOut;
			const rest = _px$w2.rest;

			const block = px.w(rest, PB.parseBlockFromLines);
			return { args: args, opRestArg: opRestArg, block: block, opIn: opIn, opOut: opOut };
		}
	};

	const parseFunLocals = function (px) {
		if (px.tokens.isEmpty()) return { args: [], opRestArg: None };else {
			const l = px.tokens.last();
			if (l instanceof DotName) {
				px.check(l.nDots === 3, l.loc, "Splat argument must have exactly 3 dots");
				return {
					args: px.w(px.tokens.rtail(), parseLocalDeclares),
					opRestArg: some(LocalDeclare(l.loc, l.name, None, false, false))
				};
			} else return { args: parseLocalDeclares(px), opRestArg: None };
		}
	};

	function tryTakeInOut(px) {
		function tryTakeInOrOut(lines, inOrOut) {
			if (!lines.isEmpty()) {
				const firstLine = lines.head();
				assert(Group.isLine(firstLine));
				const tokensFirst = firstLine.tokens;
				if (Keyword.is(inOrOut)(tokensFirst.head())) return {
					took: some(Debug(firstLine.loc, px.w(tokensFirst, PB.parseLinesFromBlock))),
					rest: lines.tail()
				};
			}
			return { took: None, rest: lines };
		}

		var _tryTakeInOrOut = tryTakeInOrOut(px.tokens, "in");

		const opIn = _tryTakeInOrOut.took;
		const restIn = _tryTakeInOrOut.rest;

		var _tryTakeInOrOut2 = tryTakeInOrOut(restIn, "out");

		const opOut = _tryTakeInOrOut2.took;
		const rest = _tryTakeInOrOut2.rest;

		return { opIn: opIn, opOut: opOut, rest: rest };
	}
});
//# sourceMappingURL=../../../../meta/compile/private/parse/parseFun.js.map