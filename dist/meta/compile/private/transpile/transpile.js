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
			return (0, _esastDistAst.VariableDeclaration)(this.assignee.isMutable() ? 'let' : 'const', [makeDeclarator(this.assignee, t0(this.value), false, vr.isExportAssign(this))]);
		},
		// TODO:ES6 Just use native destructuring assign
		AssignDestructure: function () {
			return (0, _esastDistAst.VariableDeclaration)(this.kind() === _Expression.LD_Mutable ? 'let' : 'const', makeDestructureDeclarators(this.assignees, this.kind() === _Expression.LD_Lazy, t0(this.value), false, vr.isExportAssign(this)));
		},

		AssignMutate: function () {
			return (0, _esastDistSpecialize.assignmentExpressionPlain)((0, _esastDistUtil.idCached)(this.name), t0(this.value));
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
		const loc = assignee.loc;
		const name = assignee.name;
		const opType = assignee.opType;

		const isLazy = assignee.isLazy();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS90cmFuc3BpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2tCQTRCd0IsU0FBUzs7Ozs7Ozs7OztBQUZqQyxLQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsYUFBYSxDQUFBOztBQUVWLFVBQVMsU0FBUyxDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRSxHQUFHLEVBQUU7QUFDN0QsSUFBRSxHQUFHLEdBQUcsQ0FBQTtBQUNSLElBQUUsR0FBRyxHQUFHLENBQUE7QUFDUixlQUFhLEdBQUcsS0FBSyxDQUFBO0FBQ3JCLFFBQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBOztBQUVoQyxJQUFFLEdBQUcsRUFBRSxHQUFHLFNBQVMsQ0FBQTtBQUNuQixTQUFPLEdBQUcsQ0FBQTtFQUNWOztBQUVELE9BQ0MsRUFBRSxHQUFHLFVBQUEsSUFBSTtTQUFJLG1CQW5DSyxHQUFHLEVBbUNKLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUM7RUFBQTtPQUNuRCxFQUFFLEdBQUcsVUFBQyxJQUFJLEVBQUUsR0FBRztTQUFLLG1CQXBDRixHQUFHLEVBb0NHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDO0VBQUE7T0FDN0QsRUFBRSxHQUFHLFVBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSTtTQUFLLG1CQXJDZCxHQUFHLEVBcUNlLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUM7RUFBQTtPQUNyRixNQUFNLEdBQUcsVUFBQSxLQUFLLEVBQUk7QUFDakIsUUFBTSxHQUFHLEdBQUcsRUFBRyxDQUFBO0FBQ2YsT0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUksRUFBSTtBQUNyQixTQUFN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O0VBQUE7T0FFTCxTQUFTLEdBQUcsVUFBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRO1NBQ2hELE1BQU0sR0FDTixZQXpZb0IsU0FBUyxFQXlZbkIsU0FBUyxFQUFFLGtCQTVaOEQsT0FBTyxFQTRaN0QsT0FBTyxDQUFDLENBQUMsR0FDdEMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsR0FDdEMsWUE1WWtFLEtBQUssRUE0WWpFLFNBQVMsRUFBRSxrQkE5WmtFLE9BQU8sRUE4WmpFLE9BQU8sQ0FBQyxDQUFDLEdBQ2xDLG1CQTVac0IsTUFBTSxFQTRackIsU0FBUyxFQUFFLE9BQU8sQ0FBQztFQUFBLENBQUEiLCJmaWxlIjoibWV0YS9jb21waWxlL3ByaXZhdGUvdHJhbnNwaWxlL3RyYW5zcGlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFycmF5RXhwcmVzc2lvbiwgQmxvY2tTdGF0ZW1lbnQsIEJyZWFrU3RhdGVtZW50LCBDYWxsRXhwcmVzc2lvbiwgRGVidWdnZXJTdGF0ZW1lbnQsXG5cdEV4cHJlc3Npb25TdGF0ZW1lbnQsIEZ1bmN0aW9uRXhwcmVzc2lvbiwgSWRlbnRpZmllciwgSWZTdGF0ZW1lbnQsIExhYmVsZWRTdGF0ZW1lbnQsIExpdGVyYWwsXG5cdE9iamVjdEV4cHJlc3Npb24sIFByb2dyYW0sIFJldHVyblN0YXRlbWVudCwgVGhpc0V4cHJlc3Npb24sIFZhcmlhYmxlRGVjbGFyYXRpb24sXG5cdFZhcmlhYmxlRGVjbGFyYXRvciwgUmV0dXJuU3RhdGVtZW50IH0gZnJvbSAnZXNhc3QvZGlzdC9hc3QnXG5pbXBvcnQgeyBpZENhY2hlZCwgbG9jLCBtZW1iZXIsIHByb3BlcnR5SWRPckxpdGVyYWxDYWNoZWQsIHRodW5rLCB0b1N0YXRlbWVudFxuXHR9IGZyb20gJ2VzYXN0L2Rpc3QvdXRpbCdcbmltcG9ydCB7IGFzc2lnbm1lbnRFeHByZXNzaW9uUGxhaW4sIGNhbGxFeHByZXNzaW9uVGh1bmssIGZ1bmN0aW9uRXhwcmVzc2lvblBsYWluLFxuXHRmdW5jdGlvbkV4cHJlc3Npb25UaHVuaywgbWVtYmVyRXhwcmVzc2lvbiwgcHJvcGVydHksIHZhcmlhYmxlRGVjbGFyYXRpb25Db25zdCxcblx0eWllbGRFeHByZXNzaW9uRGVsZWdhdGUsIHlpZWxkRXhwcmVzc2lvbk5vRGVsZWdhdGUgfSBmcm9tICdlc2FzdC9kaXN0L3NwZWNpYWxpemUnXG5pbXBvcnQgKiBhcyBFRXhwb3J0cyBmcm9tICcuLi8uLi9FeHByZXNzaW9uJ1xuaW1wb3J0IHsgTERfTGF6eSwgTERfTXV0YWJsZSwgUGF0dGVybiwgU3BsYXQsIFNEX0RlYnVnZ2VyLCBTVl9Db250YWlucywgU1ZfRmFsc2UsIFNWX051bGwsIFNWX1N1Yixcblx0U1ZfVGhpcywgU1ZfVGhpc01vZHVsZURpcmVjdG9yeSwgU1ZfVHJ1ZSwgU1ZfVW5kZWZpbmVkIH0gZnJvbSAnLi4vLi4vRXhwcmVzc2lvbidcbmltcG9ydCBtYW5nbGVQYXRoIGZyb20gJy4uL21hbmdsZVBhdGgnXG5pbXBvcnQgeyBhc3NlcnQsIGNhdCwgZmxhdE1hcCwgZmxhdE9wTWFwLCBpZkVsc2UsIGlzRW1wdHksXG5cdGltcGxlbWVudE1hbnksIGlzUG9zaXRpdmUsIG9wSWYsIG9wTWFwLCByYW5nZSwgdGFpbCwgdW5zaGlmdCB9IGZyb20gJy4uL3V0aWwnXG5pbXBvcnQgeyBBbWRlZmluZUhlYWRlciwgQXJyYXlTbGljZUNhbGwsIEV4cG9ydHNEZWZhdWx0LCBFeHBvcnRzR2V0LCBJZEFyZ3VtZW50cywgSWREZWZpbmUsXG5cdElkRXhwb3J0cywgSWRFeHRyYWN0LCBJZEZ1bmN0aW9uQXBwbHlDYWxsLCBJZE5hbWUsIExpdEVtcHR5QXJyYXksIExpdEVtcHR5U3RyaW5nLCBMaXROdWxsLFxuXHRMaXRTdHJFeHBvcnRzLCBMaXRTdHJOYW1lLCBMaXRaZXJvLCBSZXR1cm5FeHBvcnRzLCBSZXR1cm5SZXMsIFVzZVN0cmljdFxuXHR9IGZyb20gJy4vYXN0LWNvbnN0YW50cydcbmltcG9ydCB7IElkTXMsIGxhenlXcmFwLCBtc0FyciwgbXNCb29sLCBtc0NoZWNrQ29udGFpbnMsIG1zRXh0cmFjdCwgbXNHZXQsIG1zR2V0RGVmYXVsdEV4cG9ydCxcblx0bXNHZXRNb2R1bGUsIG1zTGF6eSwgbXNMYXp5R2V0LCBtc0xhenlHZXRNb2R1bGUsIG1zTHNldCwgbXNNYXAsIG1zU2V0LCBtc1Nob3dcblx0fSBmcm9tICcuL21zLWNhbGwnXG5pbXBvcnQgeyBhY2Nlc3NMb2NhbERlY2xhcmUsIGJpbmFyeUV4cHJlc3Npb25Ob3RFcXVhbCwgYmluYXJ5RXhwcmVzc2lvblBsdXMsIGRlY2xhcmUsXG5cdGRlY2xhcmVTcGVjaWFsLCBpZEZvckRlY2xhcmVDYWNoZWQsIHRocm93RXJyb3IsIHVuYXJ5RXhwcmVzc2lvbk5lZ2F0ZSwgdW5hcnlFeHByZXNzaW9uVm9pZCxcblx0d2hpbGVTdGF0ZW1lbnRJbmZpbml0ZSB9IGZyb20gJy4vdXRpbCdcblxubGV0IGN4LCB2ciwgaXNJbkdlbmVyYXRvclxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cmFuc3BpbGUoX2N4LCBtb2R1bGVFeHByZXNzaW9uLCBfdnIpIHtcblx0Y3ggPSBfY3hcblx0dnIgPSBfdnJcblx0aXNJbkdlbmVyYXRvciA9IGZhbHNlXG5cdGNvbnN0IHJlcyA9IHQwKG1vZHVsZUV4cHJlc3Npb24pXG5cdC8vIFJlbGVhc2UgZm9yIGdhcmJhZ2UgY29sbGVjdGlvblxuXHRjeCA9IHZyID0gdW5kZWZpbmVkXG5cdHJldHVybiByZXNcbn1cblxuY29uc3Rcblx0dDAgPSBleHByID0+IGxvYyhleHByLnRyYW5zcGlsZVN1YnRyZWUoKSwgZXhwci5sb2MpLFxuXHR0MSA9IChleHByLCBhcmcpID0+IGxvYyhleHByLnRyYW5zcGlsZVN1YnRyZWUoYXJnKSwgZXhwci5sb2MpLFxuXHR0MyA9IChleHByLCBhcmcsIGFyZzIsIGFyZzMpID0+IGxvYyhleHByLnRyYW5zcGlsZVN1YnRyZWUoYXJnLCBhcmcyLCBhcmczKSwgZXhwci5sb2MpLFxuXHR0TGluZXMgPSBleHBycyA9PiB7XG5cdFx0Y29uc3Qgb3V0ID0gWyBdXG5cdFx0ZXhwcnMuZm9yRWFjaChleHByID0+IHtcblx0XHRcdGNvbnN0IGFzdCA9IGV4cHIudHJhbnNwaWxlU3VidHJlZSgpXG5cdFx0XHRpZiAoYXN0IGluc3RhbmNlb2YgQXJyYXkpXG5cdFx0XHRcdC8vIERlYnVnIG1heSBwcm9kdWNlIG11bHRpcGxlIHN0YXRlbWVudHMuXG5cdFx0XHRcdGFzdC5mb3JFYWNoKF8gPT4gb3V0LnB1c2godG9TdGF0ZW1lbnQoXykpKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRvdXQucHVzaChsb2ModG9TdGF0ZW1lbnQoYXN0KSwgZXhwci5sb2MpKVxuXHRcdH0pXG5cdFx0cmV0dXJuIG91dFxuXHR9XG5cbmltcGxlbWVudE1hbnkoRUV4cG9ydHMsICd0cmFuc3BpbGVTdWJ0cmVlJywge1xuXHRBc3NpZ24oKSB7XG5cdFx0cmV0dXJuIFZhcmlhYmxlRGVjbGFyYXRpb24oXG5cdFx0XHR0aGlzLmFzc2lnbmVlLmlzTXV0YWJsZSgpID8gJ2xldCcgOiAnY29uc3QnLFxuXHRcdFx0WyBtYWtlRGVjbGFyYXRvcih0aGlzLmFzc2lnbmVlLCB0MCh0aGlzLnZhbHVlKSwgZmFsc2UsIHZyLmlzRXhwb3J0QXNzaWduKHRoaXMpKSBdKVxuXHR9LFxuXHQvLyBUT0RPOkVTNiBKdXN0IHVzZSBuYXRpdmUgZGVzdHJ1Y3R1cmluZyBhc3NpZ25cblx0QXNzaWduRGVzdHJ1Y3R1cmUoKSB7XG5cdFx0cmV0dXJuIFZhcmlhYmxlRGVjbGFyYXRpb24odGhpcy5raW5kKCkgPT09IExEX011dGFibGUgPyAnbGV0JyA6ICdjb25zdCcsXG5cdFx0XHRtYWtlRGVzdHJ1Y3R1cmVEZWNsYXJhdG9ycyhcblx0XHRcdFx0dGhpcy5hc3NpZ25lZXMsXG5cdFx0XHRcdHRoaXMua2luZCgpID09PSBMRF9MYXp5LFxuXHRcdFx0XHR0MCh0aGlzLnZhbHVlKSxcblx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRcdHZyLmlzRXhwb3J0QXNzaWduKHRoaXMpKSlcblx0fSxcblxuXHRBc3NpZ25NdXRhdGUoKSB7XG5cdFx0cmV0dXJuIGFzc2lnbm1lbnRFeHByZXNzaW9uUGxhaW4oaWRDYWNoZWQodGhpcy5uYW1lKSwgdDAodGhpcy52YWx1ZSkpXG5cdH0sXG5cblx0QmFnRW50cnkoKSB7IHJldHVybiBkZWNsYXJlU3BlY2lhbChgXyR7dnIubGlzdE1hcEVudHJ5SW5kZXgodGhpcyl9YCwgdDAodGhpcy52YWx1ZSkpIH0sXG5cblx0QmFnU2ltcGxlKCkgeyByZXR1cm4gQXJyYXlFeHByZXNzaW9uKHRoaXMucGFydHMubWFwKHQwKSkgfSxcblxuXHRCbG9ja0RvKGxlYWQgPSBudWxsLCBvcFJlc0RlY2xhcmUgPSBudWxsLCBvcE91dCA9IG51bGwpIHtcblx0XHRhc3NlcnQob3BSZXNEZWNsYXJlID09PSBudWxsKVxuXHRcdHJldHVybiBCbG9ja1N0YXRlbWVudChjYXQobGVhZCwgdExpbmVzKHRoaXMubGluZXMpLCBvcE91dCkpXG5cdH0sXG5cblx0QmxvY2tXaXRoUmV0dXJuKGxlYWQsIG9wUmVzRGVjbGFyZSwgb3BPdXQpIHtcblx0XHRyZXR1cm4gdHJhbnNwaWxlQmxvY2sodDAodGhpcy5yZXR1cm5lZCksIHRoaXMubGluZXMsIGxlYWQsIG9wUmVzRGVjbGFyZSwgb3BPdXQpXG5cdH0sXG5cblx0QmxvY2tPYmoobGVhZCwgb3BSZXNEZWNsYXJlLCBvcE91dCkge1xuXHRcdC8vIFRPRE86IGluY2x1ZGVUeXBlQ2hlY2tzKCkgaXMgbm90IHRoZSByaWdodCBtZXRob2QgZm9yIHRoaXNcblx0XHRjb25zdCBrZXlzID1cblx0XHRcdGN4Lm9wdHMuaW5jbHVkZVR5cGVDaGVja3MoKSA/IHRoaXMua2V5cyA6IHRoaXMua2V5cy5maWx0ZXIoXyA9PiAhdnIuaXNEZWJ1Z0xvY2FsKF8pKVxuXHRcdGNvbnN0IHJldCA9IGlmRWxzZSh0aGlzLm9wT2JqZWQsXG5cdFx0XHRfID0+IHtcblx0XHRcdFx0Y29uc3Qgb2JqZWQgPSB0MChfKVxuXHRcdFx0XHRjb25zdCBrZXlzVmFscyA9IGNhdChcblx0XHRcdFx0XHRmbGF0TWFwKGtleXMsIGtleSA9PiBbIExpdGVyYWwoa2V5Lm5hbWUpLCBhY2Nlc3NMb2NhbERlY2xhcmUoa2V5KSBdKSxcblx0XHRcdFx0XHRvcE1hcCh0aGlzLm9wTmFtZSwgXyA9PiBbIExpdFN0ck5hbWUsIExpdGVyYWwoXykgXSkpXG5cdFx0XHRcdGNvbnN0IGFueUxhenkgPSBrZXlzLnNvbWUoXyA9PiBfLmlzTGF6eSgpKVxuXHRcdFx0XHRyZXR1cm4gKGFueUxhenkgPyBtc0xzZXQgOiBtc1NldCkob2JqZWQsIC4uLmtleXNWYWxzKVxuXHRcdFx0fSxcblx0XHRcdCgpID0+IHtcblx0XHRcdFx0Y29uc3QgcHJvcHMgPSBrZXlzLm1hcChrZXkgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IHZhbCA9IGFjY2Vzc0xvY2FsRGVjbGFyZShrZXkpXG5cdFx0XHRcdFx0Y29uc3QgaWQgPSBwcm9wZXJ0eUlkT3JMaXRlcmFsQ2FjaGVkKGtleS5uYW1lKVxuXHRcdFx0XHRcdHJldHVybiBrZXkuaXNMYXp5KCkgP1xuXHRcdFx0XHRcdFx0cHJvcGVydHkoJ2dldCcsIGlkLCB0aHVuayh2YWwpKSA6XG5cdFx0XHRcdFx0XHRwcm9wZXJ0eSgnaW5pdCcsIGlkLCB2YWwpXG5cdFx0XHRcdH0pXG5cdFx0XHRcdGNvbnN0IG9wUHJvcE5hbWUgPSBvcE1hcCh0aGlzLm9wTmFtZSwgXyA9PiBwcm9wZXJ0eSgnaW5pdCcsIElkTmFtZSwgTGl0ZXJhbChfKSkpXG5cdFx0XHRcdHJldHVybiBPYmplY3RFeHByZXNzaW9uKGNhdChwcm9wcywgb3BQcm9wTmFtZSkpXG5cdFx0XHR9KVxuXHRcdHJldHVybiB0cmFuc3BpbGVCbG9jayhyZXQsIHRoaXMubGluZXMsIGxlYWQsIG9wUmVzRGVjbGFyZSwgb3BPdXQpXG5cdH0sXG5cblx0QmxvY2tCYWcobGVhZCwgb3BSZXNEZWNsYXJlLCBvcE91dCkge1xuXHRcdGNvbnN0IGxlbmd0aCA9IHZyLmxpc3RNYXBMZW5ndGgodGhpcylcblx0XHRyZXR1cm4gdHJhbnNwaWxlQmxvY2soXG5cdFx0XHRBcnJheUV4cHJlc3Npb24ocmFuZ2UobGVuZ3RoKS5tYXAoaSA9PiBpZENhY2hlZChgXyR7aX1gKSkpLFxuXHRcdFx0dGhpcy5saW5lcywgbGVhZCwgb3BSZXNEZWNsYXJlLCBvcE91dClcblx0fSxcblxuXHRCbG9ja01hcChsZWFkLCBvcFJlc0RlY2xhcmUsIG9wT3V0KSB7XG5cdFx0Y29uc3QgbGVuZ3RoID0gdnIubGlzdE1hcExlbmd0aCh0aGlzKVxuXHRcdHJldHVybiB0cmFuc3BpbGVCbG9jayhcblx0XHRcdG1zTWFwKC4uLmZsYXRNYXAocmFuZ2UobGVuZ3RoKSwgaSA9PlxuXHRcdFx0XHRbIGlkQ2FjaGVkKGBfayR7aX1gKSwgaWRDYWNoZWQoYF92JHtpfWApIF0pKSxcblx0XHRcdHRoaXMubGluZXMsIGxlYWQsIG9wUmVzRGVjbGFyZSwgb3BPdXQpXG5cdH0sXG5cblx0QmxvY2tXcmFwKCkgeyByZXR1cm4gYmxvY2tXcmFwKHRoaXMsIHQwKHRoaXMuYmxvY2spKSB9LFxuXG5cdENhbGwoKSB7XG5cdFx0Y29uc3QgYW55U3BsYXQgPSB0aGlzLmFyZ3Muc29tZShhcmcgPT4gYXJnIGluc3RhbmNlb2YgU3BsYXQpXG5cdFx0aWYgKGFueVNwbGF0KSB7XG5cdFx0XHRjb25zdCBhcmdzID0gdGhpcy5hcmdzLm1hcChhcmcgPT5cblx0XHRcdFx0YXJnIGluc3RhbmNlb2YgU3BsYXQgP1xuXHRcdFx0XHRcdG1zQXJyKHQwKGFyZy5zcGxhdHRlZCkpIDpcblx0XHRcdFx0XHR0MChhcmcpKVxuXHRcdFx0cmV0dXJuIENhbGxFeHByZXNzaW9uKElkRnVuY3Rpb25BcHBseUNhbGwsIFtcblx0XHRcdFx0dDAodGhpcy5jYWxsZWQpLFxuXHRcdFx0XHRMaXROdWxsLFxuXHRcdFx0XHRDYWxsRXhwcmVzc2lvbihtZW1iZXIoTGl0RW1wdHlBcnJheSwgJ2NvbmNhdCcpLCBhcmdzKV0pXG5cdFx0fVxuXHRcdGVsc2UgcmV0dXJuIENhbGxFeHByZXNzaW9uKHQwKHRoaXMuY2FsbGVkKSwgdGhpcy5hcmdzLm1hcCh0MCkpXG5cdH0sXG5cblx0Q2FzZURvKCkge1xuXHRcdGNvbnN0IGJvZHkgPSBjYXNlQm9keSh0aGlzLnBhcnRzLCB0aGlzLm9wRWxzZSlcblx0XHRyZXR1cm4gaWZFbHNlKHRoaXMub3BDYXNlZCwgXyA9PiBCbG9ja1N0YXRlbWVudChbIHQwKF8pLCBib2R5IF0pLCAoKSA9PiBib2R5KVxuXHR9LFxuXG5cdENhc2VWYWwoKSB7XG5cdFx0Y29uc3QgYm9keSA9IGNhc2VCb2R5KHRoaXMucGFydHMsIHRoaXMub3BFbHNlKVxuXHRcdGNvbnN0IGJsb2NrID0gaWZFbHNlKHRoaXMub3BDYXNlZCwgXyA9PiBbIHQwKF8pLCBib2R5IF0sICgpID0+IFsgYm9keSBdKVxuXHRcdHJldHVybiBibG9ja1dyYXAodGhpcywgQmxvY2tTdGF0ZW1lbnQoYmxvY2spKVxuXHR9LFxuXG5cdENhc2VEb1BhcnQ6IGNhc2VQYXJ0LFxuXHRDYXNlVmFsUGFydDogY2FzZVBhcnQsXG5cdC8vIFRPRE86IGluY2x1ZGVJbm91dENoZWNrcyBpcyBtaXNuYW1lZFxuXHREZWJ1ZygpIHsgcmV0dXJuIGN4Lm9wdHMuaW5jbHVkZUlub3V0Q2hlY2tzKCkgPyB0TGluZXModGhpcy5saW5lcykgOiBbIF0gfSxcblxuXHRPYmpTaW1wbGUoKSB7XG5cdFx0cmV0dXJuIE9iamVjdEV4cHJlc3Npb24odGhpcy5wYWlycy5tYXAocGFpciA9PlxuXHRcdFx0cHJvcGVydHkoJ2luaXQnLCBwcm9wZXJ0eUlkT3JMaXRlcmFsQ2FjaGVkKHBhaXIua2V5KSwgdDAocGFpci52YWx1ZSkpKSlcblx0fSxcblxuXHRFbmRMb29wKCkgeyByZXR1cm4gQnJlYWtTdGF0ZW1lbnQobG9vcElkKHZyLmVuZExvb3BUb0xvb3AuZ2V0KHRoaXMpKSkgfSxcblxuXHRGdW4oKSB7XG5cdFx0Y29uc3Qgb2xkSW5HZW5lcmF0b3IgPSBpc0luR2VuZXJhdG9yXG5cdFx0aXNJbkdlbmVyYXRvciA9IHRoaXMuaXNHZW5lcmF0b3JcblxuXHRcdC8vIFRPRE86RVM2IHVzZSBgLi4uYGZcblx0XHRjb25zdCBuQXJncyA9IExpdGVyYWwodGhpcy5hcmdzLmxlbmd0aClcblx0XHRjb25zdCBvcERlY2xhcmVSZXN0ID0gb3BNYXAodGhpcy5vcFJlc3RBcmcsIHJlc3QgPT5cblx0XHRcdGRlY2xhcmUocmVzdCwgQ2FsbEV4cHJlc3Npb24oQXJyYXlTbGljZUNhbGwsIFtJZEFyZ3VtZW50cywgbkFyZ3NdKSkpXG5cdFx0Y29uc3QgYXJnQ2hlY2tzID1cblx0XHRcdG9wSWYoY3gub3B0cy5pbmNsdWRlVHlwZUNoZWNrcygpLCAoKSA9PlxuXHRcdFx0XHRmbGF0T3BNYXAodGhpcy5hcmdzLCBfID0+XG5cdFx0XHRcdFx0Ly8gVE9ETzogV2F5IHRvIHR5cGVjaGVjayBsYXppZXNcblx0XHRcdFx0XHRvcElmKCFfLmlzTGF6eSgpLCAoKSA9PlxuXHRcdFx0XHRcdFx0b3BNYXAoXy5vcFR5cGUsIHR5cGUgPT5cblx0XHRcdFx0XHRcdFx0RXhwcmVzc2lvblN0YXRlbWVudChtc0NoZWNrQ29udGFpbnMoXG5cdFx0XHRcdFx0XHRcdFx0dDAodHlwZSksXG5cdFx0XHRcdFx0XHRcdFx0YWNjZXNzTG9jYWxEZWNsYXJlKF8pLFxuXHRcdFx0XHRcdFx0XHRcdExpdGVyYWwoXy5uYW1lKSkpKSkpKVxuXG5cdFx0Y29uc3QgX2luID0gb3BNYXAodGhpcy5vcEluLCB0MClcblx0XHRjb25zdCBsZWFkID0gY2F0KG9wRGVjbGFyZVJlc3QsIGFyZ0NoZWNrcywgX2luKVxuXG5cdFx0Y29uc3QgX291dCA9IG9wTWFwKHRoaXMub3BPdXQsIHQwKVxuXHRcdGNvbnN0IGJvZHkgPSB0Myh0aGlzLmJsb2NrLCBsZWFkLCB0aGlzLm9wUmVzRGVjbGFyZSwgX291dClcblx0XHRjb25zdCBhcmdzID0gdGhpcy5hcmdzLm1hcCh0MClcblx0XHRpc0luR2VuZXJhdG9yID0gb2xkSW5HZW5lcmF0b3Jcblx0XHRjb25zdCBpZCA9IG9wTWFwKHRoaXMubmFtZSwgaWRDYWNoZWQpXG5cdFx0cmV0dXJuIEZ1bmN0aW9uRXhwcmVzc2lvbihpZCwgYXJncywgYm9keSwgdGhpcy5pc0dlbmVyYXRvcilcblx0fSxcblxuXHRMYXp5KCkgeyByZXR1cm4gbGF6eVdyYXAodDAodGhpcy52YWx1ZSkpIH0sXG5cblx0TnVtYmVyTGl0ZXJhbCgpIHtcblx0XHQvLyBOZWdhdGl2ZSBudW1iZXJzIGFyZSBub3QgcGFydCBvZiBFUyBzcGVjLlxuXHRcdC8vIGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi81LjEvI3NlYy03LjguM1xuXHRcdGNvbnN0IGxpdCA9IExpdGVyYWwoTWF0aC5hYnModGhpcy52YWx1ZSkpXG5cdFx0cmV0dXJuIGlzUG9zaXRpdmUodGhpcy52YWx1ZSkgPyBsaXQgOiB1bmFyeUV4cHJlc3Npb25OZWdhdGUobGl0KVxuXHR9LFxuXG5cdEdsb2JhbEFjY2VzcygpIHsgcmV0dXJuIElkZW50aWZpZXIodGhpcy5uYW1lKSB9LFxuXG5cdExvY2FsQWNjZXNzKCkgeyByZXR1cm4gYWNjZXNzTG9jYWxEZWNsYXJlKHZyLmFjY2Vzc1RvTG9jYWwuZ2V0KHRoaXMpKSB9LFxuXG5cdExvY2FsRGVjbGFyZSgpIHsgcmV0dXJuIGlkRm9yRGVjbGFyZUNhY2hlZCh0aGlzKSB9LFxuXG5cdC8vIFRPRE86IERvbid0IGFsd2F5cyBsYWJlbCFcblx0TG9vcCgpIHtcblx0XHRyZXR1cm4gTGFiZWxlZFN0YXRlbWVudChsb29wSWQodGhpcyksIHdoaWxlU3RhdGVtZW50SW5maW5pdGUodDAodGhpcy5ibG9jaykpKVxuXHR9LFxuXG5cdE1hcEVudHJ5KCkge1xuXHRcdGNvbnN0IGluZGV4ID0gdnIubGlzdE1hcEVudHJ5SW5kZXgodGhpcylcblx0XHRjb25zdCBrID0gYF9rJHtpbmRleH1gXG5cdFx0Y29uc3QgdiA9IGBfdiR7aW5kZXh9YFxuXHRcdHJldHVybiB2YXJpYWJsZURlY2xhcmF0aW9uQ29uc3QoW1xuXHRcdFx0VmFyaWFibGVEZWNsYXJhdG9yKGlkQ2FjaGVkKGspLCB0MCh0aGlzLmtleSkpLFxuXHRcdFx0VmFyaWFibGVEZWNsYXJhdG9yKGlkQ2FjaGVkKHYpLCB0MCh0aGlzLnZhbCkpXG5cdFx0XSlcblx0fSxcblxuXHRNZW1iZXIoKSB7IHJldHVybiBtZW1iZXIodDAodGhpcy5vYmplY3QpLCB0aGlzLm5hbWUpIH0sXG5cblx0TW9kdWxlKCkge1xuXHRcdGNvbnN0IGJvZHkgPSBjYXQoXG5cdFx0XHR0TGluZXModGhpcy5saW5lcyksXG5cdFx0XHRvcE1hcCh0aGlzLm9wRGVmYXVsdEV4cG9ydCwgXyA9PiBhc3NpZ25tZW50RXhwcmVzc2lvblBsYWluKEV4cG9ydHNEZWZhdWx0LCB0MChfKSkpKVxuXHRcdHJldHVybiBQcm9ncmFtKGNhdChcblx0XHRcdG9wSWYoY3gub3B0cy5pbmNsdWRlVXNlU3RyaWN0KCksICgpID0+IFVzZVN0cmljdCksXG5cdFx0XHRvcElmKGN4Lm9wdHMuaW5jbHVkZUFtZGVmaW5lKCksICgpID0+IEFtZGVmaW5lSGVhZGVyKSxcblx0XHRcdHRvU3RhdGVtZW50KGFtZFdyYXBNb2R1bGUodGhpcy5kb1VzZXMsIHRoaXMudXNlcy5jb25jYXQodGhpcy5kZWJ1Z1VzZXMpLCBib2R5KSkpKVxuXHR9LFxuXG5cdFF1b3RlKCkge1xuXHRcdC8vIFRPRE86RVM2IHVzZSB0ZW1wbGF0ZSBzdHJpbmdzXG5cdFx0Y29uc3QgcGFydDAgPSB0aGlzLnBhcnRzWzBdXG5cdFx0Y29uc3QgWyBmaXJzdCwgcmVzdFBhcnRzIF0gPVxuXHRcdFx0dHlwZW9mIHBhcnQwID09PSAnc3RyaW5nJyA/XG5cdFx0XHRcdFsgTGl0ZXJhbChwYXJ0MCksIHRhaWwodGhpcy5wYXJ0cykgXSA6XG5cdFx0XHRcdFsgTGl0RW1wdHlTdHJpbmcsIHRoaXMucGFydHMgXVxuXHRcdHJldHVybiByZXN0UGFydHMucmVkdWNlKFxuXHRcdFx0KGV4LCBfKSA9PlxuXHRcdFx0XHRiaW5hcnlFeHByZXNzaW9uUGx1cyhleCwgdHlwZW9mIF8gPT09ICdzdHJpbmcnID8gTGl0ZXJhbChfKSA6IG1zU2hvdyh0MChfKSkpLFxuXHRcdFx0Zmlyc3QpXG5cdH0sXG5cblx0U3BlY2lhbERvKCkge1xuXHRcdHN3aXRjaCAodGhpcy5raW5kKSB7XG5cdFx0XHRjYXNlIFNEX0RlYnVnZ2VyOiByZXR1cm4gRGVidWdnZXJTdGF0ZW1lbnQoKVxuXHRcdFx0ZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKHRoaXMua2luZClcblx0XHR9XG5cdH0sXG5cblx0U3BlY2lhbFZhbCgpIHtcblx0XHQvLyBNYWtlIG5ldyBvYmplY3RzIGJlY2F1c2Ugd2Ugd2lsbCBhc3NpZ24gYGxvY2AgdG8gdGhlbS5cblx0XHRzd2l0Y2ggKHRoaXMua2luZCkge1xuXHRcdFx0Y2FzZSBTVl9Db250YWluczogcmV0dXJuIG1lbWJlcihJZE1zLCAnY29udGFpbnMnKVxuXHRcdFx0Y2FzZSBTVl9GYWxzZTogcmV0dXJuIExpdGVyYWwoZmFsc2UpXG5cdFx0XHRjYXNlIFNWX051bGw6IHJldHVybiBMaXRlcmFsKG51bGwpXG5cdFx0XHRjYXNlIFNWX1N1YjogcmV0dXJuIG1lbWJlcihJZE1zLCAnc3ViJylcblx0XHRcdGNhc2UgU1ZfVGhpczogcmV0dXJuIFx0VGhpc0V4cHJlc3Npb24oKVxuXHRcdFx0Y2FzZSBTVl9UaGlzTW9kdWxlRGlyZWN0b3J5OiByZXR1cm4gSWRlbnRpZmllcignX19kaXJuYW1lJylcblx0XHRcdGNhc2UgU1ZfVHJ1ZTogcmV0dXJuIExpdGVyYWwodHJ1ZSlcblx0XHRcdGNhc2UgU1ZfVW5kZWZpbmVkOiByZXR1cm4gdW5hcnlFeHByZXNzaW9uVm9pZChMaXRaZXJvKVxuXHRcdFx0ZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKHRoaXMua2luZClcblx0XHR9XG5cdH0sXG5cblx0WWllbGQoKSB7IHJldHVybiB5aWVsZEV4cHJlc3Npb25Ob0RlbGVnYXRlKHQwKHRoaXMueWllbGRlZCkpIH0sXG5cblx0WWllbGRUbygpIHsgcmV0dXJuIHlpZWxkRXhwcmVzc2lvbkRlbGVnYXRlKHQwKHRoaXMueWllbGRlZFRvKSkgfVxufSlcblxuZnVuY3Rpb24gY2FzZVBhcnQoYWx0ZXJuYXRlKSB7XG5cdGlmICh0aGlzLnRlc3QgaW5zdGFuY2VvZiBQYXR0ZXJuKSB7XG5cdFx0Y29uc3QgeyB0eXBlLCBwYXR0ZXJuZWQsIGxvY2FscyB9ID0gdGhpcy50ZXN0XG5cdFx0Y29uc3QgZGVjbCA9IHZhcmlhYmxlRGVjbGFyYXRpb25Db25zdChbXG5cdFx0XHRWYXJpYWJsZURlY2xhcmF0b3IoSWRFeHRyYWN0LCBtc0V4dHJhY3QodDAodHlwZSksIHQwKHBhdHRlcm5lZCkpKSBdKVxuXHRcdGNvbnN0IHRlc3QgPSBiaW5hcnlFeHByZXNzaW9uTm90RXF1YWwoSWRFeHRyYWN0LCBMaXROdWxsKVxuXHRcdGNvbnN0IGV4dHJhY3QgPSB2YXJpYWJsZURlY2xhcmF0aW9uQ29uc3QobG9jYWxzLm1hcCgoXywgaWR4KSA9PlxuXHRcdFx0VmFyaWFibGVEZWNsYXJhdG9yKGlkRm9yRGVjbGFyZUNhY2hlZChfKSwgbWVtYmVyRXhwcmVzc2lvbihJZEV4dHJhY3QsIExpdGVyYWwoaWR4KSkpKSlcblx0XHRjb25zdCByZXMgPSB0MSh0aGlzLnJlc3VsdCwgZXh0cmFjdClcblx0XHRyZXR1cm4gQmxvY2tTdGF0ZW1lbnQoWyBkZWNsLCBJZlN0YXRlbWVudCh0ZXN0LCByZXMsIGFsdGVybmF0ZSkgXSlcblx0fSBlbHNlIHtcblx0XHRjb25zdCBjaGVja2VkVGVzdCA9IGN4Lm9wdHMuaW5jbHVkZUNhc2VDaGVja3MoKSA/IG1zQm9vbCh0MCh0aGlzLnRlc3QpKSA6IHQwKHRoaXMudGVzdClcblx0XHQvLyBhbHRlcm5hdGUgd3JpdHRlbiB0byBieSBgY2FzZUJvZHlgLlxuXHRcdHJldHVybiBJZlN0YXRlbWVudChjaGVja2VkVGVzdCwgdDAodGhpcy5yZXN1bHQpLCBhbHRlcm5hdGUpXG5cdH1cbn1cblxuLy8gRnVuY3Rpb25zIHNwZWNpZmljIHRvIGNlcnRhaW4gZXhwcmVzc2lvbnMuXG5jb25zdFxuXHRibG9ja1dyYXAgPSAoXywgYmxvY2spID0+IHtcblx0XHRjb25zdCBpbnZva2UgPSBjYWxsRXhwcmVzc2lvblRodW5rKGZ1bmN0aW9uRXhwcmVzc2lvblRodW5rKGJsb2NrLCBpc0luR2VuZXJhdG9yKSlcblx0XHRyZXR1cm4gaXNJbkdlbmVyYXRvciA/IHlpZWxkRXhwcmVzc2lvbkRlbGVnYXRlKGludm9rZSkgOiBpbnZva2Vcblx0fSxcblxuXHRjYXNlQm9keSA9IChwYXJ0cywgb3BFbHNlKSA9PiB7XG5cdFx0bGV0IGFjYyA9IGlmRWxzZShvcEVsc2UsIHQwLCAoKSA9PiB0aHJvd0Vycm9yKCdObyBicmFuY2ggb2YgYGNhc2VgIG1hdGNoZXMuJykpXG5cdFx0Zm9yIChsZXQgaSA9IHBhcnRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaSA9IGkgLSAxKVxuXHRcdFx0YWNjID0gdDEocGFydHNbaV0sIGFjYylcblx0XHRyZXR1cm4gYWNjXG5cdH0sXG5cblx0bG9vcElkID0gbG9vcCA9PiBpZENhY2hlZChgbG9vcCR7bG9vcC5sb2Muc3RhcnQubGluZX1gKSxcblxuXHR0cmFuc3BpbGVCbG9jayA9IChyZXR1cm5lZCwgbGluZXMsIGxlYWQgPSBudWxsLCBvcFJlc0RlY2xhcmUgPSBudWxsLCBvcE91dCA9IG51bGwpID0+IHtcblx0XHRjb25zdCBmaW4gPSBpZkVsc2Uob3BSZXNEZWNsYXJlLFxuXHRcdFx0cmQgPT4ge1xuXHRcdFx0XHRjb25zdCByZXQgPSBtYXliZVdyYXBJbkNoZWNrQ29udGFpbnMocmV0dXJuZWQsIHJkLm9wVHlwZSwgcmQubmFtZSlcblx0XHRcdFx0cmV0dXJuIGlmRWxzZShvcE91dCxcblx0XHRcdFx0XHRfID0+IGNhdChkZWNsYXJlKHJkLCByZXQpLCBfLCBSZXR1cm5SZXMpLFxuXHRcdFx0XHRcdCgpID0+IFJldHVyblN0YXRlbWVudChyZXQpKVxuXHRcdFx0fSxcblx0XHRcdCgpID0+IGNhdChvcE91dCwgUmV0dXJuU3RhdGVtZW50KHJldHVybmVkKSkpXG5cdFx0cmV0dXJuIEJsb2NrU3RhdGVtZW50KGNhdChsZWFkLCB0TGluZXMobGluZXMpLCBmaW4pKVxuXHR9XG5cbi8vIE1vZHVsZSBoZWxwZXJzXG5jb25zdFxuXHRhbWRXcmFwTW9kdWxlID0gKGRvVXNlcywgb3RoZXJVc2VzLCBib2R5KSA9PiB7XG5cdFx0Y29uc3QgYWxsVXNlcyA9IGRvVXNlcy5jb25jYXQob3RoZXJVc2VzKVxuXHRcdGNvbnN0IHVzZVBhdGhzID0gQXJyYXlFeHByZXNzaW9uKGNhdChcblx0XHRcdExpdFN0ckV4cG9ydHMsXG5cdFx0XHRhbGxVc2VzLm1hcChfID0+IExpdGVyYWwobWFuZ2xlUGF0aChfLnBhdGgpKSkpKVxuXHRcdGNvbnN0IHVzZUlkZW50aWZpZXJzID0gYWxsVXNlcy5tYXAoKF8sIGkpID0+IGlkQ2FjaGVkKGAke3BhdGhCYXNlTmFtZShfLnBhdGgpfV8ke2l9YCkpXG5cdFx0Y29uc3QgdXNlQXJncyA9IGNhdChJZEV4cG9ydHMsIHVzZUlkZW50aWZpZXJzKVxuXHRcdGNvbnN0IHVzZURvcyA9IGRvVXNlcy5tYXAoKHVzZSwgaSkgPT5cblx0XHRcdGxvYyhFeHByZXNzaW9uU3RhdGVtZW50KG1zR2V0TW9kdWxlKHVzZUlkZW50aWZpZXJzW2ldKSksIHVzZS5sb2MpKVxuXHRcdGNvbnN0IG9wVXNlRGVjbGFyZSA9IG9wSWYoIWlzRW1wdHkob3RoZXJVc2VzKSxcblx0XHRcdCgpID0+IFZhcmlhYmxlRGVjbGFyYXRpb24oJ2NvbnN0JywgZmxhdE1hcChvdGhlclVzZXMsICh1c2UsIGkpID0+XG5cdFx0XHRcdHVzZURlY2xhcmF0b3JzKHVzZSwgdXNlSWRlbnRpZmllcnNbaSArIGRvVXNlcy5sZW5ndGhdKSkpKVxuXHRcdGNvbnN0IGZ1bGxCb2R5ID0gQmxvY2tTdGF0ZW1lbnQoY2F0KHVzZURvcywgb3BVc2VEZWNsYXJlLCBib2R5LCBSZXR1cm5FeHBvcnRzKSlcblx0XHRjb25zdCBsYXp5Qm9keSA9XG5cdFx0XHRjeC5vcHRzLmxhenlNb2R1bGUoKSA/XG5cdFx0XHRcdEJsb2NrU3RhdGVtZW50KFsgRXhwcmVzc2lvblN0YXRlbWVudChcblx0XHRcdFx0XHRhc3NpZ25tZW50RXhwcmVzc2lvblBsYWluKEV4cG9ydHNHZXQsXG5cdFx0XHRcdFx0XHRtc0xhenkoZnVuY3Rpb25FeHByZXNzaW9uVGh1bmsoZnVsbEJvZHkpKSkpIF0pIDpcblx0XHRcdFx0ZnVsbEJvZHlcblx0XHRyZXR1cm4gQ2FsbEV4cHJlc3Npb24oSWREZWZpbmUsIFsgdXNlUGF0aHMsIGZ1bmN0aW9uRXhwcmVzc2lvblBsYWluKHVzZUFyZ3MsIGxhenlCb2R5KSBdKVxuXHR9LFxuXG5cdHBhdGhCYXNlTmFtZSA9IHBhdGggPT5cblx0XHRwYXRoLnN1YnN0cihwYXRoLmxhc3RJbmRleE9mKCcvJykgKyAxKSxcblxuXHR1c2VEZWNsYXJhdG9ycyA9ICh1c2UsIG1vZHVsZUlkZW50aWZpZXIpID0+IHtcblx0XHQvLyBUT0RPOiBDb3VsZCBiZSBuZWF0ZXIgYWJvdXQgdGhpc1xuXHRcdGNvbnN0IGlzTGF6eSA9IChpc0VtcHR5KHVzZS51c2VkKSA/IHVzZS5vcFVzZURlZmF1bHQgOiB1c2UudXNlZFswXSkuaXNMYXp5KClcblx0XHRjb25zdCB2YWx1ZSA9IChpc0xhenkgPyBtc0xhenlHZXRNb2R1bGUgOiBtc0dldE1vZHVsZSkobW9kdWxlSWRlbnRpZmllcilcblxuXHRcdGNvbnN0IHVzZWREZWZhdWx0ID0gb3BNYXAodXNlLm9wVXNlRGVmYXVsdCwgZGVmID0+IHtcblx0XHRcdGNvbnN0IGRlZmV4cCA9IG1zR2V0RGVmYXVsdEV4cG9ydChtb2R1bGVJZGVudGlmaWVyKVxuXHRcdFx0Y29uc3QgdmFsID0gaXNMYXp5ID8gbGF6eVdyYXAoZGVmZXhwKSA6IGRlZmV4cFxuXHRcdFx0cmV0dXJuIGxvYyhWYXJpYWJsZURlY2xhcmF0b3IoaWRGb3JEZWNsYXJlQ2FjaGVkKGRlZiksIHZhbCksIGRlZi5sb2MpXG5cdFx0fSlcblxuXHRcdGNvbnN0IHVzZWREZXN0cnVjdCA9IGlzRW1wdHkodXNlLnVzZWQpID8gbnVsbCA6XG5cdFx0XHRtYWtlRGVzdHJ1Y3R1cmVEZWNsYXJhdG9ycyh1c2UudXNlZCwgaXNMYXp5LCB2YWx1ZSwgdHJ1ZSwgZmFsc2UpXG5cblx0XHRyZXR1cm4gY2F0KHVzZWREZWZhdWx0LCB1c2VkRGVzdHJ1Y3QpXG5cdH1cblxuLy8gR2VuZXJhbCB1dGlscy4gTm90IGluIHV0aWwuanMgYmVjYXVzZSB0aGVzZSBjbG9zZSBvdmVyIGN4LlxuY29uc3Rcblx0bWFrZURlc3RydWN0dXJlRGVjbGFyYXRvcnMgPSAoYXNzaWduZWVzLCBpc0xhenksIHZhbHVlLCBpc01vZHVsZSwgaXNFeHBvcnQpID0+IHtcblx0XHRjb25zdCBkZXN0cnVjdHVyZWROYW1lID0gYF8kJHthc3NpZ25lZXNbMF0ubG9jLnN0YXJ0LmxpbmV9YFxuXHRcdGNvbnN0IGlkRGVzdHJ1Y3R1cmVkID0gSWRlbnRpZmllcihkZXN0cnVjdHVyZWROYW1lKVxuXHRcdGNvbnN0IGRlY2xhcmF0b3JzID0gYXNzaWduZWVzLm1hcChhc3NpZ25lZSA9PiB7XG5cdFx0XHQvLyBUT0RPOiBEb24ndCBjb21waWxlIGl0IGlmIGl0J3MgbmV2ZXIgYWNjZXNzZWRcblx0XHRcdGNvbnN0IGdldCA9IGdldE1lbWJlcihpZERlc3RydWN0dXJlZCwgYXNzaWduZWUubmFtZSwgaXNMYXp5LCBpc01vZHVsZSlcblx0XHRcdHJldHVybiBtYWtlRGVjbGFyYXRvcihhc3NpZ25lZSwgZ2V0LCBpc0xhenksIGlzRXhwb3J0KVxuXHRcdH0pXG5cdFx0Ly8gR2V0dGluZyBsYXp5IG1vZHVsZSBpcyBkb25lIGJ5IG1zLmxhenlHZXRNb2R1bGUuXG5cdFx0Y29uc3QgdmFsID0gKGlzTGF6eSAmJiAhaXNNb2R1bGUpID8gbGF6eVdyYXAodmFsdWUpIDogdmFsdWVcblx0XHRyZXR1cm4gdW5zaGlmdChWYXJpYWJsZURlY2xhcmF0b3IoaWREZXN0cnVjdHVyZWQsIHZhbCksIGRlY2xhcmF0b3JzKVxuXHR9LFxuXG5cdG1ha2VEZWNsYXJhdG9yID0gKGFzc2lnbmVlLCB2YWx1ZSwgdmFsdWVJc0FscmVhZHlMYXp5LCBpc0V4cG9ydCkgPT4ge1xuXHRcdGNvbnN0IHsgbG9jLCBuYW1lLCBvcFR5cGUgfSA9IGFzc2lnbmVlXG5cdFx0Y29uc3QgaXNMYXp5ID0gYXNzaWduZWUuaXNMYXp5KClcblx0XHQvLyBUT0RPOiBhc3NlcnQoYXNzaWduZWUub3BUeXBlID09PSBudWxsKVxuXHRcdC8vIG9yIFRPRE86IEFsbG93IHR5cGUgY2hlY2sgb24gbGF6eSB2YWx1ZT9cblx0XHR2YWx1ZSA9IGlzTGF6eSA/IHZhbHVlIDogbWF5YmVXcmFwSW5DaGVja0NvbnRhaW5zKHZhbHVlLCBvcFR5cGUsIG5hbWUpXG5cdFx0aWYgKGlzRXhwb3J0KSB7XG5cdFx0XHQvLyBUT0RPOkVTNlxuXHRcdFx0Y3guY2hlY2soIWlzTGF6eSwgbG9jLCAnTGF6eSBleHBvcnQgbm90IHN1cHBvcnRlZC4nKVxuXHRcdFx0cmV0dXJuIFZhcmlhYmxlRGVjbGFyYXRvcihcblx0XHRcdFx0aWRGb3JEZWNsYXJlQ2FjaGVkKGFzc2lnbmVlKSxcblx0XHRcdFx0YXNzaWdubWVudEV4cHJlc3Npb25QbGFpbihtZW1iZXIoSWRFeHBvcnRzLCBuYW1lKSwgdmFsdWUpKVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCB2YWwgPSBpc0xhenkgJiYgIXZhbHVlSXNBbHJlYWR5TGF6eSA/IGxhenlXcmFwKHZhbHVlKSA6IHZhbHVlXG5cdFx0XHRhc3NlcnQoaXNMYXp5IHx8ICF2YWx1ZUlzQWxyZWFkeUxhenkpXG5cdFx0XHRyZXR1cm4gVmFyaWFibGVEZWNsYXJhdG9yKGlkRm9yRGVjbGFyZUNhY2hlZChhc3NpZ25lZSksIHZhbClcblx0XHR9XG5cdH0sXG5cblx0bWF5YmVXcmFwSW5DaGVja0NvbnRhaW5zID0gKGFzdCwgb3BUeXBlLCBuYW1lKSA9PlxuXHRcdChjeC5vcHRzLmluY2x1ZGVUeXBlQ2hlY2tzKCkgJiYgb3BUeXBlICE9PSBudWxsKSA/XG5cdFx0XHRtc0NoZWNrQ29udGFpbnModDAob3BUeXBlKSwgYXN0LCBMaXRlcmFsKG5hbWUpKSA6XG5cdFx0XHRhc3QsXG5cblx0Z2V0TWVtYmVyID0gKGFzdE9iamVjdCwgZ290TmFtZSwgaXNMYXp5LCBpc01vZHVsZSkgPT5cblx0XHRpc0xhenkgP1xuXHRcdG1zTGF6eUdldChhc3RPYmplY3QsIExpdGVyYWwoZ290TmFtZSkpIDpcblx0XHRpc01vZHVsZSAmJiBjeC5vcHRzLmluY2x1ZGVVc2VDaGVja3MoKSA/XG5cdFx0bXNHZXQoYXN0T2JqZWN0LCBMaXRlcmFsKGdvdE5hbWUpKSA6XG5cdFx0bWVtYmVyKGFzdE9iamVjdCwgZ290TmFtZSlcbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9