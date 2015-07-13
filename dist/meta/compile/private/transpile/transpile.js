if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'esast/dist/ast', 'esast/dist/util', 'esast/dist/specialize', '../../MsAst', '../manglePath', '../util', './ast-constants', './ms-call', './util'], function (exports, _esastDistAst, _esastDistUtil, _esastDistSpecialize, _MsAst, _manglePath, _util, _astConstants, _msCall, _util2) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _manglePath2 = _interopRequireDefault(_manglePath);

	let context, verifyResults, isInGenerator;

	exports.default = function (_context, moduleExpression, _verifyResults) {
		context = _context;
		verifyResults = _verifyResults;
		isInGenerator = false;
		const res = t0(moduleExpression);
		// Release for garbage collection.
		context = verifyResults = undefined;
		return res;
	};

	const t0 = function (expr) {
		return (0, _esastDistUtil.loc)(expr.transpileSubtree(), expr.loc);
	};
	exports.t0 = t0;
	const t1 = function (expr, arg) {
		return (0, _esastDistUtil.loc)(expr.transpileSubtree(arg), expr.loc);
	},
	      t3 = function (expr, arg, arg2, arg3) {
		return (0, _esastDistUtil.loc)(expr.transpileSubtree(arg, arg2, arg3), expr.loc);
	},
	      tLines = function (exprs) {
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
		AssignSingle: function (valWrap) {
			const val = valWrap === undefined ? t0(this.value) : valWrap(t0(this.value));
			const declare = makeDeclarator(this.assignee, val, false, verifyResults.isExportAssign(this));
			return (0, _esastDistAst.VariableDeclaration)(this.assignee.isMutable() ? 'let' : 'const', [declare]);
		},
		// TODO:ES6 Just use native destructuring assign
		AssignDestructure: function () {
			return (0, _esastDistAst.VariableDeclaration)(this.kind() === _MsAst.LD_Mutable ? 'let' : 'const', makeDestructureDeclarators(this.assignees, this.kind() === _MsAst.LD_Lazy, t0(this.value), false, verifyResults.isExportAssign(this)));
		},

		BagEntry: function () {
			return (0, _msCall.msAdd)(_astConstants.IdBuilt, t0(this.value));
		},

		BagEntryMany: function () {
			return (0, _msCall.msAddMany)(_astConstants.IdBuilt, t0(this.value));
		},

		BagSimple: function () {
			return (0, _esastDistAst.ArrayExpression)(this.parts.map(t0));
		},

		BlockDo: function () {
			let lead = arguments[0] === undefined ? null : arguments[0];
			let opResDeclare = arguments[1] === undefined ? null : arguments[1];
			let opOut = arguments[2] === undefined ? null : arguments[2];

			(0, _util.assert)(opResDeclare === null);
			return (0, _esastDistAst.BlockStatement)((0, _util.cat)(lead, tLines(this.lines), opOut));
		},

		BlockValOhNo: function () {
			let lead = arguments[0] === undefined ? null : arguments[0];
			let opResDeclare = arguments[1] === undefined ? null : arguments[1];
			let opOut = arguments[2] === undefined ? null : arguments[2];

			context.warnIf(opResDeclare !== null || opOut !== null, this.loc, 'Out condition ignored because of oh-no!');
			return (0, _esastDistAst.BlockStatement)((0, _util.cat)(lead, tLines(this.lines), t0(this.ohNo)));
		},

		BlockWithReturn: function (lead, opResDeclare, opOut) {
			return transpileBlock(t0(this.returned), tLines(this.lines), lead, opResDeclare, opOut);
		},

		BlockBag: function (lead, opResDeclare, opOut) {
			return transpileBlock(_astConstants.IdBuilt, (0, _util.cat)(_astConstants.DeclareBuiltBag, tLines(this.lines)), lead, opResDeclare, opOut);
		},

		BlockObj: function (lead, opResDeclare, opOut) {
			var _this = this;

			const lines = (0, _util.cat)(_astConstants.DeclareBuiltObj, tLines(this.lines));
			const res = (0, _util.ifElse)(this.opObjed, function (objed) {
				return (0, _util.ifElse)(_this.opName, function (name) {
					return (0, _msCall.msSet)(t0(objed), _astConstants.IdBuilt, (0, _esastDistAst.Literal)(name));
				}, function () {
					return (0, _msCall.msSet)(t0(objed), _astConstants.IdBuilt);
				});
			}, function () {
				return (0, _util.ifElse)(_this.opName, function (_) {
					return (0, _msCall.msSetName)(_astConstants.IdBuilt, (0, _esastDistAst.Literal)(_));
				}, function () {
					return _astConstants.IdBuilt;
				});
			});
			return transpileBlock(res, lines, lead, opResDeclare, opOut);
		},

		BlockMap: function (lead, opResDeclare, opOut) {
			return transpileBlock(_astConstants.IdBuilt, (0, _util.cat)(_astConstants.DeclareBuiltMap, tLines(this.lines)), lead, opResDeclare, opOut);
		},

		BlockWrap: function () {
			return blockWrap(t0(this.block));
		},

		BreakDo: function () {
			return (0, _esastDistAst.BreakStatement)();
		},

		BreakVal: function () {
			return (0, _esastDistAst.ReturnStatement)(t0(this.value));
		},

		Call: function () {
			const anySplat = this.args.some(function (arg) {
				return arg instanceof _MsAst.Splat;
			});
			if (anySplat) {
				const args = this.args.map(function (arg) {
					return arg instanceof _MsAst.Splat ? (0, _msCall.msArr)(t0(arg.splatted)) : t0(arg);
				});
				return (0, _esastDistAst.CallExpression)(_astConstants.IdFunctionApplyCall, [t0(this.called), _astConstants.LitNull, (0, _esastDistAst.CallExpression)((0, _esastDistUtil.member)(_astConstants.LitEmptyArray, 'concat'), args)]);
			} else return (0, _esastDistAst.CallExpression)(t0(this.called), this.args.map(t0));
		},

		CaseDo: function () {
			const body = caseBody(this.parts, this.opElse);
			return (0, _util.ifElse)(this.opCased, function (_) {
				return (0, _esastDistAst.BlockStatement)([t0(_), body]);
			}, function () {
				return body;
			});
		},

		CaseVal: function () {
			const body = caseBody(this.parts, this.opElse);
			const block = (0, _util.ifElse)(this.opCased, function (_) {
				return [t0(_), body];
			}, function () {
				return [body];
			});
			return blockWrap((0, _esastDistAst.BlockStatement)(block));
		},

		CaseDoPart: casePart,
		CaseValPart: casePart,

		ConditionalDo: function () {
			return (0, _esastDistAst.IfStatement)(this.isUnless ? (0, _esastDistAst.UnaryExpression)('!', maybeBoolWrap(t0(this.test))) : t0(this.test), t0(this.result));
		},

		ConditionalVal: function () {
			const test = maybeBoolWrap(t0(this.test));
			const result = (0, _msCall.msSome)(blockWrap(t0(this.result)));
			return this.isUnless ? (0, _esastDistAst.ConditionalExpression)(test, _msCall.MsNone, result) : (0, _esastDistAst.ConditionalExpression)(test, result, _msCall.MsNone);
		},

		Catch: function () {
			return (0, _esastDistAst.CatchClause)(t0(this.caught), t0(this.block));
		},

		Continue: function () {
			return (0, _esastDistAst.ContinueStatement)();
		},

		// TODO: includeInoutChecks is misnamed
		Debug: function () {
			return context.opts.includeInoutChecks() ? tLines(this.lines) : [];
		},

		ExceptDo: function () {
			return transpileExcept(this);
		},
		ExceptVal: function () {
			return blockWrap((0, _esastDistAst.BlockStatement)([transpileExcept(this)]));
		},

		ForDo: function () {
			return forLoop(this.opIteratee, this.block);
		},

		ForBag: function () {
			return blockWrap((0, _esastDistAst.BlockStatement)([_astConstants.DeclareBuiltBag, forLoop(this.opIteratee, this.block), _astConstants.ReturnBuilt]));
		},

		ForVal: function () {
			return blockWrap((0, _esastDistAst.BlockStatement)([forLoop(this.opIteratee, this.block)]));
		},

		Fun: function () {
			var _this2 = this;

			const oldInGenerator = isInGenerator;
			isInGenerator = this.isGenerator;

			// TODO:ES6 use `...`f
			const nArgs = (0, _esastDistAst.Literal)(this.args.length);
			const opDeclareRest = (0, _util.opMap)(this.opRestArg, function (rest) {
				return (0, _util2.declare)(rest, (0, _esastDistAst.CallExpression)(_astConstants.ArraySliceCall, [_astConstants.IdArguments, nArgs]));
			});
			const argChecks = (0, _util.opIf)(context.opts.includeTypeChecks(), function () {
				return (0, _util.flatOpMap)(_this2.args, _util2.opTypeCheckForLocalDeclare);
			});

			const _in = (0, _util.opMap)(this.opIn, t0);
			const lead = (0, _util.cat)(opDeclareRest, argChecks, _in);

			const _out = (0, _util.opMap)(this.opOut, t0);
			const body = t3(this.block, lead, this.opResDeclare, _out);
			const args = this.args.map(t0);
			isInGenerator = oldInGenerator;
			const id = (0, _util.opMap)(this.name, _esastDistUtil.idCached);
			return (0, _esastDistAst.FunctionExpression)(id, args, body, this.isGenerator);
		},

		Lazy: function () {
			return (0, _msCall.lazyWrap)(t0(this.value));
		},

		NumberLiteral: function () {
			// Negative numbers are not part of ES spec.
			// http://www.ecma-international.org/ecma-262/5.1/#sec-7.8.3
			const lit = (0, _esastDistAst.Literal)(Math.abs(this.value));
			return (0, _util.isPositive)(this.value) ? lit : (0, _esastDistAst.UnaryExpression)('-', lit);
		},

		GlobalAccess: function () {
			return (0, _esastDistAst.Identifier)(this.name);
		},

		LocalAccess: function () {
			return (0, _util2.accessLocalDeclare)(verifyResults.localDeclareForAccess(this));
		},

		LocalDeclare: function () {
			return (0, _util2.idForDeclareCached)(this);
		},

		LocalMutate: function () {
			return (0, _esastDistSpecialize.assignmentExpressionPlain)((0, _esastDistUtil.idCached)(this.name), t0(this.value));
		},

		Logic: function () {
			(0, _util.assert)(this.kind === _MsAst.L_And || this.kind === _MsAst.L_Or);
			const op = this.kind === _MsAst.L_And ? '&&' : '||';
			return (0, _util.tail)(this.args).reduce(function (a, b) {
				return (0, _esastDistAst.LogicalExpression)(op, a, t0(b));
			}, t0(this.args[0]));
		},

		MapEntry: function () {
			return (0, _msCall.msAssoc)(_astConstants.IdBuilt, t0(this.key), t0(this.val));
		},

		Member: function () {
			return (0, _esastDistUtil.member)(t0(this.object), this.name);
		},

		Module: function () {
			const body = (0, _util.cat)(tLines(this.lines), (0, _util.opMap)(this.opDefaultExport, function (_) {
				return (0, _esastDistSpecialize.assignmentExpressionPlain)(_astConstants.ExportsDefault, t0(_));
			}));
			return (0, _esastDistAst.Program)((0, _util.cat)((0, _util.opIf)(context.opts.includeUseStrict(), function () {
				return _astConstants.UseStrict;
			}), (0, _util.opIf)(context.opts.includeAmdefine(), function () {
				return _astConstants.AmdefineHeader;
			}), (0, _esastDistUtil.toStatement)(amdWrapModule(this.doUses, this.uses.concat(this.debugUses), body))));
		},

		New: function () {
			const anySplat = this.args.some(function (_) {
				return _ instanceof _MsAst.Splat;
			});
			context.check(!anySplat, this.loc, 'TODO: Splat params for new');
			return (0, _esastDistAst.NewExpression)(t0(this.type), this.args.map(t0));
		},

		Not: function () {
			return (0, _esastDistAst.UnaryExpression)('!', t0(this.arg));
		},

		ObjEntry: function () {
			var _this3 = this;

			return this.assign instanceof _MsAst.AssignSingle && !this.assign.assignee.isLazy() ? t1(this.assign, function (val) {
				return (0, _esastDistSpecialize.assignmentExpressionPlain)((0, _esastDistUtil.member)(_astConstants.IdBuilt, _this3.assign.assignee.name), val);
			}) : (0, _util.cat)(t0(this.assign), this.assign.allAssignees().map(function (_) {
				return (0, _msCall.msSetLazy)(_astConstants.IdBuilt, (0, _esastDistAst.Literal)(_.name), (0, _util2.idForDeclareCached)(_));
			}));
		},

		ObjSimple: function () {
			return (0, _esastDistAst.ObjectExpression)(this.pairs.map(function (pair) {
				return (0, _esastDistSpecialize.property)('init', (0, _esastDistUtil.propertyIdOrLiteralCached)(pair.key), t0(pair.value));
			}));
		},

		OhNo: function () {
			return (0, _util.ifElse)(this.opThrown, function (_) {
				return (0, _esastDistAst.ThrowStatement)((0, _msCall.msError)(t0(_)));
			}, function () {
				return (0, _esastDistAst.ThrowStatement)((0, _msCall.msError)(_astConstants.LitStrOhNo));
			});
		},

		Quote: function () {
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

		SpecialDo: function () {
			switch (this.kind) {
				case _MsAst.SD_Debugger:
					return (0, _esastDistAst.DebuggerStatement)();
				default:
					throw new Error(this.kind);
			}
		},

		SpecialVal: function () {
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
				case _MsAst.SV_This:
					return (0, _esastDistAst.ThisExpression)();
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

		Yield: function () {
			return (0, _esastDistSpecialize.yieldExpressionNoDelegate)(t0(this.yielded));
		},

		YieldTo: function () {
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
			const extract = (0, _esastDistAst.VariableDeclaration)('const', locals.map(function (_, idx) {
				return (0, _esastDistAst.VariableDeclarator)((0, _util2.idForDeclareCached)(_), (0, _esastDistSpecialize.memberExpression)(_astConstants.IdExtract, (0, _esastDistAst.Literal)(idx)));
			}));
			const res = t1(this.result, extract);
			return (0, _esastDistAst.BlockStatement)([decl, (0, _esastDistAst.IfStatement)(test, res, alternate)]);
		} else
			// alternate written to by `caseBody`.
			return (0, _esastDistAst.IfStatement)(maybeBoolWrap(t0(this.test)), t0(this.result), alternate);
	}

	// Functions specific to certain expressions.
	const
	// Wraps a block (with `return` statements in it) in an IIFE.
	blockWrap = function (block) {
		const invoke = (0, _esastDistSpecialize.callExpressionThunk)((0, _esastDistSpecialize.functionExpressionThunk)(block, isInGenerator));
		return isInGenerator ? (0, _esastDistSpecialize.yieldExpressionDelegate)(invoke) : invoke;
	},
	      caseBody = function (parts, opElse) {
		let acc = (0, _util.ifElse)(opElse, t0, function () {
			return (0, _util2.throwErrorFromString)('No branch of `case` matches.');
		});
		for (let i = parts.length - 1; i >= 0; i = i - 1) acc = t1(parts[i], acc);
		return acc;
	},
	      forLoop = function (opIteratee, block) {
		return (0, _util.ifElse)(opIteratee, function (_ref) {
			let element = _ref.element;
			let bag = _ref.bag;

			const declare = (0, _esastDistAst.VariableDeclaration)('let', [(0, _esastDistAst.VariableDeclarator)(t0(element))]);
			return (0, _esastDistAst.ForOfStatement)(declare, t0(bag), t0(block));
		}, function () {
			return (0, _util2.forStatementInfinite)(t0(block));
		});
	},
	      transpileBlock = function (returned, lines) {
		let lead = arguments[2] === undefined ? null : arguments[2];
		let opResDeclare = arguments[3] === undefined ? null : arguments[3];
		let opOut = arguments[4] === undefined ? null : arguments[4];

		const fin = (0, _util.ifElse)(opResDeclare, function (rd) {
			const ret = maybeWrapInCheckContains(returned, rd.opType, rd.name);
			return (0, _util.ifElse)(opOut, function (_) {
				return (0, _util.cat)((0, _util2.declare)(rd, ret), _, _astConstants.ReturnRes);
			}, function () {
				return (0, _esastDistAst.ReturnStatement)(ret);
			});
		}, function () {
			return (0, _util.cat)(opOut, (0, _esastDistAst.ReturnStatement)(returned));
		});
		return (0, _esastDistAst.BlockStatement)((0, _util.cat)(lead, lines, fin));
	},
	      transpileExcept = function (except) {
		return (0, _esastDistAst.TryStatement)(t0(except._try), (0, _util.opMap)(except._catch, t0), (0, _util.opMap)(except._finally, t0));
	};

	// Module helpers
	const amdWrapModule = function (doUses, otherUses, body) {
		const allUses = doUses.concat(otherUses);
		const usePaths = (0, _esastDistAst.ArrayExpression)((0, _util.cat)(_astConstants.LitStrExports, allUses.map(function (_) {
			return (0, _esastDistAst.Literal)((0, _manglePath2.default)(_.path));
		})));
		const useIdentifiers = allUses.map(function (_, i) {
			return (0, _esastDistUtil.idCached)(pathBaseName(_.path) + '_' + i);
		});
		const useArgs = (0, _util.cat)(_astConstants.IdExports, useIdentifiers);
		const useDos = doUses.map(function (use, i) {
			return (0, _esastDistUtil.loc)((0, _esastDistAst.ExpressionStatement)((0, _msCall.msGetModule)(useIdentifiers[i])), use.loc);
		});
		const opUseDeclare = (0, _util.opIf)(!(0, _util.isEmpty)(otherUses), function () {
			return (0, _esastDistAst.VariableDeclaration)('const', (0, _util.flatMap)(otherUses, function (use, i) {
				return useDeclarators(use, useIdentifiers[i + doUses.length]);
			}));
		});
		const fullBody = (0, _esastDistAst.BlockStatement)((0, _util.cat)(useDos, opUseDeclare, body, _astConstants.ReturnExports));
		const lazyBody = context.opts.lazyModule() ? (0, _esastDistAst.BlockStatement)([(0, _esastDistAst.ExpressionStatement)((0, _esastDistSpecialize.assignmentExpressionPlain)(_astConstants.ExportsGet, (0, _msCall.msLazy)((0, _esastDistSpecialize.functionExpressionThunk)(fullBody))))]) : fullBody;
		return (0, _esastDistAst.CallExpression)(_astConstants.IdDefine, [usePaths, (0, _esastDistSpecialize.functionExpressionPlain)(useArgs, lazyBody)]);
	},
	      pathBaseName = function (path) {
		return path.substr(path.lastIndexOf('/') + 1);
	},
	      useDeclarators = function (use, moduleIdentifier) {
		// TODO: Could be neater about this
		const isLazy = ((0, _util.isEmpty)(use.used) ? use.opUseDefault : use.used[0]).isLazy();
		const value = (isLazy ? _msCall.msLazyGetModule : _msCall.msGetModule)(moduleIdentifier);

		const usedDefault = (0, _util.opMap)(use.opUseDefault, function (def) {
			const defexp = (0, _msCall.msGetDefaultExport)(moduleIdentifier);
			const val = isLazy ? (0, _msCall.lazyWrap)(defexp) : defexp;
			return (0, _esastDistUtil.loc)((0, _esastDistAst.VariableDeclarator)((0, _util2.idForDeclareCached)(def), val), def.loc);
		});

		const usedDestruct = (0, _util.isEmpty)(use.used) ? null : makeDestructureDeclarators(use.used, isLazy, value, true, false);

		return (0, _util.cat)(usedDefault, usedDestruct);
	};

	// General utils. Not in util.js because these close over context.
	const maybeBoolWrap = function (ast) {
		return context.opts.includeCaseChecks() ? (0, _msCall.msBool)(ast) : ast;
	},
	      makeDestructureDeclarators = function (assignees, isLazy, value, isModule, isExport) {
		const destructuredName = '_$' + assignees[0].loc.start.line;
		const idDestructured = (0, _esastDistAst.Identifier)(destructuredName);
		const declarators = assignees.map(function (assignee) {
			// TODO: Don't compile it if it's never accessed
			const get = getMember(idDestructured, assignee.name, isLazy, isModule);
			return makeDeclarator(assignee, get, isLazy, isExport);
		});
		// Getting lazy module is done by ms.lazyGetModule.
		const val = isLazy && !isModule ? (0, _msCall.lazyWrap)(value) : value;
		return (0, _util.unshift)((0, _esastDistAst.VariableDeclarator)(idDestructured, val), declarators);
	},
	      makeDeclarator = function (assignee, value, valueIsAlreadyLazy, isExport) {
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
	      maybeWrapInCheckContains = function (ast, opType, name) {
		return context.opts.includeTypeChecks() && opType !== null ? (0, _msCall.msCheckContains)(t0(opType), ast, (0, _esastDistAst.Literal)(name)) : ast;
	},
	      getMember = function (astObject, gotName, isLazy, isModule) {
		return isLazy ? (0, _msCall.msLazyGet)(astObject, (0, _esastDistAst.Literal)(gotName)) : isModule && context.opts.includeUseChecks() ? (0, _msCall.msGet)(astObject, (0, _esastDistAst.Literal)(gotName)) : (0, _esastDistUtil.member)(astObject, gotName);
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS90cmFuc3BpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUEyQkEsS0FBSSxPQUFPLEVBQUUsYUFBYSxFQUFFLGFBQWEsQ0FBQTs7bUJBRTFCLFVBQUMsUUFBUSxFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBSztBQUM5RCxTQUFPLEdBQUcsUUFBUSxDQUFBO0FBQ2xCLGVBQWEsR0FBRyxjQUFjLENBQUE7QUFDOUIsZUFBYSxHQUFHLEtBQUssQ0FBQTtBQUNyQixRQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTs7QUFFaEMsU0FBTyxHQUFHLGFBQWEsR0FBRyxTQUFTLENBQUE7QUFDbkMsU0FBTyxHQUFHLENBQUE7RUFDVjs7QUFFTSxPQUNOLEVBQUUsR0FBRyxVQUFBLElBQUk7U0FBSSxtQkFsQ0ssR0FBRyxFQWtDSixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDO0VBQUEsQ0FBQTtTQUFuRCxFQUFFLEdBQUYsRUFBRTtBQUNILE9BQ0MsRUFBRSxHQUFHLFVBQUMsSUFBSSxFQUFFLEdBQUc7U0FBSyxtQkFwQ0YsR0FBRyxFQW9DRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQztFQUFBO09BQzdELEVBQUUsR0FBRyxVQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUk7U0FBSyxtQkFyQ2QsR0FBRyxFQXFDZSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDO0VBQUE7T0FDckYsTUFBTSxHQUFHLFVBQUEsS0FBSyxFQUFJO0FBQ2pCLFFBQU0sR0FBRyxHQUFHLEVBQUcsQ0FBQTtBQUNmLE9BQUssTUFBTSxJQUFJLElBQUksS0FBSyxFQUFFO0FBQ3pC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TUFBTSxFQW9lckIsU0FBUyxFQUFFLE9BQU8sQ0FBQztFQUFBLENBQUEiLCJmaWxlIjoibWV0YS9jb21waWxlL3ByaXZhdGUvdHJhbnNwaWxlL3RyYW5zcGlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFycmF5RXhwcmVzc2lvbiwgQmluYXJ5RXhwcmVzc2lvbiwgQmxvY2tTdGF0ZW1lbnQsIEJyZWFrU3RhdGVtZW50LCBDYWxsRXhwcmVzc2lvbixcblx0Q2F0Y2hDbGF1c2UsIENvbmRpdGlvbmFsRXhwcmVzc2lvbiwgQ29udGludWVTdGF0ZW1lbnQsIERlYnVnZ2VyU3RhdGVtZW50LCBFeHByZXNzaW9uU3RhdGVtZW50LFxuXHRGb3JPZlN0YXRlbWVudCwgRnVuY3Rpb25FeHByZXNzaW9uLCBJZGVudGlmaWVyLCBJZlN0YXRlbWVudCwgTGl0ZXJhbCwgTG9naWNhbEV4cHJlc3Npb24sXG5cdE5ld0V4cHJlc3Npb24sIE9iamVjdEV4cHJlc3Npb24sIFByb2dyYW0sIFJldHVyblN0YXRlbWVudCwgVGVtcGxhdGVMaXRlcmFsLCBUaGlzRXhwcmVzc2lvbixcblx0VGhyb3dTdGF0ZW1lbnQsIFRyeVN0YXRlbWVudCwgVmFyaWFibGVEZWNsYXJhdGlvbiwgVW5hcnlFeHByZXNzaW9uLCBWYXJpYWJsZURlY2xhcmF0b3IsXG5cdFJldHVyblN0YXRlbWVudCB9IGZyb20gJ2VzYXN0L2Rpc3QvYXN0J1xuaW1wb3J0IHsgaWRDYWNoZWQsIGxvYywgbWVtYmVyLCBwcm9wZXJ0eUlkT3JMaXRlcmFsQ2FjaGVkLCB0b1N0YXRlbWVudCB9IGZyb20gJ2VzYXN0L2Rpc3QvdXRpbCdcbmltcG9ydCB7IGFzc2lnbm1lbnRFeHByZXNzaW9uUGxhaW4sIGNhbGxFeHByZXNzaW9uVGh1bmssIGZ1bmN0aW9uRXhwcmVzc2lvblBsYWluLFxuXHRmdW5jdGlvbkV4cHJlc3Npb25UaHVuaywgbWVtYmVyRXhwcmVzc2lvbiwgcHJvcGVydHksXG5cdHlpZWxkRXhwcmVzc2lvbkRlbGVnYXRlLCB5aWVsZEV4cHJlc3Npb25Ob0RlbGVnYXRlIH0gZnJvbSAnZXNhc3QvZGlzdC9zcGVjaWFsaXplJ1xuaW1wb3J0ICogYXMgTXNBc3RUeXBlcyBmcm9tICcuLi8uLi9Nc0FzdCdcbmltcG9ydCB7IEFzc2lnblNpbmdsZSwgTF9BbmQsIExfT3IsIExEX0xhenksIExEX011dGFibGUsIFBhdHRlcm4sIFNwbGF0LCBTRF9EZWJ1Z2dlciwgU1ZfQ29udGFpbnMsXG5cdFNWX0ZhbHNlLCBTVl9OdWxsLCBTVl9TdWIsIFNWX1RoaXMsIFNWX1RoaXNNb2R1bGVEaXJlY3RvcnksIFNWX1RydWUsIFNWX1VuZGVmaW5lZFxuXHR9IGZyb20gJy4uLy4uL01zQXN0J1xuaW1wb3J0IG1hbmdsZVBhdGggZnJvbSAnLi4vbWFuZ2xlUGF0aCdcbmltcG9ydCB7IGFzc2VydCwgY2F0LCBmbGF0TWFwLCBmbGF0T3BNYXAsIGlmRWxzZSwgaXNFbXB0eSxcblx0aW1wbGVtZW50TWFueSwgaXNQb3NpdGl2ZSwgb3BJZiwgb3BNYXAsIHRhaWwsIHVuc2hpZnQgfSBmcm9tICcuLi91dGlsJ1xuaW1wb3J0IHsgQW1kZWZpbmVIZWFkZXIsIEFycmF5U2xpY2VDYWxsLCBEZWNsYXJlQnVpbHRCYWcsIERlY2xhcmVCdWlsdE1hcCwgRGVjbGFyZUJ1aWx0T2JqLFxuXHRFbXB0eVRlbXBsYXRlRWxlbWVudCwgRXhwb3J0c0RlZmF1bHQsIEV4cG9ydHNHZXQsIElkQXJndW1lbnRzLCBJZEJ1aWx0LCBJZERlZmluZSwgSWRFeHBvcnRzLFxuXHRJZEV4dHJhY3QsIElkRnVuY3Rpb25BcHBseUNhbGwsIExpdEVtcHR5QXJyYXksIExpdEVtcHR5U3RyaW5nLCBMaXROdWxsLCBMaXRTdHJFeHBvcnRzLFxuXHRMaXRTdHJPaE5vLCBMaXRaZXJvLCBSZXR1cm5CdWlsdCwgUmV0dXJuRXhwb3J0cywgUmV0dXJuUmVzLCBVc2VTdHJpY3QgfSBmcm9tICcuL2FzdC1jb25zdGFudHMnXG5pbXBvcnQgeyBJZE1zLCBsYXp5V3JhcCwgbXNBZGQsIG1zQWRkTWFueSwgbXNBcnIsIG1zQXNzb2MsIG1zQm9vbCwgbXNDaGVja0NvbnRhaW5zLCBtc0Vycm9yLFxuXHRtc0V4dHJhY3QsIG1zR2V0LCBtc0dldERlZmF1bHRFeHBvcnQsIG1zR2V0TW9kdWxlLCBtc0xhenksIG1zTGF6eUdldCwgbXNMYXp5R2V0TW9kdWxlLCBtc1NldCxcblx0bXNTZXROYW1lLCBtc1NldExhenksIG1zU2hvdywgbXNTb21lLCBNc05vbmUgfSBmcm9tICcuL21zLWNhbGwnXG5pbXBvcnQgeyBhY2Nlc3NMb2NhbERlY2xhcmUsIGRlY2xhcmUsIGZvclN0YXRlbWVudEluZmluaXRlLCBpZEZvckRlY2xhcmVDYWNoZWQsXG5cdG9wVHlwZUNoZWNrRm9yTG9jYWxEZWNsYXJlLCB0ZW1wbGF0ZUVsZW1lbnRGb3JTdHJpbmcsIHRocm93RXJyb3JGcm9tU3RyaW5nIH0gZnJvbSAnLi91dGlsJ1xuXG5sZXQgY29udGV4dCwgdmVyaWZ5UmVzdWx0cywgaXNJbkdlbmVyYXRvclxuXG5leHBvcnQgZGVmYXVsdCAoX2NvbnRleHQsIG1vZHVsZUV4cHJlc3Npb24sIF92ZXJpZnlSZXN1bHRzKSA9PiB7XG5cdGNvbnRleHQgPSBfY29udGV4dFxuXHR2ZXJpZnlSZXN1bHRzID0gX3ZlcmlmeVJlc3VsdHNcblx0aXNJbkdlbmVyYXRvciA9IGZhbHNlXG5cdGNvbnN0IHJlcyA9IHQwKG1vZHVsZUV4cHJlc3Npb24pXG5cdC8vIFJlbGVhc2UgZm9yIGdhcmJhZ2UgY29sbGVjdGlvbi5cblx0Y29udGV4dCA9IHZlcmlmeVJlc3VsdHMgPSB1bmRlZmluZWRcblx0cmV0dXJuIHJlc1xufVxuXG5leHBvcnQgY29uc3Rcblx0dDAgPSBleHByID0+IGxvYyhleHByLnRyYW5zcGlsZVN1YnRyZWUoKSwgZXhwci5sb2MpXG5jb25zdFxuXHR0MSA9IChleHByLCBhcmcpID0+IGxvYyhleHByLnRyYW5zcGlsZVN1YnRyZWUoYXJnKSwgZXhwci5sb2MpLFxuXHR0MyA9IChleHByLCBhcmcsIGFyZzIsIGFyZzMpID0+IGxvYyhleHByLnRyYW5zcGlsZVN1YnRyZWUoYXJnLCBhcmcyLCBhcmczKSwgZXhwci5sb2MpLFxuXHR0TGluZXMgPSBleHBycyA9PiB7XG5cdFx0Y29uc3Qgb3V0ID0gWyBdXG5cdFx0Zm9yIChjb25zdCBleHByIG9mIGV4cHJzKSB7XG5cdFx0XHRjb25zdCBhc3QgPSBleHByLnRyYW5zcGlsZVN1YnRyZWUoKVxuXHRcdFx0aWYgKGFzdCBpbnN0YW5jZW9mIEFycmF5KVxuXHRcdFx0XHQvLyBEZWJ1ZyBtYXkgcHJvZHVjZSBtdWx0aXBsZSBzdGF0ZW1lbnRzLlxuXHRcdFx0XHRmb3IgKGNvbnN0IF8gb2YgYXN0KVxuXHRcdFx0XHRcdG91dC5wdXNoKHRvU3RhdGVtZW50KF8pKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRvdXQucHVzaChsb2ModG9TdGF0ZW1lbnQoYXN0KSwgZXhwci5sb2MpKVxuXHRcdH1cblx0XHRyZXR1cm4gb3V0XG5cdH1cblxuaW1wbGVtZW50TWFueShNc0FzdFR5cGVzLCAndHJhbnNwaWxlU3VidHJlZScsIHtcblx0QXNzaWduU2luZ2xlKHZhbFdyYXApIHtcblx0XHRjb25zdCB2YWwgPSB2YWxXcmFwID09PSB1bmRlZmluZWQgPyB0MCh0aGlzLnZhbHVlKSA6IHZhbFdyYXAodDAodGhpcy52YWx1ZSkpXG5cdFx0Y29uc3QgZGVjbGFyZSA9XG5cdFx0XHRtYWtlRGVjbGFyYXRvcih0aGlzLmFzc2lnbmVlLCB2YWwsIGZhbHNlLCB2ZXJpZnlSZXN1bHRzLmlzRXhwb3J0QXNzaWduKHRoaXMpKVxuXHRcdHJldHVybiBWYXJpYWJsZURlY2xhcmF0aW9uKHRoaXMuYXNzaWduZWUuaXNNdXRhYmxlKCkgPyAnbGV0JyA6ICdjb25zdCcsIFsgZGVjbGFyZSBdKVxuXHR9LFxuXHQvLyBUT0RPOkVTNiBKdXN0IHVzZSBuYXRpdmUgZGVzdHJ1Y3R1cmluZyBhc3NpZ25cblx0QXNzaWduRGVzdHJ1Y3R1cmUoKSB7XG5cdFx0cmV0dXJuIFZhcmlhYmxlRGVjbGFyYXRpb24odGhpcy5raW5kKCkgPT09IExEX011dGFibGUgPyAnbGV0JyA6ICdjb25zdCcsXG5cdFx0XHRtYWtlRGVzdHJ1Y3R1cmVEZWNsYXJhdG9ycyhcblx0XHRcdFx0dGhpcy5hc3NpZ25lZXMsXG5cdFx0XHRcdHRoaXMua2luZCgpID09PSBMRF9MYXp5LFxuXHRcdFx0XHR0MCh0aGlzLnZhbHVlKSxcblx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRcdHZlcmlmeVJlc3VsdHMuaXNFeHBvcnRBc3NpZ24odGhpcykpKVxuXHR9LFxuXG5cdEJhZ0VudHJ5KCkgeyByZXR1cm4gbXNBZGQoSWRCdWlsdCwgdDAodGhpcy52YWx1ZSkpIH0sXG5cblx0QmFnRW50cnlNYW55KCkgeyByZXR1cm4gbXNBZGRNYW55KElkQnVpbHQsIHQwKHRoaXMudmFsdWUpKSB9LFxuXG5cdEJhZ1NpbXBsZSgpIHsgcmV0dXJuIEFycmF5RXhwcmVzc2lvbih0aGlzLnBhcnRzLm1hcCh0MCkpIH0sXG5cblx0QmxvY2tEbyhsZWFkID0gbnVsbCwgb3BSZXNEZWNsYXJlID0gbnVsbCwgb3BPdXQgPSBudWxsKSB7XG5cdFx0YXNzZXJ0KG9wUmVzRGVjbGFyZSA9PT0gbnVsbClcblx0XHRyZXR1cm4gQmxvY2tTdGF0ZW1lbnQoY2F0KGxlYWQsIHRMaW5lcyh0aGlzLmxpbmVzKSwgb3BPdXQpKVxuXHR9LFxuXG5cdEJsb2NrVmFsT2hObyhsZWFkID0gbnVsbCwgb3BSZXNEZWNsYXJlID0gbnVsbCwgb3BPdXQgPSBudWxsKSB7XG5cdFx0Y29udGV4dC53YXJuSWYob3BSZXNEZWNsYXJlICE9PSBudWxsIHx8IG9wT3V0ICE9PSBudWxsLCB0aGlzLmxvYyxcblx0XHRcdCdPdXQgY29uZGl0aW9uIGlnbm9yZWQgYmVjYXVzZSBvZiBvaC1ubyEnKVxuXHRcdHJldHVybiBCbG9ja1N0YXRlbWVudChjYXQobGVhZCwgdExpbmVzKHRoaXMubGluZXMpLCB0MCh0aGlzLm9oTm8pKSlcblx0fSxcblxuXHRCbG9ja1dpdGhSZXR1cm4obGVhZCwgb3BSZXNEZWNsYXJlLCBvcE91dCkge1xuXHRcdHJldHVybiB0cmFuc3BpbGVCbG9jayh0MCh0aGlzLnJldHVybmVkKSwgdExpbmVzKHRoaXMubGluZXMpLCBsZWFkLCBvcFJlc0RlY2xhcmUsIG9wT3V0KVxuXHR9LFxuXG5cdEJsb2NrQmFnKGxlYWQsIG9wUmVzRGVjbGFyZSwgb3BPdXQpIHtcblx0XHRyZXR1cm4gdHJhbnNwaWxlQmxvY2soXG5cdFx0XHRJZEJ1aWx0LFxuXHRcdFx0Y2F0KERlY2xhcmVCdWlsdEJhZywgdExpbmVzKHRoaXMubGluZXMpKSxcblx0XHRcdGxlYWQsIG9wUmVzRGVjbGFyZSwgb3BPdXQpXG5cdH0sXG5cblx0QmxvY2tPYmoobGVhZCwgb3BSZXNEZWNsYXJlLCBvcE91dCkge1xuXHRcdGNvbnN0IGxpbmVzID0gY2F0KERlY2xhcmVCdWlsdE9iaiwgdExpbmVzKHRoaXMubGluZXMpKVxuXHRcdGNvbnN0IHJlcyA9IGlmRWxzZSh0aGlzLm9wT2JqZWQsXG5cdFx0XHRvYmplZCA9PiBpZkVsc2UodGhpcy5vcE5hbWUsXG5cdFx0XHRcdG5hbWUgPT4gbXNTZXQodDAob2JqZWQpLCBJZEJ1aWx0LCBMaXRlcmFsKG5hbWUpKSxcblx0XHRcdFx0KCkgPT4gbXNTZXQodDAob2JqZWQpLCBJZEJ1aWx0KSksXG5cdFx0XHQoKSA9PiBpZkVsc2UodGhpcy5vcE5hbWUsXG5cdFx0XHRcdF8gPT4gbXNTZXROYW1lKElkQnVpbHQsIExpdGVyYWwoXykpLFxuXHRcdFx0XHQoKSA9PiBJZEJ1aWx0KSlcblx0XHRyZXR1cm4gdHJhbnNwaWxlQmxvY2socmVzLCBsaW5lcywgbGVhZCwgb3BSZXNEZWNsYXJlLCBvcE91dClcblx0fSxcblxuXHRCbG9ja01hcChsZWFkLCBvcFJlc0RlY2xhcmUsIG9wT3V0KSB7XG5cdFx0cmV0dXJuIHRyYW5zcGlsZUJsb2NrKFxuXHRcdFx0SWRCdWlsdCxcblx0XHRcdGNhdChEZWNsYXJlQnVpbHRNYXAsIHRMaW5lcyh0aGlzLmxpbmVzKSksXG5cdFx0XHRsZWFkLCBvcFJlc0RlY2xhcmUsIG9wT3V0KVxuXHR9LFxuXG5cdEJsb2NrV3JhcCgpIHsgcmV0dXJuIGJsb2NrV3JhcCh0MCh0aGlzLmJsb2NrKSkgfSxcblxuXHRCcmVha0RvKCkgeyByZXR1cm4gQnJlYWtTdGF0ZW1lbnQoKSB9LFxuXG5cdEJyZWFrVmFsKCkgeyByZXR1cm4gUmV0dXJuU3RhdGVtZW50KHQwKHRoaXMudmFsdWUpKSB9LFxuXG5cdENhbGwoKSB7XG5cdFx0Y29uc3QgYW55U3BsYXQgPSB0aGlzLmFyZ3Muc29tZShhcmcgPT4gYXJnIGluc3RhbmNlb2YgU3BsYXQpXG5cdFx0aWYgKGFueVNwbGF0KSB7XG5cdFx0XHRjb25zdCBhcmdzID0gdGhpcy5hcmdzLm1hcChhcmcgPT5cblx0XHRcdFx0YXJnIGluc3RhbmNlb2YgU3BsYXQgP1xuXHRcdFx0XHRcdG1zQXJyKHQwKGFyZy5zcGxhdHRlZCkpIDpcblx0XHRcdFx0XHR0MChhcmcpKVxuXHRcdFx0cmV0dXJuIENhbGxFeHByZXNzaW9uKElkRnVuY3Rpb25BcHBseUNhbGwsIFtcblx0XHRcdFx0dDAodGhpcy5jYWxsZWQpLFxuXHRcdFx0XHRMaXROdWxsLFxuXHRcdFx0XHRDYWxsRXhwcmVzc2lvbihtZW1iZXIoTGl0RW1wdHlBcnJheSwgJ2NvbmNhdCcpLCBhcmdzKV0pXG5cdFx0fVxuXHRcdGVsc2UgcmV0dXJuIENhbGxFeHByZXNzaW9uKHQwKHRoaXMuY2FsbGVkKSwgdGhpcy5hcmdzLm1hcCh0MCkpXG5cdH0sXG5cblx0Q2FzZURvKCkge1xuXHRcdGNvbnN0IGJvZHkgPSBjYXNlQm9keSh0aGlzLnBhcnRzLCB0aGlzLm9wRWxzZSlcblx0XHRyZXR1cm4gaWZFbHNlKHRoaXMub3BDYXNlZCwgXyA9PiBCbG9ja1N0YXRlbWVudChbIHQwKF8pLCBib2R5IF0pLCAoKSA9PiBib2R5KVxuXHR9LFxuXG5cdENhc2VWYWwoKSB7XG5cdFx0Y29uc3QgYm9keSA9IGNhc2VCb2R5KHRoaXMucGFydHMsIHRoaXMub3BFbHNlKVxuXHRcdGNvbnN0IGJsb2NrID0gaWZFbHNlKHRoaXMub3BDYXNlZCwgXyA9PiBbIHQwKF8pLCBib2R5IF0sICgpID0+IFsgYm9keSBdKVxuXHRcdHJldHVybiBibG9ja1dyYXAoQmxvY2tTdGF0ZW1lbnQoYmxvY2spKVxuXHR9LFxuXG5cdENhc2VEb1BhcnQ6IGNhc2VQYXJ0LFxuXHRDYXNlVmFsUGFydDogY2FzZVBhcnQsXG5cblx0Q29uZGl0aW9uYWxEbygpIHtcblx0XHRyZXR1cm4gSWZTdGF0ZW1lbnQoXG5cdFx0XHR0aGlzLmlzVW5sZXNzID8gVW5hcnlFeHByZXNzaW9uKCchJywgbWF5YmVCb29sV3JhcCh0MCh0aGlzLnRlc3QpKSkgOiB0MCh0aGlzLnRlc3QpLFxuXHRcdFx0dDAodGhpcy5yZXN1bHQpKVxuXHR9LFxuXG5cdENvbmRpdGlvbmFsVmFsKCkge1xuXHRcdGNvbnN0IHRlc3QgPSBtYXliZUJvb2xXcmFwKHQwKHRoaXMudGVzdCkpXG5cdFx0Y29uc3QgcmVzdWx0ID0gbXNTb21lKGJsb2NrV3JhcCh0MCh0aGlzLnJlc3VsdCkpKVxuXHRcdHJldHVybiB0aGlzLmlzVW5sZXNzID9cblx0XHRcdENvbmRpdGlvbmFsRXhwcmVzc2lvbih0ZXN0LCBNc05vbmUsIHJlc3VsdCkgOlxuXHRcdFx0Q29uZGl0aW9uYWxFeHByZXNzaW9uKHRlc3QsIHJlc3VsdCwgTXNOb25lKVxuXHR9LFxuXG5cdENhdGNoKCkge1xuXHRcdHJldHVybiBDYXRjaENsYXVzZSh0MCh0aGlzLmNhdWdodCksIHQwKHRoaXMuYmxvY2spKVxuXHR9LFxuXG5cdENvbnRpbnVlKCkgeyByZXR1cm4gQ29udGludWVTdGF0ZW1lbnQoKSB9LFxuXG5cdC8vIFRPRE86IGluY2x1ZGVJbm91dENoZWNrcyBpcyBtaXNuYW1lZFxuXHREZWJ1ZygpIHsgcmV0dXJuIGNvbnRleHQub3B0cy5pbmNsdWRlSW5vdXRDaGVja3MoKSA/IHRMaW5lcyh0aGlzLmxpbmVzKSA6IFsgXSB9LFxuXG5cdEV4Y2VwdERvKCkgeyByZXR1cm4gdHJhbnNwaWxlRXhjZXB0KHRoaXMpIH0sXG5cdEV4Y2VwdFZhbCgpIHsgcmV0dXJuIGJsb2NrV3JhcChCbG9ja1N0YXRlbWVudChbIHRyYW5zcGlsZUV4Y2VwdCh0aGlzKSBdKSkgfSxcblxuXHRGb3JEbygpIHsgcmV0dXJuIGZvckxvb3AodGhpcy5vcEl0ZXJhdGVlLCB0aGlzLmJsb2NrKSB9LFxuXG5cdEZvckJhZygpIHtcblx0XHRyZXR1cm4gYmxvY2tXcmFwKEJsb2NrU3RhdGVtZW50KFtcblx0XHRcdERlY2xhcmVCdWlsdEJhZyxcblx0XHRcdGZvckxvb3AodGhpcy5vcEl0ZXJhdGVlLCB0aGlzLmJsb2NrKSxcblx0XHRcdFJldHVybkJ1aWx0XG5cdFx0XSkpXG5cdH0sXG5cblx0Rm9yVmFsKCkge1xuXHRcdHJldHVybiBibG9ja1dyYXAoQmxvY2tTdGF0ZW1lbnQoWyBmb3JMb29wKHRoaXMub3BJdGVyYXRlZSwgdGhpcy5ibG9jaykgXSkpXG5cdH0sXG5cblx0RnVuKCkge1xuXHRcdGNvbnN0IG9sZEluR2VuZXJhdG9yID0gaXNJbkdlbmVyYXRvclxuXHRcdGlzSW5HZW5lcmF0b3IgPSB0aGlzLmlzR2VuZXJhdG9yXG5cblx0XHQvLyBUT0RPOkVTNiB1c2UgYC4uLmBmXG5cdFx0Y29uc3QgbkFyZ3MgPSBMaXRlcmFsKHRoaXMuYXJncy5sZW5ndGgpXG5cdFx0Y29uc3Qgb3BEZWNsYXJlUmVzdCA9IG9wTWFwKHRoaXMub3BSZXN0QXJnLCByZXN0ID0+XG5cdFx0XHRkZWNsYXJlKHJlc3QsIENhbGxFeHByZXNzaW9uKEFycmF5U2xpY2VDYWxsLCBbSWRBcmd1bWVudHMsIG5BcmdzXSkpKVxuXHRcdGNvbnN0IGFyZ0NoZWNrcyA9IG9wSWYoY29udGV4dC5vcHRzLmluY2x1ZGVUeXBlQ2hlY2tzKCksICgpID0+XG5cdFx0XHRmbGF0T3BNYXAodGhpcy5hcmdzLCBvcFR5cGVDaGVja0ZvckxvY2FsRGVjbGFyZSkpXG5cblx0XHRjb25zdCBfaW4gPSBvcE1hcCh0aGlzLm9wSW4sIHQwKVxuXHRcdGNvbnN0IGxlYWQgPSBjYXQob3BEZWNsYXJlUmVzdCwgYXJnQ2hlY2tzLCBfaW4pXG5cblx0XHRjb25zdCBfb3V0ID0gb3BNYXAodGhpcy5vcE91dCwgdDApXG5cdFx0Y29uc3QgYm9keSA9IHQzKHRoaXMuYmxvY2ssIGxlYWQsIHRoaXMub3BSZXNEZWNsYXJlLCBfb3V0KVxuXHRcdGNvbnN0IGFyZ3MgPSB0aGlzLmFyZ3MubWFwKHQwKVxuXHRcdGlzSW5HZW5lcmF0b3IgPSBvbGRJbkdlbmVyYXRvclxuXHRcdGNvbnN0IGlkID0gb3BNYXAodGhpcy5uYW1lLCBpZENhY2hlZClcblx0XHRyZXR1cm4gRnVuY3Rpb25FeHByZXNzaW9uKGlkLCBhcmdzLCBib2R5LCB0aGlzLmlzR2VuZXJhdG9yKVxuXHR9LFxuXG5cdExhenkoKSB7IHJldHVybiBsYXp5V3JhcCh0MCh0aGlzLnZhbHVlKSkgfSxcblxuXHROdW1iZXJMaXRlcmFsKCkge1xuXHRcdC8vIE5lZ2F0aXZlIG51bWJlcnMgYXJlIG5vdCBwYXJ0IG9mIEVTIHNwZWMuXG5cdFx0Ly8gaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzUuMS8jc2VjLTcuOC4zXG5cdFx0Y29uc3QgbGl0ID0gTGl0ZXJhbChNYXRoLmFicyh0aGlzLnZhbHVlKSlcblx0XHRyZXR1cm4gaXNQb3NpdGl2ZSh0aGlzLnZhbHVlKSA/IGxpdCA6IFVuYXJ5RXhwcmVzc2lvbignLScsIGxpdClcblx0fSxcblxuXHRHbG9iYWxBY2Nlc3MoKSB7IHJldHVybiBJZGVudGlmaWVyKHRoaXMubmFtZSkgfSxcblxuXHRMb2NhbEFjY2VzcygpIHsgcmV0dXJuIGFjY2Vzc0xvY2FsRGVjbGFyZSh2ZXJpZnlSZXN1bHRzLmxvY2FsRGVjbGFyZUZvckFjY2Vzcyh0aGlzKSkgfSxcblxuXHRMb2NhbERlY2xhcmUoKSB7IHJldHVybiBpZEZvckRlY2xhcmVDYWNoZWQodGhpcykgfSxcblxuXHRMb2NhbE11dGF0ZSgpIHtcblx0XHRyZXR1cm4gYXNzaWdubWVudEV4cHJlc3Npb25QbGFpbihpZENhY2hlZCh0aGlzLm5hbWUpLCB0MCh0aGlzLnZhbHVlKSlcblx0fSxcblxuXHRMb2dpYygpIHtcblx0XHRhc3NlcnQodGhpcy5raW5kID09PSBMX0FuZCB8fCB0aGlzLmtpbmQgPT09IExfT3IpXG5cdFx0Y29uc3Qgb3AgPSB0aGlzLmtpbmQgPT09IExfQW5kID8gJyYmJyA6ICd8fCdcblx0XHRyZXR1cm4gdGFpbCh0aGlzLmFyZ3MpLnJlZHVjZSgoYSwgYikgPT4gTG9naWNhbEV4cHJlc3Npb24ob3AsIGEsIHQwKGIpKSwgdDAodGhpcy5hcmdzWzBdKSlcblx0fSxcblxuXHRNYXBFbnRyeSgpIHsgcmV0dXJuIG1zQXNzb2MoSWRCdWlsdCwgdDAodGhpcy5rZXkpLCB0MCh0aGlzLnZhbCkpIH0sXG5cblx0TWVtYmVyKCkgeyByZXR1cm4gbWVtYmVyKHQwKHRoaXMub2JqZWN0KSwgdGhpcy5uYW1lKSB9LFxuXG5cdE1vZHVsZSgpIHtcblx0XHRjb25zdCBib2R5ID0gY2F0KFxuXHRcdFx0dExpbmVzKHRoaXMubGluZXMpLFxuXHRcdFx0b3BNYXAodGhpcy5vcERlZmF1bHRFeHBvcnQsIF8gPT4gYXNzaWdubWVudEV4cHJlc3Npb25QbGFpbihFeHBvcnRzRGVmYXVsdCwgdDAoXykpKSlcblx0XHRyZXR1cm4gUHJvZ3JhbShjYXQoXG5cdFx0XHRvcElmKGNvbnRleHQub3B0cy5pbmNsdWRlVXNlU3RyaWN0KCksICgpID0+IFVzZVN0cmljdCksXG5cdFx0XHRvcElmKGNvbnRleHQub3B0cy5pbmNsdWRlQW1kZWZpbmUoKSwgKCkgPT4gQW1kZWZpbmVIZWFkZXIpLFxuXHRcdFx0dG9TdGF0ZW1lbnQoYW1kV3JhcE1vZHVsZSh0aGlzLmRvVXNlcywgdGhpcy51c2VzLmNvbmNhdCh0aGlzLmRlYnVnVXNlcyksIGJvZHkpKSkpXG5cdH0sXG5cblx0TmV3KCkge1xuXHRcdGNvbnN0IGFueVNwbGF0ID0gdGhpcy5hcmdzLnNvbWUoXyA9PiBfIGluc3RhbmNlb2YgU3BsYXQpXG5cdFx0Y29udGV4dC5jaGVjayghYW55U3BsYXQsIHRoaXMubG9jLCAnVE9ETzogU3BsYXQgcGFyYW1zIGZvciBuZXcnKVxuXHRcdHJldHVybiBOZXdFeHByZXNzaW9uKHQwKHRoaXMudHlwZSksIHRoaXMuYXJncy5tYXAodDApKVxuXHR9LFxuXG5cdE5vdCgpIHsgcmV0dXJuIFVuYXJ5RXhwcmVzc2lvbignIScsIHQwKHRoaXMuYXJnKSkgfSxcblxuXHRPYmpFbnRyeSgpIHtcblx0XHRyZXR1cm4gKHRoaXMuYXNzaWduIGluc3RhbmNlb2YgQXNzaWduU2luZ2xlICYmICF0aGlzLmFzc2lnbi5hc3NpZ25lZS5pc0xhenkoKSkgP1xuXHRcdFx0dDEodGhpcy5hc3NpZ24sIHZhbCA9PlxuXHRcdFx0XHRhc3NpZ25tZW50RXhwcmVzc2lvblBsYWluKG1lbWJlcihJZEJ1aWx0LCB0aGlzLmFzc2lnbi5hc3NpZ25lZS5uYW1lKSwgdmFsKSkgOlxuXHRcdFx0Y2F0KFxuXHRcdFx0XHR0MCh0aGlzLmFzc2lnbiksXG5cdFx0XHRcdHRoaXMuYXNzaWduLmFsbEFzc2lnbmVlcygpLm1hcChfID0+XG5cdFx0XHRcdFx0bXNTZXRMYXp5KElkQnVpbHQsIExpdGVyYWwoXy5uYW1lKSwgaWRGb3JEZWNsYXJlQ2FjaGVkKF8pKSkpXG5cdH0sXG5cblx0T2JqU2ltcGxlKCkge1xuXHRcdHJldHVybiBPYmplY3RFeHByZXNzaW9uKHRoaXMucGFpcnMubWFwKHBhaXIgPT5cblx0XHRcdHByb3BlcnR5KCdpbml0JywgcHJvcGVydHlJZE9yTGl0ZXJhbENhY2hlZChwYWlyLmtleSksIHQwKHBhaXIudmFsdWUpKSkpXG5cdH0sXG5cblx0T2hObygpIHtcblx0XHRyZXR1cm4gaWZFbHNlKHRoaXMub3BUaHJvd24sXG5cdFx0XHRfID0+IFRocm93U3RhdGVtZW50KG1zRXJyb3IodDAoXykpKSxcblx0XHRcdCgpID0+IFRocm93U3RhdGVtZW50KG1zRXJyb3IoTGl0U3RyT2hObykpKVxuXHR9LFxuXG5cdFF1b3RlKCkge1xuXHRcdGlmICh0aGlzLnBhcnRzLmxlbmd0aCA9PT0gMClcblx0XHRcdHJldHVybiBMaXRFbXB0eVN0cmluZ1xuXHRcdGVsc2Uge1xuXHRcdFx0Y29uc3QgcXVhc2lzID0gWyBdLCBleHByZXNzaW9ucyA9IFsgXVxuXG5cdFx0XHQvLyBUZW1wbGF0ZUxpdGVyYWwgbXVzdCBzdGFydCB3aXRoIGEgVGVtcGxhdGVFbGVtZW50XG5cdFx0XHRpZiAodHlwZW9mIHRoaXMucGFydHNbMF0gIT09ICdzdHJpbmcnKVxuXHRcdFx0XHRxdWFzaXMucHVzaChFbXB0eVRlbXBsYXRlRWxlbWVudClcblxuXHRcdFx0Zm9yIChsZXQgcGFydCBvZiB0aGlzLnBhcnRzKVxuXHRcdFx0XHRpZiAodHlwZW9mIHBhcnQgPT09ICdzdHJpbmcnKVxuXHRcdFx0XHRcdHF1YXNpcy5wdXNoKHRlbXBsYXRlRWxlbWVudEZvclN0cmluZyhwYXJ0KSlcblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0Ly8gXCJ7MX17MX1cIiBuZWVkcyBhbiBlbXB0eSBxdWFzaSBpbiB0aGUgbWlkZGxlIChhbmQgb24gdGhlIGVuZHMpXG5cdFx0XHRcdFx0aWYgKHF1YXNpcy5sZW5ndGggPT09IGV4cHJlc3Npb25zLmxlbmd0aClcblx0XHRcdFx0XHRcdHF1YXNpcy5wdXNoKEVtcHR5VGVtcGxhdGVFbGVtZW50KVxuXHRcdFx0XHRcdGV4cHJlc3Npb25zLnB1c2gobXNTaG93KHQwKHBhcnQpKSlcblx0XHRcdFx0fVxuXG5cdFx0XHQvLyBUZW1wbGF0ZUxpdGVyYWwgbXVzdCBlbmQgd2l0aCBhIFRlbXBsYXRlRWxlbWVudCwgc28gb25lIG1vcmUgcXVhc2kgdGhhbiBleHByZXNzaW9uLlxuXHRcdFx0aWYgKHF1YXNpcy5sZW5ndGggPT09IGV4cHJlc3Npb25zLmxlbmd0aClcblx0XHRcdFx0cXVhc2lzLnB1c2goRW1wdHlUZW1wbGF0ZUVsZW1lbnQpXG5cblx0XHRcdHJldHVybiBUZW1wbGF0ZUxpdGVyYWwocXVhc2lzLCBleHByZXNzaW9ucylcblx0XHR9XG5cdH0sXG5cblx0U3BlY2lhbERvKCkge1xuXHRcdHN3aXRjaCAodGhpcy5raW5kKSB7XG5cdFx0XHRjYXNlIFNEX0RlYnVnZ2VyOiByZXR1cm4gRGVidWdnZXJTdGF0ZW1lbnQoKVxuXHRcdFx0ZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKHRoaXMua2luZClcblx0XHR9XG5cdH0sXG5cblx0U3BlY2lhbFZhbCgpIHtcblx0XHQvLyBNYWtlIG5ldyBvYmplY3RzIGJlY2F1c2Ugd2Ugd2lsbCBhc3NpZ24gYGxvY2AgdG8gdGhlbS5cblx0XHRzd2l0Y2ggKHRoaXMua2luZCkge1xuXHRcdFx0Y2FzZSBTVl9Db250YWluczogcmV0dXJuIG1lbWJlcihJZE1zLCAnY29udGFpbnMnKVxuXHRcdFx0Y2FzZSBTVl9GYWxzZTogcmV0dXJuIExpdGVyYWwoZmFsc2UpXG5cdFx0XHRjYXNlIFNWX051bGw6IHJldHVybiBMaXRlcmFsKG51bGwpXG5cdFx0XHRjYXNlIFNWX1N1YjogcmV0dXJuIG1lbWJlcihJZE1zLCAnc3ViJylcblx0XHRcdGNhc2UgU1ZfVGhpczogcmV0dXJuIFx0VGhpc0V4cHJlc3Npb24oKVxuXHRcdFx0Y2FzZSBTVl9UaGlzTW9kdWxlRGlyZWN0b3J5OiByZXR1cm4gSWRlbnRpZmllcignX19kaXJuYW1lJylcblx0XHRcdGNhc2UgU1ZfVHJ1ZTogcmV0dXJuIExpdGVyYWwodHJ1ZSlcblx0XHRcdGNhc2UgU1ZfVW5kZWZpbmVkOiByZXR1cm4gVW5hcnlFeHByZXNzaW9uKCd2b2lkJywgTGl0WmVybylcblx0XHRcdGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcih0aGlzLmtpbmQpXG5cdFx0fVxuXHR9LFxuXG5cdFlpZWxkKCkgeyByZXR1cm4geWllbGRFeHByZXNzaW9uTm9EZWxlZ2F0ZSh0MCh0aGlzLnlpZWxkZWQpKSB9LFxuXG5cdFlpZWxkVG8oKSB7IHJldHVybiB5aWVsZEV4cHJlc3Npb25EZWxlZ2F0ZSh0MCh0aGlzLnlpZWxkZWRUbykpIH1cbn0pXG5cbmZ1bmN0aW9uIGNhc2VQYXJ0KGFsdGVybmF0ZSkge1xuXHRpZiAodGhpcy50ZXN0IGluc3RhbmNlb2YgUGF0dGVybikge1xuXHRcdGNvbnN0IHsgdHlwZSwgcGF0dGVybmVkLCBsb2NhbHMgfSA9IHRoaXMudGVzdFxuXHRcdGNvbnN0IGRlY2wgPSBWYXJpYWJsZURlY2xhcmF0aW9uKCdjb25zdCcsIFtcblx0XHRcdFZhcmlhYmxlRGVjbGFyYXRvcihJZEV4dHJhY3QsIG1zRXh0cmFjdCh0MCh0eXBlKSwgdDAocGF0dGVybmVkKSkpIF0pXG5cdFx0Y29uc3QgdGVzdCA9IEJpbmFyeUV4cHJlc3Npb24oJyE9PScsIElkRXh0cmFjdCwgTGl0TnVsbClcblx0XHRjb25zdCBleHRyYWN0ID0gVmFyaWFibGVEZWNsYXJhdGlvbignY29uc3QnLCBsb2NhbHMubWFwKChfLCBpZHgpID0+XG5cdFx0XHRWYXJpYWJsZURlY2xhcmF0b3IoaWRGb3JEZWNsYXJlQ2FjaGVkKF8pLCBtZW1iZXJFeHByZXNzaW9uKElkRXh0cmFjdCwgTGl0ZXJhbChpZHgpKSkpKVxuXHRcdGNvbnN0IHJlcyA9IHQxKHRoaXMucmVzdWx0LCBleHRyYWN0KVxuXHRcdHJldHVybiBCbG9ja1N0YXRlbWVudChbIGRlY2wsIElmU3RhdGVtZW50KHRlc3QsIHJlcywgYWx0ZXJuYXRlKSBdKVxuXHR9IGVsc2Vcblx0XHQvLyBhbHRlcm5hdGUgd3JpdHRlbiB0byBieSBgY2FzZUJvZHlgLlxuXHRcdHJldHVybiBJZlN0YXRlbWVudChtYXliZUJvb2xXcmFwKHQwKHRoaXMudGVzdCkpLCB0MCh0aGlzLnJlc3VsdCksIGFsdGVybmF0ZSlcbn1cblxuLy8gRnVuY3Rpb25zIHNwZWNpZmljIHRvIGNlcnRhaW4gZXhwcmVzc2lvbnMuXG5jb25zdFxuXHQvLyBXcmFwcyBhIGJsb2NrICh3aXRoIGByZXR1cm5gIHN0YXRlbWVudHMgaW4gaXQpIGluIGFuIElJRkUuXG5cdGJsb2NrV3JhcCA9IGJsb2NrID0+IHtcblx0XHRjb25zdCBpbnZva2UgPSBjYWxsRXhwcmVzc2lvblRodW5rKGZ1bmN0aW9uRXhwcmVzc2lvblRodW5rKGJsb2NrLCBpc0luR2VuZXJhdG9yKSlcblx0XHRyZXR1cm4gaXNJbkdlbmVyYXRvciA/IHlpZWxkRXhwcmVzc2lvbkRlbGVnYXRlKGludm9rZSkgOiBpbnZva2Vcblx0fSxcblxuXHRjYXNlQm9keSA9IChwYXJ0cywgb3BFbHNlKSA9PiB7XG5cdFx0bGV0IGFjYyA9IGlmRWxzZShvcEVsc2UsIHQwLCAoKSA9PiB0aHJvd0Vycm9yRnJvbVN0cmluZygnTm8gYnJhbmNoIG9mIGBjYXNlYCBtYXRjaGVzLicpKVxuXHRcdGZvciAobGV0IGkgPSBwYXJ0cy5sZW5ndGggLSAxOyBpID49IDA7IGkgPSBpIC0gMSlcblx0XHRcdGFjYyA9IHQxKHBhcnRzW2ldLCBhY2MpXG5cdFx0cmV0dXJuIGFjY1xuXHR9LFxuXG5cdGZvckxvb3AgPSAob3BJdGVyYXRlZSwgYmxvY2spID0+XG5cdFx0aWZFbHNlKG9wSXRlcmF0ZWUsXG5cdFx0XHQoeyBlbGVtZW50LCBiYWcgfSkgPT4ge1xuXHRcdFx0XHRjb25zdCBkZWNsYXJlID0gVmFyaWFibGVEZWNsYXJhdGlvbignbGV0JywgWyBWYXJpYWJsZURlY2xhcmF0b3IodDAoZWxlbWVudCkpIF0pXG5cdFx0XHRcdHJldHVybiBGb3JPZlN0YXRlbWVudChkZWNsYXJlLCB0MChiYWcpLCB0MChibG9jaykpXG5cdFx0XHR9LFxuXHRcdFx0KCkgPT4gZm9yU3RhdGVtZW50SW5maW5pdGUodDAoYmxvY2spKSksXG5cblx0dHJhbnNwaWxlQmxvY2sgPSAocmV0dXJuZWQsIGxpbmVzLCBsZWFkID0gbnVsbCwgb3BSZXNEZWNsYXJlID0gbnVsbCwgb3BPdXQgPSBudWxsKSA9PiB7XG5cdFx0Y29uc3QgZmluID0gaWZFbHNlKG9wUmVzRGVjbGFyZSxcblx0XHRcdHJkID0+IHtcblx0XHRcdFx0Y29uc3QgcmV0ID0gbWF5YmVXcmFwSW5DaGVja0NvbnRhaW5zKHJldHVybmVkLCByZC5vcFR5cGUsIHJkLm5hbWUpXG5cdFx0XHRcdHJldHVybiBpZkVsc2Uob3BPdXQsXG5cdFx0XHRcdFx0XyA9PiBjYXQoZGVjbGFyZShyZCwgcmV0KSwgXywgUmV0dXJuUmVzKSxcblx0XHRcdFx0XHQoKSA9PiBSZXR1cm5TdGF0ZW1lbnQocmV0KSlcblx0XHRcdH0sXG5cdFx0XHQoKSA9PiBjYXQob3BPdXQsIFJldHVyblN0YXRlbWVudChyZXR1cm5lZCkpKVxuXHRcdHJldHVybiBCbG9ja1N0YXRlbWVudChjYXQobGVhZCwgbGluZXMsIGZpbikpXG5cdH0sXG5cblx0dHJhbnNwaWxlRXhjZXB0ID0gZXhjZXB0ID0+XG5cdFx0VHJ5U3RhdGVtZW50KFxuXHRcdFx0dDAoZXhjZXB0Ll90cnkpLFxuXHRcdFx0b3BNYXAoZXhjZXB0Ll9jYXRjaCwgdDApLFxuXHRcdFx0b3BNYXAoZXhjZXB0Ll9maW5hbGx5LCB0MCkpXG5cbi8vIE1vZHVsZSBoZWxwZXJzXG5jb25zdFxuXHRhbWRXcmFwTW9kdWxlID0gKGRvVXNlcywgb3RoZXJVc2VzLCBib2R5KSA9PiB7XG5cdFx0Y29uc3QgYWxsVXNlcyA9IGRvVXNlcy5jb25jYXQob3RoZXJVc2VzKVxuXHRcdGNvbnN0IHVzZVBhdGhzID0gQXJyYXlFeHByZXNzaW9uKGNhdChcblx0XHRcdExpdFN0ckV4cG9ydHMsXG5cdFx0XHRhbGxVc2VzLm1hcChfID0+IExpdGVyYWwobWFuZ2xlUGF0aChfLnBhdGgpKSkpKVxuXHRcdGNvbnN0IHVzZUlkZW50aWZpZXJzID0gYWxsVXNlcy5tYXAoKF8sIGkpID0+IGlkQ2FjaGVkKGAke3BhdGhCYXNlTmFtZShfLnBhdGgpfV8ke2l9YCkpXG5cdFx0Y29uc3QgdXNlQXJncyA9IGNhdChJZEV4cG9ydHMsIHVzZUlkZW50aWZpZXJzKVxuXHRcdGNvbnN0IHVzZURvcyA9IGRvVXNlcy5tYXAoKHVzZSwgaSkgPT5cblx0XHRcdGxvYyhFeHByZXNzaW9uU3RhdGVtZW50KG1zR2V0TW9kdWxlKHVzZUlkZW50aWZpZXJzW2ldKSksIHVzZS5sb2MpKVxuXHRcdGNvbnN0IG9wVXNlRGVjbGFyZSA9IG9wSWYoIWlzRW1wdHkob3RoZXJVc2VzKSxcblx0XHRcdCgpID0+IFZhcmlhYmxlRGVjbGFyYXRpb24oJ2NvbnN0JywgZmxhdE1hcChvdGhlclVzZXMsICh1c2UsIGkpID0+XG5cdFx0XHRcdHVzZURlY2xhcmF0b3JzKHVzZSwgdXNlSWRlbnRpZmllcnNbaSArIGRvVXNlcy5sZW5ndGhdKSkpKVxuXHRcdGNvbnN0IGZ1bGxCb2R5ID0gQmxvY2tTdGF0ZW1lbnQoY2F0KHVzZURvcywgb3BVc2VEZWNsYXJlLCBib2R5LCBSZXR1cm5FeHBvcnRzKSlcblx0XHRjb25zdCBsYXp5Qm9keSA9XG5cdFx0XHRjb250ZXh0Lm9wdHMubGF6eU1vZHVsZSgpID9cblx0XHRcdFx0QmxvY2tTdGF0ZW1lbnQoWyBFeHByZXNzaW9uU3RhdGVtZW50KFxuXHRcdFx0XHRcdGFzc2lnbm1lbnRFeHByZXNzaW9uUGxhaW4oRXhwb3J0c0dldCxcblx0XHRcdFx0XHRcdG1zTGF6eShmdW5jdGlvbkV4cHJlc3Npb25UaHVuayhmdWxsQm9keSkpKSkgXSkgOlxuXHRcdFx0XHRmdWxsQm9keVxuXHRcdHJldHVybiBDYWxsRXhwcmVzc2lvbihJZERlZmluZSwgWyB1c2VQYXRocywgZnVuY3Rpb25FeHByZXNzaW9uUGxhaW4odXNlQXJncywgbGF6eUJvZHkpIF0pXG5cdH0sXG5cblx0cGF0aEJhc2VOYW1lID0gcGF0aCA9PlxuXHRcdHBhdGguc3Vic3RyKHBhdGgubGFzdEluZGV4T2YoJy8nKSArIDEpLFxuXG5cdHVzZURlY2xhcmF0b3JzID0gKHVzZSwgbW9kdWxlSWRlbnRpZmllcikgPT4ge1xuXHRcdC8vIFRPRE86IENvdWxkIGJlIG5lYXRlciBhYm91dCB0aGlzXG5cdFx0Y29uc3QgaXNMYXp5ID0gKGlzRW1wdHkodXNlLnVzZWQpID8gdXNlLm9wVXNlRGVmYXVsdCA6IHVzZS51c2VkWzBdKS5pc0xhenkoKVxuXHRcdGNvbnN0IHZhbHVlID0gKGlzTGF6eSA/IG1zTGF6eUdldE1vZHVsZSA6IG1zR2V0TW9kdWxlKShtb2R1bGVJZGVudGlmaWVyKVxuXG5cdFx0Y29uc3QgdXNlZERlZmF1bHQgPSBvcE1hcCh1c2Uub3BVc2VEZWZhdWx0LCBkZWYgPT4ge1xuXHRcdFx0Y29uc3QgZGVmZXhwID0gbXNHZXREZWZhdWx0RXhwb3J0KG1vZHVsZUlkZW50aWZpZXIpXG5cdFx0XHRjb25zdCB2YWwgPSBpc0xhenkgPyBsYXp5V3JhcChkZWZleHApIDogZGVmZXhwXG5cdFx0XHRyZXR1cm4gbG9jKFZhcmlhYmxlRGVjbGFyYXRvcihpZEZvckRlY2xhcmVDYWNoZWQoZGVmKSwgdmFsKSwgZGVmLmxvYylcblx0XHR9KVxuXG5cdFx0Y29uc3QgdXNlZERlc3RydWN0ID0gaXNFbXB0eSh1c2UudXNlZCkgPyBudWxsIDpcblx0XHRcdG1ha2VEZXN0cnVjdHVyZURlY2xhcmF0b3JzKHVzZS51c2VkLCBpc0xhenksIHZhbHVlLCB0cnVlLCBmYWxzZSlcblxuXHRcdHJldHVybiBjYXQodXNlZERlZmF1bHQsIHVzZWREZXN0cnVjdClcblx0fVxuXG4vLyBHZW5lcmFsIHV0aWxzLiBOb3QgaW4gdXRpbC5qcyBiZWNhdXNlIHRoZXNlIGNsb3NlIG92ZXIgY29udGV4dC5cbmNvbnN0XG5cdG1heWJlQm9vbFdyYXAgPSBhc3QgPT5cblx0XHRjb250ZXh0Lm9wdHMuaW5jbHVkZUNhc2VDaGVja3MoKSA/IG1zQm9vbChhc3QpIDogYXN0LFxuXG5cdG1ha2VEZXN0cnVjdHVyZURlY2xhcmF0b3JzID0gKGFzc2lnbmVlcywgaXNMYXp5LCB2YWx1ZSwgaXNNb2R1bGUsIGlzRXhwb3J0KSA9PiB7XG5cdFx0Y29uc3QgZGVzdHJ1Y3R1cmVkTmFtZSA9IGBfJCR7YXNzaWduZWVzWzBdLmxvYy5zdGFydC5saW5lfWBcblx0XHRjb25zdCBpZERlc3RydWN0dXJlZCA9IElkZW50aWZpZXIoZGVzdHJ1Y3R1cmVkTmFtZSlcblx0XHRjb25zdCBkZWNsYXJhdG9ycyA9IGFzc2lnbmVlcy5tYXAoYXNzaWduZWUgPT4ge1xuXHRcdFx0Ly8gVE9ETzogRG9uJ3QgY29tcGlsZSBpdCBpZiBpdCdzIG5ldmVyIGFjY2Vzc2VkXG5cdFx0XHRjb25zdCBnZXQgPSBnZXRNZW1iZXIoaWREZXN0cnVjdHVyZWQsIGFzc2lnbmVlLm5hbWUsIGlzTGF6eSwgaXNNb2R1bGUpXG5cdFx0XHRyZXR1cm4gbWFrZURlY2xhcmF0b3IoYXNzaWduZWUsIGdldCwgaXNMYXp5LCBpc0V4cG9ydClcblx0XHR9KVxuXHRcdC8vIEdldHRpbmcgbGF6eSBtb2R1bGUgaXMgZG9uZSBieSBtcy5sYXp5R2V0TW9kdWxlLlxuXHRcdGNvbnN0IHZhbCA9IChpc0xhenkgJiYgIWlzTW9kdWxlKSA/IGxhenlXcmFwKHZhbHVlKSA6IHZhbHVlXG5cdFx0cmV0dXJuIHVuc2hpZnQoVmFyaWFibGVEZWNsYXJhdG9yKGlkRGVzdHJ1Y3R1cmVkLCB2YWwpLCBkZWNsYXJhdG9ycylcblx0fSxcblxuXHRtYWtlRGVjbGFyYXRvciA9IChhc3NpZ25lZSwgdmFsdWUsIHZhbHVlSXNBbHJlYWR5TGF6eSwgaXNFeHBvcnQpID0+IHtcblx0XHRjb25zdCB7IGxvYywgbmFtZSwgb3BUeXBlIH0gPSBhc3NpZ25lZVxuXHRcdGNvbnN0IGlzTGF6eSA9IGFzc2lnbmVlLmlzTGF6eSgpXG5cdFx0Ly8gVE9ETzogYXNzZXJ0KGFzc2lnbmVlLm9wVHlwZSA9PT0gbnVsbClcblx0XHQvLyBvciBUT0RPOiBBbGxvdyB0eXBlIGNoZWNrIG9uIGxhenkgdmFsdWU/XG5cdFx0dmFsdWUgPSBpc0xhenkgPyB2YWx1ZSA6IG1heWJlV3JhcEluQ2hlY2tDb250YWlucyh2YWx1ZSwgb3BUeXBlLCBuYW1lKVxuXHRcdGlmIChpc0V4cG9ydCkge1xuXHRcdFx0Ly8gVE9ETzpFUzZcblx0XHRcdGNvbnRleHQuY2hlY2soIWlzTGF6eSwgbG9jLCAnTGF6eSBleHBvcnQgbm90IHN1cHBvcnRlZC4nKVxuXHRcdFx0cmV0dXJuIFZhcmlhYmxlRGVjbGFyYXRvcihcblx0XHRcdFx0aWRGb3JEZWNsYXJlQ2FjaGVkKGFzc2lnbmVlKSxcblx0XHRcdFx0YXNzaWdubWVudEV4cHJlc3Npb25QbGFpbihtZW1iZXIoSWRFeHBvcnRzLCBuYW1lKSwgdmFsdWUpKVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCB2YWwgPSBpc0xhenkgJiYgIXZhbHVlSXNBbHJlYWR5TGF6eSA/IGxhenlXcmFwKHZhbHVlKSA6IHZhbHVlXG5cdFx0XHRhc3NlcnQoaXNMYXp5IHx8ICF2YWx1ZUlzQWxyZWFkeUxhenkpXG5cdFx0XHRyZXR1cm4gVmFyaWFibGVEZWNsYXJhdG9yKGlkRm9yRGVjbGFyZUNhY2hlZChhc3NpZ25lZSksIHZhbClcblx0XHR9XG5cdH0sXG5cblx0bWF5YmVXcmFwSW5DaGVja0NvbnRhaW5zID0gKGFzdCwgb3BUeXBlLCBuYW1lKSA9PlxuXHRcdChjb250ZXh0Lm9wdHMuaW5jbHVkZVR5cGVDaGVja3MoKSAmJiBvcFR5cGUgIT09IG51bGwpID9cblx0XHRcdG1zQ2hlY2tDb250YWlucyh0MChvcFR5cGUpLCBhc3QsIExpdGVyYWwobmFtZSkpIDpcblx0XHRcdGFzdCxcblxuXHRnZXRNZW1iZXIgPSAoYXN0T2JqZWN0LCBnb3ROYW1lLCBpc0xhenksIGlzTW9kdWxlKSA9PlxuXHRcdGlzTGF6eSA/XG5cdFx0bXNMYXp5R2V0KGFzdE9iamVjdCwgTGl0ZXJhbChnb3ROYW1lKSkgOlxuXHRcdGlzTW9kdWxlICYmIGNvbnRleHQub3B0cy5pbmNsdWRlVXNlQ2hlY2tzKCkgP1xuXHRcdG1zR2V0KGFzdE9iamVjdCwgTGl0ZXJhbChnb3ROYW1lKSkgOlxuXHRcdG1lbWJlcihhc3RPYmplY3QsIGdvdE5hbWUpXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==