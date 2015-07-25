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
			// TODO:ES6 Optional arguments
			if (lead === undefined) lead = null;
			if (opDeclareRes === undefined) opDeclareRes = null;
			if (opOut === undefined) opOut = null;
			(0, _util.assert)(opDeclareRes === null);
			return (0, _esastDistAst.BlockStatement)((0, _util.cat)(lead, tLines(this.lines), opOut));
		},

		BlockValThrow(lead, opDeclareRes, opOut) {
			// TODO:ES6 Optional arguments
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
			const methods = (0, _util.cat)(this.statics.map(methodDefinition(true)), (0, _util.opMap)(this.opConstructor, constructorDefinition), this.methods.map(methodDefinition(false)));
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

		MemberSet() {
			switch (this.kind) {
				case _MsAst.MS_Mutate:
					return (0, _esastDistSpecialize.assignmentExpressionPlain)((0, _esastDistUtil.member)(t0(this.object), this.name), t0(this.value));
				case _MsAst.MS_New:
					return (0, _msCall.msNewProperty)(t0(this.object), (0, _esastDistAst.Literal)(this.name), t0(this.value));
				case _MsAst.MS_NewMutable:
					return (0, _msCall.msNewMutableProperty)(t0(this.object), (0, _esastDistAst.Literal)(this.name), t0(this.value));
				default:
					throw new Error();
			}
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
				case _MsAst.SV_Super:
					return (0, _esastDistAst.Identifier)('super');
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
	      constructorDefinition = fun => (0, _esastDistAst.MethodDefinition)((0, _esastDistAst.Identifier)('constructor'), t0(fun), 'constructor', false, false),
	      methodDefinition = isStatic => method => {
		if (method instanceof _MsAst.Fun) {
			(0, _util.assert)(method.opName !== null);
			const key = (0, _esastDistUtil.propertyIdOrLiteralCached)(method.opName);
			const value = t0(method);
			value.id = null;
			const computed = false;
			return (0, _esastDistAst.MethodDefinition)(key, value, 'method', isStatic, computed);
		} else {
			(0, _util.assert)(method instanceof _MsAst.MethodImpl);
			const fun = method.fun;
			(0, _util.assert)(fun.opName === null);
			const key = (0, _msCall.msSymbol)(t0(method.symbol));
			const value = t0(fun);
			// This is handled by `key`.
			value.id = null;
			// TODO: get/set!
			const computed = true;
			return (0, _esastDistAst.MethodDefinition)(key, value, 'method', isStatic, computed);
		}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS90cmFuc3BpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUE0QkEsS0FBSSxPQUFPLEVBQUUsYUFBYSxFQUFFLGFBQWEsQ0FBQTs7bUJBRTFCLENBQUMsUUFBUSxFQUFFLGdCQUFnQixFQUFFLGNBQWMsS0FBSztBQUM5RCxTQUFPLEdBQUcsUUFBUSxDQUFBO0FBQ2xCLGVBQWEsR0FBRyxjQUFjLENBQUE7QUFDOUIsZUFBYSxHQUFHLEtBQUssQ0FBQTtBQUNyQixRQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTs7QUFFaEMsU0FBTyxHQUFHLGFBQWEsR0FBRyxTQUFTLENBQUE7QUFDbkMsU0FBTyxHQUFHLENBQUE7RUFDVjs7QUFFTSxPQUNOLEVBQUUsR0FBRyxJQUFJLElBQUksbUJBbkNLLEdBQUcsRUFtQ0osSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1NBQW5ELEVBQUUsR0FBRixFQUFFO0FBQ0gsT0FDQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxLQUFLLG1CQXJDRixHQUFHLEVBcUNHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDO09BQzdELEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksS0FBSyxtQkF0Q2QsR0FBRyxFQXNDZSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDO09BQ3JGLE1BQU0sR0FBRyxLQUFLLElBQUk7QUFDakIsUUFBTSxHQUFHLEdBQUcsRUFBRyxDQUFBO0FBQ2YsT0FBSyxNQUFNLElBQUksSUFBSSxLQUFLLEVBQUU7QUFDekIsU0FBTSxHQUFHLEdBQUcsSUFBSSxDQUFD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QyxrQkFBa0IsQ0FBQyxDQUFBO0FBQ3JDLFVBQU8sa0JBbGpCMkMsa0JBQWtCLEVBa2pCMUMsV0E5aEIrQixrQkFBa0IsRUE4aEI5QixRQUFRLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQTtHQUM1RDtFQUNEO09BRUQsd0JBQXdCLEdBQUcsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksS0FDNUMsQUFBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksTUFBTSxLQUFLLElBQUksR0FDbkQsWUF2aUJGLGVBQWUsRUF1aUJHLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLEVBQUUsa0JBMWpCVixPQUFPLEVBMGpCVyxJQUFJLENBQUMsQ0FBQyxHQUMvQyxHQUFHO09BRUwsU0FBUyxHQUFHLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxLQUNoRCxNQUFNLEdBQ04sWUE1aUJvRixTQUFTLEVBNGlCbkYsU0FBUyxFQUFFLGtCQS9qQkcsT0FBTyxFQStqQkYsT0FBTyxDQUFDLENBQUMsR0FDdEMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsR0FDM0MsWUE5aUJvQyxLQUFLLEVBOGlCbkMsU0FBUyxFQUFFLGtCQWprQk8sT0FBTyxFQWlrQk4sT0FBTyxDQUFDLENBQUMsR0FDbEMsbUJBL2pCc0IsTUFBTSxFQStqQnJCLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQSIsImZpbGUiOiJtZXRhL2NvbXBpbGUvcHJpdmF0ZS90cmFuc3BpbGUvdHJhbnNwaWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXJyYXlFeHByZXNzaW9uLCBBcnJvd0Z1bmN0aW9uRXhwcmVzc2lvbiwgQmluYXJ5RXhwcmVzc2lvbiwgQmxvY2tTdGF0ZW1lbnQsIEJyZWFrU3RhdGVtZW50LFxuXHRDYWxsRXhwcmVzc2lvbiwgQ2F0Y2hDbGF1c2UsIENsYXNzQm9keSwgQ2xhc3NFeHByZXNzaW9uLCBDb25kaXRpb25hbEV4cHJlc3Npb24sXG5cdENvbnRpbnVlU3RhdGVtZW50LCBEZWJ1Z2dlclN0YXRlbWVudCwgRXhwcmVzc2lvblN0YXRlbWVudCwgRm9yT2ZTdGF0ZW1lbnQsIEZ1bmN0aW9uRXhwcmVzc2lvbixcblx0SWRlbnRpZmllciwgSWZTdGF0ZW1lbnQsIExpdGVyYWwsIExvZ2ljYWxFeHByZXNzaW9uLCBNZXRob2REZWZpbml0aW9uLCBOZXdFeHByZXNzaW9uLFxuXHRPYmplY3RFeHByZXNzaW9uLCBQcm9ncmFtLCBSZXR1cm5TdGF0ZW1lbnQsIFRlbXBsYXRlTGl0ZXJhbCwgVGhpc0V4cHJlc3Npb24sIFRocm93U3RhdGVtZW50LFxuXHRUcnlTdGF0ZW1lbnQsIFZhcmlhYmxlRGVjbGFyYXRpb24sIFVuYXJ5RXhwcmVzc2lvbiwgVmFyaWFibGVEZWNsYXJhdG9yIH0gZnJvbSAnZXNhc3QvZGlzdC9hc3QnXG5pbXBvcnQgeyBpZENhY2hlZCwgbG9jLCBtZW1iZXIsIHByb3BlcnR5SWRPckxpdGVyYWxDYWNoZWQsIHRvU3RhdGVtZW50IH0gZnJvbSAnZXNhc3QvZGlzdC91dGlsJ1xuaW1wb3J0IHsgYXNzaWdubWVudEV4cHJlc3Npb25QbGFpbiwgY2FsbEV4cHJlc3Npb25UaHVuaywgZnVuY3Rpb25FeHByZXNzaW9uVGh1bmssIG1lbWJlckV4cHJlc3Npb24sXG5cdHByb3BlcnR5LCB5aWVsZEV4cHJlc3Npb25EZWxlZ2F0ZSwgeWllbGRFeHByZXNzaW9uTm9EZWxlZ2F0ZSB9IGZyb20gJ2VzYXN0L2Rpc3Qvc3BlY2lhbGl6ZSdcbmltcG9ydCAqIGFzIE1zQXN0VHlwZXMgZnJvbSAnLi4vLi4vTXNBc3QnXG5pbXBvcnQgeyBBc3NpZ25TaW5nbGUsIENhbGwsIEZ1biwgTF9BbmQsIExfT3IsIExEX0xhenksIExEX011dGFibGUsIE1ldGhvZEltcGwsIE1TX011dGF0ZSwgTVNfTmV3LFxuXHRNU19OZXdNdXRhYmxlLCBQYXR0ZXJuLCBTcGxhdCwgU0RfRGVidWdnZXIsIFNWX0NvbnRhaW5zLCBTVl9GYWxzZSwgU1ZfTnVsbCwgU1ZfU3ViLCBTVl9TdXBlcixcblx0U1ZfVGhpc01vZHVsZURpcmVjdG9yeSwgU1ZfVHJ1ZSwgU1ZfVW5kZWZpbmVkIH0gZnJvbSAnLi4vLi4vTXNBc3QnXG5pbXBvcnQgbWFuZ2xlUGF0aCBmcm9tICcuLi9tYW5nbGVQYXRoJ1xuaW1wb3J0IHsgYXNzZXJ0LCBjYXQsIGZsYXRNYXAsIGZsYXRPcE1hcCwgaWZFbHNlLCBpc0VtcHR5LFxuXHRpbXBsZW1lbnRNYW55LCBpc1Bvc2l0aXZlLCBvcElmLCBvcE1hcCwgdGFpbCwgdW5zaGlmdCB9IGZyb20gJy4uL3V0aWwnXG5pbXBvcnQgeyBBbWRlZmluZUhlYWRlciwgQXJyYXlTbGljZUNhbGwsIERlY2xhcmVCdWlsdEJhZywgRGVjbGFyZUJ1aWx0TWFwLCBEZWNsYXJlQnVpbHRPYmosXG5cdEVtcHR5VGVtcGxhdGVFbGVtZW50LCBFeHBvcnRzRGVmYXVsdCwgRXhwb3J0c0dldCwgSWRBcmd1bWVudHMsIElkQnVpbHQsIElkRGVmaW5lLCBJZEV4cG9ydHMsXG5cdElkRXh0cmFjdCwgSWRGdW5jdGlvbkFwcGx5Q2FsbCwgSWRMZXhpY2FsVGhpcywgTGl0RW1wdHlBcnJheSwgTGl0RW1wdHlTdHJpbmcsIExpdE51bGwsXG5cdExpdFN0ckV4cG9ydHMsIExpdFN0clRocm93LCBMaXRaZXJvLCBSZXR1cm5CdWlsdCwgUmV0dXJuRXhwb3J0cywgUmV0dXJuUmVzLCBUaHJvd0Fzc2VydEZhaWwsXG5cdFRocm93Tm9DYXNlTWF0Y2gsIFVzZVN0cmljdCB9IGZyb20gJy4vYXN0LWNvbnN0YW50cydcbmltcG9ydCB7IElkTXMsIGxhenlXcmFwLCBtc0FkZCwgbXNBZGRNYW55LCBtc0FyciwgbXNBc3NlcnQsIG1zQXNzZXJ0Tm90LCBtc0Fzc29jLCBtc0Jvb2wsXG5cdG1zQ2hlY2tDb250YWlucywgbXNFcnJvciwgbXNFeHRyYWN0LCBtc0dldCwgbXNHZXREZWZhdWx0RXhwb3J0LCBtc0dldE1vZHVsZSwgbXNMYXp5LCBtc0xhenlHZXQsXG5cdG1zTGF6eUdldE1vZHVsZSwgbXNOZXdNdXRhYmxlUHJvcGVydHksIG1zTmV3UHJvcGVydHksIG1zU2V0LCBtc1NldE5hbWUsIG1zU2V0TGF6eSwgbXNTaG93LFxuXHRtc1NvbWUsIG1zU3ltYm9sLCBNc05vbmUgfSBmcm9tICcuL21zLWNhbGwnXG5pbXBvcnQgeyBhY2Nlc3NMb2NhbERlY2xhcmUsIGRlY2xhcmUsIGZvclN0YXRlbWVudEluZmluaXRlLCBpZEZvckRlY2xhcmVDYWNoZWQsXG5cdG9wVHlwZUNoZWNrRm9yTG9jYWxEZWNsYXJlLCB0ZW1wbGF0ZUVsZW1lbnRGb3JTdHJpbmcgfSBmcm9tICcuL3V0aWwnXG5cbmxldCBjb250ZXh0LCB2ZXJpZnlSZXN1bHRzLCBpc0luR2VuZXJhdG9yXG5cbmV4cG9ydCBkZWZhdWx0IChfY29udGV4dCwgbW9kdWxlRXhwcmVzc2lvbiwgX3ZlcmlmeVJlc3VsdHMpID0+IHtcblx0Y29udGV4dCA9IF9jb250ZXh0XG5cdHZlcmlmeVJlc3VsdHMgPSBfdmVyaWZ5UmVzdWx0c1xuXHRpc0luR2VuZXJhdG9yID0gZmFsc2Vcblx0Y29uc3QgcmVzID0gdDAobW9kdWxlRXhwcmVzc2lvbilcblx0Ly8gUmVsZWFzZSBmb3IgZ2FyYmFnZSBjb2xsZWN0aW9uLlxuXHRjb250ZXh0ID0gdmVyaWZ5UmVzdWx0cyA9IHVuZGVmaW5lZFxuXHRyZXR1cm4gcmVzXG59XG5cbmV4cG9ydCBjb25zdFxuXHR0MCA9IGV4cHIgPT4gbG9jKGV4cHIudHJhbnNwaWxlU3VidHJlZSgpLCBleHByLmxvYylcbmNvbnN0XG5cdHQxID0gKGV4cHIsIGFyZykgPT4gbG9jKGV4cHIudHJhbnNwaWxlU3VidHJlZShhcmcpLCBleHByLmxvYyksXG5cdHQzID0gKGV4cHIsIGFyZywgYXJnMiwgYXJnMykgPT4gbG9jKGV4cHIudHJhbnNwaWxlU3VidHJlZShhcmcsIGFyZzIsIGFyZzMpLCBleHByLmxvYyksXG5cdHRMaW5lcyA9IGV4cHJzID0+IHtcblx0XHRjb25zdCBvdXQgPSBbIF1cblx0XHRmb3IgKGNvbnN0IGV4cHIgb2YgZXhwcnMpIHtcblx0XHRcdGNvbnN0IGFzdCA9IGV4cHIudHJhbnNwaWxlU3VidHJlZSgpXG5cdFx0XHRpZiAoYXN0IGluc3RhbmNlb2YgQXJyYXkpXG5cdFx0XHRcdC8vIERlYnVnIG1heSBwcm9kdWNlIG11bHRpcGxlIHN0YXRlbWVudHMuXG5cdFx0XHRcdGZvciAoY29uc3QgXyBvZiBhc3QpXG5cdFx0XHRcdFx0b3V0LnB1c2godG9TdGF0ZW1lbnQoXykpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdG91dC5wdXNoKGxvYyh0b1N0YXRlbWVudChhc3QpLCBleHByLmxvYykpXG5cdFx0fVxuXHRcdHJldHVybiBvdXRcblx0fVxuXG5pbXBsZW1lbnRNYW55KE1zQXN0VHlwZXMsICd0cmFuc3BpbGVTdWJ0cmVlJywge1xuXHRBc3NlcnQoKSB7XG5cdFx0Y29uc3QgZmFpbENvbmQgPSAoKSA9PiB7XG5cdFx0XHRjb25zdCBjb25kID0gbXNCb29sKHQwKHRoaXMuY29uZGl0aW9uKSlcblx0XHRcdHJldHVybiB0aGlzLm5lZ2F0ZSA/IGNvbmQgOiBVbmFyeUV4cHJlc3Npb24oJyEnLCBjb25kKVxuXHRcdH1cblxuXHRcdHJldHVybiBpZkVsc2UodGhpcy5vcFRocm93bixcblx0XHRcdHRocm93biA9PiBJZlN0YXRlbWVudChmYWlsQ29uZCgpLCBUaHJvd1N0YXRlbWVudChtc0Vycm9yKHQwKHRocm93bikpKSksXG5cdFx0XHQoKSA9PiB7XG5cdFx0XHRcdGlmICh0aGlzLmNvbmRpdGlvbiBpbnN0YW5jZW9mIENhbGwpIHtcblx0XHRcdFx0XHRjb25zdCBjYWxsID0gdGhpcy5jb25kaXRpb25cblx0XHRcdFx0XHRjb25zdCBhbnlTcGxhdCA9IGNhbGwuYXJncy5zb21lKF8gPT4gXyBpbnN0YW5jZW9mIFNwbGF0KVxuXHRcdFx0XHRcdGNvbnRleHQuY2hlY2soIWFueVNwbGF0LCBjYWxsLmxvYywgJ1RPRE86IFNwbGF0IGFyZ3MgaW4gYXNzZXJ0Jylcblx0XHRcdFx0XHRjb25zdCBhc3MgPSB0aGlzLm5lZ2F0ZSA/IG1zQXNzZXJ0Tm90IDogbXNBc3NlcnRcblx0XHRcdFx0XHRyZXR1cm4gYXNzKHQwKGNhbGwuY2FsbGVkKSwgLi4uY2FsbC5hcmdzLm1hcCh0MCkpXG5cdFx0XHRcdH0gZWxzZVxuXHRcdFx0XHRcdHJldHVybiBJZlN0YXRlbWVudChmYWlsQ29uZCgpLCBUaHJvd0Fzc2VydEZhaWwpXG5cdFx0XHR9KVxuXHR9LFxuXG5cdEFzc2lnblNpbmdsZSh2YWxXcmFwKSB7XG5cdFx0Y29uc3QgdmFsID0gdmFsV3JhcCA9PT0gdW5kZWZpbmVkID8gdDAodGhpcy52YWx1ZSkgOiB2YWxXcmFwKHQwKHRoaXMudmFsdWUpKVxuXHRcdGNvbnN0IGRlY2xhcmUgPVxuXHRcdFx0bWFrZURlY2xhcmF0b3IodGhpcy5hc3NpZ25lZSwgdmFsLCBmYWxzZSwgdmVyaWZ5UmVzdWx0cy5pc0V4cG9ydEFzc2lnbih0aGlzKSlcblx0XHRyZXR1cm4gVmFyaWFibGVEZWNsYXJhdGlvbih0aGlzLmFzc2lnbmVlLmlzTXV0YWJsZSgpID8gJ2xldCcgOiAnY29uc3QnLCBbIGRlY2xhcmUgXSlcblx0fSxcblx0Ly8gVE9ETzpFUzYgSnVzdCB1c2UgbmF0aXZlIGRlc3RydWN0dXJpbmcgYXNzaWduXG5cdEFzc2lnbkRlc3RydWN0dXJlKCkge1xuXHRcdHJldHVybiBWYXJpYWJsZURlY2xhcmF0aW9uKHRoaXMua2luZCgpID09PSBMRF9NdXRhYmxlID8gJ2xldCcgOiAnY29uc3QnLFxuXHRcdFx0bWFrZURlc3RydWN0dXJlRGVjbGFyYXRvcnMoXG5cdFx0XHRcdHRoaXMuYXNzaWduZWVzLFxuXHRcdFx0XHR0aGlzLmtpbmQoKSA9PT0gTERfTGF6eSxcblx0XHRcdFx0dDAodGhpcy52YWx1ZSksXG5cdFx0XHRcdGZhbHNlLFxuXHRcdFx0XHR2ZXJpZnlSZXN1bHRzLmlzRXhwb3J0QXNzaWduKHRoaXMpKSlcblx0fSxcblxuXHRCYWdFbnRyeSgpIHsgcmV0dXJuIG1zQWRkKElkQnVpbHQsIHQwKHRoaXMudmFsdWUpKSB9LFxuXG5cdEJhZ0VudHJ5TWFueSgpIHsgcmV0dXJuIG1zQWRkTWFueShJZEJ1aWx0LCB0MCh0aGlzLnZhbHVlKSkgfSxcblxuXHRCYWdTaW1wbGUoKSB7IHJldHVybiBBcnJheUV4cHJlc3Npb24odGhpcy5wYXJ0cy5tYXAodDApKSB9LFxuXG5cdEJsb2NrRG8obGVhZCwgb3BEZWNsYXJlUmVzLCBvcE91dCkge1xuXHRcdC8vIFRPRE86RVM2IE9wdGlvbmFsIGFyZ3VtZW50c1xuXHRcdGlmIChsZWFkID09PSB1bmRlZmluZWQpIGxlYWQgPSBudWxsXG5cdFx0aWYgKG9wRGVjbGFyZVJlcyA9PT0gdW5kZWZpbmVkKSBvcERlY2xhcmVSZXMgPSBudWxsXG5cdFx0aWYgKG9wT3V0ID09PSB1bmRlZmluZWQpIG9wT3V0ID0gbnVsbFxuXHRcdGFzc2VydChvcERlY2xhcmVSZXMgPT09IG51bGwpXG5cdFx0cmV0dXJuIEJsb2NrU3RhdGVtZW50KGNhdChsZWFkLCB0TGluZXModGhpcy5saW5lcyksIG9wT3V0KSlcblx0fSxcblxuXHRCbG9ja1ZhbFRocm93KGxlYWQsIG9wRGVjbGFyZVJlcywgb3BPdXQpIHtcblx0XHQvLyBUT0RPOkVTNiBPcHRpb25hbCBhcmd1bWVudHNcblx0XHRpZiAobGVhZCA9PT0gdW5kZWZpbmVkKSBsZWFkID0gbnVsbFxuXHRcdGlmIChvcERlY2xhcmVSZXMgPT09IHVuZGVmaW5lZCkgb3BEZWNsYXJlUmVzID0gbnVsbFxuXHRcdGlmIChvcE91dCA9PT0gdW5kZWZpbmVkKSBvcE91dCA9IG51bGxcblx0XHRjb250ZXh0Lndhcm5JZihvcERlY2xhcmVSZXMgIT09IG51bGwgfHwgb3BPdXQgIT09IG51bGwsIHRoaXMubG9jLFxuXHRcdFx0J091dCBjb25kaXRpb24gaWdub3JlZCBiZWNhdXNlIG9mIG9oLW5vIScpXG5cdFx0cmV0dXJuIEJsb2NrU3RhdGVtZW50KGNhdChsZWFkLCB0TGluZXModGhpcy5saW5lcyksIHQwKHRoaXMuX3Rocm93KSkpXG5cdH0sXG5cblx0QmxvY2tXaXRoUmV0dXJuKGxlYWQsIG9wRGVjbGFyZVJlcywgb3BPdXQpIHtcblx0XHRyZXR1cm4gdHJhbnNwaWxlQmxvY2sodDAodGhpcy5yZXR1cm5lZCksIHRMaW5lcyh0aGlzLmxpbmVzKSwgbGVhZCwgb3BEZWNsYXJlUmVzLCBvcE91dClcblx0fSxcblxuXHRCbG9ja0JhZyhsZWFkLCBvcERlY2xhcmVSZXMsIG9wT3V0KSB7XG5cdFx0cmV0dXJuIHRyYW5zcGlsZUJsb2NrKFxuXHRcdFx0SWRCdWlsdCxcblx0XHRcdGNhdChEZWNsYXJlQnVpbHRCYWcsIHRMaW5lcyh0aGlzLmxpbmVzKSksXG5cdFx0XHRsZWFkLCBvcERlY2xhcmVSZXMsIG9wT3V0KVxuXHR9LFxuXG5cdEJsb2NrT2JqKGxlYWQsIG9wRGVjbGFyZVJlcywgb3BPdXQpIHtcblx0XHRjb25zdCBsaW5lcyA9IGNhdChEZWNsYXJlQnVpbHRPYmosIHRMaW5lcyh0aGlzLmxpbmVzKSlcblx0XHRjb25zdCByZXMgPSBpZkVsc2UodGhpcy5vcE9iamVkLFxuXHRcdFx0b2JqZWQgPT4gaWZFbHNlKHRoaXMub3BOYW1lLFxuXHRcdFx0XHRuYW1lID0+IG1zU2V0KHQwKG9iamVkKSwgSWRCdWlsdCwgTGl0ZXJhbChuYW1lKSksXG5cdFx0XHRcdCgpID0+IG1zU2V0KHQwKG9iamVkKSwgSWRCdWlsdCkpLFxuXHRcdFx0KCkgPT4gaWZFbHNlKHRoaXMub3BOYW1lLFxuXHRcdFx0XHRfID0+IG1zU2V0TmFtZShJZEJ1aWx0LCBMaXRlcmFsKF8pKSxcblx0XHRcdFx0KCkgPT4gSWRCdWlsdCkpXG5cdFx0cmV0dXJuIHRyYW5zcGlsZUJsb2NrKHJlcywgbGluZXMsIGxlYWQsIG9wRGVjbGFyZVJlcywgb3BPdXQpXG5cdH0sXG5cblx0QmxvY2tNYXAobGVhZCwgb3BEZWNsYXJlUmVzLCBvcE91dCkge1xuXHRcdHJldHVybiB0cmFuc3BpbGVCbG9jayhcblx0XHRcdElkQnVpbHQsXG5cdFx0XHRjYXQoRGVjbGFyZUJ1aWx0TWFwLCB0TGluZXModGhpcy5saW5lcykpLFxuXHRcdFx0bGVhZCwgb3BEZWNsYXJlUmVzLCBvcE91dClcblx0fSxcblxuXHRCbG9ja1dyYXAoKSB7IHJldHVybiBibG9ja1dyYXAodDAodGhpcy5ibG9jaykpIH0sXG5cblx0QnJlYWtEbygpIHsgcmV0dXJuIEJyZWFrU3RhdGVtZW50KCkgfSxcblxuXHRCcmVha1ZhbCgpIHsgcmV0dXJuIFJldHVyblN0YXRlbWVudCh0MCh0aGlzLnZhbHVlKSkgfSxcblxuXHRDYWxsKCkge1xuXHRcdGNvbnN0IGFueVNwbGF0ID0gdGhpcy5hcmdzLnNvbWUoYXJnID0+IGFyZyBpbnN0YW5jZW9mIFNwbGF0KVxuXHRcdGlmIChhbnlTcGxhdCkge1xuXHRcdFx0Y29uc3QgYXJncyA9IHRoaXMuYXJncy5tYXAoYXJnID0+XG5cdFx0XHRcdGFyZyBpbnN0YW5jZW9mIFNwbGF0ID9cblx0XHRcdFx0XHRtc0Fycih0MChhcmcuc3BsYXR0ZWQpKSA6XG5cdFx0XHRcdFx0dDAoYXJnKSlcblx0XHRcdHJldHVybiBDYWxsRXhwcmVzc2lvbihJZEZ1bmN0aW9uQXBwbHlDYWxsLCBbXG5cdFx0XHRcdHQwKHRoaXMuY2FsbGVkKSxcblx0XHRcdFx0TGl0TnVsbCxcblx0XHRcdFx0Q2FsbEV4cHJlc3Npb24obWVtYmVyKExpdEVtcHR5QXJyYXksICdjb25jYXQnKSwgYXJncyldKVxuXHRcdH1cblx0XHRlbHNlIHJldHVybiBDYWxsRXhwcmVzc2lvbih0MCh0aGlzLmNhbGxlZCksIHRoaXMuYXJncy5tYXAodDApKVxuXHR9LFxuXG5cdENhc2VEbygpIHtcblx0XHRjb25zdCBib2R5ID0gY2FzZUJvZHkodGhpcy5wYXJ0cywgdGhpcy5vcEVsc2UpXG5cdFx0cmV0dXJuIGlmRWxzZSh0aGlzLm9wQ2FzZWQsIF8gPT4gQmxvY2tTdGF0ZW1lbnQoWyB0MChfKSwgYm9keSBdKSwgKCkgPT4gYm9keSlcblx0fSxcblxuXHRDYXNlVmFsKCkge1xuXHRcdGNvbnN0IGJvZHkgPSBjYXNlQm9keSh0aGlzLnBhcnRzLCB0aGlzLm9wRWxzZSlcblx0XHRjb25zdCBibG9jayA9IGlmRWxzZSh0aGlzLm9wQ2FzZWQsIF8gPT4gWyB0MChfKSwgYm9keSBdLCAoKSA9PiBbIGJvZHkgXSlcblx0XHRyZXR1cm4gYmxvY2tXcmFwKEJsb2NrU3RhdGVtZW50KGJsb2NrKSlcblx0fSxcblxuXHRDYXNlRG9QYXJ0OiBjYXNlUGFydCxcblx0Q2FzZVZhbFBhcnQ6IGNhc2VQYXJ0LFxuXG5cdENsYXNzKCkge1xuXHRcdGNvbnN0IG1ldGhvZHMgPSBjYXQoXG5cdFx0XHR0aGlzLnN0YXRpY3MubWFwKG1ldGhvZERlZmluaXRpb24odHJ1ZSkpLFxuXHRcdFx0b3BNYXAodGhpcy5vcENvbnN0cnVjdG9yLCBjb25zdHJ1Y3RvckRlZmluaXRpb24pLFxuXHRcdFx0dGhpcy5tZXRob2RzLm1hcChtZXRob2REZWZpbml0aW9uKGZhbHNlKSkpXG5cdFx0Y29uc3Qgb3BOYW1lID0gb3BNYXAodGhpcy5vcE5hbWUsIGlkQ2FjaGVkKVxuXHRcdHJldHVybiBDbGFzc0V4cHJlc3Npb24ob3BOYW1lLCBvcE1hcCh0aGlzLnN1cGVyQ2xhc3MsIHQwKSwgQ2xhc3NCb2R5KG1ldGhvZHMpKVxuXHR9LFxuXG5cdENvbmRpdGlvbmFsRG8oKSB7XG5cdFx0cmV0dXJuIElmU3RhdGVtZW50KFxuXHRcdFx0dGhpcy5pc1VubGVzcyA/IFVuYXJ5RXhwcmVzc2lvbignIScsIG1heWJlQm9vbFdyYXAodDAodGhpcy50ZXN0KSkpIDogdDAodGhpcy50ZXN0KSxcblx0XHRcdHQwKHRoaXMucmVzdWx0KSlcblx0fSxcblxuXHRDb25kaXRpb25hbFZhbCgpIHtcblx0XHRjb25zdCB0ZXN0ID0gbWF5YmVCb29sV3JhcCh0MCh0aGlzLnRlc3QpKVxuXHRcdGNvbnN0IHJlc3VsdCA9IG1zU29tZShibG9ja1dyYXAodDAodGhpcy5yZXN1bHQpKSlcblx0XHRyZXR1cm4gdGhpcy5pc1VubGVzcyA/XG5cdFx0XHRDb25kaXRpb25hbEV4cHJlc3Npb24odGVzdCwgTXNOb25lLCByZXN1bHQpIDpcblx0XHRcdENvbmRpdGlvbmFsRXhwcmVzc2lvbih0ZXN0LCByZXN1bHQsIE1zTm9uZSlcblx0fSxcblxuXHRDYXRjaCgpIHtcblx0XHRyZXR1cm4gQ2F0Y2hDbGF1c2UodDAodGhpcy5jYXVnaHQpLCB0MCh0aGlzLmJsb2NrKSlcblx0fSxcblxuXHRDb250aW51ZSgpIHsgcmV0dXJuIENvbnRpbnVlU3RhdGVtZW50KCkgfSxcblxuXHQvLyBUT0RPOiBpbmNsdWRlSW5vdXRDaGVja3MgaXMgbWlzbmFtZWRcblx0RGVidWcoKSB7IHJldHVybiBjb250ZXh0Lm9wdHMuaW5jbHVkZUlub3V0Q2hlY2tzKCkgPyB0TGluZXModGhpcy5saW5lcykgOiBbIF0gfSxcblxuXHRFeGNlcHREbygpIHsgcmV0dXJuIHRyYW5zcGlsZUV4Y2VwdCh0aGlzKSB9LFxuXHRFeGNlcHRWYWwoKSB7IHJldHVybiBibG9ja1dyYXAoQmxvY2tTdGF0ZW1lbnQoWyB0cmFuc3BpbGVFeGNlcHQodGhpcykgXSkpIH0sXG5cblx0Rm9yRG8oKSB7IHJldHVybiBmb3JMb29wKHRoaXMub3BJdGVyYXRlZSwgdGhpcy5ibG9jaykgfSxcblxuXHRGb3JCYWcoKSB7XG5cdFx0cmV0dXJuIGJsb2NrV3JhcChCbG9ja1N0YXRlbWVudChbXG5cdFx0XHREZWNsYXJlQnVpbHRCYWcsXG5cdFx0XHRmb3JMb29wKHRoaXMub3BJdGVyYXRlZSwgdGhpcy5ibG9jayksXG5cdFx0XHRSZXR1cm5CdWlsdFxuXHRcdF0pKVxuXHR9LFxuXG5cdEZvclZhbCgpIHtcblx0XHRyZXR1cm4gYmxvY2tXcmFwKEJsb2NrU3RhdGVtZW50KFsgZm9yTG9vcCh0aGlzLm9wSXRlcmF0ZWUsIHRoaXMuYmxvY2spIF0pKVxuXHR9LFxuXG5cdEZ1bigpIHtcblx0XHRjb25zdCBvbGRJbkdlbmVyYXRvciA9IGlzSW5HZW5lcmF0b3Jcblx0XHRpc0luR2VuZXJhdG9yID0gdGhpcy5pc0dlbmVyYXRvclxuXG5cdFx0Ly8gVE9ETzpFUzYgdXNlIGAuLi5gZlxuXHRcdGNvbnN0IG5BcmdzID0gTGl0ZXJhbCh0aGlzLmFyZ3MubGVuZ3RoKVxuXHRcdGNvbnN0IG9wRGVjbGFyZVJlc3QgPSBvcE1hcCh0aGlzLm9wUmVzdEFyZywgcmVzdCA9PlxuXHRcdFx0ZGVjbGFyZShyZXN0LCBDYWxsRXhwcmVzc2lvbihBcnJheVNsaWNlQ2FsbCwgW0lkQXJndW1lbnRzLCBuQXJnc10pKSlcblx0XHRjb25zdCBhcmdDaGVja3MgPSBvcElmKGNvbnRleHQub3B0cy5pbmNsdWRlVHlwZUNoZWNrcygpLCAoKSA9PlxuXHRcdFx0ZmxhdE9wTWFwKHRoaXMuYXJncywgb3BUeXBlQ2hlY2tGb3JMb2NhbERlY2xhcmUpKVxuXG5cdFx0Y29uc3QgX2luID0gb3BNYXAodGhpcy5vcEluLCB0MClcblxuXHRcdGNvbnN0IG9wRGVjbGFyZVRoaXMgPSBvcE1hcCh0aGlzLm9wRGVjbGFyZVRoaXMsICgpID0+XG5cdFx0XHRWYXJpYWJsZURlY2xhcmF0aW9uKCdjb25zdCcsIFsgVmFyaWFibGVEZWNsYXJhdG9yKElkTGV4aWNhbFRoaXMsIFRoaXNFeHByZXNzaW9uKCkpIF0pKVxuXG5cdFx0Y29uc3QgbGVhZCA9IGNhdChvcERlY2xhcmVUaGlzLCBvcERlY2xhcmVSZXN0LCBhcmdDaGVja3MsIF9pbilcblxuXHRcdGNvbnN0IF9vdXQgPSBvcE1hcCh0aGlzLm9wT3V0LCB0MClcblx0XHRjb25zdCBib2R5ID0gdDModGhpcy5ibG9jaywgbGVhZCwgdGhpcy5vcERlY2xhcmVSZXMsIF9vdXQpXG5cdFx0Y29uc3QgYXJncyA9IHRoaXMuYXJncy5tYXAodDApXG5cdFx0aXNJbkdlbmVyYXRvciA9IG9sZEluR2VuZXJhdG9yXG5cdFx0Y29uc3QgaWQgPSBvcE1hcCh0aGlzLm9wTmFtZSwgaWRDYWNoZWQpXG5cblx0XHRjb25zdCBjYW5Vc2VBcnJvd0Z1bmN0aW9uID1cblx0XHRcdGlkID09PSBudWxsICYmIG9wRGVjbGFyZVRoaXMgPT09IG51bGwgJiYgb3BEZWNsYXJlUmVzdCA9PT0gbnVsbCAmJiAhdGhpcy5pc0dlbmVyYXRvclxuXHRcdHJldHVybiBjYW5Vc2VBcnJvd0Z1bmN0aW9uID9cblx0XHRcdEFycm93RnVuY3Rpb25FeHByZXNzaW9uKGFyZ3MsIGJvZHkpIDpcblx0XHRcdEZ1bmN0aW9uRXhwcmVzc2lvbihpZCwgYXJncywgYm9keSwgdGhpcy5pc0dlbmVyYXRvcilcblx0fSxcblxuXHRMYXp5KCkgeyByZXR1cm4gbGF6eVdyYXAodDAodGhpcy52YWx1ZSkpIH0sXG5cblx0TnVtYmVyTGl0ZXJhbCgpIHtcblx0XHQvLyBOZWdhdGl2ZSBudW1iZXJzIGFyZSBub3QgcGFydCBvZiBFUyBzcGVjLlxuXHRcdC8vIGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi81LjEvI3NlYy03LjguM1xuXHRcdGNvbnN0IGxpdCA9IExpdGVyYWwoTWF0aC5hYnModGhpcy52YWx1ZSkpXG5cdFx0cmV0dXJuIGlzUG9zaXRpdmUodGhpcy52YWx1ZSkgPyBsaXQgOiBVbmFyeUV4cHJlc3Npb24oJy0nLCBsaXQpXG5cdH0sXG5cblx0R2xvYmFsQWNjZXNzKCkgeyByZXR1cm4gSWRlbnRpZmllcih0aGlzLm5hbWUpIH0sXG5cblx0TG9jYWxBY2Nlc3MoKSB7XG5cdFx0cmV0dXJuIHRoaXMubmFtZSA9PT0gJ3RoaXMnID9cblx0XHRcdElkZW50aWZpZXIoJ190aGlzJykgOlxuXHRcdFx0YWNjZXNzTG9jYWxEZWNsYXJlKHZlcmlmeVJlc3VsdHMubG9jYWxEZWNsYXJlRm9yQWNjZXNzKHRoaXMpKVxuXHR9LFxuXG5cdExvY2FsRGVjbGFyZSgpIHsgcmV0dXJuIGlkRm9yRGVjbGFyZUNhY2hlZCh0aGlzKSB9LFxuXG5cdExvY2FsTXV0YXRlKCkge1xuXHRcdHJldHVybiBhc3NpZ25tZW50RXhwcmVzc2lvblBsYWluKGlkQ2FjaGVkKHRoaXMubmFtZSksIHQwKHRoaXMudmFsdWUpKVxuXHR9LFxuXG5cdExvZ2ljKCkge1xuXHRcdGFzc2VydCh0aGlzLmtpbmQgPT09IExfQW5kIHx8IHRoaXMua2luZCA9PT0gTF9Pcilcblx0XHRjb25zdCBvcCA9IHRoaXMua2luZCA9PT0gTF9BbmQgPyAnJiYnIDogJ3x8J1xuXHRcdHJldHVybiB0YWlsKHRoaXMuYXJncykucmVkdWNlKChhLCBiKSA9PiBMb2dpY2FsRXhwcmVzc2lvbihvcCwgYSwgdDAoYikpLCB0MCh0aGlzLmFyZ3NbMF0pKVxuXHR9LFxuXG5cdE1hcEVudHJ5KCkgeyByZXR1cm4gbXNBc3NvYyhJZEJ1aWx0LCB0MCh0aGlzLmtleSksIHQwKHRoaXMudmFsKSkgfSxcblxuXHRNZW1iZXIoKSB7IHJldHVybiBtZW1iZXIodDAodGhpcy5vYmplY3QpLCB0aGlzLm5hbWUpIH0sXG5cblx0TWVtYmVyU2V0KCkge1xuXHRcdHN3aXRjaCAodGhpcy5raW5kKSB7XG5cdFx0XHRjYXNlIE1TX011dGF0ZTpcblx0XHRcdFx0cmV0dXJuIGFzc2lnbm1lbnRFeHByZXNzaW9uUGxhaW4obWVtYmVyKHQwKHRoaXMub2JqZWN0KSwgdGhpcy5uYW1lKSwgdDAodGhpcy52YWx1ZSkpXG5cdFx0XHRjYXNlIE1TX05ldzpcblx0XHRcdFx0cmV0dXJuIG1zTmV3UHJvcGVydHkodDAodGhpcy5vYmplY3QpLCBMaXRlcmFsKHRoaXMubmFtZSksIHQwKHRoaXMudmFsdWUpKVxuXHRcdFx0Y2FzZSBNU19OZXdNdXRhYmxlOlxuXHRcdFx0XHRyZXR1cm4gbXNOZXdNdXRhYmxlUHJvcGVydHkodDAodGhpcy5vYmplY3QpLCBMaXRlcmFsKHRoaXMubmFtZSksIHQwKHRoaXMudmFsdWUpKVxuXHRcdFx0ZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKClcblx0XHR9XG5cdH0sXG5cblx0TW9kdWxlKCkge1xuXHRcdGNvbnN0IGJvZHkgPSBjYXQoXG5cdFx0XHR0TGluZXModGhpcy5saW5lcyksXG5cdFx0XHRvcE1hcCh0aGlzLm9wRGVmYXVsdEV4cG9ydCwgXyA9PiBhc3NpZ25tZW50RXhwcmVzc2lvblBsYWluKEV4cG9ydHNEZWZhdWx0LCB0MChfKSkpKVxuXHRcdHJldHVybiBQcm9ncmFtKGNhdChcblx0XHRcdG9wSWYoY29udGV4dC5vcHRzLmluY2x1ZGVVc2VTdHJpY3QoKSwgKCkgPT4gVXNlU3RyaWN0KSxcblx0XHRcdG9wSWYoY29udGV4dC5vcHRzLmluY2x1ZGVBbWRlZmluZSgpLCAoKSA9PiBBbWRlZmluZUhlYWRlciksXG5cdFx0XHR0b1N0YXRlbWVudChhbWRXcmFwTW9kdWxlKHRoaXMuZG9Vc2VzLCB0aGlzLnVzZXMuY29uY2F0KHRoaXMuZGVidWdVc2VzKSwgYm9keSkpKSlcblx0fSxcblxuXHROZXcoKSB7XG5cdFx0Y29uc3QgYW55U3BsYXQgPSB0aGlzLmFyZ3Muc29tZShfID0+IF8gaW5zdGFuY2VvZiBTcGxhdClcblx0XHRjb250ZXh0LmNoZWNrKCFhbnlTcGxhdCwgdGhpcy5sb2MsICdUT0RPOiBTcGxhdCBwYXJhbXMgZm9yIG5ldycpXG5cdFx0cmV0dXJuIE5ld0V4cHJlc3Npb24odDAodGhpcy50eXBlKSwgdGhpcy5hcmdzLm1hcCh0MCkpXG5cdH0sXG5cblx0Tm90KCkgeyByZXR1cm4gVW5hcnlFeHByZXNzaW9uKCchJywgdDAodGhpcy5hcmcpKSB9LFxuXG5cdE9iakVudHJ5KCkge1xuXHRcdHJldHVybiAodGhpcy5hc3NpZ24gaW5zdGFuY2VvZiBBc3NpZ25TaW5nbGUgJiYgIXRoaXMuYXNzaWduLmFzc2lnbmVlLmlzTGF6eSgpKSA/XG5cdFx0XHR0MSh0aGlzLmFzc2lnbiwgdmFsID0+XG5cdFx0XHRcdGFzc2lnbm1lbnRFeHByZXNzaW9uUGxhaW4obWVtYmVyKElkQnVpbHQsIHRoaXMuYXNzaWduLmFzc2lnbmVlLm5hbWUpLCB2YWwpKSA6XG5cdFx0XHRjYXQoXG5cdFx0XHRcdHQwKHRoaXMuYXNzaWduKSxcblx0XHRcdFx0dGhpcy5hc3NpZ24uYWxsQXNzaWduZWVzKCkubWFwKF8gPT5cblx0XHRcdFx0XHRtc1NldExhenkoSWRCdWlsdCwgTGl0ZXJhbChfLm5hbWUpLCBpZEZvckRlY2xhcmVDYWNoZWQoXykpKSlcblx0fSxcblxuXHRPYmpTaW1wbGUoKSB7XG5cdFx0cmV0dXJuIE9iamVjdEV4cHJlc3Npb24odGhpcy5wYWlycy5tYXAocGFpciA9PlxuXHRcdFx0cHJvcGVydHkoJ2luaXQnLCBwcm9wZXJ0eUlkT3JMaXRlcmFsQ2FjaGVkKHBhaXIua2V5KSwgdDAocGFpci52YWx1ZSkpKSlcblx0fSxcblxuXHRRdW90ZSgpIHtcblx0XHRpZiAodGhpcy5wYXJ0cy5sZW5ndGggPT09IDApXG5cdFx0XHRyZXR1cm4gTGl0RW1wdHlTdHJpbmdcblx0XHRlbHNlIHtcblx0XHRcdGNvbnN0IHF1YXNpcyA9IFsgXSwgZXhwcmVzc2lvbnMgPSBbIF1cblxuXHRcdFx0Ly8gVGVtcGxhdGVMaXRlcmFsIG11c3Qgc3RhcnQgd2l0aCBhIFRlbXBsYXRlRWxlbWVudFxuXHRcdFx0aWYgKHR5cGVvZiB0aGlzLnBhcnRzWzBdICE9PSAnc3RyaW5nJylcblx0XHRcdFx0cXVhc2lzLnB1c2goRW1wdHlUZW1wbGF0ZUVsZW1lbnQpXG5cblx0XHRcdGZvciAobGV0IHBhcnQgb2YgdGhpcy5wYXJ0cylcblx0XHRcdFx0aWYgKHR5cGVvZiBwYXJ0ID09PSAnc3RyaW5nJylcblx0XHRcdFx0XHRxdWFzaXMucHVzaCh0ZW1wbGF0ZUVsZW1lbnRGb3JTdHJpbmcocGFydCkpXG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdC8vIFwiezF9ezF9XCIgbmVlZHMgYW4gZW1wdHkgcXVhc2kgaW4gdGhlIG1pZGRsZSAoYW5kIG9uIHRoZSBlbmRzKVxuXHRcdFx0XHRcdGlmIChxdWFzaXMubGVuZ3RoID09PSBleHByZXNzaW9ucy5sZW5ndGgpXG5cdFx0XHRcdFx0XHRxdWFzaXMucHVzaChFbXB0eVRlbXBsYXRlRWxlbWVudClcblx0XHRcdFx0XHRleHByZXNzaW9ucy5wdXNoKG1zU2hvdyh0MChwYXJ0KSkpXG5cdFx0XHRcdH1cblxuXHRcdFx0Ly8gVGVtcGxhdGVMaXRlcmFsIG11c3QgZW5kIHdpdGggYSBUZW1wbGF0ZUVsZW1lbnQsIHNvIG9uZSBtb3JlIHF1YXNpIHRoYW4gZXhwcmVzc2lvbi5cblx0XHRcdGlmIChxdWFzaXMubGVuZ3RoID09PSBleHByZXNzaW9ucy5sZW5ndGgpXG5cdFx0XHRcdHF1YXNpcy5wdXNoKEVtcHR5VGVtcGxhdGVFbGVtZW50KVxuXG5cdFx0XHRyZXR1cm4gVGVtcGxhdGVMaXRlcmFsKHF1YXNpcywgZXhwcmVzc2lvbnMpXG5cdFx0fVxuXHR9LFxuXG5cdFNwZWNpYWxEbygpIHtcblx0XHRzd2l0Y2ggKHRoaXMua2luZCkge1xuXHRcdFx0Y2FzZSBTRF9EZWJ1Z2dlcjogcmV0dXJuIERlYnVnZ2VyU3RhdGVtZW50KClcblx0XHRcdGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcih0aGlzLmtpbmQpXG5cdFx0fVxuXHR9LFxuXG5cdFNwZWNpYWxWYWwoKSB7XG5cdFx0Ly8gTWFrZSBuZXcgb2JqZWN0cyBiZWNhdXNlIHdlIHdpbGwgYXNzaWduIGBsb2NgIHRvIHRoZW0uXG5cdFx0c3dpdGNoICh0aGlzLmtpbmQpIHtcblx0XHRcdGNhc2UgU1ZfQ29udGFpbnM6IHJldHVybiBtZW1iZXIoSWRNcywgJ2NvbnRhaW5zJylcblx0XHRcdGNhc2UgU1ZfRmFsc2U6IHJldHVybiBMaXRlcmFsKGZhbHNlKVxuXHRcdFx0Y2FzZSBTVl9OdWxsOiByZXR1cm4gTGl0ZXJhbChudWxsKVxuXHRcdFx0Y2FzZSBTVl9TdWI6IHJldHVybiBtZW1iZXIoSWRNcywgJ3N1YicpXG5cdFx0XHRjYXNlIFNWX1N1cGVyOiByZXR1cm4gSWRlbnRpZmllcignc3VwZXInKVxuXHRcdFx0Y2FzZSBTVl9UaGlzTW9kdWxlRGlyZWN0b3J5OiByZXR1cm4gSWRlbnRpZmllcignX19kaXJuYW1lJylcblx0XHRcdGNhc2UgU1ZfVHJ1ZTogcmV0dXJuIExpdGVyYWwodHJ1ZSlcblx0XHRcdGNhc2UgU1ZfVW5kZWZpbmVkOiByZXR1cm4gVW5hcnlFeHByZXNzaW9uKCd2b2lkJywgTGl0WmVybylcblx0XHRcdGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcih0aGlzLmtpbmQpXG5cdFx0fVxuXHR9LFxuXG5cdFRocm93KCkge1xuXHRcdHJldHVybiBpZkVsc2UodGhpcy5vcFRocm93bixcblx0XHRcdF8gPT4gVGhyb3dTdGF0ZW1lbnQobXNFcnJvcih0MChfKSkpLFxuXHRcdFx0KCkgPT4gVGhyb3dTdGF0ZW1lbnQobXNFcnJvcihMaXRTdHJUaHJvdykpKVxuXHR9LFxuXG5cdFlpZWxkKCkgeyByZXR1cm4geWllbGRFeHByZXNzaW9uTm9EZWxlZ2F0ZSh0MCh0aGlzLnlpZWxkZWQpKSB9LFxuXG5cdFlpZWxkVG8oKSB7IHJldHVybiB5aWVsZEV4cHJlc3Npb25EZWxlZ2F0ZSh0MCh0aGlzLnlpZWxkZWRUbykpIH1cbn0pXG5cbmZ1bmN0aW9uIGNhc2VQYXJ0KGFsdGVybmF0ZSkge1xuXHRpZiAodGhpcy50ZXN0IGluc3RhbmNlb2YgUGF0dGVybikge1xuXHRcdGNvbnN0IHsgdHlwZSwgcGF0dGVybmVkLCBsb2NhbHMgfSA9IHRoaXMudGVzdFxuXHRcdGNvbnN0IGRlY2wgPSBWYXJpYWJsZURlY2xhcmF0aW9uKCdjb25zdCcsIFtcblx0XHRcdFZhcmlhYmxlRGVjbGFyYXRvcihJZEV4dHJhY3QsIG1zRXh0cmFjdCh0MCh0eXBlKSwgdDAocGF0dGVybmVkKSkpIF0pXG5cdFx0Y29uc3QgdGVzdCA9IEJpbmFyeUV4cHJlc3Npb24oJyE9PScsIElkRXh0cmFjdCwgTGl0TnVsbClcblx0XHRjb25zdCBleHRyYWN0ID0gVmFyaWFibGVEZWNsYXJhdGlvbignY29uc3QnLCBsb2NhbHMubWFwKChfLCBpZHgpID0+XG5cdFx0XHRWYXJpYWJsZURlY2xhcmF0b3IoaWRGb3JEZWNsYXJlQ2FjaGVkKF8pLCBtZW1iZXJFeHByZXNzaW9uKElkRXh0cmFjdCwgTGl0ZXJhbChpZHgpKSkpKVxuXHRcdGNvbnN0IHJlcyA9IHQxKHRoaXMucmVzdWx0LCBleHRyYWN0KVxuXHRcdHJldHVybiBCbG9ja1N0YXRlbWVudChbIGRlY2wsIElmU3RhdGVtZW50KHRlc3QsIHJlcywgYWx0ZXJuYXRlKSBdKVxuXHR9IGVsc2Vcblx0XHQvLyBhbHRlcm5hdGUgd3JpdHRlbiB0byBieSBgY2FzZUJvZHlgLlxuXHRcdHJldHVybiBJZlN0YXRlbWVudChtYXliZUJvb2xXcmFwKHQwKHRoaXMudGVzdCkpLCB0MCh0aGlzLnJlc3VsdCksIGFsdGVybmF0ZSlcbn1cblxuLy8gRnVuY3Rpb25zIHNwZWNpZmljIHRvIGNlcnRhaW4gZXhwcmVzc2lvbnMuXG5jb25zdFxuXHQvLyBXcmFwcyBhIGJsb2NrICh3aXRoIGByZXR1cm5gIHN0YXRlbWVudHMgaW4gaXQpIGluIGFuIElJRkUuXG5cdGJsb2NrV3JhcCA9IGJsb2NrID0+IHtcblx0XHRjb25zdCBpbnZva2UgPSBjYWxsRXhwcmVzc2lvblRodW5rKGZ1bmN0aW9uRXhwcmVzc2lvblRodW5rKGJsb2NrLCBpc0luR2VuZXJhdG9yKSlcblx0XHRyZXR1cm4gaXNJbkdlbmVyYXRvciA/IHlpZWxkRXhwcmVzc2lvbkRlbGVnYXRlKGludm9rZSkgOiBpbnZva2Vcblx0fSxcblxuXHRjYXNlQm9keSA9IChwYXJ0cywgb3BFbHNlKSA9PiB7XG5cdFx0bGV0IGFjYyA9IGlmRWxzZShvcEVsc2UsIHQwLCAoKSA9PiBUaHJvd05vQ2FzZU1hdGNoKVxuXHRcdGZvciAobGV0IGkgPSBwYXJ0cy5sZW5ndGggLSAxOyBpID49IDA7IGkgPSBpIC0gMSlcblx0XHRcdGFjYyA9IHQxKHBhcnRzW2ldLCBhY2MpXG5cdFx0cmV0dXJuIGFjY1xuXHR9LFxuXG5cdGZvckxvb3AgPSAob3BJdGVyYXRlZSwgYmxvY2spID0+XG5cdFx0aWZFbHNlKG9wSXRlcmF0ZWUsXG5cdFx0XHQoeyBlbGVtZW50LCBiYWcgfSkgPT4ge1xuXHRcdFx0XHRjb25zdCBkZWNsYXJlID0gVmFyaWFibGVEZWNsYXJhdGlvbignbGV0JywgWyBWYXJpYWJsZURlY2xhcmF0b3IodDAoZWxlbWVudCkpIF0pXG5cdFx0XHRcdHJldHVybiBGb3JPZlN0YXRlbWVudChkZWNsYXJlLCB0MChiYWcpLCB0MChibG9jaykpXG5cdFx0XHR9LFxuXHRcdFx0KCkgPT4gZm9yU3RhdGVtZW50SW5maW5pdGUodDAoYmxvY2spKSksXG5cblx0Y29uc3RydWN0b3JEZWZpbml0aW9uID0gZnVuID0+XG5cdFx0TWV0aG9kRGVmaW5pdGlvbihJZGVudGlmaWVyKCdjb25zdHJ1Y3RvcicpLCB0MChmdW4pLCAnY29uc3RydWN0b3InLCBmYWxzZSwgZmFsc2UpLFxuXHRtZXRob2REZWZpbml0aW9uID0gaXNTdGF0aWMgPT4gbWV0aG9kID0+IHtcblx0XHRpZiAobWV0aG9kIGluc3RhbmNlb2YgRnVuKSB7XG5cdFx0XHRhc3NlcnQobWV0aG9kLm9wTmFtZSAhPT0gbnVsbClcblx0XHRcdGNvbnN0IGtleSA9IHByb3BlcnR5SWRPckxpdGVyYWxDYWNoZWQobWV0aG9kLm9wTmFtZSlcblx0XHRcdGNvbnN0IHZhbHVlID0gdDAobWV0aG9kKVxuXHRcdFx0dmFsdWUuaWQgPSBudWxsXG5cdFx0XHRjb25zdCBjb21wdXRlZCA9IGZhbHNlXG5cdFx0XHRyZXR1cm4gTWV0aG9kRGVmaW5pdGlvbihrZXksIHZhbHVlLCAnbWV0aG9kJywgaXNTdGF0aWMsIGNvbXB1dGVkKVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRhc3NlcnQobWV0aG9kIGluc3RhbmNlb2YgTWV0aG9kSW1wbClcblx0XHRcdGNvbnN0IGZ1biA9IG1ldGhvZC5mdW5cblx0XHRcdGFzc2VydChmdW4ub3BOYW1lID09PSBudWxsKVxuXHRcdFx0Y29uc3Qga2V5ID0gbXNTeW1ib2wodDAobWV0aG9kLnN5bWJvbCkpXG5cdFx0XHRjb25zdCB2YWx1ZSA9IHQwKGZ1bilcblx0XHRcdC8vIFRoaXMgaXMgaGFuZGxlZCBieSBga2V5YC5cblx0XHRcdHZhbHVlLmlkID0gbnVsbFxuXHRcdFx0Ly8gVE9ETzogZ2V0L3NldCFcblx0XHRcdGNvbnN0IGNvbXB1dGVkID0gdHJ1ZVxuXHRcdFx0cmV0dXJuIE1ldGhvZERlZmluaXRpb24oa2V5LCB2YWx1ZSwgJ21ldGhvZCcsIGlzU3RhdGljLCBjb21wdXRlZClcblx0XHR9XG5cdH0sXG5cblx0dHJhbnNwaWxlQmxvY2sgPSAocmV0dXJuZWQsIGxpbmVzLCBsZWFkLCBvcERlY2xhcmVSZXMsIG9wT3V0KSA9PiB7XG5cdFx0Ly8gVE9ETzpFUzYgT3B0aW9uYWwgYXJndW1lbnRzXG5cdFx0aWYgKGxlYWQgPT09IHVuZGVmaW5lZCkgbGVhZCA9IG51bGxcblx0XHRpZiAob3BEZWNsYXJlUmVzID09PSB1bmRlZmluZWQpIG9wRGVjbGFyZVJlcyA9IG51bGxcblx0XHRpZiAob3BPdXQgPT09IHVuZGVmaW5lZCkgb3BPdXQgPSBudWxsXG5cdFx0Y29uc3QgZmluID0gaWZFbHNlKG9wRGVjbGFyZVJlcyxcblx0XHRcdHJkID0+IHtcblx0XHRcdFx0Y29uc3QgcmV0ID0gbWF5YmVXcmFwSW5DaGVja0NvbnRhaW5zKHJldHVybmVkLCByZC5vcFR5cGUsIHJkLm5hbWUpXG5cdFx0XHRcdHJldHVybiBpZkVsc2Uob3BPdXQsXG5cdFx0XHRcdFx0XyA9PiBjYXQoZGVjbGFyZShyZCwgcmV0KSwgXywgUmV0dXJuUmVzKSxcblx0XHRcdFx0XHQoKSA9PiBSZXR1cm5TdGF0ZW1lbnQocmV0KSlcblx0XHRcdH0sXG5cdFx0XHQoKSA9PiBjYXQob3BPdXQsIFJldHVyblN0YXRlbWVudChyZXR1cm5lZCkpKVxuXHRcdHJldHVybiBCbG9ja1N0YXRlbWVudChjYXQobGVhZCwgbGluZXMsIGZpbikpXG5cdH0sXG5cblx0dHJhbnNwaWxlRXhjZXB0ID0gZXhjZXB0ID0+XG5cdFx0VHJ5U3RhdGVtZW50KFxuXHRcdFx0dDAoZXhjZXB0Ll90cnkpLFxuXHRcdFx0b3BNYXAoZXhjZXB0Ll9jYXRjaCwgdDApLFxuXHRcdFx0b3BNYXAoZXhjZXB0Ll9maW5hbGx5LCB0MCkpXG5cbi8vIE1vZHVsZSBoZWxwZXJzXG5jb25zdFxuXHRhbWRXcmFwTW9kdWxlID0gKGRvVXNlcywgb3RoZXJVc2VzLCBib2R5KSA9PiB7XG5cdFx0Y29uc3QgYWxsVXNlcyA9IGRvVXNlcy5jb25jYXQob3RoZXJVc2VzKVxuXHRcdGNvbnN0IHVzZVBhdGhzID0gQXJyYXlFeHByZXNzaW9uKGNhdChcblx0XHRcdExpdFN0ckV4cG9ydHMsXG5cdFx0XHRhbGxVc2VzLm1hcChfID0+IExpdGVyYWwobWFuZ2xlUGF0aChfLnBhdGgpKSkpKVxuXHRcdGNvbnN0IHVzZUlkZW50aWZpZXJzID0gYWxsVXNlcy5tYXAoKF8sIGkpID0+IGlkQ2FjaGVkKGAke3BhdGhCYXNlTmFtZShfLnBhdGgpfV8ke2l9YCkpXG5cdFx0Y29uc3QgdXNlQXJncyA9IGNhdChJZEV4cG9ydHMsIHVzZUlkZW50aWZpZXJzKVxuXHRcdGNvbnN0IHVzZURvcyA9IGRvVXNlcy5tYXAoKHVzZSwgaSkgPT5cblx0XHRcdGxvYyhFeHByZXNzaW9uU3RhdGVtZW50KG1zR2V0TW9kdWxlKHVzZUlkZW50aWZpZXJzW2ldKSksIHVzZS5sb2MpKVxuXHRcdGNvbnN0IG9wVXNlRGVjbGFyZSA9IG9wSWYoIWlzRW1wdHkob3RoZXJVc2VzKSxcblx0XHRcdCgpID0+IFZhcmlhYmxlRGVjbGFyYXRpb24oJ2NvbnN0JywgZmxhdE1hcChvdGhlclVzZXMsICh1c2UsIGkpID0+XG5cdFx0XHRcdHVzZURlY2xhcmF0b3JzKHVzZSwgdXNlSWRlbnRpZmllcnNbaSArIGRvVXNlcy5sZW5ndGhdKSkpKVxuXHRcdGNvbnN0IGZ1bGxCb2R5ID0gQmxvY2tTdGF0ZW1lbnQoY2F0KHVzZURvcywgb3BVc2VEZWNsYXJlLCBib2R5LCBSZXR1cm5FeHBvcnRzKSlcblx0XHRjb25zdCBsYXp5Qm9keSA9XG5cdFx0XHRjb250ZXh0Lm9wdHMubGF6eU1vZHVsZSgpID9cblx0XHRcdFx0QmxvY2tTdGF0ZW1lbnQoWyBFeHByZXNzaW9uU3RhdGVtZW50KFxuXHRcdFx0XHRcdGFzc2lnbm1lbnRFeHByZXNzaW9uUGxhaW4oRXhwb3J0c0dldCxcblx0XHRcdFx0XHRcdG1zTGF6eShmdW5jdGlvbkV4cHJlc3Npb25UaHVuayhmdWxsQm9keSkpKSkgXSkgOlxuXHRcdFx0XHRmdWxsQm9keVxuXHRcdHJldHVybiBDYWxsRXhwcmVzc2lvbihJZERlZmluZSwgWyB1c2VQYXRocywgQXJyb3dGdW5jdGlvbkV4cHJlc3Npb24odXNlQXJncywgbGF6eUJvZHkpIF0pXG5cdH0sXG5cblx0cGF0aEJhc2VOYW1lID0gcGF0aCA9PlxuXHRcdHBhdGguc3Vic3RyKHBhdGgubGFzdEluZGV4T2YoJy8nKSArIDEpLFxuXG5cdHVzZURlY2xhcmF0b3JzID0gKHVzZSwgbW9kdWxlSWRlbnRpZmllcikgPT4ge1xuXHRcdC8vIFRPRE86IENvdWxkIGJlIG5lYXRlciBhYm91dCB0aGlzXG5cdFx0Y29uc3QgaXNMYXp5ID0gKGlzRW1wdHkodXNlLnVzZWQpID8gdXNlLm9wVXNlRGVmYXVsdCA6IHVzZS51c2VkWzBdKS5pc0xhenkoKVxuXHRcdGNvbnN0IHZhbHVlID0gKGlzTGF6eSA/IG1zTGF6eUdldE1vZHVsZSA6IG1zR2V0TW9kdWxlKShtb2R1bGVJZGVudGlmaWVyKVxuXG5cdFx0Y29uc3QgdXNlZERlZmF1bHQgPSBvcE1hcCh1c2Uub3BVc2VEZWZhdWx0LCBkZWYgPT4ge1xuXHRcdFx0Y29uc3QgZGVmZXhwID0gbXNHZXREZWZhdWx0RXhwb3J0KG1vZHVsZUlkZW50aWZpZXIpXG5cdFx0XHRjb25zdCB2YWwgPSBpc0xhenkgPyBsYXp5V3JhcChkZWZleHApIDogZGVmZXhwXG5cdFx0XHRyZXR1cm4gbG9jKFZhcmlhYmxlRGVjbGFyYXRvcihpZEZvckRlY2xhcmVDYWNoZWQoZGVmKSwgdmFsKSwgZGVmLmxvYylcblx0XHR9KVxuXG5cdFx0Y29uc3QgdXNlZERlc3RydWN0ID0gaXNFbXB0eSh1c2UudXNlZCkgPyBudWxsIDpcblx0XHRcdG1ha2VEZXN0cnVjdHVyZURlY2xhcmF0b3JzKHVzZS51c2VkLCBpc0xhenksIHZhbHVlLCB0cnVlLCBmYWxzZSlcblxuXHRcdHJldHVybiBjYXQodXNlZERlZmF1bHQsIHVzZWREZXN0cnVjdClcblx0fVxuXG4vLyBHZW5lcmFsIHV0aWxzLiBOb3QgaW4gdXRpbC5qcyBiZWNhdXNlIHRoZXNlIGNsb3NlIG92ZXIgY29udGV4dC5cbmNvbnN0XG5cdG1heWJlQm9vbFdyYXAgPSBhc3QgPT5cblx0XHRjb250ZXh0Lm9wdHMuaW5jbHVkZUNhc2VDaGVja3MoKSA/IG1zQm9vbChhc3QpIDogYXN0LFxuXG5cdG1ha2VEZXN0cnVjdHVyZURlY2xhcmF0b3JzID0gKGFzc2lnbmVlcywgaXNMYXp5LCB2YWx1ZSwgaXNNb2R1bGUsIGlzRXhwb3J0KSA9PiB7XG5cdFx0Y29uc3QgZGVzdHJ1Y3R1cmVkTmFtZSA9IGBfJCR7YXNzaWduZWVzWzBdLmxvYy5zdGFydC5saW5lfWBcblx0XHRjb25zdCBpZERlc3RydWN0dXJlZCA9IElkZW50aWZpZXIoZGVzdHJ1Y3R1cmVkTmFtZSlcblx0XHRjb25zdCBkZWNsYXJhdG9ycyA9IGFzc2lnbmVlcy5tYXAoYXNzaWduZWUgPT4ge1xuXHRcdFx0Ly8gVE9ETzogRG9uJ3QgY29tcGlsZSBpdCBpZiBpdCdzIG5ldmVyIGFjY2Vzc2VkXG5cdFx0XHRjb25zdCBnZXQgPSBnZXRNZW1iZXIoaWREZXN0cnVjdHVyZWQsIGFzc2lnbmVlLm5hbWUsIGlzTGF6eSwgaXNNb2R1bGUpXG5cdFx0XHRyZXR1cm4gbWFrZURlY2xhcmF0b3IoYXNzaWduZWUsIGdldCwgaXNMYXp5LCBpc0V4cG9ydClcblx0XHR9KVxuXHRcdC8vIEdldHRpbmcgbGF6eSBtb2R1bGUgaXMgZG9uZSBieSBtcy5sYXp5R2V0TW9kdWxlLlxuXHRcdGNvbnN0IHZhbCA9IChpc0xhenkgJiYgIWlzTW9kdWxlKSA/IGxhenlXcmFwKHZhbHVlKSA6IHZhbHVlXG5cdFx0cmV0dXJuIHVuc2hpZnQoVmFyaWFibGVEZWNsYXJhdG9yKGlkRGVzdHJ1Y3R1cmVkLCB2YWwpLCBkZWNsYXJhdG9ycylcblx0fSxcblxuXHRtYWtlRGVjbGFyYXRvciA9IChhc3NpZ25lZSwgdmFsdWUsIHZhbHVlSXNBbHJlYWR5TGF6eSwgaXNFeHBvcnQpID0+IHtcblx0XHRjb25zdCB7IGxvYywgbmFtZSwgb3BUeXBlIH0gPSBhc3NpZ25lZVxuXHRcdGNvbnN0IGlzTGF6eSA9IGFzc2lnbmVlLmlzTGF6eSgpXG5cdFx0Ly8gVE9ETzogYXNzZXJ0KGFzc2lnbmVlLm9wVHlwZSA9PT0gbnVsbClcblx0XHQvLyBvciBUT0RPOiBBbGxvdyB0eXBlIGNoZWNrIG9uIGxhenkgdmFsdWU/XG5cdFx0dmFsdWUgPSBpc0xhenkgPyB2YWx1ZSA6IG1heWJlV3JhcEluQ2hlY2tDb250YWlucyh2YWx1ZSwgb3BUeXBlLCBuYW1lKVxuXHRcdGlmIChpc0V4cG9ydCkge1xuXHRcdFx0Ly8gVE9ETzpFUzZcblx0XHRcdGNvbnRleHQuY2hlY2soIWlzTGF6eSwgbG9jLCAnTGF6eSBleHBvcnQgbm90IHN1cHBvcnRlZC4nKVxuXHRcdFx0cmV0dXJuIFZhcmlhYmxlRGVjbGFyYXRvcihcblx0XHRcdFx0aWRGb3JEZWNsYXJlQ2FjaGVkKGFzc2lnbmVlKSxcblx0XHRcdFx0YXNzaWdubWVudEV4cHJlc3Npb25QbGFpbihtZW1iZXIoSWRFeHBvcnRzLCBuYW1lKSwgdmFsdWUpKVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCB2YWwgPSBpc0xhenkgJiYgIXZhbHVlSXNBbHJlYWR5TGF6eSA/IGxhenlXcmFwKHZhbHVlKSA6IHZhbHVlXG5cdFx0XHRhc3NlcnQoaXNMYXp5IHx8ICF2YWx1ZUlzQWxyZWFkeUxhenkpXG5cdFx0XHRyZXR1cm4gVmFyaWFibGVEZWNsYXJhdG9yKGlkRm9yRGVjbGFyZUNhY2hlZChhc3NpZ25lZSksIHZhbClcblx0XHR9XG5cdH0sXG5cblx0bWF5YmVXcmFwSW5DaGVja0NvbnRhaW5zID0gKGFzdCwgb3BUeXBlLCBuYW1lKSA9PlxuXHRcdChjb250ZXh0Lm9wdHMuaW5jbHVkZVR5cGVDaGVja3MoKSAmJiBvcFR5cGUgIT09IG51bGwpID9cblx0XHRcdG1zQ2hlY2tDb250YWlucyh0MChvcFR5cGUpLCBhc3QsIExpdGVyYWwobmFtZSkpIDpcblx0XHRcdGFzdCxcblxuXHRnZXRNZW1iZXIgPSAoYXN0T2JqZWN0LCBnb3ROYW1lLCBpc0xhenksIGlzTW9kdWxlKSA9PlxuXHRcdGlzTGF6eSA/XG5cdFx0bXNMYXp5R2V0KGFzdE9iamVjdCwgTGl0ZXJhbChnb3ROYW1lKSkgOlxuXHRcdGlzTW9kdWxlICYmIGNvbnRleHQub3B0cy5pbmNsdWRlVXNlQ2hlY2tzKCkgP1xuXHRcdG1zR2V0KGFzdE9iamVjdCwgTGl0ZXJhbChnb3ROYW1lKSkgOlxuXHRcdG1lbWJlcihhc3RPYmplY3QsIGdvdE5hbWUpXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==