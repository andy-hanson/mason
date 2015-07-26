if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'esast/dist/ast', 'esast/dist/util', 'esast/dist/specialize', '../../MsAst', '../manglePath', '../util', './ast-constants', './ms-call', './util'], function (exports, _esastDistAst, _esastDistUtil, _esastDistSpecialize, _MsAst, _manglePath, _util, _astConstants, _msCall, _util2) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _manglePath2 = _interopRequireDefault(_manglePath);

	let context, verifyResults, isInGenerator, isInConstructor;

	exports.default = (_context, moduleExpression, _verifyResults) => {
		context = _context;
		verifyResults = _verifyResults;
		isInGenerator = false;
		isInConstructor = false;
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
			const classExpr = (0, _esastDistAst.ClassExpression)(opName, (0, _util.opMap)(this.superClass, t0), (0, _esastDistAst.ClassBody)(methods));

			return (0, _util.ifElse)(this.opDo, _ => t1(_, classExpr), () => classExpr);
		},

		//neater?
		ClassDo(classExpr) {
			const lead = (0, _esastDistAst.VariableDeclaration)('const', [(0, _esastDistAst.VariableDeclarator)(t0(this.declareFocus), classExpr)]);
			const ret = (0, _esastDistAst.ReturnStatement)(t0(this.declareFocus));
			const block = t3(this.block, lead, null, ret);
			return blockWrap(block);
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

			const opDeclareThis = (0, _util.opIf)(!isInConstructor, () => (0, _util.opMap)(this.opDeclareThis, () => (0, _esastDistAst.VariableDeclaration)('const', [(0, _esastDistAst.VariableDeclarator)(_astConstants.IdLexicalThis, (0, _esastDistAst.ThisExpression)())])));

			const lead = (0, _util.cat)(opDeclareThis, opDeclareRest, argChecks, _in);

			const _out = (0, _util.opMap)(this.opOut, t0);
			const body = t3(this.block, lead, this.opDeclareRes, _out);
			const args = this.args.map(t0);
			isInGenerator = oldInGenerator;
			const id = (0, _util.opMap)(this.opName, _esastDistUtil.idCached);

			const canUseArrowFunction = id === null && this.opDeclareThis === null && opDeclareRest === null && !this.isGenerator;
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
			return this.name === 'this' ? isInConstructor ? (0, _esastDistAst.ThisExpression)() : _astConstants.IdLexicalThis : (0, _util2.accessLocalDeclare)(verifyResults.localDeclareForAccess(this));
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
	      constructorDefinition = fun => {
		isInConstructor = true;
		const res = (0, _esastDistAst.MethodDefinition)((0, _esastDistAst.Identifier)('constructor'), t0(fun), 'constructor', false, false);
		isInConstructor = false;
		return res;
	},
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS90cmFuc3BpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUE0QkEsS0FBSSxPQUFPLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxlQUFlLENBQUE7O21CQUUzQyxDQUFDLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEtBQUs7QUFDOUQsU0FBTyxHQUFHLFFBQVEsQ0FBQTtBQUNsQixlQUFhLEdBQUcsY0FBYyxDQUFBO0FBQzlCLGVBQWEsR0FBRyxLQUFLLENBQUE7QUFDckIsaUJBQWUsR0FBRyxLQUFLLENBQUE7QUFDdkIsUUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLENBQUE7O0FBRWhDLFNBQU8sR0FBRyxhQUFhLEdBQUcsU0FBUyxDQUFBO0FBQ25DLFNBQU8sR0FBRyxDQUFBO0VBQ1Y7O0FBRU0sT0FDTixFQUFFLEdBQUcsSUFBSSxJQUFJLG1CQXBDSyxHQUFHLEVBb0NKLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtTQUFuRCxFQUFFLEdBQUYsRUFBRTtBQUNILE9BQ0MsRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsS0FBSyxtQkF0Q0YsR0FBRyxFQXNDRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQztPQUM3RCxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEtBQUssbUJBdkNkLEdBQUcsRUF1Q2UsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQztPQUNyRixNQUFNLEdBQUcsS0FBSyxJQUFJO0FBQ2pCLFFBQU0sR0FBRyxHQUFHLEVBQUcsQ0FBQTtBQUNmLE9BQUssTUFBTSxJQUFJLElBQUksS0FB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RSxNQUFNLEVBQUUsSUFBSSxLQUM1QyxBQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxNQUFNLEtBQUssSUFBSSxHQUNuRCxZQTNqQkYsZUFBZSxFQTJqQkcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEdBQUcsRUFBRSxrQkE5a0JWLE9BQU8sRUE4a0JXLElBQUksQ0FBQyxDQUFDLEdBQy9DLEdBQUc7T0FFTCxTQUFTLEdBQUcsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEtBQ2hELE1BQU0sR0FDTixZQWhrQm9GLFNBQVMsRUFna0JuRixTQUFTLEVBQUUsa0JBbmxCRyxPQUFPLEVBbWxCRixPQUFPLENBQUMsQ0FBQyxHQUN0QyxRQUFRLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxHQUMzQyxZQWxrQm9DLEtBQUssRUFra0JuQyxTQUFTLEVBQUUsa0JBcmxCTyxPQUFPLEVBcWxCTixPQUFPLENBQUMsQ0FBQyxHQUNsQyxtQkFubEJzQixNQUFNLEVBbWxCckIsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFBIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS90cmFuc3BpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcnJheUV4cHJlc3Npb24sIEFycm93RnVuY3Rpb25FeHByZXNzaW9uLCBCaW5hcnlFeHByZXNzaW9uLCBCbG9ja1N0YXRlbWVudCwgQnJlYWtTdGF0ZW1lbnQsXG5cdENhbGxFeHByZXNzaW9uLCBDYXRjaENsYXVzZSwgQ2xhc3NCb2R5LCBDbGFzc0V4cHJlc3Npb24sIENvbmRpdGlvbmFsRXhwcmVzc2lvbixcblx0Q29udGludWVTdGF0ZW1lbnQsIERlYnVnZ2VyU3RhdGVtZW50LCBFeHByZXNzaW9uU3RhdGVtZW50LCBGb3JPZlN0YXRlbWVudCwgRnVuY3Rpb25FeHByZXNzaW9uLFxuXHRJZGVudGlmaWVyLCBJZlN0YXRlbWVudCwgTGl0ZXJhbCwgTG9naWNhbEV4cHJlc3Npb24sIE1ldGhvZERlZmluaXRpb24sIE5ld0V4cHJlc3Npb24sXG5cdE9iamVjdEV4cHJlc3Npb24sIFByb2dyYW0sIFJldHVyblN0YXRlbWVudCwgVGVtcGxhdGVMaXRlcmFsLCBUaGlzRXhwcmVzc2lvbiwgVGhyb3dTdGF0ZW1lbnQsXG5cdFRyeVN0YXRlbWVudCwgVmFyaWFibGVEZWNsYXJhdGlvbiwgVW5hcnlFeHByZXNzaW9uLCBWYXJpYWJsZURlY2xhcmF0b3IgfSBmcm9tICdlc2FzdC9kaXN0L2FzdCdcbmltcG9ydCB7IGlkQ2FjaGVkLCBsb2MsIG1lbWJlciwgcHJvcGVydHlJZE9yTGl0ZXJhbENhY2hlZCwgdG9TdGF0ZW1lbnQgfSBmcm9tICdlc2FzdC9kaXN0L3V0aWwnXG5pbXBvcnQgeyBhc3NpZ25tZW50RXhwcmVzc2lvblBsYWluLCBjYWxsRXhwcmVzc2lvblRodW5rLCBmdW5jdGlvbkV4cHJlc3Npb25UaHVuaywgbWVtYmVyRXhwcmVzc2lvbixcblx0cHJvcGVydHksIHlpZWxkRXhwcmVzc2lvbkRlbGVnYXRlLCB5aWVsZEV4cHJlc3Npb25Ob0RlbGVnYXRlIH0gZnJvbSAnZXNhc3QvZGlzdC9zcGVjaWFsaXplJ1xuaW1wb3J0ICogYXMgTXNBc3RUeXBlcyBmcm9tICcuLi8uLi9Nc0FzdCdcbmltcG9ydCB7IEFzc2lnblNpbmdsZSwgQ2FsbCwgRnVuLCBMX0FuZCwgTF9PciwgTERfTGF6eSwgTERfTXV0YWJsZSwgTWV0aG9kSW1wbCwgTVNfTXV0YXRlLCBNU19OZXcsXG5cdE1TX05ld011dGFibGUsIFBhdHRlcm4sIFNwbGF0LCBTRF9EZWJ1Z2dlciwgU1ZfQ29udGFpbnMsIFNWX0ZhbHNlLCBTVl9OdWxsLCBTVl9TdWIsIFNWX1N1cGVyLFxuXHRTVl9UaGlzTW9kdWxlRGlyZWN0b3J5LCBTVl9UcnVlLCBTVl9VbmRlZmluZWQgfSBmcm9tICcuLi8uLi9Nc0FzdCdcbmltcG9ydCBtYW5nbGVQYXRoIGZyb20gJy4uL21hbmdsZVBhdGgnXG5pbXBvcnQgeyBhc3NlcnQsIGNhdCwgZmxhdE1hcCwgZmxhdE9wTWFwLCBpZkVsc2UsIGlzRW1wdHksXG5cdGltcGxlbWVudE1hbnksIGlzUG9zaXRpdmUsIG9wSWYsIG9wTWFwLCB0YWlsLCB1bnNoaWZ0IH0gZnJvbSAnLi4vdXRpbCdcbmltcG9ydCB7IEFtZGVmaW5lSGVhZGVyLCBBcnJheVNsaWNlQ2FsbCwgRGVjbGFyZUJ1aWx0QmFnLCBEZWNsYXJlQnVpbHRNYXAsIERlY2xhcmVCdWlsdE9iaixcblx0RW1wdHlUZW1wbGF0ZUVsZW1lbnQsIEV4cG9ydHNEZWZhdWx0LCBFeHBvcnRzR2V0LCBJZEFyZ3VtZW50cywgSWRCdWlsdCwgSWREZWZpbmUsIElkRXhwb3J0cyxcblx0SWRFeHRyYWN0LCBJZEZ1bmN0aW9uQXBwbHlDYWxsLCBJZExleGljYWxUaGlzLCBMaXRFbXB0eUFycmF5LCBMaXRFbXB0eVN0cmluZywgTGl0TnVsbCxcblx0TGl0U3RyRXhwb3J0cywgTGl0U3RyVGhyb3csIExpdFplcm8sIFJldHVybkJ1aWx0LCBSZXR1cm5FeHBvcnRzLCBSZXR1cm5SZXMsIFRocm93QXNzZXJ0RmFpbCxcblx0VGhyb3dOb0Nhc2VNYXRjaCwgVXNlU3RyaWN0IH0gZnJvbSAnLi9hc3QtY29uc3RhbnRzJ1xuaW1wb3J0IHsgSWRNcywgbGF6eVdyYXAsIG1zQWRkLCBtc0FkZE1hbnksIG1zQXJyLCBtc0Fzc2VydCwgbXNBc3NlcnROb3QsIG1zQXNzb2MsIG1zQm9vbCxcblx0bXNDaGVja0NvbnRhaW5zLCBtc0Vycm9yLCBtc0V4dHJhY3QsIG1zR2V0LCBtc0dldERlZmF1bHRFeHBvcnQsIG1zR2V0TW9kdWxlLCBtc0xhenksIG1zTGF6eUdldCxcblx0bXNMYXp5R2V0TW9kdWxlLCBtc05ld011dGFibGVQcm9wZXJ0eSwgbXNOZXdQcm9wZXJ0eSwgbXNTZXQsIG1zU2V0TmFtZSwgbXNTZXRMYXp5LCBtc1Nob3csXG5cdG1zU29tZSwgbXNTeW1ib2wsIE1zTm9uZSB9IGZyb20gJy4vbXMtY2FsbCdcbmltcG9ydCB7IGFjY2Vzc0xvY2FsRGVjbGFyZSwgZGVjbGFyZSwgZm9yU3RhdGVtZW50SW5maW5pdGUsIGlkRm9yRGVjbGFyZUNhY2hlZCxcblx0b3BUeXBlQ2hlY2tGb3JMb2NhbERlY2xhcmUsIHRlbXBsYXRlRWxlbWVudEZvclN0cmluZyB9IGZyb20gJy4vdXRpbCdcblxubGV0IGNvbnRleHQsIHZlcmlmeVJlc3VsdHMsIGlzSW5HZW5lcmF0b3IsIGlzSW5Db25zdHJ1Y3RvclxuXG5leHBvcnQgZGVmYXVsdCAoX2NvbnRleHQsIG1vZHVsZUV4cHJlc3Npb24sIF92ZXJpZnlSZXN1bHRzKSA9PiB7XG5cdGNvbnRleHQgPSBfY29udGV4dFxuXHR2ZXJpZnlSZXN1bHRzID0gX3ZlcmlmeVJlc3VsdHNcblx0aXNJbkdlbmVyYXRvciA9IGZhbHNlXG5cdGlzSW5Db25zdHJ1Y3RvciA9IGZhbHNlXG5cdGNvbnN0IHJlcyA9IHQwKG1vZHVsZUV4cHJlc3Npb24pXG5cdC8vIFJlbGVhc2UgZm9yIGdhcmJhZ2UgY29sbGVjdGlvbi5cblx0Y29udGV4dCA9IHZlcmlmeVJlc3VsdHMgPSB1bmRlZmluZWRcblx0cmV0dXJuIHJlc1xufVxuXG5leHBvcnQgY29uc3Rcblx0dDAgPSBleHByID0+IGxvYyhleHByLnRyYW5zcGlsZVN1YnRyZWUoKSwgZXhwci5sb2MpXG5jb25zdFxuXHR0MSA9IChleHByLCBhcmcpID0+IGxvYyhleHByLnRyYW5zcGlsZVN1YnRyZWUoYXJnKSwgZXhwci5sb2MpLFxuXHR0MyA9IChleHByLCBhcmcsIGFyZzIsIGFyZzMpID0+IGxvYyhleHByLnRyYW5zcGlsZVN1YnRyZWUoYXJnLCBhcmcyLCBhcmczKSwgZXhwci5sb2MpLFxuXHR0TGluZXMgPSBleHBycyA9PiB7XG5cdFx0Y29uc3Qgb3V0ID0gWyBdXG5cdFx0Zm9yIChjb25zdCBleHByIG9mIGV4cHJzKSB7XG5cdFx0XHRjb25zdCBhc3QgPSBleHByLnRyYW5zcGlsZVN1YnRyZWUoKVxuXHRcdFx0aWYgKGFzdCBpbnN0YW5jZW9mIEFycmF5KVxuXHRcdFx0XHQvLyBEZWJ1ZyBtYXkgcHJvZHVjZSBtdWx0aXBsZSBzdGF0ZW1lbnRzLlxuXHRcdFx0XHRmb3IgKGNvbnN0IF8gb2YgYXN0KVxuXHRcdFx0XHRcdG91dC5wdXNoKHRvU3RhdGVtZW50KF8pKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRvdXQucHVzaChsb2ModG9TdGF0ZW1lbnQoYXN0KSwgZXhwci5sb2MpKVxuXHRcdH1cblx0XHRyZXR1cm4gb3V0XG5cdH1cblxuaW1wbGVtZW50TWFueShNc0FzdFR5cGVzLCAndHJhbnNwaWxlU3VidHJlZScsIHtcblx0QXNzZXJ0KCkge1xuXHRcdGNvbnN0IGZhaWxDb25kID0gKCkgPT4ge1xuXHRcdFx0Y29uc3QgY29uZCA9IG1zQm9vbCh0MCh0aGlzLmNvbmRpdGlvbikpXG5cdFx0XHRyZXR1cm4gdGhpcy5uZWdhdGUgPyBjb25kIDogVW5hcnlFeHByZXNzaW9uKCchJywgY29uZClcblx0XHR9XG5cblx0XHRyZXR1cm4gaWZFbHNlKHRoaXMub3BUaHJvd24sXG5cdFx0XHR0aHJvd24gPT4gSWZTdGF0ZW1lbnQoZmFpbENvbmQoKSwgVGhyb3dTdGF0ZW1lbnQobXNFcnJvcih0MCh0aHJvd24pKSkpLFxuXHRcdFx0KCkgPT4ge1xuXHRcdFx0XHRpZiAodGhpcy5jb25kaXRpb24gaW5zdGFuY2VvZiBDYWxsKSB7XG5cdFx0XHRcdFx0Y29uc3QgY2FsbCA9IHRoaXMuY29uZGl0aW9uXG5cdFx0XHRcdFx0Y29uc3QgYW55U3BsYXQgPSBjYWxsLmFyZ3Muc29tZShfID0+IF8gaW5zdGFuY2VvZiBTcGxhdClcblx0XHRcdFx0XHRjb250ZXh0LmNoZWNrKCFhbnlTcGxhdCwgY2FsbC5sb2MsICdUT0RPOiBTcGxhdCBhcmdzIGluIGFzc2VydCcpXG5cdFx0XHRcdFx0Y29uc3QgYXNzID0gdGhpcy5uZWdhdGUgPyBtc0Fzc2VydE5vdCA6IG1zQXNzZXJ0XG5cdFx0XHRcdFx0cmV0dXJuIGFzcyh0MChjYWxsLmNhbGxlZCksIC4uLmNhbGwuYXJncy5tYXAodDApKVxuXHRcdFx0XHR9IGVsc2Vcblx0XHRcdFx0XHRyZXR1cm4gSWZTdGF0ZW1lbnQoZmFpbENvbmQoKSwgVGhyb3dBc3NlcnRGYWlsKVxuXHRcdFx0fSlcblx0fSxcblxuXHRBc3NpZ25TaW5nbGUodmFsV3JhcCkge1xuXHRcdGNvbnN0IHZhbCA9IHZhbFdyYXAgPT09IHVuZGVmaW5lZCA/IHQwKHRoaXMudmFsdWUpIDogdmFsV3JhcCh0MCh0aGlzLnZhbHVlKSlcblx0XHRjb25zdCBkZWNsYXJlID1cblx0XHRcdG1ha2VEZWNsYXJhdG9yKHRoaXMuYXNzaWduZWUsIHZhbCwgZmFsc2UsIHZlcmlmeVJlc3VsdHMuaXNFeHBvcnRBc3NpZ24odGhpcykpXG5cdFx0cmV0dXJuIFZhcmlhYmxlRGVjbGFyYXRpb24odGhpcy5hc3NpZ25lZS5pc011dGFibGUoKSA/ICdsZXQnIDogJ2NvbnN0JywgWyBkZWNsYXJlIF0pXG5cdH0sXG5cdC8vIFRPRE86RVM2IEp1c3QgdXNlIG5hdGl2ZSBkZXN0cnVjdHVyaW5nIGFzc2lnblxuXHRBc3NpZ25EZXN0cnVjdHVyZSgpIHtcblx0XHRyZXR1cm4gVmFyaWFibGVEZWNsYXJhdGlvbih0aGlzLmtpbmQoKSA9PT0gTERfTXV0YWJsZSA/ICdsZXQnIDogJ2NvbnN0Jyxcblx0XHRcdG1ha2VEZXN0cnVjdHVyZURlY2xhcmF0b3JzKFxuXHRcdFx0XHR0aGlzLmFzc2lnbmVlcyxcblx0XHRcdFx0dGhpcy5raW5kKCkgPT09IExEX0xhenksXG5cdFx0XHRcdHQwKHRoaXMudmFsdWUpLFxuXHRcdFx0XHRmYWxzZSxcblx0XHRcdFx0dmVyaWZ5UmVzdWx0cy5pc0V4cG9ydEFzc2lnbih0aGlzKSkpXG5cdH0sXG5cblx0QmFnRW50cnkoKSB7IHJldHVybiBtc0FkZChJZEJ1aWx0LCB0MCh0aGlzLnZhbHVlKSkgfSxcblxuXHRCYWdFbnRyeU1hbnkoKSB7IHJldHVybiBtc0FkZE1hbnkoSWRCdWlsdCwgdDAodGhpcy52YWx1ZSkpIH0sXG5cblx0QmFnU2ltcGxlKCkgeyByZXR1cm4gQXJyYXlFeHByZXNzaW9uKHRoaXMucGFydHMubWFwKHQwKSkgfSxcblxuXHRCbG9ja0RvKGxlYWQsIG9wRGVjbGFyZVJlcywgb3BPdXQpIHtcblx0XHQvLyBUT0RPOkVTNiBPcHRpb25hbCBhcmd1bWVudHNcblx0XHRpZiAobGVhZCA9PT0gdW5kZWZpbmVkKSBsZWFkID0gbnVsbFxuXHRcdGlmIChvcERlY2xhcmVSZXMgPT09IHVuZGVmaW5lZCkgb3BEZWNsYXJlUmVzID0gbnVsbFxuXHRcdGlmIChvcE91dCA9PT0gdW5kZWZpbmVkKSBvcE91dCA9IG51bGxcblx0XHRhc3NlcnQob3BEZWNsYXJlUmVzID09PSBudWxsKVxuXHRcdHJldHVybiBCbG9ja1N0YXRlbWVudChjYXQobGVhZCwgdExpbmVzKHRoaXMubGluZXMpLCBvcE91dCkpXG5cdH0sXG5cblx0QmxvY2tWYWxUaHJvdyhsZWFkLCBvcERlY2xhcmVSZXMsIG9wT3V0KSB7XG5cdFx0Ly8gVE9ETzpFUzYgT3B0aW9uYWwgYXJndW1lbnRzXG5cdFx0aWYgKGxlYWQgPT09IHVuZGVmaW5lZCkgbGVhZCA9IG51bGxcblx0XHRpZiAob3BEZWNsYXJlUmVzID09PSB1bmRlZmluZWQpIG9wRGVjbGFyZVJlcyA9IG51bGxcblx0XHRpZiAob3BPdXQgPT09IHVuZGVmaW5lZCkgb3BPdXQgPSBudWxsXG5cdFx0Y29udGV4dC53YXJuSWYob3BEZWNsYXJlUmVzICE9PSBudWxsIHx8IG9wT3V0ICE9PSBudWxsLCB0aGlzLmxvYyxcblx0XHRcdCdPdXQgY29uZGl0aW9uIGlnbm9yZWQgYmVjYXVzZSBvZiBvaC1ubyEnKVxuXHRcdHJldHVybiBCbG9ja1N0YXRlbWVudChjYXQobGVhZCwgdExpbmVzKHRoaXMubGluZXMpLCB0MCh0aGlzLl90aHJvdykpKVxuXHR9LFxuXG5cdEJsb2NrV2l0aFJldHVybihsZWFkLCBvcERlY2xhcmVSZXMsIG9wT3V0KSB7XG5cdFx0cmV0dXJuIHRyYW5zcGlsZUJsb2NrKHQwKHRoaXMucmV0dXJuZWQpLCB0TGluZXModGhpcy5saW5lcyksIGxlYWQsIG9wRGVjbGFyZVJlcywgb3BPdXQpXG5cdH0sXG5cblx0QmxvY2tCYWcobGVhZCwgb3BEZWNsYXJlUmVzLCBvcE91dCkge1xuXHRcdHJldHVybiB0cmFuc3BpbGVCbG9jayhcblx0XHRcdElkQnVpbHQsXG5cdFx0XHRjYXQoRGVjbGFyZUJ1aWx0QmFnLCB0TGluZXModGhpcy5saW5lcykpLFxuXHRcdFx0bGVhZCwgb3BEZWNsYXJlUmVzLCBvcE91dClcblx0fSxcblxuXHRCbG9ja09iaihsZWFkLCBvcERlY2xhcmVSZXMsIG9wT3V0KSB7XG5cdFx0Y29uc3QgbGluZXMgPSBjYXQoRGVjbGFyZUJ1aWx0T2JqLCB0TGluZXModGhpcy5saW5lcykpXG5cdFx0Y29uc3QgcmVzID0gaWZFbHNlKHRoaXMub3BPYmplZCxcblx0XHRcdG9iamVkID0+IGlmRWxzZSh0aGlzLm9wTmFtZSxcblx0XHRcdFx0bmFtZSA9PiBtc1NldCh0MChvYmplZCksIElkQnVpbHQsIExpdGVyYWwobmFtZSkpLFxuXHRcdFx0XHQoKSA9PiBtc1NldCh0MChvYmplZCksIElkQnVpbHQpKSxcblx0XHRcdCgpID0+IGlmRWxzZSh0aGlzLm9wTmFtZSxcblx0XHRcdFx0XyA9PiBtc1NldE5hbWUoSWRCdWlsdCwgTGl0ZXJhbChfKSksXG5cdFx0XHRcdCgpID0+IElkQnVpbHQpKVxuXHRcdHJldHVybiB0cmFuc3BpbGVCbG9jayhyZXMsIGxpbmVzLCBsZWFkLCBvcERlY2xhcmVSZXMsIG9wT3V0KVxuXHR9LFxuXG5cdEJsb2NrTWFwKGxlYWQsIG9wRGVjbGFyZVJlcywgb3BPdXQpIHtcblx0XHRyZXR1cm4gdHJhbnNwaWxlQmxvY2soXG5cdFx0XHRJZEJ1aWx0LFxuXHRcdFx0Y2F0KERlY2xhcmVCdWlsdE1hcCwgdExpbmVzKHRoaXMubGluZXMpKSxcblx0XHRcdGxlYWQsIG9wRGVjbGFyZVJlcywgb3BPdXQpXG5cdH0sXG5cblx0QmxvY2tXcmFwKCkgeyByZXR1cm4gYmxvY2tXcmFwKHQwKHRoaXMuYmxvY2spKSB9LFxuXG5cdEJyZWFrRG8oKSB7IHJldHVybiBCcmVha1N0YXRlbWVudCgpIH0sXG5cblx0QnJlYWtWYWwoKSB7IHJldHVybiBSZXR1cm5TdGF0ZW1lbnQodDAodGhpcy52YWx1ZSkpIH0sXG5cblx0Q2FsbCgpIHtcblx0XHRjb25zdCBhbnlTcGxhdCA9IHRoaXMuYXJncy5zb21lKGFyZyA9PiBhcmcgaW5zdGFuY2VvZiBTcGxhdClcblx0XHRpZiAoYW55U3BsYXQpIHtcblx0XHRcdGNvbnN0IGFyZ3MgPSB0aGlzLmFyZ3MubWFwKGFyZyA9PlxuXHRcdFx0XHRhcmcgaW5zdGFuY2VvZiBTcGxhdCA/XG5cdFx0XHRcdFx0bXNBcnIodDAoYXJnLnNwbGF0dGVkKSkgOlxuXHRcdFx0XHRcdHQwKGFyZykpXG5cdFx0XHRyZXR1cm4gQ2FsbEV4cHJlc3Npb24oSWRGdW5jdGlvbkFwcGx5Q2FsbCwgW1xuXHRcdFx0XHR0MCh0aGlzLmNhbGxlZCksXG5cdFx0XHRcdExpdE51bGwsXG5cdFx0XHRcdENhbGxFeHByZXNzaW9uKG1lbWJlcihMaXRFbXB0eUFycmF5LCAnY29uY2F0JyksIGFyZ3MpXSlcblx0XHR9XG5cdFx0ZWxzZSByZXR1cm4gQ2FsbEV4cHJlc3Npb24odDAodGhpcy5jYWxsZWQpLCB0aGlzLmFyZ3MubWFwKHQwKSlcblx0fSxcblxuXHRDYXNlRG8oKSB7XG5cdFx0Y29uc3QgYm9keSA9IGNhc2VCb2R5KHRoaXMucGFydHMsIHRoaXMub3BFbHNlKVxuXHRcdHJldHVybiBpZkVsc2UodGhpcy5vcENhc2VkLCBfID0+IEJsb2NrU3RhdGVtZW50KFsgdDAoXyksIGJvZHkgXSksICgpID0+IGJvZHkpXG5cdH0sXG5cblx0Q2FzZVZhbCgpIHtcblx0XHRjb25zdCBib2R5ID0gY2FzZUJvZHkodGhpcy5wYXJ0cywgdGhpcy5vcEVsc2UpXG5cdFx0Y29uc3QgYmxvY2sgPSBpZkVsc2UodGhpcy5vcENhc2VkLCBfID0+IFsgdDAoXyksIGJvZHkgXSwgKCkgPT4gWyBib2R5IF0pXG5cdFx0cmV0dXJuIGJsb2NrV3JhcChCbG9ja1N0YXRlbWVudChibG9jaykpXG5cdH0sXG5cblx0Q2FzZURvUGFydDogY2FzZVBhcnQsXG5cdENhc2VWYWxQYXJ0OiBjYXNlUGFydCxcblxuXHRDbGFzcygpIHtcblx0XHRjb25zdCBtZXRob2RzID0gY2F0KFxuXHRcdFx0dGhpcy5zdGF0aWNzLm1hcChtZXRob2REZWZpbml0aW9uKHRydWUpKSxcblx0XHRcdG9wTWFwKHRoaXMub3BDb25zdHJ1Y3RvciwgY29uc3RydWN0b3JEZWZpbml0aW9uKSxcblx0XHRcdHRoaXMubWV0aG9kcy5tYXAobWV0aG9kRGVmaW5pdGlvbihmYWxzZSkpKVxuXHRcdGNvbnN0IG9wTmFtZSA9IG9wTWFwKHRoaXMub3BOYW1lLCBpZENhY2hlZClcblx0XHRjb25zdCBjbGFzc0V4cHIgPSBDbGFzc0V4cHJlc3Npb24ob3BOYW1lLCBvcE1hcCh0aGlzLnN1cGVyQ2xhc3MsIHQwKSwgQ2xhc3NCb2R5KG1ldGhvZHMpKVxuXG5cdFx0cmV0dXJuIGlmRWxzZSh0aGlzLm9wRG8sIF8gPT4gdDEoXywgY2xhc3NFeHByKSwgKCkgPT4gY2xhc3NFeHByKVxuXHR9LFxuXG5cdC8vbmVhdGVyP1xuXHRDbGFzc0RvKGNsYXNzRXhwcikge1xuXHRcdGNvbnN0IGxlYWQgPSBWYXJpYWJsZURlY2xhcmF0aW9uKCdjb25zdCcsIFtcblx0XHRcdFZhcmlhYmxlRGVjbGFyYXRvcih0MCh0aGlzLmRlY2xhcmVGb2N1cyksIGNsYXNzRXhwcikgXSlcblx0XHRjb25zdCByZXQgPSBSZXR1cm5TdGF0ZW1lbnQodDAodGhpcy5kZWNsYXJlRm9jdXMpKVxuXHRcdGNvbnN0IGJsb2NrID0gdDModGhpcy5ibG9jaywgbGVhZCwgbnVsbCwgcmV0KVxuXHRcdHJldHVybiBibG9ja1dyYXAoYmxvY2spXG5cdH0sXG5cblx0Q29uZGl0aW9uYWxEbygpIHtcblx0XHRyZXR1cm4gSWZTdGF0ZW1lbnQoXG5cdFx0XHR0aGlzLmlzVW5sZXNzID8gVW5hcnlFeHByZXNzaW9uKCchJywgbWF5YmVCb29sV3JhcCh0MCh0aGlzLnRlc3QpKSkgOiB0MCh0aGlzLnRlc3QpLFxuXHRcdFx0dDAodGhpcy5yZXN1bHQpKVxuXHR9LFxuXG5cdENvbmRpdGlvbmFsVmFsKCkge1xuXHRcdGNvbnN0IHRlc3QgPSBtYXliZUJvb2xXcmFwKHQwKHRoaXMudGVzdCkpXG5cdFx0Y29uc3QgcmVzdWx0ID0gbXNTb21lKGJsb2NrV3JhcCh0MCh0aGlzLnJlc3VsdCkpKVxuXHRcdHJldHVybiB0aGlzLmlzVW5sZXNzID9cblx0XHRcdENvbmRpdGlvbmFsRXhwcmVzc2lvbih0ZXN0LCBNc05vbmUsIHJlc3VsdCkgOlxuXHRcdFx0Q29uZGl0aW9uYWxFeHByZXNzaW9uKHRlc3QsIHJlc3VsdCwgTXNOb25lKVxuXHR9LFxuXG5cdENhdGNoKCkge1xuXHRcdHJldHVybiBDYXRjaENsYXVzZSh0MCh0aGlzLmNhdWdodCksIHQwKHRoaXMuYmxvY2spKVxuXHR9LFxuXG5cdENvbnRpbnVlKCkgeyByZXR1cm4gQ29udGludWVTdGF0ZW1lbnQoKSB9LFxuXG5cdC8vIFRPRE86IGluY2x1ZGVJbm91dENoZWNrcyBpcyBtaXNuYW1lZFxuXHREZWJ1ZygpIHsgcmV0dXJuIGNvbnRleHQub3B0cy5pbmNsdWRlSW5vdXRDaGVja3MoKSA/IHRMaW5lcyh0aGlzLmxpbmVzKSA6IFsgXSB9LFxuXG5cdEV4Y2VwdERvKCkgeyByZXR1cm4gdHJhbnNwaWxlRXhjZXB0KHRoaXMpIH0sXG5cdEV4Y2VwdFZhbCgpIHsgcmV0dXJuIGJsb2NrV3JhcChCbG9ja1N0YXRlbWVudChbIHRyYW5zcGlsZUV4Y2VwdCh0aGlzKSBdKSkgfSxcblxuXHRGb3JEbygpIHsgcmV0dXJuIGZvckxvb3AodGhpcy5vcEl0ZXJhdGVlLCB0aGlzLmJsb2NrKSB9LFxuXG5cdEZvckJhZygpIHtcblx0XHRyZXR1cm4gYmxvY2tXcmFwKEJsb2NrU3RhdGVtZW50KFtcblx0XHRcdERlY2xhcmVCdWlsdEJhZyxcblx0XHRcdGZvckxvb3AodGhpcy5vcEl0ZXJhdGVlLCB0aGlzLmJsb2NrKSxcblx0XHRcdFJldHVybkJ1aWx0XG5cdFx0XSkpXG5cdH0sXG5cblx0Rm9yVmFsKCkge1xuXHRcdHJldHVybiBibG9ja1dyYXAoQmxvY2tTdGF0ZW1lbnQoWyBmb3JMb29wKHRoaXMub3BJdGVyYXRlZSwgdGhpcy5ibG9jaykgXSkpXG5cdH0sXG5cblx0RnVuKCkge1xuXHRcdGNvbnN0IG9sZEluR2VuZXJhdG9yID0gaXNJbkdlbmVyYXRvclxuXHRcdGlzSW5HZW5lcmF0b3IgPSB0aGlzLmlzR2VuZXJhdG9yXG5cblx0XHQvLyBUT0RPOkVTNiB1c2UgYC4uLmBmXG5cdFx0Y29uc3QgbkFyZ3MgPSBMaXRlcmFsKHRoaXMuYXJncy5sZW5ndGgpXG5cdFx0Y29uc3Qgb3BEZWNsYXJlUmVzdCA9IG9wTWFwKHRoaXMub3BSZXN0QXJnLCByZXN0ID0+XG5cdFx0XHRkZWNsYXJlKHJlc3QsIENhbGxFeHByZXNzaW9uKEFycmF5U2xpY2VDYWxsLCBbSWRBcmd1bWVudHMsIG5BcmdzXSkpKVxuXHRcdGNvbnN0IGFyZ0NoZWNrcyA9IG9wSWYoY29udGV4dC5vcHRzLmluY2x1ZGVUeXBlQ2hlY2tzKCksICgpID0+XG5cdFx0XHRmbGF0T3BNYXAodGhpcy5hcmdzLCBvcFR5cGVDaGVja0ZvckxvY2FsRGVjbGFyZSkpXG5cblx0XHRjb25zdCBfaW4gPSBvcE1hcCh0aGlzLm9wSW4sIHQwKVxuXG5cdFx0Y29uc3Qgb3BEZWNsYXJlVGhpcyA9IG9wSWYoIWlzSW5Db25zdHJ1Y3RvciwgKCkgPT4gb3BNYXAodGhpcy5vcERlY2xhcmVUaGlzLCAoKSA9PlxuXHRcdFx0VmFyaWFibGVEZWNsYXJhdGlvbignY29uc3QnLCBbIFZhcmlhYmxlRGVjbGFyYXRvcihJZExleGljYWxUaGlzLCBUaGlzRXhwcmVzc2lvbigpKSBdKSkpXG5cblx0XHRjb25zdCBsZWFkID0gY2F0KG9wRGVjbGFyZVRoaXMsIG9wRGVjbGFyZVJlc3QsIGFyZ0NoZWNrcywgX2luKVxuXG5cdFx0Y29uc3QgX291dCA9IG9wTWFwKHRoaXMub3BPdXQsIHQwKVxuXHRcdGNvbnN0IGJvZHkgPSB0Myh0aGlzLmJsb2NrLCBsZWFkLCB0aGlzLm9wRGVjbGFyZVJlcywgX291dClcblx0XHRjb25zdCBhcmdzID0gdGhpcy5hcmdzLm1hcCh0MClcblx0XHRpc0luR2VuZXJhdG9yID0gb2xkSW5HZW5lcmF0b3Jcblx0XHRjb25zdCBpZCA9IG9wTWFwKHRoaXMub3BOYW1lLCBpZENhY2hlZClcblxuXHRcdGNvbnN0IGNhblVzZUFycm93RnVuY3Rpb24gPVxuXHRcdFx0aWQgPT09IG51bGwgJiZcblx0XHRcdHRoaXMub3BEZWNsYXJlVGhpcyA9PT0gbnVsbCAmJlxuXHRcdFx0b3BEZWNsYXJlUmVzdCA9PT0gbnVsbCAmJlxuXHRcdFx0IXRoaXMuaXNHZW5lcmF0b3Jcblx0XHRyZXR1cm4gY2FuVXNlQXJyb3dGdW5jdGlvbiA/XG5cdFx0XHRBcnJvd0Z1bmN0aW9uRXhwcmVzc2lvbihhcmdzLCBib2R5KSA6XG5cdFx0XHRGdW5jdGlvbkV4cHJlc3Npb24oaWQsIGFyZ3MsIGJvZHksIHRoaXMuaXNHZW5lcmF0b3IpXG5cdH0sXG5cblx0TGF6eSgpIHsgcmV0dXJuIGxhenlXcmFwKHQwKHRoaXMudmFsdWUpKSB9LFxuXG5cdE51bWJlckxpdGVyYWwoKSB7XG5cdFx0Ly8gTmVnYXRpdmUgbnVtYmVycyBhcmUgbm90IHBhcnQgb2YgRVMgc3BlYy5cblx0XHQvLyBodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNS4xLyNzZWMtNy44LjNcblx0XHRjb25zdCBsaXQgPSBMaXRlcmFsKE1hdGguYWJzKHRoaXMudmFsdWUpKVxuXHRcdHJldHVybiBpc1Bvc2l0aXZlKHRoaXMudmFsdWUpID8gbGl0IDogVW5hcnlFeHByZXNzaW9uKCctJywgbGl0KVxuXHR9LFxuXG5cdEdsb2JhbEFjY2VzcygpIHsgcmV0dXJuIElkZW50aWZpZXIodGhpcy5uYW1lKSB9LFxuXG5cdExvY2FsQWNjZXNzKCkge1xuXHRcdHJldHVybiB0aGlzLm5hbWUgPT09ICd0aGlzJyA/XG5cdFx0XHQoaXNJbkNvbnN0cnVjdG9yID8gVGhpc0V4cHJlc3Npb24oKSA6IElkTGV4aWNhbFRoaXMpIDpcblx0XHRcdGFjY2Vzc0xvY2FsRGVjbGFyZSh2ZXJpZnlSZXN1bHRzLmxvY2FsRGVjbGFyZUZvckFjY2Vzcyh0aGlzKSlcblx0fSxcblxuXHRMb2NhbERlY2xhcmUoKSB7IHJldHVybiBpZEZvckRlY2xhcmVDYWNoZWQodGhpcykgfSxcblxuXHRMb2NhbE11dGF0ZSgpIHtcblx0XHRyZXR1cm4gYXNzaWdubWVudEV4cHJlc3Npb25QbGFpbihpZENhY2hlZCh0aGlzLm5hbWUpLCB0MCh0aGlzLnZhbHVlKSlcblx0fSxcblxuXHRMb2dpYygpIHtcblx0XHRhc3NlcnQodGhpcy5raW5kID09PSBMX0FuZCB8fCB0aGlzLmtpbmQgPT09IExfT3IpXG5cdFx0Y29uc3Qgb3AgPSB0aGlzLmtpbmQgPT09IExfQW5kID8gJyYmJyA6ICd8fCdcblx0XHRyZXR1cm4gdGFpbCh0aGlzLmFyZ3MpLnJlZHVjZSgoYSwgYikgPT4gTG9naWNhbEV4cHJlc3Npb24ob3AsIGEsIHQwKGIpKSwgdDAodGhpcy5hcmdzWzBdKSlcblx0fSxcblxuXHRNYXBFbnRyeSgpIHsgcmV0dXJuIG1zQXNzb2MoSWRCdWlsdCwgdDAodGhpcy5rZXkpLCB0MCh0aGlzLnZhbCkpIH0sXG5cblx0TWVtYmVyKCkgeyByZXR1cm4gbWVtYmVyKHQwKHRoaXMub2JqZWN0KSwgdGhpcy5uYW1lKSB9LFxuXG5cdE1lbWJlclNldCgpIHtcblx0XHRzd2l0Y2ggKHRoaXMua2luZCkge1xuXHRcdFx0Y2FzZSBNU19NdXRhdGU6XG5cdFx0XHRcdHJldHVybiBhc3NpZ25tZW50RXhwcmVzc2lvblBsYWluKG1lbWJlcih0MCh0aGlzLm9iamVjdCksIHRoaXMubmFtZSksIHQwKHRoaXMudmFsdWUpKVxuXHRcdFx0Y2FzZSBNU19OZXc6XG5cdFx0XHRcdHJldHVybiBtc05ld1Byb3BlcnR5KHQwKHRoaXMub2JqZWN0KSwgTGl0ZXJhbCh0aGlzLm5hbWUpLCB0MCh0aGlzLnZhbHVlKSlcblx0XHRcdGNhc2UgTVNfTmV3TXV0YWJsZTpcblx0XHRcdFx0cmV0dXJuIG1zTmV3TXV0YWJsZVByb3BlcnR5KHQwKHRoaXMub2JqZWN0KSwgTGl0ZXJhbCh0aGlzLm5hbWUpLCB0MCh0aGlzLnZhbHVlKSlcblx0XHRcdGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcigpXG5cdFx0fVxuXHR9LFxuXG5cdE1vZHVsZSgpIHtcblx0XHRjb25zdCBib2R5ID0gY2F0KFxuXHRcdFx0dExpbmVzKHRoaXMubGluZXMpLFxuXHRcdFx0b3BNYXAodGhpcy5vcERlZmF1bHRFeHBvcnQsIF8gPT4gYXNzaWdubWVudEV4cHJlc3Npb25QbGFpbihFeHBvcnRzRGVmYXVsdCwgdDAoXykpKSlcblx0XHRyZXR1cm4gUHJvZ3JhbShjYXQoXG5cdFx0XHRvcElmKGNvbnRleHQub3B0cy5pbmNsdWRlVXNlU3RyaWN0KCksICgpID0+IFVzZVN0cmljdCksXG5cdFx0XHRvcElmKGNvbnRleHQub3B0cy5pbmNsdWRlQW1kZWZpbmUoKSwgKCkgPT4gQW1kZWZpbmVIZWFkZXIpLFxuXHRcdFx0dG9TdGF0ZW1lbnQoYW1kV3JhcE1vZHVsZSh0aGlzLmRvVXNlcywgdGhpcy51c2VzLmNvbmNhdCh0aGlzLmRlYnVnVXNlcyksIGJvZHkpKSkpXG5cdH0sXG5cblx0TmV3KCkge1xuXHRcdGNvbnN0IGFueVNwbGF0ID0gdGhpcy5hcmdzLnNvbWUoXyA9PiBfIGluc3RhbmNlb2YgU3BsYXQpXG5cdFx0Y29udGV4dC5jaGVjayghYW55U3BsYXQsIHRoaXMubG9jLCAnVE9ETzogU3BsYXQgcGFyYW1zIGZvciBuZXcnKVxuXHRcdHJldHVybiBOZXdFeHByZXNzaW9uKHQwKHRoaXMudHlwZSksIHRoaXMuYXJncy5tYXAodDApKVxuXHR9LFxuXG5cdE5vdCgpIHsgcmV0dXJuIFVuYXJ5RXhwcmVzc2lvbignIScsIHQwKHRoaXMuYXJnKSkgfSxcblxuXHRPYmpFbnRyeSgpIHtcblx0XHRyZXR1cm4gKHRoaXMuYXNzaWduIGluc3RhbmNlb2YgQXNzaWduU2luZ2xlICYmICF0aGlzLmFzc2lnbi5hc3NpZ25lZS5pc0xhenkoKSkgP1xuXHRcdFx0dDEodGhpcy5hc3NpZ24sIHZhbCA9PlxuXHRcdFx0XHRhc3NpZ25tZW50RXhwcmVzc2lvblBsYWluKG1lbWJlcihJZEJ1aWx0LCB0aGlzLmFzc2lnbi5hc3NpZ25lZS5uYW1lKSwgdmFsKSkgOlxuXHRcdFx0Y2F0KFxuXHRcdFx0XHR0MCh0aGlzLmFzc2lnbiksXG5cdFx0XHRcdHRoaXMuYXNzaWduLmFsbEFzc2lnbmVlcygpLm1hcChfID0+XG5cdFx0XHRcdFx0bXNTZXRMYXp5KElkQnVpbHQsIExpdGVyYWwoXy5uYW1lKSwgaWRGb3JEZWNsYXJlQ2FjaGVkKF8pKSkpXG5cdH0sXG5cblx0T2JqU2ltcGxlKCkge1xuXHRcdHJldHVybiBPYmplY3RFeHByZXNzaW9uKHRoaXMucGFpcnMubWFwKHBhaXIgPT5cblx0XHRcdHByb3BlcnR5KCdpbml0JywgcHJvcGVydHlJZE9yTGl0ZXJhbENhY2hlZChwYWlyLmtleSksIHQwKHBhaXIudmFsdWUpKSkpXG5cdH0sXG5cblx0UXVvdGUoKSB7XG5cdFx0aWYgKHRoaXMucGFydHMubGVuZ3RoID09PSAwKVxuXHRcdFx0cmV0dXJuIExpdEVtcHR5U3RyaW5nXG5cdFx0ZWxzZSB7XG5cdFx0XHRjb25zdCBxdWFzaXMgPSBbIF0sIGV4cHJlc3Npb25zID0gWyBdXG5cblx0XHRcdC8vIFRlbXBsYXRlTGl0ZXJhbCBtdXN0IHN0YXJ0IHdpdGggYSBUZW1wbGF0ZUVsZW1lbnRcblx0XHRcdGlmICh0eXBlb2YgdGhpcy5wYXJ0c1swXSAhPT0gJ3N0cmluZycpXG5cdFx0XHRcdHF1YXNpcy5wdXNoKEVtcHR5VGVtcGxhdGVFbGVtZW50KVxuXG5cdFx0XHRmb3IgKGxldCBwYXJ0IG9mIHRoaXMucGFydHMpXG5cdFx0XHRcdGlmICh0eXBlb2YgcGFydCA9PT0gJ3N0cmluZycpXG5cdFx0XHRcdFx0cXVhc2lzLnB1c2godGVtcGxhdGVFbGVtZW50Rm9yU3RyaW5nKHBhcnQpKVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHQvLyBcInsxfXsxfVwiIG5lZWRzIGFuIGVtcHR5IHF1YXNpIGluIHRoZSBtaWRkbGUgKGFuZCBvbiB0aGUgZW5kcylcblx0XHRcdFx0XHRpZiAocXVhc2lzLmxlbmd0aCA9PT0gZXhwcmVzc2lvbnMubGVuZ3RoKVxuXHRcdFx0XHRcdFx0cXVhc2lzLnB1c2goRW1wdHlUZW1wbGF0ZUVsZW1lbnQpXG5cdFx0XHRcdFx0ZXhwcmVzc2lvbnMucHVzaChtc1Nob3codDAocGFydCkpKVxuXHRcdFx0XHR9XG5cblx0XHRcdC8vIFRlbXBsYXRlTGl0ZXJhbCBtdXN0IGVuZCB3aXRoIGEgVGVtcGxhdGVFbGVtZW50LCBzbyBvbmUgbW9yZSBxdWFzaSB0aGFuIGV4cHJlc3Npb24uXG5cdFx0XHRpZiAocXVhc2lzLmxlbmd0aCA9PT0gZXhwcmVzc2lvbnMubGVuZ3RoKVxuXHRcdFx0XHRxdWFzaXMucHVzaChFbXB0eVRlbXBsYXRlRWxlbWVudClcblxuXHRcdFx0cmV0dXJuIFRlbXBsYXRlTGl0ZXJhbChxdWFzaXMsIGV4cHJlc3Npb25zKVxuXHRcdH1cblx0fSxcblxuXHRTcGVjaWFsRG8oKSB7XG5cdFx0c3dpdGNoICh0aGlzLmtpbmQpIHtcblx0XHRcdGNhc2UgU0RfRGVidWdnZXI6IHJldHVybiBEZWJ1Z2dlclN0YXRlbWVudCgpXG5cdFx0XHRkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IodGhpcy5raW5kKVxuXHRcdH1cblx0fSxcblxuXHRTcGVjaWFsVmFsKCkge1xuXHRcdC8vIE1ha2UgbmV3IG9iamVjdHMgYmVjYXVzZSB3ZSB3aWxsIGFzc2lnbiBgbG9jYCB0byB0aGVtLlxuXHRcdHN3aXRjaCAodGhpcy5raW5kKSB7XG5cdFx0XHRjYXNlIFNWX0NvbnRhaW5zOiByZXR1cm4gbWVtYmVyKElkTXMsICdjb250YWlucycpXG5cdFx0XHRjYXNlIFNWX0ZhbHNlOiByZXR1cm4gTGl0ZXJhbChmYWxzZSlcblx0XHRcdGNhc2UgU1ZfTnVsbDogcmV0dXJuIExpdGVyYWwobnVsbClcblx0XHRcdGNhc2UgU1ZfU3ViOiByZXR1cm4gbWVtYmVyKElkTXMsICdzdWInKVxuXHRcdFx0Y2FzZSBTVl9TdXBlcjogcmV0dXJuIElkZW50aWZpZXIoJ3N1cGVyJylcblx0XHRcdGNhc2UgU1ZfVGhpc01vZHVsZURpcmVjdG9yeTogcmV0dXJuIElkZW50aWZpZXIoJ19fZGlybmFtZScpXG5cdFx0XHRjYXNlIFNWX1RydWU6IHJldHVybiBMaXRlcmFsKHRydWUpXG5cdFx0XHRjYXNlIFNWX1VuZGVmaW5lZDogcmV0dXJuIFVuYXJ5RXhwcmVzc2lvbigndm9pZCcsIExpdFplcm8pXG5cdFx0XHRkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IodGhpcy5raW5kKVxuXHRcdH1cblx0fSxcblxuXHRUaHJvdygpIHtcblx0XHRyZXR1cm4gaWZFbHNlKHRoaXMub3BUaHJvd24sXG5cdFx0XHRfID0+IFRocm93U3RhdGVtZW50KG1zRXJyb3IodDAoXykpKSxcblx0XHRcdCgpID0+IFRocm93U3RhdGVtZW50KG1zRXJyb3IoTGl0U3RyVGhyb3cpKSlcblx0fSxcblxuXHRZaWVsZCgpIHsgcmV0dXJuIHlpZWxkRXhwcmVzc2lvbk5vRGVsZWdhdGUodDAodGhpcy55aWVsZGVkKSkgfSxcblxuXHRZaWVsZFRvKCkgeyByZXR1cm4geWllbGRFeHByZXNzaW9uRGVsZWdhdGUodDAodGhpcy55aWVsZGVkVG8pKSB9XG59KVxuXG5mdW5jdGlvbiBjYXNlUGFydChhbHRlcm5hdGUpIHtcblx0aWYgKHRoaXMudGVzdCBpbnN0YW5jZW9mIFBhdHRlcm4pIHtcblx0XHRjb25zdCB7IHR5cGUsIHBhdHRlcm5lZCwgbG9jYWxzIH0gPSB0aGlzLnRlc3Rcblx0XHRjb25zdCBkZWNsID0gVmFyaWFibGVEZWNsYXJhdGlvbignY29uc3QnLCBbXG5cdFx0XHRWYXJpYWJsZURlY2xhcmF0b3IoSWRFeHRyYWN0LCBtc0V4dHJhY3QodDAodHlwZSksIHQwKHBhdHRlcm5lZCkpKSBdKVxuXHRcdGNvbnN0IHRlc3QgPSBCaW5hcnlFeHByZXNzaW9uKCchPT0nLCBJZEV4dHJhY3QsIExpdE51bGwpXG5cdFx0Y29uc3QgZXh0cmFjdCA9IFZhcmlhYmxlRGVjbGFyYXRpb24oJ2NvbnN0JywgbG9jYWxzLm1hcCgoXywgaWR4KSA9PlxuXHRcdFx0VmFyaWFibGVEZWNsYXJhdG9yKGlkRm9yRGVjbGFyZUNhY2hlZChfKSwgbWVtYmVyRXhwcmVzc2lvbihJZEV4dHJhY3QsIExpdGVyYWwoaWR4KSkpKSlcblx0XHRjb25zdCByZXMgPSB0MSh0aGlzLnJlc3VsdCwgZXh0cmFjdClcblx0XHRyZXR1cm4gQmxvY2tTdGF0ZW1lbnQoWyBkZWNsLCBJZlN0YXRlbWVudCh0ZXN0LCByZXMsIGFsdGVybmF0ZSkgXSlcblx0fSBlbHNlXG5cdFx0Ly8gYWx0ZXJuYXRlIHdyaXR0ZW4gdG8gYnkgYGNhc2VCb2R5YC5cblx0XHRyZXR1cm4gSWZTdGF0ZW1lbnQobWF5YmVCb29sV3JhcCh0MCh0aGlzLnRlc3QpKSwgdDAodGhpcy5yZXN1bHQpLCBhbHRlcm5hdGUpXG59XG5cbi8vIEZ1bmN0aW9ucyBzcGVjaWZpYyB0byBjZXJ0YWluIGV4cHJlc3Npb25zLlxuY29uc3Rcblx0Ly8gV3JhcHMgYSBibG9jayAod2l0aCBgcmV0dXJuYCBzdGF0ZW1lbnRzIGluIGl0KSBpbiBhbiBJSUZFLlxuXHRibG9ja1dyYXAgPSBibG9jayA9PiB7XG5cdFx0Y29uc3QgaW52b2tlID0gY2FsbEV4cHJlc3Npb25UaHVuayhmdW5jdGlvbkV4cHJlc3Npb25UaHVuayhibG9jaywgaXNJbkdlbmVyYXRvcikpXG5cdFx0cmV0dXJuIGlzSW5HZW5lcmF0b3IgPyB5aWVsZEV4cHJlc3Npb25EZWxlZ2F0ZShpbnZva2UpIDogaW52b2tlXG5cdH0sXG5cblx0Y2FzZUJvZHkgPSAocGFydHMsIG9wRWxzZSkgPT4ge1xuXHRcdGxldCBhY2MgPSBpZkVsc2Uob3BFbHNlLCB0MCwgKCkgPT4gVGhyb3dOb0Nhc2VNYXRjaClcblx0XHRmb3IgKGxldCBpID0gcGFydHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpID0gaSAtIDEpXG5cdFx0XHRhY2MgPSB0MShwYXJ0c1tpXSwgYWNjKVxuXHRcdHJldHVybiBhY2Ncblx0fSxcblxuXHRmb3JMb29wID0gKG9wSXRlcmF0ZWUsIGJsb2NrKSA9PlxuXHRcdGlmRWxzZShvcEl0ZXJhdGVlLFxuXHRcdFx0KHsgZWxlbWVudCwgYmFnIH0pID0+IHtcblx0XHRcdFx0Y29uc3QgZGVjbGFyZSA9IFZhcmlhYmxlRGVjbGFyYXRpb24oJ2xldCcsIFsgVmFyaWFibGVEZWNsYXJhdG9yKHQwKGVsZW1lbnQpKSBdKVxuXHRcdFx0XHRyZXR1cm4gRm9yT2ZTdGF0ZW1lbnQoZGVjbGFyZSwgdDAoYmFnKSwgdDAoYmxvY2spKVxuXHRcdFx0fSxcblx0XHRcdCgpID0+IGZvclN0YXRlbWVudEluZmluaXRlKHQwKGJsb2NrKSkpLFxuXG5cdGNvbnN0cnVjdG9yRGVmaW5pdGlvbiA9IGZ1biA9PiB7XG5cdFx0aXNJbkNvbnN0cnVjdG9yID0gdHJ1ZVxuXHRcdGNvbnN0IHJlcyA9XG5cdFx0XHRNZXRob2REZWZpbml0aW9uKElkZW50aWZpZXIoJ2NvbnN0cnVjdG9yJyksIHQwKGZ1biksICdjb25zdHJ1Y3RvcicsIGZhbHNlLCBmYWxzZSlcblx0XHRpc0luQ29uc3RydWN0b3IgPSBmYWxzZVxuXHRcdHJldHVybiByZXNcblx0fSxcblx0bWV0aG9kRGVmaW5pdGlvbiA9IGlzU3RhdGljID0+IG1ldGhvZCA9PiB7XG5cdFx0aWYgKG1ldGhvZCBpbnN0YW5jZW9mIEZ1bikge1xuXHRcdFx0YXNzZXJ0KG1ldGhvZC5vcE5hbWUgIT09IG51bGwpXG5cdFx0XHRjb25zdCBrZXkgPSBwcm9wZXJ0eUlkT3JMaXRlcmFsQ2FjaGVkKG1ldGhvZC5vcE5hbWUpXG5cdFx0XHRjb25zdCB2YWx1ZSA9IHQwKG1ldGhvZClcblx0XHRcdHZhbHVlLmlkID0gbnVsbFxuXHRcdFx0Y29uc3QgY29tcHV0ZWQgPSBmYWxzZVxuXHRcdFx0cmV0dXJuIE1ldGhvZERlZmluaXRpb24oa2V5LCB2YWx1ZSwgJ21ldGhvZCcsIGlzU3RhdGljLCBjb21wdXRlZClcblx0XHR9IGVsc2Uge1xuXHRcdFx0YXNzZXJ0KG1ldGhvZCBpbnN0YW5jZW9mIE1ldGhvZEltcGwpXG5cdFx0XHRjb25zdCBmdW4gPSBtZXRob2QuZnVuXG5cdFx0XHRhc3NlcnQoZnVuLm9wTmFtZSA9PT0gbnVsbClcblx0XHRcdGNvbnN0IGtleSA9IG1zU3ltYm9sKHQwKG1ldGhvZC5zeW1ib2wpKVxuXHRcdFx0Y29uc3QgdmFsdWUgPSB0MChmdW4pXG5cdFx0XHQvLyBUaGlzIGlzIGhhbmRsZWQgYnkgYGtleWAuXG5cdFx0XHR2YWx1ZS5pZCA9IG51bGxcblx0XHRcdC8vIFRPRE86IGdldC9zZXQhXG5cdFx0XHRjb25zdCBjb21wdXRlZCA9IHRydWVcblx0XHRcdHJldHVybiBNZXRob2REZWZpbml0aW9uKGtleSwgdmFsdWUsICdtZXRob2QnLCBpc1N0YXRpYywgY29tcHV0ZWQpXG5cdFx0fVxuXHR9LFxuXG5cdHRyYW5zcGlsZUJsb2NrID0gKHJldHVybmVkLCBsaW5lcywgbGVhZCwgb3BEZWNsYXJlUmVzLCBvcE91dCkgPT4ge1xuXHRcdC8vIFRPRE86RVM2IE9wdGlvbmFsIGFyZ3VtZW50c1xuXHRcdGlmIChsZWFkID09PSB1bmRlZmluZWQpIGxlYWQgPSBudWxsXG5cdFx0aWYgKG9wRGVjbGFyZVJlcyA9PT0gdW5kZWZpbmVkKSBvcERlY2xhcmVSZXMgPSBudWxsXG5cdFx0aWYgKG9wT3V0ID09PSB1bmRlZmluZWQpIG9wT3V0ID0gbnVsbFxuXHRcdGNvbnN0IGZpbiA9IGlmRWxzZShvcERlY2xhcmVSZXMsXG5cdFx0XHRyZCA9PiB7XG5cdFx0XHRcdGNvbnN0IHJldCA9IG1heWJlV3JhcEluQ2hlY2tDb250YWlucyhyZXR1cm5lZCwgcmQub3BUeXBlLCByZC5uYW1lKVxuXHRcdFx0XHRyZXR1cm4gaWZFbHNlKG9wT3V0LFxuXHRcdFx0XHRcdF8gPT4gY2F0KGRlY2xhcmUocmQsIHJldCksIF8sIFJldHVyblJlcyksXG5cdFx0XHRcdFx0KCkgPT4gUmV0dXJuU3RhdGVtZW50KHJldCkpXG5cdFx0XHR9LFxuXHRcdFx0KCkgPT4gY2F0KG9wT3V0LCBSZXR1cm5TdGF0ZW1lbnQocmV0dXJuZWQpKSlcblx0XHRyZXR1cm4gQmxvY2tTdGF0ZW1lbnQoY2F0KGxlYWQsIGxpbmVzLCBmaW4pKVxuXHR9LFxuXG5cdHRyYW5zcGlsZUV4Y2VwdCA9IGV4Y2VwdCA9PlxuXHRcdFRyeVN0YXRlbWVudChcblx0XHRcdHQwKGV4Y2VwdC5fdHJ5KSxcblx0XHRcdG9wTWFwKGV4Y2VwdC5fY2F0Y2gsIHQwKSxcblx0XHRcdG9wTWFwKGV4Y2VwdC5fZmluYWxseSwgdDApKVxuXG4vLyBNb2R1bGUgaGVscGVyc1xuY29uc3Rcblx0YW1kV3JhcE1vZHVsZSA9IChkb1VzZXMsIG90aGVyVXNlcywgYm9keSkgPT4ge1xuXHRcdGNvbnN0IGFsbFVzZXMgPSBkb1VzZXMuY29uY2F0KG90aGVyVXNlcylcblx0XHRjb25zdCB1c2VQYXRocyA9IEFycmF5RXhwcmVzc2lvbihjYXQoXG5cdFx0XHRMaXRTdHJFeHBvcnRzLFxuXHRcdFx0YWxsVXNlcy5tYXAoXyA9PiBMaXRlcmFsKG1hbmdsZVBhdGgoXy5wYXRoKSkpKSlcblx0XHRjb25zdCB1c2VJZGVudGlmaWVycyA9IGFsbFVzZXMubWFwKChfLCBpKSA9PiBpZENhY2hlZChgJHtwYXRoQmFzZU5hbWUoXy5wYXRoKX1fJHtpfWApKVxuXHRcdGNvbnN0IHVzZUFyZ3MgPSBjYXQoSWRFeHBvcnRzLCB1c2VJZGVudGlmaWVycylcblx0XHRjb25zdCB1c2VEb3MgPSBkb1VzZXMubWFwKCh1c2UsIGkpID0+XG5cdFx0XHRsb2MoRXhwcmVzc2lvblN0YXRlbWVudChtc0dldE1vZHVsZSh1c2VJZGVudGlmaWVyc1tpXSkpLCB1c2UubG9jKSlcblx0XHRjb25zdCBvcFVzZURlY2xhcmUgPSBvcElmKCFpc0VtcHR5KG90aGVyVXNlcyksXG5cdFx0XHQoKSA9PiBWYXJpYWJsZURlY2xhcmF0aW9uKCdjb25zdCcsIGZsYXRNYXAob3RoZXJVc2VzLCAodXNlLCBpKSA9PlxuXHRcdFx0XHR1c2VEZWNsYXJhdG9ycyh1c2UsIHVzZUlkZW50aWZpZXJzW2kgKyBkb1VzZXMubGVuZ3RoXSkpKSlcblx0XHRjb25zdCBmdWxsQm9keSA9IEJsb2NrU3RhdGVtZW50KGNhdCh1c2VEb3MsIG9wVXNlRGVjbGFyZSwgYm9keSwgUmV0dXJuRXhwb3J0cykpXG5cdFx0Y29uc3QgbGF6eUJvZHkgPVxuXHRcdFx0Y29udGV4dC5vcHRzLmxhenlNb2R1bGUoKSA/XG5cdFx0XHRcdEJsb2NrU3RhdGVtZW50KFsgRXhwcmVzc2lvblN0YXRlbWVudChcblx0XHRcdFx0XHRhc3NpZ25tZW50RXhwcmVzc2lvblBsYWluKEV4cG9ydHNHZXQsXG5cdFx0XHRcdFx0XHRtc0xhenkoZnVuY3Rpb25FeHByZXNzaW9uVGh1bmsoZnVsbEJvZHkpKSkpIF0pIDpcblx0XHRcdFx0ZnVsbEJvZHlcblx0XHRyZXR1cm4gQ2FsbEV4cHJlc3Npb24oSWREZWZpbmUsIFsgdXNlUGF0aHMsIEFycm93RnVuY3Rpb25FeHByZXNzaW9uKHVzZUFyZ3MsIGxhenlCb2R5KSBdKVxuXHR9LFxuXG5cdHBhdGhCYXNlTmFtZSA9IHBhdGggPT5cblx0XHRwYXRoLnN1YnN0cihwYXRoLmxhc3RJbmRleE9mKCcvJykgKyAxKSxcblxuXHR1c2VEZWNsYXJhdG9ycyA9ICh1c2UsIG1vZHVsZUlkZW50aWZpZXIpID0+IHtcblx0XHQvLyBUT0RPOiBDb3VsZCBiZSBuZWF0ZXIgYWJvdXQgdGhpc1xuXHRcdGNvbnN0IGlzTGF6eSA9IChpc0VtcHR5KHVzZS51c2VkKSA/IHVzZS5vcFVzZURlZmF1bHQgOiB1c2UudXNlZFswXSkuaXNMYXp5KClcblx0XHRjb25zdCB2YWx1ZSA9IChpc0xhenkgPyBtc0xhenlHZXRNb2R1bGUgOiBtc0dldE1vZHVsZSkobW9kdWxlSWRlbnRpZmllcilcblxuXHRcdGNvbnN0IHVzZWREZWZhdWx0ID0gb3BNYXAodXNlLm9wVXNlRGVmYXVsdCwgZGVmID0+IHtcblx0XHRcdGNvbnN0IGRlZmV4cCA9IG1zR2V0RGVmYXVsdEV4cG9ydChtb2R1bGVJZGVudGlmaWVyKVxuXHRcdFx0Y29uc3QgdmFsID0gaXNMYXp5ID8gbGF6eVdyYXAoZGVmZXhwKSA6IGRlZmV4cFxuXHRcdFx0cmV0dXJuIGxvYyhWYXJpYWJsZURlY2xhcmF0b3IoaWRGb3JEZWNsYXJlQ2FjaGVkKGRlZiksIHZhbCksIGRlZi5sb2MpXG5cdFx0fSlcblxuXHRcdGNvbnN0IHVzZWREZXN0cnVjdCA9IGlzRW1wdHkodXNlLnVzZWQpID8gbnVsbCA6XG5cdFx0XHRtYWtlRGVzdHJ1Y3R1cmVEZWNsYXJhdG9ycyh1c2UudXNlZCwgaXNMYXp5LCB2YWx1ZSwgdHJ1ZSwgZmFsc2UpXG5cblx0XHRyZXR1cm4gY2F0KHVzZWREZWZhdWx0LCB1c2VkRGVzdHJ1Y3QpXG5cdH1cblxuLy8gR2VuZXJhbCB1dGlscy4gTm90IGluIHV0aWwuanMgYmVjYXVzZSB0aGVzZSBjbG9zZSBvdmVyIGNvbnRleHQuXG5jb25zdFxuXHRtYXliZUJvb2xXcmFwID0gYXN0ID0+XG5cdFx0Y29udGV4dC5vcHRzLmluY2x1ZGVDYXNlQ2hlY2tzKCkgPyBtc0Jvb2woYXN0KSA6IGFzdCxcblxuXHRtYWtlRGVzdHJ1Y3R1cmVEZWNsYXJhdG9ycyA9IChhc3NpZ25lZXMsIGlzTGF6eSwgdmFsdWUsIGlzTW9kdWxlLCBpc0V4cG9ydCkgPT4ge1xuXHRcdGNvbnN0IGRlc3RydWN0dXJlZE5hbWUgPSBgXyQke2Fzc2lnbmVlc1swXS5sb2Muc3RhcnQubGluZX1gXG5cdFx0Y29uc3QgaWREZXN0cnVjdHVyZWQgPSBJZGVudGlmaWVyKGRlc3RydWN0dXJlZE5hbWUpXG5cdFx0Y29uc3QgZGVjbGFyYXRvcnMgPSBhc3NpZ25lZXMubWFwKGFzc2lnbmVlID0+IHtcblx0XHRcdC8vIFRPRE86IERvbid0IGNvbXBpbGUgaXQgaWYgaXQncyBuZXZlciBhY2Nlc3NlZFxuXHRcdFx0Y29uc3QgZ2V0ID0gZ2V0TWVtYmVyKGlkRGVzdHJ1Y3R1cmVkLCBhc3NpZ25lZS5uYW1lLCBpc0xhenksIGlzTW9kdWxlKVxuXHRcdFx0cmV0dXJuIG1ha2VEZWNsYXJhdG9yKGFzc2lnbmVlLCBnZXQsIGlzTGF6eSwgaXNFeHBvcnQpXG5cdFx0fSlcblx0XHQvLyBHZXR0aW5nIGxhenkgbW9kdWxlIGlzIGRvbmUgYnkgbXMubGF6eUdldE1vZHVsZS5cblx0XHRjb25zdCB2YWwgPSAoaXNMYXp5ICYmICFpc01vZHVsZSkgPyBsYXp5V3JhcCh2YWx1ZSkgOiB2YWx1ZVxuXHRcdHJldHVybiB1bnNoaWZ0KFZhcmlhYmxlRGVjbGFyYXRvcihpZERlc3RydWN0dXJlZCwgdmFsKSwgZGVjbGFyYXRvcnMpXG5cdH0sXG5cblx0bWFrZURlY2xhcmF0b3IgPSAoYXNzaWduZWUsIHZhbHVlLCB2YWx1ZUlzQWxyZWFkeUxhenksIGlzRXhwb3J0KSA9PiB7XG5cdFx0Y29uc3QgeyBsb2MsIG5hbWUsIG9wVHlwZSB9ID0gYXNzaWduZWVcblx0XHRjb25zdCBpc0xhenkgPSBhc3NpZ25lZS5pc0xhenkoKVxuXHRcdC8vIFRPRE86IGFzc2VydChhc3NpZ25lZS5vcFR5cGUgPT09IG51bGwpXG5cdFx0Ly8gb3IgVE9ETzogQWxsb3cgdHlwZSBjaGVjayBvbiBsYXp5IHZhbHVlP1xuXHRcdHZhbHVlID0gaXNMYXp5ID8gdmFsdWUgOiBtYXliZVdyYXBJbkNoZWNrQ29udGFpbnModmFsdWUsIG9wVHlwZSwgbmFtZSlcblx0XHRpZiAoaXNFeHBvcnQpIHtcblx0XHRcdC8vIFRPRE86RVM2XG5cdFx0XHRjb250ZXh0LmNoZWNrKCFpc0xhenksIGxvYywgJ0xhenkgZXhwb3J0IG5vdCBzdXBwb3J0ZWQuJylcblx0XHRcdHJldHVybiBWYXJpYWJsZURlY2xhcmF0b3IoXG5cdFx0XHRcdGlkRm9yRGVjbGFyZUNhY2hlZChhc3NpZ25lZSksXG5cdFx0XHRcdGFzc2lnbm1lbnRFeHByZXNzaW9uUGxhaW4obWVtYmVyKElkRXhwb3J0cywgbmFtZSksIHZhbHVlKSlcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgdmFsID0gaXNMYXp5ICYmICF2YWx1ZUlzQWxyZWFkeUxhenkgPyBsYXp5V3JhcCh2YWx1ZSkgOiB2YWx1ZVxuXHRcdFx0YXNzZXJ0KGlzTGF6eSB8fCAhdmFsdWVJc0FscmVhZHlMYXp5KVxuXHRcdFx0cmV0dXJuIFZhcmlhYmxlRGVjbGFyYXRvcihpZEZvckRlY2xhcmVDYWNoZWQoYXNzaWduZWUpLCB2YWwpXG5cdFx0fVxuXHR9LFxuXG5cdG1heWJlV3JhcEluQ2hlY2tDb250YWlucyA9IChhc3QsIG9wVHlwZSwgbmFtZSkgPT5cblx0XHQoY29udGV4dC5vcHRzLmluY2x1ZGVUeXBlQ2hlY2tzKCkgJiYgb3BUeXBlICE9PSBudWxsKSA/XG5cdFx0XHRtc0NoZWNrQ29udGFpbnModDAob3BUeXBlKSwgYXN0LCBMaXRlcmFsKG5hbWUpKSA6XG5cdFx0XHRhc3QsXG5cblx0Z2V0TWVtYmVyID0gKGFzdE9iamVjdCwgZ290TmFtZSwgaXNMYXp5LCBpc01vZHVsZSkgPT5cblx0XHRpc0xhenkgP1xuXHRcdG1zTGF6eUdldChhc3RPYmplY3QsIExpdGVyYWwoZ290TmFtZSkpIDpcblx0XHRpc01vZHVsZSAmJiBjb250ZXh0Lm9wdHMuaW5jbHVkZVVzZUNoZWNrcygpID9cblx0XHRtc0dldChhc3RPYmplY3QsIExpdGVyYWwoZ290TmFtZSkpIDpcblx0XHRtZW1iZXIoYXN0T2JqZWN0LCBnb3ROYW1lKVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=