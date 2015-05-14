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

		ListSimple: function () {
			return (0, _esastDistAst.ArrayExpression)(this.parts.map(t0));
		},

		BagEntry: function () {
			return (0, _util.declareSpecial)('_' + vr.listMapEntryIndex(this), t0(this.value));
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

		Special: function () {
			// Make new objects because we will assign `loc` to them.
			switch (this.kind) {
				case _Expression.SP_Contains:
					return (0, _esastDistUtil.member)(_msCall.IdMs, 'contains');
				case _Expression.SP_Debugger:
					return (0, _esastDistAst.DebuggerStatement)();
				case _Expression.SP_False:
					return (0, _esastDistAst.Literal)(false);
				case _Expression.SP_Sub:
					return (0, _esastDistUtil.member)(_msCall.IdMs, 'sub');
				case _Expression.SP_This:
					return (0, _esastDistAst.ThisExpression)();
				case _Expression.SP_ThisModuleDirectory:
					return (0, _esastDistAst.Identifier)('__dirname');
				case _Expression.SP_True:
					return (0, _esastDistAst.Literal)(true);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS90cmFuc3BpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2tCQTRCd0IsU0FBUzs7Ozs7Ozs7OztBQUZqQyxLQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsYUFBYSxDQUFBOztBQUVWLFVBQVMsU0FBUyxDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRSxHQUFHLEVBQUU7QUFDN0QsSUFBRSxHQUFHLEdBQUcsQ0FBQTtBQUNSLElBQUUsR0FBRyxHQUFHLENBQUE7QUFDUixlQUFhLEdBQUcsS0FBSyxDQUFBO0FBQ3JCLFFBQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBOztBQUVoQyxJQUFFLEdBQUcsRUFBRSxHQUFHLFNBQVMsQ0FBQTtBQUNuQixTQUFPLEdBQUcsQ0FBQTtFQUNWOztBQUVELE9BQ0MsRUFBRSxHQUFHLFVBQUEsSUFBSTtTQUFJLG1CQW5DSyxHQUFHLEVBbUNKLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUM7RUFBQTtPQUNuRCxFQUFFLEdBQUcsVUFBQyxJQUFJLEVBQUUsR0FBRztTQUFLLG1CQXBDRixHQUFHLEVBb0NHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDO0VBQUE7T0FDN0QsRUFBRSxHQUFHLFVBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSTtTQUFLLG1CQXJDZCxHQUFHLEVBcUNlLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUM7RUFBQTtPQUNyRixNQUFNLEdBQUcsVUFBQSxLQUFLLEVBQUk7QUFDakIsUUFBTSxHQUFHLEdBQUcsRUFBRyxDQUFBO0FBQ2YsT0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUksRUFBSTtBQUNyQixTQUFN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LENBQUMsQ0FBQTtBQUNyQyxVQUFPLGtCQTNYVCxrQkFBa0IsRUEyWFUsVUF2V1osa0JBQWtCLEVBdVdhLFFBQVEsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0dBQzVEO0VBQ0Q7T0FFRCx3QkFBd0IsR0FBRyxVQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSTtTQUM1QyxBQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxNQUFNLEtBQUssSUFBSSxHQUM5QyxZQWpYcUMsZUFBZSxFQWlYcEMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEdBQUcsRUFBRSxrQkFuWWlELE9BQU8sRUFtWWhELElBQUksQ0FBQyxDQUFDLEdBQy9DLEdBQUc7RUFBQTtPQUVMLFNBQVMsR0FBRyxVQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVE7U0FDaEQsTUFBTSxHQUNOLFlBclhvQixTQUFTLEVBcVhuQixTQUFTLEVBQUUsa0JBeFk4RCxPQUFPLEVBd1k3RCxPQUFPLENBQUMsQ0FBQyxHQUN0QyxRQUFRLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxHQUN0QyxZQXhYa0UsS0FBSyxFQXdYakUsU0FBUyxFQUFFLGtCQTFZa0UsT0FBTyxFQTBZakUsT0FBTyxDQUFDLENBQUMsR0FDbEMsbUJBeFlzQixNQUFNLEVBd1lyQixTQUFTLEVBQUUsT0FBTyxDQUFDO0VBQUEsQ0FBQSIsImZpbGUiOiJtZXRhL2NvbXBpbGUvcHJpdmF0ZS90cmFuc3BpbGUvdHJhbnNwaWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXJyYXlFeHByZXNzaW9uLCBCbG9ja1N0YXRlbWVudCwgQnJlYWtTdGF0ZW1lbnQsIENhbGxFeHByZXNzaW9uLCBEZWJ1Z2dlclN0YXRlbWVudCxcblx0RXhwcmVzc2lvblN0YXRlbWVudCwgRnVuY3Rpb25FeHByZXNzaW9uLCBJZGVudGlmaWVyLCBJZlN0YXRlbWVudCwgTGFiZWxlZFN0YXRlbWVudCwgTGl0ZXJhbCxcblx0T2JqZWN0RXhwcmVzc2lvbiwgUHJvZ3JhbSwgUmV0dXJuU3RhdGVtZW50LCBUaGlzRXhwcmVzc2lvbiwgVmFyaWFibGVEZWNsYXJhdGlvbixcblx0VmFyaWFibGVEZWNsYXJhdG9yLCBSZXR1cm5TdGF0ZW1lbnQgfSBmcm9tICdlc2FzdC9kaXN0L2FzdCdcbmltcG9ydCB7IGlkQ2FjaGVkLCBsb2MsIG1lbWJlciwgcHJvcGVydHlJZE9yTGl0ZXJhbENhY2hlZCwgdGh1bmssIHRvU3RhdGVtZW50XG5cdH0gZnJvbSAnZXNhc3QvZGlzdC91dGlsJ1xuaW1wb3J0IHsgYXNzaWdubWVudEV4cHJlc3Npb25QbGFpbiwgY2FsbEV4cHJlc3Npb25UaHVuaywgZnVuY3Rpb25FeHByZXNzaW9uUGxhaW4sXG5cdGZ1bmN0aW9uRXhwcmVzc2lvblRodW5rLCBtZW1iZXJFeHByZXNzaW9uLCBwcm9wZXJ0eSwgdmFyaWFibGVEZWNsYXJhdGlvbkNvbnN0LFxuXHR5aWVsZEV4cHJlc3Npb25EZWxlZ2F0ZSwgeWllbGRFeHByZXNzaW9uTm9EZWxlZ2F0ZSB9IGZyb20gJ2VzYXN0L2Rpc3Qvc3BlY2lhbGl6ZSdcbmltcG9ydCAqIGFzIEVFeHBvcnRzIGZyb20gJy4uLy4uL0V4cHJlc3Npb24nXG5pbXBvcnQgeyBQYXR0ZXJuLCBTcGxhdCwgU1BfQ29udGFpbnMsIFNQX0RlYnVnZ2VyLCBTUF9GYWxzZSwgU1BfU3ViLFxuXHRTUF9UaGlzLCBTUF9UaGlzTW9kdWxlRGlyZWN0b3J5LCBTUF9UcnVlIH0gZnJvbSAnLi4vLi4vRXhwcmVzc2lvbidcbmltcG9ydCBtYW5nbGVQYXRoIGZyb20gJy4uL21hbmdsZVBhdGgnXG5pbXBvcnQgeyBjYXQsIGZsYXRNYXAsIGlzRW1wdHksIHJhbmdlLCB0YWlsLCB1bnNoaWZ0IH0gZnJvbSAnLi4vVS9CYWcnXG5pbXBvcnQgeyBmbGF0T3BNYXAsIGlmRWxzZSwgb3BJZiwgb3BNYXAgfSBmcm9tICcuLi9VL29wJ1xuaW1wb3J0IHsgYXNzZXJ0LCBpbXBsZW1lbnRNYW55LCBpc1Bvc2l0aXZlIH0gZnJvbSAnLi4vVS91dGlsJ1xuaW1wb3J0IHsgQW1kZWZpbmVIZWFkZXIsIEFycmF5U2xpY2VDYWxsLCBFeHBvcnRzRGVmYXVsdCwgRXhwb3J0c0dldCwgSWREZWZpbmUsIElkRGlzcGxheU5hbWUsXG5cdElkQXJndW1lbnRzLCBJZEV4cG9ydHMsIElkRXh0cmFjdCwgSWRGdW5jdGlvbkFwcGx5Q2FsbCwgTGl0RW1wdHlBcnJheSwgTGl0RW1wdHlTdHJpbmcsIExpdE51bGwsXG5cdExpdFN0ckRpc3BsYXlOYW1lLCBMaXRTdHJFeHBvcnRzLCBSZXR1cm5FeHBvcnRzLCBSZXR1cm5SZXMsIFVzZVN0cmljdCB9IGZyb20gJy4vYXN0LWNvbnN0YW50cydcbmltcG9ydCB7IElkTXMsIGxhenlXcmFwLCBtc0FyciwgbXNCb29sLCBtc0NoZWNrQ29udGFpbnMsIG1zRXh0cmFjdCwgbXNHZXQsIG1zR2V0RGVmYXVsdEV4cG9ydCxcblx0bXNHZXRNb2R1bGUsIG1zTGF6eSwgbXNMYXp5R2V0LCBtc0xhenlHZXRNb2R1bGUsIG1zTHNldCwgbXNNYXAsIG1zU2V0LCBtc1Nob3dcblx0fSBmcm9tICcuL21zLWNhbGwnXG5pbXBvcnQgeyBhY2Nlc3NMb2NhbERlY2xhcmUsIGJpbmFyeUV4cHJlc3Npb25Ob3RFcXVhbCwgYmluYXJ5RXhwcmVzc2lvblBsdXMsIGRlY2xhcmUsXG5cdGRlY2xhcmVTcGVjaWFsLCBpZEZvckRlY2xhcmVDYWNoZWQsIHRocm93RXJyb3IsIHVuYXJ5RXhwcmVzc2lvbk5lZ2F0ZSxcblx0d2hpbGVTdGF0ZW1lbnRJbmZpbml0ZSB9IGZyb20gJy4vdXRpbCdcblxubGV0IGN4LCB2ciwgaXNJbkdlbmVyYXRvclxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cmFuc3BpbGUoX2N4LCBtb2R1bGVFeHByZXNzaW9uLCBfdnIpIHtcblx0Y3ggPSBfY3hcblx0dnIgPSBfdnJcblx0aXNJbkdlbmVyYXRvciA9IGZhbHNlXG5cdGNvbnN0IHJlcyA9IHQwKG1vZHVsZUV4cHJlc3Npb24pXG5cdC8vIFJlbGVhc2UgZm9yIGdhcmJhZ2UgY29sbGVjdGlvblxuXHRjeCA9IHZyID0gdW5kZWZpbmVkXG5cdHJldHVybiByZXNcbn1cblxuY29uc3Rcblx0dDAgPSBleHByID0+IGxvYyhleHByLnRyYW5zcGlsZVN1YnRyZWUoKSwgZXhwci5sb2MpLFxuXHR0MSA9IChleHByLCBhcmcpID0+IGxvYyhleHByLnRyYW5zcGlsZVN1YnRyZWUoYXJnKSwgZXhwci5sb2MpLFxuXHR0MyA9IChleHByLCBhcmcsIGFyZzIsIGFyZzMpID0+IGxvYyhleHByLnRyYW5zcGlsZVN1YnRyZWUoYXJnLCBhcmcyLCBhcmczKSwgZXhwci5sb2MpLFxuXHR0TGluZXMgPSBleHBycyA9PiB7XG5cdFx0Y29uc3Qgb3V0ID0gWyBdXG5cdFx0ZXhwcnMuZm9yRWFjaChleHByID0+IHtcblx0XHRcdGNvbnN0IGFzdCA9IGV4cHIudHJhbnNwaWxlU3VidHJlZSgpXG5cdFx0XHRpZiAoYXN0IGluc3RhbmNlb2YgQXJyYXkpXG5cdFx0XHRcdC8vIERlYnVnIG1heSBwcm9kdWNlIG11bHRpcGxlIHN0YXRlbWVudHMuXG5cdFx0XHRcdGFzdC5mb3JFYWNoKF8gPT4gb3V0LnB1c2godG9TdGF0ZW1lbnQoXykpKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRvdXQucHVzaChsb2ModG9TdGF0ZW1lbnQoYXN0KSwgZXhwci5sb2MpKVxuXHRcdH0pXG5cdFx0cmV0dXJuIG91dFxuXHR9XG5cbmltcGxlbWVudE1hbnkoRUV4cG9ydHMsICd0cmFuc3BpbGVTdWJ0cmVlJywge1xuXHRBc3NpZ24oKSB7XG5cdFx0cmV0dXJuIHZhcmlhYmxlRGVjbGFyYXRpb25Db25zdChbIG1ha2VEZWNsYXJhdG9yKFxuXHRcdFx0dGhpcy5hc3NpZ25lZSwgdDAodGhpcy52YWx1ZSksIGZhbHNlLCB2ci5pc0V4cG9ydEFzc2lnbih0aGlzKSkgXSlcblx0fSxcblx0Ly8gVE9ETzpFUzYgSnVzdCB1c2UgbmF0aXZlIGRlc3RydWN0dXJpbmcgYXNzaWduXG5cdEFzc2lnbkRlc3RydWN0dXJlKCkge1xuXHRcdHJldHVybiB2YXJpYWJsZURlY2xhcmF0aW9uQ29uc3QobWFrZURlc3RydWN0dXJlRGVjbGFyYXRvcnMoXG5cdFx0XHR0aGlzLmFzc2lnbmVlcywgdGhpcy5pc0xhenksIHQwKHRoaXMudmFsdWUpLCBmYWxzZSwgdnIuaXNFeHBvcnRBc3NpZ24odGhpcykpKVxuXHR9LFxuXG5cdEJsb2NrRG8obGVhZCA9IG51bGwsIG9wUmVzRGVjbGFyZSA9IG51bGwsIG9wT3V0ID0gbnVsbCkge1xuXHRcdGFzc2VydChvcFJlc0RlY2xhcmUgPT09IG51bGwpXG5cdFx0cmV0dXJuIEJsb2NrU3RhdGVtZW50KGNhdChsZWFkLCB0TGluZXModGhpcy5saW5lcyksIG9wT3V0KSlcblx0fSxcblxuXHRCbG9ja1dpdGhSZXR1cm4obGVhZCwgb3BSZXNEZWNsYXJlLCBvcE91dCkge1xuXHRcdHJldHVybiB0cmFuc3BpbGVCbG9jayh0MCh0aGlzLnJldHVybmVkKSwgdGhpcy5saW5lcywgbGVhZCwgb3BSZXNEZWNsYXJlLCBvcE91dClcblx0fSxcblxuXHRCbG9ja09iaihsZWFkLCBvcFJlc0RlY2xhcmUsIG9wT3V0KSB7XG5cdFx0Ly8gVE9ETzogaW5jbHVkZVR5cGVDaGVja3MoKSBpcyBub3QgdGhlIHJpZ2h0IG1ldGhvZCBmb3IgdGhpc1xuXHRcdGNvbnN0IGtleXMgPVxuXHRcdFx0Y3gub3B0cy5pbmNsdWRlVHlwZUNoZWNrcygpID8gdGhpcy5rZXlzIDogdGhpcy5rZXlzLmZpbHRlcihfID0+ICF2ci5pc0RlYnVnTG9jYWwoXykpXG5cdFx0Y29uc3QgcmV0ID0gaWZFbHNlKHRoaXMub3BPYmplZCxcblx0XHRcdF8gPT4ge1xuXHRcdFx0XHRjb25zdCBvYmplZCA9IHQwKF8pXG5cdFx0XHRcdGNvbnN0IGtleXNWYWxzID0gY2F0KFxuXHRcdFx0XHRcdGZsYXRNYXAoa2V5cywga2V5ID0+IFsgTGl0ZXJhbChrZXkubmFtZSksIGFjY2Vzc0xvY2FsRGVjbGFyZShrZXkpIF0pLFxuXHRcdFx0XHRcdG9wTWFwKHRoaXMub3BEaXNwbGF5TmFtZSwgXyA9PiBbIExpdFN0ckRpc3BsYXlOYW1lLCBMaXRlcmFsKF8pIF0pKVxuXHRcdFx0XHRjb25zdCBhbnlMYXp5ID0ga2V5cy5zb21lKGtleSA9PiBrZXkuaXNMYXp5KVxuXHRcdFx0XHRyZXR1cm4gKGFueUxhenkgPyBtc0xzZXQgOiBtc1NldCkob2JqZWQsIC4uLmtleXNWYWxzKVxuXHRcdFx0fSxcblx0XHRcdCgpID0+IHtcblx0XHRcdFx0Y29uc3QgcHJvcHMgPSBrZXlzLm1hcChrZXkgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IHZhbCA9IGFjY2Vzc0xvY2FsRGVjbGFyZShrZXkpXG5cdFx0XHRcdFx0Y29uc3QgaWQgPSBwcm9wZXJ0eUlkT3JMaXRlcmFsQ2FjaGVkKGtleS5uYW1lKVxuXHRcdFx0XHRcdHJldHVybiBrZXkuaXNMYXp5ID8gcHJvcGVydHkoJ2dldCcsIGlkLCB0aHVuayh2YWwpKSA6IHByb3BlcnR5KCdpbml0JywgaWQsIHZhbClcblx0XHRcdFx0fSlcblx0XHRcdFx0Y29uc3Qgb3BQcm9wRGlzcGxheU5hbWUgPSBvcE1hcCh0aGlzLm9wRGlzcGxheU5hbWUsIF8gPT5cblx0XHRcdFx0XHRwcm9wZXJ0eSgnaW5pdCcsIElkRGlzcGxheU5hbWUsIExpdGVyYWwoXykpKVxuXHRcdFx0XHRyZXR1cm4gT2JqZWN0RXhwcmVzc2lvbihjYXQocHJvcHMsIG9wUHJvcERpc3BsYXlOYW1lKSlcblx0XHRcdH0pXG5cdFx0cmV0dXJuIHRyYW5zcGlsZUJsb2NrKHJldCwgdGhpcy5saW5lcywgbGVhZCwgb3BSZXNEZWNsYXJlLCBvcE91dClcblx0fSxcblxuXHRCbG9ja0JhZyhsZWFkLCBvcFJlc0RlY2xhcmUsIG9wT3V0KSB7XG5cdFx0Y29uc3QgbGVuZ3RoID0gdnIubGlzdE1hcExlbmd0aCh0aGlzKVxuXHRcdHJldHVybiB0cmFuc3BpbGVCbG9jayhcblx0XHRcdEFycmF5RXhwcmVzc2lvbihyYW5nZSgwLCBsZW5ndGgpLm1hcChpID0+IGlkQ2FjaGVkKGBfJHtpfWApKSksXG5cdFx0XHR0aGlzLmxpbmVzLCBsZWFkLCBvcFJlc0RlY2xhcmUsIG9wT3V0KVxuXHR9LFxuXG5cdEJsb2NrTWFwKGxlYWQsIG9wUmVzRGVjbGFyZSwgb3BPdXQpIHtcblx0XHRjb25zdCBsZW5ndGggPSB2ci5saXN0TWFwTGVuZ3RoKHRoaXMpXG5cdFx0cmV0dXJuIHRyYW5zcGlsZUJsb2NrKFxuXHRcdFx0bXNNYXAoLi4uZmxhdE1hcChyYW5nZSgwLCBsZW5ndGgpLCBpID0+XG5cdFx0XHRcdFsgaWRDYWNoZWQoYF9rJHtpfWApLCBpZENhY2hlZChgX3Yke2l9YCkgXSkpLFxuXHRcdFx0dGhpcy5saW5lcywgbGVhZCwgb3BSZXNEZWNsYXJlLCBvcE91dClcblx0fSxcblxuXHRCbG9ja1dyYXAoKSB7IHJldHVybiBibG9ja1dyYXAodGhpcywgdDAodGhpcy5ibG9jaykpIH0sXG5cblx0Q2FsbCgpIHtcblx0XHRjb25zdCBhbnlTcGxhdCA9IHRoaXMuYXJncy5zb21lKGFyZyA9PiBhcmcgaW5zdGFuY2VvZiBTcGxhdClcblx0XHRpZiAoYW55U3BsYXQpIHtcblx0XHRcdGNvbnN0IGFyZ3MgPSB0aGlzLmFyZ3MubWFwKGFyZyA9PlxuXHRcdFx0XHRhcmcgaW5zdGFuY2VvZiBTcGxhdCA/XG5cdFx0XHRcdFx0bXNBcnIodDAoYXJnLnNwbGF0dGVkKSkgOlxuXHRcdFx0XHRcdHQwKGFyZykpXG5cdFx0XHRyZXR1cm4gQ2FsbEV4cHJlc3Npb24oSWRGdW5jdGlvbkFwcGx5Q2FsbCwgW1xuXHRcdFx0XHR0MCh0aGlzLmNhbGxlZCksXG5cdFx0XHRcdExpdE51bGwsXG5cdFx0XHRcdENhbGxFeHByZXNzaW9uKG1lbWJlcihMaXRFbXB0eUFycmF5LCAnY29uY2F0JyksIGFyZ3MpXSlcblx0XHR9XG5cdFx0ZWxzZSByZXR1cm4gQ2FsbEV4cHJlc3Npb24odDAodGhpcy5jYWxsZWQpLCB0aGlzLmFyZ3MubWFwKHQwKSlcblx0fSxcblxuXHRDYXNlRG8oKSB7XG5cdFx0Y29uc3QgYm9keSA9IGNhc2VCb2R5KHRoaXMucGFydHMsIHRoaXMub3BFbHNlKVxuXHRcdHJldHVybiBpZkVsc2UodGhpcy5vcENhc2VkLCBfID0+IEJsb2NrU3RhdGVtZW50KFsgdDAoXyksIGJvZHkgXSksICgpID0+IGJvZHkpXG5cdH0sXG5cblx0Q2FzZVZhbCgpIHtcblx0XHRjb25zdCBib2R5ID0gY2FzZUJvZHkodGhpcy5wYXJ0cywgdGhpcy5vcEVsc2UpXG5cdFx0Y29uc3QgYmxvY2sgPSBpZkVsc2UodGhpcy5vcENhc2VkLCBfID0+IFsgdDAoXyksIGJvZHkgXSwgKCkgPT4gWyBib2R5IF0pXG5cdFx0cmV0dXJuIGJsb2NrV3JhcCh0aGlzLCBCbG9ja1N0YXRlbWVudChibG9jaykpXG5cdH0sXG5cblx0Q2FzZURvUGFydDogY2FzZVBhcnQsXG5cdENhc2VWYWxQYXJ0OiBjYXNlUGFydCxcblx0Ly8gVE9ETzogaW5jbHVkZUlub3V0Q2hlY2tzIGlzIG1pc25hbWVkXG5cdERlYnVnKCkgeyByZXR1cm4gY3gub3B0cy5pbmNsdWRlSW5vdXRDaGVja3MoKSA/IHRMaW5lcyh0aGlzLmxpbmVzKSA6IFsgXSB9LFxuXG5cdE9ialNpbXBsZSgpIHtcblx0XHRyZXR1cm4gT2JqZWN0RXhwcmVzc2lvbih0aGlzLnBhaXJzLm1hcChwYWlyID0+XG5cdFx0XHRwcm9wZXJ0eSgnaW5pdCcsIHByb3BlcnR5SWRPckxpdGVyYWxDYWNoZWQocGFpci5rZXkpLCB0MChwYWlyLnZhbHVlKSkpKVxuXHR9LFxuXG5cdEVuZExvb3AoKSB7IHJldHVybiBCcmVha1N0YXRlbWVudChsb29wSWQodnIuZW5kTG9vcFRvTG9vcC5nZXQodGhpcykpKSB9LFxuXG5cdEZ1bigpIHtcblx0XHRjb25zdCBvbGRJbkdlbmVyYXRvciA9IGlzSW5HZW5lcmF0b3Jcblx0XHRpc0luR2VuZXJhdG9yID0gdGhpcy5pc0dlbmVyYXRvclxuXG5cdFx0Ly8gVE9ETzpFUzYgdXNlIGAuLi5gZlxuXHRcdGNvbnN0IG5BcmdzID0gTGl0ZXJhbCh0aGlzLmFyZ3MubGVuZ3RoKVxuXHRcdGNvbnN0IG9wRGVjbGFyZVJlc3QgPSBvcE1hcCh0aGlzLm9wUmVzdEFyZywgcmVzdCA9PlxuXHRcdFx0ZGVjbGFyZShyZXN0LCBDYWxsRXhwcmVzc2lvbihBcnJheVNsaWNlQ2FsbCwgW0lkQXJndW1lbnRzLCBuQXJnc10pKSlcblx0XHRjb25zdCBhcmdDaGVja3MgPVxuXHRcdFx0b3BJZihjeC5vcHRzLmluY2x1ZGVUeXBlQ2hlY2tzKCksICgpID0+XG5cdFx0XHRcdGZsYXRPcE1hcCh0aGlzLmFyZ3MsIF8gPT5cblx0XHRcdFx0XHQvLyBUT0RPOiBXYXkgdG8gdHlwZWNoZWNrIGxhemllc1xuXHRcdFx0XHRcdG9wSWYoIV8uaXNMYXp5LCAoKSA9PlxuXHRcdFx0XHRcdFx0b3BNYXAoXy5vcFR5cGUsIHR5cGUgPT5cblx0XHRcdFx0XHRcdFx0RXhwcmVzc2lvblN0YXRlbWVudChtc0NoZWNrQ29udGFpbnMoXG5cdFx0XHRcdFx0XHRcdFx0dDAodHlwZSksXG5cdFx0XHRcdFx0XHRcdFx0YWNjZXNzTG9jYWxEZWNsYXJlKF8pLFxuXHRcdFx0XHRcdFx0XHRcdExpdGVyYWwoXy5uYW1lKSkpKSkpKVxuXG5cdFx0Y29uc3QgX2luID0gb3BNYXAodGhpcy5vcEluLCB0MClcblx0XHRjb25zdCBsZWFkID0gY2F0KG9wRGVjbGFyZVJlc3QsIGFyZ0NoZWNrcywgX2luKVxuXG5cdFx0Y29uc3QgX291dCA9IG9wTWFwKHRoaXMub3BPdXQsIHQwKVxuXHRcdGNvbnN0IGJvZHkgPSB0Myh0aGlzLmJsb2NrLCBsZWFkLCB0aGlzLm9wUmVzRGVjbGFyZSwgX291dClcblx0XHRjb25zdCBhcmdzID0gdGhpcy5hcmdzLm1hcCh0MClcblx0XHRpc0luR2VuZXJhdG9yID0gb2xkSW5HZW5lcmF0b3Jcblx0XHRjb25zdCBpZCA9IG9wTWFwKHRoaXMubmFtZSwgaWRDYWNoZWQpXG5cdFx0cmV0dXJuIEZ1bmN0aW9uRXhwcmVzc2lvbihpZCwgYXJncywgYm9keSwgdGhpcy5pc0dlbmVyYXRvcilcblx0fSxcblxuXHRMYXp5KCkgeyByZXR1cm4gbGF6eVdyYXAodDAodGhpcy52YWx1ZSkpIH0sXG5cblx0TGlzdFNpbXBsZSgpIHsgcmV0dXJuIEFycmF5RXhwcmVzc2lvbih0aGlzLnBhcnRzLm1hcCh0MCkpIH0sXG5cblx0QmFnRW50cnkoKSB7IHJldHVybiBkZWNsYXJlU3BlY2lhbChgXyR7dnIubGlzdE1hcEVudHJ5SW5kZXgodGhpcyl9YCwgdDAodGhpcy52YWx1ZSkpIH0sXG5cblx0TnVtYmVyTGl0ZXJhbCgpIHtcblx0XHQvLyBOZWdhdGl2ZSBudW1iZXJzIGFyZSBub3QgcGFydCBvZiBFUyBzcGVjLlxuXHRcdC8vIGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi81LjEvI3NlYy03LjguM1xuXHRcdGNvbnN0IGxpdCA9IExpdGVyYWwoTWF0aC5hYnModGhpcy52YWx1ZSkpXG5cdFx0cmV0dXJuIGlzUG9zaXRpdmUodGhpcy52YWx1ZSkgPyBsaXQgOiB1bmFyeUV4cHJlc3Npb25OZWdhdGUobGl0KVxuXHR9LFxuXG5cdEdsb2JhbEFjY2VzcygpIHsgcmV0dXJuIElkZW50aWZpZXIodGhpcy5uYW1lKSB9LFxuXG5cdExvY2FsQWNjZXNzKCkgeyByZXR1cm4gYWNjZXNzTG9jYWxEZWNsYXJlKHZyLmFjY2Vzc1RvTG9jYWwuZ2V0KHRoaXMpKSB9LFxuXG5cdExvY2FsRGVjbGFyZSgpIHsgcmV0dXJuIGlkRm9yRGVjbGFyZUNhY2hlZCh0aGlzKSB9LFxuXG5cdC8vIFRPRE86IERvbid0IGFsd2F5cyBsYWJlbCFcblx0TG9vcCgpIHtcblx0XHRyZXR1cm4gTGFiZWxlZFN0YXRlbWVudChsb29wSWQodGhpcyksIHdoaWxlU3RhdGVtZW50SW5maW5pdGUodDAodGhpcy5ibG9jaykpKVxuXHR9LFxuXG5cdE1hcEVudHJ5KCkge1xuXHRcdGNvbnN0IGluZGV4ID0gdnIubGlzdE1hcEVudHJ5SW5kZXgodGhpcylcblx0XHRjb25zdCBrID0gYF9rJHtpbmRleH1gXG5cdFx0Y29uc3QgdiA9IGBfdiR7aW5kZXh9YFxuXHRcdHJldHVybiB2YXJpYWJsZURlY2xhcmF0aW9uQ29uc3QoW1xuXHRcdFx0VmFyaWFibGVEZWNsYXJhdG9yKGlkQ2FjaGVkKGspLCB0MCh0aGlzLmtleSkpLFxuXHRcdFx0VmFyaWFibGVEZWNsYXJhdG9yKGlkQ2FjaGVkKHYpLCB0MCh0aGlzLnZhbCkpXG5cdFx0XSlcblx0fSxcblxuXHRNZW1iZXIoKSB7IHJldHVybiBtZW1iZXIodDAodGhpcy5vYmplY3QpLCB0aGlzLm5hbWUpIH0sXG5cblx0TW9kdWxlKCkge1xuXHRcdGNvbnN0IGJvZHkgPSBjYXQoXG5cdFx0XHR0TGluZXModGhpcy5saW5lcyksXG5cdFx0XHRvcE1hcCh0aGlzLm9wRGVmYXVsdEV4cG9ydCwgXyA9PiBhc3NpZ25tZW50RXhwcmVzc2lvblBsYWluKEV4cG9ydHNEZWZhdWx0LCB0MChfKSkpKVxuXHRcdHJldHVybiBQcm9ncmFtKGNhdChcblx0XHRcdG9wSWYoY3gub3B0cy5pbmNsdWRlVXNlU3RyaWN0KCksICgpID0+IFVzZVN0cmljdCksXG5cdFx0XHRvcElmKGN4Lm9wdHMuYW1kZWZpbmUoKSwgKCkgPT4gQW1kZWZpbmVIZWFkZXIpLFxuXHRcdFx0dG9TdGF0ZW1lbnQoYW1kV3JhcE1vZHVsZSh0aGlzLmRvVXNlcywgdGhpcy51c2VzLmNvbmNhdCh0aGlzLmRlYnVnVXNlcyksIGJvZHkpKSkpXG5cdH0sXG5cblx0UXVvdGUoKSB7XG5cdFx0Ly8gVE9ETzpFUzYgdXNlIHRlbXBsYXRlIHN0cmluZ3Ncblx0XHRjb25zdCBwYXJ0MCA9IHRoaXMucGFydHNbMF1cblx0XHRjb25zdCBbIGZpcnN0LCByZXN0UGFydHMgXSA9XG5cdFx0XHR0eXBlb2YgcGFydDAgPT09ICdzdHJpbmcnID9cblx0XHRcdFx0WyBMaXRlcmFsKHBhcnQwKSwgdGFpbCh0aGlzLnBhcnRzKSBdIDpcblx0XHRcdFx0WyBMaXRFbXB0eVN0cmluZywgdGhpcy5wYXJ0cyBdXG5cdFx0cmV0dXJuIHJlc3RQYXJ0cy5yZWR1Y2UoXG5cdFx0XHQoZXgsIF8pID0+XG5cdFx0XHRcdGJpbmFyeUV4cHJlc3Npb25QbHVzKGV4LCB0eXBlb2YgXyA9PT0gJ3N0cmluZycgPyBMaXRlcmFsKF8pIDogbXNTaG93KHQwKF8pKSksXG5cdFx0XHRmaXJzdClcblx0fSxcblxuXHRTcGVjaWFsKCkge1xuXHRcdC8vIE1ha2UgbmV3IG9iamVjdHMgYmVjYXVzZSB3ZSB3aWxsIGFzc2lnbiBgbG9jYCB0byB0aGVtLlxuXHRcdHN3aXRjaCAodGhpcy5raW5kKSB7XG5cdFx0XHRjYXNlIFNQX0NvbnRhaW5zOiByZXR1cm4gbWVtYmVyKElkTXMsICdjb250YWlucycpXG5cdFx0XHRjYXNlIFNQX0RlYnVnZ2VyOiByZXR1cm4gRGVidWdnZXJTdGF0ZW1lbnQoKVxuXHRcdFx0Y2FzZSBTUF9GYWxzZTogcmV0dXJuIExpdGVyYWwoZmFsc2UpXG5cdFx0XHRjYXNlIFNQX1N1YjogcmV0dXJuIG1lbWJlcihJZE1zLCAnc3ViJylcblx0XHRcdGNhc2UgU1BfVGhpczogcmV0dXJuIFx0VGhpc0V4cHJlc3Npb24oKVxuXHRcdFx0Y2FzZSBTUF9UaGlzTW9kdWxlRGlyZWN0b3J5OiByZXR1cm4gSWRlbnRpZmllcignX19kaXJuYW1lJylcblx0XHRcdGNhc2UgU1BfVHJ1ZTogcmV0dXJuIExpdGVyYWwodHJ1ZSlcblx0XHRcdGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcih0aGlzLmtpbmQpXG5cdFx0fVxuXHR9LFxuXG5cdFlpZWxkKCkgeyByZXR1cm4geWllbGRFeHByZXNzaW9uTm9EZWxlZ2F0ZSh0MCh0aGlzLnlpZWxkZWQpKSB9LFxuXG5cdFlpZWxkVG8oKSB7IHJldHVybiB5aWVsZEV4cHJlc3Npb25EZWxlZ2F0ZSh0MCh0aGlzLnlpZWxkZWRUbykpIH1cbn0pXG5cbmZ1bmN0aW9uIGNhc2VQYXJ0KGFsdGVybmF0ZSkge1xuXHRpZiAodGhpcy50ZXN0IGluc3RhbmNlb2YgUGF0dGVybikge1xuXHRcdGNvbnN0IHsgdHlwZSwgcGF0dGVybmVkLCBsb2NhbHMgfSA9IHRoaXMudGVzdFxuXHRcdGNvbnN0IGRlY2wgPSB2YXJpYWJsZURlY2xhcmF0aW9uQ29uc3QoW1xuXHRcdFx0VmFyaWFibGVEZWNsYXJhdG9yKElkRXh0cmFjdCwgbXNFeHRyYWN0KHQwKHR5cGUpLCB0MChwYXR0ZXJuZWQpKSkgXSlcblx0XHRjb25zdCB0ZXN0ID0gYmluYXJ5RXhwcmVzc2lvbk5vdEVxdWFsKElkRXh0cmFjdCwgTGl0TnVsbClcblx0XHRjb25zdCBleHRyYWN0ID0gdmFyaWFibGVEZWNsYXJhdGlvbkNvbnN0KGxvY2Fscy5tYXAoKF8sIGlkeCkgPT5cblx0XHRcdFZhcmlhYmxlRGVjbGFyYXRvcihpZEZvckRlY2xhcmVDYWNoZWQoXyksIG1lbWJlckV4cHJlc3Npb24oSWRFeHRyYWN0LCBMaXRlcmFsKGlkeCkpKSkpXG5cdFx0Y29uc3QgcmVzID0gdDEodGhpcy5yZXN1bHQsIGV4dHJhY3QpXG5cdFx0cmV0dXJuIEJsb2NrU3RhdGVtZW50KFsgZGVjbCwgSWZTdGF0ZW1lbnQodGVzdCwgcmVzLCBhbHRlcm5hdGUpIF0pXG5cdH0gZWxzZSB7XG5cdFx0Y29uc3QgY2hlY2tlZFRlc3QgPSBjeC5vcHRzLmluY2x1ZGVDYXNlQ2hlY2tzKCkgPyBtc0Jvb2wodDAodGhpcy50ZXN0KSkgOiB0MCh0aGlzLnRlc3QpXG5cdFx0Ly8gYWx0ZXJuYXRlIHdyaXR0ZW4gdG8gYnkgYGNhc2VCb2R5YC5cblx0XHRyZXR1cm4gSWZTdGF0ZW1lbnQoY2hlY2tlZFRlc3QsIHQwKHRoaXMucmVzdWx0KSwgYWx0ZXJuYXRlKVxuXHR9XG59XG5cbi8vIEZ1bmN0aW9ucyBzcGVjaWZpYyB0byBjZXJ0YWluIGV4cHJlc3Npb25zLlxuY29uc3Rcblx0YmxvY2tXcmFwID0gKF8sIGJsb2NrKSA9PiB7XG5cdFx0Y29uc3QgaW52b2tlID0gY2FsbEV4cHJlc3Npb25UaHVuayhmdW5jdGlvbkV4cHJlc3Npb25UaHVuayhibG9jaywgaXNJbkdlbmVyYXRvcikpXG5cdFx0cmV0dXJuIGlzSW5HZW5lcmF0b3IgPyB5aWVsZEV4cHJlc3Npb25EZWxlZ2F0ZShpbnZva2UpIDogaW52b2tlXG5cdH0sXG5cblx0Y2FzZUJvZHkgPSAocGFydHMsIG9wRWxzZSkgPT4ge1xuXHRcdGxldCBhY2MgPSBpZkVsc2Uob3BFbHNlLCB0MCwgKCkgPT4gdGhyb3dFcnJvcignTm8gYnJhbmNoIG9mIGBjYXNlYCBtYXRjaGVzLicpKVxuXHRcdGZvciAobGV0IGkgPSBwYXJ0cy5sZW5ndGggLSAxOyBpID49IDA7IGkgPSBpIC0gMSlcblx0XHRcdGFjYyA9IHQxKHBhcnRzW2ldLCBhY2MpXG5cdFx0cmV0dXJuIGFjY1xuXHR9LFxuXG5cdGxvb3BJZCA9IGxvb3AgPT4gaWRDYWNoZWQoYGxvb3Ake2xvb3AubG9jLnN0YXJ0LmxpbmV9YCksXG5cblx0dHJhbnNwaWxlQmxvY2sgPSAocmV0dXJuZWQsIGxpbmVzLCBsZWFkID0gbnVsbCwgb3BSZXNEZWNsYXJlID0gbnVsbCwgb3BPdXQgPSBudWxsKSA9PiB7XG5cdFx0Y29uc3QgZmluID0gaWZFbHNlKG9wUmVzRGVjbGFyZSxcblx0XHRcdHJkID0+IHtcblx0XHRcdFx0Y29uc3QgcmV0ID0gbWF5YmVXcmFwSW5DaGVja0NvbnRhaW5zKHJldHVybmVkLCByZC5vcFR5cGUsIHJkLm5hbWUpXG5cdFx0XHRcdHJldHVybiBpZkVsc2Uob3BPdXQsXG5cdFx0XHRcdFx0XyA9PiBjYXQoZGVjbGFyZShyZCwgcmV0KSwgXywgUmV0dXJuUmVzKSxcblx0XHRcdFx0XHQoKSA9PiBSZXR1cm5TdGF0ZW1lbnQocmV0KSlcblx0XHRcdH0sXG5cdFx0XHQoKSA9PiBjYXQob3BPdXQsIFJldHVyblN0YXRlbWVudChyZXR1cm5lZCkpKVxuXHRcdHJldHVybiBCbG9ja1N0YXRlbWVudChjYXQobGVhZCwgdExpbmVzKGxpbmVzKSwgZmluKSlcblx0fVxuXG4vLyBNb2R1bGUgaGVscGVyc1xuY29uc3Rcblx0YW1kV3JhcE1vZHVsZSA9IChkb1VzZXMsIG90aGVyVXNlcywgYm9keSkgPT4ge1xuXHRcdGNvbnN0IGFsbFVzZXMgPSBkb1VzZXMuY29uY2F0KG90aGVyVXNlcylcblx0XHRjb25zdCB1c2VQYXRocyA9IEFycmF5RXhwcmVzc2lvbihjYXQoXG5cdFx0XHRMaXRTdHJFeHBvcnRzLFxuXHRcdFx0YWxsVXNlcy5tYXAoXyA9PiBMaXRlcmFsKG1hbmdsZVBhdGgoXy5wYXRoKSkpKSlcblx0XHRjb25zdCB1c2VJZGVudGlmaWVycyA9IGFsbFVzZXMubWFwKChfLCBpKSA9PiBpZENhY2hlZChgJHtwYXRoQmFzZU5hbWUoXy5wYXRoKX1fJHtpfWApKVxuXHRcdGNvbnN0IHVzZUFyZ3MgPSBjYXQoSWRFeHBvcnRzLCB1c2VJZGVudGlmaWVycylcblx0XHRjb25zdCB1c2VEb3MgPSBkb1VzZXMubWFwKCh1c2UsIGkpID0+XG5cdFx0XHRsb2MoRXhwcmVzc2lvblN0YXRlbWVudChtc0dldE1vZHVsZSh1c2VJZGVudGlmaWVyc1tpXSkpLCB1c2UubG9jKSlcblx0XHRjb25zdCBvcFVzZURlY2xhcmUgPSBvcElmKCFpc0VtcHR5KG90aGVyVXNlcyksXG5cdFx0XHQoKSA9PiBWYXJpYWJsZURlY2xhcmF0aW9uKCdjb25zdCcsIGZsYXRNYXAob3RoZXJVc2VzLCAodXNlLCBpKSA9PlxuXHRcdFx0XHR1c2VEZWNsYXJhdG9ycyh1c2UsIHVzZUlkZW50aWZpZXJzW2kgKyBkb1VzZXMubGVuZ3RoXSkpKSlcblx0XHRjb25zdCBmdWxsQm9keSA9IEJsb2NrU3RhdGVtZW50KGNhdCh1c2VEb3MsIG9wVXNlRGVjbGFyZSwgYm9keSwgUmV0dXJuRXhwb3J0cykpXG5cdFx0Y29uc3QgbGF6eUJvZHkgPVxuXHRcdFx0Y3gub3B0cy5sYXp5TW9kdWxlKCkgP1xuXHRcdFx0XHRCbG9ja1N0YXRlbWVudChbIEV4cHJlc3Npb25TdGF0ZW1lbnQoXG5cdFx0XHRcdFx0YXNzaWdubWVudEV4cHJlc3Npb25QbGFpbihFeHBvcnRzR2V0LFxuXHRcdFx0XHRcdFx0bXNMYXp5KGZ1bmN0aW9uRXhwcmVzc2lvblRodW5rKGZ1bGxCb2R5KSkpKSBdKSA6XG5cdFx0XHRcdGZ1bGxCb2R5XG5cdFx0cmV0dXJuIENhbGxFeHByZXNzaW9uKElkRGVmaW5lLCBbIHVzZVBhdGhzLCBmdW5jdGlvbkV4cHJlc3Npb25QbGFpbih1c2VBcmdzLCBsYXp5Qm9keSkgXSlcblx0fSxcblxuXHRwYXRoQmFzZU5hbWUgPSBwYXRoID0+XG5cdFx0cGF0aC5zdWJzdHIocGF0aC5sYXN0SW5kZXhPZignLycpICsgMSksXG5cblx0dXNlRGVjbGFyYXRvcnMgPSAodXNlLCBtb2R1bGVJZGVudGlmaWVyKSA9PiB7XG5cdFx0Ly8gVE9ETzogQ291bGQgYmUgbmVhdGVyIGFib3V0IHRoaXNcblx0XHRjb25zdCBpc0xhenkgPSAoaXNFbXB0eSh1c2UudXNlZCkgPyB1c2Uub3BVc2VEZWZhdWx0IDogdXNlLnVzZWRbMF0pLmlzTGF6eVxuXHRcdGNvbnN0IHZhbHVlID0gKGlzTGF6eSA/IG1zTGF6eUdldE1vZHVsZSA6IG1zR2V0TW9kdWxlKShtb2R1bGVJZGVudGlmaWVyKVxuXG5cdFx0Y29uc3QgdXNlZERlZmF1bHQgPSBvcE1hcCh1c2Uub3BVc2VEZWZhdWx0LCBkZWYgPT4ge1xuXHRcdFx0Y29uc3QgZGVmZXhwID0gbXNHZXREZWZhdWx0RXhwb3J0KG1vZHVsZUlkZW50aWZpZXIpXG5cdFx0XHRjb25zdCB2YWwgPSBpc0xhenkgPyBsYXp5V3JhcChkZWZleHApIDogZGVmZXhwXG5cdFx0XHRyZXR1cm4gbG9jKFZhcmlhYmxlRGVjbGFyYXRvcihpZEZvckRlY2xhcmVDYWNoZWQoZGVmKSwgdmFsKSwgZGVmLmxvYylcblx0XHR9KVxuXG5cdFx0Y29uc3QgdXNlZERlc3RydWN0ID0gaXNFbXB0eSh1c2UudXNlZCkgPyBudWxsIDpcblx0XHRcdG1ha2VEZXN0cnVjdHVyZURlY2xhcmF0b3JzKHVzZS51c2VkLCBpc0xhenksIHZhbHVlLCB0cnVlLCBmYWxzZSlcblxuXHRcdHJldHVybiBjYXQodXNlZERlZmF1bHQsIHVzZWREZXN0cnVjdClcblx0fVxuXG4vLyBHZW5lcmFsIHV0aWxzLiBOb3QgaW4gdXRpbC5qcyBiZWNhdXNlIHRoZXNlIGNsb3NlIG92ZXIgY3guXG5jb25zdFxuXHRtYWtlRGVzdHJ1Y3R1cmVEZWNsYXJhdG9ycyA9IChhc3NpZ25lZXMsIGlzTGF6eSwgdmFsdWUsIGlzTW9kdWxlLCBpc0V4cG9ydCkgPT4ge1xuXHRcdGNvbnN0IGRlc3RydWN0dXJlZE5hbWUgPSBgXyQke2Fzc2lnbmVlc1swXS5sb2Muc3RhcnQubGluZX1gXG5cdFx0Y29uc3QgaWREZXN0cnVjdHVyZWQgPSBJZGVudGlmaWVyKGRlc3RydWN0dXJlZE5hbWUpXG5cdFx0Y29uc3QgZGVjbGFyYXRvcnMgPSBhc3NpZ25lZXMubWFwKGFzc2lnbmVlID0+IHtcblx0XHRcdC8vIFRPRE86IERvbid0IGNvbXBpbGUgaXQgaWYgaXQncyBuZXZlciBhY2Nlc3NlZFxuXHRcdFx0Y29uc3QgZ2V0ID0gZ2V0TWVtYmVyKGlkRGVzdHJ1Y3R1cmVkLCBhc3NpZ25lZS5uYW1lLCBpc0xhenksIGlzTW9kdWxlKVxuXHRcdFx0cmV0dXJuIG1ha2VEZWNsYXJhdG9yKGFzc2lnbmVlLCBnZXQsIGlzTGF6eSwgaXNFeHBvcnQpXG5cdFx0fSlcblx0XHQvLyBHZXR0aW5nIGxhenkgbW9kdWxlIGlzIGRvbmUgYnkgbXMubGF6eUdldE1vZHVsZS5cblx0XHRjb25zdCB2YWwgPSAoaXNMYXp5ICYmICFpc01vZHVsZSkgPyBsYXp5V3JhcCh2YWx1ZSkgOiB2YWx1ZVxuXHRcdHJldHVybiB1bnNoaWZ0KFZhcmlhYmxlRGVjbGFyYXRvcihpZERlc3RydWN0dXJlZCwgdmFsKSwgZGVjbGFyYXRvcnMpXG5cdH0sXG5cblx0bWFrZURlY2xhcmF0b3IgPSAoYXNzaWduZWUsIHZhbHVlLCB2YWx1ZUlzQWxyZWFkeUxhenksIGlzRXhwb3J0KSA9PiB7XG5cdFx0Y29uc3QgeyBpc0xhenksIGxvYywgbmFtZSwgb3BUeXBlIH0gPSBhc3NpZ25lZVxuXHRcdC8vIFRPRE86IGFzc2VydChhc3NpZ25lZS5vcFR5cGUgPT09IG51bGwpXG5cdFx0Ly8gb3IgVE9ETzogQWxsb3cgdHlwZSBjaGVjayBvbiBsYXp5IHZhbHVlP1xuXHRcdHZhbHVlID0gaXNMYXp5ID8gdmFsdWUgOiBtYXliZVdyYXBJbkNoZWNrQ29udGFpbnModmFsdWUsIG9wVHlwZSwgbmFtZSlcblx0XHRpZiAoaXNFeHBvcnQpIHtcblx0XHRcdC8vIFRPRE86RVM2XG5cdFx0XHRjeC5jaGVjayghaXNMYXp5LCBsb2MsICdMYXp5IGV4cG9ydCBub3Qgc3VwcG9ydGVkLicpXG5cdFx0XHRyZXR1cm4gVmFyaWFibGVEZWNsYXJhdG9yKFxuXHRcdFx0XHRpZEZvckRlY2xhcmVDYWNoZWQoYXNzaWduZWUpLFxuXHRcdFx0XHRhc3NpZ25tZW50RXhwcmVzc2lvblBsYWluKG1lbWJlcihJZEV4cG9ydHMsIG5hbWUpLCB2YWx1ZSkpXG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IHZhbCA9IGlzTGF6eSAmJiAhdmFsdWVJc0FscmVhZHlMYXp5ID8gbGF6eVdyYXAodmFsdWUpIDogdmFsdWVcblx0XHRcdGFzc2VydChpc0xhenkgfHwgIXZhbHVlSXNBbHJlYWR5TGF6eSlcblx0XHRcdHJldHVybiBWYXJpYWJsZURlY2xhcmF0b3IoaWRGb3JEZWNsYXJlQ2FjaGVkKGFzc2lnbmVlKSwgdmFsKVxuXHRcdH1cblx0fSxcblxuXHRtYXliZVdyYXBJbkNoZWNrQ29udGFpbnMgPSAoYXN0LCBvcFR5cGUsIG5hbWUpID0+XG5cdFx0KGN4Lm9wdHMuaW5jbHVkZVR5cGVDaGVja3MoKSAmJiBvcFR5cGUgIT09IG51bGwpID9cblx0XHRcdG1zQ2hlY2tDb250YWlucyh0MChvcFR5cGUpLCBhc3QsIExpdGVyYWwobmFtZSkpIDpcblx0XHRcdGFzdCxcblxuXHRnZXRNZW1iZXIgPSAoYXN0T2JqZWN0LCBnb3ROYW1lLCBpc0xhenksIGlzTW9kdWxlKSA9PlxuXHRcdGlzTGF6eSA/XG5cdFx0bXNMYXp5R2V0KGFzdE9iamVjdCwgTGl0ZXJhbChnb3ROYW1lKSkgOlxuXHRcdGlzTW9kdWxlICYmIGN4Lm9wdHMuaW5jbHVkZVVzZUNoZWNrcygpID9cblx0XHRtc0dldChhc3RPYmplY3QsIExpdGVyYWwoZ290TmFtZSkpIDpcblx0XHRtZW1iZXIoYXN0T2JqZWN0LCBnb3ROYW1lKVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=