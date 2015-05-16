if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'esast/dist/ast', 'esast/dist/util', 'esast/dist/specialize', '../../Expression', '../manglePath', '../U/Bag', '../U/op', '../U/util', './ast-constants', './ms-call', './util'], function (exports, module, _esastDistAst, _esastDistUtil, _esastDistSpecialize, _Expression, _manglePath, _UBag, _UOp, _UUtil, _astConstants, _msCall, _util) {
	'use strict';

	module.exports = transpile;

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	var _manglePath2 = _interopRequire(_manglePath);

	let cx, vr, isInGenerator;

	function transpile(_cx, moduleExpression, _vr) {
		cx = _cx;
		vr = _vr;
		isInGenerator = false;
		const res = t0(moduleExpression);
		// Release for garbage collection
		cx = vr = undefined;
		return res;
	}

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

	(0, _UUtil.implementMany)(_Expression, 'transpileSubtree', {
		Assign: function () {
			return (0, _esastDistSpecialize.variableDeclarationConst)([makeDeclarator(this.assignee, t0(this.value), false, vr.isExportAssign(this))]);
		},
		// TODO:ES6 Just use native destructuring assign
		AssignDestructure: function () {
			return (0, _esastDistSpecialize.variableDeclarationConst)(makeDestructureDeclarators(this.assignees, this.isLazy, t0(this.value), false, vr.isExportAssign(this)));
		},

		BagEntry: function () {
			return (0, _util.declareSpecial)('_' + vr.listMapEntryIndex(this), t0(this.value));
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

			(0, _UUtil.assert)(opResDeclare === null);
			return (0, _esastDistAst.BlockStatement)((0, _UBag.cat)(lead, tLines(this.lines), opOut));
		},

		BlockWithReturn: function (lead, opResDeclare, opOut) {
			return transpileBlock(t0(this.returned), this.lines, lead, opResDeclare, opOut);
		},

		BlockObj: function (lead, opResDeclare, opOut) {
			var _this = this;

			// TODO: includeTypeChecks() is not the right method for this
			const keys = cx.opts.includeTypeChecks() ? this.keys : this.keys.filter(function (_) {
				return !vr.isDebugLocal(_);
			});
			const ret = (0, _UOp.ifElse)(this.opObjed, function (_) {
				const objed = t0(_);
				const keysVals = (0, _UBag.cat)((0, _UBag.flatMap)(keys, function (key) {
					return [(0, _esastDistAst.Literal)(key.name), (0, _util.accessLocalDeclare)(key)];
				}), (0, _UOp.opMap)(_this.opName, function (_) {
					return [_astConstants.LitStrName, (0, _esastDistAst.Literal)(_)];
				}));
				const anyLazy = keys.some(function (key) {
					return key.isLazy;
				});
				return (anyLazy ? _msCall.msLset : _msCall.msSet).apply(undefined, [objed].concat(_toConsumableArray(keysVals)));
			}, function () {
				const props = keys.map(function (key) {
					const val = (0, _util.accessLocalDeclare)(key);
					const id = (0, _esastDistUtil.propertyIdOrLiteralCached)(key.name);
					return key.isLazy ? (0, _esastDistSpecialize.property)('get', id, (0, _esastDistUtil.thunk)(val)) : (0, _esastDistSpecialize.property)('init', id, val);
				});
				const opPropName = (0, _UOp.opMap)(_this.opName, function (_) {
					return (0, _esastDistSpecialize.property)('init', _astConstants.IdName, (0, _esastDistAst.Literal)(_));
				});
				return (0, _esastDistAst.ObjectExpression)((0, _UBag.cat)(props, opPropName));
			});
			return transpileBlock(ret, this.lines, lead, opResDeclare, opOut);
		},

		BlockBag: function (lead, opResDeclare, opOut) {
			const length = vr.listMapLength(this);
			return transpileBlock((0, _esastDistAst.ArrayExpression)((0, _UBag.range)(0, length).map(function (i) {
				return (0, _esastDistUtil.idCached)('_' + i);
			})), this.lines, lead, opResDeclare, opOut);
		},

		BlockMap: function (lead, opResDeclare, opOut) {
			const length = vr.listMapLength(this);
			return transpileBlock(_msCall.msMap.apply(undefined, _toConsumableArray((0, _UBag.flatMap)((0, _UBag.range)(0, length), function (i) {
				return [(0, _esastDistUtil.idCached)('_k' + i), (0, _esastDistUtil.idCached)('_v' + i)];
			}))), this.lines, lead, opResDeclare, opOut);
		},

		BlockWrap: function () {
			return blockWrap(this, t0(this.block));
		},

		Call: function () {
			const anySplat = this.args.some(function (arg) {
				return arg instanceof _Expression.Splat;
			});
			if (anySplat) {
				const args = this.args.map(function (arg) {
					return arg instanceof _Expression.Splat ? (0, _msCall.msArr)(t0(arg.splatted)) : t0(arg);
				});
				return (0, _esastDistAst.CallExpression)(_astConstants.IdFunctionApplyCall, [t0(this.called), _astConstants.LitNull, (0, _esastDistAst.CallExpression)((0, _esastDistUtil.member)(_astConstants.LitEmptyArray, 'concat'), args)]);
			} else return (0, _esastDistAst.CallExpression)(t0(this.called), this.args.map(t0));
		},

		CaseDo: function () {
			const body = caseBody(this.parts, this.opElse);
			return (0, _UOp.ifElse)(this.opCased, function (_) {
				return (0, _esastDistAst.BlockStatement)([t0(_), body]);
			}, function () {
				return body;
			});
		},

		CaseVal: function () {
			const body = caseBody(this.parts, this.opElse);
			const block = (0, _UOp.ifElse)(this.opCased, function (_) {
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
			return cx.opts.includeInoutChecks() ? tLines(this.lines) : [];
		},

		ObjSimple: function () {
			return (0, _esastDistAst.ObjectExpression)(this.pairs.map(function (pair) {
				return (0, _esastDistSpecialize.property)('init', (0, _esastDistUtil.propertyIdOrLiteralCached)(pair.key), t0(pair.value));
			}));
		},

		EndLoop: function () {
			return (0, _esastDistAst.BreakStatement)(loopId(vr.endLoopToLoop.get(this)));
		},

		Fun: function () {
			var _this2 = this;

			const oldInGenerator = isInGenerator;
			isInGenerator = this.isGenerator;

			// TODO:ES6 use `...`f
			const nArgs = (0, _esastDistAst.Literal)(this.args.length);
			const opDeclareRest = (0, _UOp.opMap)(this.opRestArg, function (rest) {
				return (0, _util.declare)(rest, (0, _esastDistAst.CallExpression)(_astConstants.ArraySliceCall, [_astConstants.IdArguments, nArgs]));
			});
			const argChecks = (0, _UOp.opIf)(cx.opts.includeTypeChecks(), function () {
				return (0, _UOp.flatOpMap)(_this2.args, function (_) {
					return (
						// TODO: Way to typecheck lazies
						(0, _UOp.opIf)(!_.isLazy, function () {
							return (0, _UOp.opMap)(_.opType, function (type) {
								return (0, _esastDistAst.ExpressionStatement)((0, _msCall.msCheckContains)(t0(type), (0, _util.accessLocalDeclare)(_), (0, _esastDistAst.Literal)(_.name)));
							});
						})
					);
				});
			});

			const _in = (0, _UOp.opMap)(this.opIn, t0);
			const lead = (0, _UBag.cat)(opDeclareRest, argChecks, _in);

			const _out = (0, _UOp.opMap)(this.opOut, t0);
			const body = t3(this.block, lead, this.opResDeclare, _out);
			const args = this.args.map(t0);
			isInGenerator = oldInGenerator;
			const id = (0, _UOp.opMap)(this.name, _esastDistUtil.idCached);
			return (0, _esastDistAst.FunctionExpression)(id, args, body, this.isGenerator);
		},

		Lazy: function () {
			return (0, _msCall.lazyWrap)(t0(this.value));
		},

		NumberLiteral: function () {
			// Negative numbers are not part of ES spec.
			// http://www.ecma-international.org/ecma-262/5.1/#sec-7.8.3
			const lit = (0, _esastDistAst.Literal)(Math.abs(this.value));
			return (0, _UUtil.isPositive)(this.value) ? lit : (0, _util.unaryExpressionNegate)(lit);
		},

		GlobalAccess: function () {
			return (0, _esastDistAst.Identifier)(this.name);
		},

		LocalAccess: function () {
			return (0, _util.accessLocalDeclare)(vr.accessToLocal.get(this));
		},

		LocalDeclare: function () {
			return (0, _util.idForDeclareCached)(this);
		},

		// TODO: Don't always label!
		Loop: function () {
			return (0, _esastDistAst.LabeledStatement)(loopId(this), (0, _util.whileStatementInfinite)(t0(this.block)));
		},

		MapEntry: function () {
			const index = vr.listMapEntryIndex(this);
			const k = '_k' + index;
			const v = '_v' + index;
			return (0, _esastDistSpecialize.variableDeclarationConst)([(0, _esastDistAst.VariableDeclarator)((0, _esastDistUtil.idCached)(k), t0(this.key)), (0, _esastDistAst.VariableDeclarator)((0, _esastDistUtil.idCached)(v), t0(this.val))]);
		},

		Member: function () {
			return (0, _esastDistUtil.member)(t0(this.object), this.name);
		},

		Module: function () {
			const body = (0, _UBag.cat)(tLines(this.lines), (0, _UOp.opMap)(this.opDefaultExport, function (_) {
				return (0, _esastDistSpecialize.assignmentExpressionPlain)(_astConstants.ExportsDefault, t0(_));
			}));
			return (0, _esastDistAst.Program)((0, _UBag.cat)((0, _UOp.opIf)(cx.opts.includeUseStrict(), function () {
				return _astConstants.UseStrict;
			}), (0, _UOp.opIf)(cx.opts.amdefine(), function () {
				return _astConstants.AmdefineHeader;
			}), (0, _esastDistUtil.toStatement)(amdWrapModule(this.doUses, this.uses.concat(this.debugUses), body))));
		},

		Quote: function () {
			// TODO:ES6 use template strings
			const part0 = this.parts[0];

			var _ref5 = typeof part0 === 'string' ? [(0, _esastDistAst.Literal)(part0), (0, _UBag.tail)(this.parts)] : [_astConstants.LitEmptyString, this.parts];

			var _ref52 = _slicedToArray(_ref5, 2);

			const first = _ref52[0];
			const restParts = _ref52[1];

			return restParts.reduce(function (ex, _) {
				return (0, _util.binaryExpressionPlus)(ex, typeof _ === 'string' ? (0, _esastDistAst.Literal)(_) : (0, _msCall.msShow)(t0(_)));
			}, first);
		},

		SpecialDo: function () {
			switch (this.kind) {
				case _Expression.SD_Debugger:
					return (0, _esastDistAst.DebuggerStatement)();
				default:
					throw new Error(this.kind);
			}
		},

		SpecialVal: function () {
			// Make new objects because we will assign `loc` to them.
			switch (this.kind) {
				case _Expression.SV_Contains:
					return (0, _esastDistUtil.member)(_msCall.IdMs, 'contains');
				case _Expression.SV_False:
					return (0, _esastDistAst.Literal)(false);
				case _Expression.SV_Null:
					return (0, _esastDistAst.Literal)(null);
				case _Expression.SV_Sub:
					return (0, _esastDistUtil.member)(_msCall.IdMs, 'sub');
				case _Expression.SV_This:
					return (0, _esastDistAst.ThisExpression)();
				case _Expression.SV_ThisModuleDirectory:
					return (0, _esastDistAst.Identifier)('__dirname');
				case _Expression.SV_True:
					return (0, _esastDistAst.Literal)(true);
				case _Expression.SV_Undefined:
					return (0, _util.unaryExpressionVoid)(_astConstants.LitZero);
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
		if (this.test instanceof _Expression.Pattern) {
			var _test = this.test;
			const type = _test.type;
			const patterned = _test.patterned;
			const locals = _test.locals;

			const decl = (0, _esastDistSpecialize.variableDeclarationConst)([(0, _esastDistAst.VariableDeclarator)(_astConstants.IdExtract, (0, _msCall.msExtract)(t0(type), t0(patterned)))]);
			const test = (0, _util.binaryExpressionNotEqual)(_astConstants.IdExtract, _astConstants.LitNull);
			const extract = (0, _esastDistSpecialize.variableDeclarationConst)(locals.map(function (_, idx) {
				return (0, _esastDistAst.VariableDeclarator)((0, _util.idForDeclareCached)(_), (0, _esastDistSpecialize.memberExpression)(_astConstants.IdExtract, (0, _esastDistAst.Literal)(idx)));
			}));
			const res = t1(this.result, extract);
			return (0, _esastDistAst.BlockStatement)([decl, (0, _esastDistAst.IfStatement)(test, res, alternate)]);
		} else {
			const checkedTest = cx.opts.includeCaseChecks() ? (0, _msCall.msBool)(t0(this.test)) : t0(this.test);
			// alternate written to by `caseBody`.
			return (0, _esastDistAst.IfStatement)(checkedTest, t0(this.result), alternate);
		}
	}

	// Functions specific to certain expressions.
	const blockWrap = function (_, block) {
		const invoke = (0, _esastDistSpecialize.callExpressionThunk)((0, _esastDistSpecialize.functionExpressionThunk)(block, isInGenerator));
		return isInGenerator ? (0, _esastDistSpecialize.yieldExpressionDelegate)(invoke) : invoke;
	},
	      caseBody = function (parts, opElse) {
		let acc = (0, _UOp.ifElse)(opElse, t0, function () {
			return (0, _util.throwError)('No branch of `case` matches.');
		});
		for (let i = parts.length - 1; i >= 0; i = i - 1) acc = t1(parts[i], acc);
		return acc;
	},
	      loopId = function (loop) {
		return (0, _esastDistUtil.idCached)('loop' + loop.loc.start.line);
	},
	      transpileBlock = function (returned, lines, _ref6, _ref7, _ref8) {
		var _ref62 = _ref6;
		let lead = _ref62 === undefined ? null : _ref62;
		var _ref72 = _ref7;
		let opResDeclare = _ref72 === undefined ? null : _ref72;
		var _ref82 = _ref8;
		let opOut = _ref82 === undefined ? null : _ref82;

		const fin = (0, _UOp.ifElse)(opResDeclare, function (rd) {
			const ret = maybeWrapInCheckContains(returned, rd.opType, rd.name);
			return (0, _UOp.ifElse)(opOut, function (_) {
				return (0, _UBag.cat)((0, _util.declare)(rd, ret), _, _astConstants.ReturnRes);
			}, function () {
				return (0, _esastDistAst.ReturnStatement)(ret);
			});
		}, function () {
			return (0, _UBag.cat)(opOut, (0, _esastDistAst.ReturnStatement)(returned));
		});
		return (0, _esastDistAst.BlockStatement)((0, _UBag.cat)(lead, tLines(lines), fin));
	};

	// Module helpers
	const amdWrapModule = function (doUses, otherUses, body) {
		const allUses = doUses.concat(otherUses);
		const usePaths = (0, _esastDistAst.ArrayExpression)((0, _UBag.cat)(_astConstants.LitStrExports, allUses.map(function (_) {
			return (0, _esastDistAst.Literal)((0, _manglePath2)(_.path));
		})));
		const useIdentifiers = allUses.map(function (_, i) {
			return (0, _esastDistUtil.idCached)('' + pathBaseName(_.path) + '_' + i);
		});
		const useArgs = (0, _UBag.cat)(_astConstants.IdExports, useIdentifiers);
		const useDos = doUses.map(function (use, i) {
			return (0, _esastDistUtil.loc)((0, _esastDistAst.ExpressionStatement)((0, _msCall.msGetModule)(useIdentifiers[i])), use.loc);
		});
		const opUseDeclare = (0, _UOp.opIf)(!(0, _UBag.isEmpty)(otherUses), function () {
			return (0, _esastDistAst.VariableDeclaration)('const', (0, _UBag.flatMap)(otherUses, function (use, i) {
				return useDeclarators(use, useIdentifiers[i + doUses.length]);
			}));
		});
		const fullBody = (0, _esastDistAst.BlockStatement)((0, _UBag.cat)(useDos, opUseDeclare, body, _astConstants.ReturnExports));
		const lazyBody = cx.opts.lazyModule() ? (0, _esastDistAst.BlockStatement)([(0, _esastDistAst.ExpressionStatement)((0, _esastDistSpecialize.assignmentExpressionPlain)(_astConstants.ExportsGet, (0, _msCall.msLazy)((0, _esastDistSpecialize.functionExpressionThunk)(fullBody))))]) : fullBody;
		return (0, _esastDistAst.CallExpression)(_astConstants.IdDefine, [usePaths, (0, _esastDistSpecialize.functionExpressionPlain)(useArgs, lazyBody)]);
	},
	      pathBaseName = function (path) {
		return path.substr(path.lastIndexOf('/') + 1);
	},
	      useDeclarators = function (use, moduleIdentifier) {
		// TODO: Could be neater about this
		const isLazy = ((0, _UBag.isEmpty)(use.used) ? use.opUseDefault : use.used[0]).isLazy;
		const value = (isLazy ? _msCall.msLazyGetModule : _msCall.msGetModule)(moduleIdentifier);

		const usedDefault = (0, _UOp.opMap)(use.opUseDefault, function (def) {
			const defexp = (0, _msCall.msGetDefaultExport)(moduleIdentifier);
			const val = isLazy ? (0, _msCall.lazyWrap)(defexp) : defexp;
			return (0, _esastDistUtil.loc)((0, _esastDistAst.VariableDeclarator)((0, _util.idForDeclareCached)(def), val), def.loc);
		});

		const usedDestruct = (0, _UBag.isEmpty)(use.used) ? null : makeDestructureDeclarators(use.used, isLazy, value, true, false);

		return (0, _UBag.cat)(usedDefault, usedDestruct);
	};

	// General utils. Not in util.js because these close over cx.
	const makeDestructureDeclarators = function (assignees, isLazy, value, isModule, isExport) {
		const destructuredName = '_$' + assignees[0].loc.start.line;
		const idDestructured = (0, _esastDistAst.Identifier)(destructuredName);
		const declarators = assignees.map(function (assignee) {
			// TODO: Don't compile it if it's never accessed
			const get = getMember(idDestructured, assignee.name, isLazy, isModule);
			return makeDeclarator(assignee, get, isLazy, isExport);
		});
		// Getting lazy module is done by ms.lazyGetModule.
		const val = isLazy && !isModule ? (0, _msCall.lazyWrap)(value) : value;
		return (0, _UBag.unshift)((0, _esastDistAst.VariableDeclarator)(idDestructured, val), declarators);
	},
	      makeDeclarator = function (assignee, value, valueIsAlreadyLazy, isExport) {
		const isLazy = assignee.isLazy;
		const loc = assignee.loc;
		const name = assignee.name;
		const opType = assignee.opType;

		// TODO: assert(assignee.opType === null)
		// or TODO: Allow type check on lazy value?
		value = isLazy ? value : maybeWrapInCheckContains(value, opType, name);
		if (isExport) {
			// TODO:ES6
			cx.check(!isLazy, loc, 'Lazy export not supported.');
			return (0, _esastDistAst.VariableDeclarator)((0, _util.idForDeclareCached)(assignee), (0, _esastDistSpecialize.assignmentExpressionPlain)((0, _esastDistUtil.member)(_astConstants.IdExports, name), value));
		} else {
			const val = isLazy && !valueIsAlreadyLazy ? (0, _msCall.lazyWrap)(value) : value;
			(0, _UUtil.assert)(isLazy || !valueIsAlreadyLazy);
			return (0, _esastDistAst.VariableDeclarator)((0, _util.idForDeclareCached)(assignee), val);
		}
	},
	      maybeWrapInCheckContains = function (ast, opType, name) {
		return cx.opts.includeTypeChecks() && opType !== null ? (0, _msCall.msCheckContains)(t0(opType), ast, (0, _esastDistAst.Literal)(name)) : ast;
	},
	      getMember = function (astObject, gotName, isLazy, isModule) {
		return isLazy ? (0, _msCall.msLazyGet)(astObject, (0, _esastDistAst.Literal)(gotName)) : isModule && cx.opts.includeUseChecks() ? (0, _msCall.msGet)(astObject, (0, _esastDistAst.Literal)(gotName)) : (0, _esastDistUtil.member)(astObject, gotName);
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS90cmFuc3BpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2tCQTZCd0IsU0FBUzs7Ozs7Ozs7OztBQUZqQyxLQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsYUFBYSxDQUFBOztBQUVWLFVBQVMsU0FBUyxDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRSxHQUFHLEVBQUU7QUFDN0QsSUFBRSxHQUFHLEdBQUcsQ0FBQTtBQUNSLElBQUUsR0FBRyxHQUFHLENBQUE7QUFDUixlQUFhLEdBQUcsS0FBSyxDQUFBO0FBQ3JCLFFBQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBOztBQUVoQyxJQUFFLEdBQUcsRUFBRSxHQUFHLFNBQVMsQ0FBQTtBQUNuQixTQUFPLEdBQUcsQ0FBQTtFQUNWOztBQUVELE9BQ0MsRUFBRSxHQUFHLFVBQUEsSUFBSTtTQUFJLG1CQXBDSyxHQUFHLEVBb0NKLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUM7RUFBQTtPQUNuRCxFQUFFLEdBQUcsVUFBQyxJQUFJLEVBQUUsR0FBRztTQUFLLG1CQXJDRixHQUFHLEVBcUNHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDO0VBQUE7T0FDN0QsRUFBRSxHQUFHLFVBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSTtTQUFLLG1CQXRDZCxHQUFHLEVBc0NlLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUM7RUFBQTtPQUNyRixNQUFNLEdBQUcsVUFBQSxLQUFLLEVBQUk7QUFDakIsUUFBTSxHQUFHLEdBQUcsRUFBRyxDQUFBO0FBQ2YsT0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUksRUFBSTtBQUNyQixTQUFN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Y29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS90cmFuc3BpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcnJheUV4cHJlc3Npb24sIEJsb2NrU3RhdGVtZW50LCBCcmVha1N0YXRlbWVudCwgQ2FsbEV4cHJlc3Npb24sIERlYnVnZ2VyU3RhdGVtZW50LFxuXHRFeHByZXNzaW9uU3RhdGVtZW50LCBGdW5jdGlvbkV4cHJlc3Npb24sIElkZW50aWZpZXIsIElmU3RhdGVtZW50LCBMYWJlbGVkU3RhdGVtZW50LCBMaXRlcmFsLFxuXHRPYmplY3RFeHByZXNzaW9uLCBQcm9ncmFtLCBSZXR1cm5TdGF0ZW1lbnQsIFRoaXNFeHByZXNzaW9uLCBWYXJpYWJsZURlY2xhcmF0aW9uLFxuXHRWYXJpYWJsZURlY2xhcmF0b3IsIFJldHVyblN0YXRlbWVudCB9IGZyb20gJ2VzYXN0L2Rpc3QvYXN0J1xuaW1wb3J0IHsgaWRDYWNoZWQsIGxvYywgbWVtYmVyLCBwcm9wZXJ0eUlkT3JMaXRlcmFsQ2FjaGVkLCB0aHVuaywgdG9TdGF0ZW1lbnRcblx0fSBmcm9tICdlc2FzdC9kaXN0L3V0aWwnXG5pbXBvcnQgeyBhc3NpZ25tZW50RXhwcmVzc2lvblBsYWluLCBjYWxsRXhwcmVzc2lvblRodW5rLCBmdW5jdGlvbkV4cHJlc3Npb25QbGFpbixcblx0ZnVuY3Rpb25FeHByZXNzaW9uVGh1bmssIG1lbWJlckV4cHJlc3Npb24sIHByb3BlcnR5LCB2YXJpYWJsZURlY2xhcmF0aW9uQ29uc3QsXG5cdHlpZWxkRXhwcmVzc2lvbkRlbGVnYXRlLCB5aWVsZEV4cHJlc3Npb25Ob0RlbGVnYXRlIH0gZnJvbSAnZXNhc3QvZGlzdC9zcGVjaWFsaXplJ1xuaW1wb3J0ICogYXMgRUV4cG9ydHMgZnJvbSAnLi4vLi4vRXhwcmVzc2lvbidcbmltcG9ydCB7IFBhdHRlcm4sIFNwbGF0LCBTRF9EZWJ1Z2dlciwgU1ZfQ29udGFpbnMsIFNWX0ZhbHNlLCBTVl9OdWxsLCBTVl9TdWIsXG5cdFNWX1RoaXMsIFNWX1RoaXNNb2R1bGVEaXJlY3RvcnksIFNWX1RydWUsIFNWX1VuZGVmaW5lZCB9IGZyb20gJy4uLy4uL0V4cHJlc3Npb24nXG5pbXBvcnQgbWFuZ2xlUGF0aCBmcm9tICcuLi9tYW5nbGVQYXRoJ1xuaW1wb3J0IHsgY2F0LCBmbGF0TWFwLCBpc0VtcHR5LCByYW5nZSwgdGFpbCwgdW5zaGlmdCB9IGZyb20gJy4uL1UvQmFnJ1xuaW1wb3J0IHsgZmxhdE9wTWFwLCBpZkVsc2UsIG9wSWYsIG9wTWFwIH0gZnJvbSAnLi4vVS9vcCdcbmltcG9ydCB7IGFzc2VydCwgaW1wbGVtZW50TWFueSwgaXNQb3NpdGl2ZSB9IGZyb20gJy4uL1UvdXRpbCdcbmltcG9ydCB7IEFtZGVmaW5lSGVhZGVyLCBBcnJheVNsaWNlQ2FsbCwgRXhwb3J0c0RlZmF1bHQsIEV4cG9ydHNHZXQsIElkQXJndW1lbnRzLCBJZERlZmluZSxcblx0SWRFeHBvcnRzLCBJZEV4dHJhY3QsIElkRnVuY3Rpb25BcHBseUNhbGwsIElkTmFtZSwgTGl0RW1wdHlBcnJheSwgTGl0RW1wdHlTdHJpbmcsIExpdE51bGwsXG5cdExpdFN0ckV4cG9ydHMsIExpdFN0ck5hbWUsIExpdFplcm8sIFJldHVybkV4cG9ydHMsIFJldHVyblJlcywgVXNlU3RyaWN0XG5cdH0gZnJvbSAnLi9hc3QtY29uc3RhbnRzJ1xuaW1wb3J0IHsgSWRNcywgbGF6eVdyYXAsIG1zQXJyLCBtc0Jvb2wsIG1zQ2hlY2tDb250YWlucywgbXNFeHRyYWN0LCBtc0dldCwgbXNHZXREZWZhdWx0RXhwb3J0LFxuXHRtc0dldE1vZHVsZSwgbXNMYXp5LCBtc0xhenlHZXQsIG1zTGF6eUdldE1vZHVsZSwgbXNMc2V0LCBtc01hcCwgbXNTZXQsIG1zU2hvd1xuXHR9IGZyb20gJy4vbXMtY2FsbCdcbmltcG9ydCB7IGFjY2Vzc0xvY2FsRGVjbGFyZSwgYmluYXJ5RXhwcmVzc2lvbk5vdEVxdWFsLCBiaW5hcnlFeHByZXNzaW9uUGx1cywgZGVjbGFyZSxcblx0ZGVjbGFyZVNwZWNpYWwsIGlkRm9yRGVjbGFyZUNhY2hlZCwgdGhyb3dFcnJvciwgdW5hcnlFeHByZXNzaW9uTmVnYXRlLCB1bmFyeUV4cHJlc3Npb25Wb2lkLFxuXHR3aGlsZVN0YXRlbWVudEluZmluaXRlIH0gZnJvbSAnLi91dGlsJ1xuXG5sZXQgY3gsIHZyLCBpc0luR2VuZXJhdG9yXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRyYW5zcGlsZShfY3gsIG1vZHVsZUV4cHJlc3Npb24sIF92cikge1xuXHRjeCA9IF9jeFxuXHR2ciA9IF92clxuXHRpc0luR2VuZXJhdG9yID0gZmFsc2Vcblx0Y29uc3QgcmVzID0gdDAobW9kdWxlRXhwcmVzc2lvbilcblx0Ly8gUmVsZWFzZSBmb3IgZ2FyYmFnZSBjb2xsZWN0aW9uXG5cdGN4ID0gdnIgPSB1bmRlZmluZWRcblx0cmV0dXJuIHJlc1xufVxuXG5jb25zdFxuXHR0MCA9IGV4cHIgPT4gbG9jKGV4cHIudHJhbnNwaWxlU3VidHJlZSgpLCBleHByLmxvYyksXG5cdHQxID0gKGV4cHIsIGFyZykgPT4gbG9jKGV4cHIudHJhbnNwaWxlU3VidHJlZShhcmcpLCBleHByLmxvYyksXG5cdHQzID0gKGV4cHIsIGFyZywgYXJnMiwgYXJnMykgPT4gbG9jKGV4cHIudHJhbnNwaWxlU3VidHJlZShhcmcsIGFyZzIsIGFyZzMpLCBleHByLmxvYyksXG5cdHRMaW5lcyA9IGV4cHJzID0+IHtcblx0XHRjb25zdCBvdXQgPSBbIF1cblx0XHRleHBycy5mb3JFYWNoKGV4cHIgPT4ge1xuXHRcdFx0Y29uc3QgYXN0ID0gZXhwci50cmFuc3BpbGVTdWJ0cmVlKClcblx0XHRcdGlmIChhc3QgaW5zdGFuY2VvZiBBcnJheSlcblx0XHRcdFx0Ly8gRGVidWcgbWF5IHByb2R1Y2UgbXVsdGlwbGUgc3RhdGVtZW50cy5cblx0XHRcdFx0YXN0LmZvckVhY2goXyA9PiBvdXQucHVzaCh0b1N0YXRlbWVudChfKSkpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdG91dC5wdXNoKGxvYyh0b1N0YXRlbWVudChhc3QpLCBleHByLmxvYykpXG5cdFx0fSlcblx0XHRyZXR1cm4gb3V0XG5cdH1cblxuaW1wbGVtZW50TWFueShFRXhwb3J0cywgJ3RyYW5zcGlsZVN1YnRyZWUnLCB7XG5cdEFzc2lnbigpIHtcblx0XHRyZXR1cm4gdmFyaWFibGVEZWNsYXJhdGlvbkNvbnN0KFsgbWFrZURlY2xhcmF0b3IoXG5cdFx0XHR0aGlzLmFzc2lnbmVlLCB0MCh0aGlzLnZhbHVlKSwgZmFsc2UsIHZyLmlzRXhwb3J0QXNzaWduKHRoaXMpKSBdKVxuXHR9LFxuXHQvLyBUT0RPOkVTNiBKdXN0IHVzZSBuYXRpdmUgZGVzdHJ1Y3R1cmluZyBhc3NpZ25cblx0QXNzaWduRGVzdHJ1Y3R1cmUoKSB7XG5cdFx0cmV0dXJuIHZhcmlhYmxlRGVjbGFyYXRpb25Db25zdChtYWtlRGVzdHJ1Y3R1cmVEZWNsYXJhdG9ycyhcblx0XHRcdHRoaXMuYXNzaWduZWVzLCB0aGlzLmlzTGF6eSwgdDAodGhpcy52YWx1ZSksIGZhbHNlLCB2ci5pc0V4cG9ydEFzc2lnbih0aGlzKSkpXG5cdH0sXG5cblx0QmFnRW50cnkoKSB7IHJldHVybiBkZWNsYXJlU3BlY2lhbChgXyR7dnIubGlzdE1hcEVudHJ5SW5kZXgodGhpcyl9YCwgdDAodGhpcy52YWx1ZSkpIH0sXG5cblx0QmFnU2ltcGxlKCkgeyByZXR1cm4gQXJyYXlFeHByZXNzaW9uKHRoaXMucGFydHMubWFwKHQwKSkgfSxcblxuXHRCbG9ja0RvKGxlYWQgPSBudWxsLCBvcFJlc0RlY2xhcmUgPSBudWxsLCBvcE91dCA9IG51bGwpIHtcblx0XHRhc3NlcnQob3BSZXNEZWNsYXJlID09PSBudWxsKVxuXHRcdHJldHVybiBCbG9ja1N0YXRlbWVudChjYXQobGVhZCwgdExpbmVzKHRoaXMubGluZXMpLCBvcE91dCkpXG5cdH0sXG5cblx0QmxvY2tXaXRoUmV0dXJuKGxlYWQsIG9wUmVzRGVjbGFyZSwgb3BPdXQpIHtcblx0XHRyZXR1cm4gdHJhbnNwaWxlQmxvY2sodDAodGhpcy5yZXR1cm5lZCksIHRoaXMubGluZXMsIGxlYWQsIG9wUmVzRGVjbGFyZSwgb3BPdXQpXG5cdH0sXG5cblx0QmxvY2tPYmoobGVhZCwgb3BSZXNEZWNsYXJlLCBvcE91dCkge1xuXHRcdC8vIFRPRE86IGluY2x1ZGVUeXBlQ2hlY2tzKCkgaXMgbm90IHRoZSByaWdodCBtZXRob2QgZm9yIHRoaXNcblx0XHRjb25zdCBrZXlzID1cblx0XHRcdGN4Lm9wdHMuaW5jbHVkZVR5cGVDaGVja3MoKSA/IHRoaXMua2V5cyA6IHRoaXMua2V5cy5maWx0ZXIoXyA9PiAhdnIuaXNEZWJ1Z0xvY2FsKF8pKVxuXHRcdGNvbnN0IHJldCA9IGlmRWxzZSh0aGlzLm9wT2JqZWQsXG5cdFx0XHRfID0+IHtcblx0XHRcdFx0Y29uc3Qgb2JqZWQgPSB0MChfKVxuXHRcdFx0XHRjb25zdCBrZXlzVmFscyA9IGNhdChcblx0XHRcdFx0XHRmbGF0TWFwKGtleXMsIGtleSA9PiBbIExpdGVyYWwoa2V5Lm5hbWUpLCBhY2Nlc3NMb2NhbERlY2xhcmUoa2V5KSBdKSxcblx0XHRcdFx0XHRvcE1hcCh0aGlzLm9wTmFtZSwgXyA9PiBbIExpdFN0ck5hbWUsIExpdGVyYWwoXykgXSkpXG5cdFx0XHRcdGNvbnN0IGFueUxhenkgPSBrZXlzLnNvbWUoa2V5ID0+IGtleS5pc0xhenkpXG5cdFx0XHRcdHJldHVybiAoYW55TGF6eSA/IG1zTHNldCA6IG1zU2V0KShvYmplZCwgLi4ua2V5c1ZhbHMpXG5cdFx0XHR9LFxuXHRcdFx0KCkgPT4ge1xuXHRcdFx0XHRjb25zdCBwcm9wcyA9IGtleXMubWFwKGtleSA9PiB7XG5cdFx0XHRcdFx0Y29uc3QgdmFsID0gYWNjZXNzTG9jYWxEZWNsYXJlKGtleSlcblx0XHRcdFx0XHRjb25zdCBpZCA9IHByb3BlcnR5SWRPckxpdGVyYWxDYWNoZWQoa2V5Lm5hbWUpXG5cdFx0XHRcdFx0cmV0dXJuIGtleS5pc0xhenkgPyBwcm9wZXJ0eSgnZ2V0JywgaWQsIHRodW5rKHZhbCkpIDogcHJvcGVydHkoJ2luaXQnLCBpZCwgdmFsKVxuXHRcdFx0XHR9KVxuXHRcdFx0XHRjb25zdCBvcFByb3BOYW1lID0gb3BNYXAodGhpcy5vcE5hbWUsIF8gPT4gcHJvcGVydHkoJ2luaXQnLCBJZE5hbWUsIExpdGVyYWwoXykpKVxuXHRcdFx0XHRyZXR1cm4gT2JqZWN0RXhwcmVzc2lvbihjYXQocHJvcHMsIG9wUHJvcE5hbWUpKVxuXHRcdFx0fSlcblx0XHRyZXR1cm4gdHJhbnNwaWxlQmxvY2socmV0LCB0aGlzLmxpbmVzLCBsZWFkLCBvcFJlc0RlY2xhcmUsIG9wT3V0KVxuXHR9LFxuXG5cdEJsb2NrQmFnKGxlYWQsIG9wUmVzRGVjbGFyZSwgb3BPdXQpIHtcblx0XHRjb25zdCBsZW5ndGggPSB2ci5saXN0TWFwTGVuZ3RoKHRoaXMpXG5cdFx0cmV0dXJuIHRyYW5zcGlsZUJsb2NrKFxuXHRcdFx0QXJyYXlFeHByZXNzaW9uKHJhbmdlKDAsIGxlbmd0aCkubWFwKGkgPT4gaWRDYWNoZWQoYF8ke2l9YCkpKSxcblx0XHRcdHRoaXMubGluZXMsIGxlYWQsIG9wUmVzRGVjbGFyZSwgb3BPdXQpXG5cdH0sXG5cblx0QmxvY2tNYXAobGVhZCwgb3BSZXNEZWNsYXJlLCBvcE91dCkge1xuXHRcdGNvbnN0IGxlbmd0aCA9IHZyLmxpc3RNYXBMZW5ndGgodGhpcylcblx0XHRyZXR1cm4gdHJhbnNwaWxlQmxvY2soXG5cdFx0XHRtc01hcCguLi5mbGF0TWFwKHJhbmdlKDAsIGxlbmd0aCksIGkgPT5cblx0XHRcdFx0WyBpZENhY2hlZChgX2ske2l9YCksIGlkQ2FjaGVkKGBfdiR7aX1gKSBdKSksXG5cdFx0XHR0aGlzLmxpbmVzLCBsZWFkLCBvcFJlc0RlY2xhcmUsIG9wT3V0KVxuXHR9LFxuXG5cdEJsb2NrV3JhcCgpIHsgcmV0dXJuIGJsb2NrV3JhcCh0aGlzLCB0MCh0aGlzLmJsb2NrKSkgfSxcblxuXHRDYWxsKCkge1xuXHRcdGNvbnN0IGFueVNwbGF0ID0gdGhpcy5hcmdzLnNvbWUoYXJnID0+IGFyZyBpbnN0YW5jZW9mIFNwbGF0KVxuXHRcdGlmIChhbnlTcGxhdCkge1xuXHRcdFx0Y29uc3QgYXJncyA9IHRoaXMuYXJncy5tYXAoYXJnID0+XG5cdFx0XHRcdGFyZyBpbnN0YW5jZW9mIFNwbGF0ID9cblx0XHRcdFx0XHRtc0Fycih0MChhcmcuc3BsYXR0ZWQpKSA6XG5cdFx0XHRcdFx0dDAoYXJnKSlcblx0XHRcdHJldHVybiBDYWxsRXhwcmVzc2lvbihJZEZ1bmN0aW9uQXBwbHlDYWxsLCBbXG5cdFx0XHRcdHQwKHRoaXMuY2FsbGVkKSxcblx0XHRcdFx0TGl0TnVsbCxcblx0XHRcdFx0Q2FsbEV4cHJlc3Npb24obWVtYmVyKExpdEVtcHR5QXJyYXksICdjb25jYXQnKSwgYXJncyldKVxuXHRcdH1cblx0XHRlbHNlIHJldHVybiBDYWxsRXhwcmVzc2lvbih0MCh0aGlzLmNhbGxlZCksIHRoaXMuYXJncy5tYXAodDApKVxuXHR9LFxuXG5cdENhc2VEbygpIHtcblx0XHRjb25zdCBib2R5ID0gY2FzZUJvZHkodGhpcy5wYXJ0cywgdGhpcy5vcEVsc2UpXG5cdFx0cmV0dXJuIGlmRWxzZSh0aGlzLm9wQ2FzZWQsIF8gPT4gQmxvY2tTdGF0ZW1lbnQoWyB0MChfKSwgYm9keSBdKSwgKCkgPT4gYm9keSlcblx0fSxcblxuXHRDYXNlVmFsKCkge1xuXHRcdGNvbnN0IGJvZHkgPSBjYXNlQm9keSh0aGlzLnBhcnRzLCB0aGlzLm9wRWxzZSlcblx0XHRjb25zdCBibG9jayA9IGlmRWxzZSh0aGlzLm9wQ2FzZWQsIF8gPT4gWyB0MChfKSwgYm9keSBdLCAoKSA9PiBbIGJvZHkgXSlcblx0XHRyZXR1cm4gYmxvY2tXcmFwKHRoaXMsIEJsb2NrU3RhdGVtZW50KGJsb2NrKSlcblx0fSxcblxuXHRDYXNlRG9QYXJ0OiBjYXNlUGFydCxcblx0Q2FzZVZhbFBhcnQ6IGNhc2VQYXJ0LFxuXHQvLyBUT0RPOiBpbmNsdWRlSW5vdXRDaGVja3MgaXMgbWlzbmFtZWRcblx0RGVidWcoKSB7IHJldHVybiBjeC5vcHRzLmluY2x1ZGVJbm91dENoZWNrcygpID8gdExpbmVzKHRoaXMubGluZXMpIDogWyBdIH0sXG5cblx0T2JqU2ltcGxlKCkge1xuXHRcdHJldHVybiBPYmplY3RFeHByZXNzaW9uKHRoaXMucGFpcnMubWFwKHBhaXIgPT5cblx0XHRcdHByb3BlcnR5KCdpbml0JywgcHJvcGVydHlJZE9yTGl0ZXJhbENhY2hlZChwYWlyLmtleSksIHQwKHBhaXIudmFsdWUpKSkpXG5cdH0sXG5cblx0RW5kTG9vcCgpIHsgcmV0dXJuIEJyZWFrU3RhdGVtZW50KGxvb3BJZCh2ci5lbmRMb29wVG9Mb29wLmdldCh0aGlzKSkpIH0sXG5cblx0RnVuKCkge1xuXHRcdGNvbnN0IG9sZEluR2VuZXJhdG9yID0gaXNJbkdlbmVyYXRvclxuXHRcdGlzSW5HZW5lcmF0b3IgPSB0aGlzLmlzR2VuZXJhdG9yXG5cblx0XHQvLyBUT0RPOkVTNiB1c2UgYC4uLmBmXG5cdFx0Y29uc3QgbkFyZ3MgPSBMaXRlcmFsKHRoaXMuYXJncy5sZW5ndGgpXG5cdFx0Y29uc3Qgb3BEZWNsYXJlUmVzdCA9IG9wTWFwKHRoaXMub3BSZXN0QXJnLCByZXN0ID0+XG5cdFx0XHRkZWNsYXJlKHJlc3QsIENhbGxFeHByZXNzaW9uKEFycmF5U2xpY2VDYWxsLCBbSWRBcmd1bWVudHMsIG5BcmdzXSkpKVxuXHRcdGNvbnN0IGFyZ0NoZWNrcyA9XG5cdFx0XHRvcElmKGN4Lm9wdHMuaW5jbHVkZVR5cGVDaGVja3MoKSwgKCkgPT5cblx0XHRcdFx0ZmxhdE9wTWFwKHRoaXMuYXJncywgXyA9PlxuXHRcdFx0XHRcdC8vIFRPRE86IFdheSB0byB0eXBlY2hlY2sgbGF6aWVzXG5cdFx0XHRcdFx0b3BJZighXy5pc0xhenksICgpID0+XG5cdFx0XHRcdFx0XHRvcE1hcChfLm9wVHlwZSwgdHlwZSA9PlxuXHRcdFx0XHRcdFx0XHRFeHByZXNzaW9uU3RhdGVtZW50KG1zQ2hlY2tDb250YWlucyhcblx0XHRcdFx0XHRcdFx0XHR0MCh0eXBlKSxcblx0XHRcdFx0XHRcdFx0XHRhY2Nlc3NMb2NhbERlY2xhcmUoXyksXG5cdFx0XHRcdFx0XHRcdFx0TGl0ZXJhbChfLm5hbWUpKSkpKSkpXG5cblx0XHRjb25zdCBfaW4gPSBvcE1hcCh0aGlzLm9wSW4sIHQwKVxuXHRcdGNvbnN0IGxlYWQgPSBjYXQob3BEZWNsYXJlUmVzdCwgYXJnQ2hlY2tzLCBfaW4pXG5cblx0XHRjb25zdCBfb3V0ID0gb3BNYXAodGhpcy5vcE91dCwgdDApXG5cdFx0Y29uc3QgYm9keSA9IHQzKHRoaXMuYmxvY2ssIGxlYWQsIHRoaXMub3BSZXNEZWNsYXJlLCBfb3V0KVxuXHRcdGNvbnN0IGFyZ3MgPSB0aGlzLmFyZ3MubWFwKHQwKVxuXHRcdGlzSW5HZW5lcmF0b3IgPSBvbGRJbkdlbmVyYXRvclxuXHRcdGNvbnN0IGlkID0gb3BNYXAodGhpcy5uYW1lLCBpZENhY2hlZClcblx0XHRyZXR1cm4gRnVuY3Rpb25FeHByZXNzaW9uKGlkLCBhcmdzLCBib2R5LCB0aGlzLmlzR2VuZXJhdG9yKVxuXHR9LFxuXG5cdExhenkoKSB7IHJldHVybiBsYXp5V3JhcCh0MCh0aGlzLnZhbHVlKSkgfSxcblxuXHROdW1iZXJMaXRlcmFsKCkge1xuXHRcdC8vIE5lZ2F0aXZlIG51bWJlcnMgYXJlIG5vdCBwYXJ0IG9mIEVTIHNwZWMuXG5cdFx0Ly8gaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzUuMS8jc2VjLTcuOC4zXG5cdFx0Y29uc3QgbGl0ID0gTGl0ZXJhbChNYXRoLmFicyh0aGlzLnZhbHVlKSlcblx0XHRyZXR1cm4gaXNQb3NpdGl2ZSh0aGlzLnZhbHVlKSA/IGxpdCA6IHVuYXJ5RXhwcmVzc2lvbk5lZ2F0ZShsaXQpXG5cdH0sXG5cblx0R2xvYmFsQWNjZXNzKCkgeyByZXR1cm4gSWRlbnRpZmllcih0aGlzLm5hbWUpIH0sXG5cblx0TG9jYWxBY2Nlc3MoKSB7IHJldHVybiBhY2Nlc3NMb2NhbERlY2xhcmUodnIuYWNjZXNzVG9Mb2NhbC5nZXQodGhpcykpIH0sXG5cblx0TG9jYWxEZWNsYXJlKCkgeyByZXR1cm4gaWRGb3JEZWNsYXJlQ2FjaGVkKHRoaXMpIH0sXG5cblx0Ly8gVE9ETzogRG9uJ3QgYWx3YXlzIGxhYmVsIVxuXHRMb29wKCkge1xuXHRcdHJldHVybiBMYWJlbGVkU3RhdGVtZW50KGxvb3BJZCh0aGlzKSwgd2hpbGVTdGF0ZW1lbnRJbmZpbml0ZSh0MCh0aGlzLmJsb2NrKSkpXG5cdH0sXG5cblx0TWFwRW50cnkoKSB7XG5cdFx0Y29uc3QgaW5kZXggPSB2ci5saXN0TWFwRW50cnlJbmRleCh0aGlzKVxuXHRcdGNvbnN0IGsgPSBgX2ske2luZGV4fWBcblx0XHRjb25zdCB2ID0gYF92JHtpbmRleH1gXG5cdFx0cmV0dXJuIHZhcmlhYmxlRGVjbGFyYXRpb25Db25zdChbXG5cdFx0XHRWYXJpYWJsZURlY2xhcmF0b3IoaWRDYWNoZWQoayksIHQwKHRoaXMua2V5KSksXG5cdFx0XHRWYXJpYWJsZURlY2xhcmF0b3IoaWRDYWNoZWQodiksIHQwKHRoaXMudmFsKSlcblx0XHRdKVxuXHR9LFxuXG5cdE1lbWJlcigpIHsgcmV0dXJuIG1lbWJlcih0MCh0aGlzLm9iamVjdCksIHRoaXMubmFtZSkgfSxcblxuXHRNb2R1bGUoKSB7XG5cdFx0Y29uc3QgYm9keSA9IGNhdChcblx0XHRcdHRMaW5lcyh0aGlzLmxpbmVzKSxcblx0XHRcdG9wTWFwKHRoaXMub3BEZWZhdWx0RXhwb3J0LCBfID0+IGFzc2lnbm1lbnRFeHByZXNzaW9uUGxhaW4oRXhwb3J0c0RlZmF1bHQsIHQwKF8pKSkpXG5cdFx0cmV0dXJuIFByb2dyYW0oY2F0KFxuXHRcdFx0b3BJZihjeC5vcHRzLmluY2x1ZGVVc2VTdHJpY3QoKSwgKCkgPT4gVXNlU3RyaWN0KSxcblx0XHRcdG9wSWYoY3gub3B0cy5hbWRlZmluZSgpLCAoKSA9PiBBbWRlZmluZUhlYWRlciksXG5cdFx0XHR0b1N0YXRlbWVudChhbWRXcmFwTW9kdWxlKHRoaXMuZG9Vc2VzLCB0aGlzLnVzZXMuY29uY2F0KHRoaXMuZGVidWdVc2VzKSwgYm9keSkpKSlcblx0fSxcblxuXHRRdW90ZSgpIHtcblx0XHQvLyBUT0RPOkVTNiB1c2UgdGVtcGxhdGUgc3RyaW5nc1xuXHRcdGNvbnN0IHBhcnQwID0gdGhpcy5wYXJ0c1swXVxuXHRcdGNvbnN0IFsgZmlyc3QsIHJlc3RQYXJ0cyBdID1cblx0XHRcdHR5cGVvZiBwYXJ0MCA9PT0gJ3N0cmluZycgP1xuXHRcdFx0XHRbIExpdGVyYWwocGFydDApLCB0YWlsKHRoaXMucGFydHMpIF0gOlxuXHRcdFx0XHRbIExpdEVtcHR5U3RyaW5nLCB0aGlzLnBhcnRzIF1cblx0XHRyZXR1cm4gcmVzdFBhcnRzLnJlZHVjZShcblx0XHRcdChleCwgXykgPT5cblx0XHRcdFx0YmluYXJ5RXhwcmVzc2lvblBsdXMoZXgsIHR5cGVvZiBfID09PSAnc3RyaW5nJyA/IExpdGVyYWwoXykgOiBtc1Nob3codDAoXykpKSxcblx0XHRcdGZpcnN0KVxuXHR9LFxuXG5cdFNwZWNpYWxEbygpIHtcblx0XHRzd2l0Y2ggKHRoaXMua2luZCkge1xuXHRcdFx0Y2FzZSBTRF9EZWJ1Z2dlcjogcmV0dXJuIERlYnVnZ2VyU3RhdGVtZW50KClcblx0XHRcdGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcih0aGlzLmtpbmQpXG5cdFx0fVxuXHR9LFxuXG5cdFNwZWNpYWxWYWwoKSB7XG5cdFx0Ly8gTWFrZSBuZXcgb2JqZWN0cyBiZWNhdXNlIHdlIHdpbGwgYXNzaWduIGBsb2NgIHRvIHRoZW0uXG5cdFx0c3dpdGNoICh0aGlzLmtpbmQpIHtcblx0XHRcdGNhc2UgU1ZfQ29udGFpbnM6IHJldHVybiBtZW1iZXIoSWRNcywgJ2NvbnRhaW5zJylcblx0XHRcdGNhc2UgU1ZfRmFsc2U6IHJldHVybiBMaXRlcmFsKGZhbHNlKVxuXHRcdFx0Y2FzZSBTVl9OdWxsOiByZXR1cm4gTGl0ZXJhbChudWxsKVxuXHRcdFx0Y2FzZSBTVl9TdWI6IHJldHVybiBtZW1iZXIoSWRNcywgJ3N1YicpXG5cdFx0XHRjYXNlIFNWX1RoaXM6IHJldHVybiBcdFRoaXNFeHByZXNzaW9uKClcblx0XHRcdGNhc2UgU1ZfVGhpc01vZHVsZURpcmVjdG9yeTogcmV0dXJuIElkZW50aWZpZXIoJ19fZGlybmFtZScpXG5cdFx0XHRjYXNlIFNWX1RydWU6IHJldHVybiBMaXRlcmFsKHRydWUpXG5cdFx0XHRjYXNlIFNWX1VuZGVmaW5lZDogcmV0dXJuIHVuYXJ5RXhwcmVzc2lvblZvaWQoTGl0WmVybylcblx0XHRcdGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcih0aGlzLmtpbmQpXG5cdFx0fVxuXHR9LFxuXG5cdFlpZWxkKCkgeyByZXR1cm4geWllbGRFeHByZXNzaW9uTm9EZWxlZ2F0ZSh0MCh0aGlzLnlpZWxkZWQpKSB9LFxuXG5cdFlpZWxkVG8oKSB7IHJldHVybiB5aWVsZEV4cHJlc3Npb25EZWxlZ2F0ZSh0MCh0aGlzLnlpZWxkZWRUbykpIH1cbn0pXG5cbmZ1bmN0aW9uIGNhc2VQYXJ0KGFsdGVybmF0ZSkge1xuXHRpZiAodGhpcy50ZXN0IGluc3RhbmNlb2YgUGF0dGVybikge1xuXHRcdGNvbnN0IHsgdHlwZSwgcGF0dGVybmVkLCBsb2NhbHMgfSA9IHRoaXMudGVzdFxuXHRcdGNvbnN0IGRlY2wgPSB2YXJpYWJsZURlY2xhcmF0aW9uQ29uc3QoW1xuXHRcdFx0VmFyaWFibGVEZWNsYXJhdG9yKElkRXh0cmFjdCwgbXNFeHRyYWN0KHQwKHR5cGUpLCB0MChwYXR0ZXJuZWQpKSkgXSlcblx0XHRjb25zdCB0ZXN0ID0gYmluYXJ5RXhwcmVzc2lvbk5vdEVxdWFsKElkRXh0cmFjdCwgTGl0TnVsbClcblx0XHRjb25zdCBleHRyYWN0ID0gdmFyaWFibGVEZWNsYXJhdGlvbkNvbnN0KGxvY2Fscy5tYXAoKF8sIGlkeCkgPT5cblx0XHRcdFZhcmlhYmxlRGVjbGFyYXRvcihpZEZvckRlY2xhcmVDYWNoZWQoXyksIG1lbWJlckV4cHJlc3Npb24oSWRFeHRyYWN0LCBMaXRlcmFsKGlkeCkpKSkpXG5cdFx0Y29uc3QgcmVzID0gdDEodGhpcy5yZXN1bHQsIGV4dHJhY3QpXG5cdFx0cmV0dXJuIEJsb2NrU3RhdGVtZW50KFsgZGVjbCwgSWZTdGF0ZW1lbnQodGVzdCwgcmVzLCBhbHRlcm5hdGUpIF0pXG5cdH0gZWxzZSB7XG5cdFx0Y29uc3QgY2hlY2tlZFRlc3QgPSBjeC5vcHRzLmluY2x1ZGVDYXNlQ2hlY2tzKCkgPyBtc0Jvb2wodDAodGhpcy50ZXN0KSkgOiB0MCh0aGlzLnRlc3QpXG5cdFx0Ly8gYWx0ZXJuYXRlIHdyaXR0ZW4gdG8gYnkgYGNhc2VCb2R5YC5cblx0XHRyZXR1cm4gSWZTdGF0ZW1lbnQoY2hlY2tlZFRlc3QsIHQwKHRoaXMucmVzdWx0KSwgYWx0ZXJuYXRlKVxuXHR9XG59XG5cbi8vIEZ1bmN0aW9ucyBzcGVjaWZpYyB0byBjZXJ0YWluIGV4cHJlc3Npb25zLlxuY29uc3Rcblx0YmxvY2tXcmFwID0gKF8sIGJsb2NrKSA9PiB7XG5cdFx0Y29uc3QgaW52b2tlID0gY2FsbEV4cHJlc3Npb25UaHVuayhmdW5jdGlvbkV4cHJlc3Npb25UaHVuayhibG9jaywgaXNJbkdlbmVyYXRvcikpXG5cdFx0cmV0dXJuIGlzSW5HZW5lcmF0b3IgPyB5aWVsZEV4cHJlc3Npb25EZWxlZ2F0ZShpbnZva2UpIDogaW52b2tlXG5cdH0sXG5cblx0Y2FzZUJvZHkgPSAocGFydHMsIG9wRWxzZSkgPT4ge1xuXHRcdGxldCBhY2MgPSBpZkVsc2Uob3BFbHNlLCB0MCwgKCkgPT4gdGhyb3dFcnJvcignTm8gYnJhbmNoIG9mIGBjYXNlYCBtYXRjaGVzLicpKVxuXHRcdGZvciAobGV0IGkgPSBwYXJ0cy5sZW5ndGggLSAxOyBpID49IDA7IGkgPSBpIC0gMSlcblx0XHRcdGFjYyA9IHQxKHBhcnRzW2ldLCBhY2MpXG5cdFx0cmV0dXJuIGFjY1xuXHR9LFxuXG5cdGxvb3BJZCA9IGxvb3AgPT4gaWRDYWNoZWQoYGxvb3Ake2xvb3AubG9jLnN0YXJ0LmxpbmV9YCksXG5cblx0dHJhbnNwaWxlQmxvY2sgPSAocmV0dXJuZWQsIGxpbmVzLCBsZWFkID0gbnVsbCwgb3BSZXNEZWNsYXJlID0gbnVsbCwgb3BPdXQgPSBudWxsKSA9PiB7XG5cdFx0Y29uc3QgZmluID0gaWZFbHNlKG9wUmVzRGVjbGFyZSxcblx0XHRcdHJkID0+IHtcblx0XHRcdFx0Y29uc3QgcmV0ID0gbWF5YmVXcmFwSW5DaGVja0NvbnRhaW5zKHJldHVybmVkLCByZC5vcFR5cGUsIHJkLm5hbWUpXG5cdFx0XHRcdHJldHVybiBpZkVsc2Uob3BPdXQsXG5cdFx0XHRcdFx0XyA9PiBjYXQoZGVjbGFyZShyZCwgcmV0KSwgXywgUmV0dXJuUmVzKSxcblx0XHRcdFx0XHQoKSA9PiBSZXR1cm5TdGF0ZW1lbnQocmV0KSlcblx0XHRcdH0sXG5cdFx0XHQoKSA9PiBjYXQob3BPdXQsIFJldHVyblN0YXRlbWVudChyZXR1cm5lZCkpKVxuXHRcdHJldHVybiBCbG9ja1N0YXRlbWVudChjYXQobGVhZCwgdExpbmVzKGxpbmVzKSwgZmluKSlcblx0fVxuXG4vLyBNb2R1bGUgaGVscGVyc1xuY29uc3Rcblx0YW1kV3JhcE1vZHVsZSA9IChkb1VzZXMsIG90aGVyVXNlcywgYm9keSkgPT4ge1xuXHRcdGNvbnN0IGFsbFVzZXMgPSBkb1VzZXMuY29uY2F0KG90aGVyVXNlcylcblx0XHRjb25zdCB1c2VQYXRocyA9IEFycmF5RXhwcmVzc2lvbihjYXQoXG5cdFx0XHRMaXRTdHJFeHBvcnRzLFxuXHRcdFx0YWxsVXNlcy5tYXAoXyA9PiBMaXRlcmFsKG1hbmdsZVBhdGgoXy5wYXRoKSkpKSlcblx0XHRjb25zdCB1c2VJZGVudGlmaWVycyA9IGFsbFVzZXMubWFwKChfLCBpKSA9PiBpZENhY2hlZChgJHtwYXRoQmFzZU5hbWUoXy5wYXRoKX1fJHtpfWApKVxuXHRcdGNvbnN0IHVzZUFyZ3MgPSBjYXQoSWRFeHBvcnRzLCB1c2VJZGVudGlmaWVycylcblx0XHRjb25zdCB1c2VEb3MgPSBkb1VzZXMubWFwKCh1c2UsIGkpID0+XG5cdFx0XHRsb2MoRXhwcmVzc2lvblN0YXRlbWVudChtc0dldE1vZHVsZSh1c2VJZGVudGlmaWVyc1tpXSkpLCB1c2UubG9jKSlcblx0XHRjb25zdCBvcFVzZURlY2xhcmUgPSBvcElmKCFpc0VtcHR5KG90aGVyVXNlcyksXG5cdFx0XHQoKSA9PiBWYXJpYWJsZURlY2xhcmF0aW9uKCdjb25zdCcsIGZsYXRNYXAob3RoZXJVc2VzLCAodXNlLCBpKSA9PlxuXHRcdFx0XHR1c2VEZWNsYXJhdG9ycyh1c2UsIHVzZUlkZW50aWZpZXJzW2kgKyBkb1VzZXMubGVuZ3RoXSkpKSlcblx0XHRjb25zdCBmdWxsQm9keSA9IEJsb2NrU3RhdGVtZW50KGNhdCh1c2VEb3MsIG9wVXNlRGVjbGFyZSwgYm9keSwgUmV0dXJuRXhwb3J0cykpXG5cdFx0Y29uc3QgbGF6eUJvZHkgPVxuXHRcdFx0Y3gub3B0cy5sYXp5TW9kdWxlKCkgP1xuXHRcdFx0XHRCbG9ja1N0YXRlbWVudChbIEV4cHJlc3Npb25TdGF0ZW1lbnQoXG5cdFx0XHRcdFx0YXNzaWdubWVudEV4cHJlc3Npb25QbGFpbihFeHBvcnRzR2V0LFxuXHRcdFx0XHRcdFx0bXNMYXp5KGZ1bmN0aW9uRXhwcmVzc2lvblRodW5rKGZ1bGxCb2R5KSkpKSBdKSA6XG5cdFx0XHRcdGZ1bGxCb2R5XG5cdFx0cmV0dXJuIENhbGxFeHByZXNzaW9uKElkRGVmaW5lLCBbIHVzZVBhdGhzLCBmdW5jdGlvbkV4cHJlc3Npb25QbGFpbih1c2VBcmdzLCBsYXp5Qm9keSkgXSlcblx0fSxcblxuXHRwYXRoQmFzZU5hbWUgPSBwYXRoID0+XG5cdFx0cGF0aC5zdWJzdHIocGF0aC5sYXN0SW5kZXhPZignLycpICsgMSksXG5cblx0dXNlRGVjbGFyYXRvcnMgPSAodXNlLCBtb2R1bGVJZGVudGlmaWVyKSA9PiB7XG5cdFx0Ly8gVE9ETzogQ291bGQgYmUgbmVhdGVyIGFib3V0IHRoaXNcblx0XHRjb25zdCBpc0xhenkgPSAoaXNFbXB0eSh1c2UudXNlZCkgPyB1c2Uub3BVc2VEZWZhdWx0IDogdXNlLnVzZWRbMF0pLmlzTGF6eVxuXHRcdGNvbnN0IHZhbHVlID0gKGlzTGF6eSA/IG1zTGF6eUdldE1vZHVsZSA6IG1zR2V0TW9kdWxlKShtb2R1bGVJZGVudGlmaWVyKVxuXG5cdFx0Y29uc3QgdXNlZERlZmF1bHQgPSBvcE1hcCh1c2Uub3BVc2VEZWZhdWx0LCBkZWYgPT4ge1xuXHRcdFx0Y29uc3QgZGVmZXhwID0gbXNHZXREZWZhdWx0RXhwb3J0KG1vZHVsZUlkZW50aWZpZXIpXG5cdFx0XHRjb25zdCB2YWwgPSBpc0xhenkgPyBsYXp5V3JhcChkZWZleHApIDogZGVmZXhwXG5cdFx0XHRyZXR1cm4gbG9jKFZhcmlhYmxlRGVjbGFyYXRvcihpZEZvckRlY2xhcmVDYWNoZWQoZGVmKSwgdmFsKSwgZGVmLmxvYylcblx0XHR9KVxuXG5cdFx0Y29uc3QgdXNlZERlc3RydWN0ID0gaXNFbXB0eSh1c2UudXNlZCkgPyBudWxsIDpcblx0XHRcdG1ha2VEZXN0cnVjdHVyZURlY2xhcmF0b3JzKHVzZS51c2VkLCBpc0xhenksIHZhbHVlLCB0cnVlLCBmYWxzZSlcblxuXHRcdHJldHVybiBjYXQodXNlZERlZmF1bHQsIHVzZWREZXN0cnVjdClcblx0fVxuXG4vLyBHZW5lcmFsIHV0aWxzLiBOb3QgaW4gdXRpbC5qcyBiZWNhdXNlIHRoZXNlIGNsb3NlIG92ZXIgY3guXG5jb25zdFxuXHRtYWtlRGVzdHJ1Y3R1cmVEZWNsYXJhdG9ycyA9IChhc3NpZ25lZXMsIGlzTGF6eSwgdmFsdWUsIGlzTW9kdWxlLCBpc0V4cG9ydCkgPT4ge1xuXHRcdGNvbnN0IGRlc3RydWN0dXJlZE5hbWUgPSBgXyQke2Fzc2lnbmVlc1swXS5sb2Muc3RhcnQubGluZX1gXG5cdFx0Y29uc3QgaWREZXN0cnVjdHVyZWQgPSBJZGVudGlmaWVyKGRlc3RydWN0dXJlZE5hbWUpXG5cdFx0Y29uc3QgZGVjbGFyYXRvcnMgPSBhc3NpZ25lZXMubWFwKGFzc2lnbmVlID0+IHtcblx0XHRcdC8vIFRPRE86IERvbid0IGNvbXBpbGUgaXQgaWYgaXQncyBuZXZlciBhY2Nlc3NlZFxuXHRcdFx0Y29uc3QgZ2V0ID0gZ2V0TWVtYmVyKGlkRGVzdHJ1Y3R1cmVkLCBhc3NpZ25lZS5uYW1lLCBpc0xhenksIGlzTW9kdWxlKVxuXHRcdFx0cmV0dXJuIG1ha2VEZWNsYXJhdG9yKGFzc2lnbmVlLCBnZXQsIGlzTGF6eSwgaXNFeHBvcnQpXG5cdFx0fSlcblx0XHQvLyBHZXR0aW5nIGxhenkgbW9kdWxlIGlzIGRvbmUgYnkgbXMubGF6eUdldE1vZHVsZS5cblx0XHRjb25zdCB2YWwgPSAoaXNMYXp5ICYmICFpc01vZHVsZSkgPyBsYXp5V3JhcCh2YWx1ZSkgOiB2YWx1ZVxuXHRcdHJldHVybiB1bnNoaWZ0KFZhcmlhYmxlRGVjbGFyYXRvcihpZERlc3RydWN0dXJlZCwgdmFsKSwgZGVjbGFyYXRvcnMpXG5cdH0sXG5cblx0bWFrZURlY2xhcmF0b3IgPSAoYXNzaWduZWUsIHZhbHVlLCB2YWx1ZUlzQWxyZWFkeUxhenksIGlzRXhwb3J0KSA9PiB7XG5cdFx0Y29uc3QgeyBpc0xhenksIGxvYywgbmFtZSwgb3BUeXBlIH0gPSBhc3NpZ25lZVxuXHRcdC8vIFRPRE86IGFzc2VydChhc3NpZ25lZS5vcFR5cGUgPT09IG51bGwpXG5cdFx0Ly8gb3IgVE9ETzogQWxsb3cgdHlwZSBjaGVjayBvbiBsYXp5IHZhbHVlP1xuXHRcdHZhbHVlID0gaXNMYXp5ID8gdmFsdWUgOiBtYXliZVdyYXBJbkNoZWNrQ29udGFpbnModmFsdWUsIG9wVHlwZSwgbmFtZSlcblx0XHRpZiAoaXNFeHBvcnQpIHtcblx0XHRcdC8vIFRPRE86RVM2XG5cdFx0XHRjeC5jaGVjayghaXNMYXp5LCBsb2MsICdMYXp5IGV4cG9ydCBub3Qgc3VwcG9ydGVkLicpXG5cdFx0XHRyZXR1cm4gVmFyaWFibGVEZWNsYXJhdG9yKFxuXHRcdFx0XHRpZEZvckRlY2xhcmVDYWNoZWQoYXNzaWduZWUpLFxuXHRcdFx0XHRhc3NpZ25tZW50RXhwcmVzc2lvblBsYWluKG1lbWJlcihJZEV4cG9ydHMsIG5hbWUpLCB2YWx1ZSkpXG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IHZhbCA9IGlzTGF6eSAmJiAhdmFsdWVJc0FscmVhZHlMYXp5ID8gbGF6eVdyYXAodmFsdWUpIDogdmFsdWVcblx0XHRcdGFzc2VydChpc0xhenkgfHwgIXZhbHVlSXNBbHJlYWR5TGF6eSlcblx0XHRcdHJldHVybiBWYXJpYWJsZURlY2xhcmF0b3IoaWRGb3JEZWNsYXJlQ2FjaGVkKGFzc2lnbmVlKSwgdmFsKVxuXHRcdH1cblx0fSxcblxuXHRtYXliZVdyYXBJbkNoZWNrQ29udGFpbnMgPSAoYXN0LCBvcFR5cGUsIG5hbWUpID0+XG5cdFx0KGN4Lm9wdHMuaW5jbHVkZVR5cGVDaGVja3MoKSAmJiBvcFR5cGUgIT09IG51bGwpID9cblx0XHRcdG1zQ2hlY2tDb250YWlucyh0MChvcFR5cGUpLCBhc3QsIExpdGVyYWwobmFtZSkpIDpcblx0XHRcdGFzdCxcblxuXHRnZXRNZW1iZXIgPSAoYXN0T2JqZWN0LCBnb3ROYW1lLCBpc0xhenksIGlzTW9kdWxlKSA9PlxuXHRcdGlzTGF6eSA/XG5cdFx0bXNMYXp5R2V0KGFzdE9iamVjdCwgTGl0ZXJhbChnb3ROYW1lKSkgOlxuXHRcdGlzTW9kdWxlICYmIGN4Lm9wdHMuaW5jbHVkZVVzZUNoZWNrcygpID9cblx0XHRtc0dldChhc3RPYmplY3QsIExpdGVyYWwoZ290TmFtZSkpIDpcblx0XHRtZW1iZXIoYXN0T2JqZWN0LCBnb3ROYW1lKVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=