if (typeof define !== 'function') var define = require('amdefine')(module);define(["exports", "esast/dist/ast", "esast/dist/util", "esast/dist/specialize", "../U/Bag", "../U/Op", "../U/util", "./util"], function (exports, _esastDistAst, _esastDistUtil, _esastDistSpecialize, _UBag, _UOp, _UUtil, _util) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var Literal = _esastDistAst.Literal;
	var ObjectExpression = _esastDistAst.ObjectExpression;
	var propertyIdOrLiteralCached = _esastDistUtil.propertyIdOrLiteralCached;
	var thunk = _esastDistUtil.thunk;
	var property = _esastDistSpecialize.property;
	var cat = _UBag.cat;
	var flatMap = _UBag.flatMap;
	var isEmpty = _UBag.isEmpty;
	var unshift = _UBag.unshift;
	var ifElse = _UOp.ifElse;
	var assert = _UUtil.assert;
	var t = _util.t;
	var accessLocalDeclare = _util.accessLocalDeclare;
	var msLset = _util.msLset;
	var msSet = _util.msSet;
	var IdDisplayName = _util.IdDisplayName;
	var LitStrDisplayName = _util.LitStrDisplayName;
	const transpileObjReturn = function (_, tx) {
		const nonDebugKeys = _.keys;
		// TODO: includeTypeChecks() is not the right method for this
		const keys = tx.opts().includeTypeChecks() ? _.keys.concat(_.debugKeys) : _.keys;
		// Make compilation deterministic.
		keys.sort();

		return ifElse(_.opObjed, function (objed) {
			const astObjed = t(tx)(objed);
			if (isEmpty(keys)) {
				assert(isEmpty(nonDebugKeys));
				return astObjed;
			} else {
				const keysVals = cat(flatMap(keys, function (key) {
					return [Literal(key.name), accessLocalDeclare(key)];
				}), flatMap(_.opDisplayName, function (dn) {
					return [LitStrDisplayName, Literal(dn)];
				}));
				const anyLazy = keys.some(function (key) {
					return key.isLazy;
				});
				const args = unshift(astObjed, keysVals);
				return (anyLazy ? msLset : msSet)(args);
			}
		}, function () {
			assert(!isEmpty(keys));
			const props = keys.map(function (key) {
				const val = accessLocalDeclare(key);
				const id = propertyIdOrLiteralCached(key.name);
				return key.isLazy ? property("get", id, thunk(val)) : property("init", id, val);
			});
			const opPropDisplayName = _.opDisplayName.map(function (dn) {
				return property("init", IdDisplayName, Literal(dn));
			});
			return ObjectExpression(cat(props, opPropDisplayName));
		});
	},
	      transpileObjSimple = function (_, tx) {
		// Sort to keep compilation deterministic.
		const keys = Object.getOwnPropertyNames(_.keysVals).sort();
		return ObjectExpression(keys.map(function (key) {
			return property("init", propertyIdOrLiteralCached(key), t(tx)(_.keysVals[key]));
		}));
	};
	exports.transpileObjReturn = transpileObjReturn;
	exports.transpileObjSimple = transpileObjSimple;
});
//# sourceMappingURL=../../../../meta/compile/private/transpile/transpileObj.js.map