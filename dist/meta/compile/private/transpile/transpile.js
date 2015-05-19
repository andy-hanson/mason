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
			return (0, _util.isPositive)(this.value) ? lit : (0, _esastDistAst.UnaryExpression)('-', lit);
		},

		GlobalAccess: function () {
			return (0, _esastDistAst.Identifier)(this.name);
		},

		IfDo: function () {
			return (0, _esastDistAst.IfStatement)(maybeBoolWrap(t0(this.test)), t0(this.result));
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
				return (0, _esastDistAst.BinaryExpression)('+', ex, typeof _ === 'string' ? (0, _esastDistAst.Literal)(_) : (0, _msCall.msShow)(t0(_)));
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
		if (this.test instanceof _Expression.Pattern) {
			var _test = this.test;
			const type = _test.type;
			const patterned = _test.patterned;
			const locals = _test.locals;

			const decl = (0, _esastDistSpecialize.variableDeclarationConst)([(0, _esastDistAst.VariableDeclarator)(_astConstants.IdExtract, (0, _msCall.msExtract)(t0(type), t0(patterned)))]);
			const test = (0, _esastDistAst.BinaryExpression)('!==', _astConstants.IdExtract, _astConstants.LitNull);
			const extract = (0, _esastDistSpecialize.variableDeclarationConst)(locals.map(function (_, idx) {
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
	const maybeBoolWrap = function (ast) {
		return cx.opts.includeCaseChecks() ? (0, _msCall.msBool)(ast) : ast;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS90cmFuc3BpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2tCQTRCd0IsU0FBUzs7Ozs7Ozs7OztBQUZqQyxLQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsYUFBYSxDQUFBOztBQUVWLFVBQVMsU0FBUyxDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRSxHQUFHLEVBQUU7QUFDN0QsSUFBRSxHQUFHLEdBQUcsQ0FBQTtBQUNSLElBQUUsR0FBRyxHQUFHLENBQUE7QUFDUixlQUFhLEdBQUcsS0FBSyxDQUFBO0FBQ3JCLFFBQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBOztBQUVoQyxJQUFFLEdBQUcsRUFBRSxHQUFHLFNBQVMsQ0FBQTtBQUNuQixTQUFPLEdBQUcsQ0FBQTtFQUNWOztBQUVELE9BQ0MsRUFBRSxHQUFHLFVBQUEsSUFBSTtTQUFJLG1CQWxDSyxHQUFHLEVBa0NKLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUM7RUFBQTtPQUNuRCxFQUFFLEdBQUcsVUFBQyxJQUFJLEVBQUUsR0FBRztTQUFLLG1CQW5DRixHQUFHLEVBbUNHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDO0VBQUE7T0FDN0QsRUFBRSxHQUFHLFVBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSTtTQUFLLG1CQXBDZCxHQUFHLEVBb0NlLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUM7RUFBQTtPQUNyRixNQUFNLEdBQUcsVUFBQSxLQUFLLEVBQUk7QUFDakIsUUFBTSxHQUFHLEdBQUcsRUFBRyxDQUFBO0FBQ2YsT0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUksRUFBSTtBQUNyQixTQUFN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RyxLQUFLLENBQUE7QUFDbkUsYUExWU0sTUFBTSxFQTBZTCxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO0FBQ3JDLFVBQU8sa0JBdFo2QixrQkFBa0IsRUFzWjVCLFdBalk1QixrQkFBa0IsRUFpWTZCLFFBQVEsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0dBQzVEO0VBQ0Q7T0FFRCx3QkFBd0IsR0FBRyxVQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSTtTQUM1QyxBQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxNQUFNLEtBQUssSUFBSSxHQUM5QyxZQTNZcUMsZUFBZSxFQTJZcEMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEdBQUcsRUFBRSxrQkE3WmpCLE9BQU8sRUE2WmtCLElBQUksQ0FBQyxDQUFDLEdBQy9DLEdBQUc7RUFBQTtPQUVMLFNBQVMsR0FBRyxVQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVE7U0FDaEQsTUFBTSxHQUNOLFlBL1lvQixTQUFTLEVBK1luQixTQUFTLEVBQUUsa0JBbGFKLE9BQU8sRUFrYUssT0FBTyxDQUFDLENBQUMsR0FDdEMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsR0FDdEMsWUFsWmtFLEtBQUssRUFrWmpFLFNBQVMsRUFBRSxrQkFwYUEsT0FBTyxFQW9hQyxPQUFPLENBQUMsQ0FBQyxHQUNsQyxtQkFsYXNCLE1BQU0sRUFrYXJCLFNBQVMsRUFBRSxPQUFPLENBQUM7RUFBQSxDQUFBIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS90cmFuc3BpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcnJheUV4cHJlc3Npb24sIEJpbmFyeUV4cHJlc3Npb24sIEJsb2NrU3RhdGVtZW50LCBCcmVha1N0YXRlbWVudCwgQ2FsbEV4cHJlc3Npb24sXG5cdERlYnVnZ2VyU3RhdGVtZW50LCBFeHByZXNzaW9uU3RhdGVtZW50LCBGdW5jdGlvbkV4cHJlc3Npb24sIElkZW50aWZpZXIsIElmU3RhdGVtZW50LFxuXHRMYWJlbGVkU3RhdGVtZW50LCBMaXRlcmFsLCBPYmplY3RFeHByZXNzaW9uLCBQcm9ncmFtLCBSZXR1cm5TdGF0ZW1lbnQsIFRoaXNFeHByZXNzaW9uLFxuXHRWYXJpYWJsZURlY2xhcmF0aW9uLCBVbmFyeUV4cHJlc3Npb24sIFZhcmlhYmxlRGVjbGFyYXRvciwgUmV0dXJuU3RhdGVtZW50XG5cdH0gZnJvbSAnZXNhc3QvZGlzdC9hc3QnXG5pbXBvcnQgeyBpZENhY2hlZCwgbG9jLCBtZW1iZXIsIHByb3BlcnR5SWRPckxpdGVyYWxDYWNoZWQsIHRodW5rLCB0b1N0YXRlbWVudFxuXHR9IGZyb20gJ2VzYXN0L2Rpc3QvdXRpbCdcbmltcG9ydCB7IGFzc2lnbm1lbnRFeHByZXNzaW9uUGxhaW4sIGNhbGxFeHByZXNzaW9uVGh1bmssIGZ1bmN0aW9uRXhwcmVzc2lvblBsYWluLFxuXHRmdW5jdGlvbkV4cHJlc3Npb25UaHVuaywgbWVtYmVyRXhwcmVzc2lvbiwgcHJvcGVydHksIHZhcmlhYmxlRGVjbGFyYXRpb25Db25zdCxcblx0eWllbGRFeHByZXNzaW9uRGVsZWdhdGUsIHlpZWxkRXhwcmVzc2lvbk5vRGVsZWdhdGUgfSBmcm9tICdlc2FzdC9kaXN0L3NwZWNpYWxpemUnXG5pbXBvcnQgKiBhcyBFRXhwb3J0cyBmcm9tICcuLi8uLi9FeHByZXNzaW9uJ1xuaW1wb3J0IHsgTERfTGF6eSwgTERfTXV0YWJsZSwgUGF0dGVybiwgU3BsYXQsIFNEX0RlYnVnZ2VyLCBTVl9Db250YWlucywgU1ZfRmFsc2UsIFNWX051bGwsIFNWX1N1Yixcblx0U1ZfVGhpcywgU1ZfVGhpc01vZHVsZURpcmVjdG9yeSwgU1ZfVHJ1ZSwgU1ZfVW5kZWZpbmVkIH0gZnJvbSAnLi4vLi4vRXhwcmVzc2lvbidcbmltcG9ydCBtYW5nbGVQYXRoIGZyb20gJy4uL21hbmdsZVBhdGgnXG5pbXBvcnQgeyBhc3NlcnQsIGNhdCwgZmxhdE1hcCwgZmxhdE9wTWFwLCBpZkVsc2UsIGlzRW1wdHksXG5cdGltcGxlbWVudE1hbnksIGlzUG9zaXRpdmUsIG9wSWYsIG9wTWFwLCByYW5nZSwgdGFpbCwgdW5zaGlmdCB9IGZyb20gJy4uL3V0aWwnXG5pbXBvcnQgeyBBbWRlZmluZUhlYWRlciwgQXJyYXlTbGljZUNhbGwsIEV4cG9ydHNEZWZhdWx0LCBFeHBvcnRzR2V0LCBJZEFyZ3VtZW50cywgSWREZWZpbmUsXG5cdElkRXhwb3J0cywgSWRFeHRyYWN0LCBJZEZ1bmN0aW9uQXBwbHlDYWxsLCBJZE5hbWUsIExpdEVtcHR5QXJyYXksIExpdEVtcHR5U3RyaW5nLCBMaXROdWxsLFxuXHRMaXRTdHJFeHBvcnRzLCBMaXRTdHJOYW1lLCBMaXRaZXJvLCBSZXR1cm5FeHBvcnRzLCBSZXR1cm5SZXMsIFVzZVN0cmljdFxuXHR9IGZyb20gJy4vYXN0LWNvbnN0YW50cydcbmltcG9ydCB7IElkTXMsIGxhenlXcmFwLCBtc0FyciwgbXNCb29sLCBtc0NoZWNrQ29udGFpbnMsIG1zRXh0cmFjdCwgbXNHZXQsIG1zR2V0RGVmYXVsdEV4cG9ydCxcblx0bXNHZXRNb2R1bGUsIG1zTGF6eSwgbXNMYXp5R2V0LCBtc0xhenlHZXRNb2R1bGUsIG1zTHNldCwgbXNNYXAsIG1zU2V0LCBtc1Nob3dcblx0fSBmcm9tICcuL21zLWNhbGwnXG5pbXBvcnQgeyBhY2Nlc3NMb2NhbERlY2xhcmUsIGRlY2xhcmUsIGRlY2xhcmVTcGVjaWFsLFxuXHRpZEZvckRlY2xhcmVDYWNoZWQsIHRocm93RXJyb3IsIHdoaWxlU3RhdGVtZW50SW5maW5pdGUgfSBmcm9tICcuL3V0aWwnXG5cbmxldCBjeCwgdnIsIGlzSW5HZW5lcmF0b3JcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdHJhbnNwaWxlKF9jeCwgbW9kdWxlRXhwcmVzc2lvbiwgX3ZyKSB7XG5cdGN4ID0gX2N4XG5cdHZyID0gX3ZyXG5cdGlzSW5HZW5lcmF0b3IgPSBmYWxzZVxuXHRjb25zdCByZXMgPSB0MChtb2R1bGVFeHByZXNzaW9uKVxuXHQvLyBSZWxlYXNlIGZvciBnYXJiYWdlIGNvbGxlY3Rpb25cblx0Y3ggPSB2ciA9IHVuZGVmaW5lZFxuXHRyZXR1cm4gcmVzXG59XG5cbmNvbnN0XG5cdHQwID0gZXhwciA9PiBsb2MoZXhwci50cmFuc3BpbGVTdWJ0cmVlKCksIGV4cHIubG9jKSxcblx0dDEgPSAoZXhwciwgYXJnKSA9PiBsb2MoZXhwci50cmFuc3BpbGVTdWJ0cmVlKGFyZyksIGV4cHIubG9jKSxcblx0dDMgPSAoZXhwciwgYXJnLCBhcmcyLCBhcmczKSA9PiBsb2MoZXhwci50cmFuc3BpbGVTdWJ0cmVlKGFyZywgYXJnMiwgYXJnMyksIGV4cHIubG9jKSxcblx0dExpbmVzID0gZXhwcnMgPT4ge1xuXHRcdGNvbnN0IG91dCA9IFsgXVxuXHRcdGV4cHJzLmZvckVhY2goZXhwciA9PiB7XG5cdFx0XHRjb25zdCBhc3QgPSBleHByLnRyYW5zcGlsZVN1YnRyZWUoKVxuXHRcdFx0aWYgKGFzdCBpbnN0YW5jZW9mIEFycmF5KVxuXHRcdFx0XHQvLyBEZWJ1ZyBtYXkgcHJvZHVjZSBtdWx0aXBsZSBzdGF0ZW1lbnRzLlxuXHRcdFx0XHRhc3QuZm9yRWFjaChfID0+IG91dC5wdXNoKHRvU3RhdGVtZW50KF8pKSlcblx0XHRcdGVsc2Vcblx0XHRcdFx0b3V0LnB1c2gobG9jKHRvU3RhdGVtZW50KGFzdCksIGV4cHIubG9jKSlcblx0XHR9KVxuXHRcdHJldHVybiBvdXRcblx0fVxuXG5pbXBsZW1lbnRNYW55KEVFeHBvcnRzLCAndHJhbnNwaWxlU3VidHJlZScsIHtcblx0QXNzaWduKCkge1xuXHRcdHJldHVybiBWYXJpYWJsZURlY2xhcmF0aW9uKFxuXHRcdFx0dGhpcy5hc3NpZ25lZS5pc011dGFibGUoKSA/ICdsZXQnIDogJ2NvbnN0Jyxcblx0XHRcdFsgbWFrZURlY2xhcmF0b3IodGhpcy5hc3NpZ25lZSwgdDAodGhpcy52YWx1ZSksIGZhbHNlLCB2ci5pc0V4cG9ydEFzc2lnbih0aGlzKSkgXSlcblx0fSxcblx0Ly8gVE9ETzpFUzYgSnVzdCB1c2UgbmF0aXZlIGRlc3RydWN0dXJpbmcgYXNzaWduXG5cdEFzc2lnbkRlc3RydWN0dXJlKCkge1xuXHRcdHJldHVybiBWYXJpYWJsZURlY2xhcmF0aW9uKHRoaXMua2luZCgpID09PSBMRF9NdXRhYmxlID8gJ2xldCcgOiAnY29uc3QnLFxuXHRcdFx0bWFrZURlc3RydWN0dXJlRGVjbGFyYXRvcnMoXG5cdFx0XHRcdHRoaXMuYXNzaWduZWVzLFxuXHRcdFx0XHR0aGlzLmtpbmQoKSA9PT0gTERfTGF6eSxcblx0XHRcdFx0dDAodGhpcy52YWx1ZSksXG5cdFx0XHRcdGZhbHNlLFxuXHRcdFx0XHR2ci5pc0V4cG9ydEFzc2lnbih0aGlzKSkpXG5cdH0sXG5cblx0QXNzaWduTXV0YXRlKCkge1xuXHRcdHJldHVybiBhc3NpZ25tZW50RXhwcmVzc2lvblBsYWluKGlkQ2FjaGVkKHRoaXMubmFtZSksIHQwKHRoaXMudmFsdWUpKVxuXHR9LFxuXG5cdEJhZ0VudHJ5KCkgeyByZXR1cm4gZGVjbGFyZVNwZWNpYWwoYF8ke3ZyLmxpc3RNYXBFbnRyeUluZGV4KHRoaXMpfWAsIHQwKHRoaXMudmFsdWUpKSB9LFxuXG5cdEJhZ1NpbXBsZSgpIHsgcmV0dXJuIEFycmF5RXhwcmVzc2lvbih0aGlzLnBhcnRzLm1hcCh0MCkpIH0sXG5cblx0QmxvY2tEbyhsZWFkID0gbnVsbCwgb3BSZXNEZWNsYXJlID0gbnVsbCwgb3BPdXQgPSBudWxsKSB7XG5cdFx0YXNzZXJ0KG9wUmVzRGVjbGFyZSA9PT0gbnVsbClcblx0XHRyZXR1cm4gQmxvY2tTdGF0ZW1lbnQoY2F0KGxlYWQsIHRMaW5lcyh0aGlzLmxpbmVzKSwgb3BPdXQpKVxuXHR9LFxuXG5cdEJsb2NrV2l0aFJldHVybihsZWFkLCBvcFJlc0RlY2xhcmUsIG9wT3V0KSB7XG5cdFx0cmV0dXJuIHRyYW5zcGlsZUJsb2NrKHQwKHRoaXMucmV0dXJuZWQpLCB0aGlzLmxpbmVzLCBsZWFkLCBvcFJlc0RlY2xhcmUsIG9wT3V0KVxuXHR9LFxuXG5cdEJsb2NrT2JqKGxlYWQsIG9wUmVzRGVjbGFyZSwgb3BPdXQpIHtcblx0XHQvLyBUT0RPOiBpbmNsdWRlVHlwZUNoZWNrcygpIGlzIG5vdCB0aGUgcmlnaHQgbWV0aG9kIGZvciB0aGlzXG5cdFx0Y29uc3Qga2V5cyA9XG5cdFx0XHRjeC5vcHRzLmluY2x1ZGVUeXBlQ2hlY2tzKCkgPyB0aGlzLmtleXMgOiB0aGlzLmtleXMuZmlsdGVyKF8gPT4gIXZyLmlzRGVidWdMb2NhbChfKSlcblx0XHRjb25zdCByZXQgPSBpZkVsc2UodGhpcy5vcE9iamVkLFxuXHRcdFx0XyA9PiB7XG5cdFx0XHRcdGNvbnN0IG9iamVkID0gdDAoXylcblx0XHRcdFx0Y29uc3Qga2V5c1ZhbHMgPSBjYXQoXG5cdFx0XHRcdFx0ZmxhdE1hcChrZXlzLCBrZXkgPT4gWyBMaXRlcmFsKGtleS5uYW1lKSwgYWNjZXNzTG9jYWxEZWNsYXJlKGtleSkgXSksXG5cdFx0XHRcdFx0b3BNYXAodGhpcy5vcE5hbWUsIF8gPT4gWyBMaXRTdHJOYW1lLCBMaXRlcmFsKF8pIF0pKVxuXHRcdFx0XHRjb25zdCBhbnlMYXp5ID0ga2V5cy5zb21lKF8gPT4gXy5pc0xhenkoKSlcblx0XHRcdFx0cmV0dXJuIChhbnlMYXp5ID8gbXNMc2V0IDogbXNTZXQpKG9iamVkLCAuLi5rZXlzVmFscylcblx0XHRcdH0sXG5cdFx0XHQoKSA9PiB7XG5cdFx0XHRcdGNvbnN0IHByb3BzID0ga2V5cy5tYXAoa2V5ID0+IHtcblx0XHRcdFx0XHRjb25zdCB2YWwgPSBhY2Nlc3NMb2NhbERlY2xhcmUoa2V5KVxuXHRcdFx0XHRcdGNvbnN0IGlkID0gcHJvcGVydHlJZE9yTGl0ZXJhbENhY2hlZChrZXkubmFtZSlcblx0XHRcdFx0XHRyZXR1cm4ga2V5LmlzTGF6eSgpID9cblx0XHRcdFx0XHRcdHByb3BlcnR5KCdnZXQnLCBpZCwgdGh1bmsodmFsKSkgOlxuXHRcdFx0XHRcdFx0cHJvcGVydHkoJ2luaXQnLCBpZCwgdmFsKVxuXHRcdFx0XHR9KVxuXHRcdFx0XHRjb25zdCBvcFByb3BOYW1lID0gb3BNYXAodGhpcy5vcE5hbWUsIF8gPT4gcHJvcGVydHkoJ2luaXQnLCBJZE5hbWUsIExpdGVyYWwoXykpKVxuXHRcdFx0XHRyZXR1cm4gT2JqZWN0RXhwcmVzc2lvbihjYXQocHJvcHMsIG9wUHJvcE5hbWUpKVxuXHRcdFx0fSlcblx0XHRyZXR1cm4gdHJhbnNwaWxlQmxvY2socmV0LCB0aGlzLmxpbmVzLCBsZWFkLCBvcFJlc0RlY2xhcmUsIG9wT3V0KVxuXHR9LFxuXG5cdEJsb2NrQmFnKGxlYWQsIG9wUmVzRGVjbGFyZSwgb3BPdXQpIHtcblx0XHRjb25zdCBsZW5ndGggPSB2ci5saXN0TWFwTGVuZ3RoKHRoaXMpXG5cdFx0cmV0dXJuIHRyYW5zcGlsZUJsb2NrKFxuXHRcdFx0QXJyYXlFeHByZXNzaW9uKHJhbmdlKGxlbmd0aCkubWFwKGkgPT4gaWRDYWNoZWQoYF8ke2l9YCkpKSxcblx0XHRcdHRoaXMubGluZXMsIGxlYWQsIG9wUmVzRGVjbGFyZSwgb3BPdXQpXG5cdH0sXG5cblx0QmxvY2tNYXAobGVhZCwgb3BSZXNEZWNsYXJlLCBvcE91dCkge1xuXHRcdGNvbnN0IGxlbmd0aCA9IHZyLmxpc3RNYXBMZW5ndGgodGhpcylcblx0XHRyZXR1cm4gdHJhbnNwaWxlQmxvY2soXG5cdFx0XHRtc01hcCguLi5mbGF0TWFwKHJhbmdlKGxlbmd0aCksIGkgPT5cblx0XHRcdFx0WyBpZENhY2hlZChgX2ske2l9YCksIGlkQ2FjaGVkKGBfdiR7aX1gKSBdKSksXG5cdFx0XHR0aGlzLmxpbmVzLCBsZWFkLCBvcFJlc0RlY2xhcmUsIG9wT3V0KVxuXHR9LFxuXG5cdEJsb2NrV3JhcCgpIHsgcmV0dXJuIGJsb2NrV3JhcCh0aGlzLCB0MCh0aGlzLmJsb2NrKSkgfSxcblxuXHRDYWxsKCkge1xuXHRcdGNvbnN0IGFueVNwbGF0ID0gdGhpcy5hcmdzLnNvbWUoYXJnID0+IGFyZyBpbnN0YW5jZW9mIFNwbGF0KVxuXHRcdGlmIChhbnlTcGxhdCkge1xuXHRcdFx0Y29uc3QgYXJncyA9IHRoaXMuYXJncy5tYXAoYXJnID0+XG5cdFx0XHRcdGFyZyBpbnN0YW5jZW9mIFNwbGF0ID9cblx0XHRcdFx0XHRtc0Fycih0MChhcmcuc3BsYXR0ZWQpKSA6XG5cdFx0XHRcdFx0dDAoYXJnKSlcblx0XHRcdHJldHVybiBDYWxsRXhwcmVzc2lvbihJZEZ1bmN0aW9uQXBwbHlDYWxsLCBbXG5cdFx0XHRcdHQwKHRoaXMuY2FsbGVkKSxcblx0XHRcdFx0TGl0TnVsbCxcblx0XHRcdFx0Q2FsbEV4cHJlc3Npb24obWVtYmVyKExpdEVtcHR5QXJyYXksICdjb25jYXQnKSwgYXJncyldKVxuXHRcdH1cblx0XHRlbHNlIHJldHVybiBDYWxsRXhwcmVzc2lvbih0MCh0aGlzLmNhbGxlZCksIHRoaXMuYXJncy5tYXAodDApKVxuXHR9LFxuXG5cdENhc2VEbygpIHtcblx0XHRjb25zdCBib2R5ID0gY2FzZUJvZHkodGhpcy5wYXJ0cywgdGhpcy5vcEVsc2UpXG5cdFx0cmV0dXJuIGlmRWxzZSh0aGlzLm9wQ2FzZWQsIF8gPT4gQmxvY2tTdGF0ZW1lbnQoWyB0MChfKSwgYm9keSBdKSwgKCkgPT4gYm9keSlcblx0fSxcblxuXHRDYXNlVmFsKCkge1xuXHRcdGNvbnN0IGJvZHkgPSBjYXNlQm9keSh0aGlzLnBhcnRzLCB0aGlzLm9wRWxzZSlcblx0XHRjb25zdCBibG9jayA9IGlmRWxzZSh0aGlzLm9wQ2FzZWQsIF8gPT4gWyB0MChfKSwgYm9keSBdLCAoKSA9PiBbIGJvZHkgXSlcblx0XHRyZXR1cm4gYmxvY2tXcmFwKHRoaXMsIEJsb2NrU3RhdGVtZW50KGJsb2NrKSlcblx0fSxcblxuXHRDYXNlRG9QYXJ0OiBjYXNlUGFydCxcblx0Q2FzZVZhbFBhcnQ6IGNhc2VQYXJ0LFxuXHQvLyBUT0RPOiBpbmNsdWRlSW5vdXRDaGVja3MgaXMgbWlzbmFtZWRcblx0RGVidWcoKSB7IHJldHVybiBjeC5vcHRzLmluY2x1ZGVJbm91dENoZWNrcygpID8gdExpbmVzKHRoaXMubGluZXMpIDogWyBdIH0sXG5cblx0T2JqU2ltcGxlKCkge1xuXHRcdHJldHVybiBPYmplY3RFeHByZXNzaW9uKHRoaXMucGFpcnMubWFwKHBhaXIgPT5cblx0XHRcdHByb3BlcnR5KCdpbml0JywgcHJvcGVydHlJZE9yTGl0ZXJhbENhY2hlZChwYWlyLmtleSksIHQwKHBhaXIudmFsdWUpKSkpXG5cdH0sXG5cblx0RW5kTG9vcCgpIHsgcmV0dXJuIEJyZWFrU3RhdGVtZW50KGxvb3BJZCh2ci5lbmRMb29wVG9Mb29wLmdldCh0aGlzKSkpIH0sXG5cblx0RnVuKCkge1xuXHRcdGNvbnN0IG9sZEluR2VuZXJhdG9yID0gaXNJbkdlbmVyYXRvclxuXHRcdGlzSW5HZW5lcmF0b3IgPSB0aGlzLmlzR2VuZXJhdG9yXG5cblx0XHQvLyBUT0RPOkVTNiB1c2UgYC4uLmBmXG5cdFx0Y29uc3QgbkFyZ3MgPSBMaXRlcmFsKHRoaXMuYXJncy5sZW5ndGgpXG5cdFx0Y29uc3Qgb3BEZWNsYXJlUmVzdCA9IG9wTWFwKHRoaXMub3BSZXN0QXJnLCByZXN0ID0+XG5cdFx0XHRkZWNsYXJlKHJlc3QsIENhbGxFeHByZXNzaW9uKEFycmF5U2xpY2VDYWxsLCBbSWRBcmd1bWVudHMsIG5BcmdzXSkpKVxuXHRcdGNvbnN0IGFyZ0NoZWNrcyA9XG5cdFx0XHRvcElmKGN4Lm9wdHMuaW5jbHVkZVR5cGVDaGVja3MoKSwgKCkgPT5cblx0XHRcdFx0ZmxhdE9wTWFwKHRoaXMuYXJncywgXyA9PlxuXHRcdFx0XHRcdC8vIFRPRE86IFdheSB0byB0eXBlY2hlY2sgbGF6aWVzXG5cdFx0XHRcdFx0b3BJZighXy5pc0xhenkoKSwgKCkgPT5cblx0XHRcdFx0XHRcdG9wTWFwKF8ub3BUeXBlLCB0eXBlID0+XG5cdFx0XHRcdFx0XHRcdEV4cHJlc3Npb25TdGF0ZW1lbnQobXNDaGVja0NvbnRhaW5zKFxuXHRcdFx0XHRcdFx0XHRcdHQwKHR5cGUpLFxuXHRcdFx0XHRcdFx0XHRcdGFjY2Vzc0xvY2FsRGVjbGFyZShfKSxcblx0XHRcdFx0XHRcdFx0XHRMaXRlcmFsKF8ubmFtZSkpKSkpKSlcblxuXHRcdGNvbnN0IF9pbiA9IG9wTWFwKHRoaXMub3BJbiwgdDApXG5cdFx0Y29uc3QgbGVhZCA9IGNhdChvcERlY2xhcmVSZXN0LCBhcmdDaGVja3MsIF9pbilcblxuXHRcdGNvbnN0IF9vdXQgPSBvcE1hcCh0aGlzLm9wT3V0LCB0MClcblx0XHRjb25zdCBib2R5ID0gdDModGhpcy5ibG9jaywgbGVhZCwgdGhpcy5vcFJlc0RlY2xhcmUsIF9vdXQpXG5cdFx0Y29uc3QgYXJncyA9IHRoaXMuYXJncy5tYXAodDApXG5cdFx0aXNJbkdlbmVyYXRvciA9IG9sZEluR2VuZXJhdG9yXG5cdFx0Y29uc3QgaWQgPSBvcE1hcCh0aGlzLm5hbWUsIGlkQ2FjaGVkKVxuXHRcdHJldHVybiBGdW5jdGlvbkV4cHJlc3Npb24oaWQsIGFyZ3MsIGJvZHksIHRoaXMuaXNHZW5lcmF0b3IpXG5cdH0sXG5cblx0TGF6eSgpIHsgcmV0dXJuIGxhenlXcmFwKHQwKHRoaXMudmFsdWUpKSB9LFxuXG5cdE51bWJlckxpdGVyYWwoKSB7XG5cdFx0Ly8gTmVnYXRpdmUgbnVtYmVycyBhcmUgbm90IHBhcnQgb2YgRVMgc3BlYy5cblx0XHQvLyBodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNS4xLyNzZWMtNy44LjNcblx0XHRjb25zdCBsaXQgPSBMaXRlcmFsKE1hdGguYWJzKHRoaXMudmFsdWUpKVxuXHRcdHJldHVybiBpc1Bvc2l0aXZlKHRoaXMudmFsdWUpID8gbGl0IDogVW5hcnlFeHByZXNzaW9uKCctJywgbGl0KVxuXHR9LFxuXG5cdEdsb2JhbEFjY2VzcygpIHsgcmV0dXJuIElkZW50aWZpZXIodGhpcy5uYW1lKSB9LFxuXG5cdElmRG8oKSB7IHJldHVybiBJZlN0YXRlbWVudChtYXliZUJvb2xXcmFwKHQwKHRoaXMudGVzdCkpLCB0MCh0aGlzLnJlc3VsdCkpIH0sXG5cblx0TG9jYWxBY2Nlc3MoKSB7IHJldHVybiBhY2Nlc3NMb2NhbERlY2xhcmUodnIuYWNjZXNzVG9Mb2NhbC5nZXQodGhpcykpIH0sXG5cblx0TG9jYWxEZWNsYXJlKCkgeyByZXR1cm4gaWRGb3JEZWNsYXJlQ2FjaGVkKHRoaXMpIH0sXG5cblx0Ly8gVE9ETzogRG9uJ3QgYWx3YXlzIGxhYmVsIVxuXHRMb29wKCkge1xuXHRcdHJldHVybiBMYWJlbGVkU3RhdGVtZW50KGxvb3BJZCh0aGlzKSwgd2hpbGVTdGF0ZW1lbnRJbmZpbml0ZSh0MCh0aGlzLmJsb2NrKSkpXG5cdH0sXG5cblx0TWFwRW50cnkoKSB7XG5cdFx0Y29uc3QgaW5kZXggPSB2ci5saXN0TWFwRW50cnlJbmRleCh0aGlzKVxuXHRcdGNvbnN0IGsgPSBgX2ske2luZGV4fWBcblx0XHRjb25zdCB2ID0gYF92JHtpbmRleH1gXG5cdFx0cmV0dXJuIHZhcmlhYmxlRGVjbGFyYXRpb25Db25zdChbXG5cdFx0XHRWYXJpYWJsZURlY2xhcmF0b3IoaWRDYWNoZWQoayksIHQwKHRoaXMua2V5KSksXG5cdFx0XHRWYXJpYWJsZURlY2xhcmF0b3IoaWRDYWNoZWQodiksIHQwKHRoaXMudmFsKSlcblx0XHRdKVxuXHR9LFxuXG5cdE1lbWJlcigpIHsgcmV0dXJuIG1lbWJlcih0MCh0aGlzLm9iamVjdCksIHRoaXMubmFtZSkgfSxcblxuXHRNb2R1bGUoKSB7XG5cdFx0Y29uc3QgYm9keSA9IGNhdChcblx0XHRcdHRMaW5lcyh0aGlzLmxpbmVzKSxcblx0XHRcdG9wTWFwKHRoaXMub3BEZWZhdWx0RXhwb3J0LCBfID0+IGFzc2lnbm1lbnRFeHByZXNzaW9uUGxhaW4oRXhwb3J0c0RlZmF1bHQsIHQwKF8pKSkpXG5cdFx0cmV0dXJuIFByb2dyYW0oY2F0KFxuXHRcdFx0b3BJZihjeC5vcHRzLmluY2x1ZGVVc2VTdHJpY3QoKSwgKCkgPT4gVXNlU3RyaWN0KSxcblx0XHRcdG9wSWYoY3gub3B0cy5pbmNsdWRlQW1kZWZpbmUoKSwgKCkgPT4gQW1kZWZpbmVIZWFkZXIpLFxuXHRcdFx0dG9TdGF0ZW1lbnQoYW1kV3JhcE1vZHVsZSh0aGlzLmRvVXNlcywgdGhpcy51c2VzLmNvbmNhdCh0aGlzLmRlYnVnVXNlcyksIGJvZHkpKSkpXG5cdH0sXG5cblx0UXVvdGUoKSB7XG5cdFx0Ly8gVE9ETzpFUzYgdXNlIHRlbXBsYXRlIHN0cmluZ3Ncblx0XHRjb25zdCBwYXJ0MCA9IHRoaXMucGFydHNbMF1cblx0XHRjb25zdCBbIGZpcnN0LCByZXN0UGFydHMgXSA9XG5cdFx0XHR0eXBlb2YgcGFydDAgPT09ICdzdHJpbmcnID9cblx0XHRcdFx0WyBMaXRlcmFsKHBhcnQwKSwgdGFpbCh0aGlzLnBhcnRzKSBdIDpcblx0XHRcdFx0WyBMaXRFbXB0eVN0cmluZywgdGhpcy5wYXJ0cyBdXG5cdFx0cmV0dXJuIHJlc3RQYXJ0cy5yZWR1Y2UoXG5cdFx0XHQoZXgsIF8pID0+XG5cdFx0XHRcdEJpbmFyeUV4cHJlc3Npb24oJysnLCBleCwgdHlwZW9mIF8gPT09ICdzdHJpbmcnID8gTGl0ZXJhbChfKSA6IG1zU2hvdyh0MChfKSkpLFxuXHRcdFx0Zmlyc3QpXG5cdH0sXG5cblx0U3BlY2lhbERvKCkge1xuXHRcdHN3aXRjaCAodGhpcy5raW5kKSB7XG5cdFx0XHRjYXNlIFNEX0RlYnVnZ2VyOiByZXR1cm4gRGVidWdnZXJTdGF0ZW1lbnQoKVxuXHRcdFx0ZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKHRoaXMua2luZClcblx0XHR9XG5cdH0sXG5cblx0U3BlY2lhbFZhbCgpIHtcblx0XHQvLyBNYWtlIG5ldyBvYmplY3RzIGJlY2F1c2Ugd2Ugd2lsbCBhc3NpZ24gYGxvY2AgdG8gdGhlbS5cblx0XHRzd2l0Y2ggKHRoaXMua2luZCkge1xuXHRcdFx0Y2FzZSBTVl9Db250YWluczogcmV0dXJuIG1lbWJlcihJZE1zLCAnY29udGFpbnMnKVxuXHRcdFx0Y2FzZSBTVl9GYWxzZTogcmV0dXJuIExpdGVyYWwoZmFsc2UpXG5cdFx0XHRjYXNlIFNWX051bGw6IHJldHVybiBMaXRlcmFsKG51bGwpXG5cdFx0XHRjYXNlIFNWX1N1YjogcmV0dXJuIG1lbWJlcihJZE1zLCAnc3ViJylcblx0XHRcdGNhc2UgU1ZfVGhpczogcmV0dXJuIFx0VGhpc0V4cHJlc3Npb24oKVxuXHRcdFx0Y2FzZSBTVl9UaGlzTW9kdWxlRGlyZWN0b3J5OiByZXR1cm4gSWRlbnRpZmllcignX19kaXJuYW1lJylcblx0XHRcdGNhc2UgU1ZfVHJ1ZTogcmV0dXJuIExpdGVyYWwodHJ1ZSlcblx0XHRcdGNhc2UgU1ZfVW5kZWZpbmVkOiByZXR1cm4gVW5hcnlFeHByZXNzaW9uKCd2b2lkJywgTGl0WmVybylcblx0XHRcdGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcih0aGlzLmtpbmQpXG5cdFx0fVxuXHR9LFxuXG5cdFVubGVzc0RvKCkge1xuXHRcdHJldHVybiBJZlN0YXRlbWVudChVbmFyeUV4cHJlc3Npb24oJyEnLCBtYXliZUJvb2xXcmFwKHQwKHRoaXMudGVzdCkpKSwgdDAodGhpcy5yZXN1bHQpKVxuXHR9LFxuXG5cdFlpZWxkKCkgeyByZXR1cm4geWllbGRFeHByZXNzaW9uTm9EZWxlZ2F0ZSh0MCh0aGlzLnlpZWxkZWQpKSB9LFxuXG5cdFlpZWxkVG8oKSB7IHJldHVybiB5aWVsZEV4cHJlc3Npb25EZWxlZ2F0ZSh0MCh0aGlzLnlpZWxkZWRUbykpIH1cbn0pXG5cbmZ1bmN0aW9uIGNhc2VQYXJ0KGFsdGVybmF0ZSkge1xuXHRpZiAodGhpcy50ZXN0IGluc3RhbmNlb2YgUGF0dGVybikge1xuXHRcdGNvbnN0IHsgdHlwZSwgcGF0dGVybmVkLCBsb2NhbHMgfSA9IHRoaXMudGVzdFxuXHRcdGNvbnN0IGRlY2wgPSB2YXJpYWJsZURlY2xhcmF0aW9uQ29uc3QoW1xuXHRcdFx0VmFyaWFibGVEZWNsYXJhdG9yKElkRXh0cmFjdCwgbXNFeHRyYWN0KHQwKHR5cGUpLCB0MChwYXR0ZXJuZWQpKSkgXSlcblx0XHRjb25zdCB0ZXN0ID0gQmluYXJ5RXhwcmVzc2lvbignIT09JywgSWRFeHRyYWN0LCBMaXROdWxsKVxuXHRcdGNvbnN0IGV4dHJhY3QgPSB2YXJpYWJsZURlY2xhcmF0aW9uQ29uc3QobG9jYWxzLm1hcCgoXywgaWR4KSA9PlxuXHRcdFx0VmFyaWFibGVEZWNsYXJhdG9yKGlkRm9yRGVjbGFyZUNhY2hlZChfKSwgbWVtYmVyRXhwcmVzc2lvbihJZEV4dHJhY3QsIExpdGVyYWwoaWR4KSkpKSlcblx0XHRjb25zdCByZXMgPSB0MSh0aGlzLnJlc3VsdCwgZXh0cmFjdClcblx0XHRyZXR1cm4gQmxvY2tTdGF0ZW1lbnQoWyBkZWNsLCBJZlN0YXRlbWVudCh0ZXN0LCByZXMsIGFsdGVybmF0ZSkgXSlcblx0fSBlbHNlXG5cdFx0Ly8gYWx0ZXJuYXRlIHdyaXR0ZW4gdG8gYnkgYGNhc2VCb2R5YC5cblx0XHRyZXR1cm4gSWZTdGF0ZW1lbnQobWF5YmVCb29sV3JhcCh0MCh0aGlzLnRlc3QpKSwgdDAodGhpcy5yZXN1bHQpLCBhbHRlcm5hdGUpXG59XG5cbi8vIEZ1bmN0aW9ucyBzcGVjaWZpYyB0byBjZXJ0YWluIGV4cHJlc3Npb25zLlxuY29uc3Rcblx0YmxvY2tXcmFwID0gKF8sIGJsb2NrKSA9PiB7XG5cdFx0Y29uc3QgaW52b2tlID0gY2FsbEV4cHJlc3Npb25UaHVuayhmdW5jdGlvbkV4cHJlc3Npb25UaHVuayhibG9jaywgaXNJbkdlbmVyYXRvcikpXG5cdFx0cmV0dXJuIGlzSW5HZW5lcmF0b3IgPyB5aWVsZEV4cHJlc3Npb25EZWxlZ2F0ZShpbnZva2UpIDogaW52b2tlXG5cdH0sXG5cblx0Y2FzZUJvZHkgPSAocGFydHMsIG9wRWxzZSkgPT4ge1xuXHRcdGxldCBhY2MgPSBpZkVsc2Uob3BFbHNlLCB0MCwgKCkgPT4gdGhyb3dFcnJvcignTm8gYnJhbmNoIG9mIGBjYXNlYCBtYXRjaGVzLicpKVxuXHRcdGZvciAobGV0IGkgPSBwYXJ0cy5sZW5ndGggLSAxOyBpID49IDA7IGkgPSBpIC0gMSlcblx0XHRcdGFjYyA9IHQxKHBhcnRzW2ldLCBhY2MpXG5cdFx0cmV0dXJuIGFjY1xuXHR9LFxuXG5cdGxvb3BJZCA9IGxvb3AgPT4gaWRDYWNoZWQoYGxvb3Ake2xvb3AubG9jLnN0YXJ0LmxpbmV9YCksXG5cblx0dHJhbnNwaWxlQmxvY2sgPSAocmV0dXJuZWQsIGxpbmVzLCBsZWFkID0gbnVsbCwgb3BSZXNEZWNsYXJlID0gbnVsbCwgb3BPdXQgPSBudWxsKSA9PiB7XG5cdFx0Y29uc3QgZmluID0gaWZFbHNlKG9wUmVzRGVjbGFyZSxcblx0XHRcdHJkID0+IHtcblx0XHRcdFx0Y29uc3QgcmV0ID0gbWF5YmVXcmFwSW5DaGVja0NvbnRhaW5zKHJldHVybmVkLCByZC5vcFR5cGUsIHJkLm5hbWUpXG5cdFx0XHRcdHJldHVybiBpZkVsc2Uob3BPdXQsXG5cdFx0XHRcdFx0XyA9PiBjYXQoZGVjbGFyZShyZCwgcmV0KSwgXywgUmV0dXJuUmVzKSxcblx0XHRcdFx0XHQoKSA9PiBSZXR1cm5TdGF0ZW1lbnQocmV0KSlcblx0XHRcdH0sXG5cdFx0XHQoKSA9PiBjYXQob3BPdXQsIFJldHVyblN0YXRlbWVudChyZXR1cm5lZCkpKVxuXHRcdHJldHVybiBCbG9ja1N0YXRlbWVudChjYXQobGVhZCwgdExpbmVzKGxpbmVzKSwgZmluKSlcblx0fVxuXG4vLyBNb2R1bGUgaGVscGVyc1xuY29uc3Rcblx0YW1kV3JhcE1vZHVsZSA9IChkb1VzZXMsIG90aGVyVXNlcywgYm9keSkgPT4ge1xuXHRcdGNvbnN0IGFsbFVzZXMgPSBkb1VzZXMuY29uY2F0KG90aGVyVXNlcylcblx0XHRjb25zdCB1c2VQYXRocyA9IEFycmF5RXhwcmVzc2lvbihjYXQoXG5cdFx0XHRMaXRTdHJFeHBvcnRzLFxuXHRcdFx0YWxsVXNlcy5tYXAoXyA9PiBMaXRlcmFsKG1hbmdsZVBhdGgoXy5wYXRoKSkpKSlcblx0XHRjb25zdCB1c2VJZGVudGlmaWVycyA9IGFsbFVzZXMubWFwKChfLCBpKSA9PiBpZENhY2hlZChgJHtwYXRoQmFzZU5hbWUoXy5wYXRoKX1fJHtpfWApKVxuXHRcdGNvbnN0IHVzZUFyZ3MgPSBjYXQoSWRFeHBvcnRzLCB1c2VJZGVudGlmaWVycylcblx0XHRjb25zdCB1c2VEb3MgPSBkb1VzZXMubWFwKCh1c2UsIGkpID0+XG5cdFx0XHRsb2MoRXhwcmVzc2lvblN0YXRlbWVudChtc0dldE1vZHVsZSh1c2VJZGVudGlmaWVyc1tpXSkpLCB1c2UubG9jKSlcblx0XHRjb25zdCBvcFVzZURlY2xhcmUgPSBvcElmKCFpc0VtcHR5KG90aGVyVXNlcyksXG5cdFx0XHQoKSA9PiBWYXJpYWJsZURlY2xhcmF0aW9uKCdjb25zdCcsIGZsYXRNYXAob3RoZXJVc2VzLCAodXNlLCBpKSA9PlxuXHRcdFx0XHR1c2VEZWNsYXJhdG9ycyh1c2UsIHVzZUlkZW50aWZpZXJzW2kgKyBkb1VzZXMubGVuZ3RoXSkpKSlcblx0XHRjb25zdCBmdWxsQm9keSA9IEJsb2NrU3RhdGVtZW50KGNhdCh1c2VEb3MsIG9wVXNlRGVjbGFyZSwgYm9keSwgUmV0dXJuRXhwb3J0cykpXG5cdFx0Y29uc3QgbGF6eUJvZHkgPVxuXHRcdFx0Y3gub3B0cy5sYXp5TW9kdWxlKCkgP1xuXHRcdFx0XHRCbG9ja1N0YXRlbWVudChbIEV4cHJlc3Npb25TdGF0ZW1lbnQoXG5cdFx0XHRcdFx0YXNzaWdubWVudEV4cHJlc3Npb25QbGFpbihFeHBvcnRzR2V0LFxuXHRcdFx0XHRcdFx0bXNMYXp5KGZ1bmN0aW9uRXhwcmVzc2lvblRodW5rKGZ1bGxCb2R5KSkpKSBdKSA6XG5cdFx0XHRcdGZ1bGxCb2R5XG5cdFx0cmV0dXJuIENhbGxFeHByZXNzaW9uKElkRGVmaW5lLCBbIHVzZVBhdGhzLCBmdW5jdGlvbkV4cHJlc3Npb25QbGFpbih1c2VBcmdzLCBsYXp5Qm9keSkgXSlcblx0fSxcblxuXHRwYXRoQmFzZU5hbWUgPSBwYXRoID0+XG5cdFx0cGF0aC5zdWJzdHIocGF0aC5sYXN0SW5kZXhPZignLycpICsgMSksXG5cblx0dXNlRGVjbGFyYXRvcnMgPSAodXNlLCBtb2R1bGVJZGVudGlmaWVyKSA9PiB7XG5cdFx0Ly8gVE9ETzogQ291bGQgYmUgbmVhdGVyIGFib3V0IHRoaXNcblx0XHRjb25zdCBpc0xhenkgPSAoaXNFbXB0eSh1c2UudXNlZCkgPyB1c2Uub3BVc2VEZWZhdWx0IDogdXNlLnVzZWRbMF0pLmlzTGF6eSgpXG5cdFx0Y29uc3QgdmFsdWUgPSAoaXNMYXp5ID8gbXNMYXp5R2V0TW9kdWxlIDogbXNHZXRNb2R1bGUpKG1vZHVsZUlkZW50aWZpZXIpXG5cblx0XHRjb25zdCB1c2VkRGVmYXVsdCA9IG9wTWFwKHVzZS5vcFVzZURlZmF1bHQsIGRlZiA9PiB7XG5cdFx0XHRjb25zdCBkZWZleHAgPSBtc0dldERlZmF1bHRFeHBvcnQobW9kdWxlSWRlbnRpZmllcilcblx0XHRcdGNvbnN0IHZhbCA9IGlzTGF6eSA/IGxhenlXcmFwKGRlZmV4cCkgOiBkZWZleHBcblx0XHRcdHJldHVybiBsb2MoVmFyaWFibGVEZWNsYXJhdG9yKGlkRm9yRGVjbGFyZUNhY2hlZChkZWYpLCB2YWwpLCBkZWYubG9jKVxuXHRcdH0pXG5cblx0XHRjb25zdCB1c2VkRGVzdHJ1Y3QgPSBpc0VtcHR5KHVzZS51c2VkKSA/IG51bGwgOlxuXHRcdFx0bWFrZURlc3RydWN0dXJlRGVjbGFyYXRvcnModXNlLnVzZWQsIGlzTGF6eSwgdmFsdWUsIHRydWUsIGZhbHNlKVxuXG5cdFx0cmV0dXJuIGNhdCh1c2VkRGVmYXVsdCwgdXNlZERlc3RydWN0KVxuXHR9XG5cbi8vIEdlbmVyYWwgdXRpbHMuIE5vdCBpbiB1dGlsLmpzIGJlY2F1c2UgdGhlc2UgY2xvc2Ugb3ZlciBjeC5cbmNvbnN0XG5cdG1heWJlQm9vbFdyYXAgPSBhc3QgPT5cblx0XHRjeC5vcHRzLmluY2x1ZGVDYXNlQ2hlY2tzKCkgPyBtc0Jvb2woYXN0KSA6IGFzdCxcblxuXHRtYWtlRGVzdHJ1Y3R1cmVEZWNsYXJhdG9ycyA9IChhc3NpZ25lZXMsIGlzTGF6eSwgdmFsdWUsIGlzTW9kdWxlLCBpc0V4cG9ydCkgPT4ge1xuXHRcdGNvbnN0IGRlc3RydWN0dXJlZE5hbWUgPSBgXyQke2Fzc2lnbmVlc1swXS5sb2Muc3RhcnQubGluZX1gXG5cdFx0Y29uc3QgaWREZXN0cnVjdHVyZWQgPSBJZGVudGlmaWVyKGRlc3RydWN0dXJlZE5hbWUpXG5cdFx0Y29uc3QgZGVjbGFyYXRvcnMgPSBhc3NpZ25lZXMubWFwKGFzc2lnbmVlID0+IHtcblx0XHRcdC8vIFRPRE86IERvbid0IGNvbXBpbGUgaXQgaWYgaXQncyBuZXZlciBhY2Nlc3NlZFxuXHRcdFx0Y29uc3QgZ2V0ID0gZ2V0TWVtYmVyKGlkRGVzdHJ1Y3R1cmVkLCBhc3NpZ25lZS5uYW1lLCBpc0xhenksIGlzTW9kdWxlKVxuXHRcdFx0cmV0dXJuIG1ha2VEZWNsYXJhdG9yKGFzc2lnbmVlLCBnZXQsIGlzTGF6eSwgaXNFeHBvcnQpXG5cdFx0fSlcblx0XHQvLyBHZXR0aW5nIGxhenkgbW9kdWxlIGlzIGRvbmUgYnkgbXMubGF6eUdldE1vZHVsZS5cblx0XHRjb25zdCB2YWwgPSAoaXNMYXp5ICYmICFpc01vZHVsZSkgPyBsYXp5V3JhcCh2YWx1ZSkgOiB2YWx1ZVxuXHRcdHJldHVybiB1bnNoaWZ0KFZhcmlhYmxlRGVjbGFyYXRvcihpZERlc3RydWN0dXJlZCwgdmFsKSwgZGVjbGFyYXRvcnMpXG5cdH0sXG5cblx0bWFrZURlY2xhcmF0b3IgPSAoYXNzaWduZWUsIHZhbHVlLCB2YWx1ZUlzQWxyZWFkeUxhenksIGlzRXhwb3J0KSA9PiB7XG5cdFx0Y29uc3QgeyBsb2MsIG5hbWUsIG9wVHlwZSB9ID0gYXNzaWduZWVcblx0XHRjb25zdCBpc0xhenkgPSBhc3NpZ25lZS5pc0xhenkoKVxuXHRcdC8vIFRPRE86IGFzc2VydChhc3NpZ25lZS5vcFR5cGUgPT09IG51bGwpXG5cdFx0Ly8gb3IgVE9ETzogQWxsb3cgdHlwZSBjaGVjayBvbiBsYXp5IHZhbHVlP1xuXHRcdHZhbHVlID0gaXNMYXp5ID8gdmFsdWUgOiBtYXliZVdyYXBJbkNoZWNrQ29udGFpbnModmFsdWUsIG9wVHlwZSwgbmFtZSlcblx0XHRpZiAoaXNFeHBvcnQpIHtcblx0XHRcdC8vIFRPRE86RVM2XG5cdFx0XHRjeC5jaGVjayghaXNMYXp5LCBsb2MsICdMYXp5IGV4cG9ydCBub3Qgc3VwcG9ydGVkLicpXG5cdFx0XHRyZXR1cm4gVmFyaWFibGVEZWNsYXJhdG9yKFxuXHRcdFx0XHRpZEZvckRlY2xhcmVDYWNoZWQoYXNzaWduZWUpLFxuXHRcdFx0XHRhc3NpZ25tZW50RXhwcmVzc2lvblBsYWluKG1lbWJlcihJZEV4cG9ydHMsIG5hbWUpLCB2YWx1ZSkpXG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IHZhbCA9IGlzTGF6eSAmJiAhdmFsdWVJc0FscmVhZHlMYXp5ID8gbGF6eVdyYXAodmFsdWUpIDogdmFsdWVcblx0XHRcdGFzc2VydChpc0xhenkgfHwgIXZhbHVlSXNBbHJlYWR5TGF6eSlcblx0XHRcdHJldHVybiBWYXJpYWJsZURlY2xhcmF0b3IoaWRGb3JEZWNsYXJlQ2FjaGVkKGFzc2lnbmVlKSwgdmFsKVxuXHRcdH1cblx0fSxcblxuXHRtYXliZVdyYXBJbkNoZWNrQ29udGFpbnMgPSAoYXN0LCBvcFR5cGUsIG5hbWUpID0+XG5cdFx0KGN4Lm9wdHMuaW5jbHVkZVR5cGVDaGVja3MoKSAmJiBvcFR5cGUgIT09IG51bGwpID9cblx0XHRcdG1zQ2hlY2tDb250YWlucyh0MChvcFR5cGUpLCBhc3QsIExpdGVyYWwobmFtZSkpIDpcblx0XHRcdGFzdCxcblxuXHRnZXRNZW1iZXIgPSAoYXN0T2JqZWN0LCBnb3ROYW1lLCBpc0xhenksIGlzTW9kdWxlKSA9PlxuXHRcdGlzTGF6eSA/XG5cdFx0bXNMYXp5R2V0KGFzdE9iamVjdCwgTGl0ZXJhbChnb3ROYW1lKSkgOlxuXHRcdGlzTW9kdWxlICYmIGN4Lm9wdHMuaW5jbHVkZVVzZUNoZWNrcygpID9cblx0XHRtc0dldChhc3RPYmplY3QsIExpdGVyYWwoZ290TmFtZSkpIDpcblx0XHRtZW1iZXIoYXN0T2JqZWN0LCBnb3ROYW1lKVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=