if (typeof define !== 'function') var define = require('amdefine')(module);define(["exports", "esast/dist/ast", "esast/dist/Loc", "esast/dist/util", "../../Expression", "../Lang", "../U/Bag", "../U/Op", "../U/type", "../U/util", "./esast-util", "./Tx"], function (exports, _esastDistAst, _esastDistLoc, _esastDistUtil, _Expression, _Lang, _UBag, _UOp, _UType, _UUtil, _esastUtil, _Tx) {
	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var ArrayExpression = _esastDistAst.ArrayExpression;
	var AssignmentExpression = _esastDistAst.AssignmentExpression;
	var BreakStatement = _esastDistAst.BreakStatement;
	var CallExpression = _esastDistAst.CallExpression;
	var ExpressionStatement = _esastDistAst.ExpressionStatement;
	var Identifier = _esastDistAst.Identifier;
	var Literal = _esastDistAst.Literal;
	var ReturnStatement = _esastDistAst.ReturnStatement;
	var VariableDeclarator = _esastDistAst.VariableDeclarator;

	var Loc = _interopRequire(_esastDistLoc);

	var member = _esastDistUtil.member;
	var thunk = _esastDistUtil.thunk;

	var Expression = _interopRequire(_Expression);

	var LocalAccess = _Expression.LocalAccess;
	var LocalDeclare = _Expression.LocalDeclare;
	var KAssign = _Lang.KAssign;
	var flatMap = _UBag.flatMap;
	var isEmpty = _UBag.isEmpty;
	var unshift = _UBag.unshift;
	var ifElse = _UOp.ifElse;
	var None = _UOp.None;

	var type = _interopRequire(_UType);

	var assert = _UUtil.assert;
	var idForDeclareCached = _esastUtil.idForDeclareCached;
	var idForDeclareNew = _esastUtil.idForDeclareNew;

	var Tx = _interopRequire(_Tx);

	const t = function (tx, arg, arg2, arg3) {
		return function (expr) {
			const ast = expr.transpileSubtree(expr, tx, arg, arg2, arg3);
			if (tx.opts().sourceMap()) {
				const setLoc = function (_) {
					_.loc = expr.loc;
				};
				if (ast instanceof Array)
					// This is only allowed inside of Blocks, which use `toStatements`.
					ast.forEach(setLoc);else setLoc(ast);
			}
			return ast;
		};
	};

	exports.t = t;
	const LitEmptyArray = ArrayExpression([]),
	      LitEmptyString = Literal(""),
	      LitNull = Literal(null),
	      LitStrDisplayName = Literal("displayName"),
	      Break = BreakStatement(),
	      ReturnRes = ReturnStatement(Identifier("res")),
	      IdDefine = Identifier("define"),
	      IdDisplayName = Identifier("displayName"),
	      IdExports = Identifier("exports"),
	      IdArguments = Identifier("arguments"),
	      IdArraySliceCall = member(member(LitEmptyArray, "slice"), "call"),
	      IdFunctionApplyCall = member(member(Identifier("Function"), "apply"), "call"),
	      IdModule = Identifier("module"),
	      IdMs = Identifier("_ms");

	exports.LitEmptyArray = LitEmptyArray;
	exports.LitEmptyString = LitEmptyString;
	exports.LitNull = LitNull;
	exports.LitStrDisplayName = LitStrDisplayName;
	exports.Break = Break;
	exports.ReturnRes = ReturnRes;
	exports.IdDefine = IdDefine;
	exports.IdDisplayName = IdDisplayName;
	exports.IdExports = IdExports;
	exports.IdArguments = IdArguments;
	exports.IdArraySliceCall = IdArraySliceCall;
	exports.IdFunctionApplyCall = IdFunctionApplyCall;
	exports.IdModule = IdModule;
	exports.IdMs = IdMs;
	const ms = function (name) {
		const m = member(IdMs, name);
		return function (args) {
			return CallExpression(m, args);
		};
	};
	const msGetDefaultExport = ms("getDefaultExport"),
	      msGet = ms("get"),
	      msGetModule = ms("getModule"),
	      msLazyGetModule = ms("lazyGetModule"),
	      msArr = ms("arr"),
	      msBool = ms("bool"),
	      msLset = ms("lset"),
	      msSet = ms("set"),
	      msMap = ms("map"),
	      msShow = ms("show"),
	      msCheckContains = ms("checkContains"),
	      msUnlazy = ms("unlazy"),
	      msLazy = ms("lazy"),
	      msLazyGet = ms("lazyProp");

	exports.msGetDefaultExport = msGetDefaultExport;
	exports.msGet = msGet;
	exports.msGetModule = msGetModule;
	exports.msLazyGetModule = msLazyGetModule;
	exports.msArr = msArr;
	exports.msBool = msBool;
	exports.msLset = msLset;
	exports.msSet = msSet;
	exports.msMap = msMap;
	exports.msShow = msShow;
	exports.msCheckContains = msCheckContains;
	exports.msUnlazy = msUnlazy;
	exports.msLazy = msLazy;
	exports.msLazyGet = msLazyGet;
	const makeDestructureDeclarators = function (tx, loc, assignees, isLazy, value, k, isModule) {
		type(tx, Tx, loc, Loc, assignees, [LocalDeclare], isLazy, Boolean, value, Object, k, KAssign, isModule, Boolean);
		const destructuredName = "_$" + loc.start.line;
		const idDestructured = Identifier(destructuredName);
		const declarators = assignees.map(function (assignee) {
			// TODO: Don't compile it if it's never accessed
			const get = getMember(tx, idDestructured, assignee.name, isLazy, isModule);
			return makeDeclarator(tx, assignee.loc, assignee, k, get, isLazy);
		});
		// Getting lazy module is done by ms.lazyGetModule.
		const val = isLazy && !isModule ? lazyWrap(value) : value;
		return unshift(VariableDeclarator(idDestructured, val), declarators);
	};

	exports.makeDestructureDeclarators = makeDestructureDeclarators;
	const getMember = function (tx, astObject, gotName, isLazy, isModule) {
		type(astObject, Object, gotName, String, isLazy, Boolean, isModule, Boolean);
		if (isLazy) return msLazyGet([astObject, Literal(gotName)]);else if (isModule && tx.opts().includeUseChecks()) return msGet([astObject, Literal(gotName)]);else return member(astObject, gotName);
	};

	const makeDeclarator = function (tx, loc, assignee, k, value, valueIsAlreadyLazy) {
		type(tx, Tx, loc, Loc, assignee, Expression, k, KAssign, value, Object);
		// TODO: assert(isEmpty(assignee.opType))
		// or TODO: Allow type check on lazy value?
		value = assignee.isLazy ? value : maybeWrapInCheckContains(value, tx, assignee.opType, assignee.name);
		switch (k) {
			case "=":case ". ":case "<~":case "<~~":
				{
					const val = assignee.isLazy && !valueIsAlreadyLazy ? lazyWrap(value) : value;
					assert(assignee.isLazy || !valueIsAlreadyLazy);
					return VariableDeclarator(idForDeclareCached(assignee), val);
				}
			case "export":
				{
					// TODO:ES6
					assert(!assignee.isLazy);
					return VariableDeclarator(idForDeclareCached(assignee), AssignmentExpression("=", member(IdExports, assignee.name), value));
				}
			default:
				throw new Error(k);
		}
	};

	exports.makeDeclarator = makeDeclarator;
	const accessLocal = function (tx, localAccess) {
		type(tx, Tx, localAccess, LocalAccess);
		return accessLocalDeclare(tx.vr.accessToLocal.get(localAccess));
	};
	exports.accessLocal = accessLocal;
	const accessLocalDeclare = function (localDeclare) {
		type(localDeclare, LocalDeclare);
		return localDeclare.isLazy ? msUnlazy([idForDeclareCached(localDeclare)]) : idForDeclareNew(localDeclare);
	};

	exports.accessLocalDeclare = accessLocalDeclare;
	const maybeWrapInCheckContains = function (ast, tx, opType, name) {
		return tx.opts().includeTypeChecks() ? ifElse(opType, function (typ) {
			return msCheckContains([t(tx)(typ), ast, Literal(name)]);
		}, function () {
			return ast;
		}) : ast;
	};

	exports.maybeWrapInCheckContains = maybeWrapInCheckContains;
	const opLocalCheck = function (tx, local, isLazy) {
		type(tx, Tx, local, LocalDeclare, isLazy, Boolean);
		// TODO: Way to typecheck lazies
		if (!tx.opts().includeTypeChecks() || isLazy) return None;
		return local.opType.map(function (typ) {
			return ExpressionStatement(msCheckContains([t(tx)(typ), accessLocalDeclare(local), Literal(local.name)]));
		});
	};

	exports.opLocalCheck = opLocalCheck;
	const lazyWrap = function (value) {
		return msLazy([thunk(value)]);
	};
	exports.lazyWrap = lazyWrap;
});
//# sourceMappingURL=../../../../meta/compile/private/transpile/util.js.map