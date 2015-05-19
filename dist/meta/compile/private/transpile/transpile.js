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

		BreakDo: function () {
			return (0, _esastDistAst.BreakStatement)();
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

		MapEntry: function () {
			const index = vr.listMapEntryIndex(this);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS90cmFuc3BpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2tCQTRCd0IsU0FBUzs7Ozs7Ozs7OztBQUZqQyxLQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsYUFBYSxDQUFBOztBQUVWLFVBQVMsU0FBUyxDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRSxHQUFHLEVBQUU7QUFDN0QsSUFBRSxHQUFHLEdBQUcsQ0FBQTtBQUNSLElBQUUsR0FBRyxHQUFHLENBQUE7QUFDUixlQUFhLEdBQUcsS0FBSyxDQUFBO0FBQ3JCLFFBQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBOztBQUVoQyxJQUFFLEdBQUcsRUFBRSxHQUFHLFNBQVMsQ0FBQTtBQUNuQixTQUFPLEdBQUcsQ0FBQTtFQUNWOztBQUVELE9BQ0MsRUFBRSxHQUFHLFVBQUEsSUFBSTtTQUFJLG1CQWxDSyxHQUFHLEVBa0NKLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUM7RUFBQTtPQUNuRCxFQUFFLEdBQUcsVUFBQyxJQUFJLEVBQUUsR0FBRztTQUFLLG1CQW5DRixHQUFHLEVBbUNHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDO0VBQUE7T0FDN0QsRUFBRSxHQUFHLFVBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSTtTQUFLLG1CQXBDZCxHQUFHLEVBb0NlLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUM7RUFBQTtPQUNyRixNQUFNLEdBQUcsVUFBQSxLQUFLLEVBQUk7QUFDakIsUUFBTSxHQUFHLEdBQUcsRUFBRyxDQUFBO0FBQ2YsT0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUksRUFBSTtBQUNyQixTQUFN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L2NvbXBpbGUvcHJpdmF0ZS90cmFuc3BpbGUvdHJhbnNwaWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXJyYXlFeHByZXNzaW9uLCBCaW5hcnlFeHByZXNzaW9uLCBCbG9ja1N0YXRlbWVudCwgQnJlYWtTdGF0ZW1lbnQsIENhbGxFeHByZXNzaW9uLFxuXHREZWJ1Z2dlclN0YXRlbWVudCwgRXhwcmVzc2lvblN0YXRlbWVudCwgRm9yT2ZTdGF0ZW1lbnQsIEZ1bmN0aW9uRXhwcmVzc2lvbiwgSWRlbnRpZmllcixcblx0SWZTdGF0ZW1lbnQsIExpdGVyYWwsIE1lbWJlckV4cHJlc3Npb24sIE9iamVjdEV4cHJlc3Npb24sIFByb2dyYW0sIFJldHVyblN0YXRlbWVudCxcblx0VGhpc0V4cHJlc3Npb24sIFZhcmlhYmxlRGVjbGFyYXRpb24sIFVuYXJ5RXhwcmVzc2lvbiwgVmFyaWFibGVEZWNsYXJhdG9yLCBSZXR1cm5TdGF0ZW1lbnRcblx0fSBmcm9tICdlc2FzdC9kaXN0L2FzdCdcbmltcG9ydCB7IGlkQ2FjaGVkLCBsb2MsIG1lbWJlciwgcHJvcGVydHlJZE9yTGl0ZXJhbENhY2hlZCwgdGh1bmssIHRvU3RhdGVtZW50XG5cdH0gZnJvbSAnZXNhc3QvZGlzdC91dGlsJ1xuaW1wb3J0IHsgYXNzaWdubWVudEV4cHJlc3Npb25QbGFpbiwgY2FsbEV4cHJlc3Npb25UaHVuaywgZnVuY3Rpb25FeHByZXNzaW9uUGxhaW4sXG5cdGZ1bmN0aW9uRXhwcmVzc2lvblRodW5rLCBtZW1iZXJFeHByZXNzaW9uLCBwcm9wZXJ0eSxcblx0eWllbGRFeHByZXNzaW9uRGVsZWdhdGUsIHlpZWxkRXhwcmVzc2lvbk5vRGVsZWdhdGUgfSBmcm9tICdlc2FzdC9kaXN0L3NwZWNpYWxpemUnXG5pbXBvcnQgKiBhcyBFRXhwb3J0cyBmcm9tICcuLi8uLi9FeHByZXNzaW9uJ1xuaW1wb3J0IHsgTERfTGF6eSwgTERfTXV0YWJsZSwgUGF0dGVybiwgU3BsYXQsIFNEX0RlYnVnZ2VyLCBTVl9Db250YWlucywgU1ZfRmFsc2UsIFNWX051bGwsIFNWX1N1Yixcblx0U1ZfVGhpcywgU1ZfVGhpc01vZHVsZURpcmVjdG9yeSwgU1ZfVHJ1ZSwgU1ZfVW5kZWZpbmVkIH0gZnJvbSAnLi4vLi4vRXhwcmVzc2lvbidcbmltcG9ydCBtYW5nbGVQYXRoIGZyb20gJy4uL21hbmdsZVBhdGgnXG5pbXBvcnQgeyBhc3NlcnQsIGNhdCwgZmxhdE1hcCwgZmxhdE9wTWFwLCBpZkVsc2UsIGlzRW1wdHksXG5cdGltcGxlbWVudE1hbnksIGlzUG9zaXRpdmUsIG9wSWYsIG9wTWFwLCByYW5nZSwgdGFpbCwgdW5zaGlmdCB9IGZyb20gJy4uL3V0aWwnXG5pbXBvcnQgeyBBbWRlZmluZUhlYWRlciwgQXJyYXlTbGljZUNhbGwsIEV4cG9ydHNEZWZhdWx0LCBFeHBvcnRzR2V0LCBJZEFyZ3VtZW50cywgSWREZWZpbmUsXG5cdElkRXhwb3J0cywgSWRFeHRyYWN0LCBJZEZ1bmN0aW9uQXBwbHlDYWxsLCBJZE5hbWUsIExpdEVtcHR5QXJyYXksIExpdEVtcHR5U3RyaW5nLCBMaXROdWxsLFxuXHRMaXRTdHJFeHBvcnRzLCBMaXRTdHJOYW1lLCBMaXRaZXJvLCBSZXR1cm5FeHBvcnRzLCBSZXR1cm5SZXMsIFN5bWJvbEl0ZXJhdG9yLCBVc2VTdHJpY3Rcblx0fSBmcm9tICcuL2FzdC1jb25zdGFudHMnXG5pbXBvcnQgeyBJZE1zLCBsYXp5V3JhcCwgbXNBcnIsIG1zQm9vbCwgbXNDaGVja0NvbnRhaW5zLCBtc0V4dHJhY3QsIG1zR2V0LCBtc0dldERlZmF1bHRFeHBvcnQsXG5cdG1zR2V0TW9kdWxlLCBtc0xhenksIG1zTGF6eUdldCwgbXNMYXp5R2V0TW9kdWxlLCBtc0xzZXQsIG1zTWFwLCBtc1NldCwgbXNTaG93XG5cdH0gZnJvbSAnLi9tcy1jYWxsJ1xuaW1wb3J0IHsgYWNjZXNzTG9jYWxEZWNsYXJlLCBkZWNsYXJlLCBkZWNsYXJlU3BlY2lhbCxcblx0aWRGb3JEZWNsYXJlQ2FjaGVkLCB0aHJvd0Vycm9yLCB3aGlsZVN0YXRlbWVudEluZmluaXRlIH0gZnJvbSAnLi91dGlsJ1xuXG5sZXQgY3gsIHZyLCBpc0luR2VuZXJhdG9yXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRyYW5zcGlsZShfY3gsIG1vZHVsZUV4cHJlc3Npb24sIF92cikge1xuXHRjeCA9IF9jeFxuXHR2ciA9IF92clxuXHRpc0luR2VuZXJhdG9yID0gZmFsc2Vcblx0Y29uc3QgcmVzID0gdDAobW9kdWxlRXhwcmVzc2lvbilcblx0Ly8gUmVsZWFzZSBmb3IgZ2FyYmFnZSBjb2xsZWN0aW9uXG5cdGN4ID0gdnIgPSB1bmRlZmluZWRcblx0cmV0dXJuIHJlc1xufVxuXG5jb25zdFxuXHR0MCA9IGV4cHIgPT4gbG9jKGV4cHIudHJhbnNwaWxlU3VidHJlZSgpLCBleHByLmxvYyksXG5cdHQxID0gKGV4cHIsIGFyZykgPT4gbG9jKGV4cHIudHJhbnNwaWxlU3VidHJlZShhcmcpLCBleHByLmxvYyksXG5cdHQzID0gKGV4cHIsIGFyZywgYXJnMiwgYXJnMykgPT4gbG9jKGV4cHIudHJhbnNwaWxlU3VidHJlZShhcmcsIGFyZzIsIGFyZzMpLCBleHByLmxvYyksXG5cdHRMaW5lcyA9IGV4cHJzID0+IHtcblx0XHRjb25zdCBvdXQgPSBbIF1cblx0XHRleHBycy5mb3JFYWNoKGV4cHIgPT4ge1xuXHRcdFx0Y29uc3QgYXN0ID0gZXhwci50cmFuc3BpbGVTdWJ0cmVlKClcblx0XHRcdGlmIChhc3QgaW5zdGFuY2VvZiBBcnJheSlcblx0XHRcdFx0Ly8gRGVidWcgbWF5IHByb2R1Y2UgbXVsdGlwbGUgc3RhdGVtZW50cy5cblx0XHRcdFx0YXN0LmZvckVhY2goXyA9PiBvdXQucHVzaCh0b1N0YXRlbWVudChfKSkpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdG91dC5wdXNoKGxvYyh0b1N0YXRlbWVudChhc3QpLCBleHByLmxvYykpXG5cdFx0fSlcblx0XHRyZXR1cm4gb3V0XG5cdH1cblxuaW1wbGVtZW50TWFueShFRXhwb3J0cywgJ3RyYW5zcGlsZVN1YnRyZWUnLCB7XG5cdEFzc2lnbigpIHtcblx0XHRyZXR1cm4gVmFyaWFibGVEZWNsYXJhdGlvbihcblx0XHRcdHRoaXMuYXNzaWduZWUuaXNNdXRhYmxlKCkgPyAnbGV0JyA6ICdjb25zdCcsXG5cdFx0XHRbIG1ha2VEZWNsYXJhdG9yKHRoaXMuYXNzaWduZWUsIHQwKHRoaXMudmFsdWUpLCBmYWxzZSwgdnIuaXNFeHBvcnRBc3NpZ24odGhpcykpIF0pXG5cdH0sXG5cdC8vIFRPRE86RVM2IEp1c3QgdXNlIG5hdGl2ZSBkZXN0cnVjdHVyaW5nIGFzc2lnblxuXHRBc3NpZ25EZXN0cnVjdHVyZSgpIHtcblx0XHRyZXR1cm4gVmFyaWFibGVEZWNsYXJhdGlvbih0aGlzLmtpbmQoKSA9PT0gTERfTXV0YWJsZSA/ICdsZXQnIDogJ2NvbnN0Jyxcblx0XHRcdG1ha2VEZXN0cnVjdHVyZURlY2xhcmF0b3JzKFxuXHRcdFx0XHR0aGlzLmFzc2lnbmVlcyxcblx0XHRcdFx0dGhpcy5raW5kKCkgPT09IExEX0xhenksXG5cdFx0XHRcdHQwKHRoaXMudmFsdWUpLFxuXHRcdFx0XHRmYWxzZSxcblx0XHRcdFx0dnIuaXNFeHBvcnRBc3NpZ24odGhpcykpKVxuXHR9LFxuXG5cdEFzc2lnbk11dGF0ZSgpIHtcblx0XHRyZXR1cm4gYXNzaWdubWVudEV4cHJlc3Npb25QbGFpbihpZENhY2hlZCh0aGlzLm5hbWUpLCB0MCh0aGlzLnZhbHVlKSlcblx0fSxcblxuXHRCYWdFbnRyeSgpIHsgcmV0dXJuIGRlY2xhcmVTcGVjaWFsKGBfJHt2ci5saXN0TWFwRW50cnlJbmRleCh0aGlzKX1gLCB0MCh0aGlzLnZhbHVlKSkgfSxcblxuXHRCYWdTaW1wbGUoKSB7IHJldHVybiBBcnJheUV4cHJlc3Npb24odGhpcy5wYXJ0cy5tYXAodDApKSB9LFxuXG5cdEJsb2NrRG8obGVhZCA9IG51bGwsIG9wUmVzRGVjbGFyZSA9IG51bGwsIG9wT3V0ID0gbnVsbCkge1xuXHRcdGFzc2VydChvcFJlc0RlY2xhcmUgPT09IG51bGwpXG5cdFx0cmV0dXJuIEJsb2NrU3RhdGVtZW50KGNhdChsZWFkLCB0TGluZXModGhpcy5saW5lcyksIG9wT3V0KSlcblx0fSxcblxuXHRCbG9ja1dpdGhSZXR1cm4obGVhZCwgb3BSZXNEZWNsYXJlLCBvcE91dCkge1xuXHRcdHJldHVybiB0cmFuc3BpbGVCbG9jayh0MCh0aGlzLnJldHVybmVkKSwgdGhpcy5saW5lcywgbGVhZCwgb3BSZXNEZWNsYXJlLCBvcE91dClcblx0fSxcblxuXHRCbG9ja09iaihsZWFkLCBvcFJlc0RlY2xhcmUsIG9wT3V0KSB7XG5cdFx0Ly8gVE9ETzogaW5jbHVkZVR5cGVDaGVja3MoKSBpcyBub3QgdGhlIHJpZ2h0IG1ldGhvZCBmb3IgdGhpc1xuXHRcdGNvbnN0IGtleXMgPVxuXHRcdFx0Y3gub3B0cy5pbmNsdWRlVHlwZUNoZWNrcygpID8gdGhpcy5rZXlzIDogdGhpcy5rZXlzLmZpbHRlcihfID0+ICF2ci5pc0RlYnVnTG9jYWwoXykpXG5cdFx0Y29uc3QgcmV0ID0gaWZFbHNlKHRoaXMub3BPYmplZCxcblx0XHRcdF8gPT4ge1xuXHRcdFx0XHRjb25zdCBvYmplZCA9IHQwKF8pXG5cdFx0XHRcdGNvbnN0IGtleXNWYWxzID0gY2F0KFxuXHRcdFx0XHRcdGZsYXRNYXAoa2V5cywga2V5ID0+IFsgTGl0ZXJhbChrZXkubmFtZSksIGFjY2Vzc0xvY2FsRGVjbGFyZShrZXkpIF0pLFxuXHRcdFx0XHRcdG9wTWFwKHRoaXMub3BOYW1lLCBfID0+IFsgTGl0U3RyTmFtZSwgTGl0ZXJhbChfKSBdKSlcblx0XHRcdFx0Y29uc3QgYW55TGF6eSA9IGtleXMuc29tZShfID0+IF8uaXNMYXp5KCkpXG5cdFx0XHRcdHJldHVybiAoYW55TGF6eSA/IG1zTHNldCA6IG1zU2V0KShvYmplZCwgLi4ua2V5c1ZhbHMpXG5cdFx0XHR9LFxuXHRcdFx0KCkgPT4ge1xuXHRcdFx0XHRjb25zdCBwcm9wcyA9IGtleXMubWFwKGtleSA9PiB7XG5cdFx0XHRcdFx0Y29uc3QgdmFsID0gYWNjZXNzTG9jYWxEZWNsYXJlKGtleSlcblx0XHRcdFx0XHRjb25zdCBpZCA9IHByb3BlcnR5SWRPckxpdGVyYWxDYWNoZWQoa2V5Lm5hbWUpXG5cdFx0XHRcdFx0cmV0dXJuIGtleS5pc0xhenkoKSA/XG5cdFx0XHRcdFx0XHRwcm9wZXJ0eSgnZ2V0JywgaWQsIHRodW5rKHZhbCkpIDpcblx0XHRcdFx0XHRcdHByb3BlcnR5KCdpbml0JywgaWQsIHZhbClcblx0XHRcdFx0fSlcblx0XHRcdFx0Y29uc3Qgb3BQcm9wTmFtZSA9IG9wTWFwKHRoaXMub3BOYW1lLCBfID0+IHByb3BlcnR5KCdpbml0JywgSWROYW1lLCBMaXRlcmFsKF8pKSlcblx0XHRcdFx0cmV0dXJuIE9iamVjdEV4cHJlc3Npb24oY2F0KHByb3BzLCBvcFByb3BOYW1lKSlcblx0XHRcdH0pXG5cdFx0cmV0dXJuIHRyYW5zcGlsZUJsb2NrKHJldCwgdGhpcy5saW5lcywgbGVhZCwgb3BSZXNEZWNsYXJlLCBvcE91dClcblx0fSxcblxuXHRCbG9ja0JhZyhsZWFkLCBvcFJlc0RlY2xhcmUsIG9wT3V0KSB7XG5cdFx0Y29uc3QgbGVuZ3RoID0gdnIubGlzdE1hcExlbmd0aCh0aGlzKVxuXHRcdHJldHVybiB0cmFuc3BpbGVCbG9jayhcblx0XHRcdEFycmF5RXhwcmVzc2lvbihyYW5nZShsZW5ndGgpLm1hcChpID0+IGlkQ2FjaGVkKGBfJHtpfWApKSksXG5cdFx0XHR0aGlzLmxpbmVzLCBsZWFkLCBvcFJlc0RlY2xhcmUsIG9wT3V0KVxuXHR9LFxuXG5cdEJsb2NrTWFwKGxlYWQsIG9wUmVzRGVjbGFyZSwgb3BPdXQpIHtcblx0XHRjb25zdCBsZW5ndGggPSB2ci5saXN0TWFwTGVuZ3RoKHRoaXMpXG5cdFx0cmV0dXJuIHRyYW5zcGlsZUJsb2NrKFxuXHRcdFx0bXNNYXAoLi4uZmxhdE1hcChyYW5nZShsZW5ndGgpLCBpID0+XG5cdFx0XHRcdFsgaWRDYWNoZWQoYF9rJHtpfWApLCBpZENhY2hlZChgX3Yke2l9YCkgXSkpLFxuXHRcdFx0dGhpcy5saW5lcywgbGVhZCwgb3BSZXNEZWNsYXJlLCBvcE91dClcblx0fSxcblxuXHRCbG9ja1dyYXAoKSB7IHJldHVybiBibG9ja1dyYXAodGhpcywgdDAodGhpcy5ibG9jaykpIH0sXG5cblx0QnJlYWtEbygpIHsgcmV0dXJuIEJyZWFrU3RhdGVtZW50KCkgfSxcblxuXHRDYWxsKCkge1xuXHRcdGNvbnN0IGFueVNwbGF0ID0gdGhpcy5hcmdzLnNvbWUoYXJnID0+IGFyZyBpbnN0YW5jZW9mIFNwbGF0KVxuXHRcdGlmIChhbnlTcGxhdCkge1xuXHRcdFx0Y29uc3QgYXJncyA9IHRoaXMuYXJncy5tYXAoYXJnID0+XG5cdFx0XHRcdGFyZyBpbnN0YW5jZW9mIFNwbGF0ID9cblx0XHRcdFx0XHRtc0Fycih0MChhcmcuc3BsYXR0ZWQpKSA6XG5cdFx0XHRcdFx0dDAoYXJnKSlcblx0XHRcdHJldHVybiBDYWxsRXhwcmVzc2lvbihJZEZ1bmN0aW9uQXBwbHlDYWxsLCBbXG5cdFx0XHRcdHQwKHRoaXMuY2FsbGVkKSxcblx0XHRcdFx0TGl0TnVsbCxcblx0XHRcdFx0Q2FsbEV4cHJlc3Npb24obWVtYmVyKExpdEVtcHR5QXJyYXksICdjb25jYXQnKSwgYXJncyldKVxuXHRcdH1cblx0XHRlbHNlIHJldHVybiBDYWxsRXhwcmVzc2lvbih0MCh0aGlzLmNhbGxlZCksIHRoaXMuYXJncy5tYXAodDApKVxuXHR9LFxuXG5cdENhc2VEbygpIHtcblx0XHRjb25zdCBib2R5ID0gY2FzZUJvZHkodGhpcy5wYXJ0cywgdGhpcy5vcEVsc2UpXG5cdFx0cmV0dXJuIGlmRWxzZSh0aGlzLm9wQ2FzZWQsIF8gPT4gQmxvY2tTdGF0ZW1lbnQoWyB0MChfKSwgYm9keSBdKSwgKCkgPT4gYm9keSlcblx0fSxcblxuXHRDYXNlVmFsKCkge1xuXHRcdGNvbnN0IGJvZHkgPSBjYXNlQm9keSh0aGlzLnBhcnRzLCB0aGlzLm9wRWxzZSlcblx0XHRjb25zdCBibG9jayA9IGlmRWxzZSh0aGlzLm9wQ2FzZWQsIF8gPT4gWyB0MChfKSwgYm9keSBdLCAoKSA9PiBbIGJvZHkgXSlcblx0XHRyZXR1cm4gYmxvY2tXcmFwKHRoaXMsIEJsb2NrU3RhdGVtZW50KGJsb2NrKSlcblx0fSxcblxuXHRDYXNlRG9QYXJ0OiBjYXNlUGFydCxcblx0Q2FzZVZhbFBhcnQ6IGNhc2VQYXJ0LFxuXHQvLyBUT0RPOiBpbmNsdWRlSW5vdXRDaGVja3MgaXMgbWlzbmFtZWRcblx0RGVidWcoKSB7IHJldHVybiBjeC5vcHRzLmluY2x1ZGVJbm91dENoZWNrcygpID8gdExpbmVzKHRoaXMubGluZXMpIDogWyBdIH0sXG5cblx0T2JqU2ltcGxlKCkge1xuXHRcdHJldHVybiBPYmplY3RFeHByZXNzaW9uKHRoaXMucGFpcnMubWFwKHBhaXIgPT5cblx0XHRcdHByb3BlcnR5KCdpbml0JywgcHJvcGVydHlJZE9yTGl0ZXJhbENhY2hlZChwYWlyLmtleSksIHQwKHBhaXIudmFsdWUpKSkpXG5cdH0sXG5cblx0Rm9yRG9QbGFpbigpIHtcblx0XHRyZXR1cm4gd2hpbGVTdGF0ZW1lbnRJbmZpbml0ZSh0MCh0aGlzLmJsb2NrKSlcblx0fSxcblxuXHRGb3JEb1dpdGhCYWcoKSB7XG5cdFx0Y29uc3QgZGVjbGFyZSA9IFZhcmlhYmxlRGVjbGFyYXRpb24oJ2xldCcsIFsgVmFyaWFibGVEZWNsYXJhdG9yKHQwKHRoaXMuZWxlbWVudCkpIF0pXG5cdFx0Ly8gVE9ETzpFUzYgc2hvdWxkbid0IGhhdmUgdG8gZXhwbGljaXRseSBnZXQgaXRlcmF0b3Jcblx0XHRjb25zdCBpdGVyID0gQ2FsbEV4cHJlc3Npb24oTWVtYmVyRXhwcmVzc2lvbih0MCh0aGlzLmJhZyksIFN5bWJvbEl0ZXJhdG9yLCB0cnVlKSwgWyBdKVxuXHRcdHJldHVybiBGb3JPZlN0YXRlbWVudChkZWNsYXJlLCBpdGVyLCB0MCh0aGlzLmJsb2NrKSlcblx0fSxcblxuXHRGdW4oKSB7XG5cdFx0Y29uc3Qgb2xkSW5HZW5lcmF0b3IgPSBpc0luR2VuZXJhdG9yXG5cdFx0aXNJbkdlbmVyYXRvciA9IHRoaXMuaXNHZW5lcmF0b3JcblxuXHRcdC8vIFRPRE86RVM2IHVzZSBgLi4uYGZcblx0XHRjb25zdCBuQXJncyA9IExpdGVyYWwodGhpcy5hcmdzLmxlbmd0aClcblx0XHRjb25zdCBvcERlY2xhcmVSZXN0ID0gb3BNYXAodGhpcy5vcFJlc3RBcmcsIHJlc3QgPT5cblx0XHRcdGRlY2xhcmUocmVzdCwgQ2FsbEV4cHJlc3Npb24oQXJyYXlTbGljZUNhbGwsIFtJZEFyZ3VtZW50cywgbkFyZ3NdKSkpXG5cdFx0Y29uc3QgYXJnQ2hlY2tzID1cblx0XHRcdG9wSWYoY3gub3B0cy5pbmNsdWRlVHlwZUNoZWNrcygpLCAoKSA9PlxuXHRcdFx0XHRmbGF0T3BNYXAodGhpcy5hcmdzLCBfID0+XG5cdFx0XHRcdFx0Ly8gVE9ETzogV2F5IHRvIHR5cGVjaGVjayBsYXppZXNcblx0XHRcdFx0XHRvcElmKCFfLmlzTGF6eSgpLCAoKSA9PlxuXHRcdFx0XHRcdFx0b3BNYXAoXy5vcFR5cGUsIHR5cGUgPT5cblx0XHRcdFx0XHRcdFx0RXhwcmVzc2lvblN0YXRlbWVudChtc0NoZWNrQ29udGFpbnMoXG5cdFx0XHRcdFx0XHRcdFx0dDAodHlwZSksXG5cdFx0XHRcdFx0XHRcdFx0YWNjZXNzTG9jYWxEZWNsYXJlKF8pLFxuXHRcdFx0XHRcdFx0XHRcdExpdGVyYWwoXy5uYW1lKSkpKSkpKVxuXG5cdFx0Y29uc3QgX2luID0gb3BNYXAodGhpcy5vcEluLCB0MClcblx0XHRjb25zdCBsZWFkID0gY2F0KG9wRGVjbGFyZVJlc3QsIGFyZ0NoZWNrcywgX2luKVxuXG5cdFx0Y29uc3QgX291dCA9IG9wTWFwKHRoaXMub3BPdXQsIHQwKVxuXHRcdGNvbnN0IGJvZHkgPSB0Myh0aGlzLmJsb2NrLCBsZWFkLCB0aGlzLm9wUmVzRGVjbGFyZSwgX291dClcblx0XHRjb25zdCBhcmdzID0gdGhpcy5hcmdzLm1hcCh0MClcblx0XHRpc0luR2VuZXJhdG9yID0gb2xkSW5HZW5lcmF0b3Jcblx0XHRjb25zdCBpZCA9IG9wTWFwKHRoaXMubmFtZSwgaWRDYWNoZWQpXG5cdFx0cmV0dXJuIEZ1bmN0aW9uRXhwcmVzc2lvbihpZCwgYXJncywgYm9keSwgdGhpcy5pc0dlbmVyYXRvcilcblx0fSxcblxuXHRMYXp5KCkgeyByZXR1cm4gbGF6eVdyYXAodDAodGhpcy52YWx1ZSkpIH0sXG5cblx0TnVtYmVyTGl0ZXJhbCgpIHtcblx0XHQvLyBOZWdhdGl2ZSBudW1iZXJzIGFyZSBub3QgcGFydCBvZiBFUyBzcGVjLlxuXHRcdC8vIGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi81LjEvI3NlYy03LjguM1xuXHRcdGNvbnN0IGxpdCA9IExpdGVyYWwoTWF0aC5hYnModGhpcy52YWx1ZSkpXG5cdFx0cmV0dXJuIGlzUG9zaXRpdmUodGhpcy52YWx1ZSkgPyBsaXQgOiBVbmFyeUV4cHJlc3Npb24oJy0nLCBsaXQpXG5cdH0sXG5cblx0R2xvYmFsQWNjZXNzKCkgeyByZXR1cm4gSWRlbnRpZmllcih0aGlzLm5hbWUpIH0sXG5cblx0SWZEbygpIHsgcmV0dXJuIElmU3RhdGVtZW50KG1heWJlQm9vbFdyYXAodDAodGhpcy50ZXN0KSksIHQwKHRoaXMucmVzdWx0KSkgfSxcblxuXHRMb2NhbEFjY2VzcygpIHsgcmV0dXJuIGFjY2Vzc0xvY2FsRGVjbGFyZSh2ci5hY2Nlc3NUb0xvY2FsLmdldCh0aGlzKSkgfSxcblxuXHRMb2NhbERlY2xhcmUoKSB7IHJldHVybiBpZEZvckRlY2xhcmVDYWNoZWQodGhpcykgfSxcblxuXHRNYXBFbnRyeSgpIHtcblx0XHRjb25zdCBpbmRleCA9IHZyLmxpc3RNYXBFbnRyeUluZGV4KHRoaXMpXG5cdFx0Y29uc3QgayA9IGBfayR7aW5kZXh9YFxuXHRcdGNvbnN0IHYgPSBgX3Yke2luZGV4fWBcblx0XHRyZXR1cm4gVmFyaWFibGVEZWNsYXJhdGlvbignY29uc3QnLCBbXG5cdFx0XHRWYXJpYWJsZURlY2xhcmF0b3IoaWRDYWNoZWQoayksIHQwKHRoaXMua2V5KSksXG5cdFx0XHRWYXJpYWJsZURlY2xhcmF0b3IoaWRDYWNoZWQodiksIHQwKHRoaXMudmFsKSlcblx0XHRdKVxuXHR9LFxuXG5cdE1lbWJlcigpIHsgcmV0dXJuIG1lbWJlcih0MCh0aGlzLm9iamVjdCksIHRoaXMubmFtZSkgfSxcblxuXHRNb2R1bGUoKSB7XG5cdFx0Y29uc3QgYm9keSA9IGNhdChcblx0XHRcdHRMaW5lcyh0aGlzLmxpbmVzKSxcblx0XHRcdG9wTWFwKHRoaXMub3BEZWZhdWx0RXhwb3J0LCBfID0+IGFzc2lnbm1lbnRFeHByZXNzaW9uUGxhaW4oRXhwb3J0c0RlZmF1bHQsIHQwKF8pKSkpXG5cdFx0cmV0dXJuIFByb2dyYW0oY2F0KFxuXHRcdFx0b3BJZihjeC5vcHRzLmluY2x1ZGVVc2VTdHJpY3QoKSwgKCkgPT4gVXNlU3RyaWN0KSxcblx0XHRcdG9wSWYoY3gub3B0cy5pbmNsdWRlQW1kZWZpbmUoKSwgKCkgPT4gQW1kZWZpbmVIZWFkZXIpLFxuXHRcdFx0dG9TdGF0ZW1lbnQoYW1kV3JhcE1vZHVsZSh0aGlzLmRvVXNlcywgdGhpcy51c2VzLmNvbmNhdCh0aGlzLmRlYnVnVXNlcyksIGJvZHkpKSkpXG5cdH0sXG5cblx0UXVvdGUoKSB7XG5cdFx0Ly8gVE9ETzpFUzYgdXNlIHRlbXBsYXRlIHN0cmluZ3Ncblx0XHRjb25zdCBwYXJ0MCA9IHRoaXMucGFydHNbMF1cblx0XHRjb25zdCBbIGZpcnN0LCByZXN0UGFydHMgXSA9XG5cdFx0XHR0eXBlb2YgcGFydDAgPT09ICdzdHJpbmcnID9cblx0XHRcdFx0WyBMaXRlcmFsKHBhcnQwKSwgdGFpbCh0aGlzLnBhcnRzKSBdIDpcblx0XHRcdFx0WyBMaXRFbXB0eVN0cmluZywgdGhpcy5wYXJ0cyBdXG5cdFx0cmV0dXJuIHJlc3RQYXJ0cy5yZWR1Y2UoXG5cdFx0XHQoZXgsIF8pID0+XG5cdFx0XHRcdEJpbmFyeUV4cHJlc3Npb24oJysnLCBleCwgdHlwZW9mIF8gPT09ICdzdHJpbmcnID8gTGl0ZXJhbChfKSA6IG1zU2hvdyh0MChfKSkpLFxuXHRcdFx0Zmlyc3QpXG5cdH0sXG5cblx0U3BlY2lhbERvKCkge1xuXHRcdHN3aXRjaCAodGhpcy5raW5kKSB7XG5cdFx0XHRjYXNlIFNEX0RlYnVnZ2VyOiByZXR1cm4gRGVidWdnZXJTdGF0ZW1lbnQoKVxuXHRcdFx0ZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKHRoaXMua2luZClcblx0XHR9XG5cdH0sXG5cblx0U3BlY2lhbFZhbCgpIHtcblx0XHQvLyBNYWtlIG5ldyBvYmplY3RzIGJlY2F1c2Ugd2Ugd2lsbCBhc3NpZ24gYGxvY2AgdG8gdGhlbS5cblx0XHRzd2l0Y2ggKHRoaXMua2luZCkge1xuXHRcdFx0Y2FzZSBTVl9Db250YWluczogcmV0dXJuIG1lbWJlcihJZE1zLCAnY29udGFpbnMnKVxuXHRcdFx0Y2FzZSBTVl9GYWxzZTogcmV0dXJuIExpdGVyYWwoZmFsc2UpXG5cdFx0XHRjYXNlIFNWX051bGw6IHJldHVybiBMaXRlcmFsKG51bGwpXG5cdFx0XHRjYXNlIFNWX1N1YjogcmV0dXJuIG1lbWJlcihJZE1zLCAnc3ViJylcblx0XHRcdGNhc2UgU1ZfVGhpczogcmV0dXJuIFx0VGhpc0V4cHJlc3Npb24oKVxuXHRcdFx0Y2FzZSBTVl9UaGlzTW9kdWxlRGlyZWN0b3J5OiByZXR1cm4gSWRlbnRpZmllcignX19kaXJuYW1lJylcblx0XHRcdGNhc2UgU1ZfVHJ1ZTogcmV0dXJuIExpdGVyYWwodHJ1ZSlcblx0XHRcdGNhc2UgU1ZfVW5kZWZpbmVkOiByZXR1cm4gVW5hcnlFeHByZXNzaW9uKCd2b2lkJywgTGl0WmVybylcblx0XHRcdGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcih0aGlzLmtpbmQpXG5cdFx0fVxuXHR9LFxuXG5cdFVubGVzc0RvKCkge1xuXHRcdHJldHVybiBJZlN0YXRlbWVudChVbmFyeUV4cHJlc3Npb24oJyEnLCBtYXliZUJvb2xXcmFwKHQwKHRoaXMudGVzdCkpKSwgdDAodGhpcy5yZXN1bHQpKVxuXHR9LFxuXG5cdFlpZWxkKCkgeyByZXR1cm4geWllbGRFeHByZXNzaW9uTm9EZWxlZ2F0ZSh0MCh0aGlzLnlpZWxkZWQpKSB9LFxuXG5cdFlpZWxkVG8oKSB7IHJldHVybiB5aWVsZEV4cHJlc3Npb25EZWxlZ2F0ZSh0MCh0aGlzLnlpZWxkZWRUbykpIH1cbn0pXG5cbmZ1bmN0aW9uIGNhc2VQYXJ0KGFsdGVybmF0ZSkge1xuXHRpZiAodGhpcy50ZXN0IGluc3RhbmNlb2YgUGF0dGVybikge1xuXHRcdGNvbnN0IHsgdHlwZSwgcGF0dGVybmVkLCBsb2NhbHMgfSA9IHRoaXMudGVzdFxuXHRcdGNvbnN0IGRlY2wgPSBWYXJpYWJsZURlY2xhcmF0aW9uKCdjb25zdCcsIFtcblx0XHRcdFZhcmlhYmxlRGVjbGFyYXRvcihJZEV4dHJhY3QsIG1zRXh0cmFjdCh0MCh0eXBlKSwgdDAocGF0dGVybmVkKSkpIF0pXG5cdFx0Y29uc3QgdGVzdCA9IEJpbmFyeUV4cHJlc3Npb24oJyE9PScsIElkRXh0cmFjdCwgTGl0TnVsbClcblx0XHRjb25zdCBleHRyYWN0ID0gVmFyaWFibGVEZWNsYXJhdGlvbignY29uc3QnLCBsb2NhbHMubWFwKChfLCBpZHgpID0+XG5cdFx0XHRWYXJpYWJsZURlY2xhcmF0b3IoaWRGb3JEZWNsYXJlQ2FjaGVkKF8pLCBtZW1iZXJFeHByZXNzaW9uKElkRXh0cmFjdCwgTGl0ZXJhbChpZHgpKSkpKVxuXHRcdGNvbnN0IHJlcyA9IHQxKHRoaXMucmVzdWx0LCBleHRyYWN0KVxuXHRcdHJldHVybiBCbG9ja1N0YXRlbWVudChbIGRlY2wsIElmU3RhdGVtZW50KHRlc3QsIHJlcywgYWx0ZXJuYXRlKSBdKVxuXHR9IGVsc2Vcblx0XHQvLyBhbHRlcm5hdGUgd3JpdHRlbiB0byBieSBgY2FzZUJvZHlgLlxuXHRcdHJldHVybiBJZlN0YXRlbWVudChtYXliZUJvb2xXcmFwKHQwKHRoaXMudGVzdCkpLCB0MCh0aGlzLnJlc3VsdCksIGFsdGVybmF0ZSlcbn1cblxuLy8gRnVuY3Rpb25zIHNwZWNpZmljIHRvIGNlcnRhaW4gZXhwcmVzc2lvbnMuXG5jb25zdFxuXHRibG9ja1dyYXAgPSAoXywgYmxvY2spID0+IHtcblx0XHRjb25zdCBpbnZva2UgPSBjYWxsRXhwcmVzc2lvblRodW5rKGZ1bmN0aW9uRXhwcmVzc2lvblRodW5rKGJsb2NrLCBpc0luR2VuZXJhdG9yKSlcblx0XHRyZXR1cm4gaXNJbkdlbmVyYXRvciA/IHlpZWxkRXhwcmVzc2lvbkRlbGVnYXRlKGludm9rZSkgOiBpbnZva2Vcblx0fSxcblxuXHRjYXNlQm9keSA9IChwYXJ0cywgb3BFbHNlKSA9PiB7XG5cdFx0bGV0IGFjYyA9IGlmRWxzZShvcEVsc2UsIHQwLCAoKSA9PiB0aHJvd0Vycm9yKCdObyBicmFuY2ggb2YgYGNhc2VgIG1hdGNoZXMuJykpXG5cdFx0Zm9yIChsZXQgaSA9IHBhcnRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaSA9IGkgLSAxKVxuXHRcdFx0YWNjID0gdDEocGFydHNbaV0sIGFjYylcblx0XHRyZXR1cm4gYWNjXG5cdH0sXG5cblx0dHJhbnNwaWxlQmxvY2sgPSAocmV0dXJuZWQsIGxpbmVzLCBsZWFkID0gbnVsbCwgb3BSZXNEZWNsYXJlID0gbnVsbCwgb3BPdXQgPSBudWxsKSA9PiB7XG5cdFx0Y29uc3QgZmluID0gaWZFbHNlKG9wUmVzRGVjbGFyZSxcblx0XHRcdHJkID0+IHtcblx0XHRcdFx0Y29uc3QgcmV0ID0gbWF5YmVXcmFwSW5DaGVja0NvbnRhaW5zKHJldHVybmVkLCByZC5vcFR5cGUsIHJkLm5hbWUpXG5cdFx0XHRcdHJldHVybiBpZkVsc2Uob3BPdXQsXG5cdFx0XHRcdFx0XyA9PiBjYXQoZGVjbGFyZShyZCwgcmV0KSwgXywgUmV0dXJuUmVzKSxcblx0XHRcdFx0XHQoKSA9PiBSZXR1cm5TdGF0ZW1lbnQocmV0KSlcblx0XHRcdH0sXG5cdFx0XHQoKSA9PiBjYXQob3BPdXQsIFJldHVyblN0YXRlbWVudChyZXR1cm5lZCkpKVxuXHRcdHJldHVybiBCbG9ja1N0YXRlbWVudChjYXQobGVhZCwgdExpbmVzKGxpbmVzKSwgZmluKSlcblx0fVxuXG4vLyBNb2R1bGUgaGVscGVyc1xuY29uc3Rcblx0YW1kV3JhcE1vZHVsZSA9IChkb1VzZXMsIG90aGVyVXNlcywgYm9keSkgPT4ge1xuXHRcdGNvbnN0IGFsbFVzZXMgPSBkb1VzZXMuY29uY2F0KG90aGVyVXNlcylcblx0XHRjb25zdCB1c2VQYXRocyA9IEFycmF5RXhwcmVzc2lvbihjYXQoXG5cdFx0XHRMaXRTdHJFeHBvcnRzLFxuXHRcdFx0YWxsVXNlcy5tYXAoXyA9PiBMaXRlcmFsKG1hbmdsZVBhdGgoXy5wYXRoKSkpKSlcblx0XHRjb25zdCB1c2VJZGVudGlmaWVycyA9IGFsbFVzZXMubWFwKChfLCBpKSA9PiBpZENhY2hlZChgJHtwYXRoQmFzZU5hbWUoXy5wYXRoKX1fJHtpfWApKVxuXHRcdGNvbnN0IHVzZUFyZ3MgPSBjYXQoSWRFeHBvcnRzLCB1c2VJZGVudGlmaWVycylcblx0XHRjb25zdCB1c2VEb3MgPSBkb1VzZXMubWFwKCh1c2UsIGkpID0+XG5cdFx0XHRsb2MoRXhwcmVzc2lvblN0YXRlbWVudChtc0dldE1vZHVsZSh1c2VJZGVudGlmaWVyc1tpXSkpLCB1c2UubG9jKSlcblx0XHRjb25zdCBvcFVzZURlY2xhcmUgPSBvcElmKCFpc0VtcHR5KG90aGVyVXNlcyksXG5cdFx0XHQoKSA9PiBWYXJpYWJsZURlY2xhcmF0aW9uKCdjb25zdCcsIGZsYXRNYXAob3RoZXJVc2VzLCAodXNlLCBpKSA9PlxuXHRcdFx0XHR1c2VEZWNsYXJhdG9ycyh1c2UsIHVzZUlkZW50aWZpZXJzW2kgKyBkb1VzZXMubGVuZ3RoXSkpKSlcblx0XHRjb25zdCBmdWxsQm9keSA9IEJsb2NrU3RhdGVtZW50KGNhdCh1c2VEb3MsIG9wVXNlRGVjbGFyZSwgYm9keSwgUmV0dXJuRXhwb3J0cykpXG5cdFx0Y29uc3QgbGF6eUJvZHkgPVxuXHRcdFx0Y3gub3B0cy5sYXp5TW9kdWxlKCkgP1xuXHRcdFx0XHRCbG9ja1N0YXRlbWVudChbIEV4cHJlc3Npb25TdGF0ZW1lbnQoXG5cdFx0XHRcdFx0YXNzaWdubWVudEV4cHJlc3Npb25QbGFpbihFeHBvcnRzR2V0LFxuXHRcdFx0XHRcdFx0bXNMYXp5KGZ1bmN0aW9uRXhwcmVzc2lvblRodW5rKGZ1bGxCb2R5KSkpKSBdKSA6XG5cdFx0XHRcdGZ1bGxCb2R5XG5cdFx0cmV0dXJuIENhbGxFeHByZXNzaW9uKElkRGVmaW5lLCBbIHVzZVBhdGhzLCBmdW5jdGlvbkV4cHJlc3Npb25QbGFpbih1c2VBcmdzLCBsYXp5Qm9keSkgXSlcblx0fSxcblxuXHRwYXRoQmFzZU5hbWUgPSBwYXRoID0+XG5cdFx0cGF0aC5zdWJzdHIocGF0aC5sYXN0SW5kZXhPZignLycpICsgMSksXG5cblx0dXNlRGVjbGFyYXRvcnMgPSAodXNlLCBtb2R1bGVJZGVudGlmaWVyKSA9PiB7XG5cdFx0Ly8gVE9ETzogQ291bGQgYmUgbmVhdGVyIGFib3V0IHRoaXNcblx0XHRjb25zdCBpc0xhenkgPSAoaXNFbXB0eSh1c2UudXNlZCkgPyB1c2Uub3BVc2VEZWZhdWx0IDogdXNlLnVzZWRbMF0pLmlzTGF6eSgpXG5cdFx0Y29uc3QgdmFsdWUgPSAoaXNMYXp5ID8gbXNMYXp5R2V0TW9kdWxlIDogbXNHZXRNb2R1bGUpKG1vZHVsZUlkZW50aWZpZXIpXG5cblx0XHRjb25zdCB1c2VkRGVmYXVsdCA9IG9wTWFwKHVzZS5vcFVzZURlZmF1bHQsIGRlZiA9PiB7XG5cdFx0XHRjb25zdCBkZWZleHAgPSBtc0dldERlZmF1bHRFeHBvcnQobW9kdWxlSWRlbnRpZmllcilcblx0XHRcdGNvbnN0IHZhbCA9IGlzTGF6eSA/IGxhenlXcmFwKGRlZmV4cCkgOiBkZWZleHBcblx0XHRcdHJldHVybiBsb2MoVmFyaWFibGVEZWNsYXJhdG9yKGlkRm9yRGVjbGFyZUNhY2hlZChkZWYpLCB2YWwpLCBkZWYubG9jKVxuXHRcdH0pXG5cblx0XHRjb25zdCB1c2VkRGVzdHJ1Y3QgPSBpc0VtcHR5KHVzZS51c2VkKSA/IG51bGwgOlxuXHRcdFx0bWFrZURlc3RydWN0dXJlRGVjbGFyYXRvcnModXNlLnVzZWQsIGlzTGF6eSwgdmFsdWUsIHRydWUsIGZhbHNlKVxuXG5cdFx0cmV0dXJuIGNhdCh1c2VkRGVmYXVsdCwgdXNlZERlc3RydWN0KVxuXHR9XG5cbi8vIEdlbmVyYWwgdXRpbHMuIE5vdCBpbiB1dGlsLmpzIGJlY2F1c2UgdGhlc2UgY2xvc2Ugb3ZlciBjeC5cbmNvbnN0XG5cdG1heWJlQm9vbFdyYXAgPSBhc3QgPT5cblx0XHRjeC5vcHRzLmluY2x1ZGVDYXNlQ2hlY2tzKCkgPyBtc0Jvb2woYXN0KSA6IGFzdCxcblxuXHRtYWtlRGVzdHJ1Y3R1cmVEZWNsYXJhdG9ycyA9IChhc3NpZ25lZXMsIGlzTGF6eSwgdmFsdWUsIGlzTW9kdWxlLCBpc0V4cG9ydCkgPT4ge1xuXHRcdGNvbnN0IGRlc3RydWN0dXJlZE5hbWUgPSBgXyQke2Fzc2lnbmVlc1swXS5sb2Muc3RhcnQubGluZX1gXG5cdFx0Y29uc3QgaWREZXN0cnVjdHVyZWQgPSBJZGVudGlmaWVyKGRlc3RydWN0dXJlZE5hbWUpXG5cdFx0Y29uc3QgZGVjbGFyYXRvcnMgPSBhc3NpZ25lZXMubWFwKGFzc2lnbmVlID0+IHtcblx0XHRcdC8vIFRPRE86IERvbid0IGNvbXBpbGUgaXQgaWYgaXQncyBuZXZlciBhY2Nlc3NlZFxuXHRcdFx0Y29uc3QgZ2V0ID0gZ2V0TWVtYmVyKGlkRGVzdHJ1Y3R1cmVkLCBhc3NpZ25lZS5uYW1lLCBpc0xhenksIGlzTW9kdWxlKVxuXHRcdFx0cmV0dXJuIG1ha2VEZWNsYXJhdG9yKGFzc2lnbmVlLCBnZXQsIGlzTGF6eSwgaXNFeHBvcnQpXG5cdFx0fSlcblx0XHQvLyBHZXR0aW5nIGxhenkgbW9kdWxlIGlzIGRvbmUgYnkgbXMubGF6eUdldE1vZHVsZS5cblx0XHRjb25zdCB2YWwgPSAoaXNMYXp5ICYmICFpc01vZHVsZSkgPyBsYXp5V3JhcCh2YWx1ZSkgOiB2YWx1ZVxuXHRcdHJldHVybiB1bnNoaWZ0KFZhcmlhYmxlRGVjbGFyYXRvcihpZERlc3RydWN0dXJlZCwgdmFsKSwgZGVjbGFyYXRvcnMpXG5cdH0sXG5cblx0bWFrZURlY2xhcmF0b3IgPSAoYXNzaWduZWUsIHZhbHVlLCB2YWx1ZUlzQWxyZWFkeUxhenksIGlzRXhwb3J0KSA9PiB7XG5cdFx0Y29uc3QgeyBsb2MsIG5hbWUsIG9wVHlwZSB9ID0gYXNzaWduZWVcblx0XHRjb25zdCBpc0xhenkgPSBhc3NpZ25lZS5pc0xhenkoKVxuXHRcdC8vIFRPRE86IGFzc2VydChhc3NpZ25lZS5vcFR5cGUgPT09IG51bGwpXG5cdFx0Ly8gb3IgVE9ETzogQWxsb3cgdHlwZSBjaGVjayBvbiBsYXp5IHZhbHVlP1xuXHRcdHZhbHVlID0gaXNMYXp5ID8gdmFsdWUgOiBtYXliZVdyYXBJbkNoZWNrQ29udGFpbnModmFsdWUsIG9wVHlwZSwgbmFtZSlcblx0XHRpZiAoaXNFeHBvcnQpIHtcblx0XHRcdC8vIFRPRE86RVM2XG5cdFx0XHRjeC5jaGVjayghaXNMYXp5LCBsb2MsICdMYXp5IGV4cG9ydCBub3Qgc3VwcG9ydGVkLicpXG5cdFx0XHRyZXR1cm4gVmFyaWFibGVEZWNsYXJhdG9yKFxuXHRcdFx0XHRpZEZvckRlY2xhcmVDYWNoZWQoYXNzaWduZWUpLFxuXHRcdFx0XHRhc3NpZ25tZW50RXhwcmVzc2lvblBsYWluKG1lbWJlcihJZEV4cG9ydHMsIG5hbWUpLCB2YWx1ZSkpXG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IHZhbCA9IGlzTGF6eSAmJiAhdmFsdWVJc0FscmVhZHlMYXp5ID8gbGF6eVdyYXAodmFsdWUpIDogdmFsdWVcblx0XHRcdGFzc2VydChpc0xhenkgfHwgIXZhbHVlSXNBbHJlYWR5TGF6eSlcblx0XHRcdHJldHVybiBWYXJpYWJsZURlY2xhcmF0b3IoaWRGb3JEZWNsYXJlQ2FjaGVkKGFzc2lnbmVlKSwgdmFsKVxuXHRcdH1cblx0fSxcblxuXHRtYXliZVdyYXBJbkNoZWNrQ29udGFpbnMgPSAoYXN0LCBvcFR5cGUsIG5hbWUpID0+XG5cdFx0KGN4Lm9wdHMuaW5jbHVkZVR5cGVDaGVja3MoKSAmJiBvcFR5cGUgIT09IG51bGwpID9cblx0XHRcdG1zQ2hlY2tDb250YWlucyh0MChvcFR5cGUpLCBhc3QsIExpdGVyYWwobmFtZSkpIDpcblx0XHRcdGFzdCxcblxuXHRnZXRNZW1iZXIgPSAoYXN0T2JqZWN0LCBnb3ROYW1lLCBpc0xhenksIGlzTW9kdWxlKSA9PlxuXHRcdGlzTGF6eSA/XG5cdFx0bXNMYXp5R2V0KGFzdE9iamVjdCwgTGl0ZXJhbChnb3ROYW1lKSkgOlxuXHRcdGlzTW9kdWxlICYmIGN4Lm9wdHMuaW5jbHVkZVVzZUNoZWNrcygpID9cblx0XHRtc0dldChhc3RPYmplY3QsIExpdGVyYWwoZ290TmFtZSkpIDpcblx0XHRtZW1iZXIoYXN0T2JqZWN0LCBnb3ROYW1lKVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=