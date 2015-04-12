if (typeof define !== 'function') var define = require('amdefine')(module);define(["exports", "module", "esast/dist/ast", "esast/dist/util", "esast/dist/specialize", "../../Expression", "../manglePath", "../U/Bag", "../U/Op", "./esast-util", "./util"], function (exports, module, _esastDistAst, _esastDistUtil, _esastDistSpecialize, _Expression, _manglePath, _UBag, _UOp, _esastUtil, _util) {
	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var ArrayExpression = _esastDistAst.ArrayExpression;
	var BinaryExpression = _esastDistAst.BinaryExpression;
	var BlockStatement = _esastDistAst.BlockStatement;
	var CallExpression = _esastDistAst.CallExpression;
	var Identifier = _esastDistAst.Identifier;
	var ExpressionStatement = _esastDistAst.ExpressionStatement;
	var FunctionExpression = _esastDistAst.FunctionExpression;
	var IfStatement = _esastDistAst.IfStatement;
	var Literal = _esastDistAst.Literal;
	var ObjectExpression = _esastDistAst.ObjectExpression;
	var Program = _esastDistAst.Program;
	var ReturnStatement = _esastDistAst.ReturnStatement;
	var UnaryExpression = _esastDistAst.UnaryExpression;
	var VariableDeclaration = _esastDistAst.VariableDeclaration;
	var VariableDeclarator = _esastDistAst.VariableDeclarator;
	var idCached = _esastDistUtil.idCached;
	var member = _esastDistUtil.member;
	var assignmentExpressionPlain = _esastDistSpecialize.assignmentExpressionPlain;
	var UseDo = _Expression.UseDo;

	var manglePath = _interopRequire(_manglePath);

	var flatMap = _UBag.flatMap;
	var isEmpty = _UBag.isEmpty;
	var last = _UBag.last;
	var push = _UBag.push;
	var None = _UOp.None;
	var opIf = _UOp.opIf;
	var idForDeclareCached = _esastUtil.idForDeclareCached;
	var t = _util.t;
	var IdDefine = _util.IdDefine;
	var IdExports = _util.IdExports;
	var IdModule = _util.IdModule;
	var lazyWrap = _util.lazyWrap;
	var msGetModule = _util.msGetModule;
	var msLazyGetModule = _util.msLazyGetModule;
	var msGetDefaultExport = _util.msGetDefaultExport;
	var makeDestructureDeclarators = _util.makeDestructureDeclarators;
	var msLazy = _util.msLazy;

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

	module.exports = function (_, tx) {
		const allUses = _.doUses.concat(_.uses, _.debugUses);
		const amdNames = ArrayExpression(AmdFirstUses.concat(allUses.map(function (use) {
			return Literal(manglePath(use.path, tx));
		})));
		const useIdentifiers = allUses.map(useIdentifier);
		const amdArgs = AmdFirstArgs.concat(useIdentifiers);
		const useDos = _.doUses.map(function (use, i) {
			const d = ExpressionStatement(msGetModule([useIdentifiers[i]]));
			d.loc = use.loc;
			return d;
		});
		const allUseDeclarators = flatMap(_.uses.concat(_.debugUses), function (use, i) {
			return useDeclarators(tx, use, useIdentifiers[i + _.doUses.length]);
		});
		const opUseDeclare = opIf(!isEmpty(allUseDeclarators), function () {
			return VariableDeclaration("const", allUseDeclarators);
		});

		// TODO: Some way of determining when it's OK for a module to not be lazy.
		const isLazy = tx.opts().lazyModule();

		const lead = useDos.concat(opUseDeclare, opIf(isLazy, function () {
			return DeclareExports;
		}));
		const trail = [ReturnStatement(IdExports)];
		const moduleBody = t(tx, lead, None, trail)(_.block);
		const body = isLazy ? BlockStatement([lazyBody(moduleBody)]) : moduleBody;

		const doDefine = ExpressionStatement(CallExpression(IdDefine, [amdNames, FunctionExpression(null, amdArgs, body)]));

		return Program([UseStrict].concat(opIf(tx.opts().amdefine(), function () {
			return AmdefineHeader;
		}), [doDefine]));
	};

	const useDeclarators = function (tx, _, moduleIdentifier) {
		// TODO: Could be neater about this
		const isLazy = (isEmpty(_.used) ? _.opUseDefault[0] : _.used[0]).isLazy;
		const value = (isLazy ? msLazyGetModule : msGetModule)([moduleIdentifier]);

		const usedDefault = _.opUseDefault.map(function (def) {
			const defexp = msGetDefaultExport([moduleIdentifier]);
			const val = isLazy ? lazyWrap(defexp) : defexp;
			const vd = VariableDeclarator(idForDeclareCached(def), val);
			vd.loc = def.loc;
			return vd;
		});

		const usedDestruct = isEmpty(_.used) ? [] : makeDestructureDeclarators(tx, _.loc, _.used, isLazy, value, "=", true);
		usedDestruct.forEach(function (_) {
			return _.loc = _.loc;
		});

		return usedDefault.concat(usedDestruct);
	};

	const useIdentifier = function (use, i) {
		return idCached("" + last(use.path.split("/")) + "_" + i);
	},
	     

	// const exports = { }
	DeclareExports = VariableDeclaration("const", [VariableDeclarator(IdExports, ObjectExpression([]))]),
	      lazyBody = function (body) {
		return ExpressionStatement(assignmentExpressionPlain(member(IdExports, "_get"), msLazy([FunctionExpression(null, [], body)])));
	},
	     

	// if (typeof define !== 'function') var define = require('amdefine')(module)
	AmdefineHeader = IfStatement(BinaryExpression("!==", UnaryExpression("typeof", IdDefine), Literal("function")), VariableDeclaration("var", [VariableDeclarator(IdDefine, CallExpression(CallExpression(Identifier("require"), [Literal("amdefine")]), [IdModule]))])),
	      UseStrict = ExpressionStatement(Literal("use strict")),
	      AmdFirstUses = [Literal("exports")],
	      AmdFirstArgs = [IdExports];
});
//# sourceMappingURL=../../../../meta/compile/private/transpile/transpileModule.js.map