if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'esast/dist/ast', 'esast/dist/util', 'esast/dist/specialize', '../../MsAst', '../manglePath', '../util', './ast-constants', './ms-call', './util'], function (exports, module, _esastDistAst, _esastDistUtil, _esastDistSpecialize, _MsAst, _manglePath, _util, _astConstants, _msCall, _util2) {
	'use strict';

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _manglePath2 = _interopRequireDefault(_manglePath);

	let context, verifyResults, isInGenerator;

	module.exports = function (_context, moduleExpression, _verifyResults) {
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
	},
	      t1 = function (expr, arg) {
		return (0, _esastDistUtil.loc)(expr.transpileSubtree(arg), expr.loc);
	},
	      t3 = function (expr, arg, arg2, arg3) {
		return (0, _esastDistUtil.loc)(expr.transpileSubtree(arg, arg2, arg3), expr.loc);
	},
	      tLines = function (exprs) {
		const out = [];
		exprs.forEach(function (expr) {
			const ast = expr.transpileSubtree();
			if (ast instanceof Array)
				// Debug may produce multiple statements.
				ast.forEach(function (_) {
					return out.push((0, _esastDistUtil.toStatement)(_));
				});else out.push((0, _esastDistUtil.loc)((0, _esastDistUtil.toStatement)(ast), expr.loc));
		});
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

		Continue: function () {
			return (0, _esastDistAst.ContinueStatement)();
		},

		// TODO: includeInoutChecks is misnamed
		Debug: function () {
			return context.opts.includeInoutChecks() ? tLines(this.lines) : [];
		},

		ObjSimple: function () {
			return (0, _esastDistAst.ObjectExpression)(this.pairs.map(function (pair) {
				return (0, _esastDistSpecialize.property)('init', (0, _esastDistUtil.propertyIdOrLiteralCached)(pair.key), t0(pair.value));
			}));
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
				return (0, _util.flatOpMap)(_this2.args, function (_) {
					return (
						// TODO: Way to typecheck lazies
						(0, _util.opIf)(!_.isLazy(), function () {
							return (0, _util.opMap)(_.opType, function (type) {
								return (0, _esastDistAst.ExpressionStatement)((0, _msCall.msCheckContains)(t0(type), (0, _util2.accessLocalDeclare)(_), (0, _esastDistAst.Literal)(_.name)));
							});
						})
					);
				});
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

		ObjEntry: function () {
			var _this3 = this;

			return this.assign instanceof _MsAst.AssignSingle && !this.assign.assignee.isLazy() ? t1(this.assign, function (val) {
				return (0, _esastDistSpecialize.assignmentExpressionPlain)((0, _esastDistUtil.member)(_astConstants.IdBuilt, _this3.assign.assignee.name), val);
			}) : (0, _util.cat)(t0(this.assign), this.assign.allAssignees().map(function (_) {
				return (0, _msCall.msSetLazy)(_astConstants.IdBuilt, (0, _esastDistAst.Literal)(_.name), (0, _util2.idForDeclareCached)(_));
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
			// TODO:ES6 use template strings
			const part0 = this.parts[0];

			var _ref = typeof part0 === 'string' ? [(0, _esastDistAst.Literal)(part0), (0, _util.tail)(this.parts)] : [_astConstants.LitEmptyString, this.parts];

			var _ref2 = _slicedToArray(_ref, 2);

			const first = _ref2[0];
			const restParts = _ref2[1];

			return restParts.reduce(function (ex, _) {
				return (0, _esastDistAst.BinaryExpression)('+', ex, typeof _ === 'string' ? (0, _esastDistAst.Literal)(_) : (0, _msCall.msShow)(t0(_)));
			}, first);
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
		return (0, _util.ifElse)(opIteratee, function (_ref3) {
			let element = _ref3.element;
			let bag = _ref3.bag;

			const declare = (0, _esastDistAst.VariableDeclaration)('let', [(0, _esastDistAst.VariableDeclarator)(t0(element))]);
			// TODO:ES6 shouldn't have to explicitly get iterator
			const iter = (0, _esastDistAst.CallExpression)((0, _esastDistAst.MemberExpression)(t0(bag), _astConstants.SymbolIterator, true), []);
			return (0, _esastDistAst.ForOfStatement)(declare, iter, t0(block));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS90cmFuc3BpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBMkJBLEtBQUksT0FBTyxFQUFFLGFBQWEsRUFBRSxhQUFhLENBQUE7O2tCQUUxQixVQUFDLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUs7QUFDOUQsU0FBTyxHQUFHLFFBQVEsQ0FBQTtBQUNsQixlQUFhLEdBQUcsY0FBYyxDQUFBO0FBQzlCLGVBQWEsR0FBRyxLQUFLLENBQUE7QUFDckIsUUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLENBQUE7O0FBRWhDLFNBQU8sR0FBRyxhQUFhLEdBQUcsU0FBUyxDQUFBO0FBQ25DLFNBQU8sR0FBRyxDQUFBO0VBQ1Y7O0FBRUQsT0FDQyxFQUFFLEdBQUcsVUFBQSxJQUFJO1NBQUksbUJBbENLLEdBQUcsRUFrQ0osSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQztFQUFBO09BQ25ELEVBQUUsR0FBRyxVQUFDLElBQUksRUFBRSxHQUFHO1NBQUssbUJBbkNGLEdBQUcsRUFtQ0csSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUM7RUFBQTtPQUM3RCxFQUFFLEdBQUcsVUFBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJO1NBQUssbUJBcENkLEdBQUcsRUFvQ2UsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQztFQUFBO09BQ3JGLE1BQU0sR0FBRyxVQUFBLEtBQUssRUFBSTtBQUNqQixRQUFNLEdBQUcsR0FBRyxFQUFHLENBQUE7QUFDZixPQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSSxFQUFJO0FBQ3JCLFNBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxn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QUFrQixDQUFDLENBQUE7QUFDckMsVUFBTyxrQkF0YjZCLGtCQUFrQixFQXNiNUIsV0FqYTVCLGtCQUFrQixFQWlhNkIsUUFBUSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUE7R0FDNUQ7RUFDRDtPQUVELHdCQUF3QixHQUFHLFVBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJO1NBQzVDLEFBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLE1BQU0sS0FBSyxJQUFJLEdBQ25ELFlBM2FnRSxlQUFlLEVBMmEvRCxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsR0FBRyxFQUFFLGtCQTliMEIsT0FBTyxFQThiekIsSUFBSSxDQUFDLENBQUMsR0FDL0MsR0FBRztFQUFBO09BRUwsU0FBUyxHQUFHLFVBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUTtTQUNoRCxNQUFNLEdBQ04sWUEvYTBELFNBQVMsRUErYXpELFNBQVMsRUFBRSxrQkFuY3VDLE9BQU8sRUFtY3RDLE9BQU8sQ0FBQyxDQUFDLEdBQ3RDLFFBQVEsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEdBQzNDLFlBamJVLEtBQUssRUFpYlQsU0FBUyxFQUFFLGtCQXJjMkMsT0FBTyxFQXFjMUMsT0FBTyxDQUFDLENBQUMsR0FDbEMsbUJBbGNzQixNQUFNLEVBa2NyQixTQUFTLEVBQUUsT0FBTyxDQUFDO0VBQUEsQ0FBQSIsImZpbGUiOiJtZXRhL2NvbXBpbGUvcHJpdmF0ZS90cmFuc3BpbGUvdHJhbnNwaWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXJyYXlFeHByZXNzaW9uLCBCaW5hcnlFeHByZXNzaW9uLCBCbG9ja1N0YXRlbWVudCwgQnJlYWtTdGF0ZW1lbnQsIENhbGxFeHByZXNzaW9uLFxuXHRDb25kaXRpb25hbEV4cHJlc3Npb24sIENvbnRpbnVlU3RhdGVtZW50LCBEZWJ1Z2dlclN0YXRlbWVudCwgRXhwcmVzc2lvblN0YXRlbWVudCxcblx0Rm9yT2ZTdGF0ZW1lbnQsIEZ1bmN0aW9uRXhwcmVzc2lvbiwgSWRlbnRpZmllciwgSWZTdGF0ZW1lbnQsIExpdGVyYWwsIE1lbWJlckV4cHJlc3Npb24sXG5cdE9iamVjdEV4cHJlc3Npb24sIFByb2dyYW0sIFJldHVyblN0YXRlbWVudCwgVGhpc0V4cHJlc3Npb24sIFRocm93U3RhdGVtZW50LFxuXHRWYXJpYWJsZURlY2xhcmF0aW9uLCBVbmFyeUV4cHJlc3Npb24sIFZhcmlhYmxlRGVjbGFyYXRvciwgUmV0dXJuU3RhdGVtZW50XG5cdH0gZnJvbSAnZXNhc3QvZGlzdC9hc3QnXG5pbXBvcnQgeyBpZENhY2hlZCwgbG9jLCBtZW1iZXIsIHByb3BlcnR5SWRPckxpdGVyYWxDYWNoZWQsIHRvU3RhdGVtZW50IH0gZnJvbSAnZXNhc3QvZGlzdC91dGlsJ1xuaW1wb3J0IHsgYXNzaWdubWVudEV4cHJlc3Npb25QbGFpbiwgY2FsbEV4cHJlc3Npb25UaHVuaywgZnVuY3Rpb25FeHByZXNzaW9uUGxhaW4sXG5cdGZ1bmN0aW9uRXhwcmVzc2lvblRodW5rLCBtZW1iZXJFeHByZXNzaW9uLCBwcm9wZXJ0eSxcblx0eWllbGRFeHByZXNzaW9uRGVsZWdhdGUsIHlpZWxkRXhwcmVzc2lvbk5vRGVsZWdhdGUgfSBmcm9tICdlc2FzdC9kaXN0L3NwZWNpYWxpemUnXG5pbXBvcnQgKiBhcyBNc0FzdFR5cGVzIGZyb20gJy4uLy4uL01zQXN0J1xuaW1wb3J0IHsgQXNzaWduU2luZ2xlLCBMRF9MYXp5LCBMRF9NdXRhYmxlLCBQYXR0ZXJuLCBTcGxhdCwgU0RfRGVidWdnZXIsIFNWX0NvbnRhaW5zLFxuXHRTVl9GYWxzZSwgU1ZfTnVsbCwgU1ZfU3ViLCBTVl9UaGlzLCBTVl9UaGlzTW9kdWxlRGlyZWN0b3J5LCBTVl9UcnVlLCBTVl9VbmRlZmluZWRcblx0fSBmcm9tICcuLi8uLi9Nc0FzdCdcbmltcG9ydCBtYW5nbGVQYXRoIGZyb20gJy4uL21hbmdsZVBhdGgnXG5pbXBvcnQgeyBhc3NlcnQsIGNhdCwgZmxhdE1hcCwgZmxhdE9wTWFwLCBpZkVsc2UsIGlzRW1wdHksXG5cdGltcGxlbWVudE1hbnksIGlzUG9zaXRpdmUsIG9wSWYsIG9wTWFwLCB0YWlsLCB1bnNoaWZ0IH0gZnJvbSAnLi4vdXRpbCdcbmltcG9ydCB7IEFtZGVmaW5lSGVhZGVyLCBBcnJheVNsaWNlQ2FsbCwgRGVjbGFyZUJ1aWx0QmFnLCBEZWNsYXJlQnVpbHRNYXAsIERlY2xhcmVCdWlsdE9iaixcblx0RXhwb3J0c0RlZmF1bHQsIEV4cG9ydHNHZXQsIElkQXJndW1lbnRzLCBJZEJ1aWx0LCBJZERlZmluZSwgSWRFeHBvcnRzLCBJZEV4dHJhY3QsXG5cdElkRnVuY3Rpb25BcHBseUNhbGwsIExpdEVtcHR5QXJyYXksIExpdEVtcHR5U3RyaW5nLCBMaXROdWxsLCBMaXRTdHJFeHBvcnRzLCBMaXRTdHJPaE5vLCBMaXRaZXJvLFxuXHRSZXR1cm5CdWlsdCwgUmV0dXJuRXhwb3J0cywgUmV0dXJuUmVzLCBTeW1ib2xJdGVyYXRvciwgVXNlU3RyaWN0IH0gZnJvbSAnLi9hc3QtY29uc3RhbnRzJ1xuaW1wb3J0IHsgSWRNcywgbGF6eVdyYXAsIG1zQWRkLCBtc0FkZE1hbnksIG1zQXJyLCBtc0Fzc29jLCBtc0Jvb2wsIG1zQ2hlY2tDb250YWlucywgbXNFcnJvcixcblx0bXNFeHRyYWN0LCBtc0dldCwgbXNHZXREZWZhdWx0RXhwb3J0LCBtc0dldE1vZHVsZSwgbXNMYXp5LCBtc0xhenlHZXQsIG1zTGF6eUdldE1vZHVsZSwgbXNTZXQsXG5cdG1zU2V0TmFtZSwgbXNTZXRMYXp5LCBtc1Nob3csIG1zU29tZSwgTXNOb25lIH0gZnJvbSAnLi9tcy1jYWxsJ1xuaW1wb3J0IHsgYWNjZXNzTG9jYWxEZWNsYXJlLCBkZWNsYXJlLCBmb3JTdGF0ZW1lbnRJbmZpbml0ZSxcblx0aWRGb3JEZWNsYXJlQ2FjaGVkLCB0aHJvd0Vycm9yRnJvbVN0cmluZyB9IGZyb20gJy4vdXRpbCdcblxubGV0IGNvbnRleHQsIHZlcmlmeVJlc3VsdHMsIGlzSW5HZW5lcmF0b3JcblxuZXhwb3J0IGRlZmF1bHQgKF9jb250ZXh0LCBtb2R1bGVFeHByZXNzaW9uLCBfdmVyaWZ5UmVzdWx0cykgPT4ge1xuXHRjb250ZXh0ID0gX2NvbnRleHRcblx0dmVyaWZ5UmVzdWx0cyA9IF92ZXJpZnlSZXN1bHRzXG5cdGlzSW5HZW5lcmF0b3IgPSBmYWxzZVxuXHRjb25zdCByZXMgPSB0MChtb2R1bGVFeHByZXNzaW9uKVxuXHQvLyBSZWxlYXNlIGZvciBnYXJiYWdlIGNvbGxlY3Rpb24uXG5cdGNvbnRleHQgPSB2ZXJpZnlSZXN1bHRzID0gdW5kZWZpbmVkXG5cdHJldHVybiByZXNcbn1cblxuY29uc3Rcblx0dDAgPSBleHByID0+IGxvYyhleHByLnRyYW5zcGlsZVN1YnRyZWUoKSwgZXhwci5sb2MpLFxuXHR0MSA9IChleHByLCBhcmcpID0+IGxvYyhleHByLnRyYW5zcGlsZVN1YnRyZWUoYXJnKSwgZXhwci5sb2MpLFxuXHR0MyA9IChleHByLCBhcmcsIGFyZzIsIGFyZzMpID0+IGxvYyhleHByLnRyYW5zcGlsZVN1YnRyZWUoYXJnLCBhcmcyLCBhcmczKSwgZXhwci5sb2MpLFxuXHR0TGluZXMgPSBleHBycyA9PiB7XG5cdFx0Y29uc3Qgb3V0ID0gWyBdXG5cdFx0ZXhwcnMuZm9yRWFjaChleHByID0+IHtcblx0XHRcdGNvbnN0IGFzdCA9IGV4cHIudHJhbnNwaWxlU3VidHJlZSgpXG5cdFx0XHRpZiAoYXN0IGluc3RhbmNlb2YgQXJyYXkpXG5cdFx0XHRcdC8vIERlYnVnIG1heSBwcm9kdWNlIG11bHRpcGxlIHN0YXRlbWVudHMuXG5cdFx0XHRcdGFzdC5mb3JFYWNoKF8gPT4gb3V0LnB1c2godG9TdGF0ZW1lbnQoXykpKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRvdXQucHVzaChsb2ModG9TdGF0ZW1lbnQoYXN0KSwgZXhwci5sb2MpKVxuXHRcdH0pXG5cdFx0cmV0dXJuIG91dFxuXHR9XG5cbmltcGxlbWVudE1hbnkoTXNBc3RUeXBlcywgJ3RyYW5zcGlsZVN1YnRyZWUnLCB7XG5cdEFzc2lnblNpbmdsZSh2YWxXcmFwKSB7XG5cdFx0Y29uc3QgdmFsID0gdmFsV3JhcCA9PT0gdW5kZWZpbmVkID8gdDAodGhpcy52YWx1ZSkgOiB2YWxXcmFwKHQwKHRoaXMudmFsdWUpKVxuXHRcdGNvbnN0IGRlY2xhcmUgPVxuXHRcdFx0bWFrZURlY2xhcmF0b3IodGhpcy5hc3NpZ25lZSwgdmFsLCBmYWxzZSwgdmVyaWZ5UmVzdWx0cy5pc0V4cG9ydEFzc2lnbih0aGlzKSlcblx0XHRyZXR1cm4gVmFyaWFibGVEZWNsYXJhdGlvbih0aGlzLmFzc2lnbmVlLmlzTXV0YWJsZSgpID8gJ2xldCcgOiAnY29uc3QnLCBbIGRlY2xhcmUgXSlcblx0fSxcblx0Ly8gVE9ETzpFUzYgSnVzdCB1c2UgbmF0aXZlIGRlc3RydWN0dXJpbmcgYXNzaWduXG5cdEFzc2lnbkRlc3RydWN0dXJlKCkge1xuXHRcdHJldHVybiBWYXJpYWJsZURlY2xhcmF0aW9uKHRoaXMua2luZCgpID09PSBMRF9NdXRhYmxlID8gJ2xldCcgOiAnY29uc3QnLFxuXHRcdFx0bWFrZURlc3RydWN0dXJlRGVjbGFyYXRvcnMoXG5cdFx0XHRcdHRoaXMuYXNzaWduZWVzLFxuXHRcdFx0XHR0aGlzLmtpbmQoKSA9PT0gTERfTGF6eSxcblx0XHRcdFx0dDAodGhpcy52YWx1ZSksXG5cdFx0XHRcdGZhbHNlLFxuXHRcdFx0XHR2ZXJpZnlSZXN1bHRzLmlzRXhwb3J0QXNzaWduKHRoaXMpKSlcblx0fSxcblxuXHRCYWdFbnRyeSgpIHsgcmV0dXJuIG1zQWRkKElkQnVpbHQsIHQwKHRoaXMudmFsdWUpKSB9LFxuXG5cdEJhZ0VudHJ5TWFueSgpIHsgcmV0dXJuIG1zQWRkTWFueShJZEJ1aWx0LCB0MCh0aGlzLnZhbHVlKSkgfSxcblxuXHRCYWdTaW1wbGUoKSB7IHJldHVybiBBcnJheUV4cHJlc3Npb24odGhpcy5wYXJ0cy5tYXAodDApKSB9LFxuXG5cdEJsb2NrRG8obGVhZCA9IG51bGwsIG9wUmVzRGVjbGFyZSA9IG51bGwsIG9wT3V0ID0gbnVsbCkge1xuXHRcdGFzc2VydChvcFJlc0RlY2xhcmUgPT09IG51bGwpXG5cdFx0cmV0dXJuIEJsb2NrU3RhdGVtZW50KGNhdChsZWFkLCB0TGluZXModGhpcy5saW5lcyksIG9wT3V0KSlcblx0fSxcblxuXHRCbG9ja1ZhbE9oTm8obGVhZCA9IG51bGwsIG9wUmVzRGVjbGFyZSA9IG51bGwsIG9wT3V0ID0gbnVsbCkge1xuXHRcdGNvbnRleHQud2FybklmKG9wUmVzRGVjbGFyZSAhPT0gbnVsbCB8fCBvcE91dCAhPT0gbnVsbCwgdGhpcy5sb2MsXG5cdFx0XHQnT3V0IGNvbmRpdGlvbiBpZ25vcmVkIGJlY2F1c2Ugb2Ygb2gtbm8hJylcblx0XHRyZXR1cm4gQmxvY2tTdGF0ZW1lbnQoY2F0KGxlYWQsIHRMaW5lcyh0aGlzLmxpbmVzKSwgdDAodGhpcy5vaE5vKSkpXG5cdH0sXG5cblx0QmxvY2tXaXRoUmV0dXJuKGxlYWQsIG9wUmVzRGVjbGFyZSwgb3BPdXQpIHtcblx0XHRyZXR1cm4gdHJhbnNwaWxlQmxvY2sodDAodGhpcy5yZXR1cm5lZCksIHRMaW5lcyh0aGlzLmxpbmVzKSwgbGVhZCwgb3BSZXNEZWNsYXJlLCBvcE91dClcblx0fSxcblxuXHRCbG9ja0JhZyhsZWFkLCBvcFJlc0RlY2xhcmUsIG9wT3V0KSB7XG5cdFx0cmV0dXJuIHRyYW5zcGlsZUJsb2NrKFxuXHRcdFx0SWRCdWlsdCxcblx0XHRcdGNhdChEZWNsYXJlQnVpbHRCYWcsIHRMaW5lcyh0aGlzLmxpbmVzKSksXG5cdFx0XHRsZWFkLCBvcFJlc0RlY2xhcmUsIG9wT3V0KVxuXHR9LFxuXG5cdEJsb2NrT2JqKGxlYWQsIG9wUmVzRGVjbGFyZSwgb3BPdXQpIHtcblx0XHRjb25zdCBsaW5lcyA9IGNhdChEZWNsYXJlQnVpbHRPYmosIHRMaW5lcyh0aGlzLmxpbmVzKSlcblx0XHRjb25zdCByZXMgPSBpZkVsc2UodGhpcy5vcE9iamVkLFxuXHRcdFx0b2JqZWQgPT4gaWZFbHNlKHRoaXMub3BOYW1lLFxuXHRcdFx0XHRuYW1lID0+IG1zU2V0KHQwKG9iamVkKSwgSWRCdWlsdCwgTGl0ZXJhbChuYW1lKSksXG5cdFx0XHRcdCgpID0+IG1zU2V0KHQwKG9iamVkKSwgSWRCdWlsdCkpLFxuXHRcdFx0KCkgPT4gaWZFbHNlKHRoaXMub3BOYW1lLFxuXHRcdFx0XHRfID0+IG1zU2V0TmFtZShJZEJ1aWx0LCBMaXRlcmFsKF8pKSxcblx0XHRcdFx0KCkgPT4gSWRCdWlsdCkpXG5cdFx0cmV0dXJuIHRyYW5zcGlsZUJsb2NrKHJlcywgbGluZXMsIGxlYWQsIG9wUmVzRGVjbGFyZSwgb3BPdXQpXG5cdH0sXG5cblx0QmxvY2tNYXAobGVhZCwgb3BSZXNEZWNsYXJlLCBvcE91dCkge1xuXHRcdHJldHVybiB0cmFuc3BpbGVCbG9jayhcblx0XHRcdElkQnVpbHQsXG5cdFx0XHRjYXQoRGVjbGFyZUJ1aWx0TWFwLCB0TGluZXModGhpcy5saW5lcykpLFxuXHRcdFx0bGVhZCwgb3BSZXNEZWNsYXJlLCBvcE91dClcblx0fSxcblxuXHRCbG9ja1dyYXAoKSB7IHJldHVybiBibG9ja1dyYXAodDAodGhpcy5ibG9jaykpIH0sXG5cblx0QnJlYWtEbygpIHsgcmV0dXJuIEJyZWFrU3RhdGVtZW50KCkgfSxcblxuXHRCcmVha1ZhbCgpIHsgcmV0dXJuIFJldHVyblN0YXRlbWVudCh0MCh0aGlzLnZhbHVlKSkgfSxcblxuXHRDYWxsKCkge1xuXHRcdGNvbnN0IGFueVNwbGF0ID0gdGhpcy5hcmdzLnNvbWUoYXJnID0+IGFyZyBpbnN0YW5jZW9mIFNwbGF0KVxuXHRcdGlmIChhbnlTcGxhdCkge1xuXHRcdFx0Y29uc3QgYXJncyA9IHRoaXMuYXJncy5tYXAoYXJnID0+XG5cdFx0XHRcdGFyZyBpbnN0YW5jZW9mIFNwbGF0ID9cblx0XHRcdFx0XHRtc0Fycih0MChhcmcuc3BsYXR0ZWQpKSA6XG5cdFx0XHRcdFx0dDAoYXJnKSlcblx0XHRcdHJldHVybiBDYWxsRXhwcmVzc2lvbihJZEZ1bmN0aW9uQXBwbHlDYWxsLCBbXG5cdFx0XHRcdHQwKHRoaXMuY2FsbGVkKSxcblx0XHRcdFx0TGl0TnVsbCxcblx0XHRcdFx0Q2FsbEV4cHJlc3Npb24obWVtYmVyKExpdEVtcHR5QXJyYXksICdjb25jYXQnKSwgYXJncyldKVxuXHRcdH1cblx0XHRlbHNlIHJldHVybiBDYWxsRXhwcmVzc2lvbih0MCh0aGlzLmNhbGxlZCksIHRoaXMuYXJncy5tYXAodDApKVxuXHR9LFxuXG5cdENhc2VEbygpIHtcblx0XHRjb25zdCBib2R5ID0gY2FzZUJvZHkodGhpcy5wYXJ0cywgdGhpcy5vcEVsc2UpXG5cdFx0cmV0dXJuIGlmRWxzZSh0aGlzLm9wQ2FzZWQsIF8gPT4gQmxvY2tTdGF0ZW1lbnQoWyB0MChfKSwgYm9keSBdKSwgKCkgPT4gYm9keSlcblx0fSxcblxuXHRDYXNlVmFsKCkge1xuXHRcdGNvbnN0IGJvZHkgPSBjYXNlQm9keSh0aGlzLnBhcnRzLCB0aGlzLm9wRWxzZSlcblx0XHRjb25zdCBibG9jayA9IGlmRWxzZSh0aGlzLm9wQ2FzZWQsIF8gPT4gWyB0MChfKSwgYm9keSBdLCAoKSA9PiBbIGJvZHkgXSlcblx0XHRyZXR1cm4gYmxvY2tXcmFwKEJsb2NrU3RhdGVtZW50KGJsb2NrKSlcblx0fSxcblxuXHRDYXNlRG9QYXJ0OiBjYXNlUGFydCxcblx0Q2FzZVZhbFBhcnQ6IGNhc2VQYXJ0LFxuXG5cdENvbmRpdGlvbmFsRG8oKSB7XG5cdFx0cmV0dXJuIElmU3RhdGVtZW50KFxuXHRcdFx0dGhpcy5pc1VubGVzcyA/IFVuYXJ5RXhwcmVzc2lvbignIScsIG1heWJlQm9vbFdyYXAodDAodGhpcy50ZXN0KSkpIDogdDAodGhpcy50ZXN0KSxcblx0XHRcdHQwKHRoaXMucmVzdWx0KSlcblx0fSxcblxuXHRDb25kaXRpb25hbFZhbCgpIHtcblx0XHRjb25zdCB0ZXN0ID0gbWF5YmVCb29sV3JhcCh0MCh0aGlzLnRlc3QpKVxuXHRcdGNvbnN0IHJlc3VsdCA9IG1zU29tZShibG9ja1dyYXAodDAodGhpcy5yZXN1bHQpKSlcblx0XHRyZXR1cm4gdGhpcy5pc1VubGVzcyA/XG5cdFx0XHRDb25kaXRpb25hbEV4cHJlc3Npb24odGVzdCwgTXNOb25lLCByZXN1bHQpIDpcblx0XHRcdENvbmRpdGlvbmFsRXhwcmVzc2lvbih0ZXN0LCByZXN1bHQsIE1zTm9uZSlcblx0fSxcblxuXHRDb250aW51ZSgpIHsgcmV0dXJuIENvbnRpbnVlU3RhdGVtZW50KCkgfSxcblxuXHQvLyBUT0RPOiBpbmNsdWRlSW5vdXRDaGVja3MgaXMgbWlzbmFtZWRcblx0RGVidWcoKSB7IHJldHVybiBjb250ZXh0Lm9wdHMuaW5jbHVkZUlub3V0Q2hlY2tzKCkgPyB0TGluZXModGhpcy5saW5lcykgOiBbIF0gfSxcblxuXHRPYmpTaW1wbGUoKSB7XG5cdFx0cmV0dXJuIE9iamVjdEV4cHJlc3Npb24odGhpcy5wYWlycy5tYXAocGFpciA9PlxuXHRcdFx0cHJvcGVydHkoJ2luaXQnLCBwcm9wZXJ0eUlkT3JMaXRlcmFsQ2FjaGVkKHBhaXIua2V5KSwgdDAocGFpci52YWx1ZSkpKSlcblx0fSxcblxuXHRGb3JEbygpIHsgcmV0dXJuIGZvckxvb3AodGhpcy5vcEl0ZXJhdGVlLCB0aGlzLmJsb2NrKSB9LFxuXG5cdEZvckJhZygpIHtcblx0XHRyZXR1cm4gYmxvY2tXcmFwKEJsb2NrU3RhdGVtZW50KFtcblx0XHRcdERlY2xhcmVCdWlsdEJhZyxcblx0XHRcdGZvckxvb3AodGhpcy5vcEl0ZXJhdGVlLCB0aGlzLmJsb2NrKSxcblx0XHRcdFJldHVybkJ1aWx0XG5cdFx0XSkpXG5cdH0sXG5cblx0Rm9yVmFsKCkge1xuXHRcdHJldHVybiBibG9ja1dyYXAoQmxvY2tTdGF0ZW1lbnQoWyBmb3JMb29wKHRoaXMub3BJdGVyYXRlZSwgdGhpcy5ibG9jaykgXSkpXG5cdH0sXG5cblx0RnVuKCkge1xuXHRcdGNvbnN0IG9sZEluR2VuZXJhdG9yID0gaXNJbkdlbmVyYXRvclxuXHRcdGlzSW5HZW5lcmF0b3IgPSB0aGlzLmlzR2VuZXJhdG9yXG5cblx0XHQvLyBUT0RPOkVTNiB1c2UgYC4uLmBmXG5cdFx0Y29uc3QgbkFyZ3MgPSBMaXRlcmFsKHRoaXMuYXJncy5sZW5ndGgpXG5cdFx0Y29uc3Qgb3BEZWNsYXJlUmVzdCA9IG9wTWFwKHRoaXMub3BSZXN0QXJnLCByZXN0ID0+XG5cdFx0XHRkZWNsYXJlKHJlc3QsIENhbGxFeHByZXNzaW9uKEFycmF5U2xpY2VDYWxsLCBbSWRBcmd1bWVudHMsIG5BcmdzXSkpKVxuXHRcdGNvbnN0IGFyZ0NoZWNrcyA9XG5cdFx0XHRvcElmKGNvbnRleHQub3B0cy5pbmNsdWRlVHlwZUNoZWNrcygpLCAoKSA9PlxuXHRcdFx0XHRmbGF0T3BNYXAodGhpcy5hcmdzLCBfID0+XG5cdFx0XHRcdFx0Ly8gVE9ETzogV2F5IHRvIHR5cGVjaGVjayBsYXppZXNcblx0XHRcdFx0XHRvcElmKCFfLmlzTGF6eSgpLCAoKSA9PlxuXHRcdFx0XHRcdFx0b3BNYXAoXy5vcFR5cGUsIHR5cGUgPT5cblx0XHRcdFx0XHRcdFx0RXhwcmVzc2lvblN0YXRlbWVudChtc0NoZWNrQ29udGFpbnMoXG5cdFx0XHRcdFx0XHRcdFx0dDAodHlwZSksXG5cdFx0XHRcdFx0XHRcdFx0YWNjZXNzTG9jYWxEZWNsYXJlKF8pLFxuXHRcdFx0XHRcdFx0XHRcdExpdGVyYWwoXy5uYW1lKSkpKSkpKVxuXG5cdFx0Y29uc3QgX2luID0gb3BNYXAodGhpcy5vcEluLCB0MClcblx0XHRjb25zdCBsZWFkID0gY2F0KG9wRGVjbGFyZVJlc3QsIGFyZ0NoZWNrcywgX2luKVxuXG5cdFx0Y29uc3QgX291dCA9IG9wTWFwKHRoaXMub3BPdXQsIHQwKVxuXHRcdGNvbnN0IGJvZHkgPSB0Myh0aGlzLmJsb2NrLCBsZWFkLCB0aGlzLm9wUmVzRGVjbGFyZSwgX291dClcblx0XHRjb25zdCBhcmdzID0gdGhpcy5hcmdzLm1hcCh0MClcblx0XHRpc0luR2VuZXJhdG9yID0gb2xkSW5HZW5lcmF0b3Jcblx0XHRjb25zdCBpZCA9IG9wTWFwKHRoaXMubmFtZSwgaWRDYWNoZWQpXG5cdFx0cmV0dXJuIEZ1bmN0aW9uRXhwcmVzc2lvbihpZCwgYXJncywgYm9keSwgdGhpcy5pc0dlbmVyYXRvcilcblx0fSxcblxuXHRMYXp5KCkgeyByZXR1cm4gbGF6eVdyYXAodDAodGhpcy52YWx1ZSkpIH0sXG5cblx0TnVtYmVyTGl0ZXJhbCgpIHtcblx0XHQvLyBOZWdhdGl2ZSBudW1iZXJzIGFyZSBub3QgcGFydCBvZiBFUyBzcGVjLlxuXHRcdC8vIGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi81LjEvI3NlYy03LjguM1xuXHRcdGNvbnN0IGxpdCA9IExpdGVyYWwoTWF0aC5hYnModGhpcy52YWx1ZSkpXG5cdFx0cmV0dXJuIGlzUG9zaXRpdmUodGhpcy52YWx1ZSkgPyBsaXQgOiBVbmFyeUV4cHJlc3Npb24oJy0nLCBsaXQpXG5cdH0sXG5cblx0R2xvYmFsQWNjZXNzKCkgeyByZXR1cm4gSWRlbnRpZmllcih0aGlzLm5hbWUpIH0sXG5cblx0TG9jYWxBY2Nlc3MoKSB7IHJldHVybiBhY2Nlc3NMb2NhbERlY2xhcmUodmVyaWZ5UmVzdWx0cy5sb2NhbERlY2xhcmVGb3JBY2Nlc3ModGhpcykpIH0sXG5cblx0TG9jYWxEZWNsYXJlKCkgeyByZXR1cm4gaWRGb3JEZWNsYXJlQ2FjaGVkKHRoaXMpIH0sXG5cblx0TG9jYWxNdXRhdGUoKSB7XG5cdFx0cmV0dXJuIGFzc2lnbm1lbnRFeHByZXNzaW9uUGxhaW4oaWRDYWNoZWQodGhpcy5uYW1lKSwgdDAodGhpcy52YWx1ZSkpXG5cdH0sXG5cblx0TWFwRW50cnkoKSB7IHJldHVybiBtc0Fzc29jKElkQnVpbHQsIHQwKHRoaXMua2V5KSwgdDAodGhpcy52YWwpKSB9LFxuXG5cdE1lbWJlcigpIHsgcmV0dXJuIG1lbWJlcih0MCh0aGlzLm9iamVjdCksIHRoaXMubmFtZSkgfSxcblxuXHRNb2R1bGUoKSB7XG5cdFx0Y29uc3QgYm9keSA9IGNhdChcblx0XHRcdHRMaW5lcyh0aGlzLmxpbmVzKSxcblx0XHRcdG9wTWFwKHRoaXMub3BEZWZhdWx0RXhwb3J0LCBfID0+IGFzc2lnbm1lbnRFeHByZXNzaW9uUGxhaW4oRXhwb3J0c0RlZmF1bHQsIHQwKF8pKSkpXG5cdFx0cmV0dXJuIFByb2dyYW0oY2F0KFxuXHRcdFx0b3BJZihjb250ZXh0Lm9wdHMuaW5jbHVkZVVzZVN0cmljdCgpLCAoKSA9PiBVc2VTdHJpY3QpLFxuXHRcdFx0b3BJZihjb250ZXh0Lm9wdHMuaW5jbHVkZUFtZGVmaW5lKCksICgpID0+IEFtZGVmaW5lSGVhZGVyKSxcblx0XHRcdHRvU3RhdGVtZW50KGFtZFdyYXBNb2R1bGUodGhpcy5kb1VzZXMsIHRoaXMudXNlcy5jb25jYXQodGhpcy5kZWJ1Z1VzZXMpLCBib2R5KSkpKVxuXHR9LFxuXG5cdE9iakVudHJ5KCkge1xuXHRcdHJldHVybiAodGhpcy5hc3NpZ24gaW5zdGFuY2VvZiBBc3NpZ25TaW5nbGUgJiYgIXRoaXMuYXNzaWduLmFzc2lnbmVlLmlzTGF6eSgpKSA/XG5cdFx0XHR0MSh0aGlzLmFzc2lnbiwgdmFsID0+XG5cdFx0XHRcdGFzc2lnbm1lbnRFeHByZXNzaW9uUGxhaW4obWVtYmVyKElkQnVpbHQsIHRoaXMuYXNzaWduLmFzc2lnbmVlLm5hbWUpLCB2YWwpKSA6XG5cdFx0XHRjYXQoXG5cdFx0XHRcdHQwKHRoaXMuYXNzaWduKSxcblx0XHRcdFx0dGhpcy5hc3NpZ24uYWxsQXNzaWduZWVzKCkubWFwKF8gPT5cblx0XHRcdFx0XHRtc1NldExhenkoSWRCdWlsdCwgTGl0ZXJhbChfLm5hbWUpLCBpZEZvckRlY2xhcmVDYWNoZWQoXykpKSlcblx0fSxcblxuXHRPaE5vKCkge1xuXHRcdHJldHVybiBpZkVsc2UodGhpcy5vcFRocm93bixcblx0XHRcdF8gPT4gVGhyb3dTdGF0ZW1lbnQobXNFcnJvcih0MChfKSkpLFxuXHRcdFx0KCkgPT4gVGhyb3dTdGF0ZW1lbnQobXNFcnJvcihMaXRTdHJPaE5vKSkpXG5cdH0sXG5cblx0UXVvdGUoKSB7XG5cdFx0Ly8gVE9ETzpFUzYgdXNlIHRlbXBsYXRlIHN0cmluZ3Ncblx0XHRjb25zdCBwYXJ0MCA9IHRoaXMucGFydHNbMF1cblx0XHRjb25zdCBbIGZpcnN0LCByZXN0UGFydHMgXSA9XG5cdFx0XHR0eXBlb2YgcGFydDAgPT09ICdzdHJpbmcnID9cblx0XHRcdFx0WyBMaXRlcmFsKHBhcnQwKSwgdGFpbCh0aGlzLnBhcnRzKSBdIDpcblx0XHRcdFx0WyBMaXRFbXB0eVN0cmluZywgdGhpcy5wYXJ0cyBdXG5cdFx0cmV0dXJuIHJlc3RQYXJ0cy5yZWR1Y2UoXG5cdFx0XHQoZXgsIF8pID0+XG5cdFx0XHRcdEJpbmFyeUV4cHJlc3Npb24oJysnLCBleCwgdHlwZW9mIF8gPT09ICdzdHJpbmcnID8gTGl0ZXJhbChfKSA6IG1zU2hvdyh0MChfKSkpLFxuXHRcdFx0Zmlyc3QpXG5cdH0sXG5cblx0U3BlY2lhbERvKCkge1xuXHRcdHN3aXRjaCAodGhpcy5raW5kKSB7XG5cdFx0XHRjYXNlIFNEX0RlYnVnZ2VyOiByZXR1cm4gRGVidWdnZXJTdGF0ZW1lbnQoKVxuXHRcdFx0ZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKHRoaXMua2luZClcblx0XHR9XG5cdH0sXG5cblx0U3BlY2lhbFZhbCgpIHtcblx0XHQvLyBNYWtlIG5ldyBvYmplY3RzIGJlY2F1c2Ugd2Ugd2lsbCBhc3NpZ24gYGxvY2AgdG8gdGhlbS5cblx0XHRzd2l0Y2ggKHRoaXMua2luZCkge1xuXHRcdFx0Y2FzZSBTVl9Db250YWluczogcmV0dXJuIG1lbWJlcihJZE1zLCAnY29udGFpbnMnKVxuXHRcdFx0Y2FzZSBTVl9GYWxzZTogcmV0dXJuIExpdGVyYWwoZmFsc2UpXG5cdFx0XHRjYXNlIFNWX051bGw6IHJldHVybiBMaXRlcmFsKG51bGwpXG5cdFx0XHRjYXNlIFNWX1N1YjogcmV0dXJuIG1lbWJlcihJZE1zLCAnc3ViJylcblx0XHRcdGNhc2UgU1ZfVGhpczogcmV0dXJuIFx0VGhpc0V4cHJlc3Npb24oKVxuXHRcdFx0Y2FzZSBTVl9UaGlzTW9kdWxlRGlyZWN0b3J5OiByZXR1cm4gSWRlbnRpZmllcignX19kaXJuYW1lJylcblx0XHRcdGNhc2UgU1ZfVHJ1ZTogcmV0dXJuIExpdGVyYWwodHJ1ZSlcblx0XHRcdGNhc2UgU1ZfVW5kZWZpbmVkOiByZXR1cm4gVW5hcnlFeHByZXNzaW9uKCd2b2lkJywgTGl0WmVybylcblx0XHRcdGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcih0aGlzLmtpbmQpXG5cdFx0fVxuXHR9LFxuXG5cdFlpZWxkKCkgeyByZXR1cm4geWllbGRFeHByZXNzaW9uTm9EZWxlZ2F0ZSh0MCh0aGlzLnlpZWxkZWQpKSB9LFxuXG5cdFlpZWxkVG8oKSB7IHJldHVybiB5aWVsZEV4cHJlc3Npb25EZWxlZ2F0ZSh0MCh0aGlzLnlpZWxkZWRUbykpIH1cbn0pXG5cbmZ1bmN0aW9uIGNhc2VQYXJ0KGFsdGVybmF0ZSkge1xuXHRpZiAodGhpcy50ZXN0IGluc3RhbmNlb2YgUGF0dGVybikge1xuXHRcdGNvbnN0IHsgdHlwZSwgcGF0dGVybmVkLCBsb2NhbHMgfSA9IHRoaXMudGVzdFxuXHRcdGNvbnN0IGRlY2wgPSBWYXJpYWJsZURlY2xhcmF0aW9uKCdjb25zdCcsIFtcblx0XHRcdFZhcmlhYmxlRGVjbGFyYXRvcihJZEV4dHJhY3QsIG1zRXh0cmFjdCh0MCh0eXBlKSwgdDAocGF0dGVybmVkKSkpIF0pXG5cdFx0Y29uc3QgdGVzdCA9IEJpbmFyeUV4cHJlc3Npb24oJyE9PScsIElkRXh0cmFjdCwgTGl0TnVsbClcblx0XHRjb25zdCBleHRyYWN0ID0gVmFyaWFibGVEZWNsYXJhdGlvbignY29uc3QnLCBsb2NhbHMubWFwKChfLCBpZHgpID0+XG5cdFx0XHRWYXJpYWJsZURlY2xhcmF0b3IoaWRGb3JEZWNsYXJlQ2FjaGVkKF8pLCBtZW1iZXJFeHByZXNzaW9uKElkRXh0cmFjdCwgTGl0ZXJhbChpZHgpKSkpKVxuXHRcdGNvbnN0IHJlcyA9IHQxKHRoaXMucmVzdWx0LCBleHRyYWN0KVxuXHRcdHJldHVybiBCbG9ja1N0YXRlbWVudChbIGRlY2wsIElmU3RhdGVtZW50KHRlc3QsIHJlcywgYWx0ZXJuYXRlKSBdKVxuXHR9IGVsc2Vcblx0XHQvLyBhbHRlcm5hdGUgd3JpdHRlbiB0byBieSBgY2FzZUJvZHlgLlxuXHRcdHJldHVybiBJZlN0YXRlbWVudChtYXliZUJvb2xXcmFwKHQwKHRoaXMudGVzdCkpLCB0MCh0aGlzLnJlc3VsdCksIGFsdGVybmF0ZSlcbn1cblxuLy8gRnVuY3Rpb25zIHNwZWNpZmljIHRvIGNlcnRhaW4gZXhwcmVzc2lvbnMuXG5jb25zdFxuXHQvLyBXcmFwcyBhIGJsb2NrICh3aXRoIGByZXR1cm5gIHN0YXRlbWVudHMgaW4gaXQpIGluIGFuIElJRkUuXG5cdGJsb2NrV3JhcCA9IGJsb2NrID0+IHtcblx0XHRjb25zdCBpbnZva2UgPSBjYWxsRXhwcmVzc2lvblRodW5rKGZ1bmN0aW9uRXhwcmVzc2lvblRodW5rKGJsb2NrLCBpc0luR2VuZXJhdG9yKSlcblx0XHRyZXR1cm4gaXNJbkdlbmVyYXRvciA/IHlpZWxkRXhwcmVzc2lvbkRlbGVnYXRlKGludm9rZSkgOiBpbnZva2Vcblx0fSxcblxuXHRjYXNlQm9keSA9IChwYXJ0cywgb3BFbHNlKSA9PiB7XG5cdFx0bGV0IGFjYyA9IGlmRWxzZShvcEVsc2UsIHQwLCAoKSA9PiB0aHJvd0Vycm9yRnJvbVN0cmluZygnTm8gYnJhbmNoIG9mIGBjYXNlYCBtYXRjaGVzLicpKVxuXHRcdGZvciAobGV0IGkgPSBwYXJ0cy5sZW5ndGggLSAxOyBpID49IDA7IGkgPSBpIC0gMSlcblx0XHRcdGFjYyA9IHQxKHBhcnRzW2ldLCBhY2MpXG5cdFx0cmV0dXJuIGFjY1xuXHR9LFxuXG5cdGZvckxvb3AgPSAob3BJdGVyYXRlZSwgYmxvY2spID0+XG5cdFx0aWZFbHNlKG9wSXRlcmF0ZWUsXG5cdFx0XHQoeyBlbGVtZW50LCBiYWcgfSkgPT4ge1xuXHRcdFx0XHRjb25zdCBkZWNsYXJlID0gVmFyaWFibGVEZWNsYXJhdGlvbignbGV0JywgWyBWYXJpYWJsZURlY2xhcmF0b3IodDAoZWxlbWVudCkpIF0pXG5cdFx0XHRcdC8vIFRPRE86RVM2IHNob3VsZG4ndCBoYXZlIHRvIGV4cGxpY2l0bHkgZ2V0IGl0ZXJhdG9yXG5cdFx0XHRcdGNvbnN0IGl0ZXIgPSBDYWxsRXhwcmVzc2lvbihNZW1iZXJFeHByZXNzaW9uKHQwKGJhZyksIFN5bWJvbEl0ZXJhdG9yLCB0cnVlKSwgWyBdKVxuXHRcdFx0XHRyZXR1cm4gRm9yT2ZTdGF0ZW1lbnQoZGVjbGFyZSwgaXRlciwgdDAoYmxvY2spKVxuXHRcdFx0fSxcblx0XHRcdCgpID0+IGZvclN0YXRlbWVudEluZmluaXRlKHQwKGJsb2NrKSkpLFxuXG5cdHRyYW5zcGlsZUJsb2NrID0gKHJldHVybmVkLCBsaW5lcywgbGVhZCA9IG51bGwsIG9wUmVzRGVjbGFyZSA9IG51bGwsIG9wT3V0ID0gbnVsbCkgPT4ge1xuXHRcdGNvbnN0IGZpbiA9IGlmRWxzZShvcFJlc0RlY2xhcmUsXG5cdFx0XHRyZCA9PiB7XG5cdFx0XHRcdGNvbnN0IHJldCA9IG1heWJlV3JhcEluQ2hlY2tDb250YWlucyhyZXR1cm5lZCwgcmQub3BUeXBlLCByZC5uYW1lKVxuXHRcdFx0XHRyZXR1cm4gaWZFbHNlKG9wT3V0LFxuXHRcdFx0XHRcdF8gPT4gY2F0KGRlY2xhcmUocmQsIHJldCksIF8sIFJldHVyblJlcyksXG5cdFx0XHRcdFx0KCkgPT4gUmV0dXJuU3RhdGVtZW50KHJldCkpXG5cdFx0XHR9LFxuXHRcdFx0KCkgPT4gY2F0KG9wT3V0LCBSZXR1cm5TdGF0ZW1lbnQocmV0dXJuZWQpKSlcblx0XHRyZXR1cm4gQmxvY2tTdGF0ZW1lbnQoY2F0KGxlYWQsIGxpbmVzLCBmaW4pKVxuXHR9XG5cbi8vIE1vZHVsZSBoZWxwZXJzXG5jb25zdFxuXHRhbWRXcmFwTW9kdWxlID0gKGRvVXNlcywgb3RoZXJVc2VzLCBib2R5KSA9PiB7XG5cdFx0Y29uc3QgYWxsVXNlcyA9IGRvVXNlcy5jb25jYXQob3RoZXJVc2VzKVxuXHRcdGNvbnN0IHVzZVBhdGhzID0gQXJyYXlFeHByZXNzaW9uKGNhdChcblx0XHRcdExpdFN0ckV4cG9ydHMsXG5cdFx0XHRhbGxVc2VzLm1hcChfID0+IExpdGVyYWwobWFuZ2xlUGF0aChfLnBhdGgpKSkpKVxuXHRcdGNvbnN0IHVzZUlkZW50aWZpZXJzID0gYWxsVXNlcy5tYXAoKF8sIGkpID0+IGlkQ2FjaGVkKGAke3BhdGhCYXNlTmFtZShfLnBhdGgpfV8ke2l9YCkpXG5cdFx0Y29uc3QgdXNlQXJncyA9IGNhdChJZEV4cG9ydHMsIHVzZUlkZW50aWZpZXJzKVxuXHRcdGNvbnN0IHVzZURvcyA9IGRvVXNlcy5tYXAoKHVzZSwgaSkgPT5cblx0XHRcdGxvYyhFeHByZXNzaW9uU3RhdGVtZW50KG1zR2V0TW9kdWxlKHVzZUlkZW50aWZpZXJzW2ldKSksIHVzZS5sb2MpKVxuXHRcdGNvbnN0IG9wVXNlRGVjbGFyZSA9IG9wSWYoIWlzRW1wdHkob3RoZXJVc2VzKSxcblx0XHRcdCgpID0+IFZhcmlhYmxlRGVjbGFyYXRpb24oJ2NvbnN0JywgZmxhdE1hcChvdGhlclVzZXMsICh1c2UsIGkpID0+XG5cdFx0XHRcdHVzZURlY2xhcmF0b3JzKHVzZSwgdXNlSWRlbnRpZmllcnNbaSArIGRvVXNlcy5sZW5ndGhdKSkpKVxuXHRcdGNvbnN0IGZ1bGxCb2R5ID0gQmxvY2tTdGF0ZW1lbnQoY2F0KHVzZURvcywgb3BVc2VEZWNsYXJlLCBib2R5LCBSZXR1cm5FeHBvcnRzKSlcblx0XHRjb25zdCBsYXp5Qm9keSA9XG5cdFx0XHRjb250ZXh0Lm9wdHMubGF6eU1vZHVsZSgpID9cblx0XHRcdFx0QmxvY2tTdGF0ZW1lbnQoWyBFeHByZXNzaW9uU3RhdGVtZW50KFxuXHRcdFx0XHRcdGFzc2lnbm1lbnRFeHByZXNzaW9uUGxhaW4oRXhwb3J0c0dldCxcblx0XHRcdFx0XHRcdG1zTGF6eShmdW5jdGlvbkV4cHJlc3Npb25UaHVuayhmdWxsQm9keSkpKSkgXSkgOlxuXHRcdFx0XHRmdWxsQm9keVxuXHRcdHJldHVybiBDYWxsRXhwcmVzc2lvbihJZERlZmluZSwgWyB1c2VQYXRocywgZnVuY3Rpb25FeHByZXNzaW9uUGxhaW4odXNlQXJncywgbGF6eUJvZHkpIF0pXG5cdH0sXG5cblx0cGF0aEJhc2VOYW1lID0gcGF0aCA9PlxuXHRcdHBhdGguc3Vic3RyKHBhdGgubGFzdEluZGV4T2YoJy8nKSArIDEpLFxuXG5cdHVzZURlY2xhcmF0b3JzID0gKHVzZSwgbW9kdWxlSWRlbnRpZmllcikgPT4ge1xuXHRcdC8vIFRPRE86IENvdWxkIGJlIG5lYXRlciBhYm91dCB0aGlzXG5cdFx0Y29uc3QgaXNMYXp5ID0gKGlzRW1wdHkodXNlLnVzZWQpID8gdXNlLm9wVXNlRGVmYXVsdCA6IHVzZS51c2VkWzBdKS5pc0xhenkoKVxuXHRcdGNvbnN0IHZhbHVlID0gKGlzTGF6eSA/IG1zTGF6eUdldE1vZHVsZSA6IG1zR2V0TW9kdWxlKShtb2R1bGVJZGVudGlmaWVyKVxuXG5cdFx0Y29uc3QgdXNlZERlZmF1bHQgPSBvcE1hcCh1c2Uub3BVc2VEZWZhdWx0LCBkZWYgPT4ge1xuXHRcdFx0Y29uc3QgZGVmZXhwID0gbXNHZXREZWZhdWx0RXhwb3J0KG1vZHVsZUlkZW50aWZpZXIpXG5cdFx0XHRjb25zdCB2YWwgPSBpc0xhenkgPyBsYXp5V3JhcChkZWZleHApIDogZGVmZXhwXG5cdFx0XHRyZXR1cm4gbG9jKFZhcmlhYmxlRGVjbGFyYXRvcihpZEZvckRlY2xhcmVDYWNoZWQoZGVmKSwgdmFsKSwgZGVmLmxvYylcblx0XHR9KVxuXG5cdFx0Y29uc3QgdXNlZERlc3RydWN0ID0gaXNFbXB0eSh1c2UudXNlZCkgPyBudWxsIDpcblx0XHRcdG1ha2VEZXN0cnVjdHVyZURlY2xhcmF0b3JzKHVzZS51c2VkLCBpc0xhenksIHZhbHVlLCB0cnVlLCBmYWxzZSlcblxuXHRcdHJldHVybiBjYXQodXNlZERlZmF1bHQsIHVzZWREZXN0cnVjdClcblx0fVxuXG4vLyBHZW5lcmFsIHV0aWxzLiBOb3QgaW4gdXRpbC5qcyBiZWNhdXNlIHRoZXNlIGNsb3NlIG92ZXIgY29udGV4dC5cbmNvbnN0XG5cdG1heWJlQm9vbFdyYXAgPSBhc3QgPT5cblx0XHRjb250ZXh0Lm9wdHMuaW5jbHVkZUNhc2VDaGVja3MoKSA/IG1zQm9vbChhc3QpIDogYXN0LFxuXG5cdG1ha2VEZXN0cnVjdHVyZURlY2xhcmF0b3JzID0gKGFzc2lnbmVlcywgaXNMYXp5LCB2YWx1ZSwgaXNNb2R1bGUsIGlzRXhwb3J0KSA9PiB7XG5cdFx0Y29uc3QgZGVzdHJ1Y3R1cmVkTmFtZSA9IGBfJCR7YXNzaWduZWVzWzBdLmxvYy5zdGFydC5saW5lfWBcblx0XHRjb25zdCBpZERlc3RydWN0dXJlZCA9IElkZW50aWZpZXIoZGVzdHJ1Y3R1cmVkTmFtZSlcblx0XHRjb25zdCBkZWNsYXJhdG9ycyA9IGFzc2lnbmVlcy5tYXAoYXNzaWduZWUgPT4ge1xuXHRcdFx0Ly8gVE9ETzogRG9uJ3QgY29tcGlsZSBpdCBpZiBpdCdzIG5ldmVyIGFjY2Vzc2VkXG5cdFx0XHRjb25zdCBnZXQgPSBnZXRNZW1iZXIoaWREZXN0cnVjdHVyZWQsIGFzc2lnbmVlLm5hbWUsIGlzTGF6eSwgaXNNb2R1bGUpXG5cdFx0XHRyZXR1cm4gbWFrZURlY2xhcmF0b3IoYXNzaWduZWUsIGdldCwgaXNMYXp5LCBpc0V4cG9ydClcblx0XHR9KVxuXHRcdC8vIEdldHRpbmcgbGF6eSBtb2R1bGUgaXMgZG9uZSBieSBtcy5sYXp5R2V0TW9kdWxlLlxuXHRcdGNvbnN0IHZhbCA9IChpc0xhenkgJiYgIWlzTW9kdWxlKSA/IGxhenlXcmFwKHZhbHVlKSA6IHZhbHVlXG5cdFx0cmV0dXJuIHVuc2hpZnQoVmFyaWFibGVEZWNsYXJhdG9yKGlkRGVzdHJ1Y3R1cmVkLCB2YWwpLCBkZWNsYXJhdG9ycylcblx0fSxcblxuXHRtYWtlRGVjbGFyYXRvciA9IChhc3NpZ25lZSwgdmFsdWUsIHZhbHVlSXNBbHJlYWR5TGF6eSwgaXNFeHBvcnQpID0+IHtcblx0XHRjb25zdCB7IGxvYywgbmFtZSwgb3BUeXBlIH0gPSBhc3NpZ25lZVxuXHRcdGNvbnN0IGlzTGF6eSA9IGFzc2lnbmVlLmlzTGF6eSgpXG5cdFx0Ly8gVE9ETzogYXNzZXJ0KGFzc2lnbmVlLm9wVHlwZSA9PT0gbnVsbClcblx0XHQvLyBvciBUT0RPOiBBbGxvdyB0eXBlIGNoZWNrIG9uIGxhenkgdmFsdWU/XG5cdFx0dmFsdWUgPSBpc0xhenkgPyB2YWx1ZSA6IG1heWJlV3JhcEluQ2hlY2tDb250YWlucyh2YWx1ZSwgb3BUeXBlLCBuYW1lKVxuXHRcdGlmIChpc0V4cG9ydCkge1xuXHRcdFx0Ly8gVE9ETzpFUzZcblx0XHRcdGNvbnRleHQuY2hlY2soIWlzTGF6eSwgbG9jLCAnTGF6eSBleHBvcnQgbm90IHN1cHBvcnRlZC4nKVxuXHRcdFx0cmV0dXJuIFZhcmlhYmxlRGVjbGFyYXRvcihcblx0XHRcdFx0aWRGb3JEZWNsYXJlQ2FjaGVkKGFzc2lnbmVlKSxcblx0XHRcdFx0YXNzaWdubWVudEV4cHJlc3Npb25QbGFpbihtZW1iZXIoSWRFeHBvcnRzLCBuYW1lKSwgdmFsdWUpKVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCB2YWwgPSBpc0xhenkgJiYgIXZhbHVlSXNBbHJlYWR5TGF6eSA/IGxhenlXcmFwKHZhbHVlKSA6IHZhbHVlXG5cdFx0XHRhc3NlcnQoaXNMYXp5IHx8ICF2YWx1ZUlzQWxyZWFkeUxhenkpXG5cdFx0XHRyZXR1cm4gVmFyaWFibGVEZWNsYXJhdG9yKGlkRm9yRGVjbGFyZUNhY2hlZChhc3NpZ25lZSksIHZhbClcblx0XHR9XG5cdH0sXG5cblx0bWF5YmVXcmFwSW5DaGVja0NvbnRhaW5zID0gKGFzdCwgb3BUeXBlLCBuYW1lKSA9PlxuXHRcdChjb250ZXh0Lm9wdHMuaW5jbHVkZVR5cGVDaGVja3MoKSAmJiBvcFR5cGUgIT09IG51bGwpID9cblx0XHRcdG1zQ2hlY2tDb250YWlucyh0MChvcFR5cGUpLCBhc3QsIExpdGVyYWwobmFtZSkpIDpcblx0XHRcdGFzdCxcblxuXHRnZXRNZW1iZXIgPSAoYXN0T2JqZWN0LCBnb3ROYW1lLCBpc0xhenksIGlzTW9kdWxlKSA9PlxuXHRcdGlzTGF6eSA/XG5cdFx0bXNMYXp5R2V0KGFzdE9iamVjdCwgTGl0ZXJhbChnb3ROYW1lKSkgOlxuXHRcdGlzTW9kdWxlICYmIGNvbnRleHQub3B0cy5pbmNsdWRlVXNlQ2hlY2tzKCkgP1xuXHRcdG1zR2V0KGFzdE9iamVjdCwgTGl0ZXJhbChnb3ROYW1lKSkgOlxuXHRcdG1lbWJlcihhc3RPYmplY3QsIGdvdE5hbWUpXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==