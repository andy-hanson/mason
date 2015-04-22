if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'esast/dist/ast', 'esast/dist/util', '../U/Bag', '../U/Op', '../U/util', './transpile', './esast-util'], function (exports, _esastDistAst, _esastDistUtil, _UBag, _UOp, _UUtil, _transpile, _esastUtil) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	const LitEmptyArray = _esastDistAst.ArrayExpression([]),
	      LitEmptyString = _esastDistAst.Literal(''),
	      LitNull = _esastDistAst.Literal(null),
	      LitStrDisplayName = _esastDistAst.Literal('displayName'),
	      Break = _esastDistAst.BreakStatement(),
	      ReturnRes = _esastDistAst.ReturnStatement(_esastDistAst.Identifier('res')),
	      IdDefine = _esastDistAst.Identifier('define'),
	      IdDisplayName = _esastDistAst.Identifier('displayName'),
	      IdExports = _esastDistAst.Identifier('exports'),
	      IdArguments = _esastDistAst.Identifier('arguments'),
	      IdArraySliceCall = _esastDistUtil.member(_esastDistUtil.member(LitEmptyArray, 'slice'), 'call'),
	      IdFunctionApplyCall = _esastDistUtil.member(_esastDistUtil.member(_esastDistAst.Identifier('Function'), 'apply'), 'call'),
	      IdModule = _esastDistAst.Identifier('module'),
	      IdMs = _esastDistAst.Identifier('_ms');

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
		const m = _esastDistUtil.member(IdMs, name);
		return function (args) {
			return _esastDistAst.CallExpression(m, args);
		};
	};
	const msGetDefaultExport = ms('getDefaultExport'),
	      msGet = ms('get'),
	      msGetModule = ms('getModule'),
	      msLazyGetModule = ms('lazyGetModule'),
	      msArr = ms('arr'),
	      msBool = ms('bool'),
	      msLset = ms('lset'),
	      msSet = ms('set'),
	      msMap = ms('map'),
	      msShow = ms('show'),
	      msCheckContains = ms('checkContains'),
	      msUnlazy = ms('unlazy'),
	      msLazy = ms('lazy'),
	      msLazyGet = ms('lazyProp');

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
	const makeDestructureDeclarators = function (cx, loc, assignees, isLazy, value, k, isModule) {
		const destructuredName = '_$' + loc.start.line;
		const idDestructured = _esastDistAst.Identifier(destructuredName);
		const declarators = assignees.map(function (assignee) {
			// TODO: Don't compile it if it's never accessed
			const get = getMember(cx, idDestructured, assignee.name, isLazy, isModule);
			return makeDeclarator(cx, assignee.loc, assignee, k, get, isLazy);
		});
		// Getting lazy module is done by ms.lazyGetModule.
		const val = isLazy && !isModule ? lazyWrap(value) : value;
		return _UBag.unshift(_esastDistAst.VariableDeclarator(idDestructured, val), declarators);
	};

	exports.makeDestructureDeclarators = makeDestructureDeclarators;
	const getMember = function (cx, astObject, gotName, isLazy, isModule) {
		if (isLazy) return msLazyGet([astObject, _esastDistAst.Literal(gotName)]);else if (isModule && cx.opts.includeUseChecks()) return msGet([astObject, _esastDistAst.Literal(gotName)]);else return _esastDistUtil.member(astObject, gotName);
	};

	const makeDeclarator = function (cx, loc, assignee, k, value, valueIsAlreadyLazy) {
		// TODO: assert(isEmpty(assignee.opType))
		// or TODO: Allow type check on lazy value?
		value = assignee.isLazy ? value : maybeWrapInCheckContains(cx, value, assignee.opType, assignee.name);
		switch (k) {
			case '=':case '. ':case '<~':case '<~~':
				{
					const val = assignee.isLazy && !valueIsAlreadyLazy ? lazyWrap(value) : value;
					_UUtil.assert(assignee.isLazy || !valueIsAlreadyLazy);
					return _esastDistAst.VariableDeclarator(_esastUtil.idForDeclareCached(assignee), val);
				}
			case 'export':
				{
					// TODO:ES6
					_UUtil.assert(!assignee.isLazy);
					return _esastDistAst.VariableDeclarator(_esastUtil.idForDeclareCached(assignee), _esastDistAst.AssignmentExpression('=', _esastDistUtil.member(IdExports, assignee.name), value));
				}
			default:
				throw new Error(k);
		}
	};

	exports.makeDeclarator = makeDeclarator;
	const accessLocal = function (localAccess, vr) {
		return accessLocalDeclare(vr.accessToLocal.get(localAccess));
	};

	exports.accessLocal = accessLocal;
	const accessLocalDeclare = function (localDeclare) {
		return localDeclare.isLazy ? msUnlazy([_esastUtil.idForDeclareCached(localDeclare)]) : _esastUtil.idForDeclareNew(localDeclare);
	};

	exports.accessLocalDeclare = accessLocalDeclare;
	const maybeWrapInCheckContains = function (cx, ast, opType, name) {
		return cx.opts.includeTypeChecks() ? _UOp.ifElse(opType, function (typ) {
			return msCheckContains([_transpile.t(typ), ast, _esastDistAst.Literal(name)]);
		}, function () {
			return ast;
		}) : ast;
	};

	exports.maybeWrapInCheckContains = maybeWrapInCheckContains;
	const opLocalCheck = function (cx, local, isLazy) {
		// TODO: Way to typecheck lazies
		if (!cx.opts.includeTypeChecks() || isLazy) return _UOp.None;else return local.opType.map(function (typ) {
			return _esastDistAst.ExpressionStatement(msCheckContains([_transpile.t(typ), accessLocalDeclare(local), _esastDistAst.Literal(local.name)]));
		});
	};

	exports.opLocalCheck = opLocalCheck;
	const lazyWrap = function (value) {
		return msLazy([_esastDistUtil.thunk(value)]);
	};
	exports.lazyWrap = lazyWrap;
});
//# sourceMappingURL=../../../../meta/compile/private/transpile/util.js.map