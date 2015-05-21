if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'esast/dist/ast', 'esast/dist/util', 'esast/dist/specialize', '../../MsAst', '../manglePath', '../util', './ast-constants', './ms-call', './util'], function (exports, module, _esastDistAst, _esastDistUtil, _esastDistSpecialize, _MsAst, _manglePath, _util, _astConstants, _msCall, _util2) {
	'use strict';

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	var _manglePath2 = _interopRequire(_manglePath);

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
		Assign: function () {
			const declare = makeDeclarator(this.assignee, t0(this.value), false, verifyResults.isExportAssign(this));
			return (0, _esastDistAst.VariableDeclaration)(this.assignee.isMutable() ? 'let' : 'const', [declare]);
		},
		// TODO:ES6 Just use native destructuring assign
		AssignDestructure: function () {
			return (0, _esastDistAst.VariableDeclaration)(this.kind() === _MsAst.LD_Mutable ? 'let' : 'const', makeDestructureDeclarators(this.assignees, this.kind() === _MsAst.LD_Lazy, t0(this.value), false, verifyResults.isExportAssign(this)));
		},

		AssignMutate: function () {
			return (0, _esastDistSpecialize.assignmentExpressionPlain)((0, _esastDistUtil.idCached)(this.name), t0(this.value));
		},

		BagEntry: function () {
			return (0, _util2.declareSpecial)('_' + verifyResults.listMapEntryIndex(this), t0(this.value));
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
			return transpileBlock(t0(this.returned), this.lines, lead, opResDeclare, opOut);
		},

		BlockObj: function (lead, opResDeclare, opOut) {
			var _this = this;

			// TODO: includeTypeChecks() is not the right method for this
			const keys = context.opts.includeTypeChecks() ? this.keys : this.keys.filter(function (_) {
				return !verifyResults.isDebugLocal(_);
			});
			const ret = (0, _util.ifElse)(this.opObjed, function (_) {
				const objed = t0(_);
				const keysVals = (0, _util.cat)((0, _util.flatMap)(keys, function (key) {
					return [(0, _esastDistAst.Literal)(key.name), (0, _util2.accessLocalDeclare)(key)];
				}), (0, _util.opMap)(_this.opName, function (_) {
					return [_astConstants.LitStrName, (0, _esastDistAst.Literal)(_)];
				}));
				const anyLazy = keys.some(function (_) {
					return _.isLazy();
				});
				return (anyLazy ? _msCall.msLset : _msCall.msSet).apply(undefined, [objed].concat(_toConsumableArray(keysVals)));
			}, function () {
				const props = keys.map(function (key) {
					const val = (0, _util2.accessLocalDeclare)(key);
					const id = (0, _esastDistUtil.propertyIdOrLiteralCached)(key.name);
					return key.isLazy() ? (0, _esastDistSpecialize.property)('get', id, (0, _esastDistUtil.thunk)(val)) : (0, _esastDistSpecialize.property)('init', id, val);
				});
				const opPropName = (0, _util.opMap)(_this.opName, function (_) {
					return (0, _esastDistSpecialize.property)('init', _astConstants.IdName, (0, _esastDistAst.Literal)(_));
				});
				return (0, _esastDistAst.ObjectExpression)((0, _util.cat)(props, opPropName));
			});
			return transpileBlock(ret, this.lines, lead, opResDeclare, opOut);
		},

		BlockBag: function (lead, opResDeclare, opOut) {
			const length = verifyResults.listMapLength(this);
			return transpileBlock((0, _esastDistAst.ArrayExpression)((0, _util.range)(length).map(function (i) {
				return (0, _esastDistUtil.idCached)('_' + i);
			})), this.lines, lead, opResDeclare, opOut);
		},

		BlockMap: function (lead, opResDeclare, opOut) {
			const length = verifyResults.listMapLength(this);
			return transpileBlock(_msCall.msMap.apply(undefined, _toConsumableArray((0, _util.flatMap)((0, _util.range)(length), function (i) {
				return [(0, _esastDistUtil.idCached)('_k' + i), (0, _esastDistUtil.idCached)('_v' + i)];
			}))), this.lines, lead, opResDeclare, opOut);
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
			return (0, _util2.whileStatementInfinite)(t0(this.block));
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
			return (0, _util2.accessLocalDeclare)(verifyResults.accessToLocal.get(this));
		},

		LocalDeclare: function () {
			return (0, _util2.idForDeclareCached)(this);
		},

		MapEntry: function () {
			const index = verifyResults.listMapEntryIndex(this);
			const k = '_k' + index;
			const v = '_v' + index;
			return (0, _esastDistAst.VariableDeclaration)('const', [(0, _esastDistAst.VariableDeclarator)((0, _esastDistUtil.idCached)(k), t0(this.key)), (0, _esastDistAst.VariableDeclarator)((0, _esastDistUtil.idCached)(v), t0(this.val))]);
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
		return (0, _esastDistAst.BlockStatement)((0, _util.cat)(lead, tLines(lines), fin));
	};

	// Module helpers
	const amdWrapModule = function (doUses, otherUses, body) {
		const allUses = doUses.concat(otherUses);
		const usePaths = (0, _esastDistAst.ArrayExpression)((0, _util.cat)(_astConstants.LitStrExports, allUses.map(function (_) {
			return (0, _esastDistAst.Literal)((0, _manglePath2)(_.path));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS90cmFuc3BpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUEwQkEsS0FBSSxPQUFPLEVBQUUsYUFBYSxFQUFFLGFBQWEsQ0FBQTs7a0JBRTFCLFVBQUMsUUFBUSxFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBSztBQUM5RCxTQUFPLEdBQUcsUUFBUSxDQUFBO0FBQ2xCLGVBQWEsR0FBRyxjQUFjLENBQUE7QUFDOUIsZUFBYSxHQUFHLEtBQUssQ0FBQTtBQUNyQixRQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTs7QUFFaEMsU0FBTyxHQUFHLGFBQWEsR0FBRyxTQUFTLENBQUE7QUFDbkMsU0FBTyxHQUFHLENBQUE7RUFDVjs7QUFFRCxPQUNDLEVBQUUsR0FBRyxVQUFBLElBQUk7U0FBSSxtQkFsQ0ssR0FBRyxFQWtDSixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDO0VBQUE7T0FDbkQsRUFBRSxHQUFHLFVBQUMsSUFBSSxFQUFFLEdBQUc7U0FBSyxtQkFuQ0YsR0FBRyxFQW1DRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQztFQUFBO09BQzdELEVBQUUsR0FBRyxVQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUk7U0FBSyxtQkFwQ2QsR0FBRyxFQW9DZSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDO0VBQUE7T0FDckYsTUFBTSxHQUFHLFVBQUEsS0FBSyxFQUFJO0FBQ2pCLFFBQU0sR0FBRyxHQUFHLEVBQUcsQ0FBQTtBQUNmLE9BQUssQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJLEVBQUk7QUFDckIsU0FBTSxHQUFHLEdBQUcsSUFBSSxDQUFD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bGUiOiJtZXRhL2NvbXBpbGUvcHJpdmF0ZS90cmFuc3BpbGUvdHJhbnNwaWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXJyYXlFeHByZXNzaW9uLCBCaW5hcnlFeHByZXNzaW9uLCBCbG9ja1N0YXRlbWVudCwgQnJlYWtTdGF0ZW1lbnQsIENhbGxFeHByZXNzaW9uLFxuXHREZWJ1Z2dlclN0YXRlbWVudCwgRXhwcmVzc2lvblN0YXRlbWVudCwgRm9yT2ZTdGF0ZW1lbnQsIEZ1bmN0aW9uRXhwcmVzc2lvbiwgSWRlbnRpZmllcixcblx0SWZTdGF0ZW1lbnQsIExpdGVyYWwsIE1lbWJlckV4cHJlc3Npb24sIE9iamVjdEV4cHJlc3Npb24sIFByb2dyYW0sIFJldHVyblN0YXRlbWVudCxcblx0VGhpc0V4cHJlc3Npb24sIFZhcmlhYmxlRGVjbGFyYXRpb24sIFVuYXJ5RXhwcmVzc2lvbiwgVmFyaWFibGVEZWNsYXJhdG9yLCBSZXR1cm5TdGF0ZW1lbnRcblx0fSBmcm9tICdlc2FzdC9kaXN0L2FzdCdcbmltcG9ydCB7IGlkQ2FjaGVkLCBsb2MsIG1lbWJlciwgcHJvcGVydHlJZE9yTGl0ZXJhbENhY2hlZCwgdGh1bmssIHRvU3RhdGVtZW50XG5cdH0gZnJvbSAnZXNhc3QvZGlzdC91dGlsJ1xuaW1wb3J0IHsgYXNzaWdubWVudEV4cHJlc3Npb25QbGFpbiwgY2FsbEV4cHJlc3Npb25UaHVuaywgZnVuY3Rpb25FeHByZXNzaW9uUGxhaW4sXG5cdGZ1bmN0aW9uRXhwcmVzc2lvblRodW5rLCBtZW1iZXJFeHByZXNzaW9uLCBwcm9wZXJ0eSxcblx0eWllbGRFeHByZXNzaW9uRGVsZWdhdGUsIHlpZWxkRXhwcmVzc2lvbk5vRGVsZWdhdGUgfSBmcm9tICdlc2FzdC9kaXN0L3NwZWNpYWxpemUnXG5pbXBvcnQgKiBhcyBNc0FzdFR5cGVzIGZyb20gJy4uLy4uL01zQXN0J1xuaW1wb3J0IHsgTERfTGF6eSwgTERfTXV0YWJsZSwgUGF0dGVybiwgU3BsYXQsIFNEX0RlYnVnZ2VyLCBTVl9Db250YWlucywgU1ZfRmFsc2UsIFNWX051bGwsIFNWX1N1Yixcblx0U1ZfVGhpcywgU1ZfVGhpc01vZHVsZURpcmVjdG9yeSwgU1ZfVHJ1ZSwgU1ZfVW5kZWZpbmVkIH0gZnJvbSAnLi4vLi4vTXNBc3QnXG5pbXBvcnQgbWFuZ2xlUGF0aCBmcm9tICcuLi9tYW5nbGVQYXRoJ1xuaW1wb3J0IHsgYXNzZXJ0LCBjYXQsIGZsYXRNYXAsIGZsYXRPcE1hcCwgaWZFbHNlLCBpc0VtcHR5LFxuXHRpbXBsZW1lbnRNYW55LCBpc1Bvc2l0aXZlLCBvcElmLCBvcE1hcCwgcmFuZ2UsIHRhaWwsIHVuc2hpZnQgfSBmcm9tICcuLi91dGlsJ1xuaW1wb3J0IHsgQW1kZWZpbmVIZWFkZXIsIEFycmF5U2xpY2VDYWxsLCBFeHBvcnRzRGVmYXVsdCwgRXhwb3J0c0dldCwgSWRBcmd1bWVudHMsIElkRGVmaW5lLFxuXHRJZEV4cG9ydHMsIElkRXh0cmFjdCwgSWRGdW5jdGlvbkFwcGx5Q2FsbCwgSWROYW1lLCBMaXRFbXB0eUFycmF5LCBMaXRFbXB0eVN0cmluZywgTGl0TnVsbCxcblx0TGl0U3RyRXhwb3J0cywgTGl0U3RyTmFtZSwgTGl0WmVybywgUmV0dXJuRXhwb3J0cywgUmV0dXJuUmVzLCBTeW1ib2xJdGVyYXRvciwgVXNlU3RyaWN0XG5cdH0gZnJvbSAnLi9hc3QtY29uc3RhbnRzJ1xuaW1wb3J0IHsgSWRNcywgbGF6eVdyYXAsIG1zQXJyLCBtc0Jvb2wsIG1zQ2hlY2tDb250YWlucywgbXNFeHRyYWN0LCBtc0dldCwgbXNHZXREZWZhdWx0RXhwb3J0LFxuXHRtc0dldE1vZHVsZSwgbXNMYXp5LCBtc0xhenlHZXQsIG1zTGF6eUdldE1vZHVsZSwgbXNMc2V0LCBtc01hcCwgbXNTZXQsIG1zU2hvd1xuXHR9IGZyb20gJy4vbXMtY2FsbCdcbmltcG9ydCB7IGFjY2Vzc0xvY2FsRGVjbGFyZSwgZGVjbGFyZSwgZGVjbGFyZVNwZWNpYWwsXG5cdGlkRm9yRGVjbGFyZUNhY2hlZCwgdGhyb3dFcnJvciwgd2hpbGVTdGF0ZW1lbnRJbmZpbml0ZSB9IGZyb20gJy4vdXRpbCdcblxubGV0IGNvbnRleHQsIHZlcmlmeVJlc3VsdHMsIGlzSW5HZW5lcmF0b3JcblxuZXhwb3J0IGRlZmF1bHQgKF9jb250ZXh0LCBtb2R1bGVFeHByZXNzaW9uLCBfdmVyaWZ5UmVzdWx0cykgPT4ge1xuXHRjb250ZXh0ID0gX2NvbnRleHRcblx0dmVyaWZ5UmVzdWx0cyA9IF92ZXJpZnlSZXN1bHRzXG5cdGlzSW5HZW5lcmF0b3IgPSBmYWxzZVxuXHRjb25zdCByZXMgPSB0MChtb2R1bGVFeHByZXNzaW9uKVxuXHQvLyBSZWxlYXNlIGZvciBnYXJiYWdlIGNvbGxlY3Rpb24uXG5cdGNvbnRleHQgPSB2ZXJpZnlSZXN1bHRzID0gdW5kZWZpbmVkXG5cdHJldHVybiByZXNcbn1cblxuY29uc3Rcblx0dDAgPSBleHByID0+IGxvYyhleHByLnRyYW5zcGlsZVN1YnRyZWUoKSwgZXhwci5sb2MpLFxuXHR0MSA9IChleHByLCBhcmcpID0+IGxvYyhleHByLnRyYW5zcGlsZVN1YnRyZWUoYXJnKSwgZXhwci5sb2MpLFxuXHR0MyA9IChleHByLCBhcmcsIGFyZzIsIGFyZzMpID0+IGxvYyhleHByLnRyYW5zcGlsZVN1YnRyZWUoYXJnLCBhcmcyLCBhcmczKSwgZXhwci5sb2MpLFxuXHR0TGluZXMgPSBleHBycyA9PiB7XG5cdFx0Y29uc3Qgb3V0ID0gWyBdXG5cdFx0ZXhwcnMuZm9yRWFjaChleHByID0+IHtcblx0XHRcdGNvbnN0IGFzdCA9IGV4cHIudHJhbnNwaWxlU3VidHJlZSgpXG5cdFx0XHRpZiAoYXN0IGluc3RhbmNlb2YgQXJyYXkpXG5cdFx0XHRcdC8vIERlYnVnIG1heSBwcm9kdWNlIG11bHRpcGxlIHN0YXRlbWVudHMuXG5cdFx0XHRcdGFzdC5mb3JFYWNoKF8gPT4gb3V0LnB1c2godG9TdGF0ZW1lbnQoXykpKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRvdXQucHVzaChsb2ModG9TdGF0ZW1lbnQoYXN0KSwgZXhwci5sb2MpKVxuXHRcdH0pXG5cdFx0cmV0dXJuIG91dFxuXHR9XG5cbmltcGxlbWVudE1hbnkoTXNBc3RUeXBlcywgJ3RyYW5zcGlsZVN1YnRyZWUnLCB7XG5cdEFzc2lnbigpIHtcblx0XHRjb25zdCBkZWNsYXJlID1cblx0XHRcdG1ha2VEZWNsYXJhdG9yKHRoaXMuYXNzaWduZWUsIHQwKHRoaXMudmFsdWUpLCBmYWxzZSwgdmVyaWZ5UmVzdWx0cy5pc0V4cG9ydEFzc2lnbih0aGlzKSlcblx0XHRyZXR1cm4gVmFyaWFibGVEZWNsYXJhdGlvbih0aGlzLmFzc2lnbmVlLmlzTXV0YWJsZSgpID8gJ2xldCcgOiAnY29uc3QnLCBbIGRlY2xhcmUgXSlcblx0fSxcblx0Ly8gVE9ETzpFUzYgSnVzdCB1c2UgbmF0aXZlIGRlc3RydWN0dXJpbmcgYXNzaWduXG5cdEFzc2lnbkRlc3RydWN0dXJlKCkge1xuXHRcdHJldHVybiBWYXJpYWJsZURlY2xhcmF0aW9uKHRoaXMua2luZCgpID09PSBMRF9NdXRhYmxlID8gJ2xldCcgOiAnY29uc3QnLFxuXHRcdFx0bWFrZURlc3RydWN0dXJlRGVjbGFyYXRvcnMoXG5cdFx0XHRcdHRoaXMuYXNzaWduZWVzLFxuXHRcdFx0XHR0aGlzLmtpbmQoKSA9PT0gTERfTGF6eSxcblx0XHRcdFx0dDAodGhpcy52YWx1ZSksXG5cdFx0XHRcdGZhbHNlLFxuXHRcdFx0XHR2ZXJpZnlSZXN1bHRzLmlzRXhwb3J0QXNzaWduKHRoaXMpKSlcblx0fSxcblxuXHRBc3NpZ25NdXRhdGUoKSB7XG5cdFx0cmV0dXJuIGFzc2lnbm1lbnRFeHByZXNzaW9uUGxhaW4oaWRDYWNoZWQodGhpcy5uYW1lKSwgdDAodGhpcy52YWx1ZSkpXG5cdH0sXG5cblx0QmFnRW50cnkoKSB7XG5cdFx0cmV0dXJuIGRlY2xhcmVTcGVjaWFsKGBfJHt2ZXJpZnlSZXN1bHRzLmxpc3RNYXBFbnRyeUluZGV4KHRoaXMpfWAsIHQwKHRoaXMudmFsdWUpKVxuXHR9LFxuXG5cdEJhZ1NpbXBsZSgpIHsgcmV0dXJuIEFycmF5RXhwcmVzc2lvbih0aGlzLnBhcnRzLm1hcCh0MCkpIH0sXG5cblx0QmxvY2tEbyhsZWFkID0gbnVsbCwgb3BSZXNEZWNsYXJlID0gbnVsbCwgb3BPdXQgPSBudWxsKSB7XG5cdFx0YXNzZXJ0KG9wUmVzRGVjbGFyZSA9PT0gbnVsbClcblx0XHRyZXR1cm4gQmxvY2tTdGF0ZW1lbnQoY2F0KGxlYWQsIHRMaW5lcyh0aGlzLmxpbmVzKSwgb3BPdXQpKVxuXHR9LFxuXG5cdEJsb2NrV2l0aFJldHVybihsZWFkLCBvcFJlc0RlY2xhcmUsIG9wT3V0KSB7XG5cdFx0cmV0dXJuIHRyYW5zcGlsZUJsb2NrKHQwKHRoaXMucmV0dXJuZWQpLCB0aGlzLmxpbmVzLCBsZWFkLCBvcFJlc0RlY2xhcmUsIG9wT3V0KVxuXHR9LFxuXG5cdEJsb2NrT2JqKGxlYWQsIG9wUmVzRGVjbGFyZSwgb3BPdXQpIHtcblx0XHQvLyBUT0RPOiBpbmNsdWRlVHlwZUNoZWNrcygpIGlzIG5vdCB0aGUgcmlnaHQgbWV0aG9kIGZvciB0aGlzXG5cdFx0Y29uc3Qga2V5cyA9IGNvbnRleHQub3B0cy5pbmNsdWRlVHlwZUNoZWNrcygpID9cblx0XHRcdHRoaXMua2V5cyA6XG5cdFx0XHR0aGlzLmtleXMuZmlsdGVyKF8gPT4gIXZlcmlmeVJlc3VsdHMuaXNEZWJ1Z0xvY2FsKF8pKVxuXHRcdGNvbnN0IHJldCA9IGlmRWxzZSh0aGlzLm9wT2JqZWQsXG5cdFx0XHRfID0+IHtcblx0XHRcdFx0Y29uc3Qgb2JqZWQgPSB0MChfKVxuXHRcdFx0XHRjb25zdCBrZXlzVmFscyA9IGNhdChcblx0XHRcdFx0XHRmbGF0TWFwKGtleXMsIGtleSA9PiBbIExpdGVyYWwoa2V5Lm5hbWUpLCBhY2Nlc3NMb2NhbERlY2xhcmUoa2V5KSBdKSxcblx0XHRcdFx0XHRvcE1hcCh0aGlzLm9wTmFtZSwgXyA9PiBbIExpdFN0ck5hbWUsIExpdGVyYWwoXykgXSkpXG5cdFx0XHRcdGNvbnN0IGFueUxhenkgPSBrZXlzLnNvbWUoXyA9PiBfLmlzTGF6eSgpKVxuXHRcdFx0XHRyZXR1cm4gKGFueUxhenkgPyBtc0xzZXQgOiBtc1NldCkob2JqZWQsIC4uLmtleXNWYWxzKVxuXHRcdFx0fSxcblx0XHRcdCgpID0+IHtcblx0XHRcdFx0Y29uc3QgcHJvcHMgPSBrZXlzLm1hcChrZXkgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IHZhbCA9IGFjY2Vzc0xvY2FsRGVjbGFyZShrZXkpXG5cdFx0XHRcdFx0Y29uc3QgaWQgPSBwcm9wZXJ0eUlkT3JMaXRlcmFsQ2FjaGVkKGtleS5uYW1lKVxuXHRcdFx0XHRcdHJldHVybiBrZXkuaXNMYXp5KCkgP1xuXHRcdFx0XHRcdFx0cHJvcGVydHkoJ2dldCcsIGlkLCB0aHVuayh2YWwpKSA6XG5cdFx0XHRcdFx0XHRwcm9wZXJ0eSgnaW5pdCcsIGlkLCB2YWwpXG5cdFx0XHRcdH0pXG5cdFx0XHRcdGNvbnN0IG9wUHJvcE5hbWUgPSBvcE1hcCh0aGlzLm9wTmFtZSwgXyA9PiBwcm9wZXJ0eSgnaW5pdCcsIElkTmFtZSwgTGl0ZXJhbChfKSkpXG5cdFx0XHRcdHJldHVybiBPYmplY3RFeHByZXNzaW9uKGNhdChwcm9wcywgb3BQcm9wTmFtZSkpXG5cdFx0XHR9KVxuXHRcdHJldHVybiB0cmFuc3BpbGVCbG9jayhyZXQsIHRoaXMubGluZXMsIGxlYWQsIG9wUmVzRGVjbGFyZSwgb3BPdXQpXG5cdH0sXG5cblx0QmxvY2tCYWcobGVhZCwgb3BSZXNEZWNsYXJlLCBvcE91dCkge1xuXHRcdGNvbnN0IGxlbmd0aCA9IHZlcmlmeVJlc3VsdHMubGlzdE1hcExlbmd0aCh0aGlzKVxuXHRcdHJldHVybiB0cmFuc3BpbGVCbG9jayhcblx0XHRcdEFycmF5RXhwcmVzc2lvbihyYW5nZShsZW5ndGgpLm1hcChpID0+IGlkQ2FjaGVkKGBfJHtpfWApKSksXG5cdFx0XHR0aGlzLmxpbmVzLCBsZWFkLCBvcFJlc0RlY2xhcmUsIG9wT3V0KVxuXHR9LFxuXG5cdEJsb2NrTWFwKGxlYWQsIG9wUmVzRGVjbGFyZSwgb3BPdXQpIHtcblx0XHRjb25zdCBsZW5ndGggPSB2ZXJpZnlSZXN1bHRzLmxpc3RNYXBMZW5ndGgodGhpcylcblx0XHRyZXR1cm4gdHJhbnNwaWxlQmxvY2soXG5cdFx0XHRtc01hcCguLi5mbGF0TWFwKHJhbmdlKGxlbmd0aCksIGkgPT5cblx0XHRcdFx0WyBpZENhY2hlZChgX2ske2l9YCksIGlkQ2FjaGVkKGBfdiR7aX1gKSBdKSksXG5cdFx0XHR0aGlzLmxpbmVzLCBsZWFkLCBvcFJlc0RlY2xhcmUsIG9wT3V0KVxuXHR9LFxuXG5cdEJsb2NrV3JhcCgpIHsgcmV0dXJuIGJsb2NrV3JhcCh0aGlzLCB0MCh0aGlzLmJsb2NrKSkgfSxcblxuXHRCcmVha0RvKCkgeyByZXR1cm4gQnJlYWtTdGF0ZW1lbnQoKSB9LFxuXG5cdENhbGwoKSB7XG5cdFx0Y29uc3QgYW55U3BsYXQgPSB0aGlzLmFyZ3Muc29tZShhcmcgPT4gYXJnIGluc3RhbmNlb2YgU3BsYXQpXG5cdFx0aWYgKGFueVNwbGF0KSB7XG5cdFx0XHRjb25zdCBhcmdzID0gdGhpcy5hcmdzLm1hcChhcmcgPT5cblx0XHRcdFx0YXJnIGluc3RhbmNlb2YgU3BsYXQgP1xuXHRcdFx0XHRcdG1zQXJyKHQwKGFyZy5zcGxhdHRlZCkpIDpcblx0XHRcdFx0XHR0MChhcmcpKVxuXHRcdFx0cmV0dXJuIENhbGxFeHByZXNzaW9uKElkRnVuY3Rpb25BcHBseUNhbGwsIFtcblx0XHRcdFx0dDAodGhpcy5jYWxsZWQpLFxuXHRcdFx0XHRMaXROdWxsLFxuXHRcdFx0XHRDYWxsRXhwcmVzc2lvbihtZW1iZXIoTGl0RW1wdHlBcnJheSwgJ2NvbmNhdCcpLCBhcmdzKV0pXG5cdFx0fVxuXHRcdGVsc2UgcmV0dXJuIENhbGxFeHByZXNzaW9uKHQwKHRoaXMuY2FsbGVkKSwgdGhpcy5hcmdzLm1hcCh0MCkpXG5cdH0sXG5cblx0Q2FzZURvKCkge1xuXHRcdGNvbnN0IGJvZHkgPSBjYXNlQm9keSh0aGlzLnBhcnRzLCB0aGlzLm9wRWxzZSlcblx0XHRyZXR1cm4gaWZFbHNlKHRoaXMub3BDYXNlZCwgXyA9PiBCbG9ja1N0YXRlbWVudChbIHQwKF8pLCBib2R5IF0pLCAoKSA9PiBib2R5KVxuXHR9LFxuXG5cdENhc2VWYWwoKSB7XG5cdFx0Y29uc3QgYm9keSA9IGNhc2VCb2R5KHRoaXMucGFydHMsIHRoaXMub3BFbHNlKVxuXHRcdGNvbnN0IGJsb2NrID0gaWZFbHNlKHRoaXMub3BDYXNlZCwgXyA9PiBbIHQwKF8pLCBib2R5IF0sICgpID0+IFsgYm9keSBdKVxuXHRcdHJldHVybiBibG9ja1dyYXAodGhpcywgQmxvY2tTdGF0ZW1lbnQoYmxvY2spKVxuXHR9LFxuXG5cdENhc2VEb1BhcnQ6IGNhc2VQYXJ0LFxuXHRDYXNlVmFsUGFydDogY2FzZVBhcnQsXG5cdC8vIFRPRE86IGluY2x1ZGVJbm91dENoZWNrcyBpcyBtaXNuYW1lZFxuXHREZWJ1ZygpIHsgcmV0dXJuIGNvbnRleHQub3B0cy5pbmNsdWRlSW5vdXRDaGVja3MoKSA/IHRMaW5lcyh0aGlzLmxpbmVzKSA6IFsgXSB9LFxuXG5cdE9ialNpbXBsZSgpIHtcblx0XHRyZXR1cm4gT2JqZWN0RXhwcmVzc2lvbih0aGlzLnBhaXJzLm1hcChwYWlyID0+XG5cdFx0XHRwcm9wZXJ0eSgnaW5pdCcsIHByb3BlcnR5SWRPckxpdGVyYWxDYWNoZWQocGFpci5rZXkpLCB0MChwYWlyLnZhbHVlKSkpKVxuXHR9LFxuXG5cdEZvckRvUGxhaW4oKSB7XG5cdFx0cmV0dXJuIHdoaWxlU3RhdGVtZW50SW5maW5pdGUodDAodGhpcy5ibG9jaykpXG5cdH0sXG5cblx0Rm9yRG9XaXRoQmFnKCkge1xuXHRcdGNvbnN0IGRlY2xhcmUgPSBWYXJpYWJsZURlY2xhcmF0aW9uKCdsZXQnLCBbIFZhcmlhYmxlRGVjbGFyYXRvcih0MCh0aGlzLmVsZW1lbnQpKSBdKVxuXHRcdC8vIFRPRE86RVM2IHNob3VsZG4ndCBoYXZlIHRvIGV4cGxpY2l0bHkgZ2V0IGl0ZXJhdG9yXG5cdFx0Y29uc3QgaXRlciA9IENhbGxFeHByZXNzaW9uKE1lbWJlckV4cHJlc3Npb24odDAodGhpcy5iYWcpLCBTeW1ib2xJdGVyYXRvciwgdHJ1ZSksIFsgXSlcblx0XHRyZXR1cm4gRm9yT2ZTdGF0ZW1lbnQoZGVjbGFyZSwgaXRlciwgdDAodGhpcy5ibG9jaykpXG5cdH0sXG5cblx0RnVuKCkge1xuXHRcdGNvbnN0IG9sZEluR2VuZXJhdG9yID0gaXNJbkdlbmVyYXRvclxuXHRcdGlzSW5HZW5lcmF0b3IgPSB0aGlzLmlzR2VuZXJhdG9yXG5cblx0XHQvLyBUT0RPOkVTNiB1c2UgYC4uLmBmXG5cdFx0Y29uc3QgbkFyZ3MgPSBMaXRlcmFsKHRoaXMuYXJncy5sZW5ndGgpXG5cdFx0Y29uc3Qgb3BEZWNsYXJlUmVzdCA9IG9wTWFwKHRoaXMub3BSZXN0QXJnLCByZXN0ID0+XG5cdFx0XHRkZWNsYXJlKHJlc3QsIENhbGxFeHByZXNzaW9uKEFycmF5U2xpY2VDYWxsLCBbSWRBcmd1bWVudHMsIG5BcmdzXSkpKVxuXHRcdGNvbnN0IGFyZ0NoZWNrcyA9XG5cdFx0XHRvcElmKGNvbnRleHQub3B0cy5pbmNsdWRlVHlwZUNoZWNrcygpLCAoKSA9PlxuXHRcdFx0XHRmbGF0T3BNYXAodGhpcy5hcmdzLCBfID0+XG5cdFx0XHRcdFx0Ly8gVE9ETzogV2F5IHRvIHR5cGVjaGVjayBsYXppZXNcblx0XHRcdFx0XHRvcElmKCFfLmlzTGF6eSgpLCAoKSA9PlxuXHRcdFx0XHRcdFx0b3BNYXAoXy5vcFR5cGUsIHR5cGUgPT5cblx0XHRcdFx0XHRcdFx0RXhwcmVzc2lvblN0YXRlbWVudChtc0NoZWNrQ29udGFpbnMoXG5cdFx0XHRcdFx0XHRcdFx0dDAodHlwZSksXG5cdFx0XHRcdFx0XHRcdFx0YWNjZXNzTG9jYWxEZWNsYXJlKF8pLFxuXHRcdFx0XHRcdFx0XHRcdExpdGVyYWwoXy5uYW1lKSkpKSkpKVxuXG5cdFx0Y29uc3QgX2luID0gb3BNYXAodGhpcy5vcEluLCB0MClcblx0XHRjb25zdCBsZWFkID0gY2F0KG9wRGVjbGFyZVJlc3QsIGFyZ0NoZWNrcywgX2luKVxuXG5cdFx0Y29uc3QgX291dCA9IG9wTWFwKHRoaXMub3BPdXQsIHQwKVxuXHRcdGNvbnN0IGJvZHkgPSB0Myh0aGlzLmJsb2NrLCBsZWFkLCB0aGlzLm9wUmVzRGVjbGFyZSwgX291dClcblx0XHRjb25zdCBhcmdzID0gdGhpcy5hcmdzLm1hcCh0MClcblx0XHRpc0luR2VuZXJhdG9yID0gb2xkSW5HZW5lcmF0b3Jcblx0XHRjb25zdCBpZCA9IG9wTWFwKHRoaXMubmFtZSwgaWRDYWNoZWQpXG5cdFx0cmV0dXJuIEZ1bmN0aW9uRXhwcmVzc2lvbihpZCwgYXJncywgYm9keSwgdGhpcy5pc0dlbmVyYXRvcilcblx0fSxcblxuXHRMYXp5KCkgeyByZXR1cm4gbGF6eVdyYXAodDAodGhpcy52YWx1ZSkpIH0sXG5cblx0TnVtYmVyTGl0ZXJhbCgpIHtcblx0XHQvLyBOZWdhdGl2ZSBudW1iZXJzIGFyZSBub3QgcGFydCBvZiBFUyBzcGVjLlxuXHRcdC8vIGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi81LjEvI3NlYy03LjguM1xuXHRcdGNvbnN0IGxpdCA9IExpdGVyYWwoTWF0aC5hYnModGhpcy52YWx1ZSkpXG5cdFx0cmV0dXJuIGlzUG9zaXRpdmUodGhpcy52YWx1ZSkgPyBsaXQgOiBVbmFyeUV4cHJlc3Npb24oJy0nLCBsaXQpXG5cdH0sXG5cblx0R2xvYmFsQWNjZXNzKCkgeyByZXR1cm4gSWRlbnRpZmllcih0aGlzLm5hbWUpIH0sXG5cblx0SWZEbygpIHsgcmV0dXJuIElmU3RhdGVtZW50KG1heWJlQm9vbFdyYXAodDAodGhpcy50ZXN0KSksIHQwKHRoaXMucmVzdWx0KSkgfSxcblxuXHRMb2NhbEFjY2VzcygpIHsgcmV0dXJuIGFjY2Vzc0xvY2FsRGVjbGFyZSh2ZXJpZnlSZXN1bHRzLmFjY2Vzc1RvTG9jYWwuZ2V0KHRoaXMpKSB9LFxuXG5cdExvY2FsRGVjbGFyZSgpIHsgcmV0dXJuIGlkRm9yRGVjbGFyZUNhY2hlZCh0aGlzKSB9LFxuXG5cdE1hcEVudHJ5KCkge1xuXHRcdGNvbnN0IGluZGV4ID0gdmVyaWZ5UmVzdWx0cy5saXN0TWFwRW50cnlJbmRleCh0aGlzKVxuXHRcdGNvbnN0IGsgPSBgX2ske2luZGV4fWBcblx0XHRjb25zdCB2ID0gYF92JHtpbmRleH1gXG5cdFx0cmV0dXJuIFZhcmlhYmxlRGVjbGFyYXRpb24oJ2NvbnN0JywgW1xuXHRcdFx0VmFyaWFibGVEZWNsYXJhdG9yKGlkQ2FjaGVkKGspLCB0MCh0aGlzLmtleSkpLFxuXHRcdFx0VmFyaWFibGVEZWNsYXJhdG9yKGlkQ2FjaGVkKHYpLCB0MCh0aGlzLnZhbCkpXG5cdFx0XSlcblx0fSxcblxuXHRNZW1iZXIoKSB7IHJldHVybiBtZW1iZXIodDAodGhpcy5vYmplY3QpLCB0aGlzLm5hbWUpIH0sXG5cblx0TW9kdWxlKCkge1xuXHRcdGNvbnN0IGJvZHkgPSBjYXQoXG5cdFx0XHR0TGluZXModGhpcy5saW5lcyksXG5cdFx0XHRvcE1hcCh0aGlzLm9wRGVmYXVsdEV4cG9ydCwgXyA9PiBhc3NpZ25tZW50RXhwcmVzc2lvblBsYWluKEV4cG9ydHNEZWZhdWx0LCB0MChfKSkpKVxuXHRcdHJldHVybiBQcm9ncmFtKGNhdChcblx0XHRcdG9wSWYoY29udGV4dC5vcHRzLmluY2x1ZGVVc2VTdHJpY3QoKSwgKCkgPT4gVXNlU3RyaWN0KSxcblx0XHRcdG9wSWYoY29udGV4dC5vcHRzLmluY2x1ZGVBbWRlZmluZSgpLCAoKSA9PiBBbWRlZmluZUhlYWRlciksXG5cdFx0XHR0b1N0YXRlbWVudChhbWRXcmFwTW9kdWxlKHRoaXMuZG9Vc2VzLCB0aGlzLnVzZXMuY29uY2F0KHRoaXMuZGVidWdVc2VzKSwgYm9keSkpKSlcblx0fSxcblxuXHRRdW90ZSgpIHtcblx0XHQvLyBUT0RPOkVTNiB1c2UgdGVtcGxhdGUgc3RyaW5nc1xuXHRcdGNvbnN0IHBhcnQwID0gdGhpcy5wYXJ0c1swXVxuXHRcdGNvbnN0IFsgZmlyc3QsIHJlc3RQYXJ0cyBdID1cblx0XHRcdHR5cGVvZiBwYXJ0MCA9PT0gJ3N0cmluZycgP1xuXHRcdFx0XHRbIExpdGVyYWwocGFydDApLCB0YWlsKHRoaXMucGFydHMpIF0gOlxuXHRcdFx0XHRbIExpdEVtcHR5U3RyaW5nLCB0aGlzLnBhcnRzIF1cblx0XHRyZXR1cm4gcmVzdFBhcnRzLnJlZHVjZShcblx0XHRcdChleCwgXykgPT5cblx0XHRcdFx0QmluYXJ5RXhwcmVzc2lvbignKycsIGV4LCB0eXBlb2YgXyA9PT0gJ3N0cmluZycgPyBMaXRlcmFsKF8pIDogbXNTaG93KHQwKF8pKSksXG5cdFx0XHRmaXJzdClcblx0fSxcblxuXHRTcGVjaWFsRG8oKSB7XG5cdFx0c3dpdGNoICh0aGlzLmtpbmQpIHtcblx0XHRcdGNhc2UgU0RfRGVidWdnZXI6IHJldHVybiBEZWJ1Z2dlclN0YXRlbWVudCgpXG5cdFx0XHRkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IodGhpcy5raW5kKVxuXHRcdH1cblx0fSxcblxuXHRTcGVjaWFsVmFsKCkge1xuXHRcdC8vIE1ha2UgbmV3IG9iamVjdHMgYmVjYXVzZSB3ZSB3aWxsIGFzc2lnbiBgbG9jYCB0byB0aGVtLlxuXHRcdHN3aXRjaCAodGhpcy5raW5kKSB7XG5cdFx0XHRjYXNlIFNWX0NvbnRhaW5zOiByZXR1cm4gbWVtYmVyKElkTXMsICdjb250YWlucycpXG5cdFx0XHRjYXNlIFNWX0ZhbHNlOiByZXR1cm4gTGl0ZXJhbChmYWxzZSlcblx0XHRcdGNhc2UgU1ZfTnVsbDogcmV0dXJuIExpdGVyYWwobnVsbClcblx0XHRcdGNhc2UgU1ZfU3ViOiByZXR1cm4gbWVtYmVyKElkTXMsICdzdWInKVxuXHRcdFx0Y2FzZSBTVl9UaGlzOiByZXR1cm4gXHRUaGlzRXhwcmVzc2lvbigpXG5cdFx0XHRjYXNlIFNWX1RoaXNNb2R1bGVEaXJlY3Rvcnk6IHJldHVybiBJZGVudGlmaWVyKCdfX2Rpcm5hbWUnKVxuXHRcdFx0Y2FzZSBTVl9UcnVlOiByZXR1cm4gTGl0ZXJhbCh0cnVlKVxuXHRcdFx0Y2FzZSBTVl9VbmRlZmluZWQ6IHJldHVybiBVbmFyeUV4cHJlc3Npb24oJ3ZvaWQnLCBMaXRaZXJvKVxuXHRcdFx0ZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKHRoaXMua2luZClcblx0XHR9XG5cdH0sXG5cblx0VW5sZXNzRG8oKSB7XG5cdFx0cmV0dXJuIElmU3RhdGVtZW50KFVuYXJ5RXhwcmVzc2lvbignIScsIG1heWJlQm9vbFdyYXAodDAodGhpcy50ZXN0KSkpLCB0MCh0aGlzLnJlc3VsdCkpXG5cdH0sXG5cblx0WWllbGQoKSB7IHJldHVybiB5aWVsZEV4cHJlc3Npb25Ob0RlbGVnYXRlKHQwKHRoaXMueWllbGRlZCkpIH0sXG5cblx0WWllbGRUbygpIHsgcmV0dXJuIHlpZWxkRXhwcmVzc2lvbkRlbGVnYXRlKHQwKHRoaXMueWllbGRlZFRvKSkgfVxufSlcblxuZnVuY3Rpb24gY2FzZVBhcnQoYWx0ZXJuYXRlKSB7XG5cdGlmICh0aGlzLnRlc3QgaW5zdGFuY2VvZiBQYXR0ZXJuKSB7XG5cdFx0Y29uc3QgeyB0eXBlLCBwYXR0ZXJuZWQsIGxvY2FscyB9ID0gdGhpcy50ZXN0XG5cdFx0Y29uc3QgZGVjbCA9IFZhcmlhYmxlRGVjbGFyYXRpb24oJ2NvbnN0JywgW1xuXHRcdFx0VmFyaWFibGVEZWNsYXJhdG9yKElkRXh0cmFjdCwgbXNFeHRyYWN0KHQwKHR5cGUpLCB0MChwYXR0ZXJuZWQpKSkgXSlcblx0XHRjb25zdCB0ZXN0ID0gQmluYXJ5RXhwcmVzc2lvbignIT09JywgSWRFeHRyYWN0LCBMaXROdWxsKVxuXHRcdGNvbnN0IGV4dHJhY3QgPSBWYXJpYWJsZURlY2xhcmF0aW9uKCdjb25zdCcsIGxvY2Fscy5tYXAoKF8sIGlkeCkgPT5cblx0XHRcdFZhcmlhYmxlRGVjbGFyYXRvcihpZEZvckRlY2xhcmVDYWNoZWQoXyksIG1lbWJlckV4cHJlc3Npb24oSWRFeHRyYWN0LCBMaXRlcmFsKGlkeCkpKSkpXG5cdFx0Y29uc3QgcmVzID0gdDEodGhpcy5yZXN1bHQsIGV4dHJhY3QpXG5cdFx0cmV0dXJuIEJsb2NrU3RhdGVtZW50KFsgZGVjbCwgSWZTdGF0ZW1lbnQodGVzdCwgcmVzLCBhbHRlcm5hdGUpIF0pXG5cdH0gZWxzZVxuXHRcdC8vIGFsdGVybmF0ZSB3cml0dGVuIHRvIGJ5IGBjYXNlQm9keWAuXG5cdFx0cmV0dXJuIElmU3RhdGVtZW50KG1heWJlQm9vbFdyYXAodDAodGhpcy50ZXN0KSksIHQwKHRoaXMucmVzdWx0KSwgYWx0ZXJuYXRlKVxufVxuXG4vLyBGdW5jdGlvbnMgc3BlY2lmaWMgdG8gY2VydGFpbiBleHByZXNzaW9ucy5cbmNvbnN0XG5cdGJsb2NrV3JhcCA9IChfLCBibG9jaykgPT4ge1xuXHRcdGNvbnN0IGludm9rZSA9IGNhbGxFeHByZXNzaW9uVGh1bmsoZnVuY3Rpb25FeHByZXNzaW9uVGh1bmsoYmxvY2ssIGlzSW5HZW5lcmF0b3IpKVxuXHRcdHJldHVybiBpc0luR2VuZXJhdG9yID8geWllbGRFeHByZXNzaW9uRGVsZWdhdGUoaW52b2tlKSA6IGludm9rZVxuXHR9LFxuXG5cdGNhc2VCb2R5ID0gKHBhcnRzLCBvcEVsc2UpID0+IHtcblx0XHRsZXQgYWNjID0gaWZFbHNlKG9wRWxzZSwgdDAsICgpID0+IHRocm93RXJyb3IoJ05vIGJyYW5jaCBvZiBgY2FzZWAgbWF0Y2hlcy4nKSlcblx0XHRmb3IgKGxldCBpID0gcGFydHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpID0gaSAtIDEpXG5cdFx0XHRhY2MgPSB0MShwYXJ0c1tpXSwgYWNjKVxuXHRcdHJldHVybiBhY2Ncblx0fSxcblxuXHR0cmFuc3BpbGVCbG9jayA9IChyZXR1cm5lZCwgbGluZXMsIGxlYWQgPSBudWxsLCBvcFJlc0RlY2xhcmUgPSBudWxsLCBvcE91dCA9IG51bGwpID0+IHtcblx0XHRjb25zdCBmaW4gPSBpZkVsc2Uob3BSZXNEZWNsYXJlLFxuXHRcdFx0cmQgPT4ge1xuXHRcdFx0XHRjb25zdCByZXQgPSBtYXliZVdyYXBJbkNoZWNrQ29udGFpbnMocmV0dXJuZWQsIHJkLm9wVHlwZSwgcmQubmFtZSlcblx0XHRcdFx0cmV0dXJuIGlmRWxzZShvcE91dCxcblx0XHRcdFx0XHRfID0+IGNhdChkZWNsYXJlKHJkLCByZXQpLCBfLCBSZXR1cm5SZXMpLFxuXHRcdFx0XHRcdCgpID0+IFJldHVyblN0YXRlbWVudChyZXQpKVxuXHRcdFx0fSxcblx0XHRcdCgpID0+IGNhdChvcE91dCwgUmV0dXJuU3RhdGVtZW50KHJldHVybmVkKSkpXG5cdFx0cmV0dXJuIEJsb2NrU3RhdGVtZW50KGNhdChsZWFkLCB0TGluZXMobGluZXMpLCBmaW4pKVxuXHR9XG5cbi8vIE1vZHVsZSBoZWxwZXJzXG5jb25zdFxuXHRhbWRXcmFwTW9kdWxlID0gKGRvVXNlcywgb3RoZXJVc2VzLCBib2R5KSA9PiB7XG5cdFx0Y29uc3QgYWxsVXNlcyA9IGRvVXNlcy5jb25jYXQob3RoZXJVc2VzKVxuXHRcdGNvbnN0IHVzZVBhdGhzID0gQXJyYXlFeHByZXNzaW9uKGNhdChcblx0XHRcdExpdFN0ckV4cG9ydHMsXG5cdFx0XHRhbGxVc2VzLm1hcChfID0+IExpdGVyYWwobWFuZ2xlUGF0aChfLnBhdGgpKSkpKVxuXHRcdGNvbnN0IHVzZUlkZW50aWZpZXJzID0gYWxsVXNlcy5tYXAoKF8sIGkpID0+IGlkQ2FjaGVkKGAke3BhdGhCYXNlTmFtZShfLnBhdGgpfV8ke2l9YCkpXG5cdFx0Y29uc3QgdXNlQXJncyA9IGNhdChJZEV4cG9ydHMsIHVzZUlkZW50aWZpZXJzKVxuXHRcdGNvbnN0IHVzZURvcyA9IGRvVXNlcy5tYXAoKHVzZSwgaSkgPT5cblx0XHRcdGxvYyhFeHByZXNzaW9uU3RhdGVtZW50KG1zR2V0TW9kdWxlKHVzZUlkZW50aWZpZXJzW2ldKSksIHVzZS5sb2MpKVxuXHRcdGNvbnN0IG9wVXNlRGVjbGFyZSA9IG9wSWYoIWlzRW1wdHkob3RoZXJVc2VzKSxcblx0XHRcdCgpID0+IFZhcmlhYmxlRGVjbGFyYXRpb24oJ2NvbnN0JywgZmxhdE1hcChvdGhlclVzZXMsICh1c2UsIGkpID0+XG5cdFx0XHRcdHVzZURlY2xhcmF0b3JzKHVzZSwgdXNlSWRlbnRpZmllcnNbaSArIGRvVXNlcy5sZW5ndGhdKSkpKVxuXHRcdGNvbnN0IGZ1bGxCb2R5ID0gQmxvY2tTdGF0ZW1lbnQoY2F0KHVzZURvcywgb3BVc2VEZWNsYXJlLCBib2R5LCBSZXR1cm5FeHBvcnRzKSlcblx0XHRjb25zdCBsYXp5Qm9keSA9XG5cdFx0XHRjb250ZXh0Lm9wdHMubGF6eU1vZHVsZSgpID9cblx0XHRcdFx0QmxvY2tTdGF0ZW1lbnQoWyBFeHByZXNzaW9uU3RhdGVtZW50KFxuXHRcdFx0XHRcdGFzc2lnbm1lbnRFeHByZXNzaW9uUGxhaW4oRXhwb3J0c0dldCxcblx0XHRcdFx0XHRcdG1zTGF6eShmdW5jdGlvbkV4cHJlc3Npb25UaHVuayhmdWxsQm9keSkpKSkgXSkgOlxuXHRcdFx0XHRmdWxsQm9keVxuXHRcdHJldHVybiBDYWxsRXhwcmVzc2lvbihJZERlZmluZSwgWyB1c2VQYXRocywgZnVuY3Rpb25FeHByZXNzaW9uUGxhaW4odXNlQXJncywgbGF6eUJvZHkpIF0pXG5cdH0sXG5cblx0cGF0aEJhc2VOYW1lID0gcGF0aCA9PlxuXHRcdHBhdGguc3Vic3RyKHBhdGgubGFzdEluZGV4T2YoJy8nKSArIDEpLFxuXG5cdHVzZURlY2xhcmF0b3JzID0gKHVzZSwgbW9kdWxlSWRlbnRpZmllcikgPT4ge1xuXHRcdC8vIFRPRE86IENvdWxkIGJlIG5lYXRlciBhYm91dCB0aGlzXG5cdFx0Y29uc3QgaXNMYXp5ID0gKGlzRW1wdHkodXNlLnVzZWQpID8gdXNlLm9wVXNlRGVmYXVsdCA6IHVzZS51c2VkWzBdKS5pc0xhenkoKVxuXHRcdGNvbnN0IHZhbHVlID0gKGlzTGF6eSA/IG1zTGF6eUdldE1vZHVsZSA6IG1zR2V0TW9kdWxlKShtb2R1bGVJZGVudGlmaWVyKVxuXG5cdFx0Y29uc3QgdXNlZERlZmF1bHQgPSBvcE1hcCh1c2Uub3BVc2VEZWZhdWx0LCBkZWYgPT4ge1xuXHRcdFx0Y29uc3QgZGVmZXhwID0gbXNHZXREZWZhdWx0RXhwb3J0KG1vZHVsZUlkZW50aWZpZXIpXG5cdFx0XHRjb25zdCB2YWwgPSBpc0xhenkgPyBsYXp5V3JhcChkZWZleHApIDogZGVmZXhwXG5cdFx0XHRyZXR1cm4gbG9jKFZhcmlhYmxlRGVjbGFyYXRvcihpZEZvckRlY2xhcmVDYWNoZWQoZGVmKSwgdmFsKSwgZGVmLmxvYylcblx0XHR9KVxuXG5cdFx0Y29uc3QgdXNlZERlc3RydWN0ID0gaXNFbXB0eSh1c2UudXNlZCkgPyBudWxsIDpcblx0XHRcdG1ha2VEZXN0cnVjdHVyZURlY2xhcmF0b3JzKHVzZS51c2VkLCBpc0xhenksIHZhbHVlLCB0cnVlLCBmYWxzZSlcblxuXHRcdHJldHVybiBjYXQodXNlZERlZmF1bHQsIHVzZWREZXN0cnVjdClcblx0fVxuXG4vLyBHZW5lcmFsIHV0aWxzLiBOb3QgaW4gdXRpbC5qcyBiZWNhdXNlIHRoZXNlIGNsb3NlIG92ZXIgY29udGV4dC5cbmNvbnN0XG5cdG1heWJlQm9vbFdyYXAgPSBhc3QgPT5cblx0XHRjb250ZXh0Lm9wdHMuaW5jbHVkZUNhc2VDaGVja3MoKSA/IG1zQm9vbChhc3QpIDogYXN0LFxuXG5cdG1ha2VEZXN0cnVjdHVyZURlY2xhcmF0b3JzID0gKGFzc2lnbmVlcywgaXNMYXp5LCB2YWx1ZSwgaXNNb2R1bGUsIGlzRXhwb3J0KSA9PiB7XG5cdFx0Y29uc3QgZGVzdHJ1Y3R1cmVkTmFtZSA9IGBfJCR7YXNzaWduZWVzWzBdLmxvYy5zdGFydC5saW5lfWBcblx0XHRjb25zdCBpZERlc3RydWN0dXJlZCA9IElkZW50aWZpZXIoZGVzdHJ1Y3R1cmVkTmFtZSlcblx0XHRjb25zdCBkZWNsYXJhdG9ycyA9IGFzc2lnbmVlcy5tYXAoYXNzaWduZWUgPT4ge1xuXHRcdFx0Ly8gVE9ETzogRG9uJ3QgY29tcGlsZSBpdCBpZiBpdCdzIG5ldmVyIGFjY2Vzc2VkXG5cdFx0XHRjb25zdCBnZXQgPSBnZXRNZW1iZXIoaWREZXN0cnVjdHVyZWQsIGFzc2lnbmVlLm5hbWUsIGlzTGF6eSwgaXNNb2R1bGUpXG5cdFx0XHRyZXR1cm4gbWFrZURlY2xhcmF0b3IoYXNzaWduZWUsIGdldCwgaXNMYXp5LCBpc0V4cG9ydClcblx0XHR9KVxuXHRcdC8vIEdldHRpbmcgbGF6eSBtb2R1bGUgaXMgZG9uZSBieSBtcy5sYXp5R2V0TW9kdWxlLlxuXHRcdGNvbnN0IHZhbCA9IChpc0xhenkgJiYgIWlzTW9kdWxlKSA/IGxhenlXcmFwKHZhbHVlKSA6IHZhbHVlXG5cdFx0cmV0dXJuIHVuc2hpZnQoVmFyaWFibGVEZWNsYXJhdG9yKGlkRGVzdHJ1Y3R1cmVkLCB2YWwpLCBkZWNsYXJhdG9ycylcblx0fSxcblxuXHRtYWtlRGVjbGFyYXRvciA9IChhc3NpZ25lZSwgdmFsdWUsIHZhbHVlSXNBbHJlYWR5TGF6eSwgaXNFeHBvcnQpID0+IHtcblx0XHRjb25zdCB7IGxvYywgbmFtZSwgb3BUeXBlIH0gPSBhc3NpZ25lZVxuXHRcdGNvbnN0IGlzTGF6eSA9IGFzc2lnbmVlLmlzTGF6eSgpXG5cdFx0Ly8gVE9ETzogYXNzZXJ0KGFzc2lnbmVlLm9wVHlwZSA9PT0gbnVsbClcblx0XHQvLyBvciBUT0RPOiBBbGxvdyB0eXBlIGNoZWNrIG9uIGxhenkgdmFsdWU/XG5cdFx0dmFsdWUgPSBpc0xhenkgPyB2YWx1ZSA6IG1heWJlV3JhcEluQ2hlY2tDb250YWlucyh2YWx1ZSwgb3BUeXBlLCBuYW1lKVxuXHRcdGlmIChpc0V4cG9ydCkge1xuXHRcdFx0Ly8gVE9ETzpFUzZcblx0XHRcdGNvbnRleHQuY2hlY2soIWlzTGF6eSwgbG9jLCAnTGF6eSBleHBvcnQgbm90IHN1cHBvcnRlZC4nKVxuXHRcdFx0cmV0dXJuIFZhcmlhYmxlRGVjbGFyYXRvcihcblx0XHRcdFx0aWRGb3JEZWNsYXJlQ2FjaGVkKGFzc2lnbmVlKSxcblx0XHRcdFx0YXNzaWdubWVudEV4cHJlc3Npb25QbGFpbihtZW1iZXIoSWRFeHBvcnRzLCBuYW1lKSwgdmFsdWUpKVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCB2YWwgPSBpc0xhenkgJiYgIXZhbHVlSXNBbHJlYWR5TGF6eSA/IGxhenlXcmFwKHZhbHVlKSA6IHZhbHVlXG5cdFx0XHRhc3NlcnQoaXNMYXp5IHx8ICF2YWx1ZUlzQWxyZWFkeUxhenkpXG5cdFx0XHRyZXR1cm4gVmFyaWFibGVEZWNsYXJhdG9yKGlkRm9yRGVjbGFyZUNhY2hlZChhc3NpZ25lZSksIHZhbClcblx0XHR9XG5cdH0sXG5cblx0bWF5YmVXcmFwSW5DaGVja0NvbnRhaW5zID0gKGFzdCwgb3BUeXBlLCBuYW1lKSA9PlxuXHRcdChjb250ZXh0Lm9wdHMuaW5jbHVkZVR5cGVDaGVja3MoKSAmJiBvcFR5cGUgIT09IG51bGwpID9cblx0XHRcdG1zQ2hlY2tDb250YWlucyh0MChvcFR5cGUpLCBhc3QsIExpdGVyYWwobmFtZSkpIDpcblx0XHRcdGFzdCxcblxuXHRnZXRNZW1iZXIgPSAoYXN0T2JqZWN0LCBnb3ROYW1lLCBpc0xhenksIGlzTW9kdWxlKSA9PlxuXHRcdGlzTGF6eSA/XG5cdFx0bXNMYXp5R2V0KGFzdE9iamVjdCwgTGl0ZXJhbChnb3ROYW1lKSkgOlxuXHRcdGlzTW9kdWxlICYmIGNvbnRleHQub3B0cy5pbmNsdWRlVXNlQ2hlY2tzKCkgP1xuXHRcdG1zR2V0KGFzdE9iamVjdCwgTGl0ZXJhbChnb3ROYW1lKSkgOlxuXHRcdG1lbWJlcihhc3RPYmplY3QsIGdvdE5hbWUpXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==