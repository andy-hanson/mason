if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', '../../Expression', '../Token', '../U/util', '../U/Op', '../U/Bag', './parseFun', './parseLocalDeclares', './parseSingle', './parseCase', './vars'], function (exports, _Expression, _Token, _UUtil, _UOp, _UBag, _parseFun, _parseLocalDeclares, _parseSingle, _parseCase, _vars) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _parseFun2 = _interopRequire(_parseFun);

	var _parseSingle2 = _interopRequire(_parseSingle);

	const parseExpr = function () {
		return _UOp.ifElse(_vars.tokens.opSplitManyWhere(_Token.Keyword.isObjAssign), function (splits) {
			// Short object form, such as (a. 1, b. 2)
			const first = splits[0].before;
			const tokensCaller = first.rtail();

			const keysVals = {};
			for (let i = 0; i < splits.length - 1; i = i + 1) {
				const local = _vars.wt(splits[i].before.last(), _parseLocalDeclares.parseLocalDeclare);
				// Can't have got a type because there's only one token.
				_UUtil.assert(_UBag.isEmpty(local.opType));
				const tokensValue = i === splits.length - 2 ? splits[i + 1].before : splits[i + 1].before.rtail();
				const value = _vars.w(tokensValue, parseExprPlain);
				_vars.cx.check(!Object.prototype.hasOwnProperty.call(keysVals, local.name), local.loc, function () {
					return 'Duplicate property ' + local + '.';
				});
				Object.defineProperty(keysVals, local.name, { value: value });
			}
			_UUtil.assert(_UBag.last(splits).at === undefined);
			const val = _Expression.ObjSimple(_vars.loc, keysVals);
			if (tokensCaller.isEmpty()) return val;else {
				const parts = _vars.w(tokensCaller, parseExprParts);
				_UUtil.assert(!_UBag.isEmpty(parts));
				return _Expression.Call(_vars.loc, _UBag.head(parts), _UBag.push(_UBag.tail(parts), val));
			}
		}, function () {
			return parseExprPlain();
		});
	};

	exports.parseExpr = parseExpr;
	const parseExprParts = function () {
		const out = [];
		const end = _vars.tokens.end;
		for (let i = _vars.tokens.start; i < end; i = i + 1) {
			const here = _vars.tokens.data[i];
			if (here instanceof _Token.Keyword) {
				const rest = function () {
					return _vars.tokens._new(i + 1, end);
				};
				switch (here.k) {
					case '|':case '~|':
						return _UBag.push(out, _vars.w(rest(), _parseFun2, here.k));
					case 'case':
						return _UBag.push(out, _vars.w(rest(), _parseCase.parseCase, 'case', false));
					case '<~':
						return _UBag.push(out, _Expression.Yield(_vars.loc, _vars.w(rest(), parseExpr)));
					case '<~~':
						return _UBag.push(out, _Expression.YieldTo(_vars.loc, _vars.w(rest(), parseExpr)));
					default:
					// fallthrough
				}
			}
			out.push(_vars.wt(here, _parseSingle2));
		}
		return out;
	};

	exports.parseExprParts = parseExprParts;
	const parseExprPlain = function () {
		const parts = parseExprParts();
		switch (parts.length) {
			case 0:
				return _Expression.GlobalAccess.null(_vars.loc);
			case 1:
				return _UBag.head(parts);
			default:
				return _Expression.Call(_vars.loc, _UBag.head(parts), _UBag.tail(parts));
		}
	};
	exports.parseExprPlain = parseExprPlain;
});
//# sourceMappingURL=../../../../meta/compile/private/parse/parseExpr.js.map