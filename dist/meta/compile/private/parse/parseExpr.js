if (typeof define !== 'function') var define = require('amdefine')(module);define(["exports", "../../Expression", "../Token", "../U/type", "../U/util", "../Lang", "../U/Op", "../U/Bag", "./parseFun", "./parseLocalDeclares", "./parseSingle", "./Px", "./parseCase"], function (exports, _Expression, _Token, _UType, _UUtil, _Lang, _UOp, _UBag, _parseFun, _parseLocalDeclares, _parseSingle, _Px, _parseCase) {
	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	exports.default = parseExpr;
	exports.parseExprParts = parseExprParts;
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var Assign = _Expression.Assign;
	var Call = _Expression.Call;
	var GlobalAccess = _Expression.GlobalAccess;
	var ObjReturn = _Expression.ObjReturn;
	var ObjSimple = _Expression.ObjSimple;
	var Yield = _Expression.Yield;
	var YieldTo = _Expression.YieldTo;
	var Keyword = _Token.Keyword;

	var type = _interopRequire(_UType);

	var assert = _UUtil.assert;
	var lazy = _UUtil.lazy;
	var GeneratorKeywords = _Lang.GeneratorKeywords;
	var KFun = _Lang.KFun;
	var ifElse = _UOp.ifElse;
	var cons = _UBag.cons;
	var head = _UBag.head;
	var isEmpty = _UBag.isEmpty;
	var last = _UBag.last;
	var push = _UBag.push;
	var rtail = _UBag.rtail;
	var tail = _UBag.tail;

	var parseFun = _interopRequire(_parseFun);

	var parseLocalDeclare = _parseLocalDeclares.parseLocalDeclare;

	var parseSingle = _interopRequire(_parseSingle);

	var Px = _interopRequire(_Px);

	// TODO:ES6
	var PC = _parseCase;

	function parseExpr(px) {
		return ifElse(px.tokens.opSplitManyWhere(Keyword.isObjAssign), function (splits) {
			// Short object form, such as (a. 1, b. 2)
			const first = splits[0].before;
			const tokensCaller = first.rtail();

			const keysVals = {};
			for (let i = 0; i < splits.length - 1; i = i + 1) {
				const local = px.wt(splits[i].before.last(), parseLocalDeclare);
				// Can't have got a type because there's only one token.
				assert(isEmpty(local.opType));
				const tokensValue = i === splits.length - 2 ? splits[i + 1].before : splits[i + 1].before.rtail();
				const value = px.w(tokensValue, parseExprPlain);
				px.check(!Object.prototype.hasOwnProperty.call(keysVals, local.name), local.loc, function () {
					return "Duplicate property " + local + ".";
				});
				Object.defineProperty(keysVals, local.name, { value: value });
			}
			assert(last(splits).at === undefined);
			const val = ObjSimple(px.loc, keysVals);
			if (tokensCaller.isEmpty()) return val;else {
				const parts = px.w(tokensCaller, parseExprParts);
				assert(!isEmpty(parts));
				return Call(px.loc, head(parts), push(tail(parts), val));
			}
		}, function () {
			return parseExprPlain(px);
		});
	}

	function parseExprPlain(px) {
		type(px, Px);
		const parts = parseExprParts(px);
		switch (parts.length) {
			case 0:
				return GlobalAccess.null(px.loc);
			case 1:
				return head(parts);
			default:
				return Call(px.loc, head(parts), tail(parts));
		}
	}

	function parseExprParts(px) {
		const out = [];
		const end = px.tokens.end;
		for (let i = px.tokens.start; i < end; i = i + 1) {
			const here = px.tokens.data[i];
			if (here instanceof Keyword) {
				const rest = function () {
					return px.tokens._new(i + 1, end);
				};
				switch (here.k) {
					case "|":case "~|":
						return push(out, px.w(rest(), parseFun, here.k));
					case "case":
						return push(out, px.w(rest(), PC.parseCase, "case", false));
					case "<~":
						return push(out, Yield(px.loc, px.w(rest(), parseExpr)));
					case "<~~":
						return push(out, YieldTo(px.loc, px.w(rest(), parseExpr)));
					default:
					// fallthrough
				}
			}
			out.push(px.wt(here, parseSingle));
		}
		return out;
	}
});
//# sourceMappingURL=../../../../meta/compile/private/parse/parseExpr.js.map