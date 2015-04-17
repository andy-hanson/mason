if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'esast/dist/ast', 'esast/dist/util', 'esast/dist/specialize', '../U/Bag', '../U/Op', '../U/util', './transpile', './util'], function (exports, _esastDistAst, _esastDistUtil, _esastDistSpecialize, _UBag, _UOp, _UUtil, _transpile, _util) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	const transpileObjReturn = function (_, cx) {
		const nonDebugKeys = _.keys;
		// TODO: includeTypeChecks() is not the right method for this
		const keys = cx.opts.includeTypeChecks() ? _.keys.concat(_.debugKeys) : _.keys;
		// Make compilation deterministic.
		keys.sort();

		return _UOp.ifElse(_.opObjed, function (objed) {
			const astObjed = _transpile.t(objed);
			if (_UBag.isEmpty(keys)) {
				_UUtil.assert(_UBag.isEmpty(nonDebugKeys));
				return astObjed;
			} else {
				const keysVals = _UBag.cat(_UBag.flatMap(keys, function (key) {
					return [_esastDistAst.Literal(key.name), _util.accessLocalDeclare(key)];
				}), _UBag.flatMap(_.opDisplayName, function (dn) {
					return [_util.LitStrDisplayName, _esastDistAst.Literal(dn)];
				}));
				const anyLazy = keys.some(function (key) {
					return key.isLazy;
				});
				const args = _UBag.unshift(astObjed, keysVals);
				return (anyLazy ? _util.msLset : _util.msSet)(args);
			}
		}, function () {
			_UUtil.assert(!_UBag.isEmpty(keys));
			const props = keys.map(function (key) {
				const val = _util.accessLocalDeclare(key);
				const id = _esastDistUtil.propertyIdOrLiteralCached(key.name);
				return key.isLazy ? _esastDistSpecialize.property('get', id, _esastDistUtil.thunk(val)) : _esastDistSpecialize.property('init', id, val);
			});
			const opPropDisplayName = _.opDisplayName.map(function (dn) {
				return _esastDistSpecialize.property('init', _util.IdDisplayName, _esastDistAst.Literal(dn));
			});
			return _esastDistAst.ObjectExpression(_UBag.cat(props, opPropDisplayName));
		});
	},
	      transpileObjSimple = function (_) {
		// Sort to keep compilation deterministic.
		const keys = Object.getOwnPropertyNames(_.keysVals).sort();
		return _esastDistAst.ObjectExpression(keys.map(function (key) {
			return _esastDistSpecialize.property('init', _esastDistUtil.propertyIdOrLiteralCached(key), _transpile.t(_.keysVals[key]));
		}));
	};
	exports.transpileObjReturn = transpileObjReturn;
	exports.transpileObjSimple = transpileObjSimple;
});
//# sourceMappingURL=../../../../meta/compile/private/transpile/transpileObj.js.map