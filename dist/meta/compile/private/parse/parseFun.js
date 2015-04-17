if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', '../../CompileError', '../../Expression', '../Lang', '../Token', '../U/type', '../U/Op', '../U/util', './parseLocalDeclares', './parseSpaced', './Px', './parseCase', './parseBlock'], function (exports, module, _CompileError, _Expression, _Lang, _Token, _UType, _UOp, _UUtil, _parseLocalDeclares, _parseSpaced, _Px, _parseCase, _parseBlock) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	module.exports = parseFun;

	var _type = _interopRequire(_UType);

	var _parseLocalDeclares2 = _interopRequire(_parseLocalDeclares);

	var _Px2 = _interopRequire(_Px);

	function parseFun(px, k) {
		_type(px, _Px2, k, _Lang.KFun);

		var _tryTakeReturnType = tryTakeReturnType(px);

		const opReturnType = _tryTakeReturnType.opReturnType;
		const rest = _tryTakeReturnType.rest;

		px.check(!rest.isEmpty(), function () {
			return 'Expected an indented block after ' + _CompileError.code(k);
		});

		var _px$w = px.w(rest, argsAndBlock);

		const args = _px$w.args;
		const opRestArg = _px$w.opRestArg;
		const block = _px$w.block;
		const opIn = _px$w.opIn;
		const opOut = _px$w.opOut;

		// Need res declare if there is a return type or out condition.
		const opResDeclare = _UOp.ifElse(opReturnType, function (rt) {
			return _UOp.some(_Expression.LocalDeclare.res(rt.loc, opReturnType));
		}, function () {
			return opOut.map(function (o) {
				return _Expression.LocalDeclare.res(o.loc, opReturnType);
			});
		});
		return _Expression.Fun(px.loc, k, args, opRestArg, block, opIn, opResDeclare, opOut);
	}

	const tryTakeReturnType = function (px) {
		if (!px.tokens.isEmpty()) {
			const h = px.tokens.head();
			if (_Token.Group.isSpaced(h) && _Token.Keyword.isColon(h.tokens.head())) return {
				opReturnType: _UOp.some(px.w(h.tokens.tail(), _parseSpaced.parseSpaced)),
				rest: px.tokens.tail()
			};
		}
		return { opReturnType: _UOp.None, rest: px.tokens };
	};

	const argsAndBlock = function (px) {
		const h = px.tokens.head();
		// Might be `|case`
		if (_Token.Keyword.isCaseOrCaseDo(h)) {
			const eCase = px.w(px.tokens.tail(), _parseCase.parseCase, h.k, true);
			const args = [_Expression.LocalDeclare.focus(h.loc)];
			return h.k === 'case' ? {
				args: args, opRestArg: _UOp.None, opIn: _UOp.None, opOut: _UOp.None,
				block: _Expression.BlockVal(px.loc, [], eCase)
			} : {
				args: args, opRestArg: _UOp.None, opIn: _UOp.None, opOut: _UOp.None,
				block: _Expression.BlockDo(px.loc, [eCase])
			};
		} else {
			var _PB$takeBlockLinesFromEnd = _parseBlock.takeBlockLinesFromEnd(px);

			const before = _PB$takeBlockLinesFromEnd.before;
			const lines = _PB$takeBlockLinesFromEnd.lines;

			var _px$w2 = px.w(before, parseFunLocals);

			const args = _px$w2.args;
			const opRestArg = _px$w2.opRestArg;

			var _px$w3 = px.w(lines, tryTakeInOut);

			const opIn = _px$w3.opIn;
			const opOut = _px$w3.opOut;
			const rest = _px$w3.rest;

			const block = px.w(rest, _parseBlock.parseBlockFromLines);
			return { args: args, opRestArg: opRestArg, block: block, opIn: opIn, opOut: opOut };
		}
	};

	const parseFunLocals = function (px) {
		if (px.tokens.isEmpty()) return { args: [], opRestArg: _UOp.None };else {
			const l = px.tokens.last();
			if (l instanceof _Token.DotName) {
				px.check(l.nDots === 3, l.loc, 'Splat argument must have exactly 3 dots');
				return {
					args: px.w(px.tokens.rtail(), _parseLocalDeclares2),
					opRestArg: _UOp.some(_Expression.LocalDeclare(l.loc, l.name, _UOp.None, false, false))
				};
			} else return { args: _parseLocalDeclares2(px), opRestArg: _UOp.None };
		}
	};

	function tryTakeInOut(px) {
		function tryTakeInOrOut(lines, inOrOut) {
			if (!lines.isEmpty()) {
				const firstLine = lines.head();
				_UUtil.assert(_Token.Group.isLine(firstLine));
				const tokensFirst = firstLine.tokens;
				if (_Token.Keyword.is(inOrOut)(tokensFirst.head())) return {
					took: _UOp.some(_Expression.Debug(firstLine.loc, px.w(tokensFirst, _parseBlock.parseLinesFromBlock))),
					rest: lines.tail()
				};
			}
			return { took: _UOp.None, rest: lines };
		}

		var _tryTakeInOrOut = tryTakeInOrOut(px.tokens, 'in');

		const opIn = _tryTakeInOrOut.took;
		const restIn = _tryTakeInOrOut.rest;

		var _tryTakeInOrOut2 = tryTakeInOrOut(restIn, 'out');

		const opOut = _tryTakeInOrOut2.took;
		const rest = _tryTakeInOrOut2.rest;

		return { opIn: opIn, opOut: opOut, rest: rest };
	}
});

// TODO:ES6
//# sourceMappingURL=../../../../meta/compile/private/parse/parseFun.js.map