if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', '../../Expression', '../Token', '../U/type', '../U/util', '../U/Op', '../U/Bag', './parseFun', './parseLocalDeclares', './parseSingle', './Px', './parseCase'], function (exports, _Expression, _Token, _UType, _UUtil, _UOp, _UBag, _parseFun, _parseLocalDeclares, _parseSingle, _Px, _parseCase) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	exports.default = parseExpr;
	exports.parseExprParts = parseExprParts;

	var _type = _interopRequire(_UType);

	var _parseFun2 = _interopRequire(_parseFun);

	var _parseSingle2 = _interopRequire(_parseSingle);

	var _Px2 = _interopRequire(_Px);

	function parseExpr(px) {
		return _UOp.ifElse(px.tokens.opSplitManyWhere(_Token.Keyword.isObjAssign), function (splits) {
			// Short object form, such as (a. 1, b. 2)
			const first = splits[0].before;
			const tokensCaller = first.rtail();

			const keysVals = {};
			for (let i = 0; i < splits.length - 1; i = i + 1) {
				const local = px.wt(splits[i].before.last(), _parseLocalDeclares.parseLocalDeclare);
				// Can't have got a type because there's only one token.
				_UUtil.assert(_UBag.isEmpty(local.opType));
				const tokensValue = i === splits.length - 2 ? splits[i + 1].before : splits[i + 1].before.rtail();
				const value = px.w(tokensValue, parseExprPlain);
				px.check(!Object.prototype.hasOwnProperty.call(keysVals, local.name), local.loc, function () {
					return 'Duplicate property ' + local + '.';
				});
				Object.defineProperty(keysVals, local.name, { value: value });
			}
			_UUtil.assert(_UBag.last(splits).at === undefined);
			const val = _Expression.ObjSimple(px.loc, keysVals);
			if (tokensCaller.isEmpty()) return val;else {
				const parts = px.w(tokensCaller, parseExprParts);
				_UUtil.assert(!_UBag.isEmpty(parts));
				return _Expression.Call(px.loc, _UBag.head(parts), _UBag.push(_UBag.tail(parts), val));
			}
		}, function () {
			return parseExprPlain(px);
		});
	}

	function parseExprPlain(px) {
		_type(px, _Px2);
		const parts = parseExprParts(px);
		switch (parts.length) {
			case 0:
				return _Expression.GlobalAccess.null(px.loc);
			case 1:
				return _UBag.head(parts);
			default:
				return _Expression.Call(px.loc, _UBag.head(parts), _UBag.tail(parts));
		}
	}

	function parseExprParts(px) {
		const out = [];
		const end = px.tokens.end;
		for (let i = px.tokens.start; i < end; i = i + 1) {
			const here = px.tokens.data[i];
			if (here instanceof _Token.Keyword) {
				const rest = function () {
					return px.tokens._new(i + 1, end);
				};
				switch (here.k) {
					case '|':case '~|':
						return _UBag.push(out, px.w(rest(), _parseFun2, here.k));
					case 'case':
						return _UBag.push(out, px.w(rest(), _parseCase.parseCase, 'case', false));
					case '<~':
						return _UBag.push(out, _Expression.Yield(px.loc, px.w(rest(), parseExpr)));
					case '<~~':
						return _UBag.push(out, _Expression.YieldTo(px.loc, px.w(rest(), parseExpr)));
					default:
					// fallthrough
				}
			}
			out.push(px.wt(here, _parseSingle2));
		}
		return out;
	}
});

// TODO:ES6
//# sourceMappingURL=../../../../meta/compile/private/parse/parseExpr.js.map