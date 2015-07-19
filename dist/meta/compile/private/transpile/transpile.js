if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'esast/dist/ast', 'esast/dist/util', 'esast/dist/specialize', '../../MsAst', '../manglePath', '../util', './ast-constants', './ms-call', './util'], function (exports, _esastDistAst, _esastDistUtil, _esastDistSpecialize, _MsAst, _manglePath, _util, _astConstants, _msCall, _util2) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _manglePath2 = _interopRequireDefault(_manglePath);

	let context, verifyResults, isInGenerator;

	exports.default = (_context, moduleExpression, _verifyResults) => {
		context = _context;
		verifyResults = _verifyResults;
		isInGenerator = false;
		const res = t0(moduleExpression);
		// Release for garbage collection.
		context = verifyResults = undefined;
		return res;
	};

	const t0 = expr => (0, _esastDistUtil.loc)(expr.transpileSubtree(), expr.loc);
	exports.t0 = t0;
	const t1 = (expr, arg) => (0, _esastDistUtil.loc)(expr.transpileSubtree(arg), expr.loc),
	      t3 = (expr, arg, arg2, arg3) => (0, _esastDistUtil.loc)(expr.transpileSubtree(arg, arg2, arg3), expr.loc),
	      tLines = exprs => {
		const out = [];
		for (const expr of exprs) {
			const ast = expr.transpileSubtree();
			if (ast instanceof Array)
				// Debug may produce multiple statements.
				for (const _ of ast) out.push((0, _esastDistUtil.toStatement)(_));else out.push((0, _esastDistUtil.loc)((0, _esastDistUtil.toStatement)(ast), expr.loc));
		}
		return out;
	};

	(0, _util.implementMany)(_MsAst, 'transpileSubtree', {
		Assert() {
			const failCond = () => {
				const cond = (0, _msCall.msBool)(t0(this.condition));
				return this.negate ? cond : (0, _esastDistAst.UnaryExpression)('!', cond);
			};

			return (0, _util.ifElse)(this.opThrown, thrown => (0, _esastDistAst.IfStatement)(failCond(), (0, _esastDistAst.ThrowStatement)((0, _msCall.msError)(t0(thrown)))), () => {
				if (this.condition instanceof _MsAst.Call) {
					const call = this.condition;
					const anySplat = call.args.some(_ => _ instanceof _MsAst.Splat);
					context.check(!anySplat, call.loc, 'TODO: Splat args in assert');
					const ass = this.negate ? _msCall.msAssertNot : _msCall.msAssert;
					return ass(t0(call.called), ...call.args.map(t0));
				} else return (0, _esastDistAst.IfStatement)(failCond(), _astConstants.ThrowAssertFail);
			});
		},

		AssignSingle(valWrap) {
			const val = valWrap === undefined ? t0(this.value) : valWrap(t0(this.value));
			const declare = makeDeclarator(this.assignee, val, false, verifyResults.isExportAssign(this));
			return (0, _esastDistAst.VariableDeclaration)(this.assignee.isMutable() ? 'let' : 'const', [declare]);
		},
		// TODO:ES6 Just use native destructuring assign
		AssignDestructure() {
			return (0, _esastDistAst.VariableDeclaration)(this.kind() === _MsAst.LD_Mutable ? 'let' : 'const', makeDestructureDeclarators(this.assignees, this.kind() === _MsAst.LD_Lazy, t0(this.value), false, verifyResults.isExportAssign(this)));
		},

		BagEntry() {
			return (0, _msCall.msAdd)(_astConstants.IdBuilt, t0(this.value));
		},

		BagEntryMany() {
			return (0, _msCall.msAddMany)(_astConstants.IdBuilt, t0(this.value));
		},

		BagSimple() {
			return (0, _esastDistAst.ArrayExpression)(this.parts.map(t0));
		},

		BlockDo(lead, opDeclareRes, opOut) {
			//todo:es6
			if (lead === undefined) lead = null;
			if (opDeclareRes === undefined) opDeclareRes = null;
			if (opOut === undefined) opOut = null;
			(0, _util.assert)(opDeclareRes === null);
			return (0, _esastDistAst.BlockStatement)((0, _util.cat)(lead, tLines(this.lines), opOut));
		},

		BlockValThrow(lead, opDeclareRes, opOut) {
			//todo:es6
			if (lead === undefined) lead = null;
			if (opDeclareRes === undefined) opDeclareRes = null;
			if (opOut === undefined) opOut = null;
			context.warnIf(opDeclareRes !== null || opOut !== null, this.loc, 'Out condition ignored because of oh-no!');
			return (0, _esastDistAst.BlockStatement)((0, _util.cat)(lead, tLines(this.lines), t0(this._throw)));
		},

		BlockWithReturn(lead, opDeclareRes, opOut) {
			return transpileBlock(t0(this.returned), tLines(this.lines), lead, opDeclareRes, opOut);
		},

		BlockBag(lead, opDeclareRes, opOut) {
			return transpileBlock(_astConstants.IdBuilt, (0, _util.cat)(_astConstants.DeclareBuiltBag, tLines(this.lines)), lead, opDeclareRes, opOut);
		},

		BlockObj(lead, opDeclareRes, opOut) {
			const lines = (0, _util.cat)(_astConstants.DeclareBuiltObj, tLines(this.lines));
			const res = (0, _util.ifElse)(this.opObjed, objed => (0, _util.ifElse)(this.opName, name => (0, _msCall.msSet)(t0(objed), _astConstants.IdBuilt, (0, _esastDistAst.Literal)(name)), () => (0, _msCall.msSet)(t0(objed), _astConstants.IdBuilt)), () => (0, _util.ifElse)(this.opName, _ => (0, _msCall.msSetName)(_astConstants.IdBuilt, (0, _esastDistAst.Literal)(_)), () => _astConstants.IdBuilt));
			return transpileBlock(res, lines, lead, opDeclareRes, opOut);
		},

		BlockMap(lead, opDeclareRes, opOut) {
			return transpileBlock(_astConstants.IdBuilt, (0, _util.cat)(_astConstants.DeclareBuiltMap, tLines(this.lines)), lead, opDeclareRes, opOut);
		},

		BlockWrap() {
			return blockWrap(t0(this.block));
		},

		BreakDo() {
			return (0, _esastDistAst.BreakStatement)();
		},

		BreakVal() {
			return (0, _esastDistAst.ReturnStatement)(t0(this.value));
		},

		Call() {
			const anySplat = this.args.some(arg => arg instanceof _MsAst.Splat);
			if (anySplat) {
				const args = this.args.map(arg => arg instanceof _MsAst.Splat ? (0, _msCall.msArr)(t0(arg.splatted)) : t0(arg));
				return (0, _esastDistAst.CallExpression)(_astConstants.IdFunctionApplyCall, [t0(this.called), _astConstants.LitNull, (0, _esastDistAst.CallExpression)((0, _esastDistUtil.member)(_astConstants.LitEmptyArray, 'concat'), args)]);
			} else return (0, _esastDistAst.CallExpression)(t0(this.called), this.args.map(t0));
		},

		CaseDo() {
			const body = caseBody(this.parts, this.opElse);
			return (0, _util.ifElse)(this.opCased, _ => (0, _esastDistAst.BlockStatement)([t0(_), body]), () => body);
		},

		CaseVal() {
			const body = caseBody(this.parts, this.opElse);
			const block = (0, _util.ifElse)(this.opCased, _ => [t0(_), body], () => [body]);
			return blockWrap((0, _esastDistAst.BlockStatement)(block));
		},

		CaseDoPart: casePart,
		CaseValPart: casePart,

		Class() {
			const methods = (0, _util.cat)(this.statics.map(methodDefinition(false, true)), (0, _util.opMap)(this.opConstructor, methodDefinition(true, false)), this.methods.map(methodDefinition(false, false)));
			const opName = (0, _util.opMap)(this.opName, _esastDistUtil.idCached);
			return (0, _esastDistAst.ClassExpression)(opName, (0, _util.opMap)(this.superClass, t0), (0, _esastDistAst.ClassBody)(methods));
		},

		ConditionalDo() {
			return (0, _esastDistAst.IfStatement)(this.isUnless ? (0, _esastDistAst.UnaryExpression)('!', maybeBoolWrap(t0(this.test))) : t0(this.test), t0(this.result));
		},

		ConditionalVal() {
			const test = maybeBoolWrap(t0(this.test));
			const result = (0, _msCall.msSome)(blockWrap(t0(this.result)));
			return this.isUnless ? (0, _esastDistAst.ConditionalExpression)(test, _msCall.MsNone, result) : (0, _esastDistAst.ConditionalExpression)(test, result, _msCall.MsNone);
		},

		Catch() {
			return (0, _esastDistAst.CatchClause)(t0(this.caught), t0(this.block));
		},

		Continue() {
			return (0, _esastDistAst.ContinueStatement)();
		},

		// TODO: includeInoutChecks is misnamed
		Debug() {
			return context.opts.includeInoutChecks() ? tLines(this.lines) : [];
		},

		ExceptDo() {
			return transpileExcept(this);
		},
		ExceptVal() {
			return blockWrap((0, _esastDistAst.BlockStatement)([transpileExcept(this)]));
		},

		ForDo() {
			return forLoop(this.opIteratee, this.block);
		},

		ForBag() {
			return blockWrap((0, _esastDistAst.BlockStatement)([_astConstants.DeclareBuiltBag, forLoop(this.opIteratee, this.block), _astConstants.ReturnBuilt]));
		},

		ForVal() {
			return blockWrap((0, _esastDistAst.BlockStatement)([forLoop(this.opIteratee, this.block)]));
		},

		Fun() {
			const oldInGenerator = isInGenerator;
			isInGenerator = this.isGenerator;

			// TODO:ES6 use `...`f
			const nArgs = (0, _esastDistAst.Literal)(this.args.length);
			const opDeclareRest = (0, _util.opMap)(this.opRestArg, rest => (0, _util2.declare)(rest, (0, _esastDistAst.CallExpression)(_astConstants.ArraySliceCall, [_astConstants.IdArguments, nArgs])));
			const argChecks = (0, _util.opIf)(context.opts.includeTypeChecks(), () => (0, _util.flatOpMap)(this.args, _util2.opTypeCheckForLocalDeclare));

			const _in = (0, _util.opMap)(this.opIn, t0);

			const opDeclareThis = (0, _util.opMap)(this.opDeclareThis, () => (0, _esastDistAst.VariableDeclaration)('const', [(0, _esastDistAst.VariableDeclarator)(_astConstants.IdLexicalThis, (0, _esastDistAst.ThisExpression)())]));

			const lead = (0, _util.cat)(opDeclareThis, opDeclareRest, argChecks, _in);

			const _out = (0, _util.opMap)(this.opOut, t0);
			const body = t3(this.block, lead, this.opDeclareRes, _out);
			const args = this.args.map(t0);
			isInGenerator = oldInGenerator;
			const id = (0, _util.opMap)(this.opName, _esastDistUtil.idCached);

			const canUseArrowFunction = id === null && opDeclareThis === null && opDeclareRest === null && !this.isGenerator;
			return canUseArrowFunction ? (0, _esastDistAst.ArrowFunctionExpression)(args, body) : (0, _esastDistAst.FunctionExpression)(id, args, body, this.isGenerator);
		},

		Lazy() {
			return (0, _msCall.lazyWrap)(t0(this.value));
		},

		NumberLiteral() {
			// Negative numbers are not part of ES spec.
			// http://www.ecma-international.org/ecma-262/5.1/#sec-7.8.3
			const lit = (0, _esastDistAst.Literal)(Math.abs(this.value));
			return (0, _util.isPositive)(this.value) ? lit : (0, _esastDistAst.UnaryExpression)('-', lit);
		},

		GlobalAccess() {
			return (0, _esastDistAst.Identifier)(this.name);
		},

		LocalAccess() {
			return this.name === 'this' ? (0, _esastDistAst.Identifier)('_this') : (0, _util2.accessLocalDeclare)(verifyResults.localDeclareForAccess(this));
		},

		LocalDeclare() {
			return (0, _util2.idForDeclareCached)(this);
		},

		LocalMutate() {
			return (0, _esastDistSpecialize.assignmentExpressionPlain)((0, _esastDistUtil.idCached)(this.name), t0(this.value));
		},

		Logic() {
			(0, _util.assert)(this.kind === _MsAst.L_And || this.kind === _MsAst.L_Or);
			const op = this.kind === _MsAst.L_And ? '&&' : '||';
			return (0, _util.tail)(this.args).reduce((a, b) => (0, _esastDistAst.LogicalExpression)(op, a, t0(b)), t0(this.args[0]));
		},

		MapEntry() {
			return (0, _msCall.msAssoc)(_astConstants.IdBuilt, t0(this.key), t0(this.val));
		},

		Member() {
			return (0, _esastDistUtil.member)(t0(this.object), this.name);
		},

		Module() {
			const body = (0, _util.cat)(tLines(this.lines), (0, _util.opMap)(this.opDefaultExport, _ => (0, _esastDistSpecialize.assignmentExpressionPlain)(_astConstants.ExportsDefault, t0(_))));
			return (0, _esastDistAst.Program)((0, _util.cat)((0, _util.opIf)(context.opts.includeUseStrict(), () => _astConstants.UseStrict), (0, _util.opIf)(context.opts.includeAmdefine(), () => _astConstants.AmdefineHeader), (0, _esastDistUtil.toStatement)(amdWrapModule(this.doUses, this.uses.concat(this.debugUses), body))));
		},

		New() {
			const anySplat = this.args.some(_ => _ instanceof _MsAst.Splat);
			context.check(!anySplat, this.loc, 'TODO: Splat params for new');
			return (0, _esastDistAst.NewExpression)(t0(this.type), this.args.map(t0));
		},

		Not() {
			return (0, _esastDistAst.UnaryExpression)('!', t0(this.arg));
		},

		ObjEntry() {
			return this.assign instanceof _MsAst.AssignSingle && !this.assign.assignee.isLazy() ? t1(this.assign, val => (0, _esastDistSpecialize.assignmentExpressionPlain)((0, _esastDistUtil.member)(_astConstants.IdBuilt, this.assign.assignee.name), val)) : (0, _util.cat)(t0(this.assign), this.assign.allAssignees().map(_ => (0, _msCall.msSetLazy)(_astConstants.IdBuilt, (0, _esastDistAst.Literal)(_.name), (0, _util2.idForDeclareCached)(_))));
		},

		ObjSimple() {
			return (0, _esastDistAst.ObjectExpression)(this.pairs.map(pair => (0, _esastDistSpecialize.property)('init', (0, _esastDistUtil.propertyIdOrLiteralCached)(pair.key), t0(pair.value))));
		},

		Quote() {
			if (this.parts.length === 0) return _astConstants.LitEmptyString;else {
				const quasis = [],
				      expressions = [];

				// TemplateLiteral must start with a TemplateElement
				if (typeof this.parts[0] !== 'string') quasis.push(_astConstants.EmptyTemplateElement);

				for (let part of this.parts) if (typeof part === 'string') quasis.push((0, _util2.templateElementForString)(part));else {
					// "{1}{1}" needs an empty quasi in the middle (and on the ends)
					if (quasis.length === expressions.length) quasis.push(_astConstants.EmptyTemplateElement);
					expressions.push((0, _msCall.msShow)(t0(part)));
				}

				// TemplateLiteral must end with a TemplateElement, so one more quasi than expression.
				if (quasis.length === expressions.length) quasis.push(_astConstants.EmptyTemplateElement);

				return (0, _esastDistAst.TemplateLiteral)(quasis, expressions);
			}
		},

		SpecialDo() {
			switch (this.kind) {
				case _MsAst.SD_Debugger:
					return (0, _esastDistAst.DebuggerStatement)();
				default:
					throw new Error(this.kind);
			}
		},

		SpecialVal() {
			// Make new objects because we will assign `loc` to them.
			switch (this.kind) {
				case _MsAst.SV_Contains:
					return (0, _esastDistUtil.member)(_msCall.IdMs, 'contains');
				case _MsAst.SV_False:
					return (0, _esastDistAst.Literal)(false);
				case _MsAst.SV_Null:
					return (0, _esastDistAst.Literal)(null);
				case _MsAst.SV_Sub:
					return (0, _esastDistUtil.member)(_msCall.IdMs, 'sub');
				case _MsAst.SV_ThisModuleDirectory:
					return (0, _esastDistAst.Identifier)('__dirname');
				case _MsAst.SV_True:
					return (0, _esastDistAst.Literal)(true);
				case _MsAst.SV_Undefined:
					return (0, _esastDistAst.UnaryExpression)('void', _astConstants.LitZero);
				default:
					throw new Error(this.kind);
			}
		},

		Throw() {
			return (0, _util.ifElse)(this.opThrown, _ => (0, _esastDistAst.ThrowStatement)((0, _msCall.msError)(t0(_))), () => (0, _esastDistAst.ThrowStatement)((0, _msCall.msError)(_astConstants.LitStrThrow)));
		},

		Yield() {
			return (0, _esastDistSpecialize.yieldExpressionNoDelegate)(t0(this.yielded));
		},

		YieldTo() {
			return (0, _esastDistSpecialize.yieldExpressionDelegate)(t0(this.yieldedTo));
		}
	});

	function casePart(alternate) {
		if (this.test instanceof _MsAst.Pattern) {
			var _test = this.test;
			const type = _test.type;
			const patterned = _test.patterned;
			const locals = _test.locals;

			const decl = (0, _esastDistAst.VariableDeclaration)('const', [(0, _esastDistAst.VariableDeclarator)(_astConstants.IdExtract, (0, _msCall.msExtract)(t0(type), t0(patterned)))]);
			const test = (0, _esastDistAst.BinaryExpression)('!==', _astConstants.IdExtract, _astConstants.LitNull);
			const extract = (0, _esastDistAst.VariableDeclaration)('const', locals.map((_, idx) => (0, _esastDistAst.VariableDeclarator)((0, _util2.idForDeclareCached)(_), (0, _esastDistSpecialize.memberExpression)(_astConstants.IdExtract, (0, _esastDistAst.Literal)(idx)))));
			const res = t1(this.result, extract);
			return (0, _esastDistAst.BlockStatement)([decl, (0, _esastDistAst.IfStatement)(test, res, alternate)]);
		} else
			// alternate written to by `caseBody`.
			return (0, _esastDistAst.IfStatement)(maybeBoolWrap(t0(this.test)), t0(this.result), alternate);
	}

	// Functions specific to certain expressions.
	const
	// Wraps a block (with `return` statements in it) in an IIFE.
	blockWrap = block => {
		const invoke = (0, _esastDistSpecialize.callExpressionThunk)((0, _esastDistSpecialize.functionExpressionThunk)(block, isInGenerator));
		return isInGenerator ? (0, _esastDistSpecialize.yieldExpressionDelegate)(invoke) : invoke;
	},
	      caseBody = (parts, opElse) => {
		let acc = (0, _util.ifElse)(opElse, t0, () => _astConstants.ThrowNoCaseMatch);
		for (let i = parts.length - 1; i >= 0; i = i - 1) acc = t1(parts[i], acc);
		return acc;
	},
	      forLoop = (opIteratee, block) => (0, _util.ifElse)(opIteratee, _ref => {
		let element = _ref.element;
		let bag = _ref.bag;

		const declare = (0, _esastDistAst.VariableDeclaration)('let', [(0, _esastDistAst.VariableDeclarator)(t0(element))]);
		return (0, _esastDistAst.ForOfStatement)(declare, t0(bag), t0(block));
	}, () => (0, _util2.forStatementInfinite)(t0(block))),
	      methodDefinition = (isConstructor, isStatic) => fun => {
		(0, _util.assert)(fun.opName !== null);
		const key = (0, _esastDistUtil.propertyIdOrLiteralCached)(fun.opName);
		const value = t0(fun);
		// This is handled by `key`.
		value.id = null;
		// TODO: get/set!
		const kind = isConstructor ? 'constructor' : 'method';
		// TODO: computed class properties
		const computed = false;
		return (0, _esastDistAst.MethodDefinition)(key, value, kind, isStatic, computed);
	},
	      transpileBlock = (returned, lines, lead, opDeclareRes, opOut) => {
		// TODO:ES6 Optional arguments
		if (lead === undefined) lead = null;
		if (opDeclareRes === undefined) opDeclareRes = null;
		if (opOut === undefined) opOut = null;
		const fin = (0, _util.ifElse)(opDeclareRes, rd => {
			const ret = maybeWrapInCheckContains(returned, rd.opType, rd.name);
			return (0, _util.ifElse)(opOut, _ => (0, _util.cat)((0, _util2.declare)(rd, ret), _, _astConstants.ReturnRes), () => (0, _esastDistAst.ReturnStatement)(ret));
		}, () => (0, _util.cat)(opOut, (0, _esastDistAst.ReturnStatement)(returned)));
		return (0, _esastDistAst.BlockStatement)((0, _util.cat)(lead, lines, fin));
	},
	      transpileExcept = except => (0, _esastDistAst.TryStatement)(t0(except._try), (0, _util.opMap)(except._catch, t0), (0, _util.opMap)(except._finally, t0));

	// Module helpers
	const amdWrapModule = (doUses, otherUses, body) => {
		const allUses = doUses.concat(otherUses);
		const usePaths = (0, _esastDistAst.ArrayExpression)((0, _util.cat)(_astConstants.LitStrExports, allUses.map(_ => (0, _esastDistAst.Literal)((0, _manglePath2.default)(_.path)))));
		const useIdentifiers = allUses.map((_, i) => (0, _esastDistUtil.idCached)(`${ pathBaseName(_.path) }_${ i }`));
		const useArgs = (0, _util.cat)(_astConstants.IdExports, useIdentifiers);
		const useDos = doUses.map((use, i) => (0, _esastDistUtil.loc)((0, _esastDistAst.ExpressionStatement)((0, _msCall.msGetModule)(useIdentifiers[i])), use.loc));
		const opUseDeclare = (0, _util.opIf)(!(0, _util.isEmpty)(otherUses), () => (0, _esastDistAst.VariableDeclaration)('const', (0, _util.flatMap)(otherUses, (use, i) => useDeclarators(use, useIdentifiers[i + doUses.length]))));
		const fullBody = (0, _esastDistAst.BlockStatement)((0, _util.cat)(useDos, opUseDeclare, body, _astConstants.ReturnExports));
		const lazyBody = context.opts.lazyModule() ? (0, _esastDistAst.BlockStatement)([(0, _esastDistAst.ExpressionStatement)((0, _esastDistSpecialize.assignmentExpressionPlain)(_astConstants.ExportsGet, (0, _msCall.msLazy)((0, _esastDistSpecialize.functionExpressionThunk)(fullBody))))]) : fullBody;
		return (0, _esastDistAst.CallExpression)(_astConstants.IdDefine, [usePaths, (0, _esastDistAst.ArrowFunctionExpression)(useArgs, lazyBody)]);
	},
	      pathBaseName = path => path.substr(path.lastIndexOf('/') + 1),
	      useDeclarators = (use, moduleIdentifier) => {
		// TODO: Could be neater about this
		const isLazy = ((0, _util.isEmpty)(use.used) ? use.opUseDefault : use.used[0]).isLazy();
		const value = (isLazy ? _msCall.msLazyGetModule : _msCall.msGetModule)(moduleIdentifier);

		const usedDefault = (0, _util.opMap)(use.opUseDefault, def => {
			const defexp = (0, _msCall.msGetDefaultExport)(moduleIdentifier);
			const val = isLazy ? (0, _msCall.lazyWrap)(defexp) : defexp;
			return (0, _esastDistUtil.loc)((0, _esastDistAst.VariableDeclarator)((0, _util2.idForDeclareCached)(def), val), def.loc);
		});

		const usedDestruct = (0, _util.isEmpty)(use.used) ? null : makeDestructureDeclarators(use.used, isLazy, value, true, false);

		return (0, _util.cat)(usedDefault, usedDestruct);
	};

	// General utils. Not in util.js because these close over context.
	const maybeBoolWrap = ast => context.opts.includeCaseChecks() ? (0, _msCall.msBool)(ast) : ast,
	      makeDestructureDeclarators = (assignees, isLazy, value, isModule, isExport) => {
		const destructuredName = `_$${ assignees[0].loc.start.line }`;
		const idDestructured = (0, _esastDistAst.Identifier)(destructuredName);
		const declarators = assignees.map(assignee => {
			// TODO: Don't compile it if it's never accessed
			const get = getMember(idDestructured, assignee.name, isLazy, isModule);
			return makeDeclarator(assignee, get, isLazy, isExport);
		});
		// Getting lazy module is done by ms.lazyGetModule.
		const val = isLazy && !isModule ? (0, _msCall.lazyWrap)(value) : value;
		return (0, _util.unshift)((0, _esastDistAst.VariableDeclarator)(idDestructured, val), declarators);
	},
	      makeDeclarator = (assignee, value, valueIsAlreadyLazy, isExport) => {
		const loc = assignee.loc;
		const name = assignee.name;
		const opType = assignee.opType;

		const isLazy = assignee.isLazy();
		// TODO: assert(assignee.opType === null)
		// or TODO: Allow type check on lazy value?
		value = isLazy ? value : maybeWrapInCheckContains(value, opType, name);
		if (isExport) {
			// TODO:ES6
			context.check(!isLazy, loc, 'Lazy export not supported.');
			return (0, _esastDistAst.VariableDeclarator)((0, _util2.idForDeclareCached)(assignee), (0, _esastDistSpecialize.assignmentExpressionPlain)((0, _esastDistUtil.member)(_astConstants.IdExports, name), value));
		} else {
			const val = isLazy && !valueIsAlreadyLazy ? (0, _msCall.lazyWrap)(value) : value;
			(0, _util.assert)(isLazy || !valueIsAlreadyLazy);
			return (0, _esastDistAst.VariableDeclarator)((0, _util2.idForDeclareCached)(assignee), val);
		}
	},
	      maybeWrapInCheckContains = (ast, opType, name) => context.opts.includeTypeChecks() && opType !== null ? (0, _msCall.msCheckContains)(t0(opType), ast, (0, _esastDistAst.Literal)(name)) : ast,
	      getMember = (astObject, gotName, isLazy, isModule) => isLazy ? (0, _msCall.msLazyGet)(astObject, (0, _esastDistAst.Literal)(gotName)) : isModule && context.opts.includeUseChecks() ? (0, _msCall.msGet)(astObject, (0, _esastDistAst.Literal)(gotName)) : (0, _esastDistUtil.member)(astObject, gotName);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS90cmFuc3BpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUEyQkEsS0FBSSxPQUFPLEVBQUUsYUFBYSxFQUFFLGFBQWEsQ0FBQTs7bUJBRTFCLENBQUMsUUFBUSxFQUFFLGdCQUFnQixFQUFFLGNBQWMsS0FBSztBQUM5RCxTQUFPLEdBQUcsUUFBUSxDQUFBO0FBQ2xCLGVBQWEsR0FBRyxjQUFjLENBQUE7QUFDOUIsZUFBYSxHQUFHLEtBQUssQ0FBQTtBQUNyQixRQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTs7QUFFaEMsU0FBTyxHQUFHLGFBQWEsR0FBRyxTQUFTLENBQUE7QUFDbkMsU0FBTyxHQUFHLENBQUE7RUFDVjs7QUFFTSxPQUNOLEVBQUUsR0FBRyxJQUFJLElBQUksbUJBbENLLEdBQUcsRUFrQ0osSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1NBQW5ELEVBQUUsR0FBRixFQUFFO0FBQ0gsT0FDQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxLQUFLLG1CQXBDRixHQUFHLEVBb0NHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDO09BQzdELEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksS0FBSyxtQkFyQ2QsR0FBRyxFQXFDZSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDO09BQ3JGLE1BQU0sR0FBRyxLQUFLLElBQUk7QUFDakIsUUFBTSxHQUFHLEdBQUcsRUFBRyxDQUFBO0FBQ2YsT0FBSyxNQUFNLElBQUksSUFBSSxLQUFLLEVBQUU7QUFDekIsU0FBTSxHQUFHLEdBQUcsSUFBSSxDQUFD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QWlpQnVCLElBQUksQ0FBQyxDQUFDLEdBQy9DLEdBQUc7T0FFTCxTQUFTLEdBQUcsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEtBQ2hELE1BQU0sR0FDTixZQW5oQm9GLFNBQVMsRUFtaEJuRixTQUFTLEVBQUUsa0JBdGlCVCxPQUFPLEVBc2lCVSxPQUFPLENBQUMsQ0FBQyxHQUN0QyxRQUFRLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxHQUMzQyxZQXJoQm9DLEtBQUssRUFxaEJuQyxTQUFTLEVBQUUsa0JBeGlCTCxPQUFPLEVBd2lCTSxPQUFPLENBQUMsQ0FBQyxHQUNsQyxtQkF0aUJzQixNQUFNLEVBc2lCckIsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFBIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS90cmFuc3BpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcnJheUV4cHJlc3Npb24sIEFycm93RnVuY3Rpb25FeHByZXNzaW9uLCBCaW5hcnlFeHByZXNzaW9uLCBCbG9ja1N0YXRlbWVudCwgQnJlYWtTdGF0ZW1lbnQsIENhbGxFeHByZXNzaW9uLFxuXHRDYXRjaENsYXVzZSwgQ2xhc3NCb2R5LCBDbGFzc0V4cHJlc3Npb24sIENvbmRpdGlvbmFsRXhwcmVzc2lvbiwgQ29udGludWVTdGF0ZW1lbnQsXG5cdERlYnVnZ2VyU3RhdGVtZW50LCBFeHByZXNzaW9uU3RhdGVtZW50LCBGb3JPZlN0YXRlbWVudCwgRnVuY3Rpb25FeHByZXNzaW9uLCBJZGVudGlmaWVyLFxuXHRJZlN0YXRlbWVudCwgTGl0ZXJhbCwgTG9naWNhbEV4cHJlc3Npb24sIE1ldGhvZERlZmluaXRpb24sIE5ld0V4cHJlc3Npb24sIE9iamVjdEV4cHJlc3Npb24sXG5cdFByb2dyYW0sIFJldHVyblN0YXRlbWVudCwgVGVtcGxhdGVMaXRlcmFsLCBUaGlzRXhwcmVzc2lvbiwgVGhyb3dTdGF0ZW1lbnQsIFRyeVN0YXRlbWVudCxcblx0VmFyaWFibGVEZWNsYXJhdGlvbiwgVW5hcnlFeHByZXNzaW9uLCBWYXJpYWJsZURlY2xhcmF0b3IgfSBmcm9tICdlc2FzdC9kaXN0L2FzdCdcbmltcG9ydCB7IGlkQ2FjaGVkLCBsb2MsIG1lbWJlciwgcHJvcGVydHlJZE9yTGl0ZXJhbENhY2hlZCwgdG9TdGF0ZW1lbnQgfSBmcm9tICdlc2FzdC9kaXN0L3V0aWwnXG5pbXBvcnQgeyBhc3NpZ25tZW50RXhwcmVzc2lvblBsYWluLCBjYWxsRXhwcmVzc2lvblRodW5rLCBmdW5jdGlvbkV4cHJlc3Npb25UaHVuaywgbWVtYmVyRXhwcmVzc2lvbixcblx0cHJvcGVydHksIHlpZWxkRXhwcmVzc2lvbkRlbGVnYXRlLCB5aWVsZEV4cHJlc3Npb25Ob0RlbGVnYXRlIH0gZnJvbSAnZXNhc3QvZGlzdC9zcGVjaWFsaXplJ1xuaW1wb3J0ICogYXMgTXNBc3RUeXBlcyBmcm9tICcuLi8uLi9Nc0FzdCdcbmltcG9ydCB7IEFzc2lnblNpbmdsZSwgQ2FsbCwgTF9BbmQsIExfT3IsIExEX0xhenksIExEX011dGFibGUsIFBhdHRlcm4sIFNwbGF0LCBTRF9EZWJ1Z2dlcixcblx0U1ZfQ29udGFpbnMsIFNWX0ZhbHNlLCBTVl9OdWxsLCBTVl9TdWIsIFNWX1RoaXNNb2R1bGVEaXJlY3RvcnksIFNWX1RydWUsIFNWX1VuZGVmaW5lZFxuXHR9IGZyb20gJy4uLy4uL01zQXN0J1xuaW1wb3J0IG1hbmdsZVBhdGggZnJvbSAnLi4vbWFuZ2xlUGF0aCdcbmltcG9ydCB7IGFzc2VydCwgY2F0LCBmbGF0TWFwLCBmbGF0T3BNYXAsIGlmRWxzZSwgaXNFbXB0eSxcblx0aW1wbGVtZW50TWFueSwgaXNQb3NpdGl2ZSwgb3BJZiwgb3BNYXAsIHRhaWwsIHVuc2hpZnQgfSBmcm9tICcuLi91dGlsJ1xuaW1wb3J0IHsgQW1kZWZpbmVIZWFkZXIsIEFycmF5U2xpY2VDYWxsLCBEZWNsYXJlQnVpbHRCYWcsIERlY2xhcmVCdWlsdE1hcCwgRGVjbGFyZUJ1aWx0T2JqLFxuXHRFbXB0eVRlbXBsYXRlRWxlbWVudCwgRXhwb3J0c0RlZmF1bHQsIEV4cG9ydHNHZXQsIElkQXJndW1lbnRzLCBJZEJ1aWx0LCBJZERlZmluZSwgSWRFeHBvcnRzLFxuXHRJZEV4dHJhY3QsIElkRnVuY3Rpb25BcHBseUNhbGwsIElkTGV4aWNhbFRoaXMsIExpdEVtcHR5QXJyYXksIExpdEVtcHR5U3RyaW5nLCBMaXROdWxsLFxuXHRMaXRTdHJFeHBvcnRzLCBMaXRTdHJUaHJvdywgTGl0WmVybywgUmV0dXJuQnVpbHQsIFJldHVybkV4cG9ydHMsIFJldHVyblJlcywgVGhyb3dBc3NlcnRGYWlsLFxuXHRUaHJvd05vQ2FzZU1hdGNoLCBVc2VTdHJpY3QgfSBmcm9tICcuL2FzdC1jb25zdGFudHMnXG5pbXBvcnQgeyBJZE1zLCBsYXp5V3JhcCwgbXNBZGQsIG1zQWRkTWFueSwgbXNBcnIsIG1zQXNzZXJ0LCBtc0Fzc2VydE5vdCwgbXNBc3NvYywgbXNCb29sLFxuXHRtc0NoZWNrQ29udGFpbnMsIG1zRXJyb3IsIG1zRXh0cmFjdCwgbXNHZXQsIG1zR2V0RGVmYXVsdEV4cG9ydCwgbXNHZXRNb2R1bGUsIG1zTGF6eSwgbXNMYXp5R2V0LFxuXHRtc0xhenlHZXRNb2R1bGUsIG1zU2V0LCBtc1NldE5hbWUsIG1zU2V0TGF6eSwgbXNTaG93LCBtc1NvbWUsIE1zTm9uZSB9IGZyb20gJy4vbXMtY2FsbCdcbmltcG9ydCB7IGFjY2Vzc0xvY2FsRGVjbGFyZSwgZGVjbGFyZSwgZm9yU3RhdGVtZW50SW5maW5pdGUsIGlkRm9yRGVjbGFyZUNhY2hlZCxcblx0b3BUeXBlQ2hlY2tGb3JMb2NhbERlY2xhcmUsIHRlbXBsYXRlRWxlbWVudEZvclN0cmluZyB9IGZyb20gJy4vdXRpbCdcblxubGV0IGNvbnRleHQsIHZlcmlmeVJlc3VsdHMsIGlzSW5HZW5lcmF0b3JcblxuZXhwb3J0IGRlZmF1bHQgKF9jb250ZXh0LCBtb2R1bGVFeHByZXNzaW9uLCBfdmVyaWZ5UmVzdWx0cykgPT4ge1xuXHRjb250ZXh0ID0gX2NvbnRleHRcblx0dmVyaWZ5UmVzdWx0cyA9IF92ZXJpZnlSZXN1bHRzXG5cdGlzSW5HZW5lcmF0b3IgPSBmYWxzZVxuXHRjb25zdCByZXMgPSB0MChtb2R1bGVFeHByZXNzaW9uKVxuXHQvLyBSZWxlYXNlIGZvciBnYXJiYWdlIGNvbGxlY3Rpb24uXG5cdGNvbnRleHQgPSB2ZXJpZnlSZXN1bHRzID0gdW5kZWZpbmVkXG5cdHJldHVybiByZXNcbn1cblxuZXhwb3J0IGNvbnN0XG5cdHQwID0gZXhwciA9PiBsb2MoZXhwci50cmFuc3BpbGVTdWJ0cmVlKCksIGV4cHIubG9jKVxuY29uc3Rcblx0dDEgPSAoZXhwciwgYXJnKSA9PiBsb2MoZXhwci50cmFuc3BpbGVTdWJ0cmVlKGFyZyksIGV4cHIubG9jKSxcblx0dDMgPSAoZXhwciwgYXJnLCBhcmcyLCBhcmczKSA9PiBsb2MoZXhwci50cmFuc3BpbGVTdWJ0cmVlKGFyZywgYXJnMiwgYXJnMyksIGV4cHIubG9jKSxcblx0dExpbmVzID0gZXhwcnMgPT4ge1xuXHRcdGNvbnN0IG91dCA9IFsgXVxuXHRcdGZvciAoY29uc3QgZXhwciBvZiBleHBycykge1xuXHRcdFx0Y29uc3QgYXN0ID0gZXhwci50cmFuc3BpbGVTdWJ0cmVlKClcblx0XHRcdGlmIChhc3QgaW5zdGFuY2VvZiBBcnJheSlcblx0XHRcdFx0Ly8gRGVidWcgbWF5IHByb2R1Y2UgbXVsdGlwbGUgc3RhdGVtZW50cy5cblx0XHRcdFx0Zm9yIChjb25zdCBfIG9mIGFzdClcblx0XHRcdFx0XHRvdXQucHVzaCh0b1N0YXRlbWVudChfKSlcblx0XHRcdGVsc2Vcblx0XHRcdFx0b3V0LnB1c2gobG9jKHRvU3RhdGVtZW50KGFzdCksIGV4cHIubG9jKSlcblx0XHR9XG5cdFx0cmV0dXJuIG91dFxuXHR9XG5cbmltcGxlbWVudE1hbnkoTXNBc3RUeXBlcywgJ3RyYW5zcGlsZVN1YnRyZWUnLCB7XG5cdEFzc2VydCgpIHtcblx0XHRjb25zdCBmYWlsQ29uZCA9ICgpID0+IHtcblx0XHRcdGNvbnN0IGNvbmQgPSBtc0Jvb2wodDAodGhpcy5jb25kaXRpb24pKVxuXHRcdFx0cmV0dXJuIHRoaXMubmVnYXRlID8gY29uZCA6IFVuYXJ5RXhwcmVzc2lvbignIScsIGNvbmQpXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGlmRWxzZSh0aGlzLm9wVGhyb3duLFxuXHRcdFx0dGhyb3duID0+IElmU3RhdGVtZW50KGZhaWxDb25kKCksIFRocm93U3RhdGVtZW50KG1zRXJyb3IodDAodGhyb3duKSkpKSxcblx0XHRcdCgpID0+IHtcblx0XHRcdFx0aWYgKHRoaXMuY29uZGl0aW9uIGluc3RhbmNlb2YgQ2FsbCkge1xuXHRcdFx0XHRcdGNvbnN0IGNhbGwgPSB0aGlzLmNvbmRpdGlvblxuXHRcdFx0XHRcdGNvbnN0IGFueVNwbGF0ID0gY2FsbC5hcmdzLnNvbWUoXyA9PiBfIGluc3RhbmNlb2YgU3BsYXQpXG5cdFx0XHRcdFx0Y29udGV4dC5jaGVjayghYW55U3BsYXQsIGNhbGwubG9jLCAnVE9ETzogU3BsYXQgYXJncyBpbiBhc3NlcnQnKVxuXHRcdFx0XHRcdGNvbnN0IGFzcyA9IHRoaXMubmVnYXRlID8gbXNBc3NlcnROb3QgOiBtc0Fzc2VydFxuXHRcdFx0XHRcdHJldHVybiBhc3ModDAoY2FsbC5jYWxsZWQpLCAuLi5jYWxsLmFyZ3MubWFwKHQwKSlcblx0XHRcdFx0fSBlbHNlXG5cdFx0XHRcdFx0cmV0dXJuIElmU3RhdGVtZW50KGZhaWxDb25kKCksIFRocm93QXNzZXJ0RmFpbClcblx0XHRcdH0pXG5cdH0sXG5cblx0QXNzaWduU2luZ2xlKHZhbFdyYXApIHtcblx0XHRjb25zdCB2YWwgPSB2YWxXcmFwID09PSB1bmRlZmluZWQgPyB0MCh0aGlzLnZhbHVlKSA6IHZhbFdyYXAodDAodGhpcy52YWx1ZSkpXG5cdFx0Y29uc3QgZGVjbGFyZSA9XG5cdFx0XHRtYWtlRGVjbGFyYXRvcih0aGlzLmFzc2lnbmVlLCB2YWwsIGZhbHNlLCB2ZXJpZnlSZXN1bHRzLmlzRXhwb3J0QXNzaWduKHRoaXMpKVxuXHRcdHJldHVybiBWYXJpYWJsZURlY2xhcmF0aW9uKHRoaXMuYXNzaWduZWUuaXNNdXRhYmxlKCkgPyAnbGV0JyA6ICdjb25zdCcsIFsgZGVjbGFyZSBdKVxuXHR9LFxuXHQvLyBUT0RPOkVTNiBKdXN0IHVzZSBuYXRpdmUgZGVzdHJ1Y3R1cmluZyBhc3NpZ25cblx0QXNzaWduRGVzdHJ1Y3R1cmUoKSB7XG5cdFx0cmV0dXJuIFZhcmlhYmxlRGVjbGFyYXRpb24odGhpcy5raW5kKCkgPT09IExEX011dGFibGUgPyAnbGV0JyA6ICdjb25zdCcsXG5cdFx0XHRtYWtlRGVzdHJ1Y3R1cmVEZWNsYXJhdG9ycyhcblx0XHRcdFx0dGhpcy5hc3NpZ25lZXMsXG5cdFx0XHRcdHRoaXMua2luZCgpID09PSBMRF9MYXp5LFxuXHRcdFx0XHR0MCh0aGlzLnZhbHVlKSxcblx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRcdHZlcmlmeVJlc3VsdHMuaXNFeHBvcnRBc3NpZ24odGhpcykpKVxuXHR9LFxuXG5cdEJhZ0VudHJ5KCkgeyByZXR1cm4gbXNBZGQoSWRCdWlsdCwgdDAodGhpcy52YWx1ZSkpIH0sXG5cblx0QmFnRW50cnlNYW55KCkgeyByZXR1cm4gbXNBZGRNYW55KElkQnVpbHQsIHQwKHRoaXMudmFsdWUpKSB9LFxuXG5cdEJhZ1NpbXBsZSgpIHsgcmV0dXJuIEFycmF5RXhwcmVzc2lvbih0aGlzLnBhcnRzLm1hcCh0MCkpIH0sXG5cblx0QmxvY2tEbyhsZWFkLCBvcERlY2xhcmVSZXMsIG9wT3V0KSB7XG5cdFx0Ly90b2RvOmVzNlxuXHRcdGlmIChsZWFkID09PSB1bmRlZmluZWQpIGxlYWQgPSBudWxsXG5cdFx0aWYgKG9wRGVjbGFyZVJlcyA9PT0gdW5kZWZpbmVkKSBvcERlY2xhcmVSZXMgPSBudWxsXG5cdFx0aWYgKG9wT3V0ID09PSB1bmRlZmluZWQpIG9wT3V0ID0gbnVsbFxuXHRcdGFzc2VydChvcERlY2xhcmVSZXMgPT09IG51bGwpXG5cdFx0cmV0dXJuIEJsb2NrU3RhdGVtZW50KGNhdChsZWFkLCB0TGluZXModGhpcy5saW5lcyksIG9wT3V0KSlcblx0fSxcblxuXHRCbG9ja1ZhbFRocm93KGxlYWQsIG9wRGVjbGFyZVJlcywgb3BPdXQpIHtcblx0XHQvL3RvZG86ZXM2XG5cdFx0aWYgKGxlYWQgPT09IHVuZGVmaW5lZCkgbGVhZCA9IG51bGxcblx0XHRpZiAob3BEZWNsYXJlUmVzID09PSB1bmRlZmluZWQpIG9wRGVjbGFyZVJlcyA9IG51bGxcblx0XHRpZiAob3BPdXQgPT09IHVuZGVmaW5lZCkgb3BPdXQgPSBudWxsXG5cdFx0Y29udGV4dC53YXJuSWYob3BEZWNsYXJlUmVzICE9PSBudWxsIHx8IG9wT3V0ICE9PSBudWxsLCB0aGlzLmxvYyxcblx0XHRcdCdPdXQgY29uZGl0aW9uIGlnbm9yZWQgYmVjYXVzZSBvZiBvaC1ubyEnKVxuXHRcdHJldHVybiBCbG9ja1N0YXRlbWVudChjYXQobGVhZCwgdExpbmVzKHRoaXMubGluZXMpLCB0MCh0aGlzLl90aHJvdykpKVxuXHR9LFxuXG5cdEJsb2NrV2l0aFJldHVybihsZWFkLCBvcERlY2xhcmVSZXMsIG9wT3V0KSB7XG5cdFx0cmV0dXJuIHRyYW5zcGlsZUJsb2NrKHQwKHRoaXMucmV0dXJuZWQpLCB0TGluZXModGhpcy5saW5lcyksIGxlYWQsIG9wRGVjbGFyZVJlcywgb3BPdXQpXG5cdH0sXG5cblx0QmxvY2tCYWcobGVhZCwgb3BEZWNsYXJlUmVzLCBvcE91dCkge1xuXHRcdHJldHVybiB0cmFuc3BpbGVCbG9jayhcblx0XHRcdElkQnVpbHQsXG5cdFx0XHRjYXQoRGVjbGFyZUJ1aWx0QmFnLCB0TGluZXModGhpcy5saW5lcykpLFxuXHRcdFx0bGVhZCwgb3BEZWNsYXJlUmVzLCBvcE91dClcblx0fSxcblxuXHRCbG9ja09iaihsZWFkLCBvcERlY2xhcmVSZXMsIG9wT3V0KSB7XG5cdFx0Y29uc3QgbGluZXMgPSBjYXQoRGVjbGFyZUJ1aWx0T2JqLCB0TGluZXModGhpcy5saW5lcykpXG5cdFx0Y29uc3QgcmVzID0gaWZFbHNlKHRoaXMub3BPYmplZCxcblx0XHRcdG9iamVkID0+IGlmRWxzZSh0aGlzLm9wTmFtZSxcblx0XHRcdFx0bmFtZSA9PiBtc1NldCh0MChvYmplZCksIElkQnVpbHQsIExpdGVyYWwobmFtZSkpLFxuXHRcdFx0XHQoKSA9PiBtc1NldCh0MChvYmplZCksIElkQnVpbHQpKSxcblx0XHRcdCgpID0+IGlmRWxzZSh0aGlzLm9wTmFtZSxcblx0XHRcdFx0XyA9PiBtc1NldE5hbWUoSWRCdWlsdCwgTGl0ZXJhbChfKSksXG5cdFx0XHRcdCgpID0+IElkQnVpbHQpKVxuXHRcdHJldHVybiB0cmFuc3BpbGVCbG9jayhyZXMsIGxpbmVzLCBsZWFkLCBvcERlY2xhcmVSZXMsIG9wT3V0KVxuXHR9LFxuXG5cdEJsb2NrTWFwKGxlYWQsIG9wRGVjbGFyZVJlcywgb3BPdXQpIHtcblx0XHRyZXR1cm4gdHJhbnNwaWxlQmxvY2soXG5cdFx0XHRJZEJ1aWx0LFxuXHRcdFx0Y2F0KERlY2xhcmVCdWlsdE1hcCwgdExpbmVzKHRoaXMubGluZXMpKSxcblx0XHRcdGxlYWQsIG9wRGVjbGFyZVJlcywgb3BPdXQpXG5cdH0sXG5cblx0QmxvY2tXcmFwKCkgeyByZXR1cm4gYmxvY2tXcmFwKHQwKHRoaXMuYmxvY2spKSB9LFxuXG5cdEJyZWFrRG8oKSB7IHJldHVybiBCcmVha1N0YXRlbWVudCgpIH0sXG5cblx0QnJlYWtWYWwoKSB7IHJldHVybiBSZXR1cm5TdGF0ZW1lbnQodDAodGhpcy52YWx1ZSkpIH0sXG5cblx0Q2FsbCgpIHtcblx0XHRjb25zdCBhbnlTcGxhdCA9IHRoaXMuYXJncy5zb21lKGFyZyA9PiBhcmcgaW5zdGFuY2VvZiBTcGxhdClcblx0XHRpZiAoYW55U3BsYXQpIHtcblx0XHRcdGNvbnN0IGFyZ3MgPSB0aGlzLmFyZ3MubWFwKGFyZyA9PlxuXHRcdFx0XHRhcmcgaW5zdGFuY2VvZiBTcGxhdCA/XG5cdFx0XHRcdFx0bXNBcnIodDAoYXJnLnNwbGF0dGVkKSkgOlxuXHRcdFx0XHRcdHQwKGFyZykpXG5cdFx0XHRyZXR1cm4gQ2FsbEV4cHJlc3Npb24oSWRGdW5jdGlvbkFwcGx5Q2FsbCwgW1xuXHRcdFx0XHR0MCh0aGlzLmNhbGxlZCksXG5cdFx0XHRcdExpdE51bGwsXG5cdFx0XHRcdENhbGxFeHByZXNzaW9uKG1lbWJlcihMaXRFbXB0eUFycmF5LCAnY29uY2F0JyksIGFyZ3MpXSlcblx0XHR9XG5cdFx0ZWxzZSByZXR1cm4gQ2FsbEV4cHJlc3Npb24odDAodGhpcy5jYWxsZWQpLCB0aGlzLmFyZ3MubWFwKHQwKSlcblx0fSxcblxuXHRDYXNlRG8oKSB7XG5cdFx0Y29uc3QgYm9keSA9IGNhc2VCb2R5KHRoaXMucGFydHMsIHRoaXMub3BFbHNlKVxuXHRcdHJldHVybiBpZkVsc2UodGhpcy5vcENhc2VkLCBfID0+IEJsb2NrU3RhdGVtZW50KFsgdDAoXyksIGJvZHkgXSksICgpID0+IGJvZHkpXG5cdH0sXG5cblx0Q2FzZVZhbCgpIHtcblx0XHRjb25zdCBib2R5ID0gY2FzZUJvZHkodGhpcy5wYXJ0cywgdGhpcy5vcEVsc2UpXG5cdFx0Y29uc3QgYmxvY2sgPSBpZkVsc2UodGhpcy5vcENhc2VkLCBfID0+IFsgdDAoXyksIGJvZHkgXSwgKCkgPT4gWyBib2R5IF0pXG5cdFx0cmV0dXJuIGJsb2NrV3JhcChCbG9ja1N0YXRlbWVudChibG9jaykpXG5cdH0sXG5cblx0Q2FzZURvUGFydDogY2FzZVBhcnQsXG5cdENhc2VWYWxQYXJ0OiBjYXNlUGFydCxcblxuXHRDbGFzcygpIHtcblx0XHRjb25zdCBtZXRob2RzID0gY2F0KFxuXHRcdFx0dGhpcy5zdGF0aWNzLm1hcChtZXRob2REZWZpbml0aW9uKGZhbHNlLCB0cnVlKSksXG5cdFx0XHRvcE1hcCh0aGlzLm9wQ29uc3RydWN0b3IsIG1ldGhvZERlZmluaXRpb24odHJ1ZSwgZmFsc2UpKSxcblx0XHRcdHRoaXMubWV0aG9kcy5tYXAobWV0aG9kRGVmaW5pdGlvbihmYWxzZSwgZmFsc2UpKSlcblx0XHRjb25zdCBvcE5hbWUgPSBvcE1hcCh0aGlzLm9wTmFtZSwgaWRDYWNoZWQpXG5cdFx0cmV0dXJuIENsYXNzRXhwcmVzc2lvbihvcE5hbWUsIG9wTWFwKHRoaXMuc3VwZXJDbGFzcywgdDApLCBDbGFzc0JvZHkobWV0aG9kcykpXG5cdH0sXG5cblx0Q29uZGl0aW9uYWxEbygpIHtcblx0XHRyZXR1cm4gSWZTdGF0ZW1lbnQoXG5cdFx0XHR0aGlzLmlzVW5sZXNzID8gVW5hcnlFeHByZXNzaW9uKCchJywgbWF5YmVCb29sV3JhcCh0MCh0aGlzLnRlc3QpKSkgOiB0MCh0aGlzLnRlc3QpLFxuXHRcdFx0dDAodGhpcy5yZXN1bHQpKVxuXHR9LFxuXG5cdENvbmRpdGlvbmFsVmFsKCkge1xuXHRcdGNvbnN0IHRlc3QgPSBtYXliZUJvb2xXcmFwKHQwKHRoaXMudGVzdCkpXG5cdFx0Y29uc3QgcmVzdWx0ID0gbXNTb21lKGJsb2NrV3JhcCh0MCh0aGlzLnJlc3VsdCkpKVxuXHRcdHJldHVybiB0aGlzLmlzVW5sZXNzID9cblx0XHRcdENvbmRpdGlvbmFsRXhwcmVzc2lvbih0ZXN0LCBNc05vbmUsIHJlc3VsdCkgOlxuXHRcdFx0Q29uZGl0aW9uYWxFeHByZXNzaW9uKHRlc3QsIHJlc3VsdCwgTXNOb25lKVxuXHR9LFxuXG5cdENhdGNoKCkge1xuXHRcdHJldHVybiBDYXRjaENsYXVzZSh0MCh0aGlzLmNhdWdodCksIHQwKHRoaXMuYmxvY2spKVxuXHR9LFxuXG5cdENvbnRpbnVlKCkgeyByZXR1cm4gQ29udGludWVTdGF0ZW1lbnQoKSB9LFxuXG5cdC8vIFRPRE86IGluY2x1ZGVJbm91dENoZWNrcyBpcyBtaXNuYW1lZFxuXHREZWJ1ZygpIHsgcmV0dXJuIGNvbnRleHQub3B0cy5pbmNsdWRlSW5vdXRDaGVja3MoKSA/IHRMaW5lcyh0aGlzLmxpbmVzKSA6IFsgXSB9LFxuXG5cdEV4Y2VwdERvKCkgeyByZXR1cm4gdHJhbnNwaWxlRXhjZXB0KHRoaXMpIH0sXG5cdEV4Y2VwdFZhbCgpIHsgcmV0dXJuIGJsb2NrV3JhcChCbG9ja1N0YXRlbWVudChbIHRyYW5zcGlsZUV4Y2VwdCh0aGlzKSBdKSkgfSxcblxuXHRGb3JEbygpIHsgcmV0dXJuIGZvckxvb3AodGhpcy5vcEl0ZXJhdGVlLCB0aGlzLmJsb2NrKSB9LFxuXG5cdEZvckJhZygpIHtcblx0XHRyZXR1cm4gYmxvY2tXcmFwKEJsb2NrU3RhdGVtZW50KFtcblx0XHRcdERlY2xhcmVCdWlsdEJhZyxcblx0XHRcdGZvckxvb3AodGhpcy5vcEl0ZXJhdGVlLCB0aGlzLmJsb2NrKSxcblx0XHRcdFJldHVybkJ1aWx0XG5cdFx0XSkpXG5cdH0sXG5cblx0Rm9yVmFsKCkge1xuXHRcdHJldHVybiBibG9ja1dyYXAoQmxvY2tTdGF0ZW1lbnQoWyBmb3JMb29wKHRoaXMub3BJdGVyYXRlZSwgdGhpcy5ibG9jaykgXSkpXG5cdH0sXG5cblx0RnVuKCkge1xuXHRcdGNvbnN0IG9sZEluR2VuZXJhdG9yID0gaXNJbkdlbmVyYXRvclxuXHRcdGlzSW5HZW5lcmF0b3IgPSB0aGlzLmlzR2VuZXJhdG9yXG5cblx0XHQvLyBUT0RPOkVTNiB1c2UgYC4uLmBmXG5cdFx0Y29uc3QgbkFyZ3MgPSBMaXRlcmFsKHRoaXMuYXJncy5sZW5ndGgpXG5cdFx0Y29uc3Qgb3BEZWNsYXJlUmVzdCA9IG9wTWFwKHRoaXMub3BSZXN0QXJnLCByZXN0ID0+XG5cdFx0XHRkZWNsYXJlKHJlc3QsIENhbGxFeHByZXNzaW9uKEFycmF5U2xpY2VDYWxsLCBbSWRBcmd1bWVudHMsIG5BcmdzXSkpKVxuXHRcdGNvbnN0IGFyZ0NoZWNrcyA9IG9wSWYoY29udGV4dC5vcHRzLmluY2x1ZGVUeXBlQ2hlY2tzKCksICgpID0+XG5cdFx0XHRmbGF0T3BNYXAodGhpcy5hcmdzLCBvcFR5cGVDaGVja0ZvckxvY2FsRGVjbGFyZSkpXG5cblx0XHRjb25zdCBfaW4gPSBvcE1hcCh0aGlzLm9wSW4sIHQwKVxuXG5cdFx0Y29uc3Qgb3BEZWNsYXJlVGhpcyA9IG9wTWFwKHRoaXMub3BEZWNsYXJlVGhpcywgKCkgPT5cblx0XHRcdFZhcmlhYmxlRGVjbGFyYXRpb24oJ2NvbnN0JywgWyBWYXJpYWJsZURlY2xhcmF0b3IoSWRMZXhpY2FsVGhpcywgVGhpc0V4cHJlc3Npb24oKSkgXSkpXG5cblx0XHRjb25zdCBsZWFkID0gY2F0KG9wRGVjbGFyZVRoaXMsIG9wRGVjbGFyZVJlc3QsIGFyZ0NoZWNrcywgX2luKVxuXG5cdFx0Y29uc3QgX291dCA9IG9wTWFwKHRoaXMub3BPdXQsIHQwKVxuXHRcdGNvbnN0IGJvZHkgPSB0Myh0aGlzLmJsb2NrLCBsZWFkLCB0aGlzLm9wRGVjbGFyZVJlcywgX291dClcblx0XHRjb25zdCBhcmdzID0gdGhpcy5hcmdzLm1hcCh0MClcblx0XHRpc0luR2VuZXJhdG9yID0gb2xkSW5HZW5lcmF0b3Jcblx0XHRjb25zdCBpZCA9IG9wTWFwKHRoaXMub3BOYW1lLCBpZENhY2hlZClcblxuXHRcdGNvbnN0IGNhblVzZUFycm93RnVuY3Rpb24gPVxuXHRcdFx0aWQgPT09IG51bGwgJiYgb3BEZWNsYXJlVGhpcyA9PT0gbnVsbCAmJiBvcERlY2xhcmVSZXN0ID09PSBudWxsICYmICF0aGlzLmlzR2VuZXJhdG9yXG5cdFx0cmV0dXJuIGNhblVzZUFycm93RnVuY3Rpb24gP1xuXHRcdFx0QXJyb3dGdW5jdGlvbkV4cHJlc3Npb24oYXJncywgYm9keSkgOlxuXHRcdFx0RnVuY3Rpb25FeHByZXNzaW9uKGlkLCBhcmdzLCBib2R5LCB0aGlzLmlzR2VuZXJhdG9yKVxuXHR9LFxuXG5cdExhenkoKSB7IHJldHVybiBsYXp5V3JhcCh0MCh0aGlzLnZhbHVlKSkgfSxcblxuXHROdW1iZXJMaXRlcmFsKCkge1xuXHRcdC8vIE5lZ2F0aXZlIG51bWJlcnMgYXJlIG5vdCBwYXJ0IG9mIEVTIHNwZWMuXG5cdFx0Ly8gaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzUuMS8jc2VjLTcuOC4zXG5cdFx0Y29uc3QgbGl0ID0gTGl0ZXJhbChNYXRoLmFicyh0aGlzLnZhbHVlKSlcblx0XHRyZXR1cm4gaXNQb3NpdGl2ZSh0aGlzLnZhbHVlKSA/IGxpdCA6IFVuYXJ5RXhwcmVzc2lvbignLScsIGxpdClcblx0fSxcblxuXHRHbG9iYWxBY2Nlc3MoKSB7IHJldHVybiBJZGVudGlmaWVyKHRoaXMubmFtZSkgfSxcblxuXHRMb2NhbEFjY2VzcygpIHtcblx0XHRyZXR1cm4gdGhpcy5uYW1lID09PSAndGhpcycgP1xuXHRcdFx0SWRlbnRpZmllcignX3RoaXMnKSA6XG5cdFx0XHRhY2Nlc3NMb2NhbERlY2xhcmUodmVyaWZ5UmVzdWx0cy5sb2NhbERlY2xhcmVGb3JBY2Nlc3ModGhpcykpXG5cdH0sXG5cblx0TG9jYWxEZWNsYXJlKCkgeyByZXR1cm4gaWRGb3JEZWNsYXJlQ2FjaGVkKHRoaXMpIH0sXG5cblx0TG9jYWxNdXRhdGUoKSB7XG5cdFx0cmV0dXJuIGFzc2lnbm1lbnRFeHByZXNzaW9uUGxhaW4oaWRDYWNoZWQodGhpcy5uYW1lKSwgdDAodGhpcy52YWx1ZSkpXG5cdH0sXG5cblx0TG9naWMoKSB7XG5cdFx0YXNzZXJ0KHRoaXMua2luZCA9PT0gTF9BbmQgfHwgdGhpcy5raW5kID09PSBMX09yKVxuXHRcdGNvbnN0IG9wID0gdGhpcy5raW5kID09PSBMX0FuZCA/ICcmJicgOiAnfHwnXG5cdFx0cmV0dXJuIHRhaWwodGhpcy5hcmdzKS5yZWR1Y2UoKGEsIGIpID0+IExvZ2ljYWxFeHByZXNzaW9uKG9wLCBhLCB0MChiKSksIHQwKHRoaXMuYXJnc1swXSkpXG5cdH0sXG5cblx0TWFwRW50cnkoKSB7IHJldHVybiBtc0Fzc29jKElkQnVpbHQsIHQwKHRoaXMua2V5KSwgdDAodGhpcy52YWwpKSB9LFxuXG5cdE1lbWJlcigpIHsgcmV0dXJuIG1lbWJlcih0MCh0aGlzLm9iamVjdCksIHRoaXMubmFtZSkgfSxcblxuXHRNb2R1bGUoKSB7XG5cdFx0Y29uc3QgYm9keSA9IGNhdChcblx0XHRcdHRMaW5lcyh0aGlzLmxpbmVzKSxcblx0XHRcdG9wTWFwKHRoaXMub3BEZWZhdWx0RXhwb3J0LCBfID0+IGFzc2lnbm1lbnRFeHByZXNzaW9uUGxhaW4oRXhwb3J0c0RlZmF1bHQsIHQwKF8pKSkpXG5cdFx0cmV0dXJuIFByb2dyYW0oY2F0KFxuXHRcdFx0b3BJZihjb250ZXh0Lm9wdHMuaW5jbHVkZVVzZVN0cmljdCgpLCAoKSA9PiBVc2VTdHJpY3QpLFxuXHRcdFx0b3BJZihjb250ZXh0Lm9wdHMuaW5jbHVkZUFtZGVmaW5lKCksICgpID0+IEFtZGVmaW5lSGVhZGVyKSxcblx0XHRcdHRvU3RhdGVtZW50KGFtZFdyYXBNb2R1bGUodGhpcy5kb1VzZXMsIHRoaXMudXNlcy5jb25jYXQodGhpcy5kZWJ1Z1VzZXMpLCBib2R5KSkpKVxuXHR9LFxuXG5cdE5ldygpIHtcblx0XHRjb25zdCBhbnlTcGxhdCA9IHRoaXMuYXJncy5zb21lKF8gPT4gXyBpbnN0YW5jZW9mIFNwbGF0KVxuXHRcdGNvbnRleHQuY2hlY2soIWFueVNwbGF0LCB0aGlzLmxvYywgJ1RPRE86IFNwbGF0IHBhcmFtcyBmb3IgbmV3Jylcblx0XHRyZXR1cm4gTmV3RXhwcmVzc2lvbih0MCh0aGlzLnR5cGUpLCB0aGlzLmFyZ3MubWFwKHQwKSlcblx0fSxcblxuXHROb3QoKSB7IHJldHVybiBVbmFyeUV4cHJlc3Npb24oJyEnLCB0MCh0aGlzLmFyZykpIH0sXG5cblx0T2JqRW50cnkoKSB7XG5cdFx0cmV0dXJuICh0aGlzLmFzc2lnbiBpbnN0YW5jZW9mIEFzc2lnblNpbmdsZSAmJiAhdGhpcy5hc3NpZ24uYXNzaWduZWUuaXNMYXp5KCkpID9cblx0XHRcdHQxKHRoaXMuYXNzaWduLCB2YWwgPT5cblx0XHRcdFx0YXNzaWdubWVudEV4cHJlc3Npb25QbGFpbihtZW1iZXIoSWRCdWlsdCwgdGhpcy5hc3NpZ24uYXNzaWduZWUubmFtZSksIHZhbCkpIDpcblx0XHRcdGNhdChcblx0XHRcdFx0dDAodGhpcy5hc3NpZ24pLFxuXHRcdFx0XHR0aGlzLmFzc2lnbi5hbGxBc3NpZ25lZXMoKS5tYXAoXyA9PlxuXHRcdFx0XHRcdG1zU2V0TGF6eShJZEJ1aWx0LCBMaXRlcmFsKF8ubmFtZSksIGlkRm9yRGVjbGFyZUNhY2hlZChfKSkpKVxuXHR9LFxuXG5cdE9ialNpbXBsZSgpIHtcblx0XHRyZXR1cm4gT2JqZWN0RXhwcmVzc2lvbih0aGlzLnBhaXJzLm1hcChwYWlyID0+XG5cdFx0XHRwcm9wZXJ0eSgnaW5pdCcsIHByb3BlcnR5SWRPckxpdGVyYWxDYWNoZWQocGFpci5rZXkpLCB0MChwYWlyLnZhbHVlKSkpKVxuXHR9LFxuXG5cdFF1b3RlKCkge1xuXHRcdGlmICh0aGlzLnBhcnRzLmxlbmd0aCA9PT0gMClcblx0XHRcdHJldHVybiBMaXRFbXB0eVN0cmluZ1xuXHRcdGVsc2Uge1xuXHRcdFx0Y29uc3QgcXVhc2lzID0gWyBdLCBleHByZXNzaW9ucyA9IFsgXVxuXG5cdFx0XHQvLyBUZW1wbGF0ZUxpdGVyYWwgbXVzdCBzdGFydCB3aXRoIGEgVGVtcGxhdGVFbGVtZW50XG5cdFx0XHRpZiAodHlwZW9mIHRoaXMucGFydHNbMF0gIT09ICdzdHJpbmcnKVxuXHRcdFx0XHRxdWFzaXMucHVzaChFbXB0eVRlbXBsYXRlRWxlbWVudClcblxuXHRcdFx0Zm9yIChsZXQgcGFydCBvZiB0aGlzLnBhcnRzKVxuXHRcdFx0XHRpZiAodHlwZW9mIHBhcnQgPT09ICdzdHJpbmcnKVxuXHRcdFx0XHRcdHF1YXNpcy5wdXNoKHRlbXBsYXRlRWxlbWVudEZvclN0cmluZyhwYXJ0KSlcblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0Ly8gXCJ7MX17MX1cIiBuZWVkcyBhbiBlbXB0eSBxdWFzaSBpbiB0aGUgbWlkZGxlIChhbmQgb24gdGhlIGVuZHMpXG5cdFx0XHRcdFx0aWYgKHF1YXNpcy5sZW5ndGggPT09IGV4cHJlc3Npb25zLmxlbmd0aClcblx0XHRcdFx0XHRcdHF1YXNpcy5wdXNoKEVtcHR5VGVtcGxhdGVFbGVtZW50KVxuXHRcdFx0XHRcdGV4cHJlc3Npb25zLnB1c2gobXNTaG93KHQwKHBhcnQpKSlcblx0XHRcdFx0fVxuXG5cdFx0XHQvLyBUZW1wbGF0ZUxpdGVyYWwgbXVzdCBlbmQgd2l0aCBhIFRlbXBsYXRlRWxlbWVudCwgc28gb25lIG1vcmUgcXVhc2kgdGhhbiBleHByZXNzaW9uLlxuXHRcdFx0aWYgKHF1YXNpcy5sZW5ndGggPT09IGV4cHJlc3Npb25zLmxlbmd0aClcblx0XHRcdFx0cXVhc2lzLnB1c2goRW1wdHlUZW1wbGF0ZUVsZW1lbnQpXG5cblx0XHRcdHJldHVybiBUZW1wbGF0ZUxpdGVyYWwocXVhc2lzLCBleHByZXNzaW9ucylcblx0XHR9XG5cdH0sXG5cblx0U3BlY2lhbERvKCkge1xuXHRcdHN3aXRjaCAodGhpcy5raW5kKSB7XG5cdFx0XHRjYXNlIFNEX0RlYnVnZ2VyOiByZXR1cm4gRGVidWdnZXJTdGF0ZW1lbnQoKVxuXHRcdFx0ZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKHRoaXMua2luZClcblx0XHR9XG5cdH0sXG5cblx0U3BlY2lhbFZhbCgpIHtcblx0XHQvLyBNYWtlIG5ldyBvYmplY3RzIGJlY2F1c2Ugd2Ugd2lsbCBhc3NpZ24gYGxvY2AgdG8gdGhlbS5cblx0XHRzd2l0Y2ggKHRoaXMua2luZCkge1xuXHRcdFx0Y2FzZSBTVl9Db250YWluczogcmV0dXJuIG1lbWJlcihJZE1zLCAnY29udGFpbnMnKVxuXHRcdFx0Y2FzZSBTVl9GYWxzZTogcmV0dXJuIExpdGVyYWwoZmFsc2UpXG5cdFx0XHRjYXNlIFNWX051bGw6IHJldHVybiBMaXRlcmFsKG51bGwpXG5cdFx0XHRjYXNlIFNWX1N1YjogcmV0dXJuIG1lbWJlcihJZE1zLCAnc3ViJylcblx0XHRcdGNhc2UgU1ZfVGhpc01vZHVsZURpcmVjdG9yeTogcmV0dXJuIElkZW50aWZpZXIoJ19fZGlybmFtZScpXG5cdFx0XHRjYXNlIFNWX1RydWU6IHJldHVybiBMaXRlcmFsKHRydWUpXG5cdFx0XHRjYXNlIFNWX1VuZGVmaW5lZDogcmV0dXJuIFVuYXJ5RXhwcmVzc2lvbigndm9pZCcsIExpdFplcm8pXG5cdFx0XHRkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IodGhpcy5raW5kKVxuXHRcdH1cblx0fSxcblxuXHRUaHJvdygpIHtcblx0XHRyZXR1cm4gaWZFbHNlKHRoaXMub3BUaHJvd24sXG5cdFx0XHRfID0+IFRocm93U3RhdGVtZW50KG1zRXJyb3IodDAoXykpKSxcblx0XHRcdCgpID0+IFRocm93U3RhdGVtZW50KG1zRXJyb3IoTGl0U3RyVGhyb3cpKSlcblx0fSxcblxuXHRZaWVsZCgpIHsgcmV0dXJuIHlpZWxkRXhwcmVzc2lvbk5vRGVsZWdhdGUodDAodGhpcy55aWVsZGVkKSkgfSxcblxuXHRZaWVsZFRvKCkgeyByZXR1cm4geWllbGRFeHByZXNzaW9uRGVsZWdhdGUodDAodGhpcy55aWVsZGVkVG8pKSB9XG59KVxuXG5mdW5jdGlvbiBjYXNlUGFydChhbHRlcm5hdGUpIHtcblx0aWYgKHRoaXMudGVzdCBpbnN0YW5jZW9mIFBhdHRlcm4pIHtcblx0XHRjb25zdCB7IHR5cGUsIHBhdHRlcm5lZCwgbG9jYWxzIH0gPSB0aGlzLnRlc3Rcblx0XHRjb25zdCBkZWNsID0gVmFyaWFibGVEZWNsYXJhdGlvbignY29uc3QnLCBbXG5cdFx0XHRWYXJpYWJsZURlY2xhcmF0b3IoSWRFeHRyYWN0LCBtc0V4dHJhY3QodDAodHlwZSksIHQwKHBhdHRlcm5lZCkpKSBdKVxuXHRcdGNvbnN0IHRlc3QgPSBCaW5hcnlFeHByZXNzaW9uKCchPT0nLCBJZEV4dHJhY3QsIExpdE51bGwpXG5cdFx0Y29uc3QgZXh0cmFjdCA9IFZhcmlhYmxlRGVjbGFyYXRpb24oJ2NvbnN0JywgbG9jYWxzLm1hcCgoXywgaWR4KSA9PlxuXHRcdFx0VmFyaWFibGVEZWNsYXJhdG9yKGlkRm9yRGVjbGFyZUNhY2hlZChfKSwgbWVtYmVyRXhwcmVzc2lvbihJZEV4dHJhY3QsIExpdGVyYWwoaWR4KSkpKSlcblx0XHRjb25zdCByZXMgPSB0MSh0aGlzLnJlc3VsdCwgZXh0cmFjdClcblx0XHRyZXR1cm4gQmxvY2tTdGF0ZW1lbnQoWyBkZWNsLCBJZlN0YXRlbWVudCh0ZXN0LCByZXMsIGFsdGVybmF0ZSkgXSlcblx0fSBlbHNlXG5cdFx0Ly8gYWx0ZXJuYXRlIHdyaXR0ZW4gdG8gYnkgYGNhc2VCb2R5YC5cblx0XHRyZXR1cm4gSWZTdGF0ZW1lbnQobWF5YmVCb29sV3JhcCh0MCh0aGlzLnRlc3QpKSwgdDAodGhpcy5yZXN1bHQpLCBhbHRlcm5hdGUpXG59XG5cbi8vIEZ1bmN0aW9ucyBzcGVjaWZpYyB0byBjZXJ0YWluIGV4cHJlc3Npb25zLlxuY29uc3Rcblx0Ly8gV3JhcHMgYSBibG9jayAod2l0aCBgcmV0dXJuYCBzdGF0ZW1lbnRzIGluIGl0KSBpbiBhbiBJSUZFLlxuXHRibG9ja1dyYXAgPSBibG9jayA9PiB7XG5cdFx0Y29uc3QgaW52b2tlID0gY2FsbEV4cHJlc3Npb25UaHVuayhmdW5jdGlvbkV4cHJlc3Npb25UaHVuayhibG9jaywgaXNJbkdlbmVyYXRvcikpXG5cdFx0cmV0dXJuIGlzSW5HZW5lcmF0b3IgPyB5aWVsZEV4cHJlc3Npb25EZWxlZ2F0ZShpbnZva2UpIDogaW52b2tlXG5cdH0sXG5cblx0Y2FzZUJvZHkgPSAocGFydHMsIG9wRWxzZSkgPT4ge1xuXHRcdGxldCBhY2MgPSBpZkVsc2Uob3BFbHNlLCB0MCwgKCkgPT4gVGhyb3dOb0Nhc2VNYXRjaClcblx0XHRmb3IgKGxldCBpID0gcGFydHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpID0gaSAtIDEpXG5cdFx0XHRhY2MgPSB0MShwYXJ0c1tpXSwgYWNjKVxuXHRcdHJldHVybiBhY2Ncblx0fSxcblxuXHRmb3JMb29wID0gKG9wSXRlcmF0ZWUsIGJsb2NrKSA9PlxuXHRcdGlmRWxzZShvcEl0ZXJhdGVlLFxuXHRcdFx0KHsgZWxlbWVudCwgYmFnIH0pID0+IHtcblx0XHRcdFx0Y29uc3QgZGVjbGFyZSA9IFZhcmlhYmxlRGVjbGFyYXRpb24oJ2xldCcsIFsgVmFyaWFibGVEZWNsYXJhdG9yKHQwKGVsZW1lbnQpKSBdKVxuXHRcdFx0XHRyZXR1cm4gRm9yT2ZTdGF0ZW1lbnQoZGVjbGFyZSwgdDAoYmFnKSwgdDAoYmxvY2spKVxuXHRcdFx0fSxcblx0XHRcdCgpID0+IGZvclN0YXRlbWVudEluZmluaXRlKHQwKGJsb2NrKSkpLFxuXG5cdG1ldGhvZERlZmluaXRpb24gPSAoaXNDb25zdHJ1Y3RvciwgaXNTdGF0aWMpID0+IGZ1biA9PiB7XG5cdFx0YXNzZXJ0KGZ1bi5vcE5hbWUgIT09IG51bGwpXG5cdFx0Y29uc3Qga2V5ID0gcHJvcGVydHlJZE9yTGl0ZXJhbENhY2hlZChmdW4ub3BOYW1lKVxuXHRcdGNvbnN0IHZhbHVlID0gdDAoZnVuKVxuXHRcdC8vIFRoaXMgaXMgaGFuZGxlZCBieSBga2V5YC5cblx0XHR2YWx1ZS5pZCA9IG51bGxcblx0XHQvLyBUT0RPOiBnZXQvc2V0IVxuXHRcdGNvbnN0IGtpbmQgPSBpc0NvbnN0cnVjdG9yID8gJ2NvbnN0cnVjdG9yJyA6ICdtZXRob2QnXG5cdFx0Ly8gVE9ETzogY29tcHV0ZWQgY2xhc3MgcHJvcGVydGllc1xuXHRcdGNvbnN0IGNvbXB1dGVkID0gZmFsc2Vcblx0XHRyZXR1cm4gTWV0aG9kRGVmaW5pdGlvbihrZXksIHZhbHVlLCBraW5kLCBpc1N0YXRpYywgY29tcHV0ZWQpXG5cdH0sXG5cblx0dHJhbnNwaWxlQmxvY2sgPSAocmV0dXJuZWQsIGxpbmVzLCBsZWFkLCBvcERlY2xhcmVSZXMsIG9wT3V0KSA9PiB7XG5cdFx0Ly8gVE9ETzpFUzYgT3B0aW9uYWwgYXJndW1lbnRzXG5cdFx0aWYgKGxlYWQgPT09IHVuZGVmaW5lZCkgbGVhZCA9IG51bGxcblx0XHRpZiAob3BEZWNsYXJlUmVzID09PSB1bmRlZmluZWQpIG9wRGVjbGFyZVJlcyA9IG51bGxcblx0XHRpZiAob3BPdXQgPT09IHVuZGVmaW5lZCkgb3BPdXQgPSBudWxsXG5cdFx0Y29uc3QgZmluID0gaWZFbHNlKG9wRGVjbGFyZVJlcyxcblx0XHRcdHJkID0+IHtcblx0XHRcdFx0Y29uc3QgcmV0ID0gbWF5YmVXcmFwSW5DaGVja0NvbnRhaW5zKHJldHVybmVkLCByZC5vcFR5cGUsIHJkLm5hbWUpXG5cdFx0XHRcdHJldHVybiBpZkVsc2Uob3BPdXQsXG5cdFx0XHRcdFx0XyA9PiBjYXQoZGVjbGFyZShyZCwgcmV0KSwgXywgUmV0dXJuUmVzKSxcblx0XHRcdFx0XHQoKSA9PiBSZXR1cm5TdGF0ZW1lbnQocmV0KSlcblx0XHRcdH0sXG5cdFx0XHQoKSA9PiBjYXQob3BPdXQsIFJldHVyblN0YXRlbWVudChyZXR1cm5lZCkpKVxuXHRcdHJldHVybiBCbG9ja1N0YXRlbWVudChjYXQobGVhZCwgbGluZXMsIGZpbikpXG5cdH0sXG5cblx0dHJhbnNwaWxlRXhjZXB0ID0gZXhjZXB0ID0+XG5cdFx0VHJ5U3RhdGVtZW50KFxuXHRcdFx0dDAoZXhjZXB0Ll90cnkpLFxuXHRcdFx0b3BNYXAoZXhjZXB0Ll9jYXRjaCwgdDApLFxuXHRcdFx0b3BNYXAoZXhjZXB0Ll9maW5hbGx5LCB0MCkpXG5cbi8vIE1vZHVsZSBoZWxwZXJzXG5jb25zdFxuXHRhbWRXcmFwTW9kdWxlID0gKGRvVXNlcywgb3RoZXJVc2VzLCBib2R5KSA9PiB7XG5cdFx0Y29uc3QgYWxsVXNlcyA9IGRvVXNlcy5jb25jYXQob3RoZXJVc2VzKVxuXHRcdGNvbnN0IHVzZVBhdGhzID0gQXJyYXlFeHByZXNzaW9uKGNhdChcblx0XHRcdExpdFN0ckV4cG9ydHMsXG5cdFx0XHRhbGxVc2VzLm1hcChfID0+IExpdGVyYWwobWFuZ2xlUGF0aChfLnBhdGgpKSkpKVxuXHRcdGNvbnN0IHVzZUlkZW50aWZpZXJzID0gYWxsVXNlcy5tYXAoKF8sIGkpID0+IGlkQ2FjaGVkKGAke3BhdGhCYXNlTmFtZShfLnBhdGgpfV8ke2l9YCkpXG5cdFx0Y29uc3QgdXNlQXJncyA9IGNhdChJZEV4cG9ydHMsIHVzZUlkZW50aWZpZXJzKVxuXHRcdGNvbnN0IHVzZURvcyA9IGRvVXNlcy5tYXAoKHVzZSwgaSkgPT5cblx0XHRcdGxvYyhFeHByZXNzaW9uU3RhdGVtZW50KG1zR2V0TW9kdWxlKHVzZUlkZW50aWZpZXJzW2ldKSksIHVzZS5sb2MpKVxuXHRcdGNvbnN0IG9wVXNlRGVjbGFyZSA9IG9wSWYoIWlzRW1wdHkob3RoZXJVc2VzKSxcblx0XHRcdCgpID0+IFZhcmlhYmxlRGVjbGFyYXRpb24oJ2NvbnN0JywgZmxhdE1hcChvdGhlclVzZXMsICh1c2UsIGkpID0+XG5cdFx0XHRcdHVzZURlY2xhcmF0b3JzKHVzZSwgdXNlSWRlbnRpZmllcnNbaSArIGRvVXNlcy5sZW5ndGhdKSkpKVxuXHRcdGNvbnN0IGZ1bGxCb2R5ID0gQmxvY2tTdGF0ZW1lbnQoY2F0KHVzZURvcywgb3BVc2VEZWNsYXJlLCBib2R5LCBSZXR1cm5FeHBvcnRzKSlcblx0XHRjb25zdCBsYXp5Qm9keSA9XG5cdFx0XHRjb250ZXh0Lm9wdHMubGF6eU1vZHVsZSgpID9cblx0XHRcdFx0QmxvY2tTdGF0ZW1lbnQoWyBFeHByZXNzaW9uU3RhdGVtZW50KFxuXHRcdFx0XHRcdGFzc2lnbm1lbnRFeHByZXNzaW9uUGxhaW4oRXhwb3J0c0dldCxcblx0XHRcdFx0XHRcdG1zTGF6eShmdW5jdGlvbkV4cHJlc3Npb25UaHVuayhmdWxsQm9keSkpKSkgXSkgOlxuXHRcdFx0XHRmdWxsQm9keVxuXHRcdHJldHVybiBDYWxsRXhwcmVzc2lvbihJZERlZmluZSwgWyB1c2VQYXRocywgQXJyb3dGdW5jdGlvbkV4cHJlc3Npb24odXNlQXJncywgbGF6eUJvZHkpIF0pXG5cdH0sXG5cblx0cGF0aEJhc2VOYW1lID0gcGF0aCA9PlxuXHRcdHBhdGguc3Vic3RyKHBhdGgubGFzdEluZGV4T2YoJy8nKSArIDEpLFxuXG5cdHVzZURlY2xhcmF0b3JzID0gKHVzZSwgbW9kdWxlSWRlbnRpZmllcikgPT4ge1xuXHRcdC8vIFRPRE86IENvdWxkIGJlIG5lYXRlciBhYm91dCB0aGlzXG5cdFx0Y29uc3QgaXNMYXp5ID0gKGlzRW1wdHkodXNlLnVzZWQpID8gdXNlLm9wVXNlRGVmYXVsdCA6IHVzZS51c2VkWzBdKS5pc0xhenkoKVxuXHRcdGNvbnN0IHZhbHVlID0gKGlzTGF6eSA/IG1zTGF6eUdldE1vZHVsZSA6IG1zR2V0TW9kdWxlKShtb2R1bGVJZGVudGlmaWVyKVxuXG5cdFx0Y29uc3QgdXNlZERlZmF1bHQgPSBvcE1hcCh1c2Uub3BVc2VEZWZhdWx0LCBkZWYgPT4ge1xuXHRcdFx0Y29uc3QgZGVmZXhwID0gbXNHZXREZWZhdWx0RXhwb3J0KG1vZHVsZUlkZW50aWZpZXIpXG5cdFx0XHRjb25zdCB2YWwgPSBpc0xhenkgPyBsYXp5V3JhcChkZWZleHApIDogZGVmZXhwXG5cdFx0XHRyZXR1cm4gbG9jKFZhcmlhYmxlRGVjbGFyYXRvcihpZEZvckRlY2xhcmVDYWNoZWQoZGVmKSwgdmFsKSwgZGVmLmxvYylcblx0XHR9KVxuXG5cdFx0Y29uc3QgdXNlZERlc3RydWN0ID0gaXNFbXB0eSh1c2UudXNlZCkgPyBudWxsIDpcblx0XHRcdG1ha2VEZXN0cnVjdHVyZURlY2xhcmF0b3JzKHVzZS51c2VkLCBpc0xhenksIHZhbHVlLCB0cnVlLCBmYWxzZSlcblxuXHRcdHJldHVybiBjYXQodXNlZERlZmF1bHQsIHVzZWREZXN0cnVjdClcblx0fVxuXG4vLyBHZW5lcmFsIHV0aWxzLiBOb3QgaW4gdXRpbC5qcyBiZWNhdXNlIHRoZXNlIGNsb3NlIG92ZXIgY29udGV4dC5cbmNvbnN0XG5cdG1heWJlQm9vbFdyYXAgPSBhc3QgPT5cblx0XHRjb250ZXh0Lm9wdHMuaW5jbHVkZUNhc2VDaGVja3MoKSA/IG1zQm9vbChhc3QpIDogYXN0LFxuXG5cdG1ha2VEZXN0cnVjdHVyZURlY2xhcmF0b3JzID0gKGFzc2lnbmVlcywgaXNMYXp5LCB2YWx1ZSwgaXNNb2R1bGUsIGlzRXhwb3J0KSA9PiB7XG5cdFx0Y29uc3QgZGVzdHJ1Y3R1cmVkTmFtZSA9IGBfJCR7YXNzaWduZWVzWzBdLmxvYy5zdGFydC5saW5lfWBcblx0XHRjb25zdCBpZERlc3RydWN0dXJlZCA9IElkZW50aWZpZXIoZGVzdHJ1Y3R1cmVkTmFtZSlcblx0XHRjb25zdCBkZWNsYXJhdG9ycyA9IGFzc2lnbmVlcy5tYXAoYXNzaWduZWUgPT4ge1xuXHRcdFx0Ly8gVE9ETzogRG9uJ3QgY29tcGlsZSBpdCBpZiBpdCdzIG5ldmVyIGFjY2Vzc2VkXG5cdFx0XHRjb25zdCBnZXQgPSBnZXRNZW1iZXIoaWREZXN0cnVjdHVyZWQsIGFzc2lnbmVlLm5hbWUsIGlzTGF6eSwgaXNNb2R1bGUpXG5cdFx0XHRyZXR1cm4gbWFrZURlY2xhcmF0b3IoYXNzaWduZWUsIGdldCwgaXNMYXp5LCBpc0V4cG9ydClcblx0XHR9KVxuXHRcdC8vIEdldHRpbmcgbGF6eSBtb2R1bGUgaXMgZG9uZSBieSBtcy5sYXp5R2V0TW9kdWxlLlxuXHRcdGNvbnN0IHZhbCA9IChpc0xhenkgJiYgIWlzTW9kdWxlKSA/IGxhenlXcmFwKHZhbHVlKSA6IHZhbHVlXG5cdFx0cmV0dXJuIHVuc2hpZnQoVmFyaWFibGVEZWNsYXJhdG9yKGlkRGVzdHJ1Y3R1cmVkLCB2YWwpLCBkZWNsYXJhdG9ycylcblx0fSxcblxuXHRtYWtlRGVjbGFyYXRvciA9IChhc3NpZ25lZSwgdmFsdWUsIHZhbHVlSXNBbHJlYWR5TGF6eSwgaXNFeHBvcnQpID0+IHtcblx0XHRjb25zdCB7IGxvYywgbmFtZSwgb3BUeXBlIH0gPSBhc3NpZ25lZVxuXHRcdGNvbnN0IGlzTGF6eSA9IGFzc2lnbmVlLmlzTGF6eSgpXG5cdFx0Ly8gVE9ETzogYXNzZXJ0KGFzc2lnbmVlLm9wVHlwZSA9PT0gbnVsbClcblx0XHQvLyBvciBUT0RPOiBBbGxvdyB0eXBlIGNoZWNrIG9uIGxhenkgdmFsdWU/XG5cdFx0dmFsdWUgPSBpc0xhenkgPyB2YWx1ZSA6IG1heWJlV3JhcEluQ2hlY2tDb250YWlucyh2YWx1ZSwgb3BUeXBlLCBuYW1lKVxuXHRcdGlmIChpc0V4cG9ydCkge1xuXHRcdFx0Ly8gVE9ETzpFUzZcblx0XHRcdGNvbnRleHQuY2hlY2soIWlzTGF6eSwgbG9jLCAnTGF6eSBleHBvcnQgbm90IHN1cHBvcnRlZC4nKVxuXHRcdFx0cmV0dXJuIFZhcmlhYmxlRGVjbGFyYXRvcihcblx0XHRcdFx0aWRGb3JEZWNsYXJlQ2FjaGVkKGFzc2lnbmVlKSxcblx0XHRcdFx0YXNzaWdubWVudEV4cHJlc3Npb25QbGFpbihtZW1iZXIoSWRFeHBvcnRzLCBuYW1lKSwgdmFsdWUpKVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCB2YWwgPSBpc0xhenkgJiYgIXZhbHVlSXNBbHJlYWR5TGF6eSA/IGxhenlXcmFwKHZhbHVlKSA6IHZhbHVlXG5cdFx0XHRhc3NlcnQoaXNMYXp5IHx8ICF2YWx1ZUlzQWxyZWFkeUxhenkpXG5cdFx0XHRyZXR1cm4gVmFyaWFibGVEZWNsYXJhdG9yKGlkRm9yRGVjbGFyZUNhY2hlZChhc3NpZ25lZSksIHZhbClcblx0XHR9XG5cdH0sXG5cblx0bWF5YmVXcmFwSW5DaGVja0NvbnRhaW5zID0gKGFzdCwgb3BUeXBlLCBuYW1lKSA9PlxuXHRcdChjb250ZXh0Lm9wdHMuaW5jbHVkZVR5cGVDaGVja3MoKSAmJiBvcFR5cGUgIT09IG51bGwpID9cblx0XHRcdG1zQ2hlY2tDb250YWlucyh0MChvcFR5cGUpLCBhc3QsIExpdGVyYWwobmFtZSkpIDpcblx0XHRcdGFzdCxcblxuXHRnZXRNZW1iZXIgPSAoYXN0T2JqZWN0LCBnb3ROYW1lLCBpc0xhenksIGlzTW9kdWxlKSA9PlxuXHRcdGlzTGF6eSA/XG5cdFx0bXNMYXp5R2V0KGFzdE9iamVjdCwgTGl0ZXJhbChnb3ROYW1lKSkgOlxuXHRcdGlzTW9kdWxlICYmIGNvbnRleHQub3B0cy5pbmNsdWRlVXNlQ2hlY2tzKCkgP1xuXHRcdG1zR2V0KGFzdE9iamVjdCwgTGl0ZXJhbChnb3ROYW1lKSkgOlxuXHRcdG1lbWJlcihhc3RPYmplY3QsIGdvdE5hbWUpXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==