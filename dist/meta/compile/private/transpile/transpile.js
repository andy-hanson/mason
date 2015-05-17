if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'esast/dist/ast', 'esast/dist/util', 'esast/dist/specialize', '../../Expression', '../manglePath', '../util', './ast-constants', './ms-call', './util'], function (exports, module, _esastDistAst, _esastDistUtil, _esastDistSpecialize, _Expression, _manglePath, _util, _astConstants, _msCall, _util2) {
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

	(0, _util.implementMany)(_Expression, 'transpileSubtree', {
		Assign: function () {
			return (0, _esastDistSpecialize.variableDeclarationConst)([makeDeclarator(this.assignee, t0(this.value), false, vr.isExportAssign(this))]);
		},
		// TODO:ES6 Just use native destructuring assign
		AssignDestructure: function () {
			return (0, _esastDistSpecialize.variableDeclarationConst)(makeDestructureDeclarators(this.assignees, this.isLazy, t0(this.value), false, vr.isExportAssign(this)));
		},

		BagEntry: function () {
			return (0, _util2.declareSpecial)('_' + vr.listMapEntryIndex(this), t0(this.value));
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
			const keys = cx.opts.includeTypeChecks() ? this.keys : this.keys.filter(function (_) {
				return !vr.isDebugLocal(_);
			});
			const ret = (0, _util.ifElse)(this.opObjed, function (_) {
				const objed = t0(_);
				const keysVals = (0, _util.cat)((0, _util.flatMap)(keys, function (key) {
					return [(0, _esastDistAst.Literal)(key.name), (0, _util2.accessLocalDeclare)(key)];
				}), (0, _util.opMap)(_this.opName, function (_) {
					return [_astConstants.LitStrName, (0, _esastDistAst.Literal)(_)];
				}));
				const anyLazy = keys.some(function (key) {
					return key.isLazy;
				});
				return (anyLazy ? _msCall.msLset : _msCall.msSet).apply(undefined, [objed].concat(_toConsumableArray(keysVals)));
			}, function () {
				const props = keys.map(function (key) {
					const val = (0, _util2.accessLocalDeclare)(key);
					const id = (0, _esastDistUtil.propertyIdOrLiteralCached)(key.name);
					return key.isLazy ? (0, _esastDistSpecialize.property)('get', id, (0, _esastDistUtil.thunk)(val)) : (0, _esastDistSpecialize.property)('init', id, val);
				});
				const opPropName = (0, _util.opMap)(_this.opName, function (_) {
					return (0, _esastDistSpecialize.property)('init', _astConstants.IdName, (0, _esastDistAst.Literal)(_));
				});
				return (0, _esastDistAst.ObjectExpression)((0, _util.cat)(props, opPropName));
			});
			return transpileBlock(ret, this.lines, lead, opResDeclare, opOut);
		},

		BlockBag: function (lead, opResDeclare, opOut) {
			const length = vr.listMapLength(this);
			return transpileBlock((0, _esastDistAst.ArrayExpression)((0, _util.range)(length).map(function (i) {
				return (0, _esastDistUtil.idCached)('_' + i);
			})), this.lines, lead, opResDeclare, opOut);
		},

		BlockMap: function (lead, opResDeclare, opOut) {
			const length = vr.listMapLength(this);
			return transpileBlock(_msCall.msMap.apply(undefined, _toConsumableArray((0, _util.flatMap)((0, _util.range)(length), function (i) {
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
			const opDeclareRest = (0, _util.opMap)(this.opRestArg, function (rest) {
				return (0, _util2.declare)(rest, (0, _esastDistAst.CallExpression)(_astConstants.ArraySliceCall, [_astConstants.IdArguments, nArgs]));
			});
			const argChecks = (0, _util.opIf)(cx.opts.includeTypeChecks(), function () {
				return (0, _util.flatOpMap)(_this2.args, function (_) {
					return (
						// TODO: Way to typecheck lazies
						(0, _util.opIf)(!_.isLazy, function () {
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
			return (0, _util.isPositive)(this.value) ? lit : (0, _util2.unaryExpressionNegate)(lit);
		},

		GlobalAccess: function () {
			return (0, _esastDistAst.Identifier)(this.name);
		},

		LocalAccess: function () {
			return (0, _util2.accessLocalDeclare)(vr.accessToLocal.get(this));
		},

		LocalDeclare: function () {
			return (0, _util2.idForDeclareCached)(this);
		},

		// TODO: Don't always label!
		Loop: function () {
			return (0, _esastDistAst.LabeledStatement)(loopId(this), (0, _util2.whileStatementInfinite)(t0(this.block)));
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
			const body = (0, _util.cat)(tLines(this.lines), (0, _util.opMap)(this.opDefaultExport, function (_) {
				return (0, _esastDistSpecialize.assignmentExpressionPlain)(_astConstants.ExportsDefault, t0(_));
			}));
			return (0, _esastDistAst.Program)((0, _util.cat)((0, _util.opIf)(cx.opts.includeUseStrict(), function () {
				return _astConstants.UseStrict;
			}), (0, _util.opIf)(cx.opts.includeAmdefine(), function () {
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
				return (0, _util2.binaryExpressionPlus)(ex, typeof _ === 'string' ? (0, _esastDistAst.Literal)(_) : (0, _msCall.msShow)(t0(_)));
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
					return (0, _util2.unaryExpressionVoid)(_astConstants.LitZero);
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
			const test = (0, _util2.binaryExpressionNotEqual)(_astConstants.IdExtract, _astConstants.LitNull);
			const extract = (0, _esastDistSpecialize.variableDeclarationConst)(locals.map(function (_, idx) {
				return (0, _esastDistAst.VariableDeclarator)((0, _util2.idForDeclareCached)(_), (0, _esastDistSpecialize.memberExpression)(_astConstants.IdExtract, (0, _esastDistAst.Literal)(idx)));
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
		let acc = (0, _util.ifElse)(opElse, t0, function () {
			return (0, _util2.throwError)('No branch of `case` matches.');
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
		const lazyBody = cx.opts.lazyModule() ? (0, _esastDistAst.BlockStatement)([(0, _esastDistAst.ExpressionStatement)((0, _esastDistSpecialize.assignmentExpressionPlain)(_astConstants.ExportsGet, (0, _msCall.msLazy)((0, _esastDistSpecialize.functionExpressionThunk)(fullBody))))]) : fullBody;
		return (0, _esastDistAst.CallExpression)(_astConstants.IdDefine, [usePaths, (0, _esastDistSpecialize.functionExpressionPlain)(useArgs, lazyBody)]);
	},
	      pathBaseName = function (path) {
		return path.substr(path.lastIndexOf('/') + 1);
	},
	      useDeclarators = function (use, moduleIdentifier) {
		// TODO: Could be neater about this
		const isLazy = ((0, _util.isEmpty)(use.used) ? use.opUseDefault : use.used[0]).isLazy;
		const value = (isLazy ? _msCall.msLazyGetModule : _msCall.msGetModule)(moduleIdentifier);

		const usedDefault = (0, _util.opMap)(use.opUseDefault, function (def) {
			const defexp = (0, _msCall.msGetDefaultExport)(moduleIdentifier);
			const val = isLazy ? (0, _msCall.lazyWrap)(defexp) : defexp;
			return (0, _esastDistUtil.loc)((0, _esastDistAst.VariableDeclarator)((0, _util2.idForDeclareCached)(def), val), def.loc);
		});

		const usedDestruct = (0, _util.isEmpty)(use.used) ? null : makeDestructureDeclarators(use.used, isLazy, value, true, false);

		return (0, _util.cat)(usedDefault, usedDestruct);
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
		return (0, _util.unshift)((0, _esastDistAst.VariableDeclarator)(idDestructured, val), declarators);
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
			return (0, _esastDistAst.VariableDeclarator)((0, _util2.idForDeclareCached)(assignee), (0, _esastDistSpecialize.assignmentExpressionPlain)((0, _esastDistUtil.member)(_astConstants.IdExports, name), value));
		} else {
			const val = isLazy && !valueIsAlreadyLazy ? (0, _msCall.lazyWrap)(value) : value;
			(0, _util.assert)(isLazy || !valueIsAlreadyLazy);
			return (0, _esastDistAst.VariableDeclarator)((0, _util2.idForDeclareCached)(assignee), val);
		}
	},
	      maybeWrapInCheckContains = function (ast, opType, name) {
		return cx.opts.includeTypeChecks() && opType !== null ? (0, _msCall.msCheckContains)(t0(opType), ast, (0, _esastDistAst.Literal)(name)) : ast;
	},
	      getMember = function (astObject, gotName, isLazy, isModule) {
		return isLazy ? (0, _msCall.msLazyGet)(astObject, (0, _esastDistAst.Literal)(gotName)) : isModule && cx.opts.includeUseChecks() ? (0, _msCall.msGet)(astObject, (0, _esastDistAst.Literal)(gotName)) : (0, _esastDistUtil.member)(astObject, gotName);
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS90cmFuc3BpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2tCQTRCd0IsU0FBUzs7Ozs7Ozs7OztBQUZqQyxLQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsYUFBYSxDQUFBOztBQUVWLFVBQVMsU0FBUyxDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRSxHQUFHLEVBQUU7QUFDN0QsSUFBRSxHQUFHLEdBQUcsQ0FBQTtBQUNSLElBQUUsR0FBRyxHQUFHLENBQUE7QUFDUixlQUFhLEdBQUcsS0FBSyxDQUFBO0FBQ3JCLFFBQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBOztBQUVoQyxJQUFFLEdBQUcsRUFBRSxHQUFHLFNBQVMsQ0FBQTtBQUNuQixTQUFPLEdBQUcsQ0FBQTtFQUNWOztBQUVELE9BQ0MsRUFBRSxHQUFHLFVBQUEsSUFBSTtTQUFJLG1CQW5DSyxHQUFHLEVBbUNKLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUM7RUFBQTtPQUNuRCxFQUFFLEdBQUcsVUFBQyxJQUFJLEVBQUUsR0FBRztTQUFLLG1CQXBDRixHQUFHLEVBb0NHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDO0VBQUE7T0FDN0QsRUFBRSxHQUFHLFVBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSTtTQUFLLG1CQXJDZCxHQUFHLEVBcUNlLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUM7RUFBQTtPQUNyRixNQUFNLEdBQUcsVUFBQSxLQUFLLEVBQUk7QUFDakIsUUFBTSxHQUFHLEdBQUcsRUFBRyxDQUFBO0FBQ2YsT0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUksRUFBSTtBQUNyQixTQUFN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Y29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS90cmFuc3BpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcnJheUV4cHJlc3Npb24sIEJsb2NrU3RhdGVtZW50LCBCcmVha1N0YXRlbWVudCwgQ2FsbEV4cHJlc3Npb24sIERlYnVnZ2VyU3RhdGVtZW50LFxuXHRFeHByZXNzaW9uU3RhdGVtZW50LCBGdW5jdGlvbkV4cHJlc3Npb24sIElkZW50aWZpZXIsIElmU3RhdGVtZW50LCBMYWJlbGVkU3RhdGVtZW50LCBMaXRlcmFsLFxuXHRPYmplY3RFeHByZXNzaW9uLCBQcm9ncmFtLCBSZXR1cm5TdGF0ZW1lbnQsIFRoaXNFeHByZXNzaW9uLCBWYXJpYWJsZURlY2xhcmF0aW9uLFxuXHRWYXJpYWJsZURlY2xhcmF0b3IsIFJldHVyblN0YXRlbWVudCB9IGZyb20gJ2VzYXN0L2Rpc3QvYXN0J1xuaW1wb3J0IHsgaWRDYWNoZWQsIGxvYywgbWVtYmVyLCBwcm9wZXJ0eUlkT3JMaXRlcmFsQ2FjaGVkLCB0aHVuaywgdG9TdGF0ZW1lbnRcblx0fSBmcm9tICdlc2FzdC9kaXN0L3V0aWwnXG5pbXBvcnQgeyBhc3NpZ25tZW50RXhwcmVzc2lvblBsYWluLCBjYWxsRXhwcmVzc2lvblRodW5rLCBmdW5jdGlvbkV4cHJlc3Npb25QbGFpbixcblx0ZnVuY3Rpb25FeHByZXNzaW9uVGh1bmssIG1lbWJlckV4cHJlc3Npb24sIHByb3BlcnR5LCB2YXJpYWJsZURlY2xhcmF0aW9uQ29uc3QsXG5cdHlpZWxkRXhwcmVzc2lvbkRlbGVnYXRlLCB5aWVsZEV4cHJlc3Npb25Ob0RlbGVnYXRlIH0gZnJvbSAnZXNhc3QvZGlzdC9zcGVjaWFsaXplJ1xuaW1wb3J0ICogYXMgRUV4cG9ydHMgZnJvbSAnLi4vLi4vRXhwcmVzc2lvbidcbmltcG9ydCB7IFBhdHRlcm4sIFNwbGF0LCBTRF9EZWJ1Z2dlciwgU1ZfQ29udGFpbnMsIFNWX0ZhbHNlLCBTVl9OdWxsLCBTVl9TdWIsXG5cdFNWX1RoaXMsIFNWX1RoaXNNb2R1bGVEaXJlY3RvcnksIFNWX1RydWUsIFNWX1VuZGVmaW5lZCB9IGZyb20gJy4uLy4uL0V4cHJlc3Npb24nXG5pbXBvcnQgbWFuZ2xlUGF0aCBmcm9tICcuLi9tYW5nbGVQYXRoJ1xuaW1wb3J0IHsgYXNzZXJ0LCBjYXQsIGZsYXRNYXAsIGZsYXRPcE1hcCwgaWZFbHNlLCBpc0VtcHR5LFxuXHRpbXBsZW1lbnRNYW55LCBpc1Bvc2l0aXZlLCBvcElmLCBvcE1hcCwgcmFuZ2UsIHRhaWwsIHVuc2hpZnQgfSBmcm9tICcuLi91dGlsJ1xuaW1wb3J0IHsgQW1kZWZpbmVIZWFkZXIsIEFycmF5U2xpY2VDYWxsLCBFeHBvcnRzRGVmYXVsdCwgRXhwb3J0c0dldCwgSWRBcmd1bWVudHMsIElkRGVmaW5lLFxuXHRJZEV4cG9ydHMsIElkRXh0cmFjdCwgSWRGdW5jdGlvbkFwcGx5Q2FsbCwgSWROYW1lLCBMaXRFbXB0eUFycmF5LCBMaXRFbXB0eVN0cmluZywgTGl0TnVsbCxcblx0TGl0U3RyRXhwb3J0cywgTGl0U3RyTmFtZSwgTGl0WmVybywgUmV0dXJuRXhwb3J0cywgUmV0dXJuUmVzLCBVc2VTdHJpY3Rcblx0fSBmcm9tICcuL2FzdC1jb25zdGFudHMnXG5pbXBvcnQgeyBJZE1zLCBsYXp5V3JhcCwgbXNBcnIsIG1zQm9vbCwgbXNDaGVja0NvbnRhaW5zLCBtc0V4dHJhY3QsIG1zR2V0LCBtc0dldERlZmF1bHRFeHBvcnQsXG5cdG1zR2V0TW9kdWxlLCBtc0xhenksIG1zTGF6eUdldCwgbXNMYXp5R2V0TW9kdWxlLCBtc0xzZXQsIG1zTWFwLCBtc1NldCwgbXNTaG93XG5cdH0gZnJvbSAnLi9tcy1jYWxsJ1xuaW1wb3J0IHsgYWNjZXNzTG9jYWxEZWNsYXJlLCBiaW5hcnlFeHByZXNzaW9uTm90RXF1YWwsIGJpbmFyeUV4cHJlc3Npb25QbHVzLCBkZWNsYXJlLFxuXHRkZWNsYXJlU3BlY2lhbCwgaWRGb3JEZWNsYXJlQ2FjaGVkLCB0aHJvd0Vycm9yLCB1bmFyeUV4cHJlc3Npb25OZWdhdGUsIHVuYXJ5RXhwcmVzc2lvblZvaWQsXG5cdHdoaWxlU3RhdGVtZW50SW5maW5pdGUgfSBmcm9tICcuL3V0aWwnXG5cbmxldCBjeCwgdnIsIGlzSW5HZW5lcmF0b3JcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdHJhbnNwaWxlKF9jeCwgbW9kdWxlRXhwcmVzc2lvbiwgX3ZyKSB7XG5cdGN4ID0gX2N4XG5cdHZyID0gX3ZyXG5cdGlzSW5HZW5lcmF0b3IgPSBmYWxzZVxuXHRjb25zdCByZXMgPSB0MChtb2R1bGVFeHByZXNzaW9uKVxuXHQvLyBSZWxlYXNlIGZvciBnYXJiYWdlIGNvbGxlY3Rpb25cblx0Y3ggPSB2ciA9IHVuZGVmaW5lZFxuXHRyZXR1cm4gcmVzXG59XG5cbmNvbnN0XG5cdHQwID0gZXhwciA9PiBsb2MoZXhwci50cmFuc3BpbGVTdWJ0cmVlKCksIGV4cHIubG9jKSxcblx0dDEgPSAoZXhwciwgYXJnKSA9PiBsb2MoZXhwci50cmFuc3BpbGVTdWJ0cmVlKGFyZyksIGV4cHIubG9jKSxcblx0dDMgPSAoZXhwciwgYXJnLCBhcmcyLCBhcmczKSA9PiBsb2MoZXhwci50cmFuc3BpbGVTdWJ0cmVlKGFyZywgYXJnMiwgYXJnMyksIGV4cHIubG9jKSxcblx0dExpbmVzID0gZXhwcnMgPT4ge1xuXHRcdGNvbnN0IG91dCA9IFsgXVxuXHRcdGV4cHJzLmZvckVhY2goZXhwciA9PiB7XG5cdFx0XHRjb25zdCBhc3QgPSBleHByLnRyYW5zcGlsZVN1YnRyZWUoKVxuXHRcdFx0aWYgKGFzdCBpbnN0YW5jZW9mIEFycmF5KVxuXHRcdFx0XHQvLyBEZWJ1ZyBtYXkgcHJvZHVjZSBtdWx0aXBsZSBzdGF0ZW1lbnRzLlxuXHRcdFx0XHRhc3QuZm9yRWFjaChfID0+IG91dC5wdXNoKHRvU3RhdGVtZW50KF8pKSlcblx0XHRcdGVsc2Vcblx0XHRcdFx0b3V0LnB1c2gobG9jKHRvU3RhdGVtZW50KGFzdCksIGV4cHIubG9jKSlcblx0XHR9KVxuXHRcdHJldHVybiBvdXRcblx0fVxuXG5pbXBsZW1lbnRNYW55KEVFeHBvcnRzLCAndHJhbnNwaWxlU3VidHJlZScsIHtcblx0QXNzaWduKCkge1xuXHRcdHJldHVybiB2YXJpYWJsZURlY2xhcmF0aW9uQ29uc3QoWyBtYWtlRGVjbGFyYXRvcihcblx0XHRcdHRoaXMuYXNzaWduZWUsIHQwKHRoaXMudmFsdWUpLCBmYWxzZSwgdnIuaXNFeHBvcnRBc3NpZ24odGhpcykpIF0pXG5cdH0sXG5cdC8vIFRPRE86RVM2IEp1c3QgdXNlIG5hdGl2ZSBkZXN0cnVjdHVyaW5nIGFzc2lnblxuXHRBc3NpZ25EZXN0cnVjdHVyZSgpIHtcblx0XHRyZXR1cm4gdmFyaWFibGVEZWNsYXJhdGlvbkNvbnN0KG1ha2VEZXN0cnVjdHVyZURlY2xhcmF0b3JzKFxuXHRcdFx0dGhpcy5hc3NpZ25lZXMsIHRoaXMuaXNMYXp5LCB0MCh0aGlzLnZhbHVlKSwgZmFsc2UsIHZyLmlzRXhwb3J0QXNzaWduKHRoaXMpKSlcblx0fSxcblxuXHRCYWdFbnRyeSgpIHsgcmV0dXJuIGRlY2xhcmVTcGVjaWFsKGBfJHt2ci5saXN0TWFwRW50cnlJbmRleCh0aGlzKX1gLCB0MCh0aGlzLnZhbHVlKSkgfSxcblxuXHRCYWdTaW1wbGUoKSB7IHJldHVybiBBcnJheUV4cHJlc3Npb24odGhpcy5wYXJ0cy5tYXAodDApKSB9LFxuXG5cdEJsb2NrRG8obGVhZCA9IG51bGwsIG9wUmVzRGVjbGFyZSA9IG51bGwsIG9wT3V0ID0gbnVsbCkge1xuXHRcdGFzc2VydChvcFJlc0RlY2xhcmUgPT09IG51bGwpXG5cdFx0cmV0dXJuIEJsb2NrU3RhdGVtZW50KGNhdChsZWFkLCB0TGluZXModGhpcy5saW5lcyksIG9wT3V0KSlcblx0fSxcblxuXHRCbG9ja1dpdGhSZXR1cm4obGVhZCwgb3BSZXNEZWNsYXJlLCBvcE91dCkge1xuXHRcdHJldHVybiB0cmFuc3BpbGVCbG9jayh0MCh0aGlzLnJldHVybmVkKSwgdGhpcy5saW5lcywgbGVhZCwgb3BSZXNEZWNsYXJlLCBvcE91dClcblx0fSxcblxuXHRCbG9ja09iaihsZWFkLCBvcFJlc0RlY2xhcmUsIG9wT3V0KSB7XG5cdFx0Ly8gVE9ETzogaW5jbHVkZVR5cGVDaGVja3MoKSBpcyBub3QgdGhlIHJpZ2h0IG1ldGhvZCBmb3IgdGhpc1xuXHRcdGNvbnN0IGtleXMgPVxuXHRcdFx0Y3gub3B0cy5pbmNsdWRlVHlwZUNoZWNrcygpID8gdGhpcy5rZXlzIDogdGhpcy5rZXlzLmZpbHRlcihfID0+ICF2ci5pc0RlYnVnTG9jYWwoXykpXG5cdFx0Y29uc3QgcmV0ID0gaWZFbHNlKHRoaXMub3BPYmplZCxcblx0XHRcdF8gPT4ge1xuXHRcdFx0XHRjb25zdCBvYmplZCA9IHQwKF8pXG5cdFx0XHRcdGNvbnN0IGtleXNWYWxzID0gY2F0KFxuXHRcdFx0XHRcdGZsYXRNYXAoa2V5cywga2V5ID0+IFsgTGl0ZXJhbChrZXkubmFtZSksIGFjY2Vzc0xvY2FsRGVjbGFyZShrZXkpIF0pLFxuXHRcdFx0XHRcdG9wTWFwKHRoaXMub3BOYW1lLCBfID0+IFsgTGl0U3RyTmFtZSwgTGl0ZXJhbChfKSBdKSlcblx0XHRcdFx0Y29uc3QgYW55TGF6eSA9IGtleXMuc29tZShrZXkgPT4ga2V5LmlzTGF6eSlcblx0XHRcdFx0cmV0dXJuIChhbnlMYXp5ID8gbXNMc2V0IDogbXNTZXQpKG9iamVkLCAuLi5rZXlzVmFscylcblx0XHRcdH0sXG5cdFx0XHQoKSA9PiB7XG5cdFx0XHRcdGNvbnN0IHByb3BzID0ga2V5cy5tYXAoa2V5ID0+IHtcblx0XHRcdFx0XHRjb25zdCB2YWwgPSBhY2Nlc3NMb2NhbERlY2xhcmUoa2V5KVxuXHRcdFx0XHRcdGNvbnN0IGlkID0gcHJvcGVydHlJZE9yTGl0ZXJhbENhY2hlZChrZXkubmFtZSlcblx0XHRcdFx0XHRyZXR1cm4ga2V5LmlzTGF6eSA/IHByb3BlcnR5KCdnZXQnLCBpZCwgdGh1bmsodmFsKSkgOiBwcm9wZXJ0eSgnaW5pdCcsIGlkLCB2YWwpXG5cdFx0XHRcdH0pXG5cdFx0XHRcdGNvbnN0IG9wUHJvcE5hbWUgPSBvcE1hcCh0aGlzLm9wTmFtZSwgXyA9PiBwcm9wZXJ0eSgnaW5pdCcsIElkTmFtZSwgTGl0ZXJhbChfKSkpXG5cdFx0XHRcdHJldHVybiBPYmplY3RFeHByZXNzaW9uKGNhdChwcm9wcywgb3BQcm9wTmFtZSkpXG5cdFx0XHR9KVxuXHRcdHJldHVybiB0cmFuc3BpbGVCbG9jayhyZXQsIHRoaXMubGluZXMsIGxlYWQsIG9wUmVzRGVjbGFyZSwgb3BPdXQpXG5cdH0sXG5cblx0QmxvY2tCYWcobGVhZCwgb3BSZXNEZWNsYXJlLCBvcE91dCkge1xuXHRcdGNvbnN0IGxlbmd0aCA9IHZyLmxpc3RNYXBMZW5ndGgodGhpcylcblx0XHRyZXR1cm4gdHJhbnNwaWxlQmxvY2soXG5cdFx0XHRBcnJheUV4cHJlc3Npb24ocmFuZ2UobGVuZ3RoKS5tYXAoaSA9PiBpZENhY2hlZChgXyR7aX1gKSkpLFxuXHRcdFx0dGhpcy5saW5lcywgbGVhZCwgb3BSZXNEZWNsYXJlLCBvcE91dClcblx0fSxcblxuXHRCbG9ja01hcChsZWFkLCBvcFJlc0RlY2xhcmUsIG9wT3V0KSB7XG5cdFx0Y29uc3QgbGVuZ3RoID0gdnIubGlzdE1hcExlbmd0aCh0aGlzKVxuXHRcdHJldHVybiB0cmFuc3BpbGVCbG9jayhcblx0XHRcdG1zTWFwKC4uLmZsYXRNYXAocmFuZ2UobGVuZ3RoKSwgaSA9PlxuXHRcdFx0XHRbIGlkQ2FjaGVkKGBfayR7aX1gKSwgaWRDYWNoZWQoYF92JHtpfWApIF0pKSxcblx0XHRcdHRoaXMubGluZXMsIGxlYWQsIG9wUmVzRGVjbGFyZSwgb3BPdXQpXG5cdH0sXG5cblx0QmxvY2tXcmFwKCkgeyByZXR1cm4gYmxvY2tXcmFwKHRoaXMsIHQwKHRoaXMuYmxvY2spKSB9LFxuXG5cdENhbGwoKSB7XG5cdFx0Y29uc3QgYW55U3BsYXQgPSB0aGlzLmFyZ3Muc29tZShhcmcgPT4gYXJnIGluc3RhbmNlb2YgU3BsYXQpXG5cdFx0aWYgKGFueVNwbGF0KSB7XG5cdFx0XHRjb25zdCBhcmdzID0gdGhpcy5hcmdzLm1hcChhcmcgPT5cblx0XHRcdFx0YXJnIGluc3RhbmNlb2YgU3BsYXQgP1xuXHRcdFx0XHRcdG1zQXJyKHQwKGFyZy5zcGxhdHRlZCkpIDpcblx0XHRcdFx0XHR0MChhcmcpKVxuXHRcdFx0cmV0dXJuIENhbGxFeHByZXNzaW9uKElkRnVuY3Rpb25BcHBseUNhbGwsIFtcblx0XHRcdFx0dDAodGhpcy5jYWxsZWQpLFxuXHRcdFx0XHRMaXROdWxsLFxuXHRcdFx0XHRDYWxsRXhwcmVzc2lvbihtZW1iZXIoTGl0RW1wdHlBcnJheSwgJ2NvbmNhdCcpLCBhcmdzKV0pXG5cdFx0fVxuXHRcdGVsc2UgcmV0dXJuIENhbGxFeHByZXNzaW9uKHQwKHRoaXMuY2FsbGVkKSwgdGhpcy5hcmdzLm1hcCh0MCkpXG5cdH0sXG5cblx0Q2FzZURvKCkge1xuXHRcdGNvbnN0IGJvZHkgPSBjYXNlQm9keSh0aGlzLnBhcnRzLCB0aGlzLm9wRWxzZSlcblx0XHRyZXR1cm4gaWZFbHNlKHRoaXMub3BDYXNlZCwgXyA9PiBCbG9ja1N0YXRlbWVudChbIHQwKF8pLCBib2R5IF0pLCAoKSA9PiBib2R5KVxuXHR9LFxuXG5cdENhc2VWYWwoKSB7XG5cdFx0Y29uc3QgYm9keSA9IGNhc2VCb2R5KHRoaXMucGFydHMsIHRoaXMub3BFbHNlKVxuXHRcdGNvbnN0IGJsb2NrID0gaWZFbHNlKHRoaXMub3BDYXNlZCwgXyA9PiBbIHQwKF8pLCBib2R5IF0sICgpID0+IFsgYm9keSBdKVxuXHRcdHJldHVybiBibG9ja1dyYXAodGhpcywgQmxvY2tTdGF0ZW1lbnQoYmxvY2spKVxuXHR9LFxuXG5cdENhc2VEb1BhcnQ6IGNhc2VQYXJ0LFxuXHRDYXNlVmFsUGFydDogY2FzZVBhcnQsXG5cdC8vIFRPRE86IGluY2x1ZGVJbm91dENoZWNrcyBpcyBtaXNuYW1lZFxuXHREZWJ1ZygpIHsgcmV0dXJuIGN4Lm9wdHMuaW5jbHVkZUlub3V0Q2hlY2tzKCkgPyB0TGluZXModGhpcy5saW5lcykgOiBbIF0gfSxcblxuXHRPYmpTaW1wbGUoKSB7XG5cdFx0cmV0dXJuIE9iamVjdEV4cHJlc3Npb24odGhpcy5wYWlycy5tYXAocGFpciA9PlxuXHRcdFx0cHJvcGVydHkoJ2luaXQnLCBwcm9wZXJ0eUlkT3JMaXRlcmFsQ2FjaGVkKHBhaXIua2V5KSwgdDAocGFpci52YWx1ZSkpKSlcblx0fSxcblxuXHRFbmRMb29wKCkgeyByZXR1cm4gQnJlYWtTdGF0ZW1lbnQobG9vcElkKHZyLmVuZExvb3BUb0xvb3AuZ2V0KHRoaXMpKSkgfSxcblxuXHRGdW4oKSB7XG5cdFx0Y29uc3Qgb2xkSW5HZW5lcmF0b3IgPSBpc0luR2VuZXJhdG9yXG5cdFx0aXNJbkdlbmVyYXRvciA9IHRoaXMuaXNHZW5lcmF0b3JcblxuXHRcdC8vIFRPRE86RVM2IHVzZSBgLi4uYGZcblx0XHRjb25zdCBuQXJncyA9IExpdGVyYWwodGhpcy5hcmdzLmxlbmd0aClcblx0XHRjb25zdCBvcERlY2xhcmVSZXN0ID0gb3BNYXAodGhpcy5vcFJlc3RBcmcsIHJlc3QgPT5cblx0XHRcdGRlY2xhcmUocmVzdCwgQ2FsbEV4cHJlc3Npb24oQXJyYXlTbGljZUNhbGwsIFtJZEFyZ3VtZW50cywgbkFyZ3NdKSkpXG5cdFx0Y29uc3QgYXJnQ2hlY2tzID1cblx0XHRcdG9wSWYoY3gub3B0cy5pbmNsdWRlVHlwZUNoZWNrcygpLCAoKSA9PlxuXHRcdFx0XHRmbGF0T3BNYXAodGhpcy5hcmdzLCBfID0+XG5cdFx0XHRcdFx0Ly8gVE9ETzogV2F5IHRvIHR5cGVjaGVjayBsYXppZXNcblx0XHRcdFx0XHRvcElmKCFfLmlzTGF6eSwgKCkgPT5cblx0XHRcdFx0XHRcdG9wTWFwKF8ub3BUeXBlLCB0eXBlID0+XG5cdFx0XHRcdFx0XHRcdEV4cHJlc3Npb25TdGF0ZW1lbnQobXNDaGVja0NvbnRhaW5zKFxuXHRcdFx0XHRcdFx0XHRcdHQwKHR5cGUpLFxuXHRcdFx0XHRcdFx0XHRcdGFjY2Vzc0xvY2FsRGVjbGFyZShfKSxcblx0XHRcdFx0XHRcdFx0XHRMaXRlcmFsKF8ubmFtZSkpKSkpKSlcblxuXHRcdGNvbnN0IF9pbiA9IG9wTWFwKHRoaXMub3BJbiwgdDApXG5cdFx0Y29uc3QgbGVhZCA9IGNhdChvcERlY2xhcmVSZXN0LCBhcmdDaGVja3MsIF9pbilcblxuXHRcdGNvbnN0IF9vdXQgPSBvcE1hcCh0aGlzLm9wT3V0LCB0MClcblx0XHRjb25zdCBib2R5ID0gdDModGhpcy5ibG9jaywgbGVhZCwgdGhpcy5vcFJlc0RlY2xhcmUsIF9vdXQpXG5cdFx0Y29uc3QgYXJncyA9IHRoaXMuYXJncy5tYXAodDApXG5cdFx0aXNJbkdlbmVyYXRvciA9IG9sZEluR2VuZXJhdG9yXG5cdFx0Y29uc3QgaWQgPSBvcE1hcCh0aGlzLm5hbWUsIGlkQ2FjaGVkKVxuXHRcdHJldHVybiBGdW5jdGlvbkV4cHJlc3Npb24oaWQsIGFyZ3MsIGJvZHksIHRoaXMuaXNHZW5lcmF0b3IpXG5cdH0sXG5cblx0TGF6eSgpIHsgcmV0dXJuIGxhenlXcmFwKHQwKHRoaXMudmFsdWUpKSB9LFxuXG5cdE51bWJlckxpdGVyYWwoKSB7XG5cdFx0Ly8gTmVnYXRpdmUgbnVtYmVycyBhcmUgbm90IHBhcnQgb2YgRVMgc3BlYy5cblx0XHQvLyBodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNS4xLyNzZWMtNy44LjNcblx0XHRjb25zdCBsaXQgPSBMaXRlcmFsKE1hdGguYWJzKHRoaXMudmFsdWUpKVxuXHRcdHJldHVybiBpc1Bvc2l0aXZlKHRoaXMudmFsdWUpID8gbGl0IDogdW5hcnlFeHByZXNzaW9uTmVnYXRlKGxpdClcblx0fSxcblxuXHRHbG9iYWxBY2Nlc3MoKSB7IHJldHVybiBJZGVudGlmaWVyKHRoaXMubmFtZSkgfSxcblxuXHRMb2NhbEFjY2VzcygpIHsgcmV0dXJuIGFjY2Vzc0xvY2FsRGVjbGFyZSh2ci5hY2Nlc3NUb0xvY2FsLmdldCh0aGlzKSkgfSxcblxuXHRMb2NhbERlY2xhcmUoKSB7IHJldHVybiBpZEZvckRlY2xhcmVDYWNoZWQodGhpcykgfSxcblxuXHQvLyBUT0RPOiBEb24ndCBhbHdheXMgbGFiZWwhXG5cdExvb3AoKSB7XG5cdFx0cmV0dXJuIExhYmVsZWRTdGF0ZW1lbnQobG9vcElkKHRoaXMpLCB3aGlsZVN0YXRlbWVudEluZmluaXRlKHQwKHRoaXMuYmxvY2spKSlcblx0fSxcblxuXHRNYXBFbnRyeSgpIHtcblx0XHRjb25zdCBpbmRleCA9IHZyLmxpc3RNYXBFbnRyeUluZGV4KHRoaXMpXG5cdFx0Y29uc3QgayA9IGBfayR7aW5kZXh9YFxuXHRcdGNvbnN0IHYgPSBgX3Yke2luZGV4fWBcblx0XHRyZXR1cm4gdmFyaWFibGVEZWNsYXJhdGlvbkNvbnN0KFtcblx0XHRcdFZhcmlhYmxlRGVjbGFyYXRvcihpZENhY2hlZChrKSwgdDAodGhpcy5rZXkpKSxcblx0XHRcdFZhcmlhYmxlRGVjbGFyYXRvcihpZENhY2hlZCh2KSwgdDAodGhpcy52YWwpKVxuXHRcdF0pXG5cdH0sXG5cblx0TWVtYmVyKCkgeyByZXR1cm4gbWVtYmVyKHQwKHRoaXMub2JqZWN0KSwgdGhpcy5uYW1lKSB9LFxuXG5cdE1vZHVsZSgpIHtcblx0XHRjb25zdCBib2R5ID0gY2F0KFxuXHRcdFx0dExpbmVzKHRoaXMubGluZXMpLFxuXHRcdFx0b3BNYXAodGhpcy5vcERlZmF1bHRFeHBvcnQsIF8gPT4gYXNzaWdubWVudEV4cHJlc3Npb25QbGFpbihFeHBvcnRzRGVmYXVsdCwgdDAoXykpKSlcblx0XHRyZXR1cm4gUHJvZ3JhbShjYXQoXG5cdFx0XHRvcElmKGN4Lm9wdHMuaW5jbHVkZVVzZVN0cmljdCgpLCAoKSA9PiBVc2VTdHJpY3QpLFxuXHRcdFx0b3BJZihjeC5vcHRzLmluY2x1ZGVBbWRlZmluZSgpLCAoKSA9PiBBbWRlZmluZUhlYWRlciksXG5cdFx0XHR0b1N0YXRlbWVudChhbWRXcmFwTW9kdWxlKHRoaXMuZG9Vc2VzLCB0aGlzLnVzZXMuY29uY2F0KHRoaXMuZGVidWdVc2VzKSwgYm9keSkpKSlcblx0fSxcblxuXHRRdW90ZSgpIHtcblx0XHQvLyBUT0RPOkVTNiB1c2UgdGVtcGxhdGUgc3RyaW5nc1xuXHRcdGNvbnN0IHBhcnQwID0gdGhpcy5wYXJ0c1swXVxuXHRcdGNvbnN0IFsgZmlyc3QsIHJlc3RQYXJ0cyBdID1cblx0XHRcdHR5cGVvZiBwYXJ0MCA9PT0gJ3N0cmluZycgP1xuXHRcdFx0XHRbIExpdGVyYWwocGFydDApLCB0YWlsKHRoaXMucGFydHMpIF0gOlxuXHRcdFx0XHRbIExpdEVtcHR5U3RyaW5nLCB0aGlzLnBhcnRzIF1cblx0XHRyZXR1cm4gcmVzdFBhcnRzLnJlZHVjZShcblx0XHRcdChleCwgXykgPT5cblx0XHRcdFx0YmluYXJ5RXhwcmVzc2lvblBsdXMoZXgsIHR5cGVvZiBfID09PSAnc3RyaW5nJyA/IExpdGVyYWwoXykgOiBtc1Nob3codDAoXykpKSxcblx0XHRcdGZpcnN0KVxuXHR9LFxuXG5cdFNwZWNpYWxEbygpIHtcblx0XHRzd2l0Y2ggKHRoaXMua2luZCkge1xuXHRcdFx0Y2FzZSBTRF9EZWJ1Z2dlcjogcmV0dXJuIERlYnVnZ2VyU3RhdGVtZW50KClcblx0XHRcdGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcih0aGlzLmtpbmQpXG5cdFx0fVxuXHR9LFxuXG5cdFNwZWNpYWxWYWwoKSB7XG5cdFx0Ly8gTWFrZSBuZXcgb2JqZWN0cyBiZWNhdXNlIHdlIHdpbGwgYXNzaWduIGBsb2NgIHRvIHRoZW0uXG5cdFx0c3dpdGNoICh0aGlzLmtpbmQpIHtcblx0XHRcdGNhc2UgU1ZfQ29udGFpbnM6IHJldHVybiBtZW1iZXIoSWRNcywgJ2NvbnRhaW5zJylcblx0XHRcdGNhc2UgU1ZfRmFsc2U6IHJldHVybiBMaXRlcmFsKGZhbHNlKVxuXHRcdFx0Y2FzZSBTVl9OdWxsOiByZXR1cm4gTGl0ZXJhbChudWxsKVxuXHRcdFx0Y2FzZSBTVl9TdWI6IHJldHVybiBtZW1iZXIoSWRNcywgJ3N1YicpXG5cdFx0XHRjYXNlIFNWX1RoaXM6IHJldHVybiBcdFRoaXNFeHByZXNzaW9uKClcblx0XHRcdGNhc2UgU1ZfVGhpc01vZHVsZURpcmVjdG9yeTogcmV0dXJuIElkZW50aWZpZXIoJ19fZGlybmFtZScpXG5cdFx0XHRjYXNlIFNWX1RydWU6IHJldHVybiBMaXRlcmFsKHRydWUpXG5cdFx0XHRjYXNlIFNWX1VuZGVmaW5lZDogcmV0dXJuIHVuYXJ5RXhwcmVzc2lvblZvaWQoTGl0WmVybylcblx0XHRcdGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcih0aGlzLmtpbmQpXG5cdFx0fVxuXHR9LFxuXG5cdFlpZWxkKCkgeyByZXR1cm4geWllbGRFeHByZXNzaW9uTm9EZWxlZ2F0ZSh0MCh0aGlzLnlpZWxkZWQpKSB9LFxuXG5cdFlpZWxkVG8oKSB7IHJldHVybiB5aWVsZEV4cHJlc3Npb25EZWxlZ2F0ZSh0MCh0aGlzLnlpZWxkZWRUbykpIH1cbn0pXG5cbmZ1bmN0aW9uIGNhc2VQYXJ0KGFsdGVybmF0ZSkge1xuXHRpZiAodGhpcy50ZXN0IGluc3RhbmNlb2YgUGF0dGVybikge1xuXHRcdGNvbnN0IHsgdHlwZSwgcGF0dGVybmVkLCBsb2NhbHMgfSA9IHRoaXMudGVzdFxuXHRcdGNvbnN0IGRlY2wgPSB2YXJpYWJsZURlY2xhcmF0aW9uQ29uc3QoW1xuXHRcdFx0VmFyaWFibGVEZWNsYXJhdG9yKElkRXh0cmFjdCwgbXNFeHRyYWN0KHQwKHR5cGUpLCB0MChwYXR0ZXJuZWQpKSkgXSlcblx0XHRjb25zdCB0ZXN0ID0gYmluYXJ5RXhwcmVzc2lvbk5vdEVxdWFsKElkRXh0cmFjdCwgTGl0TnVsbClcblx0XHRjb25zdCBleHRyYWN0ID0gdmFyaWFibGVEZWNsYXJhdGlvbkNvbnN0KGxvY2Fscy5tYXAoKF8sIGlkeCkgPT5cblx0XHRcdFZhcmlhYmxlRGVjbGFyYXRvcihpZEZvckRlY2xhcmVDYWNoZWQoXyksIG1lbWJlckV4cHJlc3Npb24oSWRFeHRyYWN0LCBMaXRlcmFsKGlkeCkpKSkpXG5cdFx0Y29uc3QgcmVzID0gdDEodGhpcy5yZXN1bHQsIGV4dHJhY3QpXG5cdFx0cmV0dXJuIEJsb2NrU3RhdGVtZW50KFsgZGVjbCwgSWZTdGF0ZW1lbnQodGVzdCwgcmVzLCBhbHRlcm5hdGUpIF0pXG5cdH0gZWxzZSB7XG5cdFx0Y29uc3QgY2hlY2tlZFRlc3QgPSBjeC5vcHRzLmluY2x1ZGVDYXNlQ2hlY2tzKCkgPyBtc0Jvb2wodDAodGhpcy50ZXN0KSkgOiB0MCh0aGlzLnRlc3QpXG5cdFx0Ly8gYWx0ZXJuYXRlIHdyaXR0ZW4gdG8gYnkgYGNhc2VCb2R5YC5cblx0XHRyZXR1cm4gSWZTdGF0ZW1lbnQoY2hlY2tlZFRlc3QsIHQwKHRoaXMucmVzdWx0KSwgYWx0ZXJuYXRlKVxuXHR9XG59XG5cbi8vIEZ1bmN0aW9ucyBzcGVjaWZpYyB0byBjZXJ0YWluIGV4cHJlc3Npb25zLlxuY29uc3Rcblx0YmxvY2tXcmFwID0gKF8sIGJsb2NrKSA9PiB7XG5cdFx0Y29uc3QgaW52b2tlID0gY2FsbEV4cHJlc3Npb25UaHVuayhmdW5jdGlvbkV4cHJlc3Npb25UaHVuayhibG9jaywgaXNJbkdlbmVyYXRvcikpXG5cdFx0cmV0dXJuIGlzSW5HZW5lcmF0b3IgPyB5aWVsZEV4cHJlc3Npb25EZWxlZ2F0ZShpbnZva2UpIDogaW52b2tlXG5cdH0sXG5cblx0Y2FzZUJvZHkgPSAocGFydHMsIG9wRWxzZSkgPT4ge1xuXHRcdGxldCBhY2MgPSBpZkVsc2Uob3BFbHNlLCB0MCwgKCkgPT4gdGhyb3dFcnJvcignTm8gYnJhbmNoIG9mIGBjYXNlYCBtYXRjaGVzLicpKVxuXHRcdGZvciAobGV0IGkgPSBwYXJ0cy5sZW5ndGggLSAxOyBpID49IDA7IGkgPSBpIC0gMSlcblx0XHRcdGFjYyA9IHQxKHBhcnRzW2ldLCBhY2MpXG5cdFx0cmV0dXJuIGFjY1xuXHR9LFxuXG5cdGxvb3BJZCA9IGxvb3AgPT4gaWRDYWNoZWQoYGxvb3Ake2xvb3AubG9jLnN0YXJ0LmxpbmV9YCksXG5cblx0dHJhbnNwaWxlQmxvY2sgPSAocmV0dXJuZWQsIGxpbmVzLCBsZWFkID0gbnVsbCwgb3BSZXNEZWNsYXJlID0gbnVsbCwgb3BPdXQgPSBudWxsKSA9PiB7XG5cdFx0Y29uc3QgZmluID0gaWZFbHNlKG9wUmVzRGVjbGFyZSxcblx0XHRcdHJkID0+IHtcblx0XHRcdFx0Y29uc3QgcmV0ID0gbWF5YmVXcmFwSW5DaGVja0NvbnRhaW5zKHJldHVybmVkLCByZC5vcFR5cGUsIHJkLm5hbWUpXG5cdFx0XHRcdHJldHVybiBpZkVsc2Uob3BPdXQsXG5cdFx0XHRcdFx0XyA9PiBjYXQoZGVjbGFyZShyZCwgcmV0KSwgXywgUmV0dXJuUmVzKSxcblx0XHRcdFx0XHQoKSA9PiBSZXR1cm5TdGF0ZW1lbnQocmV0KSlcblx0XHRcdH0sXG5cdFx0XHQoKSA9PiBjYXQob3BPdXQsIFJldHVyblN0YXRlbWVudChyZXR1cm5lZCkpKVxuXHRcdHJldHVybiBCbG9ja1N0YXRlbWVudChjYXQobGVhZCwgdExpbmVzKGxpbmVzKSwgZmluKSlcblx0fVxuXG4vLyBNb2R1bGUgaGVscGVyc1xuY29uc3Rcblx0YW1kV3JhcE1vZHVsZSA9IChkb1VzZXMsIG90aGVyVXNlcywgYm9keSkgPT4ge1xuXHRcdGNvbnN0IGFsbFVzZXMgPSBkb1VzZXMuY29uY2F0KG90aGVyVXNlcylcblx0XHRjb25zdCB1c2VQYXRocyA9IEFycmF5RXhwcmVzc2lvbihjYXQoXG5cdFx0XHRMaXRTdHJFeHBvcnRzLFxuXHRcdFx0YWxsVXNlcy5tYXAoXyA9PiBMaXRlcmFsKG1hbmdsZVBhdGgoXy5wYXRoKSkpKSlcblx0XHRjb25zdCB1c2VJZGVudGlmaWVycyA9IGFsbFVzZXMubWFwKChfLCBpKSA9PiBpZENhY2hlZChgJHtwYXRoQmFzZU5hbWUoXy5wYXRoKX1fJHtpfWApKVxuXHRcdGNvbnN0IHVzZUFyZ3MgPSBjYXQoSWRFeHBvcnRzLCB1c2VJZGVudGlmaWVycylcblx0XHRjb25zdCB1c2VEb3MgPSBkb1VzZXMubWFwKCh1c2UsIGkpID0+XG5cdFx0XHRsb2MoRXhwcmVzc2lvblN0YXRlbWVudChtc0dldE1vZHVsZSh1c2VJZGVudGlmaWVyc1tpXSkpLCB1c2UubG9jKSlcblx0XHRjb25zdCBvcFVzZURlY2xhcmUgPSBvcElmKCFpc0VtcHR5KG90aGVyVXNlcyksXG5cdFx0XHQoKSA9PiBWYXJpYWJsZURlY2xhcmF0aW9uKCdjb25zdCcsIGZsYXRNYXAob3RoZXJVc2VzLCAodXNlLCBpKSA9PlxuXHRcdFx0XHR1c2VEZWNsYXJhdG9ycyh1c2UsIHVzZUlkZW50aWZpZXJzW2kgKyBkb1VzZXMubGVuZ3RoXSkpKSlcblx0XHRjb25zdCBmdWxsQm9keSA9IEJsb2NrU3RhdGVtZW50KGNhdCh1c2VEb3MsIG9wVXNlRGVjbGFyZSwgYm9keSwgUmV0dXJuRXhwb3J0cykpXG5cdFx0Y29uc3QgbGF6eUJvZHkgPVxuXHRcdFx0Y3gub3B0cy5sYXp5TW9kdWxlKCkgP1xuXHRcdFx0XHRCbG9ja1N0YXRlbWVudChbIEV4cHJlc3Npb25TdGF0ZW1lbnQoXG5cdFx0XHRcdFx0YXNzaWdubWVudEV4cHJlc3Npb25QbGFpbihFeHBvcnRzR2V0LFxuXHRcdFx0XHRcdFx0bXNMYXp5KGZ1bmN0aW9uRXhwcmVzc2lvblRodW5rKGZ1bGxCb2R5KSkpKSBdKSA6XG5cdFx0XHRcdGZ1bGxCb2R5XG5cdFx0cmV0dXJuIENhbGxFeHByZXNzaW9uKElkRGVmaW5lLCBbIHVzZVBhdGhzLCBmdW5jdGlvbkV4cHJlc3Npb25QbGFpbih1c2VBcmdzLCBsYXp5Qm9keSkgXSlcblx0fSxcblxuXHRwYXRoQmFzZU5hbWUgPSBwYXRoID0+XG5cdFx0cGF0aC5zdWJzdHIocGF0aC5sYXN0SW5kZXhPZignLycpICsgMSksXG5cblx0dXNlRGVjbGFyYXRvcnMgPSAodXNlLCBtb2R1bGVJZGVudGlmaWVyKSA9PiB7XG5cdFx0Ly8gVE9ETzogQ291bGQgYmUgbmVhdGVyIGFib3V0IHRoaXNcblx0XHRjb25zdCBpc0xhenkgPSAoaXNFbXB0eSh1c2UudXNlZCkgPyB1c2Uub3BVc2VEZWZhdWx0IDogdXNlLnVzZWRbMF0pLmlzTGF6eVxuXHRcdGNvbnN0IHZhbHVlID0gKGlzTGF6eSA/IG1zTGF6eUdldE1vZHVsZSA6IG1zR2V0TW9kdWxlKShtb2R1bGVJZGVudGlmaWVyKVxuXG5cdFx0Y29uc3QgdXNlZERlZmF1bHQgPSBvcE1hcCh1c2Uub3BVc2VEZWZhdWx0LCBkZWYgPT4ge1xuXHRcdFx0Y29uc3QgZGVmZXhwID0gbXNHZXREZWZhdWx0RXhwb3J0KG1vZHVsZUlkZW50aWZpZXIpXG5cdFx0XHRjb25zdCB2YWwgPSBpc0xhenkgPyBsYXp5V3JhcChkZWZleHApIDogZGVmZXhwXG5cdFx0XHRyZXR1cm4gbG9jKFZhcmlhYmxlRGVjbGFyYXRvcihpZEZvckRlY2xhcmVDYWNoZWQoZGVmKSwgdmFsKSwgZGVmLmxvYylcblx0XHR9KVxuXG5cdFx0Y29uc3QgdXNlZERlc3RydWN0ID0gaXNFbXB0eSh1c2UudXNlZCkgPyBudWxsIDpcblx0XHRcdG1ha2VEZXN0cnVjdHVyZURlY2xhcmF0b3JzKHVzZS51c2VkLCBpc0xhenksIHZhbHVlLCB0cnVlLCBmYWxzZSlcblxuXHRcdHJldHVybiBjYXQodXNlZERlZmF1bHQsIHVzZWREZXN0cnVjdClcblx0fVxuXG4vLyBHZW5lcmFsIHV0aWxzLiBOb3QgaW4gdXRpbC5qcyBiZWNhdXNlIHRoZXNlIGNsb3NlIG92ZXIgY3guXG5jb25zdFxuXHRtYWtlRGVzdHJ1Y3R1cmVEZWNsYXJhdG9ycyA9IChhc3NpZ25lZXMsIGlzTGF6eSwgdmFsdWUsIGlzTW9kdWxlLCBpc0V4cG9ydCkgPT4ge1xuXHRcdGNvbnN0IGRlc3RydWN0dXJlZE5hbWUgPSBgXyQke2Fzc2lnbmVlc1swXS5sb2Muc3RhcnQubGluZX1gXG5cdFx0Y29uc3QgaWREZXN0cnVjdHVyZWQgPSBJZGVudGlmaWVyKGRlc3RydWN0dXJlZE5hbWUpXG5cdFx0Y29uc3QgZGVjbGFyYXRvcnMgPSBhc3NpZ25lZXMubWFwKGFzc2lnbmVlID0+IHtcblx0XHRcdC8vIFRPRE86IERvbid0IGNvbXBpbGUgaXQgaWYgaXQncyBuZXZlciBhY2Nlc3NlZFxuXHRcdFx0Y29uc3QgZ2V0ID0gZ2V0TWVtYmVyKGlkRGVzdHJ1Y3R1cmVkLCBhc3NpZ25lZS5uYW1lLCBpc0xhenksIGlzTW9kdWxlKVxuXHRcdFx0cmV0dXJuIG1ha2VEZWNsYXJhdG9yKGFzc2lnbmVlLCBnZXQsIGlzTGF6eSwgaXNFeHBvcnQpXG5cdFx0fSlcblx0XHQvLyBHZXR0aW5nIGxhenkgbW9kdWxlIGlzIGRvbmUgYnkgbXMubGF6eUdldE1vZHVsZS5cblx0XHRjb25zdCB2YWwgPSAoaXNMYXp5ICYmICFpc01vZHVsZSkgPyBsYXp5V3JhcCh2YWx1ZSkgOiB2YWx1ZVxuXHRcdHJldHVybiB1bnNoaWZ0KFZhcmlhYmxlRGVjbGFyYXRvcihpZERlc3RydWN0dXJlZCwgdmFsKSwgZGVjbGFyYXRvcnMpXG5cdH0sXG5cblx0bWFrZURlY2xhcmF0b3IgPSAoYXNzaWduZWUsIHZhbHVlLCB2YWx1ZUlzQWxyZWFkeUxhenksIGlzRXhwb3J0KSA9PiB7XG5cdFx0Y29uc3QgeyBpc0xhenksIGxvYywgbmFtZSwgb3BUeXBlIH0gPSBhc3NpZ25lZVxuXHRcdC8vIFRPRE86IGFzc2VydChhc3NpZ25lZS5vcFR5cGUgPT09IG51bGwpXG5cdFx0Ly8gb3IgVE9ETzogQWxsb3cgdHlwZSBjaGVjayBvbiBsYXp5IHZhbHVlP1xuXHRcdHZhbHVlID0gaXNMYXp5ID8gdmFsdWUgOiBtYXliZVdyYXBJbkNoZWNrQ29udGFpbnModmFsdWUsIG9wVHlwZSwgbmFtZSlcblx0XHRpZiAoaXNFeHBvcnQpIHtcblx0XHRcdC8vIFRPRE86RVM2XG5cdFx0XHRjeC5jaGVjayghaXNMYXp5LCBsb2MsICdMYXp5IGV4cG9ydCBub3Qgc3VwcG9ydGVkLicpXG5cdFx0XHRyZXR1cm4gVmFyaWFibGVEZWNsYXJhdG9yKFxuXHRcdFx0XHRpZEZvckRlY2xhcmVDYWNoZWQoYXNzaWduZWUpLFxuXHRcdFx0XHRhc3NpZ25tZW50RXhwcmVzc2lvblBsYWluKG1lbWJlcihJZEV4cG9ydHMsIG5hbWUpLCB2YWx1ZSkpXG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IHZhbCA9IGlzTGF6eSAmJiAhdmFsdWVJc0FscmVhZHlMYXp5ID8gbGF6eVdyYXAodmFsdWUpIDogdmFsdWVcblx0XHRcdGFzc2VydChpc0xhenkgfHwgIXZhbHVlSXNBbHJlYWR5TGF6eSlcblx0XHRcdHJldHVybiBWYXJpYWJsZURlY2xhcmF0b3IoaWRGb3JEZWNsYXJlQ2FjaGVkKGFzc2lnbmVlKSwgdmFsKVxuXHRcdH1cblx0fSxcblxuXHRtYXliZVdyYXBJbkNoZWNrQ29udGFpbnMgPSAoYXN0LCBvcFR5cGUsIG5hbWUpID0+XG5cdFx0KGN4Lm9wdHMuaW5jbHVkZVR5cGVDaGVja3MoKSAmJiBvcFR5cGUgIT09IG51bGwpID9cblx0XHRcdG1zQ2hlY2tDb250YWlucyh0MChvcFR5cGUpLCBhc3QsIExpdGVyYWwobmFtZSkpIDpcblx0XHRcdGFzdCxcblxuXHRnZXRNZW1iZXIgPSAoYXN0T2JqZWN0LCBnb3ROYW1lLCBpc0xhenksIGlzTW9kdWxlKSA9PlxuXHRcdGlzTGF6eSA/XG5cdFx0bXNMYXp5R2V0KGFzdE9iamVjdCwgTGl0ZXJhbChnb3ROYW1lKSkgOlxuXHRcdGlzTW9kdWxlICYmIGN4Lm9wdHMuaW5jbHVkZVVzZUNoZWNrcygpID9cblx0XHRtc0dldChhc3RPYmplY3QsIExpdGVyYWwoZ290TmFtZSkpIDpcblx0XHRtZW1iZXIoYXN0T2JqZWN0LCBnb3ROYW1lKVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=