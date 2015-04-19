if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', '../../CompileError', '../../Expression', '../Token', '../U/Op', '../U/util', './parseLocalDeclares', './parseSpaced', './parseCase', './parseBlock', './vars'], function (exports, module, _CompileError, _Expression, _Token, _UOp, _UUtil, _parseLocalDeclares, _parseSpaced, _parseCase, _parseBlock, _vars) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	module.exports = parseFun;

	var _parseLocalDeclares2 = _interopRequire(_parseLocalDeclares);

	function parseFun(k) {
		var _tryTakeReturnType = tryTakeReturnType();

		const opReturnType = _tryTakeReturnType.opReturnType;
		const rest = _tryTakeReturnType.rest;

		_vars.check(!rest.isEmpty(), function () {
			return 'Expected an indented block after ' + _CompileError.code(k);
		});

		var _w = _vars.w(rest, argsAndBlock);

		const args = _w.args;
		const opRestArg = _w.opRestArg;
		const block = _w.block;
		const opIn = _w.opIn;
		const opOut = _w.opOut;

		// Need res declare if there is a return type or out condition.
		const opResDeclare = _UOp.ifElse(opReturnType, function (rt) {
			return _UOp.some(_Expression.LocalDeclare.res(rt.loc, opReturnType));
		}, function () {
			return opOut.map(function (o) {
				return _Expression.LocalDeclare.res(o.loc, opReturnType);
			});
		});
		return _Expression.Fun(_vars.loc, k, args, opRestArg, block, opIn, opResDeclare, opOut);
	}

	const tryTakeReturnType = function () {
		if (!_vars.tokens.isEmpty()) {
			const h = _vars.tokens.head();
			if (_Token.Group.isSpaced(h) && _Token.Keyword.isColon(h.tokens.head())) return {
				opReturnType: _UOp.some(_vars.w(h.tokens.tail(), _parseSpaced.parseSpaced)),
				rest: _vars.tokens.tail()
			};
		}
		return { opReturnType: _UOp.None, rest: _vars.tokens };
	};

	const argsAndBlock = function () {
		const h = _vars.tokens.head();
		// Might be `|case`
		if (_Token.Keyword.isCaseOrCaseDo(h)) {
			const eCase = _vars.w(_vars.tokens.tail(), _parseCase.parseCase, h.k, true);
			const args = [_Expression.LocalDeclare.focus(h.loc)];
			return h.k === 'case' ? {
				args: args, opRestArg: _UOp.None, opIn: _UOp.None, opOut: _UOp.None,
				block: _Expression.BlockVal(_vars.loc, [], eCase)
			} : {
				args: args, opRestArg: _UOp.None, opIn: _UOp.None, opOut: _UOp.None,
				block: _Expression.BlockDo(_vars.loc, [eCase])
			};
		} else {
			var _takeBlockLinesFromEnd = _parseBlock.takeBlockLinesFromEnd();

			const before = _takeBlockLinesFromEnd.before;
			const lines = _takeBlockLinesFromEnd.lines;

			var _w2 = _vars.w(before, parseFunLocals);

			const args = _w2.args;
			const opRestArg = _w2.opRestArg;

			var _w3 = _vars.w(lines, tryTakeInOut);

			const opIn = _w3.opIn;
			const opOut = _w3.opOut;
			const rest = _w3.rest;

			const block = _vars.w(rest, _parseBlock.parseBlockFromLines);
			return { args: args, opRestArg: opRestArg, block: block, opIn: opIn, opOut: opOut };
		}
	};

	const parseFunLocals = function () {
		if (_vars.tokens.isEmpty()) return { args: [], opRestArg: _UOp.None };else {
			const l = _vars.tokens.last();
			if (l instanceof _Token.DotName) {
				_vars.cx.check(l.nDots === 3, l.loc, 'Splat argument must have exactly 3 dots');
				return {
					args: _vars.w(_vars.tokens.rtail(), _parseLocalDeclares2),
					opRestArg: _UOp.some(_Expression.LocalDeclare(l.loc, l.name, _UOp.None, false, false))
				};
			} else return { args: _parseLocalDeclares2(), opRestArg: _UOp.None };
		}
	};

	function tryTakeInOut() {
		function tryTakeInOrOut(lines, inOrOut) {
			if (!lines.isEmpty()) {
				const firstLine = lines.head();
				_UUtil.assert(_Token.Group.isLine(firstLine));
				const tokensFirst = firstLine.tokens;
				if (_Token.Keyword.is(inOrOut)(tokensFirst.head())) return {
					took: _UOp.some(_Expression.Debug(firstLine.loc, _vars.w(tokensFirst, _parseBlock.parseLinesFromBlock))),
					rest: lines.tail()
				};
			}
			return { took: _UOp.None, rest: lines };
		}

		var _tryTakeInOrOut = tryTakeInOrOut(_vars.tokens, 'in');

		const opIn = _tryTakeInOrOut.took;
		const restIn = _tryTakeInOrOut.rest;

		var _tryTakeInOrOut2 = tryTakeInOrOut(restIn, 'out');

		const opOut = _tryTakeInOrOut2.took;
		const rest = _tryTakeInOrOut2.rest;

		return { opIn: opIn, opOut: opOut, rest: rest };
	}
});
//# sourceMappingURL=../../../../meta/compile/private/parse/parseFun.js.map