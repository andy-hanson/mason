if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'esast/dist/ast', 'esast/dist/util', 'esast/dist/specialize', '../../MsAst', '../manglePath', '../util', './ast-constants', './ms-call', './util'], function (exports, _esastDistAst, _esastDistUtil, _esastDistSpecialize, _MsAst, _manglePath, _util, _astConstants, _msCall, _util2) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

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
		Assert: function () {
			var _this = this;

			const failCond = function () {
				const cond = (0, _msCall.msBool)(t0(_this.condition));
				return _this.negate ? cond : (0, _esastDistAst.UnaryExpression)('!', cond);
			};

			return (0, _util.ifElse)(this.opThrown, function (thrown) {
				return (0, _esastDistAst.IfStatement)(failCond(), (0, _esastDistAst.ThrowStatement)((0, _msCall.msError)(t0(thrown))));
			}, function () {
				if (_this.condition instanceof _MsAst.Call) {
					const call = _this.condition;
					const anySplat = call.args.some(function (_) {
						return _ instanceof _MsAst.Splat;
					});
					context.check(!anySplat, call.loc, 'TODO: Splat args in assert');
					const ass = _this.negate ? _msCall.msAssertNot : _msCall.msAssert;
					return ass.apply(undefined, [t0(call.called)].concat(_toConsumableArray(call.args.map(t0))));
				} else return (0, _esastDistAst.IfStatement)(failCond(), _astConstants.ThrowAssertFail);
			});
		},

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
			let lead = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
			let opResDeclare = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
			let opOut = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

			(0, _util.assert)(opResDeclare === null);
			return (0, _esastDistAst.BlockStatement)((0, _util.cat)(lead, tLines(this.lines), opOut));
		},

		BlockValThrow: function () {
			let lead = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
			let opResDeclare = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
			let opOut = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

			context.warnIf(opResDeclare !== null || opOut !== null, this.loc, 'Out condition ignored because of oh-no!');
			return (0, _esastDistAst.BlockStatement)((0, _util.cat)(lead, tLines(this.lines), t0(this._throw)));
		},

		BlockWithReturn: function (lead, opResDeclare, opOut) {
			return transpileBlock(t0(this.returned), tLines(this.lines), lead, opResDeclare, opOut);
		},

		BlockBag: function (lead, opResDeclare, opOut) {
			return transpileBlock(_astConstants.IdBuilt, (0, _util.cat)(_astConstants.DeclareBuiltBag, tLines(this.lines)), lead, opResDeclare, opOut);
		},

		BlockObj: function (lead, opResDeclare, opOut) {
			var _this2 = this;

			const lines = (0, _util.cat)(_astConstants.DeclareBuiltObj, tLines(this.lines));
			const res = (0, _util.ifElse)(this.opObjed, function (objed) {
				return (0, _util.ifElse)(_this2.opName, function (name) {
					return (0, _msCall.msSet)(t0(objed), _astConstants.IdBuilt, (0, _esastDistAst.Literal)(name));
				}, function () {
					return (0, _msCall.msSet)(t0(objed), _astConstants.IdBuilt);
				});
			}, function () {
				return (0, _util.ifElse)(_this2.opName, function (_) {
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

		Class: function () {
			const methods = (0, _util.cat)(this.statics.map(methodDefinition(false, true)), (0, _util.opMap)(this.opConstructor, methodDefinition(true, false)), this.methods.map(methodDefinition(false, false)));
			const opName = (0, _util.opMap)(this.opName, _esastDistUtil.idCached);
			return (0, _esastDistAst.ClassExpression)(opName, (0, _util.opMap)(this.superClass, t0), (0, _esastDistAst.ClassBody)(methods));
		},

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
			var _this3 = this;

			const oldInGenerator = isInGenerator;
			isInGenerator = this.isGenerator;

			// TODO:ES6 use `...`f
			const nArgs = (0, _esastDistAst.Literal)(this.args.length);
			const opDeclareRest = (0, _util.opMap)(this.opRestArg, function (rest) {
				return (0, _util2.declare)(rest, (0, _esastDistAst.CallExpression)(_astConstants.ArraySliceCall, [_astConstants.IdArguments, nArgs]));
			});
			const argChecks = (0, _util.opIf)(context.opts.includeTypeChecks(), function () {
				return (0, _util.flatOpMap)(_this3.args, _util2.opTypeCheckForLocalDeclare);
			});

			const _in = (0, _util.opMap)(this.opIn, t0);
			const lead = (0, _util.cat)(opDeclareRest, argChecks, _in);

			const _out = (0, _util.opMap)(this.opOut, t0);
			const body = t3(this.block, lead, this.opResDeclare, _out);
			const args = this.args.map(t0);
			isInGenerator = oldInGenerator;
			const id = (0, _util.opMap)(this.opName, _esastDistUtil.idCached);
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
			var _this4 = this;

			return this.assign instanceof _MsAst.AssignSingle && !this.assign.assignee.isLazy() ? t1(this.assign, function (val) {
				return (0, _esastDistSpecialize.assignmentExpressionPlain)((0, _esastDistUtil.member)(_astConstants.IdBuilt, _this4.assign.assignee.name), val);
			}) : (0, _util.cat)(t0(this.assign), this.assign.allAssignees().map(function (_) {
				return (0, _msCall.msSetLazy)(_astConstants.IdBuilt, (0, _esastDistAst.Literal)(_.name), (0, _util2.idForDeclareCached)(_));
			}));
		},

		ObjSimple: function () {
			return (0, _esastDistAst.ObjectExpression)(this.pairs.map(function (pair) {
				return (0, _esastDistSpecialize.property)('init', (0, _esastDistUtil.propertyIdOrLiteralCached)(pair.key), t0(pair.value));
			}));
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

		Throw: function () {
			return (0, _util.ifElse)(this.opThrown, function (_) {
				return (0, _esastDistAst.ThrowStatement)((0, _msCall.msError)(t0(_)));
			}, function () {
				return (0, _esastDistAst.ThrowStatement)((0, _msCall.msError)(_astConstants.LitStrThrow));
			});
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
			return _astConstants.ThrowNoCaseMatch;
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
	      methodDefinition = function (isConstructor, isStatic) {
		return function (fun) {
			(0, _util.assert)(fun.opName !== null);
			const key = (0, _esastDistUtil.propertyIdOrLiteralCached)(fun.opName);
			// This is handled by `key`.
			value.id = null;
			const value = t0(fun);
			// TODO: get/set!
			const kind = isConstructor ? 'constructor' : 'method';
			// TODO: computed class properties
			const computed = false;
			return (0, _esastDistAst.MethodDefinition)(key, value, kind, isStatic, computed);
		};
	},
	      transpileBlock = function (returned, lines) {
		let lead = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
		let opResDeclare = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
		let opOut = arguments.length <= 4 || arguments[4] === undefined ? null : arguments[4];

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS90cmFuc3BpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQTRCQSxLQUFJLE9BQU8sRUFBRSxhQUFhLEVBQUUsYUFBYSxDQUFBOzttQkFFMUIsVUFBQyxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFLO0FBQzlELFNBQU8sR0FBRyxRQUFRLENBQUE7QUFDbEIsZUFBYSxHQUFHLGNBQWMsQ0FBQTtBQUM5QixlQUFhLEdBQUcsS0FBSyxDQUFBO0FBQ3JCLFFBQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBOztBQUVoQyxTQUFPLEdBQUcsYUFBYSxHQUFHLFNBQVMsQ0FBQTtBQUNuQyxTQUFPLEdBQUcsQ0FBQTtFQUNWOztBQUVNLE9BQ04sRUFBRSxHQUFHLFVBQUEsSUFBSTtTQUFJLG1CQW5DSyxHQUFHLEVBbUNKLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUM7RUFBQSxDQUFBO1NBQW5ELEVBQUUsR0FBRixFQUFFO0FBQ0gsT0FDQyxFQUFFLEdBQUcsVUFBQyxJQUFJLEVBQUUsR0FBRztTQUFLLG1CQXJDRixHQUFHLEVBcUNHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDO0VBQUE7T0FDN0QsRUFBRSxHQUFHLFVBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSTtTQUFLLG1CQXRDZCxHQUFHLEVBc0NlLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUM7RUFBQTtPQUNyRixNQUFNLEdBQUcsVUFBQSxLQUFLLEVBQUk7QUFDakIsUUFBTSxHQUFHLEdBQUcsRUFBRyxDQUFBO0FBQ2YsT0FBSyxNQUFNLElBQUksSUFBSSxLQUFLLEVBQUU7QUFD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QUssRUE2Zm5DLFNBQVMsRUFBRSxrQkFqaEJMLE9BQU8sRUFpaEJNLE9BQU8sQ0FBQyxDQUFDLEdBQ2xDLG1CQS9nQnNCLE1BQU0sRUErZ0JyQixTQUFTLEVBQUUsT0FBTyxDQUFDO0VBQUEsQ0FBQSIsImZpbGUiOiJtZXRhL2NvbXBpbGUvcHJpdmF0ZS90cmFuc3BpbGUvdHJhbnNwaWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXJyYXlFeHByZXNzaW9uLCBCaW5hcnlFeHByZXNzaW9uLCBCbG9ja1N0YXRlbWVudCwgQnJlYWtTdGF0ZW1lbnQsIENhbGxFeHByZXNzaW9uLFxuXHRDYXRjaENsYXVzZSwgQ2xhc3NCb2R5LCBDbGFzc0V4cHJlc3Npb24sIENvbmRpdGlvbmFsRXhwcmVzc2lvbiwgQ29udGludWVTdGF0ZW1lbnQsXG5cdERlYnVnZ2VyU3RhdGVtZW50LCBFeHByZXNzaW9uU3RhdGVtZW50LCBGb3JPZlN0YXRlbWVudCwgRnVuY3Rpb25FeHByZXNzaW9uLCBJZGVudGlmaWVyLFxuXHRJZlN0YXRlbWVudCwgTGl0ZXJhbCwgTG9naWNhbEV4cHJlc3Npb24sIE1ldGhvZERlZmluaXRpb24sIE5ld0V4cHJlc3Npb24sIE9iamVjdEV4cHJlc3Npb24sXG5cdFByb2dyYW0sIFJldHVyblN0YXRlbWVudCwgVGVtcGxhdGVMaXRlcmFsLCBUaGlzRXhwcmVzc2lvbiwgVGhyb3dTdGF0ZW1lbnQsIFRyeVN0YXRlbWVudCxcblx0VmFyaWFibGVEZWNsYXJhdGlvbiwgVW5hcnlFeHByZXNzaW9uLCBWYXJpYWJsZURlY2xhcmF0b3IgfSBmcm9tICdlc2FzdC9kaXN0L2FzdCdcbmltcG9ydCB7IGlkQ2FjaGVkLCBsb2MsIG1lbWJlciwgcHJvcGVydHlJZE9yTGl0ZXJhbENhY2hlZCwgdG9TdGF0ZW1lbnQgfSBmcm9tICdlc2FzdC9kaXN0L3V0aWwnXG5pbXBvcnQgeyBhc3NpZ25tZW50RXhwcmVzc2lvblBsYWluLCBjYWxsRXhwcmVzc2lvblRodW5rLCBmdW5jdGlvbkV4cHJlc3Npb25QbGFpbixcblx0ZnVuY3Rpb25FeHByZXNzaW9uVGh1bmssIG1lbWJlckV4cHJlc3Npb24sIHByb3BlcnR5LFxuXHR5aWVsZEV4cHJlc3Npb25EZWxlZ2F0ZSwgeWllbGRFeHByZXNzaW9uTm9EZWxlZ2F0ZSB9IGZyb20gJ2VzYXN0L2Rpc3Qvc3BlY2lhbGl6ZSdcbmltcG9ydCAqIGFzIE1zQXN0VHlwZXMgZnJvbSAnLi4vLi4vTXNBc3QnXG5pbXBvcnQgeyBBc3NpZ25TaW5nbGUsIENhbGwsIExfQW5kLCBMX09yLCBMRF9MYXp5LCBMRF9NdXRhYmxlLCBQYXR0ZXJuLCBTcGxhdCwgU0RfRGVidWdnZXIsXG5cdFNWX0NvbnRhaW5zLCBTVl9GYWxzZSwgU1ZfTnVsbCwgU1ZfU3ViLCBTVl9UaGlzLCBTVl9UaGlzTW9kdWxlRGlyZWN0b3J5LCBTVl9UcnVlLCBTVl9VbmRlZmluZWRcblx0fSBmcm9tICcuLi8uLi9Nc0FzdCdcbmltcG9ydCBtYW5nbGVQYXRoIGZyb20gJy4uL21hbmdsZVBhdGgnXG5pbXBvcnQgeyBhc3NlcnQsIGNhdCwgZmxhdE1hcCwgZmxhdE9wTWFwLCBpZkVsc2UsIGlzRW1wdHksXG5cdGltcGxlbWVudE1hbnksIGlzUG9zaXRpdmUsIG9wSWYsIG9wTWFwLCB0YWlsLCB1bnNoaWZ0IH0gZnJvbSAnLi4vdXRpbCdcbmltcG9ydCB7IEFtZGVmaW5lSGVhZGVyLCBBcnJheVNsaWNlQ2FsbCwgRGVjbGFyZUJ1aWx0QmFnLCBEZWNsYXJlQnVpbHRNYXAsIERlY2xhcmVCdWlsdE9iaixcblx0RW1wdHlUZW1wbGF0ZUVsZW1lbnQsIEV4cG9ydHNEZWZhdWx0LCBFeHBvcnRzR2V0LCBJZEFyZ3VtZW50cywgSWRCdWlsdCwgSWREZWZpbmUsIElkRXhwb3J0cyxcblx0SWRFeHRyYWN0LCBJZEZ1bmN0aW9uQXBwbHlDYWxsLCBMaXRFbXB0eUFycmF5LCBMaXRFbXB0eVN0cmluZywgTGl0TnVsbCwgTGl0U3RyRXhwb3J0cyxcblx0TGl0U3RyVGhyb3csIExpdFplcm8sIFJldHVybkJ1aWx0LCBSZXR1cm5FeHBvcnRzLCBSZXR1cm5SZXMsIFRocm93QXNzZXJ0RmFpbCwgVGhyb3dOb0Nhc2VNYXRjaCxcblx0VXNlU3RyaWN0IH0gZnJvbSAnLi9hc3QtY29uc3RhbnRzJ1xuaW1wb3J0IHsgSWRNcywgbGF6eVdyYXAsIG1zQWRkLCBtc0FkZE1hbnksIG1zQXJyLCBtc0Fzc2VydCwgbXNBc3NlcnROb3QsIG1zQXNzb2MsIG1zQm9vbCxcblx0bXNDaGVja0NvbnRhaW5zLCBtc0Vycm9yLCBtc0V4dHJhY3QsIG1zR2V0LCBtc0dldERlZmF1bHRFeHBvcnQsIG1zR2V0TW9kdWxlLCBtc0xhenksIG1zTGF6eUdldCxcblx0bXNMYXp5R2V0TW9kdWxlLCBtc1NldCwgbXNTZXROYW1lLCBtc1NldExhenksIG1zU2hvdywgbXNTb21lLCBNc05vbmUgfSBmcm9tICcuL21zLWNhbGwnXG5pbXBvcnQgeyBhY2Nlc3NMb2NhbERlY2xhcmUsIGRlY2xhcmUsIGZvclN0YXRlbWVudEluZmluaXRlLCBpZEZvckRlY2xhcmVDYWNoZWQsXG5cdG9wVHlwZUNoZWNrRm9yTG9jYWxEZWNsYXJlLCB0ZW1wbGF0ZUVsZW1lbnRGb3JTdHJpbmcgfSBmcm9tICcuL3V0aWwnXG5cbmxldCBjb250ZXh0LCB2ZXJpZnlSZXN1bHRzLCBpc0luR2VuZXJhdG9yXG5cbmV4cG9ydCBkZWZhdWx0IChfY29udGV4dCwgbW9kdWxlRXhwcmVzc2lvbiwgX3ZlcmlmeVJlc3VsdHMpID0+IHtcblx0Y29udGV4dCA9IF9jb250ZXh0XG5cdHZlcmlmeVJlc3VsdHMgPSBfdmVyaWZ5UmVzdWx0c1xuXHRpc0luR2VuZXJhdG9yID0gZmFsc2Vcblx0Y29uc3QgcmVzID0gdDAobW9kdWxlRXhwcmVzc2lvbilcblx0Ly8gUmVsZWFzZSBmb3IgZ2FyYmFnZSBjb2xsZWN0aW9uLlxuXHRjb250ZXh0ID0gdmVyaWZ5UmVzdWx0cyA9IHVuZGVmaW5lZFxuXHRyZXR1cm4gcmVzXG59XG5cbmV4cG9ydCBjb25zdFxuXHR0MCA9IGV4cHIgPT4gbG9jKGV4cHIudHJhbnNwaWxlU3VidHJlZSgpLCBleHByLmxvYylcbmNvbnN0XG5cdHQxID0gKGV4cHIsIGFyZykgPT4gbG9jKGV4cHIudHJhbnNwaWxlU3VidHJlZShhcmcpLCBleHByLmxvYyksXG5cdHQzID0gKGV4cHIsIGFyZywgYXJnMiwgYXJnMykgPT4gbG9jKGV4cHIudHJhbnNwaWxlU3VidHJlZShhcmcsIGFyZzIsIGFyZzMpLCBleHByLmxvYyksXG5cdHRMaW5lcyA9IGV4cHJzID0+IHtcblx0XHRjb25zdCBvdXQgPSBbIF1cblx0XHRmb3IgKGNvbnN0IGV4cHIgb2YgZXhwcnMpIHtcblx0XHRcdGNvbnN0IGFzdCA9IGV4cHIudHJhbnNwaWxlU3VidHJlZSgpXG5cdFx0XHRpZiAoYXN0IGluc3RhbmNlb2YgQXJyYXkpXG5cdFx0XHRcdC8vIERlYnVnIG1heSBwcm9kdWNlIG11bHRpcGxlIHN0YXRlbWVudHMuXG5cdFx0XHRcdGZvciAoY29uc3QgXyBvZiBhc3QpXG5cdFx0XHRcdFx0b3V0LnB1c2godG9TdGF0ZW1lbnQoXykpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdG91dC5wdXNoKGxvYyh0b1N0YXRlbWVudChhc3QpLCBleHByLmxvYykpXG5cdFx0fVxuXHRcdHJldHVybiBvdXRcblx0fVxuXG5pbXBsZW1lbnRNYW55KE1zQXN0VHlwZXMsICd0cmFuc3BpbGVTdWJ0cmVlJywge1xuXHRBc3NlcnQoKSB7XG5cdFx0Y29uc3QgZmFpbENvbmQgPSAoKSA9PiB7XG5cdFx0XHRjb25zdCBjb25kID0gbXNCb29sKHQwKHRoaXMuY29uZGl0aW9uKSlcblx0XHRcdHJldHVybiB0aGlzLm5lZ2F0ZSA/IGNvbmQgOiBVbmFyeUV4cHJlc3Npb24oJyEnLCBjb25kKVxuXHRcdH1cblxuXHRcdHJldHVybiBpZkVsc2UodGhpcy5vcFRocm93bixcblx0XHRcdHRocm93biA9PiBJZlN0YXRlbWVudChmYWlsQ29uZCgpLCBUaHJvd1N0YXRlbWVudChtc0Vycm9yKHQwKHRocm93bikpKSksXG5cdFx0XHQoKSA9PiB7XG5cdFx0XHRcdGlmICh0aGlzLmNvbmRpdGlvbiBpbnN0YW5jZW9mIENhbGwpIHtcblx0XHRcdFx0XHRjb25zdCBjYWxsID0gdGhpcy5jb25kaXRpb25cblx0XHRcdFx0XHRjb25zdCBhbnlTcGxhdCA9IGNhbGwuYXJncy5zb21lKF8gPT4gXyBpbnN0YW5jZW9mIFNwbGF0KVxuXHRcdFx0XHRcdGNvbnRleHQuY2hlY2soIWFueVNwbGF0LCBjYWxsLmxvYywgJ1RPRE86IFNwbGF0IGFyZ3MgaW4gYXNzZXJ0Jylcblx0XHRcdFx0XHRjb25zdCBhc3MgPSB0aGlzLm5lZ2F0ZSA/IG1zQXNzZXJ0Tm90IDogbXNBc3NlcnRcblx0XHRcdFx0XHRyZXR1cm4gYXNzKHQwKGNhbGwuY2FsbGVkKSwgLi4uY2FsbC5hcmdzLm1hcCh0MCkpXG5cdFx0XHRcdH0gZWxzZVxuXHRcdFx0XHRcdHJldHVybiBJZlN0YXRlbWVudChmYWlsQ29uZCgpLCBUaHJvd0Fzc2VydEZhaWwpXG5cdFx0XHR9KVxuXHR9LFxuXG5cdEFzc2lnblNpbmdsZSh2YWxXcmFwKSB7XG5cdFx0Y29uc3QgdmFsID0gdmFsV3JhcCA9PT0gdW5kZWZpbmVkID8gdDAodGhpcy52YWx1ZSkgOiB2YWxXcmFwKHQwKHRoaXMudmFsdWUpKVxuXHRcdGNvbnN0IGRlY2xhcmUgPVxuXHRcdFx0bWFrZURlY2xhcmF0b3IodGhpcy5hc3NpZ25lZSwgdmFsLCBmYWxzZSwgdmVyaWZ5UmVzdWx0cy5pc0V4cG9ydEFzc2lnbih0aGlzKSlcblx0XHRyZXR1cm4gVmFyaWFibGVEZWNsYXJhdGlvbih0aGlzLmFzc2lnbmVlLmlzTXV0YWJsZSgpID8gJ2xldCcgOiAnY29uc3QnLCBbIGRlY2xhcmUgXSlcblx0fSxcblx0Ly8gVE9ETzpFUzYgSnVzdCB1c2UgbmF0aXZlIGRlc3RydWN0dXJpbmcgYXNzaWduXG5cdEFzc2lnbkRlc3RydWN0dXJlKCkge1xuXHRcdHJldHVybiBWYXJpYWJsZURlY2xhcmF0aW9uKHRoaXMua2luZCgpID09PSBMRF9NdXRhYmxlID8gJ2xldCcgOiAnY29uc3QnLFxuXHRcdFx0bWFrZURlc3RydWN0dXJlRGVjbGFyYXRvcnMoXG5cdFx0XHRcdHRoaXMuYXNzaWduZWVzLFxuXHRcdFx0XHR0aGlzLmtpbmQoKSA9PT0gTERfTGF6eSxcblx0XHRcdFx0dDAodGhpcy52YWx1ZSksXG5cdFx0XHRcdGZhbHNlLFxuXHRcdFx0XHR2ZXJpZnlSZXN1bHRzLmlzRXhwb3J0QXNzaWduKHRoaXMpKSlcblx0fSxcblxuXHRCYWdFbnRyeSgpIHsgcmV0dXJuIG1zQWRkKElkQnVpbHQsIHQwKHRoaXMudmFsdWUpKSB9LFxuXG5cdEJhZ0VudHJ5TWFueSgpIHsgcmV0dXJuIG1zQWRkTWFueShJZEJ1aWx0LCB0MCh0aGlzLnZhbHVlKSkgfSxcblxuXHRCYWdTaW1wbGUoKSB7IHJldHVybiBBcnJheUV4cHJlc3Npb24odGhpcy5wYXJ0cy5tYXAodDApKSB9LFxuXG5cdEJsb2NrRG8obGVhZCA9IG51bGwsIG9wUmVzRGVjbGFyZSA9IG51bGwsIG9wT3V0ID0gbnVsbCkge1xuXHRcdGFzc2VydChvcFJlc0RlY2xhcmUgPT09IG51bGwpXG5cdFx0cmV0dXJuIEJsb2NrU3RhdGVtZW50KGNhdChsZWFkLCB0TGluZXModGhpcy5saW5lcyksIG9wT3V0KSlcblx0fSxcblxuXHRCbG9ja1ZhbFRocm93KGxlYWQgPSBudWxsLCBvcFJlc0RlY2xhcmUgPSBudWxsLCBvcE91dCA9IG51bGwpIHtcblx0XHRjb250ZXh0Lndhcm5JZihvcFJlc0RlY2xhcmUgIT09IG51bGwgfHwgb3BPdXQgIT09IG51bGwsIHRoaXMubG9jLFxuXHRcdFx0J091dCBjb25kaXRpb24gaWdub3JlZCBiZWNhdXNlIG9mIG9oLW5vIScpXG5cdFx0cmV0dXJuIEJsb2NrU3RhdGVtZW50KGNhdChsZWFkLCB0TGluZXModGhpcy5saW5lcyksIHQwKHRoaXMuX3Rocm93KSkpXG5cdH0sXG5cblx0QmxvY2tXaXRoUmV0dXJuKGxlYWQsIG9wUmVzRGVjbGFyZSwgb3BPdXQpIHtcblx0XHRyZXR1cm4gdHJhbnNwaWxlQmxvY2sodDAodGhpcy5yZXR1cm5lZCksIHRMaW5lcyh0aGlzLmxpbmVzKSwgbGVhZCwgb3BSZXNEZWNsYXJlLCBvcE91dClcblx0fSxcblxuXHRCbG9ja0JhZyhsZWFkLCBvcFJlc0RlY2xhcmUsIG9wT3V0KSB7XG5cdFx0cmV0dXJuIHRyYW5zcGlsZUJsb2NrKFxuXHRcdFx0SWRCdWlsdCxcblx0XHRcdGNhdChEZWNsYXJlQnVpbHRCYWcsIHRMaW5lcyh0aGlzLmxpbmVzKSksXG5cdFx0XHRsZWFkLCBvcFJlc0RlY2xhcmUsIG9wT3V0KVxuXHR9LFxuXG5cdEJsb2NrT2JqKGxlYWQsIG9wUmVzRGVjbGFyZSwgb3BPdXQpIHtcblx0XHRjb25zdCBsaW5lcyA9IGNhdChEZWNsYXJlQnVpbHRPYmosIHRMaW5lcyh0aGlzLmxpbmVzKSlcblx0XHRjb25zdCByZXMgPSBpZkVsc2UodGhpcy5vcE9iamVkLFxuXHRcdFx0b2JqZWQgPT4gaWZFbHNlKHRoaXMub3BOYW1lLFxuXHRcdFx0XHRuYW1lID0+IG1zU2V0KHQwKG9iamVkKSwgSWRCdWlsdCwgTGl0ZXJhbChuYW1lKSksXG5cdFx0XHRcdCgpID0+IG1zU2V0KHQwKG9iamVkKSwgSWRCdWlsdCkpLFxuXHRcdFx0KCkgPT4gaWZFbHNlKHRoaXMub3BOYW1lLFxuXHRcdFx0XHRfID0+IG1zU2V0TmFtZShJZEJ1aWx0LCBMaXRlcmFsKF8pKSxcblx0XHRcdFx0KCkgPT4gSWRCdWlsdCkpXG5cdFx0cmV0dXJuIHRyYW5zcGlsZUJsb2NrKHJlcywgbGluZXMsIGxlYWQsIG9wUmVzRGVjbGFyZSwgb3BPdXQpXG5cdH0sXG5cblx0QmxvY2tNYXAobGVhZCwgb3BSZXNEZWNsYXJlLCBvcE91dCkge1xuXHRcdHJldHVybiB0cmFuc3BpbGVCbG9jayhcblx0XHRcdElkQnVpbHQsXG5cdFx0XHRjYXQoRGVjbGFyZUJ1aWx0TWFwLCB0TGluZXModGhpcy5saW5lcykpLFxuXHRcdFx0bGVhZCwgb3BSZXNEZWNsYXJlLCBvcE91dClcblx0fSxcblxuXHRCbG9ja1dyYXAoKSB7IHJldHVybiBibG9ja1dyYXAodDAodGhpcy5ibG9jaykpIH0sXG5cblx0QnJlYWtEbygpIHsgcmV0dXJuIEJyZWFrU3RhdGVtZW50KCkgfSxcblxuXHRCcmVha1ZhbCgpIHsgcmV0dXJuIFJldHVyblN0YXRlbWVudCh0MCh0aGlzLnZhbHVlKSkgfSxcblxuXHRDYWxsKCkge1xuXHRcdGNvbnN0IGFueVNwbGF0ID0gdGhpcy5hcmdzLnNvbWUoYXJnID0+IGFyZyBpbnN0YW5jZW9mIFNwbGF0KVxuXHRcdGlmIChhbnlTcGxhdCkge1xuXHRcdFx0Y29uc3QgYXJncyA9IHRoaXMuYXJncy5tYXAoYXJnID0+XG5cdFx0XHRcdGFyZyBpbnN0YW5jZW9mIFNwbGF0ID9cblx0XHRcdFx0XHRtc0Fycih0MChhcmcuc3BsYXR0ZWQpKSA6XG5cdFx0XHRcdFx0dDAoYXJnKSlcblx0XHRcdHJldHVybiBDYWxsRXhwcmVzc2lvbihJZEZ1bmN0aW9uQXBwbHlDYWxsLCBbXG5cdFx0XHRcdHQwKHRoaXMuY2FsbGVkKSxcblx0XHRcdFx0TGl0TnVsbCxcblx0XHRcdFx0Q2FsbEV4cHJlc3Npb24obWVtYmVyKExpdEVtcHR5QXJyYXksICdjb25jYXQnKSwgYXJncyldKVxuXHRcdH1cblx0XHRlbHNlIHJldHVybiBDYWxsRXhwcmVzc2lvbih0MCh0aGlzLmNhbGxlZCksIHRoaXMuYXJncy5tYXAodDApKVxuXHR9LFxuXG5cdENhc2VEbygpIHtcblx0XHRjb25zdCBib2R5ID0gY2FzZUJvZHkodGhpcy5wYXJ0cywgdGhpcy5vcEVsc2UpXG5cdFx0cmV0dXJuIGlmRWxzZSh0aGlzLm9wQ2FzZWQsIF8gPT4gQmxvY2tTdGF0ZW1lbnQoWyB0MChfKSwgYm9keSBdKSwgKCkgPT4gYm9keSlcblx0fSxcblxuXHRDYXNlVmFsKCkge1xuXHRcdGNvbnN0IGJvZHkgPSBjYXNlQm9keSh0aGlzLnBhcnRzLCB0aGlzLm9wRWxzZSlcblx0XHRjb25zdCBibG9jayA9IGlmRWxzZSh0aGlzLm9wQ2FzZWQsIF8gPT4gWyB0MChfKSwgYm9keSBdLCAoKSA9PiBbIGJvZHkgXSlcblx0XHRyZXR1cm4gYmxvY2tXcmFwKEJsb2NrU3RhdGVtZW50KGJsb2NrKSlcblx0fSxcblxuXHRDYXNlRG9QYXJ0OiBjYXNlUGFydCxcblx0Q2FzZVZhbFBhcnQ6IGNhc2VQYXJ0LFxuXG5cdENsYXNzKCkge1xuXHRcdGNvbnN0IG1ldGhvZHMgPSBjYXQoXG5cdFx0XHR0aGlzLnN0YXRpY3MubWFwKG1ldGhvZERlZmluaXRpb24oZmFsc2UsIHRydWUpKSxcblx0XHRcdG9wTWFwKHRoaXMub3BDb25zdHJ1Y3RvciwgbWV0aG9kRGVmaW5pdGlvbih0cnVlLCBmYWxzZSkpLFxuXHRcdFx0dGhpcy5tZXRob2RzLm1hcChtZXRob2REZWZpbml0aW9uKGZhbHNlLCBmYWxzZSkpKVxuXHRcdGNvbnN0IG9wTmFtZSA9IG9wTWFwKHRoaXMub3BOYW1lLCBpZENhY2hlZClcblx0XHRyZXR1cm4gQ2xhc3NFeHByZXNzaW9uKG9wTmFtZSwgb3BNYXAodGhpcy5zdXBlckNsYXNzLCB0MCksIENsYXNzQm9keShtZXRob2RzKSlcblx0fSxcblxuXHRDb25kaXRpb25hbERvKCkge1xuXHRcdHJldHVybiBJZlN0YXRlbWVudChcblx0XHRcdHRoaXMuaXNVbmxlc3MgPyBVbmFyeUV4cHJlc3Npb24oJyEnLCBtYXliZUJvb2xXcmFwKHQwKHRoaXMudGVzdCkpKSA6IHQwKHRoaXMudGVzdCksXG5cdFx0XHR0MCh0aGlzLnJlc3VsdCkpXG5cdH0sXG5cblx0Q29uZGl0aW9uYWxWYWwoKSB7XG5cdFx0Y29uc3QgdGVzdCA9IG1heWJlQm9vbFdyYXAodDAodGhpcy50ZXN0KSlcblx0XHRjb25zdCByZXN1bHQgPSBtc1NvbWUoYmxvY2tXcmFwKHQwKHRoaXMucmVzdWx0KSkpXG5cdFx0cmV0dXJuIHRoaXMuaXNVbmxlc3MgP1xuXHRcdFx0Q29uZGl0aW9uYWxFeHByZXNzaW9uKHRlc3QsIE1zTm9uZSwgcmVzdWx0KSA6XG5cdFx0XHRDb25kaXRpb25hbEV4cHJlc3Npb24odGVzdCwgcmVzdWx0LCBNc05vbmUpXG5cdH0sXG5cblx0Q2F0Y2goKSB7XG5cdFx0cmV0dXJuIENhdGNoQ2xhdXNlKHQwKHRoaXMuY2F1Z2h0KSwgdDAodGhpcy5ibG9jaykpXG5cdH0sXG5cblx0Q29udGludWUoKSB7IHJldHVybiBDb250aW51ZVN0YXRlbWVudCgpIH0sXG5cblx0Ly8gVE9ETzogaW5jbHVkZUlub3V0Q2hlY2tzIGlzIG1pc25hbWVkXG5cdERlYnVnKCkgeyByZXR1cm4gY29udGV4dC5vcHRzLmluY2x1ZGVJbm91dENoZWNrcygpID8gdExpbmVzKHRoaXMubGluZXMpIDogWyBdIH0sXG5cblx0RXhjZXB0RG8oKSB7IHJldHVybiB0cmFuc3BpbGVFeGNlcHQodGhpcykgfSxcblx0RXhjZXB0VmFsKCkgeyByZXR1cm4gYmxvY2tXcmFwKEJsb2NrU3RhdGVtZW50KFsgdHJhbnNwaWxlRXhjZXB0KHRoaXMpIF0pKSB9LFxuXG5cdEZvckRvKCkgeyByZXR1cm4gZm9yTG9vcCh0aGlzLm9wSXRlcmF0ZWUsIHRoaXMuYmxvY2spIH0sXG5cblx0Rm9yQmFnKCkge1xuXHRcdHJldHVybiBibG9ja1dyYXAoQmxvY2tTdGF0ZW1lbnQoW1xuXHRcdFx0RGVjbGFyZUJ1aWx0QmFnLFxuXHRcdFx0Zm9yTG9vcCh0aGlzLm9wSXRlcmF0ZWUsIHRoaXMuYmxvY2spLFxuXHRcdFx0UmV0dXJuQnVpbHRcblx0XHRdKSlcblx0fSxcblxuXHRGb3JWYWwoKSB7XG5cdFx0cmV0dXJuIGJsb2NrV3JhcChCbG9ja1N0YXRlbWVudChbIGZvckxvb3AodGhpcy5vcEl0ZXJhdGVlLCB0aGlzLmJsb2NrKSBdKSlcblx0fSxcblxuXHRGdW4oKSB7XG5cdFx0Y29uc3Qgb2xkSW5HZW5lcmF0b3IgPSBpc0luR2VuZXJhdG9yXG5cdFx0aXNJbkdlbmVyYXRvciA9IHRoaXMuaXNHZW5lcmF0b3JcblxuXHRcdC8vIFRPRE86RVM2IHVzZSBgLi4uYGZcblx0XHRjb25zdCBuQXJncyA9IExpdGVyYWwodGhpcy5hcmdzLmxlbmd0aClcblx0XHRjb25zdCBvcERlY2xhcmVSZXN0ID0gb3BNYXAodGhpcy5vcFJlc3RBcmcsIHJlc3QgPT5cblx0XHRcdGRlY2xhcmUocmVzdCwgQ2FsbEV4cHJlc3Npb24oQXJyYXlTbGljZUNhbGwsIFtJZEFyZ3VtZW50cywgbkFyZ3NdKSkpXG5cdFx0Y29uc3QgYXJnQ2hlY2tzID0gb3BJZihjb250ZXh0Lm9wdHMuaW5jbHVkZVR5cGVDaGVja3MoKSwgKCkgPT5cblx0XHRcdGZsYXRPcE1hcCh0aGlzLmFyZ3MsIG9wVHlwZUNoZWNrRm9yTG9jYWxEZWNsYXJlKSlcblxuXHRcdGNvbnN0IF9pbiA9IG9wTWFwKHRoaXMub3BJbiwgdDApXG5cdFx0Y29uc3QgbGVhZCA9IGNhdChvcERlY2xhcmVSZXN0LCBhcmdDaGVja3MsIF9pbilcblxuXHRcdGNvbnN0IF9vdXQgPSBvcE1hcCh0aGlzLm9wT3V0LCB0MClcblx0XHRjb25zdCBib2R5ID0gdDModGhpcy5ibG9jaywgbGVhZCwgdGhpcy5vcFJlc0RlY2xhcmUsIF9vdXQpXG5cdFx0Y29uc3QgYXJncyA9IHRoaXMuYXJncy5tYXAodDApXG5cdFx0aXNJbkdlbmVyYXRvciA9IG9sZEluR2VuZXJhdG9yXG5cdFx0Y29uc3QgaWQgPSBvcE1hcCh0aGlzLm9wTmFtZSwgaWRDYWNoZWQpXG5cdFx0cmV0dXJuIEZ1bmN0aW9uRXhwcmVzc2lvbihpZCwgYXJncywgYm9keSwgdGhpcy5pc0dlbmVyYXRvcilcblx0fSxcblxuXHRMYXp5KCkgeyByZXR1cm4gbGF6eVdyYXAodDAodGhpcy52YWx1ZSkpIH0sXG5cblx0TnVtYmVyTGl0ZXJhbCgpIHtcblx0XHQvLyBOZWdhdGl2ZSBudW1iZXJzIGFyZSBub3QgcGFydCBvZiBFUyBzcGVjLlxuXHRcdC8vIGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi81LjEvI3NlYy03LjguM1xuXHRcdGNvbnN0IGxpdCA9IExpdGVyYWwoTWF0aC5hYnModGhpcy52YWx1ZSkpXG5cdFx0cmV0dXJuIGlzUG9zaXRpdmUodGhpcy52YWx1ZSkgPyBsaXQgOiBVbmFyeUV4cHJlc3Npb24oJy0nLCBsaXQpXG5cdH0sXG5cblx0R2xvYmFsQWNjZXNzKCkgeyByZXR1cm4gSWRlbnRpZmllcih0aGlzLm5hbWUpIH0sXG5cblx0TG9jYWxBY2Nlc3MoKSB7IHJldHVybiBhY2Nlc3NMb2NhbERlY2xhcmUodmVyaWZ5UmVzdWx0cy5sb2NhbERlY2xhcmVGb3JBY2Nlc3ModGhpcykpIH0sXG5cblx0TG9jYWxEZWNsYXJlKCkgeyByZXR1cm4gaWRGb3JEZWNsYXJlQ2FjaGVkKHRoaXMpIH0sXG5cblx0TG9jYWxNdXRhdGUoKSB7XG5cdFx0cmV0dXJuIGFzc2lnbm1lbnRFeHByZXNzaW9uUGxhaW4oaWRDYWNoZWQodGhpcy5uYW1lKSwgdDAodGhpcy52YWx1ZSkpXG5cdH0sXG5cblx0TG9naWMoKSB7XG5cdFx0YXNzZXJ0KHRoaXMua2luZCA9PT0gTF9BbmQgfHwgdGhpcy5raW5kID09PSBMX09yKVxuXHRcdGNvbnN0IG9wID0gdGhpcy5raW5kID09PSBMX0FuZCA/ICcmJicgOiAnfHwnXG5cdFx0cmV0dXJuIHRhaWwodGhpcy5hcmdzKS5yZWR1Y2UoKGEsIGIpID0+IExvZ2ljYWxFeHByZXNzaW9uKG9wLCBhLCB0MChiKSksIHQwKHRoaXMuYXJnc1swXSkpXG5cdH0sXG5cblx0TWFwRW50cnkoKSB7IHJldHVybiBtc0Fzc29jKElkQnVpbHQsIHQwKHRoaXMua2V5KSwgdDAodGhpcy52YWwpKSB9LFxuXG5cdE1lbWJlcigpIHsgcmV0dXJuIG1lbWJlcih0MCh0aGlzLm9iamVjdCksIHRoaXMubmFtZSkgfSxcblxuXHRNb2R1bGUoKSB7XG5cdFx0Y29uc3QgYm9keSA9IGNhdChcblx0XHRcdHRMaW5lcyh0aGlzLmxpbmVzKSxcblx0XHRcdG9wTWFwKHRoaXMub3BEZWZhdWx0RXhwb3J0LCBfID0+IGFzc2lnbm1lbnRFeHByZXNzaW9uUGxhaW4oRXhwb3J0c0RlZmF1bHQsIHQwKF8pKSkpXG5cdFx0cmV0dXJuIFByb2dyYW0oY2F0KFxuXHRcdFx0b3BJZihjb250ZXh0Lm9wdHMuaW5jbHVkZVVzZVN0cmljdCgpLCAoKSA9PiBVc2VTdHJpY3QpLFxuXHRcdFx0b3BJZihjb250ZXh0Lm9wdHMuaW5jbHVkZUFtZGVmaW5lKCksICgpID0+IEFtZGVmaW5lSGVhZGVyKSxcblx0XHRcdHRvU3RhdGVtZW50KGFtZFdyYXBNb2R1bGUodGhpcy5kb1VzZXMsIHRoaXMudXNlcy5jb25jYXQodGhpcy5kZWJ1Z1VzZXMpLCBib2R5KSkpKVxuXHR9LFxuXG5cdE5ldygpIHtcblx0XHRjb25zdCBhbnlTcGxhdCA9IHRoaXMuYXJncy5zb21lKF8gPT4gXyBpbnN0YW5jZW9mIFNwbGF0KVxuXHRcdGNvbnRleHQuY2hlY2soIWFueVNwbGF0LCB0aGlzLmxvYywgJ1RPRE86IFNwbGF0IHBhcmFtcyBmb3IgbmV3Jylcblx0XHRyZXR1cm4gTmV3RXhwcmVzc2lvbih0MCh0aGlzLnR5cGUpLCB0aGlzLmFyZ3MubWFwKHQwKSlcblx0fSxcblxuXHROb3QoKSB7IHJldHVybiBVbmFyeUV4cHJlc3Npb24oJyEnLCB0MCh0aGlzLmFyZykpIH0sXG5cblx0T2JqRW50cnkoKSB7XG5cdFx0cmV0dXJuICh0aGlzLmFzc2lnbiBpbnN0YW5jZW9mIEFzc2lnblNpbmdsZSAmJiAhdGhpcy5hc3NpZ24uYXNzaWduZWUuaXNMYXp5KCkpID9cblx0XHRcdHQxKHRoaXMuYXNzaWduLCB2YWwgPT5cblx0XHRcdFx0YXNzaWdubWVudEV4cHJlc3Npb25QbGFpbihtZW1iZXIoSWRCdWlsdCwgdGhpcy5hc3NpZ24uYXNzaWduZWUubmFtZSksIHZhbCkpIDpcblx0XHRcdGNhdChcblx0XHRcdFx0dDAodGhpcy5hc3NpZ24pLFxuXHRcdFx0XHR0aGlzLmFzc2lnbi5hbGxBc3NpZ25lZXMoKS5tYXAoXyA9PlxuXHRcdFx0XHRcdG1zU2V0TGF6eShJZEJ1aWx0LCBMaXRlcmFsKF8ubmFtZSksIGlkRm9yRGVjbGFyZUNhY2hlZChfKSkpKVxuXHR9LFxuXG5cdE9ialNpbXBsZSgpIHtcblx0XHRyZXR1cm4gT2JqZWN0RXhwcmVzc2lvbih0aGlzLnBhaXJzLm1hcChwYWlyID0+XG5cdFx0XHRwcm9wZXJ0eSgnaW5pdCcsIHByb3BlcnR5SWRPckxpdGVyYWxDYWNoZWQocGFpci5rZXkpLCB0MChwYWlyLnZhbHVlKSkpKVxuXHR9LFxuXG5cdFF1b3RlKCkge1xuXHRcdGlmICh0aGlzLnBhcnRzLmxlbmd0aCA9PT0gMClcblx0XHRcdHJldHVybiBMaXRFbXB0eVN0cmluZ1xuXHRcdGVsc2Uge1xuXHRcdFx0Y29uc3QgcXVhc2lzID0gWyBdLCBleHByZXNzaW9ucyA9IFsgXVxuXG5cdFx0XHQvLyBUZW1wbGF0ZUxpdGVyYWwgbXVzdCBzdGFydCB3aXRoIGEgVGVtcGxhdGVFbGVtZW50XG5cdFx0XHRpZiAodHlwZW9mIHRoaXMucGFydHNbMF0gIT09ICdzdHJpbmcnKVxuXHRcdFx0XHRxdWFzaXMucHVzaChFbXB0eVRlbXBsYXRlRWxlbWVudClcblxuXHRcdFx0Zm9yIChsZXQgcGFydCBvZiB0aGlzLnBhcnRzKVxuXHRcdFx0XHRpZiAodHlwZW9mIHBhcnQgPT09ICdzdHJpbmcnKVxuXHRcdFx0XHRcdHF1YXNpcy5wdXNoKHRlbXBsYXRlRWxlbWVudEZvclN0cmluZyhwYXJ0KSlcblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0Ly8gXCJ7MX17MX1cIiBuZWVkcyBhbiBlbXB0eSBxdWFzaSBpbiB0aGUgbWlkZGxlIChhbmQgb24gdGhlIGVuZHMpXG5cdFx0XHRcdFx0aWYgKHF1YXNpcy5sZW5ndGggPT09IGV4cHJlc3Npb25zLmxlbmd0aClcblx0XHRcdFx0XHRcdHF1YXNpcy5wdXNoKEVtcHR5VGVtcGxhdGVFbGVtZW50KVxuXHRcdFx0XHRcdGV4cHJlc3Npb25zLnB1c2gobXNTaG93KHQwKHBhcnQpKSlcblx0XHRcdFx0fVxuXG5cdFx0XHQvLyBUZW1wbGF0ZUxpdGVyYWwgbXVzdCBlbmQgd2l0aCBhIFRlbXBsYXRlRWxlbWVudCwgc28gb25lIG1vcmUgcXVhc2kgdGhhbiBleHByZXNzaW9uLlxuXHRcdFx0aWYgKHF1YXNpcy5sZW5ndGggPT09IGV4cHJlc3Npb25zLmxlbmd0aClcblx0XHRcdFx0cXVhc2lzLnB1c2goRW1wdHlUZW1wbGF0ZUVsZW1lbnQpXG5cblx0XHRcdHJldHVybiBUZW1wbGF0ZUxpdGVyYWwocXVhc2lzLCBleHByZXNzaW9ucylcblx0XHR9XG5cdH0sXG5cblx0U3BlY2lhbERvKCkge1xuXHRcdHN3aXRjaCAodGhpcy5raW5kKSB7XG5cdFx0XHRjYXNlIFNEX0RlYnVnZ2VyOiByZXR1cm4gRGVidWdnZXJTdGF0ZW1lbnQoKVxuXHRcdFx0ZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKHRoaXMua2luZClcblx0XHR9XG5cdH0sXG5cblx0U3BlY2lhbFZhbCgpIHtcblx0XHQvLyBNYWtlIG5ldyBvYmplY3RzIGJlY2F1c2Ugd2Ugd2lsbCBhc3NpZ24gYGxvY2AgdG8gdGhlbS5cblx0XHRzd2l0Y2ggKHRoaXMua2luZCkge1xuXHRcdFx0Y2FzZSBTVl9Db250YWluczogcmV0dXJuIG1lbWJlcihJZE1zLCAnY29udGFpbnMnKVxuXHRcdFx0Y2FzZSBTVl9GYWxzZTogcmV0dXJuIExpdGVyYWwoZmFsc2UpXG5cdFx0XHRjYXNlIFNWX051bGw6IHJldHVybiBMaXRlcmFsKG51bGwpXG5cdFx0XHRjYXNlIFNWX1N1YjogcmV0dXJuIG1lbWJlcihJZE1zLCAnc3ViJylcblx0XHRcdGNhc2UgU1ZfVGhpczogcmV0dXJuIFx0VGhpc0V4cHJlc3Npb24oKVxuXHRcdFx0Y2FzZSBTVl9UaGlzTW9kdWxlRGlyZWN0b3J5OiByZXR1cm4gSWRlbnRpZmllcignX19kaXJuYW1lJylcblx0XHRcdGNhc2UgU1ZfVHJ1ZTogcmV0dXJuIExpdGVyYWwodHJ1ZSlcblx0XHRcdGNhc2UgU1ZfVW5kZWZpbmVkOiByZXR1cm4gVW5hcnlFeHByZXNzaW9uKCd2b2lkJywgTGl0WmVybylcblx0XHRcdGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcih0aGlzLmtpbmQpXG5cdFx0fVxuXHR9LFxuXG5cdFRocm93KCkge1xuXHRcdHJldHVybiBpZkVsc2UodGhpcy5vcFRocm93bixcblx0XHRcdF8gPT4gVGhyb3dTdGF0ZW1lbnQobXNFcnJvcih0MChfKSkpLFxuXHRcdFx0KCkgPT4gVGhyb3dTdGF0ZW1lbnQobXNFcnJvcihMaXRTdHJUaHJvdykpKVxuXHR9LFxuXG5cdFlpZWxkKCkgeyByZXR1cm4geWllbGRFeHByZXNzaW9uTm9EZWxlZ2F0ZSh0MCh0aGlzLnlpZWxkZWQpKSB9LFxuXG5cdFlpZWxkVG8oKSB7IHJldHVybiB5aWVsZEV4cHJlc3Npb25EZWxlZ2F0ZSh0MCh0aGlzLnlpZWxkZWRUbykpIH1cbn0pXG5cbmZ1bmN0aW9uIGNhc2VQYXJ0KGFsdGVybmF0ZSkge1xuXHRpZiAodGhpcy50ZXN0IGluc3RhbmNlb2YgUGF0dGVybikge1xuXHRcdGNvbnN0IHsgdHlwZSwgcGF0dGVybmVkLCBsb2NhbHMgfSA9IHRoaXMudGVzdFxuXHRcdGNvbnN0IGRlY2wgPSBWYXJpYWJsZURlY2xhcmF0aW9uKCdjb25zdCcsIFtcblx0XHRcdFZhcmlhYmxlRGVjbGFyYXRvcihJZEV4dHJhY3QsIG1zRXh0cmFjdCh0MCh0eXBlKSwgdDAocGF0dGVybmVkKSkpIF0pXG5cdFx0Y29uc3QgdGVzdCA9IEJpbmFyeUV4cHJlc3Npb24oJyE9PScsIElkRXh0cmFjdCwgTGl0TnVsbClcblx0XHRjb25zdCBleHRyYWN0ID0gVmFyaWFibGVEZWNsYXJhdGlvbignY29uc3QnLCBsb2NhbHMubWFwKChfLCBpZHgpID0+XG5cdFx0XHRWYXJpYWJsZURlY2xhcmF0b3IoaWRGb3JEZWNsYXJlQ2FjaGVkKF8pLCBtZW1iZXJFeHByZXNzaW9uKElkRXh0cmFjdCwgTGl0ZXJhbChpZHgpKSkpKVxuXHRcdGNvbnN0IHJlcyA9IHQxKHRoaXMucmVzdWx0LCBleHRyYWN0KVxuXHRcdHJldHVybiBCbG9ja1N0YXRlbWVudChbIGRlY2wsIElmU3RhdGVtZW50KHRlc3QsIHJlcywgYWx0ZXJuYXRlKSBdKVxuXHR9IGVsc2Vcblx0XHQvLyBhbHRlcm5hdGUgd3JpdHRlbiB0byBieSBgY2FzZUJvZHlgLlxuXHRcdHJldHVybiBJZlN0YXRlbWVudChtYXliZUJvb2xXcmFwKHQwKHRoaXMudGVzdCkpLCB0MCh0aGlzLnJlc3VsdCksIGFsdGVybmF0ZSlcbn1cblxuLy8gRnVuY3Rpb25zIHNwZWNpZmljIHRvIGNlcnRhaW4gZXhwcmVzc2lvbnMuXG5jb25zdFxuXHQvLyBXcmFwcyBhIGJsb2NrICh3aXRoIGByZXR1cm5gIHN0YXRlbWVudHMgaW4gaXQpIGluIGFuIElJRkUuXG5cdGJsb2NrV3JhcCA9IGJsb2NrID0+IHtcblx0XHRjb25zdCBpbnZva2UgPSBjYWxsRXhwcmVzc2lvblRodW5rKGZ1bmN0aW9uRXhwcmVzc2lvblRodW5rKGJsb2NrLCBpc0luR2VuZXJhdG9yKSlcblx0XHRyZXR1cm4gaXNJbkdlbmVyYXRvciA/IHlpZWxkRXhwcmVzc2lvbkRlbGVnYXRlKGludm9rZSkgOiBpbnZva2Vcblx0fSxcblxuXHRjYXNlQm9keSA9IChwYXJ0cywgb3BFbHNlKSA9PiB7XG5cdFx0bGV0IGFjYyA9IGlmRWxzZShvcEVsc2UsIHQwLCAoKSA9PiBUaHJvd05vQ2FzZU1hdGNoKVxuXHRcdGZvciAobGV0IGkgPSBwYXJ0cy5sZW5ndGggLSAxOyBpID49IDA7IGkgPSBpIC0gMSlcblx0XHRcdGFjYyA9IHQxKHBhcnRzW2ldLCBhY2MpXG5cdFx0cmV0dXJuIGFjY1xuXHR9LFxuXG5cdGZvckxvb3AgPSAob3BJdGVyYXRlZSwgYmxvY2spID0+XG5cdFx0aWZFbHNlKG9wSXRlcmF0ZWUsXG5cdFx0XHQoeyBlbGVtZW50LCBiYWcgfSkgPT4ge1xuXHRcdFx0XHRjb25zdCBkZWNsYXJlID0gVmFyaWFibGVEZWNsYXJhdGlvbignbGV0JywgWyBWYXJpYWJsZURlY2xhcmF0b3IodDAoZWxlbWVudCkpIF0pXG5cdFx0XHRcdHJldHVybiBGb3JPZlN0YXRlbWVudChkZWNsYXJlLCB0MChiYWcpLCB0MChibG9jaykpXG5cdFx0XHR9LFxuXHRcdFx0KCkgPT4gZm9yU3RhdGVtZW50SW5maW5pdGUodDAoYmxvY2spKSksXG5cblx0bWV0aG9kRGVmaW5pdGlvbiA9IChpc0NvbnN0cnVjdG9yLCBpc1N0YXRpYykgPT4gZnVuID0+IHtcblx0XHRhc3NlcnQoZnVuLm9wTmFtZSAhPT0gbnVsbClcblx0XHRjb25zdCBrZXkgPSBwcm9wZXJ0eUlkT3JMaXRlcmFsQ2FjaGVkKGZ1bi5vcE5hbWUpXG5cdFx0Ly8gVGhpcyBpcyBoYW5kbGVkIGJ5IGBrZXlgLlxuXHRcdHZhbHVlLmlkID0gbnVsbFxuXHRcdGNvbnN0IHZhbHVlID0gdDAoZnVuKVxuXHRcdC8vIFRPRE86IGdldC9zZXQhXG5cdFx0Y29uc3Qga2luZCA9IGlzQ29uc3RydWN0b3IgPyAnY29uc3RydWN0b3InIDogJ21ldGhvZCdcblx0XHQvLyBUT0RPOiBjb21wdXRlZCBjbGFzcyBwcm9wZXJ0aWVzXG5cdFx0Y29uc3QgY29tcHV0ZWQgPSBmYWxzZVxuXHRcdHJldHVybiBNZXRob2REZWZpbml0aW9uKGtleSwgdmFsdWUsIGtpbmQsIGlzU3RhdGljLCBjb21wdXRlZClcblx0fSxcblxuXHR0cmFuc3BpbGVCbG9jayA9IChyZXR1cm5lZCwgbGluZXMsIGxlYWQgPSBudWxsLCBvcFJlc0RlY2xhcmUgPSBudWxsLCBvcE91dCA9IG51bGwpID0+IHtcblx0XHRjb25zdCBmaW4gPSBpZkVsc2Uob3BSZXNEZWNsYXJlLFxuXHRcdFx0cmQgPT4ge1xuXHRcdFx0XHRjb25zdCByZXQgPSBtYXliZVdyYXBJbkNoZWNrQ29udGFpbnMocmV0dXJuZWQsIHJkLm9wVHlwZSwgcmQubmFtZSlcblx0XHRcdFx0cmV0dXJuIGlmRWxzZShvcE91dCxcblx0XHRcdFx0XHRfID0+IGNhdChkZWNsYXJlKHJkLCByZXQpLCBfLCBSZXR1cm5SZXMpLFxuXHRcdFx0XHRcdCgpID0+IFJldHVyblN0YXRlbWVudChyZXQpKVxuXHRcdFx0fSxcblx0XHRcdCgpID0+IGNhdChvcE91dCwgUmV0dXJuU3RhdGVtZW50KHJldHVybmVkKSkpXG5cdFx0cmV0dXJuIEJsb2NrU3RhdGVtZW50KGNhdChsZWFkLCBsaW5lcywgZmluKSlcblx0fSxcblxuXHR0cmFuc3BpbGVFeGNlcHQgPSBleGNlcHQgPT5cblx0XHRUcnlTdGF0ZW1lbnQoXG5cdFx0XHR0MChleGNlcHQuX3RyeSksXG5cdFx0XHRvcE1hcChleGNlcHQuX2NhdGNoLCB0MCksXG5cdFx0XHRvcE1hcChleGNlcHQuX2ZpbmFsbHksIHQwKSlcblxuLy8gTW9kdWxlIGhlbHBlcnNcbmNvbnN0XG5cdGFtZFdyYXBNb2R1bGUgPSAoZG9Vc2VzLCBvdGhlclVzZXMsIGJvZHkpID0+IHtcblx0XHRjb25zdCBhbGxVc2VzID0gZG9Vc2VzLmNvbmNhdChvdGhlclVzZXMpXG5cdFx0Y29uc3QgdXNlUGF0aHMgPSBBcnJheUV4cHJlc3Npb24oY2F0KFxuXHRcdFx0TGl0U3RyRXhwb3J0cyxcblx0XHRcdGFsbFVzZXMubWFwKF8gPT4gTGl0ZXJhbChtYW5nbGVQYXRoKF8ucGF0aCkpKSkpXG5cdFx0Y29uc3QgdXNlSWRlbnRpZmllcnMgPSBhbGxVc2VzLm1hcCgoXywgaSkgPT4gaWRDYWNoZWQoYCR7cGF0aEJhc2VOYW1lKF8ucGF0aCl9XyR7aX1gKSlcblx0XHRjb25zdCB1c2VBcmdzID0gY2F0KElkRXhwb3J0cywgdXNlSWRlbnRpZmllcnMpXG5cdFx0Y29uc3QgdXNlRG9zID0gZG9Vc2VzLm1hcCgodXNlLCBpKSA9PlxuXHRcdFx0bG9jKEV4cHJlc3Npb25TdGF0ZW1lbnQobXNHZXRNb2R1bGUodXNlSWRlbnRpZmllcnNbaV0pKSwgdXNlLmxvYykpXG5cdFx0Y29uc3Qgb3BVc2VEZWNsYXJlID0gb3BJZighaXNFbXB0eShvdGhlclVzZXMpLFxuXHRcdFx0KCkgPT4gVmFyaWFibGVEZWNsYXJhdGlvbignY29uc3QnLCBmbGF0TWFwKG90aGVyVXNlcywgKHVzZSwgaSkgPT5cblx0XHRcdFx0dXNlRGVjbGFyYXRvcnModXNlLCB1c2VJZGVudGlmaWVyc1tpICsgZG9Vc2VzLmxlbmd0aF0pKSkpXG5cdFx0Y29uc3QgZnVsbEJvZHkgPSBCbG9ja1N0YXRlbWVudChjYXQodXNlRG9zLCBvcFVzZURlY2xhcmUsIGJvZHksIFJldHVybkV4cG9ydHMpKVxuXHRcdGNvbnN0IGxhenlCb2R5ID1cblx0XHRcdGNvbnRleHQub3B0cy5sYXp5TW9kdWxlKCkgP1xuXHRcdFx0XHRCbG9ja1N0YXRlbWVudChbIEV4cHJlc3Npb25TdGF0ZW1lbnQoXG5cdFx0XHRcdFx0YXNzaWdubWVudEV4cHJlc3Npb25QbGFpbihFeHBvcnRzR2V0LFxuXHRcdFx0XHRcdFx0bXNMYXp5KGZ1bmN0aW9uRXhwcmVzc2lvblRodW5rKGZ1bGxCb2R5KSkpKSBdKSA6XG5cdFx0XHRcdGZ1bGxCb2R5XG5cdFx0cmV0dXJuIENhbGxFeHByZXNzaW9uKElkRGVmaW5lLCBbIHVzZVBhdGhzLCBmdW5jdGlvbkV4cHJlc3Npb25QbGFpbih1c2VBcmdzLCBsYXp5Qm9keSkgXSlcblx0fSxcblxuXHRwYXRoQmFzZU5hbWUgPSBwYXRoID0+XG5cdFx0cGF0aC5zdWJzdHIocGF0aC5sYXN0SW5kZXhPZignLycpICsgMSksXG5cblx0dXNlRGVjbGFyYXRvcnMgPSAodXNlLCBtb2R1bGVJZGVudGlmaWVyKSA9PiB7XG5cdFx0Ly8gVE9ETzogQ291bGQgYmUgbmVhdGVyIGFib3V0IHRoaXNcblx0XHRjb25zdCBpc0xhenkgPSAoaXNFbXB0eSh1c2UudXNlZCkgPyB1c2Uub3BVc2VEZWZhdWx0IDogdXNlLnVzZWRbMF0pLmlzTGF6eSgpXG5cdFx0Y29uc3QgdmFsdWUgPSAoaXNMYXp5ID8gbXNMYXp5R2V0TW9kdWxlIDogbXNHZXRNb2R1bGUpKG1vZHVsZUlkZW50aWZpZXIpXG5cblx0XHRjb25zdCB1c2VkRGVmYXVsdCA9IG9wTWFwKHVzZS5vcFVzZURlZmF1bHQsIGRlZiA9PiB7XG5cdFx0XHRjb25zdCBkZWZleHAgPSBtc0dldERlZmF1bHRFeHBvcnQobW9kdWxlSWRlbnRpZmllcilcblx0XHRcdGNvbnN0IHZhbCA9IGlzTGF6eSA/IGxhenlXcmFwKGRlZmV4cCkgOiBkZWZleHBcblx0XHRcdHJldHVybiBsb2MoVmFyaWFibGVEZWNsYXJhdG9yKGlkRm9yRGVjbGFyZUNhY2hlZChkZWYpLCB2YWwpLCBkZWYubG9jKVxuXHRcdH0pXG5cblx0XHRjb25zdCB1c2VkRGVzdHJ1Y3QgPSBpc0VtcHR5KHVzZS51c2VkKSA/IG51bGwgOlxuXHRcdFx0bWFrZURlc3RydWN0dXJlRGVjbGFyYXRvcnModXNlLnVzZWQsIGlzTGF6eSwgdmFsdWUsIHRydWUsIGZhbHNlKVxuXG5cdFx0cmV0dXJuIGNhdCh1c2VkRGVmYXVsdCwgdXNlZERlc3RydWN0KVxuXHR9XG5cbi8vIEdlbmVyYWwgdXRpbHMuIE5vdCBpbiB1dGlsLmpzIGJlY2F1c2UgdGhlc2UgY2xvc2Ugb3ZlciBjb250ZXh0LlxuY29uc3Rcblx0bWF5YmVCb29sV3JhcCA9IGFzdCA9PlxuXHRcdGNvbnRleHQub3B0cy5pbmNsdWRlQ2FzZUNoZWNrcygpID8gbXNCb29sKGFzdCkgOiBhc3QsXG5cblx0bWFrZURlc3RydWN0dXJlRGVjbGFyYXRvcnMgPSAoYXNzaWduZWVzLCBpc0xhenksIHZhbHVlLCBpc01vZHVsZSwgaXNFeHBvcnQpID0+IHtcblx0XHRjb25zdCBkZXN0cnVjdHVyZWROYW1lID0gYF8kJHthc3NpZ25lZXNbMF0ubG9jLnN0YXJ0LmxpbmV9YFxuXHRcdGNvbnN0IGlkRGVzdHJ1Y3R1cmVkID0gSWRlbnRpZmllcihkZXN0cnVjdHVyZWROYW1lKVxuXHRcdGNvbnN0IGRlY2xhcmF0b3JzID0gYXNzaWduZWVzLm1hcChhc3NpZ25lZSA9PiB7XG5cdFx0XHQvLyBUT0RPOiBEb24ndCBjb21waWxlIGl0IGlmIGl0J3MgbmV2ZXIgYWNjZXNzZWRcblx0XHRcdGNvbnN0IGdldCA9IGdldE1lbWJlcihpZERlc3RydWN0dXJlZCwgYXNzaWduZWUubmFtZSwgaXNMYXp5LCBpc01vZHVsZSlcblx0XHRcdHJldHVybiBtYWtlRGVjbGFyYXRvcihhc3NpZ25lZSwgZ2V0LCBpc0xhenksIGlzRXhwb3J0KVxuXHRcdH0pXG5cdFx0Ly8gR2V0dGluZyBsYXp5IG1vZHVsZSBpcyBkb25lIGJ5IG1zLmxhenlHZXRNb2R1bGUuXG5cdFx0Y29uc3QgdmFsID0gKGlzTGF6eSAmJiAhaXNNb2R1bGUpID8gbGF6eVdyYXAodmFsdWUpIDogdmFsdWVcblx0XHRyZXR1cm4gdW5zaGlmdChWYXJpYWJsZURlY2xhcmF0b3IoaWREZXN0cnVjdHVyZWQsIHZhbCksIGRlY2xhcmF0b3JzKVxuXHR9LFxuXG5cdG1ha2VEZWNsYXJhdG9yID0gKGFzc2lnbmVlLCB2YWx1ZSwgdmFsdWVJc0FscmVhZHlMYXp5LCBpc0V4cG9ydCkgPT4ge1xuXHRcdGNvbnN0IHsgbG9jLCBuYW1lLCBvcFR5cGUgfSA9IGFzc2lnbmVlXG5cdFx0Y29uc3QgaXNMYXp5ID0gYXNzaWduZWUuaXNMYXp5KClcblx0XHQvLyBUT0RPOiBhc3NlcnQoYXNzaWduZWUub3BUeXBlID09PSBudWxsKVxuXHRcdC8vIG9yIFRPRE86IEFsbG93IHR5cGUgY2hlY2sgb24gbGF6eSB2YWx1ZT9cblx0XHR2YWx1ZSA9IGlzTGF6eSA/IHZhbHVlIDogbWF5YmVXcmFwSW5DaGVja0NvbnRhaW5zKHZhbHVlLCBvcFR5cGUsIG5hbWUpXG5cdFx0aWYgKGlzRXhwb3J0KSB7XG5cdFx0XHQvLyBUT0RPOkVTNlxuXHRcdFx0Y29udGV4dC5jaGVjayghaXNMYXp5LCBsb2MsICdMYXp5IGV4cG9ydCBub3Qgc3VwcG9ydGVkLicpXG5cdFx0XHRyZXR1cm4gVmFyaWFibGVEZWNsYXJhdG9yKFxuXHRcdFx0XHRpZEZvckRlY2xhcmVDYWNoZWQoYXNzaWduZWUpLFxuXHRcdFx0XHRhc3NpZ25tZW50RXhwcmVzc2lvblBsYWluKG1lbWJlcihJZEV4cG9ydHMsIG5hbWUpLCB2YWx1ZSkpXG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IHZhbCA9IGlzTGF6eSAmJiAhdmFsdWVJc0FscmVhZHlMYXp5ID8gbGF6eVdyYXAodmFsdWUpIDogdmFsdWVcblx0XHRcdGFzc2VydChpc0xhenkgfHwgIXZhbHVlSXNBbHJlYWR5TGF6eSlcblx0XHRcdHJldHVybiBWYXJpYWJsZURlY2xhcmF0b3IoaWRGb3JEZWNsYXJlQ2FjaGVkKGFzc2lnbmVlKSwgdmFsKVxuXHRcdH1cblx0fSxcblxuXHRtYXliZVdyYXBJbkNoZWNrQ29udGFpbnMgPSAoYXN0LCBvcFR5cGUsIG5hbWUpID0+XG5cdFx0KGNvbnRleHQub3B0cy5pbmNsdWRlVHlwZUNoZWNrcygpICYmIG9wVHlwZSAhPT0gbnVsbCkgP1xuXHRcdFx0bXNDaGVja0NvbnRhaW5zKHQwKG9wVHlwZSksIGFzdCwgTGl0ZXJhbChuYW1lKSkgOlxuXHRcdFx0YXN0LFxuXG5cdGdldE1lbWJlciA9IChhc3RPYmplY3QsIGdvdE5hbWUsIGlzTGF6eSwgaXNNb2R1bGUpID0+XG5cdFx0aXNMYXp5ID9cblx0XHRtc0xhenlHZXQoYXN0T2JqZWN0LCBMaXRlcmFsKGdvdE5hbWUpKSA6XG5cdFx0aXNNb2R1bGUgJiYgY29udGV4dC5vcHRzLmluY2x1ZGVVc2VDaGVja3MoKSA/XG5cdFx0bXNHZXQoYXN0T2JqZWN0LCBMaXRlcmFsKGdvdE5hbWUpKSA6XG5cdFx0bWVtYmVyKGFzdE9iamVjdCwgZ290TmFtZSlcbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9