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
			return (0, _esastDistAst.ForOfStatement)(declare, (0, _msCall.msIterator)(t0(this.bag)), t0(this.block));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS90cmFuc3BpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2tCQTRCd0IsU0FBUzs7Ozs7Ozs7OztBQUZqQyxLQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsYUFBYSxDQUFBOztBQUVWLFVBQVMsU0FBUyxDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRSxHQUFHLEVBQUU7QUFDN0QsSUFBRSxHQUFHLEdBQUcsQ0FBQTtBQUNSLElBQUUsR0FBRyxHQUFHLENBQUE7QUFDUixlQUFhLEdBQUcsS0FBSyxDQUFBO0FBQ3JCLFFBQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBOztBQUVoQyxJQUFFLEdBQUcsRUFBRSxHQUFHLFNBQVMsQ0FBQTtBQUNuQixTQUFPLEdBQUcsQ0FBQTtFQUNWOztBQUVELE9BQ0MsRUFBRSxHQUFHLFVBQUEsSUFBSTtTQUFJLG1CQWxDSyxHQUFHLEVBa0NKLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUM7RUFBQTtPQUNuRCxFQUFFLEdBQUcsVUFBQyxJQUFJLEVBQUUsR0FBRztTQUFLLG1CQW5DRixHQUFHLEVBbUNHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDO0VBQUE7T0FDN0QsRUFBRSxHQUFHLFVBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSTtTQUFLLG1CQXBDZCxHQUFHLEVBb0NlLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUM7RUFBQTtPQUNyRixNQUFNLEdBQUcsVUFBQSxLQUFLLEVBQUk7QUFDakIsUUFBTSxHQUFHLEdBQUcsRUFBRyxDQUFBO0FBQ2YsT0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUksRUFBSTtBQUNyQixTQUFN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QUUsS0FBSyxDQUFDLENBQUMsQ0FBQTtHQUMzRCxNQUFNO0FBQ04sU0FBTSxHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsWUFyWWhDLFFBQVEsRUFxWWlDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQTtBQUNuRSxhQTVZTSxNQUFNLEVBNFlMLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUE7QUFDckMsVUFBTyxrQkF4WjZCLGtCQUFrQixFQXdaNUIsV0FuWTVCLGtCQUFrQixFQW1ZNkIsUUFBUSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUE7R0FDNUQ7RUFDRDtPQUVELHdCQUF3QixHQUFHLFVBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJO1NBQzVDLEFBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLE1BQU0sS0FBSyxJQUFJLEdBQzlDLFlBN1lxQyxlQUFlLEVBNllwQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsR0FBRyxFQUFFLGtCQS9adEIsT0FBTyxFQStadUIsSUFBSSxDQUFDLENBQUMsR0FDL0MsR0FBRztFQUFBO09BRUwsU0FBUyxHQUFHLFVBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUTtTQUNoRCxNQUFNLEdBQ04sWUFqWmdDLFNBQVMsRUFpWi9CLFNBQVMsRUFBRSxrQkFwYVQsT0FBTyxFQW9hVSxPQUFPLENBQUMsQ0FBQyxHQUN0QyxRQUFRLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxHQUN0QyxZQXBaa0UsS0FBSyxFQW9aakUsU0FBUyxFQUFFLGtCQXRhTCxPQUFPLEVBc2FNLE9BQU8sQ0FBQyxDQUFDLEdBQ2xDLG1CQXBhc0IsTUFBTSxFQW9hckIsU0FBUyxFQUFFLE9BQU8sQ0FBQztFQUFBLENBQUEiLCJmaWxlIjoibWV0YS9jb21waWxlL3ByaXZhdGUvdHJhbnNwaWxlL3RyYW5zcGlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFycmF5RXhwcmVzc2lvbiwgQmluYXJ5RXhwcmVzc2lvbiwgQmxvY2tTdGF0ZW1lbnQsIEJyZWFrU3RhdGVtZW50LCBDYWxsRXhwcmVzc2lvbixcblx0RGVidWdnZXJTdGF0ZW1lbnQsIEV4cHJlc3Npb25TdGF0ZW1lbnQsIEZvck9mU3RhdGVtZW50LCBGdW5jdGlvbkV4cHJlc3Npb24sIElkZW50aWZpZXIsXG5cdElmU3RhdGVtZW50LCBMaXRlcmFsLCBPYmplY3RFeHByZXNzaW9uLCBQcm9ncmFtLCBSZXR1cm5TdGF0ZW1lbnQsIFRoaXNFeHByZXNzaW9uLFxuXHRWYXJpYWJsZURlY2xhcmF0aW9uLCBVbmFyeUV4cHJlc3Npb24sIFZhcmlhYmxlRGVjbGFyYXRvciwgUmV0dXJuU3RhdGVtZW50XG5cdH0gZnJvbSAnZXNhc3QvZGlzdC9hc3QnXG5pbXBvcnQgeyBpZENhY2hlZCwgbG9jLCBtZW1iZXIsIHByb3BlcnR5SWRPckxpdGVyYWxDYWNoZWQsIHRodW5rLCB0b1N0YXRlbWVudFxuXHR9IGZyb20gJ2VzYXN0L2Rpc3QvdXRpbCdcbmltcG9ydCB7IGFzc2lnbm1lbnRFeHByZXNzaW9uUGxhaW4sIGNhbGxFeHByZXNzaW9uVGh1bmssIGZ1bmN0aW9uRXhwcmVzc2lvblBsYWluLFxuXHRmdW5jdGlvbkV4cHJlc3Npb25UaHVuaywgbWVtYmVyRXhwcmVzc2lvbiwgcHJvcGVydHksXG5cdHlpZWxkRXhwcmVzc2lvbkRlbGVnYXRlLCB5aWVsZEV4cHJlc3Npb25Ob0RlbGVnYXRlIH0gZnJvbSAnZXNhc3QvZGlzdC9zcGVjaWFsaXplJ1xuaW1wb3J0ICogYXMgRUV4cG9ydHMgZnJvbSAnLi4vLi4vRXhwcmVzc2lvbidcbmltcG9ydCB7IExEX0xhenksIExEX011dGFibGUsIFBhdHRlcm4sIFNwbGF0LCBTRF9EZWJ1Z2dlciwgU1ZfQ29udGFpbnMsIFNWX0ZhbHNlLCBTVl9OdWxsLCBTVl9TdWIsXG5cdFNWX1RoaXMsIFNWX1RoaXNNb2R1bGVEaXJlY3RvcnksIFNWX1RydWUsIFNWX1VuZGVmaW5lZCB9IGZyb20gJy4uLy4uL0V4cHJlc3Npb24nXG5pbXBvcnQgbWFuZ2xlUGF0aCBmcm9tICcuLi9tYW5nbGVQYXRoJ1xuaW1wb3J0IHsgYXNzZXJ0LCBjYXQsIGZsYXRNYXAsIGZsYXRPcE1hcCwgaWZFbHNlLCBpc0VtcHR5LFxuXHRpbXBsZW1lbnRNYW55LCBpc1Bvc2l0aXZlLCBvcElmLCBvcE1hcCwgcmFuZ2UsIHRhaWwsIHVuc2hpZnQgfSBmcm9tICcuLi91dGlsJ1xuaW1wb3J0IHsgQW1kZWZpbmVIZWFkZXIsIEFycmF5U2xpY2VDYWxsLCBFeHBvcnRzRGVmYXVsdCwgRXhwb3J0c0dldCwgSWRBcmd1bWVudHMsIElkRGVmaW5lLFxuXHRJZEV4cG9ydHMsIElkRXh0cmFjdCwgSWRGdW5jdGlvbkFwcGx5Q2FsbCwgSWROYW1lLCBMaXRFbXB0eUFycmF5LCBMaXRFbXB0eVN0cmluZywgTGl0TnVsbCxcblx0TGl0U3RyRXhwb3J0cywgTGl0U3RyTmFtZSwgTGl0WmVybywgUmV0dXJuRXhwb3J0cywgUmV0dXJuUmVzLCBVc2VTdHJpY3Rcblx0fSBmcm9tICcuL2FzdC1jb25zdGFudHMnXG5pbXBvcnQgeyBJZE1zLCBsYXp5V3JhcCwgbXNBcnIsIG1zQm9vbCwgbXNDaGVja0NvbnRhaW5zLCBtc0V4dHJhY3QsIG1zR2V0LCBtc0dldERlZmF1bHRFeHBvcnQsXG5cdG1zR2V0TW9kdWxlLCBtc0l0ZXJhdG9yLCBtc0xhenksIG1zTGF6eUdldCwgbXNMYXp5R2V0TW9kdWxlLCBtc0xzZXQsIG1zTWFwLCBtc1NldCwgbXNTaG93XG5cdH0gZnJvbSAnLi9tcy1jYWxsJ1xuaW1wb3J0IHsgYWNjZXNzTG9jYWxEZWNsYXJlLCBkZWNsYXJlLCBkZWNsYXJlU3BlY2lhbCxcblx0aWRGb3JEZWNsYXJlQ2FjaGVkLCB0aHJvd0Vycm9yLCB3aGlsZVN0YXRlbWVudEluZmluaXRlIH0gZnJvbSAnLi91dGlsJ1xuXG5sZXQgY3gsIHZyLCBpc0luR2VuZXJhdG9yXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRyYW5zcGlsZShfY3gsIG1vZHVsZUV4cHJlc3Npb24sIF92cikge1xuXHRjeCA9IF9jeFxuXHR2ciA9IF92clxuXHRpc0luR2VuZXJhdG9yID0gZmFsc2Vcblx0Y29uc3QgcmVzID0gdDAobW9kdWxlRXhwcmVzc2lvbilcblx0Ly8gUmVsZWFzZSBmb3IgZ2FyYmFnZSBjb2xsZWN0aW9uXG5cdGN4ID0gdnIgPSB1bmRlZmluZWRcblx0cmV0dXJuIHJlc1xufVxuXG5jb25zdFxuXHR0MCA9IGV4cHIgPT4gbG9jKGV4cHIudHJhbnNwaWxlU3VidHJlZSgpLCBleHByLmxvYyksXG5cdHQxID0gKGV4cHIsIGFyZykgPT4gbG9jKGV4cHIudHJhbnNwaWxlU3VidHJlZShhcmcpLCBleHByLmxvYyksXG5cdHQzID0gKGV4cHIsIGFyZywgYXJnMiwgYXJnMykgPT4gbG9jKGV4cHIudHJhbnNwaWxlU3VidHJlZShhcmcsIGFyZzIsIGFyZzMpLCBleHByLmxvYyksXG5cdHRMaW5lcyA9IGV4cHJzID0+IHtcblx0XHRjb25zdCBvdXQgPSBbIF1cblx0XHRleHBycy5mb3JFYWNoKGV4cHIgPT4ge1xuXHRcdFx0Y29uc3QgYXN0ID0gZXhwci50cmFuc3BpbGVTdWJ0cmVlKClcblx0XHRcdGlmIChhc3QgaW5zdGFuY2VvZiBBcnJheSlcblx0XHRcdFx0Ly8gRGVidWcgbWF5IHByb2R1Y2UgbXVsdGlwbGUgc3RhdGVtZW50cy5cblx0XHRcdFx0YXN0LmZvckVhY2goXyA9PiBvdXQucHVzaCh0b1N0YXRlbWVudChfKSkpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdG91dC5wdXNoKGxvYyh0b1N0YXRlbWVudChhc3QpLCBleHByLmxvYykpXG5cdFx0fSlcblx0XHRyZXR1cm4gb3V0XG5cdH1cblxuaW1wbGVtZW50TWFueShFRXhwb3J0cywgJ3RyYW5zcGlsZVN1YnRyZWUnLCB7XG5cdEFzc2lnbigpIHtcblx0XHRyZXR1cm4gVmFyaWFibGVEZWNsYXJhdGlvbihcblx0XHRcdHRoaXMuYXNzaWduZWUuaXNNdXRhYmxlKCkgPyAnbGV0JyA6ICdjb25zdCcsXG5cdFx0XHRbIG1ha2VEZWNsYXJhdG9yKHRoaXMuYXNzaWduZWUsIHQwKHRoaXMudmFsdWUpLCBmYWxzZSwgdnIuaXNFeHBvcnRBc3NpZ24odGhpcykpIF0pXG5cdH0sXG5cdC8vIFRPRE86RVM2IEp1c3QgdXNlIG5hdGl2ZSBkZXN0cnVjdHVyaW5nIGFzc2lnblxuXHRBc3NpZ25EZXN0cnVjdHVyZSgpIHtcblx0XHRyZXR1cm4gVmFyaWFibGVEZWNsYXJhdGlvbih0aGlzLmtpbmQoKSA9PT0gTERfTXV0YWJsZSA/ICdsZXQnIDogJ2NvbnN0Jyxcblx0XHRcdG1ha2VEZXN0cnVjdHVyZURlY2xhcmF0b3JzKFxuXHRcdFx0XHR0aGlzLmFzc2lnbmVlcyxcblx0XHRcdFx0dGhpcy5raW5kKCkgPT09IExEX0xhenksXG5cdFx0XHRcdHQwKHRoaXMudmFsdWUpLFxuXHRcdFx0XHRmYWxzZSxcblx0XHRcdFx0dnIuaXNFeHBvcnRBc3NpZ24odGhpcykpKVxuXHR9LFxuXG5cdEFzc2lnbk11dGF0ZSgpIHtcblx0XHRyZXR1cm4gYXNzaWdubWVudEV4cHJlc3Npb25QbGFpbihpZENhY2hlZCh0aGlzLm5hbWUpLCB0MCh0aGlzLnZhbHVlKSlcblx0fSxcblxuXHRCYWdFbnRyeSgpIHsgcmV0dXJuIGRlY2xhcmVTcGVjaWFsKGBfJHt2ci5saXN0TWFwRW50cnlJbmRleCh0aGlzKX1gLCB0MCh0aGlzLnZhbHVlKSkgfSxcblxuXHRCYWdTaW1wbGUoKSB7IHJldHVybiBBcnJheUV4cHJlc3Npb24odGhpcy5wYXJ0cy5tYXAodDApKSB9LFxuXG5cdEJsb2NrRG8obGVhZCA9IG51bGwsIG9wUmVzRGVjbGFyZSA9IG51bGwsIG9wT3V0ID0gbnVsbCkge1xuXHRcdGFzc2VydChvcFJlc0RlY2xhcmUgPT09IG51bGwpXG5cdFx0cmV0dXJuIEJsb2NrU3RhdGVtZW50KGNhdChsZWFkLCB0TGluZXModGhpcy5saW5lcyksIG9wT3V0KSlcblx0fSxcblxuXHRCbG9ja1dpdGhSZXR1cm4obGVhZCwgb3BSZXNEZWNsYXJlLCBvcE91dCkge1xuXHRcdHJldHVybiB0cmFuc3BpbGVCbG9jayh0MCh0aGlzLnJldHVybmVkKSwgdGhpcy5saW5lcywgbGVhZCwgb3BSZXNEZWNsYXJlLCBvcE91dClcblx0fSxcblxuXHRCbG9ja09iaihsZWFkLCBvcFJlc0RlY2xhcmUsIG9wT3V0KSB7XG5cdFx0Ly8gVE9ETzogaW5jbHVkZVR5cGVDaGVja3MoKSBpcyBub3QgdGhlIHJpZ2h0IG1ldGhvZCBmb3IgdGhpc1xuXHRcdGNvbnN0IGtleXMgPVxuXHRcdFx0Y3gub3B0cy5pbmNsdWRlVHlwZUNoZWNrcygpID8gdGhpcy5rZXlzIDogdGhpcy5rZXlzLmZpbHRlcihfID0+ICF2ci5pc0RlYnVnTG9jYWwoXykpXG5cdFx0Y29uc3QgcmV0ID0gaWZFbHNlKHRoaXMub3BPYmplZCxcblx0XHRcdF8gPT4ge1xuXHRcdFx0XHRjb25zdCBvYmplZCA9IHQwKF8pXG5cdFx0XHRcdGNvbnN0IGtleXNWYWxzID0gY2F0KFxuXHRcdFx0XHRcdGZsYXRNYXAoa2V5cywga2V5ID0+IFsgTGl0ZXJhbChrZXkubmFtZSksIGFjY2Vzc0xvY2FsRGVjbGFyZShrZXkpIF0pLFxuXHRcdFx0XHRcdG9wTWFwKHRoaXMub3BOYW1lLCBfID0+IFsgTGl0U3RyTmFtZSwgTGl0ZXJhbChfKSBdKSlcblx0XHRcdFx0Y29uc3QgYW55TGF6eSA9IGtleXMuc29tZShfID0+IF8uaXNMYXp5KCkpXG5cdFx0XHRcdHJldHVybiAoYW55TGF6eSA/IG1zTHNldCA6IG1zU2V0KShvYmplZCwgLi4ua2V5c1ZhbHMpXG5cdFx0XHR9LFxuXHRcdFx0KCkgPT4ge1xuXHRcdFx0XHRjb25zdCBwcm9wcyA9IGtleXMubWFwKGtleSA9PiB7XG5cdFx0XHRcdFx0Y29uc3QgdmFsID0gYWNjZXNzTG9jYWxEZWNsYXJlKGtleSlcblx0XHRcdFx0XHRjb25zdCBpZCA9IHByb3BlcnR5SWRPckxpdGVyYWxDYWNoZWQoa2V5Lm5hbWUpXG5cdFx0XHRcdFx0cmV0dXJuIGtleS5pc0xhenkoKSA/XG5cdFx0XHRcdFx0XHRwcm9wZXJ0eSgnZ2V0JywgaWQsIHRodW5rKHZhbCkpIDpcblx0XHRcdFx0XHRcdHByb3BlcnR5KCdpbml0JywgaWQsIHZhbClcblx0XHRcdFx0fSlcblx0XHRcdFx0Y29uc3Qgb3BQcm9wTmFtZSA9IG9wTWFwKHRoaXMub3BOYW1lLCBfID0+IHByb3BlcnR5KCdpbml0JywgSWROYW1lLCBMaXRlcmFsKF8pKSlcblx0XHRcdFx0cmV0dXJuIE9iamVjdEV4cHJlc3Npb24oY2F0KHByb3BzLCBvcFByb3BOYW1lKSlcblx0XHRcdH0pXG5cdFx0cmV0dXJuIHRyYW5zcGlsZUJsb2NrKHJldCwgdGhpcy5saW5lcywgbGVhZCwgb3BSZXNEZWNsYXJlLCBvcE91dClcblx0fSxcblxuXHRCbG9ja0JhZyhsZWFkLCBvcFJlc0RlY2xhcmUsIG9wT3V0KSB7XG5cdFx0Y29uc3QgbGVuZ3RoID0gdnIubGlzdE1hcExlbmd0aCh0aGlzKVxuXHRcdHJldHVybiB0cmFuc3BpbGVCbG9jayhcblx0XHRcdEFycmF5RXhwcmVzc2lvbihyYW5nZShsZW5ndGgpLm1hcChpID0+IGlkQ2FjaGVkKGBfJHtpfWApKSksXG5cdFx0XHR0aGlzLmxpbmVzLCBsZWFkLCBvcFJlc0RlY2xhcmUsIG9wT3V0KVxuXHR9LFxuXG5cdEJsb2NrTWFwKGxlYWQsIG9wUmVzRGVjbGFyZSwgb3BPdXQpIHtcblx0XHRjb25zdCBsZW5ndGggPSB2ci5saXN0TWFwTGVuZ3RoKHRoaXMpXG5cdFx0cmV0dXJuIHRyYW5zcGlsZUJsb2NrKFxuXHRcdFx0bXNNYXAoLi4uZmxhdE1hcChyYW5nZShsZW5ndGgpLCBpID0+XG5cdFx0XHRcdFsgaWRDYWNoZWQoYF9rJHtpfWApLCBpZENhY2hlZChgX3Yke2l9YCkgXSkpLFxuXHRcdFx0dGhpcy5saW5lcywgbGVhZCwgb3BSZXNEZWNsYXJlLCBvcE91dClcblx0fSxcblxuXHRCbG9ja1dyYXAoKSB7IHJldHVybiBibG9ja1dyYXAodGhpcywgdDAodGhpcy5ibG9jaykpIH0sXG5cblx0QnJlYWtEbygpIHsgcmV0dXJuIEJyZWFrU3RhdGVtZW50KCkgfSxcblxuXHRDYWxsKCkge1xuXHRcdGNvbnN0IGFueVNwbGF0ID0gdGhpcy5hcmdzLnNvbWUoYXJnID0+IGFyZyBpbnN0YW5jZW9mIFNwbGF0KVxuXHRcdGlmIChhbnlTcGxhdCkge1xuXHRcdFx0Y29uc3QgYXJncyA9IHRoaXMuYXJncy5tYXAoYXJnID0+XG5cdFx0XHRcdGFyZyBpbnN0YW5jZW9mIFNwbGF0ID9cblx0XHRcdFx0XHRtc0Fycih0MChhcmcuc3BsYXR0ZWQpKSA6XG5cdFx0XHRcdFx0dDAoYXJnKSlcblx0XHRcdHJldHVybiBDYWxsRXhwcmVzc2lvbihJZEZ1bmN0aW9uQXBwbHlDYWxsLCBbXG5cdFx0XHRcdHQwKHRoaXMuY2FsbGVkKSxcblx0XHRcdFx0TGl0TnVsbCxcblx0XHRcdFx0Q2FsbEV4cHJlc3Npb24obWVtYmVyKExpdEVtcHR5QXJyYXksICdjb25jYXQnKSwgYXJncyldKVxuXHRcdH1cblx0XHRlbHNlIHJldHVybiBDYWxsRXhwcmVzc2lvbih0MCh0aGlzLmNhbGxlZCksIHRoaXMuYXJncy5tYXAodDApKVxuXHR9LFxuXG5cdENhc2VEbygpIHtcblx0XHRjb25zdCBib2R5ID0gY2FzZUJvZHkodGhpcy5wYXJ0cywgdGhpcy5vcEVsc2UpXG5cdFx0cmV0dXJuIGlmRWxzZSh0aGlzLm9wQ2FzZWQsIF8gPT4gQmxvY2tTdGF0ZW1lbnQoWyB0MChfKSwgYm9keSBdKSwgKCkgPT4gYm9keSlcblx0fSxcblxuXHRDYXNlVmFsKCkge1xuXHRcdGNvbnN0IGJvZHkgPSBjYXNlQm9keSh0aGlzLnBhcnRzLCB0aGlzLm9wRWxzZSlcblx0XHRjb25zdCBibG9jayA9IGlmRWxzZSh0aGlzLm9wQ2FzZWQsIF8gPT4gWyB0MChfKSwgYm9keSBdLCAoKSA9PiBbIGJvZHkgXSlcblx0XHRyZXR1cm4gYmxvY2tXcmFwKHRoaXMsIEJsb2NrU3RhdGVtZW50KGJsb2NrKSlcblx0fSxcblxuXHRDYXNlRG9QYXJ0OiBjYXNlUGFydCxcblx0Q2FzZVZhbFBhcnQ6IGNhc2VQYXJ0LFxuXHQvLyBUT0RPOiBpbmNsdWRlSW5vdXRDaGVja3MgaXMgbWlzbmFtZWRcblx0RGVidWcoKSB7IHJldHVybiBjeC5vcHRzLmluY2x1ZGVJbm91dENoZWNrcygpID8gdExpbmVzKHRoaXMubGluZXMpIDogWyBdIH0sXG5cblx0T2JqU2ltcGxlKCkge1xuXHRcdHJldHVybiBPYmplY3RFeHByZXNzaW9uKHRoaXMucGFpcnMubWFwKHBhaXIgPT5cblx0XHRcdHByb3BlcnR5KCdpbml0JywgcHJvcGVydHlJZE9yTGl0ZXJhbENhY2hlZChwYWlyLmtleSksIHQwKHBhaXIudmFsdWUpKSkpXG5cdH0sXG5cblx0Rm9yRG9QbGFpbigpIHtcblx0XHRyZXR1cm4gd2hpbGVTdGF0ZW1lbnRJbmZpbml0ZSh0MCh0aGlzLmJsb2NrKSlcblx0fSxcblxuXHRGb3JEb1dpdGhCYWcoKSB7XG5cdFx0Y29uc3QgZGVjbGFyZSA9IFZhcmlhYmxlRGVjbGFyYXRpb24oJ2xldCcsIFsgVmFyaWFibGVEZWNsYXJhdG9yKHQwKHRoaXMuZWxlbWVudCkpIF0pXG5cdFx0cmV0dXJuIEZvck9mU3RhdGVtZW50KGRlY2xhcmUsIG1zSXRlcmF0b3IodDAodGhpcy5iYWcpKSwgdDAodGhpcy5ibG9jaykpXG5cdH0sXG5cblx0RnVuKCkge1xuXHRcdGNvbnN0IG9sZEluR2VuZXJhdG9yID0gaXNJbkdlbmVyYXRvclxuXHRcdGlzSW5HZW5lcmF0b3IgPSB0aGlzLmlzR2VuZXJhdG9yXG5cblx0XHQvLyBUT0RPOkVTNiB1c2UgYC4uLmBmXG5cdFx0Y29uc3QgbkFyZ3MgPSBMaXRlcmFsKHRoaXMuYXJncy5sZW5ndGgpXG5cdFx0Y29uc3Qgb3BEZWNsYXJlUmVzdCA9IG9wTWFwKHRoaXMub3BSZXN0QXJnLCByZXN0ID0+XG5cdFx0XHRkZWNsYXJlKHJlc3QsIENhbGxFeHByZXNzaW9uKEFycmF5U2xpY2VDYWxsLCBbSWRBcmd1bWVudHMsIG5BcmdzXSkpKVxuXHRcdGNvbnN0IGFyZ0NoZWNrcyA9XG5cdFx0XHRvcElmKGN4Lm9wdHMuaW5jbHVkZVR5cGVDaGVja3MoKSwgKCkgPT5cblx0XHRcdFx0ZmxhdE9wTWFwKHRoaXMuYXJncywgXyA9PlxuXHRcdFx0XHRcdC8vIFRPRE86IFdheSB0byB0eXBlY2hlY2sgbGF6aWVzXG5cdFx0XHRcdFx0b3BJZighXy5pc0xhenkoKSwgKCkgPT5cblx0XHRcdFx0XHRcdG9wTWFwKF8ub3BUeXBlLCB0eXBlID0+XG5cdFx0XHRcdFx0XHRcdEV4cHJlc3Npb25TdGF0ZW1lbnQobXNDaGVja0NvbnRhaW5zKFxuXHRcdFx0XHRcdFx0XHRcdHQwKHR5cGUpLFxuXHRcdFx0XHRcdFx0XHRcdGFjY2Vzc0xvY2FsRGVjbGFyZShfKSxcblx0XHRcdFx0XHRcdFx0XHRMaXRlcmFsKF8ubmFtZSkpKSkpKSlcblxuXHRcdGNvbnN0IF9pbiA9IG9wTWFwKHRoaXMub3BJbiwgdDApXG5cdFx0Y29uc3QgbGVhZCA9IGNhdChvcERlY2xhcmVSZXN0LCBhcmdDaGVja3MsIF9pbilcblxuXHRcdGNvbnN0IF9vdXQgPSBvcE1hcCh0aGlzLm9wT3V0LCB0MClcblx0XHRjb25zdCBib2R5ID0gdDModGhpcy5ibG9jaywgbGVhZCwgdGhpcy5vcFJlc0RlY2xhcmUsIF9vdXQpXG5cdFx0Y29uc3QgYXJncyA9IHRoaXMuYXJncy5tYXAodDApXG5cdFx0aXNJbkdlbmVyYXRvciA9IG9sZEluR2VuZXJhdG9yXG5cdFx0Y29uc3QgaWQgPSBvcE1hcCh0aGlzLm5hbWUsIGlkQ2FjaGVkKVxuXHRcdHJldHVybiBGdW5jdGlvbkV4cHJlc3Npb24oaWQsIGFyZ3MsIGJvZHksIHRoaXMuaXNHZW5lcmF0b3IpXG5cdH0sXG5cblx0TGF6eSgpIHsgcmV0dXJuIGxhenlXcmFwKHQwKHRoaXMudmFsdWUpKSB9LFxuXG5cdE51bWJlckxpdGVyYWwoKSB7XG5cdFx0Ly8gTmVnYXRpdmUgbnVtYmVycyBhcmUgbm90IHBhcnQgb2YgRVMgc3BlYy5cblx0XHQvLyBodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNS4xLyNzZWMtNy44LjNcblx0XHRjb25zdCBsaXQgPSBMaXRlcmFsKE1hdGguYWJzKHRoaXMudmFsdWUpKVxuXHRcdHJldHVybiBpc1Bvc2l0aXZlKHRoaXMudmFsdWUpID8gbGl0IDogVW5hcnlFeHByZXNzaW9uKCctJywgbGl0KVxuXHR9LFxuXG5cdEdsb2JhbEFjY2VzcygpIHsgcmV0dXJuIElkZW50aWZpZXIodGhpcy5uYW1lKSB9LFxuXG5cdElmRG8oKSB7IHJldHVybiBJZlN0YXRlbWVudChtYXliZUJvb2xXcmFwKHQwKHRoaXMudGVzdCkpLCB0MCh0aGlzLnJlc3VsdCkpIH0sXG5cblx0TG9jYWxBY2Nlc3MoKSB7IHJldHVybiBhY2Nlc3NMb2NhbERlY2xhcmUodnIuYWNjZXNzVG9Mb2NhbC5nZXQodGhpcykpIH0sXG5cblx0TG9jYWxEZWNsYXJlKCkgeyByZXR1cm4gaWRGb3JEZWNsYXJlQ2FjaGVkKHRoaXMpIH0sXG5cblx0TWFwRW50cnkoKSB7XG5cdFx0Y29uc3QgaW5kZXggPSB2ci5saXN0TWFwRW50cnlJbmRleCh0aGlzKVxuXHRcdGNvbnN0IGsgPSBgX2ske2luZGV4fWBcblx0XHRjb25zdCB2ID0gYF92JHtpbmRleH1gXG5cdFx0cmV0dXJuIFZhcmlhYmxlRGVjbGFyYXRpb24oJ2NvbnN0JywgW1xuXHRcdFx0VmFyaWFibGVEZWNsYXJhdG9yKGlkQ2FjaGVkKGspLCB0MCh0aGlzLmtleSkpLFxuXHRcdFx0VmFyaWFibGVEZWNsYXJhdG9yKGlkQ2FjaGVkKHYpLCB0MCh0aGlzLnZhbCkpXG5cdFx0XSlcblx0fSxcblxuXHRNZW1iZXIoKSB7IHJldHVybiBtZW1iZXIodDAodGhpcy5vYmplY3QpLCB0aGlzLm5hbWUpIH0sXG5cblx0TW9kdWxlKCkge1xuXHRcdGNvbnN0IGJvZHkgPSBjYXQoXG5cdFx0XHR0TGluZXModGhpcy5saW5lcyksXG5cdFx0XHRvcE1hcCh0aGlzLm9wRGVmYXVsdEV4cG9ydCwgXyA9PiBhc3NpZ25tZW50RXhwcmVzc2lvblBsYWluKEV4cG9ydHNEZWZhdWx0LCB0MChfKSkpKVxuXHRcdHJldHVybiBQcm9ncmFtKGNhdChcblx0XHRcdG9wSWYoY3gub3B0cy5pbmNsdWRlVXNlU3RyaWN0KCksICgpID0+IFVzZVN0cmljdCksXG5cdFx0XHRvcElmKGN4Lm9wdHMuaW5jbHVkZUFtZGVmaW5lKCksICgpID0+IEFtZGVmaW5lSGVhZGVyKSxcblx0XHRcdHRvU3RhdGVtZW50KGFtZFdyYXBNb2R1bGUodGhpcy5kb1VzZXMsIHRoaXMudXNlcy5jb25jYXQodGhpcy5kZWJ1Z1VzZXMpLCBib2R5KSkpKVxuXHR9LFxuXG5cdFF1b3RlKCkge1xuXHRcdC8vIFRPRE86RVM2IHVzZSB0ZW1wbGF0ZSBzdHJpbmdzXG5cdFx0Y29uc3QgcGFydDAgPSB0aGlzLnBhcnRzWzBdXG5cdFx0Y29uc3QgWyBmaXJzdCwgcmVzdFBhcnRzIF0gPVxuXHRcdFx0dHlwZW9mIHBhcnQwID09PSAnc3RyaW5nJyA/XG5cdFx0XHRcdFsgTGl0ZXJhbChwYXJ0MCksIHRhaWwodGhpcy5wYXJ0cykgXSA6XG5cdFx0XHRcdFsgTGl0RW1wdHlTdHJpbmcsIHRoaXMucGFydHMgXVxuXHRcdHJldHVybiByZXN0UGFydHMucmVkdWNlKFxuXHRcdFx0KGV4LCBfKSA9PlxuXHRcdFx0XHRCaW5hcnlFeHByZXNzaW9uKCcrJywgZXgsIHR5cGVvZiBfID09PSAnc3RyaW5nJyA/IExpdGVyYWwoXykgOiBtc1Nob3codDAoXykpKSxcblx0XHRcdGZpcnN0KVxuXHR9LFxuXG5cdFNwZWNpYWxEbygpIHtcblx0XHRzd2l0Y2ggKHRoaXMua2luZCkge1xuXHRcdFx0Y2FzZSBTRF9EZWJ1Z2dlcjogcmV0dXJuIERlYnVnZ2VyU3RhdGVtZW50KClcblx0XHRcdGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcih0aGlzLmtpbmQpXG5cdFx0fVxuXHR9LFxuXG5cdFNwZWNpYWxWYWwoKSB7XG5cdFx0Ly8gTWFrZSBuZXcgb2JqZWN0cyBiZWNhdXNlIHdlIHdpbGwgYXNzaWduIGBsb2NgIHRvIHRoZW0uXG5cdFx0c3dpdGNoICh0aGlzLmtpbmQpIHtcblx0XHRcdGNhc2UgU1ZfQ29udGFpbnM6IHJldHVybiBtZW1iZXIoSWRNcywgJ2NvbnRhaW5zJylcblx0XHRcdGNhc2UgU1ZfRmFsc2U6IHJldHVybiBMaXRlcmFsKGZhbHNlKVxuXHRcdFx0Y2FzZSBTVl9OdWxsOiByZXR1cm4gTGl0ZXJhbChudWxsKVxuXHRcdFx0Y2FzZSBTVl9TdWI6IHJldHVybiBtZW1iZXIoSWRNcywgJ3N1YicpXG5cdFx0XHRjYXNlIFNWX1RoaXM6IHJldHVybiBcdFRoaXNFeHByZXNzaW9uKClcblx0XHRcdGNhc2UgU1ZfVGhpc01vZHVsZURpcmVjdG9yeTogcmV0dXJuIElkZW50aWZpZXIoJ19fZGlybmFtZScpXG5cdFx0XHRjYXNlIFNWX1RydWU6IHJldHVybiBMaXRlcmFsKHRydWUpXG5cdFx0XHRjYXNlIFNWX1VuZGVmaW5lZDogcmV0dXJuIFVuYXJ5RXhwcmVzc2lvbigndm9pZCcsIExpdFplcm8pXG5cdFx0XHRkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IodGhpcy5raW5kKVxuXHRcdH1cblx0fSxcblxuXHRVbmxlc3NEbygpIHtcblx0XHRyZXR1cm4gSWZTdGF0ZW1lbnQoVW5hcnlFeHByZXNzaW9uKCchJywgbWF5YmVCb29sV3JhcCh0MCh0aGlzLnRlc3QpKSksIHQwKHRoaXMucmVzdWx0KSlcblx0fSxcblxuXHRZaWVsZCgpIHsgcmV0dXJuIHlpZWxkRXhwcmVzc2lvbk5vRGVsZWdhdGUodDAodGhpcy55aWVsZGVkKSkgfSxcblxuXHRZaWVsZFRvKCkgeyByZXR1cm4geWllbGRFeHByZXNzaW9uRGVsZWdhdGUodDAodGhpcy55aWVsZGVkVG8pKSB9XG59KVxuXG5mdW5jdGlvbiBjYXNlUGFydChhbHRlcm5hdGUpIHtcblx0aWYgKHRoaXMudGVzdCBpbnN0YW5jZW9mIFBhdHRlcm4pIHtcblx0XHRjb25zdCB7IHR5cGUsIHBhdHRlcm5lZCwgbG9jYWxzIH0gPSB0aGlzLnRlc3Rcblx0XHRjb25zdCBkZWNsID0gVmFyaWFibGVEZWNsYXJhdGlvbignY29uc3QnLCBbXG5cdFx0XHRWYXJpYWJsZURlY2xhcmF0b3IoSWRFeHRyYWN0LCBtc0V4dHJhY3QodDAodHlwZSksIHQwKHBhdHRlcm5lZCkpKSBdKVxuXHRcdGNvbnN0IHRlc3QgPSBCaW5hcnlFeHByZXNzaW9uKCchPT0nLCBJZEV4dHJhY3QsIExpdE51bGwpXG5cdFx0Y29uc3QgZXh0cmFjdCA9IFZhcmlhYmxlRGVjbGFyYXRpb24oJ2NvbnN0JywgbG9jYWxzLm1hcCgoXywgaWR4KSA9PlxuXHRcdFx0VmFyaWFibGVEZWNsYXJhdG9yKGlkRm9yRGVjbGFyZUNhY2hlZChfKSwgbWVtYmVyRXhwcmVzc2lvbihJZEV4dHJhY3QsIExpdGVyYWwoaWR4KSkpKSlcblx0XHRjb25zdCByZXMgPSB0MSh0aGlzLnJlc3VsdCwgZXh0cmFjdClcblx0XHRyZXR1cm4gQmxvY2tTdGF0ZW1lbnQoWyBkZWNsLCBJZlN0YXRlbWVudCh0ZXN0LCByZXMsIGFsdGVybmF0ZSkgXSlcblx0fSBlbHNlXG5cdFx0Ly8gYWx0ZXJuYXRlIHdyaXR0ZW4gdG8gYnkgYGNhc2VCb2R5YC5cblx0XHRyZXR1cm4gSWZTdGF0ZW1lbnQobWF5YmVCb29sV3JhcCh0MCh0aGlzLnRlc3QpKSwgdDAodGhpcy5yZXN1bHQpLCBhbHRlcm5hdGUpXG59XG5cbi8vIEZ1bmN0aW9ucyBzcGVjaWZpYyB0byBjZXJ0YWluIGV4cHJlc3Npb25zLlxuY29uc3Rcblx0YmxvY2tXcmFwID0gKF8sIGJsb2NrKSA9PiB7XG5cdFx0Y29uc3QgaW52b2tlID0gY2FsbEV4cHJlc3Npb25UaHVuayhmdW5jdGlvbkV4cHJlc3Npb25UaHVuayhibG9jaywgaXNJbkdlbmVyYXRvcikpXG5cdFx0cmV0dXJuIGlzSW5HZW5lcmF0b3IgPyB5aWVsZEV4cHJlc3Npb25EZWxlZ2F0ZShpbnZva2UpIDogaW52b2tlXG5cdH0sXG5cblx0Y2FzZUJvZHkgPSAocGFydHMsIG9wRWxzZSkgPT4ge1xuXHRcdGxldCBhY2MgPSBpZkVsc2Uob3BFbHNlLCB0MCwgKCkgPT4gdGhyb3dFcnJvcignTm8gYnJhbmNoIG9mIGBjYXNlYCBtYXRjaGVzLicpKVxuXHRcdGZvciAobGV0IGkgPSBwYXJ0cy5sZW5ndGggLSAxOyBpID49IDA7IGkgPSBpIC0gMSlcblx0XHRcdGFjYyA9IHQxKHBhcnRzW2ldLCBhY2MpXG5cdFx0cmV0dXJuIGFjY1xuXHR9LFxuXG5cdHRyYW5zcGlsZUJsb2NrID0gKHJldHVybmVkLCBsaW5lcywgbGVhZCA9IG51bGwsIG9wUmVzRGVjbGFyZSA9IG51bGwsIG9wT3V0ID0gbnVsbCkgPT4ge1xuXHRcdGNvbnN0IGZpbiA9IGlmRWxzZShvcFJlc0RlY2xhcmUsXG5cdFx0XHRyZCA9PiB7XG5cdFx0XHRcdGNvbnN0IHJldCA9IG1heWJlV3JhcEluQ2hlY2tDb250YWlucyhyZXR1cm5lZCwgcmQub3BUeXBlLCByZC5uYW1lKVxuXHRcdFx0XHRyZXR1cm4gaWZFbHNlKG9wT3V0LFxuXHRcdFx0XHRcdF8gPT4gY2F0KGRlY2xhcmUocmQsIHJldCksIF8sIFJldHVyblJlcyksXG5cdFx0XHRcdFx0KCkgPT4gUmV0dXJuU3RhdGVtZW50KHJldCkpXG5cdFx0XHR9LFxuXHRcdFx0KCkgPT4gY2F0KG9wT3V0LCBSZXR1cm5TdGF0ZW1lbnQocmV0dXJuZWQpKSlcblx0XHRyZXR1cm4gQmxvY2tTdGF0ZW1lbnQoY2F0KGxlYWQsIHRMaW5lcyhsaW5lcyksIGZpbikpXG5cdH1cblxuLy8gTW9kdWxlIGhlbHBlcnNcbmNvbnN0XG5cdGFtZFdyYXBNb2R1bGUgPSAoZG9Vc2VzLCBvdGhlclVzZXMsIGJvZHkpID0+IHtcblx0XHRjb25zdCBhbGxVc2VzID0gZG9Vc2VzLmNvbmNhdChvdGhlclVzZXMpXG5cdFx0Y29uc3QgdXNlUGF0aHMgPSBBcnJheUV4cHJlc3Npb24oY2F0KFxuXHRcdFx0TGl0U3RyRXhwb3J0cyxcblx0XHRcdGFsbFVzZXMubWFwKF8gPT4gTGl0ZXJhbChtYW5nbGVQYXRoKF8ucGF0aCkpKSkpXG5cdFx0Y29uc3QgdXNlSWRlbnRpZmllcnMgPSBhbGxVc2VzLm1hcCgoXywgaSkgPT4gaWRDYWNoZWQoYCR7cGF0aEJhc2VOYW1lKF8ucGF0aCl9XyR7aX1gKSlcblx0XHRjb25zdCB1c2VBcmdzID0gY2F0KElkRXhwb3J0cywgdXNlSWRlbnRpZmllcnMpXG5cdFx0Y29uc3QgdXNlRG9zID0gZG9Vc2VzLm1hcCgodXNlLCBpKSA9PlxuXHRcdFx0bG9jKEV4cHJlc3Npb25TdGF0ZW1lbnQobXNHZXRNb2R1bGUodXNlSWRlbnRpZmllcnNbaV0pKSwgdXNlLmxvYykpXG5cdFx0Y29uc3Qgb3BVc2VEZWNsYXJlID0gb3BJZighaXNFbXB0eShvdGhlclVzZXMpLFxuXHRcdFx0KCkgPT4gVmFyaWFibGVEZWNsYXJhdGlvbignY29uc3QnLCBmbGF0TWFwKG90aGVyVXNlcywgKHVzZSwgaSkgPT5cblx0XHRcdFx0dXNlRGVjbGFyYXRvcnModXNlLCB1c2VJZGVudGlmaWVyc1tpICsgZG9Vc2VzLmxlbmd0aF0pKSkpXG5cdFx0Y29uc3QgZnVsbEJvZHkgPSBCbG9ja1N0YXRlbWVudChjYXQodXNlRG9zLCBvcFVzZURlY2xhcmUsIGJvZHksIFJldHVybkV4cG9ydHMpKVxuXHRcdGNvbnN0IGxhenlCb2R5ID1cblx0XHRcdGN4Lm9wdHMubGF6eU1vZHVsZSgpID9cblx0XHRcdFx0QmxvY2tTdGF0ZW1lbnQoWyBFeHByZXNzaW9uU3RhdGVtZW50KFxuXHRcdFx0XHRcdGFzc2lnbm1lbnRFeHByZXNzaW9uUGxhaW4oRXhwb3J0c0dldCxcblx0XHRcdFx0XHRcdG1zTGF6eShmdW5jdGlvbkV4cHJlc3Npb25UaHVuayhmdWxsQm9keSkpKSkgXSkgOlxuXHRcdFx0XHRmdWxsQm9keVxuXHRcdHJldHVybiBDYWxsRXhwcmVzc2lvbihJZERlZmluZSwgWyB1c2VQYXRocywgZnVuY3Rpb25FeHByZXNzaW9uUGxhaW4odXNlQXJncywgbGF6eUJvZHkpIF0pXG5cdH0sXG5cblx0cGF0aEJhc2VOYW1lID0gcGF0aCA9PlxuXHRcdHBhdGguc3Vic3RyKHBhdGgubGFzdEluZGV4T2YoJy8nKSArIDEpLFxuXG5cdHVzZURlY2xhcmF0b3JzID0gKHVzZSwgbW9kdWxlSWRlbnRpZmllcikgPT4ge1xuXHRcdC8vIFRPRE86IENvdWxkIGJlIG5lYXRlciBhYm91dCB0aGlzXG5cdFx0Y29uc3QgaXNMYXp5ID0gKGlzRW1wdHkodXNlLnVzZWQpID8gdXNlLm9wVXNlRGVmYXVsdCA6IHVzZS51c2VkWzBdKS5pc0xhenkoKVxuXHRcdGNvbnN0IHZhbHVlID0gKGlzTGF6eSA/IG1zTGF6eUdldE1vZHVsZSA6IG1zR2V0TW9kdWxlKShtb2R1bGVJZGVudGlmaWVyKVxuXG5cdFx0Y29uc3QgdXNlZERlZmF1bHQgPSBvcE1hcCh1c2Uub3BVc2VEZWZhdWx0LCBkZWYgPT4ge1xuXHRcdFx0Y29uc3QgZGVmZXhwID0gbXNHZXREZWZhdWx0RXhwb3J0KG1vZHVsZUlkZW50aWZpZXIpXG5cdFx0XHRjb25zdCB2YWwgPSBpc0xhenkgPyBsYXp5V3JhcChkZWZleHApIDogZGVmZXhwXG5cdFx0XHRyZXR1cm4gbG9jKFZhcmlhYmxlRGVjbGFyYXRvcihpZEZvckRlY2xhcmVDYWNoZWQoZGVmKSwgdmFsKSwgZGVmLmxvYylcblx0XHR9KVxuXG5cdFx0Y29uc3QgdXNlZERlc3RydWN0ID0gaXNFbXB0eSh1c2UudXNlZCkgPyBudWxsIDpcblx0XHRcdG1ha2VEZXN0cnVjdHVyZURlY2xhcmF0b3JzKHVzZS51c2VkLCBpc0xhenksIHZhbHVlLCB0cnVlLCBmYWxzZSlcblxuXHRcdHJldHVybiBjYXQodXNlZERlZmF1bHQsIHVzZWREZXN0cnVjdClcblx0fVxuXG4vLyBHZW5lcmFsIHV0aWxzLiBOb3QgaW4gdXRpbC5qcyBiZWNhdXNlIHRoZXNlIGNsb3NlIG92ZXIgY3guXG5jb25zdFxuXHRtYXliZUJvb2xXcmFwID0gYXN0ID0+XG5cdFx0Y3gub3B0cy5pbmNsdWRlQ2FzZUNoZWNrcygpID8gbXNCb29sKGFzdCkgOiBhc3QsXG5cblx0bWFrZURlc3RydWN0dXJlRGVjbGFyYXRvcnMgPSAoYXNzaWduZWVzLCBpc0xhenksIHZhbHVlLCBpc01vZHVsZSwgaXNFeHBvcnQpID0+IHtcblx0XHRjb25zdCBkZXN0cnVjdHVyZWROYW1lID0gYF8kJHthc3NpZ25lZXNbMF0ubG9jLnN0YXJ0LmxpbmV9YFxuXHRcdGNvbnN0IGlkRGVzdHJ1Y3R1cmVkID0gSWRlbnRpZmllcihkZXN0cnVjdHVyZWROYW1lKVxuXHRcdGNvbnN0IGRlY2xhcmF0b3JzID0gYXNzaWduZWVzLm1hcChhc3NpZ25lZSA9PiB7XG5cdFx0XHQvLyBUT0RPOiBEb24ndCBjb21waWxlIGl0IGlmIGl0J3MgbmV2ZXIgYWNjZXNzZWRcblx0XHRcdGNvbnN0IGdldCA9IGdldE1lbWJlcihpZERlc3RydWN0dXJlZCwgYXNzaWduZWUubmFtZSwgaXNMYXp5LCBpc01vZHVsZSlcblx0XHRcdHJldHVybiBtYWtlRGVjbGFyYXRvcihhc3NpZ25lZSwgZ2V0LCBpc0xhenksIGlzRXhwb3J0KVxuXHRcdH0pXG5cdFx0Ly8gR2V0dGluZyBsYXp5IG1vZHVsZSBpcyBkb25lIGJ5IG1zLmxhenlHZXRNb2R1bGUuXG5cdFx0Y29uc3QgdmFsID0gKGlzTGF6eSAmJiAhaXNNb2R1bGUpID8gbGF6eVdyYXAodmFsdWUpIDogdmFsdWVcblx0XHRyZXR1cm4gdW5zaGlmdChWYXJpYWJsZURlY2xhcmF0b3IoaWREZXN0cnVjdHVyZWQsIHZhbCksIGRlY2xhcmF0b3JzKVxuXHR9LFxuXG5cdG1ha2VEZWNsYXJhdG9yID0gKGFzc2lnbmVlLCB2YWx1ZSwgdmFsdWVJc0FscmVhZHlMYXp5LCBpc0V4cG9ydCkgPT4ge1xuXHRcdGNvbnN0IHsgbG9jLCBuYW1lLCBvcFR5cGUgfSA9IGFzc2lnbmVlXG5cdFx0Y29uc3QgaXNMYXp5ID0gYXNzaWduZWUuaXNMYXp5KClcblx0XHQvLyBUT0RPOiBhc3NlcnQoYXNzaWduZWUub3BUeXBlID09PSBudWxsKVxuXHRcdC8vIG9yIFRPRE86IEFsbG93IHR5cGUgY2hlY2sgb24gbGF6eSB2YWx1ZT9cblx0XHR2YWx1ZSA9IGlzTGF6eSA/IHZhbHVlIDogbWF5YmVXcmFwSW5DaGVja0NvbnRhaW5zKHZhbHVlLCBvcFR5cGUsIG5hbWUpXG5cdFx0aWYgKGlzRXhwb3J0KSB7XG5cdFx0XHQvLyBUT0RPOkVTNlxuXHRcdFx0Y3guY2hlY2soIWlzTGF6eSwgbG9jLCAnTGF6eSBleHBvcnQgbm90IHN1cHBvcnRlZC4nKVxuXHRcdFx0cmV0dXJuIFZhcmlhYmxlRGVjbGFyYXRvcihcblx0XHRcdFx0aWRGb3JEZWNsYXJlQ2FjaGVkKGFzc2lnbmVlKSxcblx0XHRcdFx0YXNzaWdubWVudEV4cHJlc3Npb25QbGFpbihtZW1iZXIoSWRFeHBvcnRzLCBuYW1lKSwgdmFsdWUpKVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCB2YWwgPSBpc0xhenkgJiYgIXZhbHVlSXNBbHJlYWR5TGF6eSA/IGxhenlXcmFwKHZhbHVlKSA6IHZhbHVlXG5cdFx0XHRhc3NlcnQoaXNMYXp5IHx8ICF2YWx1ZUlzQWxyZWFkeUxhenkpXG5cdFx0XHRyZXR1cm4gVmFyaWFibGVEZWNsYXJhdG9yKGlkRm9yRGVjbGFyZUNhY2hlZChhc3NpZ25lZSksIHZhbClcblx0XHR9XG5cdH0sXG5cblx0bWF5YmVXcmFwSW5DaGVja0NvbnRhaW5zID0gKGFzdCwgb3BUeXBlLCBuYW1lKSA9PlxuXHRcdChjeC5vcHRzLmluY2x1ZGVUeXBlQ2hlY2tzKCkgJiYgb3BUeXBlICE9PSBudWxsKSA/XG5cdFx0XHRtc0NoZWNrQ29udGFpbnModDAob3BUeXBlKSwgYXN0LCBMaXRlcmFsKG5hbWUpKSA6XG5cdFx0XHRhc3QsXG5cblx0Z2V0TWVtYmVyID0gKGFzdE9iamVjdCwgZ290TmFtZSwgaXNMYXp5LCBpc01vZHVsZSkgPT5cblx0XHRpc0xhenkgP1xuXHRcdG1zTGF6eUdldChhc3RPYmplY3QsIExpdGVyYWwoZ290TmFtZSkpIDpcblx0XHRpc01vZHVsZSAmJiBjeC5vcHRzLmluY2x1ZGVVc2VDaGVja3MoKSA/XG5cdFx0bXNHZXQoYXN0T2JqZWN0LCBMaXRlcmFsKGdvdE5hbWUpKSA6XG5cdFx0bWVtYmVyKGFzdE9iamVjdCwgZ290TmFtZSlcbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9