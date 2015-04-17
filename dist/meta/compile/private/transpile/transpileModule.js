if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'esast/dist/ast', 'esast/dist/util', 'esast/dist/specialize', '../manglePath', '../U/Bag', '../U/Op', './esast-util', './transpile', './util'], function (exports, module, _esastDistAst, _esastDistUtil, _esastDistSpecialize, _manglePath, _UBag, _UOp, _esastUtil, _transpile, _util) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	var _manglePath2 = _interopRequire(_manglePath);

	/*
 'use strict';
 if (typeof define !== 'function')
 	var define = require('amdefine')(module);
 define(['exports', 'a', 'b', 'c'], function(exports) {
 	// Fake exports -- just a getter.
 	exports._get = _ms.lazy(function() {
 		const exports = {} // Real exports
 		... imports ...
 		{
 			... exports ...
 		}
 		return exports
 	})
 })
 */

	module.exports = function (_, cx) {
		const allUses = _.doUses.concat(_.uses, _.debugUses);
		const amdNames = _esastDistAst.ArrayExpression(AmdFirstUses.concat(allUses.map(function (use) {
			return _esastDistAst.Literal(_manglePath2(use.path));
		})));
		const useIdentifiers = allUses.map(useIdentifier);
		const amdArgs = AmdFirstArgs.concat(useIdentifiers);
		const useDos = _.doUses.map(function (use, i) {
			const d = _esastDistAst.ExpressionStatement(_util.msGetModule([useIdentifiers[i]]));
			d.loc = use.loc;
			return d;
		});
		const allUseDeclarators = _UBag.flatMap(_.uses.concat(_.debugUses), function (use, i) {
			return useDeclarators(cx, use, useIdentifiers[i + _.doUses.length]);
		});
		const opUseDeclare = _UOp.opIf(!_UBag.isEmpty(allUseDeclarators), function () {
			return _esastDistAst.VariableDeclaration('const', allUseDeclarators);
		});

		// TODO: Some way of determining when it's OK for a module to not be lazy.
		const isLazy = cx.opts.lazyModule();

		const lead = useDos.concat(opUseDeclare, _UOp.opIf(isLazy, function () {
			return DeclareExports;
		}));
		const trail = [_esastDistAst.ReturnStatement(_util.IdExports)];
		const moduleBody = _transpile.t(_.block, lead, _UOp.None, trail);
		const body = isLazy ? _esastDistAst.BlockStatement([lazyBody(moduleBody)]) : moduleBody;

		const doDefine = _esastDistAst.ExpressionStatement(_esastDistAst.CallExpression(_util.IdDefine, [amdNames, _esastDistAst.FunctionExpression(null, amdArgs, body)]));

		return _esastDistAst.Program([UseStrict].concat(_UOp.opIf(cx.opts.amdefine(), function () {
			return AmdefineHeader;
		}), [doDefine]));
	};

	const useDeclarators = function (cx, _, moduleIdentifier) {
		// TODO: Could be neater about this
		const isLazy = (_UBag.isEmpty(_.used) ? _.opUseDefault[0] : _.used[0]).isLazy;
		const value = (isLazy ? _util.msLazyGetModule : _util.msGetModule)([moduleIdentifier]);

		const usedDefault = _.opUseDefault.map(function (def) {
			const defexp = _util.msGetDefaultExport([moduleIdentifier]);
			const val = isLazy ? _util.lazyWrap(defexp) : defexp;
			const vd = _esastDistAst.VariableDeclarator(_esastUtil.idForDeclareCached(def), val);
			vd.loc = def.loc;
			return vd;
		});

		const usedDestruct = _UBag.isEmpty(_.used) ? [] : _util.makeDestructureDeclarators(cx, _.loc, _.used, isLazy, value, '=', true);
		usedDestruct.forEach(function (_) {
			return _.loc = _.loc;
		});

		return usedDefault.concat(usedDestruct);
	};

	const useIdentifier = function (use, i) {
		return _esastDistUtil.idCached('' + _UBag.last(use.path.split('/')) + '_' + i);
	},
	     

	// const exports = { }
	DeclareExports = _esastDistAst.VariableDeclaration('const', [_esastDistAst.VariableDeclarator(_util.IdExports, _esastDistAst.ObjectExpression([]))]),
	      lazyBody = function (body) {
		return _esastDistAst.ExpressionStatement(_esastDistSpecialize.assignmentExpressionPlain(_esastDistUtil.member(_util.IdExports, '_get'), _util.msLazy([_esastDistAst.FunctionExpression(null, [], body)])));
	},
	     

	// if (typeof define !== 'function') var define = require('amdefine')(module)
	AmdefineHeader = _esastDistAst.IfStatement(_esastDistAst.BinaryExpression('!==', _esastDistAst.UnaryExpression('typeof', _util.IdDefine), _esastDistAst.Literal('function')), _esastDistAst.VariableDeclaration('var', [_esastDistAst.VariableDeclarator(_util.IdDefine, _esastDistAst.CallExpression(_esastDistAst.CallExpression(_esastDistAst.Identifier('require'), [_esastDistAst.Literal('amdefine')]), [_util.IdModule]))])),
	      UseStrict = _esastDistAst.ExpressionStatement(_esastDistAst.Literal('use strict')),
	      AmdFirstUses = [_esastDistAst.Literal('exports')],
	      AmdFirstArgs = [_util.IdExports];
});
//# sourceMappingURL=../../../../meta/compile/private/transpile/transpileModule.js.map