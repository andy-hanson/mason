if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'esast/dist/ast', 'esast/dist/util', 'esast/dist/specialize', '../../MsAst', '../manglePath', '../util', './ast-constants', './ms-call', './util'], function (exports, module, _esastDistAst, _esastDistUtil, _esastDistSpecialize, _MsAst, _manglePath, _util, _astConstants, _msCall, _util2) {
	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }

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

		BagSimple: function () {
			return (0, _esastDistAst.ArrayExpression)(this.parts.map(t0));
		},

		BlockDo: function (_ref, _ref3, _ref4) {
			var _ref2 = _ref;
			let lead = _ref2 === undefined ? null : _ref2;
			var _ref32 = _ref3;
			let opResDeclare = _ref32 === undefined ? null : _ref32;
			var _ref42 = _ref4;
			let opOut = _ref42 === undefined ? null : _ref42;

			(0, _util.assert)(opResDeclare === null);
			return (0, _esastDistAst.BlockStatement)((0, _util.cat)(lead, tLines(this.lines), opOut));
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
			return blockWrap(this, t0(this.block));
		},

		BreakDo: function () {
			return (0, _esastDistAst.BreakStatement)();
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
			return blockWrap(this, (0, _esastDistAst.BlockStatement)(block));
		},

		CaseDoPart: casePart,
		CaseValPart: casePart,
		// TODO: includeInoutChecks is misnamed
		Debug: function () {
			return context.opts.includeInoutChecks() ? tLines(this.lines) : [];
		},

		ObjSimple: function () {
			return (0, _esastDistAst.ObjectExpression)(this.pairs.map(function (pair) {
				return (0, _esastDistSpecialize.property)('init', (0, _esastDistUtil.propertyIdOrLiteralCached)(pair.key), t0(pair.value));
			}));
		},

		ForDoPlain: function () {
			return (0, _util2.forStatementInfinite)(t0(this.block));
		},

		ForDoWithBag: function () {
			const declare = (0, _esastDistAst.VariableDeclaration)('let', [(0, _esastDistAst.VariableDeclarator)(t0(this.element))]);
			// TODO:ES6 shouldn't have to explicitly get iterator
			const iter = (0, _esastDistAst.CallExpression)((0, _esastDistAst.MemberExpression)(t0(this.bag), _astConstants.SymbolIterator, true), []);
			return (0, _esastDistAst.ForOfStatement)(declare, iter, t0(this.block));
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

		IfDo: function () {
			return (0, _esastDistAst.IfStatement)(maybeBoolWrap(t0(this.test)), t0(this.result));
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

		Quote: function () {
			// TODO:ES6 use template strings
			const part0 = this.parts[0];

			var _ref5 = typeof part0 === 'string' ? [(0, _esastDistAst.Literal)(part0), (0, _util.tail)(this.parts)] : [_astConstants.LitEmptyString, this.parts];

			var _ref52 = _slicedToArray(_ref5, 2);

			const first = _ref52[0];
			const restParts = _ref52[1];

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

		UnlessDo: function () {
			return (0, _esastDistAst.IfStatement)((0, _esastDistAst.UnaryExpression)('!', maybeBoolWrap(t0(this.test))), t0(this.result));
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
	const blockWrap = function (_, block) {
		const invoke = (0, _esastDistSpecialize.callExpressionThunk)((0, _esastDistSpecialize.functionExpressionThunk)(block, isInGenerator));
		return isInGenerator ? (0, _esastDistSpecialize.yieldExpressionDelegate)(invoke) : invoke;
	},
	      caseBody = function (parts, opElse) {
		let acc = (0, _util.ifElse)(opElse, t0, function () {
			return (0, _util2.throwError)('No branch of `case` matches.');
		});
		for (let i = parts.length - 1; i >= 0; i = i - 1) acc = t1(parts[i], acc);
		return acc;
	},
	      transpileBlock = function (returned, lines, _ref6, _ref7, _ref8) {
		var _ref62 = _ref6;
		let lead = _ref62 === undefined ? null : _ref62;
		var _ref72 = _ref7;
		let opResDeclare = _ref72 === undefined ? null : _ref72;
		var _ref82 = _ref8;
		let opOut = _ref82 === undefined ? null : _ref82;

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
			return (0, _esastDistUtil.idCached)('' + pathBaseName(_.path) + '_' + i);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS90cmFuc3BpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBMEJBLEtBQUksT0FBTyxFQUFFLGFBQWEsRUFBRSxhQUFhLENBQUE7O2tCQUUxQixVQUFDLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUs7QUFDOUQsU0FBTyxHQUFHLFFBQVEsQ0FBQTtBQUNsQixlQUFhLEdBQUcsY0FBYyxDQUFBO0FBQzlCLGVBQWEsR0FBRyxLQUFLLENBQUE7QUFDckIsUUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLENBQUE7O0FBRWhDLFNBQU8sR0FBRyxhQUFhLEdBQUcsU0FBUyxDQUFBO0FBQ25DLFNBQU8sR0FBRyxDQUFBO0VBQ1Y7O0FBRUQsT0FDQyxFQUFFLEdBQUcsVUFBQSxJQUFJO1NBQUksbUJBbENLLEdBQUcsRUFrQ0osSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQztFQUFBO09BQ25ELEVBQUUsR0FBRyxVQUFDLElBQUksRUFBRSxHQUFHO1NBQUssbUJBbkNGLEdBQUcsRUFtQ0csSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUM7RUFBQTtPQUM3RCxFQUFFLEdBQUcsVUFBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJO1NBQUssbUJBcENkLEdBQUcsRUFvQ2UsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQztFQUFBO09BQ3JGLE1BQU0sR0FBRyxVQUFBLEtBQUssRUFBSTtBQUNqQixRQUFNLEdBQUcsR0FBRyxFQUFHLENBQUE7QUFDZixPQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSSxFQUFJO0FBQ3JCLFNBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxn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LEVBeVlqRixTQUFTLEVBQUUsa0JBM1pMLE9BQU8sRUEyWk0sT0FBTyxDQUFDLENBQUMsR0FDbEMsbUJBelpzQixNQUFNLEVBeVpyQixTQUFTLEVBQUUsT0FBTyxDQUFDO0VBQUEsQ0FBQSIsImZpbGUiOiJtZXRhL2NvbXBpbGUvcHJpdmF0ZS90cmFuc3BpbGUvdHJhbnNwaWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXJyYXlFeHByZXNzaW9uLCBCaW5hcnlFeHByZXNzaW9uLCBCbG9ja1N0YXRlbWVudCwgQnJlYWtTdGF0ZW1lbnQsIENhbGxFeHByZXNzaW9uLFxuXHREZWJ1Z2dlclN0YXRlbWVudCwgRXhwcmVzc2lvblN0YXRlbWVudCwgRm9yT2ZTdGF0ZW1lbnQsIEZ1bmN0aW9uRXhwcmVzc2lvbiwgSWRlbnRpZmllcixcblx0SWZTdGF0ZW1lbnQsIExpdGVyYWwsIE1lbWJlckV4cHJlc3Npb24sIE9iamVjdEV4cHJlc3Npb24sIFByb2dyYW0sIFJldHVyblN0YXRlbWVudCxcblx0VGhpc0V4cHJlc3Npb24sIFZhcmlhYmxlRGVjbGFyYXRpb24sIFVuYXJ5RXhwcmVzc2lvbiwgVmFyaWFibGVEZWNsYXJhdG9yLCBSZXR1cm5TdGF0ZW1lbnRcblx0fSBmcm9tICdlc2FzdC9kaXN0L2FzdCdcbmltcG9ydCB7IGlkQ2FjaGVkLCBsb2MsIG1lbWJlciwgcHJvcGVydHlJZE9yTGl0ZXJhbENhY2hlZCwgdG9TdGF0ZW1lbnQgfSBmcm9tICdlc2FzdC9kaXN0L3V0aWwnXG5pbXBvcnQgeyBhc3NpZ25tZW50RXhwcmVzc2lvblBsYWluLCBjYWxsRXhwcmVzc2lvblRodW5rLCBmdW5jdGlvbkV4cHJlc3Npb25QbGFpbixcblx0ZnVuY3Rpb25FeHByZXNzaW9uVGh1bmssIG1lbWJlckV4cHJlc3Npb24sIHByb3BlcnR5LFxuXHR5aWVsZEV4cHJlc3Npb25EZWxlZ2F0ZSwgeWllbGRFeHByZXNzaW9uTm9EZWxlZ2F0ZSB9IGZyb20gJ2VzYXN0L2Rpc3Qvc3BlY2lhbGl6ZSdcbmltcG9ydCAqIGFzIE1zQXN0VHlwZXMgZnJvbSAnLi4vLi4vTXNBc3QnXG5pbXBvcnQgeyBBc3NpZ25TaW5nbGUsIExEX0xhenksIExEX011dGFibGUsIFBhdHRlcm4sIFNwbGF0LCBTRF9EZWJ1Z2dlciwgU1ZfQ29udGFpbnMsXG5cdFNWX0ZhbHNlLCBTVl9OdWxsLCBTVl9TdWIsIFNWX1RoaXMsIFNWX1RoaXNNb2R1bGVEaXJlY3RvcnksIFNWX1RydWUsIFNWX1VuZGVmaW5lZFxuXHR9IGZyb20gJy4uLy4uL01zQXN0J1xuaW1wb3J0IG1hbmdsZVBhdGggZnJvbSAnLi4vbWFuZ2xlUGF0aCdcbmltcG9ydCB7IGFzc2VydCwgY2F0LCBmbGF0TWFwLCBmbGF0T3BNYXAsIGlmRWxzZSwgaXNFbXB0eSxcblx0aW1wbGVtZW50TWFueSwgaXNQb3NpdGl2ZSwgb3BJZiwgb3BNYXAsIHRhaWwsIHVuc2hpZnQgfSBmcm9tICcuLi91dGlsJ1xuaW1wb3J0IHsgQW1kZWZpbmVIZWFkZXIsIEFycmF5U2xpY2VDYWxsLCBEZWNsYXJlQnVpbHRCYWcsIERlY2xhcmVCdWlsdE1hcCwgRGVjbGFyZUJ1aWx0T2JqLFxuXHRFeHBvcnRzRGVmYXVsdCwgRXhwb3J0c0dldCwgSWRBcmd1bWVudHMsIElkQnVpbHQsIElkRGVmaW5lLCBJZEV4cG9ydHMsIElkRXh0cmFjdCxcblx0SWRGdW5jdGlvbkFwcGx5Q2FsbCwgTGl0RW1wdHlBcnJheSwgTGl0RW1wdHlTdHJpbmcsIExpdE51bGwsIExpdFN0ckV4cG9ydHMsIExpdFplcm8sXG5cdFJldHVybkV4cG9ydHMsIFJldHVyblJlcywgU3ltYm9sSXRlcmF0b3IsIFVzZVN0cmljdCB9IGZyb20gJy4vYXN0LWNvbnN0YW50cydcbmltcG9ydCB7IElkTXMsIGxhenlXcmFwLCBtc0FkZCwgbXNBcnIsIG1zQXNzb2MsIG1zQm9vbCwgbXNDaGVja0NvbnRhaW5zLCBtc0V4dHJhY3QsIG1zR2V0LFxuXHRtc0dldERlZmF1bHRFeHBvcnQsIG1zR2V0TW9kdWxlLCBtc0xhenksIG1zTGF6eUdldCwgbXNMYXp5R2V0TW9kdWxlLCBtc1NldCwgbXNTZXROYW1lLFxuXHRtc1NldExhenksIG1zU2hvdyB9IGZyb20gJy4vbXMtY2FsbCdcbmltcG9ydCB7IGFjY2Vzc0xvY2FsRGVjbGFyZSwgZGVjbGFyZSwgZm9yU3RhdGVtZW50SW5maW5pdGUsXG5cdGlkRm9yRGVjbGFyZUNhY2hlZCwgdGhyb3dFcnJvciB9IGZyb20gJy4vdXRpbCdcblxubGV0IGNvbnRleHQsIHZlcmlmeVJlc3VsdHMsIGlzSW5HZW5lcmF0b3JcblxuZXhwb3J0IGRlZmF1bHQgKF9jb250ZXh0LCBtb2R1bGVFeHByZXNzaW9uLCBfdmVyaWZ5UmVzdWx0cykgPT4ge1xuXHRjb250ZXh0ID0gX2NvbnRleHRcblx0dmVyaWZ5UmVzdWx0cyA9IF92ZXJpZnlSZXN1bHRzXG5cdGlzSW5HZW5lcmF0b3IgPSBmYWxzZVxuXHRjb25zdCByZXMgPSB0MChtb2R1bGVFeHByZXNzaW9uKVxuXHQvLyBSZWxlYXNlIGZvciBnYXJiYWdlIGNvbGxlY3Rpb24uXG5cdGNvbnRleHQgPSB2ZXJpZnlSZXN1bHRzID0gdW5kZWZpbmVkXG5cdHJldHVybiByZXNcbn1cblxuY29uc3Rcblx0dDAgPSBleHByID0+IGxvYyhleHByLnRyYW5zcGlsZVN1YnRyZWUoKSwgZXhwci5sb2MpLFxuXHR0MSA9IChleHByLCBhcmcpID0+IGxvYyhleHByLnRyYW5zcGlsZVN1YnRyZWUoYXJnKSwgZXhwci5sb2MpLFxuXHR0MyA9IChleHByLCBhcmcsIGFyZzIsIGFyZzMpID0+IGxvYyhleHByLnRyYW5zcGlsZVN1YnRyZWUoYXJnLCBhcmcyLCBhcmczKSwgZXhwci5sb2MpLFxuXHR0TGluZXMgPSBleHBycyA9PiB7XG5cdFx0Y29uc3Qgb3V0ID0gWyBdXG5cdFx0ZXhwcnMuZm9yRWFjaChleHByID0+IHtcblx0XHRcdGNvbnN0IGFzdCA9IGV4cHIudHJhbnNwaWxlU3VidHJlZSgpXG5cdFx0XHRpZiAoYXN0IGluc3RhbmNlb2YgQXJyYXkpXG5cdFx0XHRcdC8vIERlYnVnIG1heSBwcm9kdWNlIG11bHRpcGxlIHN0YXRlbWVudHMuXG5cdFx0XHRcdGFzdC5mb3JFYWNoKF8gPT4gb3V0LnB1c2godG9TdGF0ZW1lbnQoXykpKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRvdXQucHVzaChsb2ModG9TdGF0ZW1lbnQoYXN0KSwgZXhwci5sb2MpKVxuXHRcdH0pXG5cdFx0cmV0dXJuIG91dFxuXHR9XG5cbmltcGxlbWVudE1hbnkoTXNBc3RUeXBlcywgJ3RyYW5zcGlsZVN1YnRyZWUnLCB7XG5cdEFzc2lnblNpbmdsZSh2YWxXcmFwKSB7XG5cdFx0Y29uc3QgdmFsID0gdmFsV3JhcCA9PT0gdW5kZWZpbmVkID8gdDAodGhpcy52YWx1ZSkgOiB2YWxXcmFwKHQwKHRoaXMudmFsdWUpKVxuXHRcdGNvbnN0IGRlY2xhcmUgPVxuXHRcdFx0bWFrZURlY2xhcmF0b3IodGhpcy5hc3NpZ25lZSwgdmFsLCBmYWxzZSwgdmVyaWZ5UmVzdWx0cy5pc0V4cG9ydEFzc2lnbih0aGlzKSlcblx0XHRyZXR1cm4gVmFyaWFibGVEZWNsYXJhdGlvbih0aGlzLmFzc2lnbmVlLmlzTXV0YWJsZSgpID8gJ2xldCcgOiAnY29uc3QnLCBbIGRlY2xhcmUgXSlcblx0fSxcblx0Ly8gVE9ETzpFUzYgSnVzdCB1c2UgbmF0aXZlIGRlc3RydWN0dXJpbmcgYXNzaWduXG5cdEFzc2lnbkRlc3RydWN0dXJlKCkge1xuXHRcdHJldHVybiBWYXJpYWJsZURlY2xhcmF0aW9uKHRoaXMua2luZCgpID09PSBMRF9NdXRhYmxlID8gJ2xldCcgOiAnY29uc3QnLFxuXHRcdFx0bWFrZURlc3RydWN0dXJlRGVjbGFyYXRvcnMoXG5cdFx0XHRcdHRoaXMuYXNzaWduZWVzLFxuXHRcdFx0XHR0aGlzLmtpbmQoKSA9PT0gTERfTGF6eSxcblx0XHRcdFx0dDAodGhpcy52YWx1ZSksXG5cdFx0XHRcdGZhbHNlLFxuXHRcdFx0XHR2ZXJpZnlSZXN1bHRzLmlzRXhwb3J0QXNzaWduKHRoaXMpKSlcblx0fSxcblxuXHRCYWdFbnRyeSgpIHsgcmV0dXJuIG1zQWRkKElkQnVpbHQsIHQwKHRoaXMudmFsdWUpKSB9LFxuXG5cdEJhZ1NpbXBsZSgpIHsgcmV0dXJuIEFycmF5RXhwcmVzc2lvbih0aGlzLnBhcnRzLm1hcCh0MCkpIH0sXG5cblx0QmxvY2tEbyhsZWFkID0gbnVsbCwgb3BSZXNEZWNsYXJlID0gbnVsbCwgb3BPdXQgPSBudWxsKSB7XG5cdFx0YXNzZXJ0KG9wUmVzRGVjbGFyZSA9PT0gbnVsbClcblx0XHRyZXR1cm4gQmxvY2tTdGF0ZW1lbnQoY2F0KGxlYWQsIHRMaW5lcyh0aGlzLmxpbmVzKSwgb3BPdXQpKVxuXHR9LFxuXG5cdEJsb2NrV2l0aFJldHVybihsZWFkLCBvcFJlc0RlY2xhcmUsIG9wT3V0KSB7XG5cdFx0cmV0dXJuIHRyYW5zcGlsZUJsb2NrKHQwKHRoaXMucmV0dXJuZWQpLCB0TGluZXModGhpcy5saW5lcyksIGxlYWQsIG9wUmVzRGVjbGFyZSwgb3BPdXQpXG5cdH0sXG5cblx0QmxvY2tCYWcobGVhZCwgb3BSZXNEZWNsYXJlLCBvcE91dCkge1xuXHRcdHJldHVybiB0cmFuc3BpbGVCbG9jayhcblx0XHRcdElkQnVpbHQsXG5cdFx0XHRjYXQoRGVjbGFyZUJ1aWx0QmFnLCB0TGluZXModGhpcy5saW5lcykpLFxuXHRcdFx0bGVhZCwgb3BSZXNEZWNsYXJlLCBvcE91dClcblx0fSxcblxuXHRCbG9ja09iaihsZWFkLCBvcFJlc0RlY2xhcmUsIG9wT3V0KSB7XG5cdFx0Y29uc3QgbGluZXMgPSBjYXQoRGVjbGFyZUJ1aWx0T2JqLCB0TGluZXModGhpcy5saW5lcykpXG5cdFx0Y29uc3QgcmVzID0gaWZFbHNlKHRoaXMub3BPYmplZCxcblx0XHRcdG9iamVkID0+IGlmRWxzZSh0aGlzLm9wTmFtZSxcblx0XHRcdFx0bmFtZSA9PiBtc1NldCh0MChvYmplZCksIElkQnVpbHQsIExpdGVyYWwobmFtZSkpLFxuXHRcdFx0XHQoKSA9PiBtc1NldCh0MChvYmplZCksIElkQnVpbHQpKSxcblx0XHRcdCgpID0+IGlmRWxzZSh0aGlzLm9wTmFtZSxcblx0XHRcdFx0XyA9PiBtc1NldE5hbWUoSWRCdWlsdCwgTGl0ZXJhbChfKSksXG5cdFx0XHRcdCgpID0+IElkQnVpbHQpKVxuXHRcdHJldHVybiB0cmFuc3BpbGVCbG9jayhyZXMsIGxpbmVzLCBsZWFkLCBvcFJlc0RlY2xhcmUsIG9wT3V0KVxuXHR9LFxuXG5cdEJsb2NrTWFwKGxlYWQsIG9wUmVzRGVjbGFyZSwgb3BPdXQpIHtcblx0XHRyZXR1cm4gdHJhbnNwaWxlQmxvY2soXG5cdFx0XHRJZEJ1aWx0LFxuXHRcdFx0Y2F0KERlY2xhcmVCdWlsdE1hcCwgdExpbmVzKHRoaXMubGluZXMpKSxcblx0XHRcdGxlYWQsIG9wUmVzRGVjbGFyZSwgb3BPdXQpXG5cdH0sXG5cblx0QmxvY2tXcmFwKCkgeyByZXR1cm4gYmxvY2tXcmFwKHRoaXMsIHQwKHRoaXMuYmxvY2spKSB9LFxuXG5cdEJyZWFrRG8oKSB7IHJldHVybiBCcmVha1N0YXRlbWVudCgpIH0sXG5cblx0Q2FsbCgpIHtcblx0XHRjb25zdCBhbnlTcGxhdCA9IHRoaXMuYXJncy5zb21lKGFyZyA9PiBhcmcgaW5zdGFuY2VvZiBTcGxhdClcblx0XHRpZiAoYW55U3BsYXQpIHtcblx0XHRcdGNvbnN0IGFyZ3MgPSB0aGlzLmFyZ3MubWFwKGFyZyA9PlxuXHRcdFx0XHRhcmcgaW5zdGFuY2VvZiBTcGxhdCA/XG5cdFx0XHRcdFx0bXNBcnIodDAoYXJnLnNwbGF0dGVkKSkgOlxuXHRcdFx0XHRcdHQwKGFyZykpXG5cdFx0XHRyZXR1cm4gQ2FsbEV4cHJlc3Npb24oSWRGdW5jdGlvbkFwcGx5Q2FsbCwgW1xuXHRcdFx0XHR0MCh0aGlzLmNhbGxlZCksXG5cdFx0XHRcdExpdE51bGwsXG5cdFx0XHRcdENhbGxFeHByZXNzaW9uKG1lbWJlcihMaXRFbXB0eUFycmF5LCAnY29uY2F0JyksIGFyZ3MpXSlcblx0XHR9XG5cdFx0ZWxzZSByZXR1cm4gQ2FsbEV4cHJlc3Npb24odDAodGhpcy5jYWxsZWQpLCB0aGlzLmFyZ3MubWFwKHQwKSlcblx0fSxcblxuXHRDYXNlRG8oKSB7XG5cdFx0Y29uc3QgYm9keSA9IGNhc2VCb2R5KHRoaXMucGFydHMsIHRoaXMub3BFbHNlKVxuXHRcdHJldHVybiBpZkVsc2UodGhpcy5vcENhc2VkLCBfID0+IEJsb2NrU3RhdGVtZW50KFsgdDAoXyksIGJvZHkgXSksICgpID0+IGJvZHkpXG5cdH0sXG5cblx0Q2FzZVZhbCgpIHtcblx0XHRjb25zdCBib2R5ID0gY2FzZUJvZHkodGhpcy5wYXJ0cywgdGhpcy5vcEVsc2UpXG5cdFx0Y29uc3QgYmxvY2sgPSBpZkVsc2UodGhpcy5vcENhc2VkLCBfID0+IFsgdDAoXyksIGJvZHkgXSwgKCkgPT4gWyBib2R5IF0pXG5cdFx0cmV0dXJuIGJsb2NrV3JhcCh0aGlzLCBCbG9ja1N0YXRlbWVudChibG9jaykpXG5cdH0sXG5cblx0Q2FzZURvUGFydDogY2FzZVBhcnQsXG5cdENhc2VWYWxQYXJ0OiBjYXNlUGFydCxcblx0Ly8gVE9ETzogaW5jbHVkZUlub3V0Q2hlY2tzIGlzIG1pc25hbWVkXG5cdERlYnVnKCkgeyByZXR1cm4gY29udGV4dC5vcHRzLmluY2x1ZGVJbm91dENoZWNrcygpID8gdExpbmVzKHRoaXMubGluZXMpIDogWyBdIH0sXG5cblx0T2JqU2ltcGxlKCkge1xuXHRcdHJldHVybiBPYmplY3RFeHByZXNzaW9uKHRoaXMucGFpcnMubWFwKHBhaXIgPT5cblx0XHRcdHByb3BlcnR5KCdpbml0JywgcHJvcGVydHlJZE9yTGl0ZXJhbENhY2hlZChwYWlyLmtleSksIHQwKHBhaXIudmFsdWUpKSkpXG5cdH0sXG5cblx0Rm9yRG9QbGFpbigpIHtcblx0XHRyZXR1cm4gZm9yU3RhdGVtZW50SW5maW5pdGUodDAodGhpcy5ibG9jaykpXG5cdH0sXG5cblx0Rm9yRG9XaXRoQmFnKCkge1xuXHRcdGNvbnN0IGRlY2xhcmUgPSBWYXJpYWJsZURlY2xhcmF0aW9uKCdsZXQnLCBbIFZhcmlhYmxlRGVjbGFyYXRvcih0MCh0aGlzLmVsZW1lbnQpKSBdKVxuXHRcdC8vIFRPRE86RVM2IHNob3VsZG4ndCBoYXZlIHRvIGV4cGxpY2l0bHkgZ2V0IGl0ZXJhdG9yXG5cdFx0Y29uc3QgaXRlciA9IENhbGxFeHByZXNzaW9uKE1lbWJlckV4cHJlc3Npb24odDAodGhpcy5iYWcpLCBTeW1ib2xJdGVyYXRvciwgdHJ1ZSksIFsgXSlcblx0XHRyZXR1cm4gRm9yT2ZTdGF0ZW1lbnQoZGVjbGFyZSwgaXRlciwgdDAodGhpcy5ibG9jaykpXG5cdH0sXG5cblx0RnVuKCkge1xuXHRcdGNvbnN0IG9sZEluR2VuZXJhdG9yID0gaXNJbkdlbmVyYXRvclxuXHRcdGlzSW5HZW5lcmF0b3IgPSB0aGlzLmlzR2VuZXJhdG9yXG5cblx0XHQvLyBUT0RPOkVTNiB1c2UgYC4uLmBmXG5cdFx0Y29uc3QgbkFyZ3MgPSBMaXRlcmFsKHRoaXMuYXJncy5sZW5ndGgpXG5cdFx0Y29uc3Qgb3BEZWNsYXJlUmVzdCA9IG9wTWFwKHRoaXMub3BSZXN0QXJnLCByZXN0ID0+XG5cdFx0XHRkZWNsYXJlKHJlc3QsIENhbGxFeHByZXNzaW9uKEFycmF5U2xpY2VDYWxsLCBbSWRBcmd1bWVudHMsIG5BcmdzXSkpKVxuXHRcdGNvbnN0IGFyZ0NoZWNrcyA9XG5cdFx0XHRvcElmKGNvbnRleHQub3B0cy5pbmNsdWRlVHlwZUNoZWNrcygpLCAoKSA9PlxuXHRcdFx0XHRmbGF0T3BNYXAodGhpcy5hcmdzLCBfID0+XG5cdFx0XHRcdFx0Ly8gVE9ETzogV2F5IHRvIHR5cGVjaGVjayBsYXppZXNcblx0XHRcdFx0XHRvcElmKCFfLmlzTGF6eSgpLCAoKSA9PlxuXHRcdFx0XHRcdFx0b3BNYXAoXy5vcFR5cGUsIHR5cGUgPT5cblx0XHRcdFx0XHRcdFx0RXhwcmVzc2lvblN0YXRlbWVudChtc0NoZWNrQ29udGFpbnMoXG5cdFx0XHRcdFx0XHRcdFx0dDAodHlwZSksXG5cdFx0XHRcdFx0XHRcdFx0YWNjZXNzTG9jYWxEZWNsYXJlKF8pLFxuXHRcdFx0XHRcdFx0XHRcdExpdGVyYWwoXy5uYW1lKSkpKSkpKVxuXG5cdFx0Y29uc3QgX2luID0gb3BNYXAodGhpcy5vcEluLCB0MClcblx0XHRjb25zdCBsZWFkID0gY2F0KG9wRGVjbGFyZVJlc3QsIGFyZ0NoZWNrcywgX2luKVxuXG5cdFx0Y29uc3QgX291dCA9IG9wTWFwKHRoaXMub3BPdXQsIHQwKVxuXHRcdGNvbnN0IGJvZHkgPSB0Myh0aGlzLmJsb2NrLCBsZWFkLCB0aGlzLm9wUmVzRGVjbGFyZSwgX291dClcblx0XHRjb25zdCBhcmdzID0gdGhpcy5hcmdzLm1hcCh0MClcblx0XHRpc0luR2VuZXJhdG9yID0gb2xkSW5HZW5lcmF0b3Jcblx0XHRjb25zdCBpZCA9IG9wTWFwKHRoaXMubmFtZSwgaWRDYWNoZWQpXG5cdFx0cmV0dXJuIEZ1bmN0aW9uRXhwcmVzc2lvbihpZCwgYXJncywgYm9keSwgdGhpcy5pc0dlbmVyYXRvcilcblx0fSxcblxuXHRMYXp5KCkgeyByZXR1cm4gbGF6eVdyYXAodDAodGhpcy52YWx1ZSkpIH0sXG5cblx0TnVtYmVyTGl0ZXJhbCgpIHtcblx0XHQvLyBOZWdhdGl2ZSBudW1iZXJzIGFyZSBub3QgcGFydCBvZiBFUyBzcGVjLlxuXHRcdC8vIGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi81LjEvI3NlYy03LjguM1xuXHRcdGNvbnN0IGxpdCA9IExpdGVyYWwoTWF0aC5hYnModGhpcy52YWx1ZSkpXG5cdFx0cmV0dXJuIGlzUG9zaXRpdmUodGhpcy52YWx1ZSkgPyBsaXQgOiBVbmFyeUV4cHJlc3Npb24oJy0nLCBsaXQpXG5cdH0sXG5cblx0R2xvYmFsQWNjZXNzKCkgeyByZXR1cm4gSWRlbnRpZmllcih0aGlzLm5hbWUpIH0sXG5cblx0SWZEbygpIHsgcmV0dXJuIElmU3RhdGVtZW50KG1heWJlQm9vbFdyYXAodDAodGhpcy50ZXN0KSksIHQwKHRoaXMucmVzdWx0KSkgfSxcblxuXHRMb2NhbEFjY2VzcygpIHsgcmV0dXJuIGFjY2Vzc0xvY2FsRGVjbGFyZSh2ZXJpZnlSZXN1bHRzLmxvY2FsRGVjbGFyZUZvckFjY2Vzcyh0aGlzKSkgfSxcblxuXHRMb2NhbERlY2xhcmUoKSB7IHJldHVybiBpZEZvckRlY2xhcmVDYWNoZWQodGhpcykgfSxcblxuXHRMb2NhbE11dGF0ZSgpIHtcblx0XHRyZXR1cm4gYXNzaWdubWVudEV4cHJlc3Npb25QbGFpbihpZENhY2hlZCh0aGlzLm5hbWUpLCB0MCh0aGlzLnZhbHVlKSlcblx0fSxcblxuXHRNYXBFbnRyeSgpIHsgcmV0dXJuIG1zQXNzb2MoSWRCdWlsdCwgdDAodGhpcy5rZXkpLCB0MCh0aGlzLnZhbCkpIH0sXG5cblx0TWVtYmVyKCkgeyByZXR1cm4gbWVtYmVyKHQwKHRoaXMub2JqZWN0KSwgdGhpcy5uYW1lKSB9LFxuXG5cdE1vZHVsZSgpIHtcblx0XHRjb25zdCBib2R5ID0gY2F0KFxuXHRcdFx0dExpbmVzKHRoaXMubGluZXMpLFxuXHRcdFx0b3BNYXAodGhpcy5vcERlZmF1bHRFeHBvcnQsIF8gPT4gYXNzaWdubWVudEV4cHJlc3Npb25QbGFpbihFeHBvcnRzRGVmYXVsdCwgdDAoXykpKSlcblx0XHRyZXR1cm4gUHJvZ3JhbShjYXQoXG5cdFx0XHRvcElmKGNvbnRleHQub3B0cy5pbmNsdWRlVXNlU3RyaWN0KCksICgpID0+IFVzZVN0cmljdCksXG5cdFx0XHRvcElmKGNvbnRleHQub3B0cy5pbmNsdWRlQW1kZWZpbmUoKSwgKCkgPT4gQW1kZWZpbmVIZWFkZXIpLFxuXHRcdFx0dG9TdGF0ZW1lbnQoYW1kV3JhcE1vZHVsZSh0aGlzLmRvVXNlcywgdGhpcy51c2VzLmNvbmNhdCh0aGlzLmRlYnVnVXNlcyksIGJvZHkpKSkpXG5cdH0sXG5cblx0T2JqRW50cnkoKSB7XG5cdFx0cmV0dXJuICh0aGlzLmFzc2lnbiBpbnN0YW5jZW9mIEFzc2lnblNpbmdsZSAmJiAhdGhpcy5hc3NpZ24uYXNzaWduZWUuaXNMYXp5KCkpID9cblx0XHRcdHQxKHRoaXMuYXNzaWduLCB2YWwgPT5cblx0XHRcdFx0YXNzaWdubWVudEV4cHJlc3Npb25QbGFpbihtZW1iZXIoSWRCdWlsdCwgdGhpcy5hc3NpZ24uYXNzaWduZWUubmFtZSksIHZhbCkpIDpcblx0XHRcdGNhdChcblx0XHRcdFx0dDAodGhpcy5hc3NpZ24pLFxuXHRcdFx0XHR0aGlzLmFzc2lnbi5hbGxBc3NpZ25lZXMoKS5tYXAoXyA9PlxuXHRcdFx0XHRcdG1zU2V0TGF6eShJZEJ1aWx0LCBMaXRlcmFsKF8ubmFtZSksIGlkRm9yRGVjbGFyZUNhY2hlZChfKSkpKVxuXHR9LFxuXG5cdFF1b3RlKCkge1xuXHRcdC8vIFRPRE86RVM2IHVzZSB0ZW1wbGF0ZSBzdHJpbmdzXG5cdFx0Y29uc3QgcGFydDAgPSB0aGlzLnBhcnRzWzBdXG5cdFx0Y29uc3QgWyBmaXJzdCwgcmVzdFBhcnRzIF0gPVxuXHRcdFx0dHlwZW9mIHBhcnQwID09PSAnc3RyaW5nJyA/XG5cdFx0XHRcdFsgTGl0ZXJhbChwYXJ0MCksIHRhaWwodGhpcy5wYXJ0cykgXSA6XG5cdFx0XHRcdFsgTGl0RW1wdHlTdHJpbmcsIHRoaXMucGFydHMgXVxuXHRcdHJldHVybiByZXN0UGFydHMucmVkdWNlKFxuXHRcdFx0KGV4LCBfKSA9PlxuXHRcdFx0XHRCaW5hcnlFeHByZXNzaW9uKCcrJywgZXgsIHR5cGVvZiBfID09PSAnc3RyaW5nJyA/IExpdGVyYWwoXykgOiBtc1Nob3codDAoXykpKSxcblx0XHRcdGZpcnN0KVxuXHR9LFxuXG5cdFNwZWNpYWxEbygpIHtcblx0XHRzd2l0Y2ggKHRoaXMua2luZCkge1xuXHRcdFx0Y2FzZSBTRF9EZWJ1Z2dlcjogcmV0dXJuIERlYnVnZ2VyU3RhdGVtZW50KClcblx0XHRcdGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcih0aGlzLmtpbmQpXG5cdFx0fVxuXHR9LFxuXG5cdFNwZWNpYWxWYWwoKSB7XG5cdFx0Ly8gTWFrZSBuZXcgb2JqZWN0cyBiZWNhdXNlIHdlIHdpbGwgYXNzaWduIGBsb2NgIHRvIHRoZW0uXG5cdFx0c3dpdGNoICh0aGlzLmtpbmQpIHtcblx0XHRcdGNhc2UgU1ZfQ29udGFpbnM6IHJldHVybiBtZW1iZXIoSWRNcywgJ2NvbnRhaW5zJylcblx0XHRcdGNhc2UgU1ZfRmFsc2U6IHJldHVybiBMaXRlcmFsKGZhbHNlKVxuXHRcdFx0Y2FzZSBTVl9OdWxsOiByZXR1cm4gTGl0ZXJhbChudWxsKVxuXHRcdFx0Y2FzZSBTVl9TdWI6IHJldHVybiBtZW1iZXIoSWRNcywgJ3N1YicpXG5cdFx0XHRjYXNlIFNWX1RoaXM6IHJldHVybiBcdFRoaXNFeHByZXNzaW9uKClcblx0XHRcdGNhc2UgU1ZfVGhpc01vZHVsZURpcmVjdG9yeTogcmV0dXJuIElkZW50aWZpZXIoJ19fZGlybmFtZScpXG5cdFx0XHRjYXNlIFNWX1RydWU6IHJldHVybiBMaXRlcmFsKHRydWUpXG5cdFx0XHRjYXNlIFNWX1VuZGVmaW5lZDogcmV0dXJuIFVuYXJ5RXhwcmVzc2lvbigndm9pZCcsIExpdFplcm8pXG5cdFx0XHRkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IodGhpcy5raW5kKVxuXHRcdH1cblx0fSxcblxuXHRVbmxlc3NEbygpIHtcblx0XHRyZXR1cm4gSWZTdGF0ZW1lbnQoVW5hcnlFeHByZXNzaW9uKCchJywgbWF5YmVCb29sV3JhcCh0MCh0aGlzLnRlc3QpKSksIHQwKHRoaXMucmVzdWx0KSlcblx0fSxcblxuXHRZaWVsZCgpIHsgcmV0dXJuIHlpZWxkRXhwcmVzc2lvbk5vRGVsZWdhdGUodDAodGhpcy55aWVsZGVkKSkgfSxcblxuXHRZaWVsZFRvKCkgeyByZXR1cm4geWllbGRFeHByZXNzaW9uRGVsZWdhdGUodDAodGhpcy55aWVsZGVkVG8pKSB9XG59KVxuXG5mdW5jdGlvbiBjYXNlUGFydChhbHRlcm5hdGUpIHtcblx0aWYgKHRoaXMudGVzdCBpbnN0YW5jZW9mIFBhdHRlcm4pIHtcblx0XHRjb25zdCB7IHR5cGUsIHBhdHRlcm5lZCwgbG9jYWxzIH0gPSB0aGlzLnRlc3Rcblx0XHRjb25zdCBkZWNsID0gVmFyaWFibGVEZWNsYXJhdGlvbignY29uc3QnLCBbXG5cdFx0XHRWYXJpYWJsZURlY2xhcmF0b3IoSWRFeHRyYWN0LCBtc0V4dHJhY3QodDAodHlwZSksIHQwKHBhdHRlcm5lZCkpKSBdKVxuXHRcdGNvbnN0IHRlc3QgPSBCaW5hcnlFeHByZXNzaW9uKCchPT0nLCBJZEV4dHJhY3QsIExpdE51bGwpXG5cdFx0Y29uc3QgZXh0cmFjdCA9IFZhcmlhYmxlRGVjbGFyYXRpb24oJ2NvbnN0JywgbG9jYWxzLm1hcCgoXywgaWR4KSA9PlxuXHRcdFx0VmFyaWFibGVEZWNsYXJhdG9yKGlkRm9yRGVjbGFyZUNhY2hlZChfKSwgbWVtYmVyRXhwcmVzc2lvbihJZEV4dHJhY3QsIExpdGVyYWwoaWR4KSkpKSlcblx0XHRjb25zdCByZXMgPSB0MSh0aGlzLnJlc3VsdCwgZXh0cmFjdClcblx0XHRyZXR1cm4gQmxvY2tTdGF0ZW1lbnQoWyBkZWNsLCBJZlN0YXRlbWVudCh0ZXN0LCByZXMsIGFsdGVybmF0ZSkgXSlcblx0fSBlbHNlXG5cdFx0Ly8gYWx0ZXJuYXRlIHdyaXR0ZW4gdG8gYnkgYGNhc2VCb2R5YC5cblx0XHRyZXR1cm4gSWZTdGF0ZW1lbnQobWF5YmVCb29sV3JhcCh0MCh0aGlzLnRlc3QpKSwgdDAodGhpcy5yZXN1bHQpLCBhbHRlcm5hdGUpXG59XG5cbi8vIEZ1bmN0aW9ucyBzcGVjaWZpYyB0byBjZXJ0YWluIGV4cHJlc3Npb25zLlxuY29uc3Rcblx0YmxvY2tXcmFwID0gKF8sIGJsb2NrKSA9PiB7XG5cdFx0Y29uc3QgaW52b2tlID0gY2FsbEV4cHJlc3Npb25UaHVuayhmdW5jdGlvbkV4cHJlc3Npb25UaHVuayhibG9jaywgaXNJbkdlbmVyYXRvcikpXG5cdFx0cmV0dXJuIGlzSW5HZW5lcmF0b3IgPyB5aWVsZEV4cHJlc3Npb25EZWxlZ2F0ZShpbnZva2UpIDogaW52b2tlXG5cdH0sXG5cblx0Y2FzZUJvZHkgPSAocGFydHMsIG9wRWxzZSkgPT4ge1xuXHRcdGxldCBhY2MgPSBpZkVsc2Uob3BFbHNlLCB0MCwgKCkgPT4gdGhyb3dFcnJvcignTm8gYnJhbmNoIG9mIGBjYXNlYCBtYXRjaGVzLicpKVxuXHRcdGZvciAobGV0IGkgPSBwYXJ0cy5sZW5ndGggLSAxOyBpID49IDA7IGkgPSBpIC0gMSlcblx0XHRcdGFjYyA9IHQxKHBhcnRzW2ldLCBhY2MpXG5cdFx0cmV0dXJuIGFjY1xuXHR9LFxuXG5cdHRyYW5zcGlsZUJsb2NrID0gKHJldHVybmVkLCBsaW5lcywgbGVhZCA9IG51bGwsIG9wUmVzRGVjbGFyZSA9IG51bGwsIG9wT3V0ID0gbnVsbCkgPT4ge1xuXHRcdGNvbnN0IGZpbiA9IGlmRWxzZShvcFJlc0RlY2xhcmUsXG5cdFx0XHRyZCA9PiB7XG5cdFx0XHRcdGNvbnN0IHJldCA9IG1heWJlV3JhcEluQ2hlY2tDb250YWlucyhyZXR1cm5lZCwgcmQub3BUeXBlLCByZC5uYW1lKVxuXHRcdFx0XHRyZXR1cm4gaWZFbHNlKG9wT3V0LFxuXHRcdFx0XHRcdF8gPT4gY2F0KGRlY2xhcmUocmQsIHJldCksIF8sIFJldHVyblJlcyksXG5cdFx0XHRcdFx0KCkgPT4gUmV0dXJuU3RhdGVtZW50KHJldCkpXG5cdFx0XHR9LFxuXHRcdFx0KCkgPT4gY2F0KG9wT3V0LCBSZXR1cm5TdGF0ZW1lbnQocmV0dXJuZWQpKSlcblx0XHRyZXR1cm4gQmxvY2tTdGF0ZW1lbnQoY2F0KGxlYWQsIGxpbmVzLCBmaW4pKVxuXHR9XG5cbi8vIE1vZHVsZSBoZWxwZXJzXG5jb25zdFxuXHRhbWRXcmFwTW9kdWxlID0gKGRvVXNlcywgb3RoZXJVc2VzLCBib2R5KSA9PiB7XG5cdFx0Y29uc3QgYWxsVXNlcyA9IGRvVXNlcy5jb25jYXQob3RoZXJVc2VzKVxuXHRcdGNvbnN0IHVzZVBhdGhzID0gQXJyYXlFeHByZXNzaW9uKGNhdChcblx0XHRcdExpdFN0ckV4cG9ydHMsXG5cdFx0XHRhbGxVc2VzLm1hcChfID0+IExpdGVyYWwobWFuZ2xlUGF0aChfLnBhdGgpKSkpKVxuXHRcdGNvbnN0IHVzZUlkZW50aWZpZXJzID0gYWxsVXNlcy5tYXAoKF8sIGkpID0+IGlkQ2FjaGVkKGAke3BhdGhCYXNlTmFtZShfLnBhdGgpfV8ke2l9YCkpXG5cdFx0Y29uc3QgdXNlQXJncyA9IGNhdChJZEV4cG9ydHMsIHVzZUlkZW50aWZpZXJzKVxuXHRcdGNvbnN0IHVzZURvcyA9IGRvVXNlcy5tYXAoKHVzZSwgaSkgPT5cblx0XHRcdGxvYyhFeHByZXNzaW9uU3RhdGVtZW50KG1zR2V0TW9kdWxlKHVzZUlkZW50aWZpZXJzW2ldKSksIHVzZS5sb2MpKVxuXHRcdGNvbnN0IG9wVXNlRGVjbGFyZSA9IG9wSWYoIWlzRW1wdHkob3RoZXJVc2VzKSxcblx0XHRcdCgpID0+IFZhcmlhYmxlRGVjbGFyYXRpb24oJ2NvbnN0JywgZmxhdE1hcChvdGhlclVzZXMsICh1c2UsIGkpID0+XG5cdFx0XHRcdHVzZURlY2xhcmF0b3JzKHVzZSwgdXNlSWRlbnRpZmllcnNbaSArIGRvVXNlcy5sZW5ndGhdKSkpKVxuXHRcdGNvbnN0IGZ1bGxCb2R5ID0gQmxvY2tTdGF0ZW1lbnQoY2F0KHVzZURvcywgb3BVc2VEZWNsYXJlLCBib2R5LCBSZXR1cm5FeHBvcnRzKSlcblx0XHRjb25zdCBsYXp5Qm9keSA9XG5cdFx0XHRjb250ZXh0Lm9wdHMubGF6eU1vZHVsZSgpID9cblx0XHRcdFx0QmxvY2tTdGF0ZW1lbnQoWyBFeHByZXNzaW9uU3RhdGVtZW50KFxuXHRcdFx0XHRcdGFzc2lnbm1lbnRFeHByZXNzaW9uUGxhaW4oRXhwb3J0c0dldCxcblx0XHRcdFx0XHRcdG1zTGF6eShmdW5jdGlvbkV4cHJlc3Npb25UaHVuayhmdWxsQm9keSkpKSkgXSkgOlxuXHRcdFx0XHRmdWxsQm9keVxuXHRcdHJldHVybiBDYWxsRXhwcmVzc2lvbihJZERlZmluZSwgWyB1c2VQYXRocywgZnVuY3Rpb25FeHByZXNzaW9uUGxhaW4odXNlQXJncywgbGF6eUJvZHkpIF0pXG5cdH0sXG5cblx0cGF0aEJhc2VOYW1lID0gcGF0aCA9PlxuXHRcdHBhdGguc3Vic3RyKHBhdGgubGFzdEluZGV4T2YoJy8nKSArIDEpLFxuXG5cdHVzZURlY2xhcmF0b3JzID0gKHVzZSwgbW9kdWxlSWRlbnRpZmllcikgPT4ge1xuXHRcdC8vIFRPRE86IENvdWxkIGJlIG5lYXRlciBhYm91dCB0aGlzXG5cdFx0Y29uc3QgaXNMYXp5ID0gKGlzRW1wdHkodXNlLnVzZWQpID8gdXNlLm9wVXNlRGVmYXVsdCA6IHVzZS51c2VkWzBdKS5pc0xhenkoKVxuXHRcdGNvbnN0IHZhbHVlID0gKGlzTGF6eSA/IG1zTGF6eUdldE1vZHVsZSA6IG1zR2V0TW9kdWxlKShtb2R1bGVJZGVudGlmaWVyKVxuXG5cdFx0Y29uc3QgdXNlZERlZmF1bHQgPSBvcE1hcCh1c2Uub3BVc2VEZWZhdWx0LCBkZWYgPT4ge1xuXHRcdFx0Y29uc3QgZGVmZXhwID0gbXNHZXREZWZhdWx0RXhwb3J0KG1vZHVsZUlkZW50aWZpZXIpXG5cdFx0XHRjb25zdCB2YWwgPSBpc0xhenkgPyBsYXp5V3JhcChkZWZleHApIDogZGVmZXhwXG5cdFx0XHRyZXR1cm4gbG9jKFZhcmlhYmxlRGVjbGFyYXRvcihpZEZvckRlY2xhcmVDYWNoZWQoZGVmKSwgdmFsKSwgZGVmLmxvYylcblx0XHR9KVxuXG5cdFx0Y29uc3QgdXNlZERlc3RydWN0ID0gaXNFbXB0eSh1c2UudXNlZCkgPyBudWxsIDpcblx0XHRcdG1ha2VEZXN0cnVjdHVyZURlY2xhcmF0b3JzKHVzZS51c2VkLCBpc0xhenksIHZhbHVlLCB0cnVlLCBmYWxzZSlcblxuXHRcdHJldHVybiBjYXQodXNlZERlZmF1bHQsIHVzZWREZXN0cnVjdClcblx0fVxuXG4vLyBHZW5lcmFsIHV0aWxzLiBOb3QgaW4gdXRpbC5qcyBiZWNhdXNlIHRoZXNlIGNsb3NlIG92ZXIgY29udGV4dC5cbmNvbnN0XG5cdG1heWJlQm9vbFdyYXAgPSBhc3QgPT5cblx0XHRjb250ZXh0Lm9wdHMuaW5jbHVkZUNhc2VDaGVja3MoKSA/IG1zQm9vbChhc3QpIDogYXN0LFxuXG5cdG1ha2VEZXN0cnVjdHVyZURlY2xhcmF0b3JzID0gKGFzc2lnbmVlcywgaXNMYXp5LCB2YWx1ZSwgaXNNb2R1bGUsIGlzRXhwb3J0KSA9PiB7XG5cdFx0Y29uc3QgZGVzdHJ1Y3R1cmVkTmFtZSA9IGBfJCR7YXNzaWduZWVzWzBdLmxvYy5zdGFydC5saW5lfWBcblx0XHRjb25zdCBpZERlc3RydWN0dXJlZCA9IElkZW50aWZpZXIoZGVzdHJ1Y3R1cmVkTmFtZSlcblx0XHRjb25zdCBkZWNsYXJhdG9ycyA9IGFzc2lnbmVlcy5tYXAoYXNzaWduZWUgPT4ge1xuXHRcdFx0Ly8gVE9ETzogRG9uJ3QgY29tcGlsZSBpdCBpZiBpdCdzIG5ldmVyIGFjY2Vzc2VkXG5cdFx0XHRjb25zdCBnZXQgPSBnZXRNZW1iZXIoaWREZXN0cnVjdHVyZWQsIGFzc2lnbmVlLm5hbWUsIGlzTGF6eSwgaXNNb2R1bGUpXG5cdFx0XHRyZXR1cm4gbWFrZURlY2xhcmF0b3IoYXNzaWduZWUsIGdldCwgaXNMYXp5LCBpc0V4cG9ydClcblx0XHR9KVxuXHRcdC8vIEdldHRpbmcgbGF6eSBtb2R1bGUgaXMgZG9uZSBieSBtcy5sYXp5R2V0TW9kdWxlLlxuXHRcdGNvbnN0IHZhbCA9IChpc0xhenkgJiYgIWlzTW9kdWxlKSA/IGxhenlXcmFwKHZhbHVlKSA6IHZhbHVlXG5cdFx0cmV0dXJuIHVuc2hpZnQoVmFyaWFibGVEZWNsYXJhdG9yKGlkRGVzdHJ1Y3R1cmVkLCB2YWwpLCBkZWNsYXJhdG9ycylcblx0fSxcblxuXHRtYWtlRGVjbGFyYXRvciA9IChhc3NpZ25lZSwgdmFsdWUsIHZhbHVlSXNBbHJlYWR5TGF6eSwgaXNFeHBvcnQpID0+IHtcblx0XHRjb25zdCB7IGxvYywgbmFtZSwgb3BUeXBlIH0gPSBhc3NpZ25lZVxuXHRcdGNvbnN0IGlzTGF6eSA9IGFzc2lnbmVlLmlzTGF6eSgpXG5cdFx0Ly8gVE9ETzogYXNzZXJ0KGFzc2lnbmVlLm9wVHlwZSA9PT0gbnVsbClcblx0XHQvLyBvciBUT0RPOiBBbGxvdyB0eXBlIGNoZWNrIG9uIGxhenkgdmFsdWU/XG5cdFx0dmFsdWUgPSBpc0xhenkgPyB2YWx1ZSA6IG1heWJlV3JhcEluQ2hlY2tDb250YWlucyh2YWx1ZSwgb3BUeXBlLCBuYW1lKVxuXHRcdGlmIChpc0V4cG9ydCkge1xuXHRcdFx0Ly8gVE9ETzpFUzZcblx0XHRcdGNvbnRleHQuY2hlY2soIWlzTGF6eSwgbG9jLCAnTGF6eSBleHBvcnQgbm90IHN1cHBvcnRlZC4nKVxuXHRcdFx0cmV0dXJuIFZhcmlhYmxlRGVjbGFyYXRvcihcblx0XHRcdFx0aWRGb3JEZWNsYXJlQ2FjaGVkKGFzc2lnbmVlKSxcblx0XHRcdFx0YXNzaWdubWVudEV4cHJlc3Npb25QbGFpbihtZW1iZXIoSWRFeHBvcnRzLCBuYW1lKSwgdmFsdWUpKVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCB2YWwgPSBpc0xhenkgJiYgIXZhbHVlSXNBbHJlYWR5TGF6eSA/IGxhenlXcmFwKHZhbHVlKSA6IHZhbHVlXG5cdFx0XHRhc3NlcnQoaXNMYXp5IHx8ICF2YWx1ZUlzQWxyZWFkeUxhenkpXG5cdFx0XHRyZXR1cm4gVmFyaWFibGVEZWNsYXJhdG9yKGlkRm9yRGVjbGFyZUNhY2hlZChhc3NpZ25lZSksIHZhbClcblx0XHR9XG5cdH0sXG5cblx0bWF5YmVXcmFwSW5DaGVja0NvbnRhaW5zID0gKGFzdCwgb3BUeXBlLCBuYW1lKSA9PlxuXHRcdChjb250ZXh0Lm9wdHMuaW5jbHVkZVR5cGVDaGVja3MoKSAmJiBvcFR5cGUgIT09IG51bGwpID9cblx0XHRcdG1zQ2hlY2tDb250YWlucyh0MChvcFR5cGUpLCBhc3QsIExpdGVyYWwobmFtZSkpIDpcblx0XHRcdGFzdCxcblxuXHRnZXRNZW1iZXIgPSAoYXN0T2JqZWN0LCBnb3ROYW1lLCBpc0xhenksIGlzTW9kdWxlKSA9PlxuXHRcdGlzTGF6eSA/XG5cdFx0bXNMYXp5R2V0KGFzdE9iamVjdCwgTGl0ZXJhbChnb3ROYW1lKSkgOlxuXHRcdGlzTW9kdWxlICYmIGNvbnRleHQub3B0cy5pbmNsdWRlVXNlQ2hlY2tzKCkgP1xuXHRcdG1zR2V0KGFzdE9iamVjdCwgTGl0ZXJhbChnb3ROYW1lKSkgOlxuXHRcdG1lbWJlcihhc3RPYmplY3QsIGdvdE5hbWUpXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==