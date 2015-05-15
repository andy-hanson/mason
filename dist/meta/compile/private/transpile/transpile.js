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
				}), (0, _UOp.opMap)(_this.opDisplayName, function (_) {
					return [_astConstants.LitStrDisplayName, (0, _esastDistAst.Literal)(_)];
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
				const opPropDisplayName = (0, _UOp.opMap)(_this.opDisplayName, function (_) {
					return (0, _esastDistSpecialize.property)('init', _astConstants.IdDisplayName, (0, _esastDistAst.Literal)(_));
				});
				return (0, _esastDistAst.ObjectExpression)((0, _UBag.cat)(props, opPropDisplayName));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS90cmFuc3BpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2tCQTZCd0IsU0FBUzs7Ozs7Ozs7OztBQUZqQyxLQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsYUFBYSxDQUFBOztBQUVWLFVBQVMsU0FBUyxDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRSxHQUFHLEVBQUU7QUFDN0QsSUFBRSxHQUFHLEdBQUcsQ0FBQTtBQUNSLElBQUUsR0FBRyxHQUFHLENBQUE7QUFDUixlQUFhLEdBQUcsS0FBSyxDQUFBO0FBQ3JCLFFBQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBOztBQUVoQyxJQUFFLEdBQUcsRUFBRSxHQUFHLFNBQVMsQ0FBQTtBQUNuQixTQUFPLEdBQUcsQ0FBQTtFQUNWOztBQUVELE9BQ0MsRUFBRSxHQUFHLFVBQUEsSUFBSTtTQUFJLG1CQXBDSyxHQUFHLEVBb0NKLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUM7RUFBQTtPQUNuRCxFQUFFLEdBQUcsVUFBQyxJQUFJLEVBQUUsR0FBRztTQUFLLG1CQXJDRixHQUFHLEVBcUNHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDO0VBQUE7T0FDN0QsRUFBRSxHQUFHLFVBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSTtTQUFLLG1CQXRDZCxHQUFHLEVBc0NlLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUM7RUFBQTtPQUNyRixNQUFNLEdBQUcsVUFBQSxLQUFLLEVBQUk7QUFDakIsUUFBTSxHQUFHLEdBQUcsRUFBRyxDQUFBO0FBQ2YsT0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUksRUFBSTtBQUNyQixTQUFN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aWxlIjoibWV0YS9jb21waWxlL3ByaXZhdGUvdHJhbnNwaWxlL3RyYW5zcGlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFycmF5RXhwcmVzc2lvbiwgQmxvY2tTdGF0ZW1lbnQsIEJyZWFrU3RhdGVtZW50LCBDYWxsRXhwcmVzc2lvbiwgRGVidWdnZXJTdGF0ZW1lbnQsXG5cdEV4cHJlc3Npb25TdGF0ZW1lbnQsIEZ1bmN0aW9uRXhwcmVzc2lvbiwgSWRlbnRpZmllciwgSWZTdGF0ZW1lbnQsIExhYmVsZWRTdGF0ZW1lbnQsIExpdGVyYWwsXG5cdE9iamVjdEV4cHJlc3Npb24sIFByb2dyYW0sIFJldHVyblN0YXRlbWVudCwgVGhpc0V4cHJlc3Npb24sIFZhcmlhYmxlRGVjbGFyYXRpb24sXG5cdFZhcmlhYmxlRGVjbGFyYXRvciwgUmV0dXJuU3RhdGVtZW50IH0gZnJvbSAnZXNhc3QvZGlzdC9hc3QnXG5pbXBvcnQgeyBpZENhY2hlZCwgbG9jLCBtZW1iZXIsIHByb3BlcnR5SWRPckxpdGVyYWxDYWNoZWQsIHRodW5rLCB0b1N0YXRlbWVudFxuXHR9IGZyb20gJ2VzYXN0L2Rpc3QvdXRpbCdcbmltcG9ydCB7IGFzc2lnbm1lbnRFeHByZXNzaW9uUGxhaW4sIGNhbGxFeHByZXNzaW9uVGh1bmssIGZ1bmN0aW9uRXhwcmVzc2lvblBsYWluLFxuXHRmdW5jdGlvbkV4cHJlc3Npb25UaHVuaywgbWVtYmVyRXhwcmVzc2lvbiwgcHJvcGVydHksIHZhcmlhYmxlRGVjbGFyYXRpb25Db25zdCxcblx0eWllbGRFeHByZXNzaW9uRGVsZWdhdGUsIHlpZWxkRXhwcmVzc2lvbk5vRGVsZWdhdGUgfSBmcm9tICdlc2FzdC9kaXN0L3NwZWNpYWxpemUnXG5pbXBvcnQgKiBhcyBFRXhwb3J0cyBmcm9tICcuLi8uLi9FeHByZXNzaW9uJ1xuaW1wb3J0IHsgUGF0dGVybiwgU3BsYXQsIFNEX0RlYnVnZ2VyLCBTVl9Db250YWlucywgU1ZfRmFsc2UsIFNWX051bGwsIFNWX1N1Yixcblx0U1ZfVGhpcywgU1ZfVGhpc01vZHVsZURpcmVjdG9yeSwgU1ZfVHJ1ZSwgU1ZfVW5kZWZpbmVkIH0gZnJvbSAnLi4vLi4vRXhwcmVzc2lvbidcbmltcG9ydCBtYW5nbGVQYXRoIGZyb20gJy4uL21hbmdsZVBhdGgnXG5pbXBvcnQgeyBjYXQsIGZsYXRNYXAsIGlzRW1wdHksIHJhbmdlLCB0YWlsLCB1bnNoaWZ0IH0gZnJvbSAnLi4vVS9CYWcnXG5pbXBvcnQgeyBmbGF0T3BNYXAsIGlmRWxzZSwgb3BJZiwgb3BNYXAgfSBmcm9tICcuLi9VL29wJ1xuaW1wb3J0IHsgYXNzZXJ0LCBpbXBsZW1lbnRNYW55LCBpc1Bvc2l0aXZlIH0gZnJvbSAnLi4vVS91dGlsJ1xuaW1wb3J0IHsgQW1kZWZpbmVIZWFkZXIsIEFycmF5U2xpY2VDYWxsLCBFeHBvcnRzRGVmYXVsdCwgRXhwb3J0c0dldCwgSWREZWZpbmUsIElkRGlzcGxheU5hbWUsXG5cdElkQXJndW1lbnRzLCBJZEV4cG9ydHMsIElkRXh0cmFjdCwgSWRGdW5jdGlvbkFwcGx5Q2FsbCwgTGl0RW1wdHlBcnJheSwgTGl0RW1wdHlTdHJpbmcsIExpdE51bGwsXG5cdExpdFN0ckRpc3BsYXlOYW1lLCBMaXRTdHJFeHBvcnRzLCBMaXRaZXJvLCBSZXR1cm5FeHBvcnRzLCBSZXR1cm5SZXMsIFVzZVN0cmljdFxuXHR9IGZyb20gJy4vYXN0LWNvbnN0YW50cydcbmltcG9ydCB7IElkTXMsIGxhenlXcmFwLCBtc0FyciwgbXNCb29sLCBtc0NoZWNrQ29udGFpbnMsIG1zRXh0cmFjdCwgbXNHZXQsIG1zR2V0RGVmYXVsdEV4cG9ydCxcblx0bXNHZXRNb2R1bGUsIG1zTGF6eSwgbXNMYXp5R2V0LCBtc0xhenlHZXRNb2R1bGUsIG1zTHNldCwgbXNNYXAsIG1zU2V0LCBtc1Nob3dcblx0fSBmcm9tICcuL21zLWNhbGwnXG5pbXBvcnQgeyBhY2Nlc3NMb2NhbERlY2xhcmUsIGJpbmFyeUV4cHJlc3Npb25Ob3RFcXVhbCwgYmluYXJ5RXhwcmVzc2lvblBsdXMsIGRlY2xhcmUsXG5cdGRlY2xhcmVTcGVjaWFsLCBpZEZvckRlY2xhcmVDYWNoZWQsIHRocm93RXJyb3IsIHVuYXJ5RXhwcmVzc2lvbk5lZ2F0ZSwgdW5hcnlFeHByZXNzaW9uVm9pZCxcblx0d2hpbGVTdGF0ZW1lbnRJbmZpbml0ZSB9IGZyb20gJy4vdXRpbCdcblxubGV0IGN4LCB2ciwgaXNJbkdlbmVyYXRvclxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cmFuc3BpbGUoX2N4LCBtb2R1bGVFeHByZXNzaW9uLCBfdnIpIHtcblx0Y3ggPSBfY3hcblx0dnIgPSBfdnJcblx0aXNJbkdlbmVyYXRvciA9IGZhbHNlXG5cdGNvbnN0IHJlcyA9IHQwKG1vZHVsZUV4cHJlc3Npb24pXG5cdC8vIFJlbGVhc2UgZm9yIGdhcmJhZ2UgY29sbGVjdGlvblxuXHRjeCA9IHZyID0gdW5kZWZpbmVkXG5cdHJldHVybiByZXNcbn1cblxuY29uc3Rcblx0dDAgPSBleHByID0+IGxvYyhleHByLnRyYW5zcGlsZVN1YnRyZWUoKSwgZXhwci5sb2MpLFxuXHR0MSA9IChleHByLCBhcmcpID0+IGxvYyhleHByLnRyYW5zcGlsZVN1YnRyZWUoYXJnKSwgZXhwci5sb2MpLFxuXHR0MyA9IChleHByLCBhcmcsIGFyZzIsIGFyZzMpID0+IGxvYyhleHByLnRyYW5zcGlsZVN1YnRyZWUoYXJnLCBhcmcyLCBhcmczKSwgZXhwci5sb2MpLFxuXHR0TGluZXMgPSBleHBycyA9PiB7XG5cdFx0Y29uc3Qgb3V0ID0gWyBdXG5cdFx0ZXhwcnMuZm9yRWFjaChleHByID0+IHtcblx0XHRcdGNvbnN0IGFzdCA9IGV4cHIudHJhbnNwaWxlU3VidHJlZSgpXG5cdFx0XHRpZiAoYXN0IGluc3RhbmNlb2YgQXJyYXkpXG5cdFx0XHRcdC8vIERlYnVnIG1heSBwcm9kdWNlIG11bHRpcGxlIHN0YXRlbWVudHMuXG5cdFx0XHRcdGFzdC5mb3JFYWNoKF8gPT4gb3V0LnB1c2godG9TdGF0ZW1lbnQoXykpKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRvdXQucHVzaChsb2ModG9TdGF0ZW1lbnQoYXN0KSwgZXhwci5sb2MpKVxuXHRcdH0pXG5cdFx0cmV0dXJuIG91dFxuXHR9XG5cbmltcGxlbWVudE1hbnkoRUV4cG9ydHMsICd0cmFuc3BpbGVTdWJ0cmVlJywge1xuXHRBc3NpZ24oKSB7XG5cdFx0cmV0dXJuIHZhcmlhYmxlRGVjbGFyYXRpb25Db25zdChbIG1ha2VEZWNsYXJhdG9yKFxuXHRcdFx0dGhpcy5hc3NpZ25lZSwgdDAodGhpcy52YWx1ZSksIGZhbHNlLCB2ci5pc0V4cG9ydEFzc2lnbih0aGlzKSkgXSlcblx0fSxcblx0Ly8gVE9ETzpFUzYgSnVzdCB1c2UgbmF0aXZlIGRlc3RydWN0dXJpbmcgYXNzaWduXG5cdEFzc2lnbkRlc3RydWN0dXJlKCkge1xuXHRcdHJldHVybiB2YXJpYWJsZURlY2xhcmF0aW9uQ29uc3QobWFrZURlc3RydWN0dXJlRGVjbGFyYXRvcnMoXG5cdFx0XHR0aGlzLmFzc2lnbmVlcywgdGhpcy5pc0xhenksIHQwKHRoaXMudmFsdWUpLCBmYWxzZSwgdnIuaXNFeHBvcnRBc3NpZ24odGhpcykpKVxuXHR9LFxuXG5cdEJhZ0VudHJ5KCkgeyByZXR1cm4gZGVjbGFyZVNwZWNpYWwoYF8ke3ZyLmxpc3RNYXBFbnRyeUluZGV4KHRoaXMpfWAsIHQwKHRoaXMudmFsdWUpKSB9LFxuXG5cdEJhZ1NpbXBsZSgpIHsgcmV0dXJuIEFycmF5RXhwcmVzc2lvbih0aGlzLnBhcnRzLm1hcCh0MCkpIH0sXG5cblx0QmxvY2tEbyhsZWFkID0gbnVsbCwgb3BSZXNEZWNsYXJlID0gbnVsbCwgb3BPdXQgPSBudWxsKSB7XG5cdFx0YXNzZXJ0KG9wUmVzRGVjbGFyZSA9PT0gbnVsbClcblx0XHRyZXR1cm4gQmxvY2tTdGF0ZW1lbnQoY2F0KGxlYWQsIHRMaW5lcyh0aGlzLmxpbmVzKSwgb3BPdXQpKVxuXHR9LFxuXG5cdEJsb2NrV2l0aFJldHVybihsZWFkLCBvcFJlc0RlY2xhcmUsIG9wT3V0KSB7XG5cdFx0cmV0dXJuIHRyYW5zcGlsZUJsb2NrKHQwKHRoaXMucmV0dXJuZWQpLCB0aGlzLmxpbmVzLCBsZWFkLCBvcFJlc0RlY2xhcmUsIG9wT3V0KVxuXHR9LFxuXG5cdEJsb2NrT2JqKGxlYWQsIG9wUmVzRGVjbGFyZSwgb3BPdXQpIHtcblx0XHQvLyBUT0RPOiBpbmNsdWRlVHlwZUNoZWNrcygpIGlzIG5vdCB0aGUgcmlnaHQgbWV0aG9kIGZvciB0aGlzXG5cdFx0Y29uc3Qga2V5cyA9XG5cdFx0XHRjeC5vcHRzLmluY2x1ZGVUeXBlQ2hlY2tzKCkgPyB0aGlzLmtleXMgOiB0aGlzLmtleXMuZmlsdGVyKF8gPT4gIXZyLmlzRGVidWdMb2NhbChfKSlcblx0XHRjb25zdCByZXQgPSBpZkVsc2UodGhpcy5vcE9iamVkLFxuXHRcdFx0XyA9PiB7XG5cdFx0XHRcdGNvbnN0IG9iamVkID0gdDAoXylcblx0XHRcdFx0Y29uc3Qga2V5c1ZhbHMgPSBjYXQoXG5cdFx0XHRcdFx0ZmxhdE1hcChrZXlzLCBrZXkgPT4gWyBMaXRlcmFsKGtleS5uYW1lKSwgYWNjZXNzTG9jYWxEZWNsYXJlKGtleSkgXSksXG5cdFx0XHRcdFx0b3BNYXAodGhpcy5vcERpc3BsYXlOYW1lLCBfID0+IFsgTGl0U3RyRGlzcGxheU5hbWUsIExpdGVyYWwoXykgXSkpXG5cdFx0XHRcdGNvbnN0IGFueUxhenkgPSBrZXlzLnNvbWUoa2V5ID0+IGtleS5pc0xhenkpXG5cdFx0XHRcdHJldHVybiAoYW55TGF6eSA/IG1zTHNldCA6IG1zU2V0KShvYmplZCwgLi4ua2V5c1ZhbHMpXG5cdFx0XHR9LFxuXHRcdFx0KCkgPT4ge1xuXHRcdFx0XHRjb25zdCBwcm9wcyA9IGtleXMubWFwKGtleSA9PiB7XG5cdFx0XHRcdFx0Y29uc3QgdmFsID0gYWNjZXNzTG9jYWxEZWNsYXJlKGtleSlcblx0XHRcdFx0XHRjb25zdCBpZCA9IHByb3BlcnR5SWRPckxpdGVyYWxDYWNoZWQoa2V5Lm5hbWUpXG5cdFx0XHRcdFx0cmV0dXJuIGtleS5pc0xhenkgPyBwcm9wZXJ0eSgnZ2V0JywgaWQsIHRodW5rKHZhbCkpIDogcHJvcGVydHkoJ2luaXQnLCBpZCwgdmFsKVxuXHRcdFx0XHR9KVxuXHRcdFx0XHRjb25zdCBvcFByb3BEaXNwbGF5TmFtZSA9IG9wTWFwKHRoaXMub3BEaXNwbGF5TmFtZSwgXyA9PlxuXHRcdFx0XHRcdHByb3BlcnR5KCdpbml0JywgSWREaXNwbGF5TmFtZSwgTGl0ZXJhbChfKSkpXG5cdFx0XHRcdHJldHVybiBPYmplY3RFeHByZXNzaW9uKGNhdChwcm9wcywgb3BQcm9wRGlzcGxheU5hbWUpKVxuXHRcdFx0fSlcblx0XHRyZXR1cm4gdHJhbnNwaWxlQmxvY2socmV0LCB0aGlzLmxpbmVzLCBsZWFkLCBvcFJlc0RlY2xhcmUsIG9wT3V0KVxuXHR9LFxuXG5cdEJsb2NrQmFnKGxlYWQsIG9wUmVzRGVjbGFyZSwgb3BPdXQpIHtcblx0XHRjb25zdCBsZW5ndGggPSB2ci5saXN0TWFwTGVuZ3RoKHRoaXMpXG5cdFx0cmV0dXJuIHRyYW5zcGlsZUJsb2NrKFxuXHRcdFx0QXJyYXlFeHByZXNzaW9uKHJhbmdlKDAsIGxlbmd0aCkubWFwKGkgPT4gaWRDYWNoZWQoYF8ke2l9YCkpKSxcblx0XHRcdHRoaXMubGluZXMsIGxlYWQsIG9wUmVzRGVjbGFyZSwgb3BPdXQpXG5cdH0sXG5cblx0QmxvY2tNYXAobGVhZCwgb3BSZXNEZWNsYXJlLCBvcE91dCkge1xuXHRcdGNvbnN0IGxlbmd0aCA9IHZyLmxpc3RNYXBMZW5ndGgodGhpcylcblx0XHRyZXR1cm4gdHJhbnNwaWxlQmxvY2soXG5cdFx0XHRtc01hcCguLi5mbGF0TWFwKHJhbmdlKDAsIGxlbmd0aCksIGkgPT5cblx0XHRcdFx0WyBpZENhY2hlZChgX2ske2l9YCksIGlkQ2FjaGVkKGBfdiR7aX1gKSBdKSksXG5cdFx0XHR0aGlzLmxpbmVzLCBsZWFkLCBvcFJlc0RlY2xhcmUsIG9wT3V0KVxuXHR9LFxuXG5cdEJsb2NrV3JhcCgpIHsgcmV0dXJuIGJsb2NrV3JhcCh0aGlzLCB0MCh0aGlzLmJsb2NrKSkgfSxcblxuXHRDYWxsKCkge1xuXHRcdGNvbnN0IGFueVNwbGF0ID0gdGhpcy5hcmdzLnNvbWUoYXJnID0+IGFyZyBpbnN0YW5jZW9mIFNwbGF0KVxuXHRcdGlmIChhbnlTcGxhdCkge1xuXHRcdFx0Y29uc3QgYXJncyA9IHRoaXMuYXJncy5tYXAoYXJnID0+XG5cdFx0XHRcdGFyZyBpbnN0YW5jZW9mIFNwbGF0ID9cblx0XHRcdFx0XHRtc0Fycih0MChhcmcuc3BsYXR0ZWQpKSA6XG5cdFx0XHRcdFx0dDAoYXJnKSlcblx0XHRcdHJldHVybiBDYWxsRXhwcmVzc2lvbihJZEZ1bmN0aW9uQXBwbHlDYWxsLCBbXG5cdFx0XHRcdHQwKHRoaXMuY2FsbGVkKSxcblx0XHRcdFx0TGl0TnVsbCxcblx0XHRcdFx0Q2FsbEV4cHJlc3Npb24obWVtYmVyKExpdEVtcHR5QXJyYXksICdjb25jYXQnKSwgYXJncyldKVxuXHRcdH1cblx0XHRlbHNlIHJldHVybiBDYWxsRXhwcmVzc2lvbih0MCh0aGlzLmNhbGxlZCksIHRoaXMuYXJncy5tYXAodDApKVxuXHR9LFxuXG5cdENhc2VEbygpIHtcblx0XHRjb25zdCBib2R5ID0gY2FzZUJvZHkodGhpcy5wYXJ0cywgdGhpcy5vcEVsc2UpXG5cdFx0cmV0dXJuIGlmRWxzZSh0aGlzLm9wQ2FzZWQsIF8gPT4gQmxvY2tTdGF0ZW1lbnQoWyB0MChfKSwgYm9keSBdKSwgKCkgPT4gYm9keSlcblx0fSxcblxuXHRDYXNlVmFsKCkge1xuXHRcdGNvbnN0IGJvZHkgPSBjYXNlQm9keSh0aGlzLnBhcnRzLCB0aGlzLm9wRWxzZSlcblx0XHRjb25zdCBibG9jayA9IGlmRWxzZSh0aGlzLm9wQ2FzZWQsIF8gPT4gWyB0MChfKSwgYm9keSBdLCAoKSA9PiBbIGJvZHkgXSlcblx0XHRyZXR1cm4gYmxvY2tXcmFwKHRoaXMsIEJsb2NrU3RhdGVtZW50KGJsb2NrKSlcblx0fSxcblxuXHRDYXNlRG9QYXJ0OiBjYXNlUGFydCxcblx0Q2FzZVZhbFBhcnQ6IGNhc2VQYXJ0LFxuXHQvLyBUT0RPOiBpbmNsdWRlSW5vdXRDaGVja3MgaXMgbWlzbmFtZWRcblx0RGVidWcoKSB7IHJldHVybiBjeC5vcHRzLmluY2x1ZGVJbm91dENoZWNrcygpID8gdExpbmVzKHRoaXMubGluZXMpIDogWyBdIH0sXG5cblx0T2JqU2ltcGxlKCkge1xuXHRcdHJldHVybiBPYmplY3RFeHByZXNzaW9uKHRoaXMucGFpcnMubWFwKHBhaXIgPT5cblx0XHRcdHByb3BlcnR5KCdpbml0JywgcHJvcGVydHlJZE9yTGl0ZXJhbENhY2hlZChwYWlyLmtleSksIHQwKHBhaXIudmFsdWUpKSkpXG5cdH0sXG5cblx0RW5kTG9vcCgpIHsgcmV0dXJuIEJyZWFrU3RhdGVtZW50KGxvb3BJZCh2ci5lbmRMb29wVG9Mb29wLmdldCh0aGlzKSkpIH0sXG5cblx0RnVuKCkge1xuXHRcdGNvbnN0IG9sZEluR2VuZXJhdG9yID0gaXNJbkdlbmVyYXRvclxuXHRcdGlzSW5HZW5lcmF0b3IgPSB0aGlzLmlzR2VuZXJhdG9yXG5cblx0XHQvLyBUT0RPOkVTNiB1c2UgYC4uLmBmXG5cdFx0Y29uc3QgbkFyZ3MgPSBMaXRlcmFsKHRoaXMuYXJncy5sZW5ndGgpXG5cdFx0Y29uc3Qgb3BEZWNsYXJlUmVzdCA9IG9wTWFwKHRoaXMub3BSZXN0QXJnLCByZXN0ID0+XG5cdFx0XHRkZWNsYXJlKHJlc3QsIENhbGxFeHByZXNzaW9uKEFycmF5U2xpY2VDYWxsLCBbSWRBcmd1bWVudHMsIG5BcmdzXSkpKVxuXHRcdGNvbnN0IGFyZ0NoZWNrcyA9XG5cdFx0XHRvcElmKGN4Lm9wdHMuaW5jbHVkZVR5cGVDaGVja3MoKSwgKCkgPT5cblx0XHRcdFx0ZmxhdE9wTWFwKHRoaXMuYXJncywgXyA9PlxuXHRcdFx0XHRcdC8vIFRPRE86IFdheSB0byB0eXBlY2hlY2sgbGF6aWVzXG5cdFx0XHRcdFx0b3BJZighXy5pc0xhenksICgpID0+XG5cdFx0XHRcdFx0XHRvcE1hcChfLm9wVHlwZSwgdHlwZSA9PlxuXHRcdFx0XHRcdFx0XHRFeHByZXNzaW9uU3RhdGVtZW50KG1zQ2hlY2tDb250YWlucyhcblx0XHRcdFx0XHRcdFx0XHR0MCh0eXBlKSxcblx0XHRcdFx0XHRcdFx0XHRhY2Nlc3NMb2NhbERlY2xhcmUoXyksXG5cdFx0XHRcdFx0XHRcdFx0TGl0ZXJhbChfLm5hbWUpKSkpKSkpXG5cblx0XHRjb25zdCBfaW4gPSBvcE1hcCh0aGlzLm9wSW4sIHQwKVxuXHRcdGNvbnN0IGxlYWQgPSBjYXQob3BEZWNsYXJlUmVzdCwgYXJnQ2hlY2tzLCBfaW4pXG5cblx0XHRjb25zdCBfb3V0ID0gb3BNYXAodGhpcy5vcE91dCwgdDApXG5cdFx0Y29uc3QgYm9keSA9IHQzKHRoaXMuYmxvY2ssIGxlYWQsIHRoaXMub3BSZXNEZWNsYXJlLCBfb3V0KVxuXHRcdGNvbnN0IGFyZ3MgPSB0aGlzLmFyZ3MubWFwKHQwKVxuXHRcdGlzSW5HZW5lcmF0b3IgPSBvbGRJbkdlbmVyYXRvclxuXHRcdGNvbnN0IGlkID0gb3BNYXAodGhpcy5uYW1lLCBpZENhY2hlZClcblx0XHRyZXR1cm4gRnVuY3Rpb25FeHByZXNzaW9uKGlkLCBhcmdzLCBib2R5LCB0aGlzLmlzR2VuZXJhdG9yKVxuXHR9LFxuXG5cdExhenkoKSB7IHJldHVybiBsYXp5V3JhcCh0MCh0aGlzLnZhbHVlKSkgfSxcblxuXHROdW1iZXJMaXRlcmFsKCkge1xuXHRcdC8vIE5lZ2F0aXZlIG51bWJlcnMgYXJlIG5vdCBwYXJ0IG9mIEVTIHNwZWMuXG5cdFx0Ly8gaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzUuMS8jc2VjLTcuOC4zXG5cdFx0Y29uc3QgbGl0ID0gTGl0ZXJhbChNYXRoLmFicyh0aGlzLnZhbHVlKSlcblx0XHRyZXR1cm4gaXNQb3NpdGl2ZSh0aGlzLnZhbHVlKSA/IGxpdCA6IHVuYXJ5RXhwcmVzc2lvbk5lZ2F0ZShsaXQpXG5cdH0sXG5cblx0R2xvYmFsQWNjZXNzKCkgeyByZXR1cm4gSWRlbnRpZmllcih0aGlzLm5hbWUpIH0sXG5cblx0TG9jYWxBY2Nlc3MoKSB7IHJldHVybiBhY2Nlc3NMb2NhbERlY2xhcmUodnIuYWNjZXNzVG9Mb2NhbC5nZXQodGhpcykpIH0sXG5cblx0TG9jYWxEZWNsYXJlKCkgeyByZXR1cm4gaWRGb3JEZWNsYXJlQ2FjaGVkKHRoaXMpIH0sXG5cblx0Ly8gVE9ETzogRG9uJ3QgYWx3YXlzIGxhYmVsIVxuXHRMb29wKCkge1xuXHRcdHJldHVybiBMYWJlbGVkU3RhdGVtZW50KGxvb3BJZCh0aGlzKSwgd2hpbGVTdGF0ZW1lbnRJbmZpbml0ZSh0MCh0aGlzLmJsb2NrKSkpXG5cdH0sXG5cblx0TWFwRW50cnkoKSB7XG5cdFx0Y29uc3QgaW5kZXggPSB2ci5saXN0TWFwRW50cnlJbmRleCh0aGlzKVxuXHRcdGNvbnN0IGsgPSBgX2ske2luZGV4fWBcblx0XHRjb25zdCB2ID0gYF92JHtpbmRleH1gXG5cdFx0cmV0dXJuIHZhcmlhYmxlRGVjbGFyYXRpb25Db25zdChbXG5cdFx0XHRWYXJpYWJsZURlY2xhcmF0b3IoaWRDYWNoZWQoayksIHQwKHRoaXMua2V5KSksXG5cdFx0XHRWYXJpYWJsZURlY2xhcmF0b3IoaWRDYWNoZWQodiksIHQwKHRoaXMudmFsKSlcblx0XHRdKVxuXHR9LFxuXG5cdE1lbWJlcigpIHsgcmV0dXJuIG1lbWJlcih0MCh0aGlzLm9iamVjdCksIHRoaXMubmFtZSkgfSxcblxuXHRNb2R1bGUoKSB7XG5cdFx0Y29uc3QgYm9keSA9IGNhdChcblx0XHRcdHRMaW5lcyh0aGlzLmxpbmVzKSxcblx0XHRcdG9wTWFwKHRoaXMub3BEZWZhdWx0RXhwb3J0LCBfID0+IGFzc2lnbm1lbnRFeHByZXNzaW9uUGxhaW4oRXhwb3J0c0RlZmF1bHQsIHQwKF8pKSkpXG5cdFx0cmV0dXJuIFByb2dyYW0oY2F0KFxuXHRcdFx0b3BJZihjeC5vcHRzLmluY2x1ZGVVc2VTdHJpY3QoKSwgKCkgPT4gVXNlU3RyaWN0KSxcblx0XHRcdG9wSWYoY3gub3B0cy5hbWRlZmluZSgpLCAoKSA9PiBBbWRlZmluZUhlYWRlciksXG5cdFx0XHR0b1N0YXRlbWVudChhbWRXcmFwTW9kdWxlKHRoaXMuZG9Vc2VzLCB0aGlzLnVzZXMuY29uY2F0KHRoaXMuZGVidWdVc2VzKSwgYm9keSkpKSlcblx0fSxcblxuXHRRdW90ZSgpIHtcblx0XHQvLyBUT0RPOkVTNiB1c2UgdGVtcGxhdGUgc3RyaW5nc1xuXHRcdGNvbnN0IHBhcnQwID0gdGhpcy5wYXJ0c1swXVxuXHRcdGNvbnN0IFsgZmlyc3QsIHJlc3RQYXJ0cyBdID1cblx0XHRcdHR5cGVvZiBwYXJ0MCA9PT0gJ3N0cmluZycgP1xuXHRcdFx0XHRbIExpdGVyYWwocGFydDApLCB0YWlsKHRoaXMucGFydHMpIF0gOlxuXHRcdFx0XHRbIExpdEVtcHR5U3RyaW5nLCB0aGlzLnBhcnRzIF1cblx0XHRyZXR1cm4gcmVzdFBhcnRzLnJlZHVjZShcblx0XHRcdChleCwgXykgPT5cblx0XHRcdFx0YmluYXJ5RXhwcmVzc2lvblBsdXMoZXgsIHR5cGVvZiBfID09PSAnc3RyaW5nJyA/IExpdGVyYWwoXykgOiBtc1Nob3codDAoXykpKSxcblx0XHRcdGZpcnN0KVxuXHR9LFxuXG5cdFNwZWNpYWxEbygpIHtcblx0XHRzd2l0Y2ggKHRoaXMua2luZCkge1xuXHRcdFx0Y2FzZSBTRF9EZWJ1Z2dlcjogcmV0dXJuIERlYnVnZ2VyU3RhdGVtZW50KClcblx0XHRcdGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcih0aGlzLmtpbmQpXG5cdFx0fVxuXHR9LFxuXG5cdFNwZWNpYWxWYWwoKSB7XG5cdFx0Ly8gTWFrZSBuZXcgb2JqZWN0cyBiZWNhdXNlIHdlIHdpbGwgYXNzaWduIGBsb2NgIHRvIHRoZW0uXG5cdFx0c3dpdGNoICh0aGlzLmtpbmQpIHtcblx0XHRcdGNhc2UgU1ZfQ29udGFpbnM6IHJldHVybiBtZW1iZXIoSWRNcywgJ2NvbnRhaW5zJylcblx0XHRcdGNhc2UgU1ZfRmFsc2U6IHJldHVybiBMaXRlcmFsKGZhbHNlKVxuXHRcdFx0Y2FzZSBTVl9OdWxsOiByZXR1cm4gTGl0ZXJhbChudWxsKVxuXHRcdFx0Y2FzZSBTVl9TdWI6IHJldHVybiBtZW1iZXIoSWRNcywgJ3N1YicpXG5cdFx0XHRjYXNlIFNWX1RoaXM6IHJldHVybiBcdFRoaXNFeHByZXNzaW9uKClcblx0XHRcdGNhc2UgU1ZfVGhpc01vZHVsZURpcmVjdG9yeTogcmV0dXJuIElkZW50aWZpZXIoJ19fZGlybmFtZScpXG5cdFx0XHRjYXNlIFNWX1RydWU6IHJldHVybiBMaXRlcmFsKHRydWUpXG5cdFx0XHRjYXNlIFNWX1VuZGVmaW5lZDogcmV0dXJuIHVuYXJ5RXhwcmVzc2lvblZvaWQoTGl0WmVybylcblx0XHRcdGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcih0aGlzLmtpbmQpXG5cdFx0fVxuXHR9LFxuXG5cdFlpZWxkKCkgeyByZXR1cm4geWllbGRFeHByZXNzaW9uTm9EZWxlZ2F0ZSh0MCh0aGlzLnlpZWxkZWQpKSB9LFxuXG5cdFlpZWxkVG8oKSB7IHJldHVybiB5aWVsZEV4cHJlc3Npb25EZWxlZ2F0ZSh0MCh0aGlzLnlpZWxkZWRUbykpIH1cbn0pXG5cbmZ1bmN0aW9uIGNhc2VQYXJ0KGFsdGVybmF0ZSkge1xuXHRpZiAodGhpcy50ZXN0IGluc3RhbmNlb2YgUGF0dGVybikge1xuXHRcdGNvbnN0IHsgdHlwZSwgcGF0dGVybmVkLCBsb2NhbHMgfSA9IHRoaXMudGVzdFxuXHRcdGNvbnN0IGRlY2wgPSB2YXJpYWJsZURlY2xhcmF0aW9uQ29uc3QoW1xuXHRcdFx0VmFyaWFibGVEZWNsYXJhdG9yKElkRXh0cmFjdCwgbXNFeHRyYWN0KHQwKHR5cGUpLCB0MChwYXR0ZXJuZWQpKSkgXSlcblx0XHRjb25zdCB0ZXN0ID0gYmluYXJ5RXhwcmVzc2lvbk5vdEVxdWFsKElkRXh0cmFjdCwgTGl0TnVsbClcblx0XHRjb25zdCBleHRyYWN0ID0gdmFyaWFibGVEZWNsYXJhdGlvbkNvbnN0KGxvY2Fscy5tYXAoKF8sIGlkeCkgPT5cblx0XHRcdFZhcmlhYmxlRGVjbGFyYXRvcihpZEZvckRlY2xhcmVDYWNoZWQoXyksIG1lbWJlckV4cHJlc3Npb24oSWRFeHRyYWN0LCBMaXRlcmFsKGlkeCkpKSkpXG5cdFx0Y29uc3QgcmVzID0gdDEodGhpcy5yZXN1bHQsIGV4dHJhY3QpXG5cdFx0cmV0dXJuIEJsb2NrU3RhdGVtZW50KFsgZGVjbCwgSWZTdGF0ZW1lbnQodGVzdCwgcmVzLCBhbHRlcm5hdGUpIF0pXG5cdH0gZWxzZSB7XG5cdFx0Y29uc3QgY2hlY2tlZFRlc3QgPSBjeC5vcHRzLmluY2x1ZGVDYXNlQ2hlY2tzKCkgPyBtc0Jvb2wodDAodGhpcy50ZXN0KSkgOiB0MCh0aGlzLnRlc3QpXG5cdFx0Ly8gYWx0ZXJuYXRlIHdyaXR0ZW4gdG8gYnkgYGNhc2VCb2R5YC5cblx0XHRyZXR1cm4gSWZTdGF0ZW1lbnQoY2hlY2tlZFRlc3QsIHQwKHRoaXMucmVzdWx0KSwgYWx0ZXJuYXRlKVxuXHR9XG59XG5cbi8vIEZ1bmN0aW9ucyBzcGVjaWZpYyB0byBjZXJ0YWluIGV4cHJlc3Npb25zLlxuY29uc3Rcblx0YmxvY2tXcmFwID0gKF8sIGJsb2NrKSA9PiB7XG5cdFx0Y29uc3QgaW52b2tlID0gY2FsbEV4cHJlc3Npb25UaHVuayhmdW5jdGlvbkV4cHJlc3Npb25UaHVuayhibG9jaywgaXNJbkdlbmVyYXRvcikpXG5cdFx0cmV0dXJuIGlzSW5HZW5lcmF0b3IgPyB5aWVsZEV4cHJlc3Npb25EZWxlZ2F0ZShpbnZva2UpIDogaW52b2tlXG5cdH0sXG5cblx0Y2FzZUJvZHkgPSAocGFydHMsIG9wRWxzZSkgPT4ge1xuXHRcdGxldCBhY2MgPSBpZkVsc2Uob3BFbHNlLCB0MCwgKCkgPT4gdGhyb3dFcnJvcignTm8gYnJhbmNoIG9mIGBjYXNlYCBtYXRjaGVzLicpKVxuXHRcdGZvciAobGV0IGkgPSBwYXJ0cy5sZW5ndGggLSAxOyBpID49IDA7IGkgPSBpIC0gMSlcblx0XHRcdGFjYyA9IHQxKHBhcnRzW2ldLCBhY2MpXG5cdFx0cmV0dXJuIGFjY1xuXHR9LFxuXG5cdGxvb3BJZCA9IGxvb3AgPT4gaWRDYWNoZWQoYGxvb3Ake2xvb3AubG9jLnN0YXJ0LmxpbmV9YCksXG5cblx0dHJhbnNwaWxlQmxvY2sgPSAocmV0dXJuZWQsIGxpbmVzLCBsZWFkID0gbnVsbCwgb3BSZXNEZWNsYXJlID0gbnVsbCwgb3BPdXQgPSBudWxsKSA9PiB7XG5cdFx0Y29uc3QgZmluID0gaWZFbHNlKG9wUmVzRGVjbGFyZSxcblx0XHRcdHJkID0+IHtcblx0XHRcdFx0Y29uc3QgcmV0ID0gbWF5YmVXcmFwSW5DaGVja0NvbnRhaW5zKHJldHVybmVkLCByZC5vcFR5cGUsIHJkLm5hbWUpXG5cdFx0XHRcdHJldHVybiBpZkVsc2Uob3BPdXQsXG5cdFx0XHRcdFx0XyA9PiBjYXQoZGVjbGFyZShyZCwgcmV0KSwgXywgUmV0dXJuUmVzKSxcblx0XHRcdFx0XHQoKSA9PiBSZXR1cm5TdGF0ZW1lbnQocmV0KSlcblx0XHRcdH0sXG5cdFx0XHQoKSA9PiBjYXQob3BPdXQsIFJldHVyblN0YXRlbWVudChyZXR1cm5lZCkpKVxuXHRcdHJldHVybiBCbG9ja1N0YXRlbWVudChjYXQobGVhZCwgdExpbmVzKGxpbmVzKSwgZmluKSlcblx0fVxuXG4vLyBNb2R1bGUgaGVscGVyc1xuY29uc3Rcblx0YW1kV3JhcE1vZHVsZSA9IChkb1VzZXMsIG90aGVyVXNlcywgYm9keSkgPT4ge1xuXHRcdGNvbnN0IGFsbFVzZXMgPSBkb1VzZXMuY29uY2F0KG90aGVyVXNlcylcblx0XHRjb25zdCB1c2VQYXRocyA9IEFycmF5RXhwcmVzc2lvbihjYXQoXG5cdFx0XHRMaXRTdHJFeHBvcnRzLFxuXHRcdFx0YWxsVXNlcy5tYXAoXyA9PiBMaXRlcmFsKG1hbmdsZVBhdGgoXy5wYXRoKSkpKSlcblx0XHRjb25zdCB1c2VJZGVudGlmaWVycyA9IGFsbFVzZXMubWFwKChfLCBpKSA9PiBpZENhY2hlZChgJHtwYXRoQmFzZU5hbWUoXy5wYXRoKX1fJHtpfWApKVxuXHRcdGNvbnN0IHVzZUFyZ3MgPSBjYXQoSWRFeHBvcnRzLCB1c2VJZGVudGlmaWVycylcblx0XHRjb25zdCB1c2VEb3MgPSBkb1VzZXMubWFwKCh1c2UsIGkpID0+XG5cdFx0XHRsb2MoRXhwcmVzc2lvblN0YXRlbWVudChtc0dldE1vZHVsZSh1c2VJZGVudGlmaWVyc1tpXSkpLCB1c2UubG9jKSlcblx0XHRjb25zdCBvcFVzZURlY2xhcmUgPSBvcElmKCFpc0VtcHR5KG90aGVyVXNlcyksXG5cdFx0XHQoKSA9PiBWYXJpYWJsZURlY2xhcmF0aW9uKCdjb25zdCcsIGZsYXRNYXAob3RoZXJVc2VzLCAodXNlLCBpKSA9PlxuXHRcdFx0XHR1c2VEZWNsYXJhdG9ycyh1c2UsIHVzZUlkZW50aWZpZXJzW2kgKyBkb1VzZXMubGVuZ3RoXSkpKSlcblx0XHRjb25zdCBmdWxsQm9keSA9IEJsb2NrU3RhdGVtZW50KGNhdCh1c2VEb3MsIG9wVXNlRGVjbGFyZSwgYm9keSwgUmV0dXJuRXhwb3J0cykpXG5cdFx0Y29uc3QgbGF6eUJvZHkgPVxuXHRcdFx0Y3gub3B0cy5sYXp5TW9kdWxlKCkgP1xuXHRcdFx0XHRCbG9ja1N0YXRlbWVudChbIEV4cHJlc3Npb25TdGF0ZW1lbnQoXG5cdFx0XHRcdFx0YXNzaWdubWVudEV4cHJlc3Npb25QbGFpbihFeHBvcnRzR2V0LFxuXHRcdFx0XHRcdFx0bXNMYXp5KGZ1bmN0aW9uRXhwcmVzc2lvblRodW5rKGZ1bGxCb2R5KSkpKSBdKSA6XG5cdFx0XHRcdGZ1bGxCb2R5XG5cdFx0cmV0dXJuIENhbGxFeHByZXNzaW9uKElkRGVmaW5lLCBbIHVzZVBhdGhzLCBmdW5jdGlvbkV4cHJlc3Npb25QbGFpbih1c2VBcmdzLCBsYXp5Qm9keSkgXSlcblx0fSxcblxuXHRwYXRoQmFzZU5hbWUgPSBwYXRoID0+XG5cdFx0cGF0aC5zdWJzdHIocGF0aC5sYXN0SW5kZXhPZignLycpICsgMSksXG5cblx0dXNlRGVjbGFyYXRvcnMgPSAodXNlLCBtb2R1bGVJZGVudGlmaWVyKSA9PiB7XG5cdFx0Ly8gVE9ETzogQ291bGQgYmUgbmVhdGVyIGFib3V0IHRoaXNcblx0XHRjb25zdCBpc0xhenkgPSAoaXNFbXB0eSh1c2UudXNlZCkgPyB1c2Uub3BVc2VEZWZhdWx0IDogdXNlLnVzZWRbMF0pLmlzTGF6eVxuXHRcdGNvbnN0IHZhbHVlID0gKGlzTGF6eSA/IG1zTGF6eUdldE1vZHVsZSA6IG1zR2V0TW9kdWxlKShtb2R1bGVJZGVudGlmaWVyKVxuXG5cdFx0Y29uc3QgdXNlZERlZmF1bHQgPSBvcE1hcCh1c2Uub3BVc2VEZWZhdWx0LCBkZWYgPT4ge1xuXHRcdFx0Y29uc3QgZGVmZXhwID0gbXNHZXREZWZhdWx0RXhwb3J0KG1vZHVsZUlkZW50aWZpZXIpXG5cdFx0XHRjb25zdCB2YWwgPSBpc0xhenkgPyBsYXp5V3JhcChkZWZleHApIDogZGVmZXhwXG5cdFx0XHRyZXR1cm4gbG9jKFZhcmlhYmxlRGVjbGFyYXRvcihpZEZvckRlY2xhcmVDYWNoZWQoZGVmKSwgdmFsKSwgZGVmLmxvYylcblx0XHR9KVxuXG5cdFx0Y29uc3QgdXNlZERlc3RydWN0ID0gaXNFbXB0eSh1c2UudXNlZCkgPyBudWxsIDpcblx0XHRcdG1ha2VEZXN0cnVjdHVyZURlY2xhcmF0b3JzKHVzZS51c2VkLCBpc0xhenksIHZhbHVlLCB0cnVlLCBmYWxzZSlcblxuXHRcdHJldHVybiBjYXQodXNlZERlZmF1bHQsIHVzZWREZXN0cnVjdClcblx0fVxuXG4vLyBHZW5lcmFsIHV0aWxzLiBOb3QgaW4gdXRpbC5qcyBiZWNhdXNlIHRoZXNlIGNsb3NlIG92ZXIgY3guXG5jb25zdFxuXHRtYWtlRGVzdHJ1Y3R1cmVEZWNsYXJhdG9ycyA9IChhc3NpZ25lZXMsIGlzTGF6eSwgdmFsdWUsIGlzTW9kdWxlLCBpc0V4cG9ydCkgPT4ge1xuXHRcdGNvbnN0IGRlc3RydWN0dXJlZE5hbWUgPSBgXyQke2Fzc2lnbmVlc1swXS5sb2Muc3RhcnQubGluZX1gXG5cdFx0Y29uc3QgaWREZXN0cnVjdHVyZWQgPSBJZGVudGlmaWVyKGRlc3RydWN0dXJlZE5hbWUpXG5cdFx0Y29uc3QgZGVjbGFyYXRvcnMgPSBhc3NpZ25lZXMubWFwKGFzc2lnbmVlID0+IHtcblx0XHRcdC8vIFRPRE86IERvbid0IGNvbXBpbGUgaXQgaWYgaXQncyBuZXZlciBhY2Nlc3NlZFxuXHRcdFx0Y29uc3QgZ2V0ID0gZ2V0TWVtYmVyKGlkRGVzdHJ1Y3R1cmVkLCBhc3NpZ25lZS5uYW1lLCBpc0xhenksIGlzTW9kdWxlKVxuXHRcdFx0cmV0dXJuIG1ha2VEZWNsYXJhdG9yKGFzc2lnbmVlLCBnZXQsIGlzTGF6eSwgaXNFeHBvcnQpXG5cdFx0fSlcblx0XHQvLyBHZXR0aW5nIGxhenkgbW9kdWxlIGlzIGRvbmUgYnkgbXMubGF6eUdldE1vZHVsZS5cblx0XHRjb25zdCB2YWwgPSAoaXNMYXp5ICYmICFpc01vZHVsZSkgPyBsYXp5V3JhcCh2YWx1ZSkgOiB2YWx1ZVxuXHRcdHJldHVybiB1bnNoaWZ0KFZhcmlhYmxlRGVjbGFyYXRvcihpZERlc3RydWN0dXJlZCwgdmFsKSwgZGVjbGFyYXRvcnMpXG5cdH0sXG5cblx0bWFrZURlY2xhcmF0b3IgPSAoYXNzaWduZWUsIHZhbHVlLCB2YWx1ZUlzQWxyZWFkeUxhenksIGlzRXhwb3J0KSA9PiB7XG5cdFx0Y29uc3QgeyBpc0xhenksIGxvYywgbmFtZSwgb3BUeXBlIH0gPSBhc3NpZ25lZVxuXHRcdC8vIFRPRE86IGFzc2VydChhc3NpZ25lZS5vcFR5cGUgPT09IG51bGwpXG5cdFx0Ly8gb3IgVE9ETzogQWxsb3cgdHlwZSBjaGVjayBvbiBsYXp5IHZhbHVlP1xuXHRcdHZhbHVlID0gaXNMYXp5ID8gdmFsdWUgOiBtYXliZVdyYXBJbkNoZWNrQ29udGFpbnModmFsdWUsIG9wVHlwZSwgbmFtZSlcblx0XHRpZiAoaXNFeHBvcnQpIHtcblx0XHRcdC8vIFRPRE86RVM2XG5cdFx0XHRjeC5jaGVjayghaXNMYXp5LCBsb2MsICdMYXp5IGV4cG9ydCBub3Qgc3VwcG9ydGVkLicpXG5cdFx0XHRyZXR1cm4gVmFyaWFibGVEZWNsYXJhdG9yKFxuXHRcdFx0XHRpZEZvckRlY2xhcmVDYWNoZWQoYXNzaWduZWUpLFxuXHRcdFx0XHRhc3NpZ25tZW50RXhwcmVzc2lvblBsYWluKG1lbWJlcihJZEV4cG9ydHMsIG5hbWUpLCB2YWx1ZSkpXG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IHZhbCA9IGlzTGF6eSAmJiAhdmFsdWVJc0FscmVhZHlMYXp5ID8gbGF6eVdyYXAodmFsdWUpIDogdmFsdWVcblx0XHRcdGFzc2VydChpc0xhenkgfHwgIXZhbHVlSXNBbHJlYWR5TGF6eSlcblx0XHRcdHJldHVybiBWYXJpYWJsZURlY2xhcmF0b3IoaWRGb3JEZWNsYXJlQ2FjaGVkKGFzc2lnbmVlKSwgdmFsKVxuXHRcdH1cblx0fSxcblxuXHRtYXliZVdyYXBJbkNoZWNrQ29udGFpbnMgPSAoYXN0LCBvcFR5cGUsIG5hbWUpID0+XG5cdFx0KGN4Lm9wdHMuaW5jbHVkZVR5cGVDaGVja3MoKSAmJiBvcFR5cGUgIT09IG51bGwpID9cblx0XHRcdG1zQ2hlY2tDb250YWlucyh0MChvcFR5cGUpLCBhc3QsIExpdGVyYWwobmFtZSkpIDpcblx0XHRcdGFzdCxcblxuXHRnZXRNZW1iZXIgPSAoYXN0T2JqZWN0LCBnb3ROYW1lLCBpc0xhenksIGlzTW9kdWxlKSA9PlxuXHRcdGlzTGF6eSA/XG5cdFx0bXNMYXp5R2V0KGFzdE9iamVjdCwgTGl0ZXJhbChnb3ROYW1lKSkgOlxuXHRcdGlzTW9kdWxlICYmIGN4Lm9wdHMuaW5jbHVkZVVzZUNoZWNrcygpID9cblx0XHRtc0dldChhc3RPYmplY3QsIExpdGVyYWwoZ290TmFtZSkpIDpcblx0XHRtZW1iZXIoYXN0T2JqZWN0LCBnb3ROYW1lKVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=