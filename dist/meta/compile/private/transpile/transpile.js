if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'esast/dist/ast', 'esast/dist/util', 'esast/dist/specialize', '../../Expression', '../U/Bag', '../U/Op', '../U/util', './esast-util', './transpileObj', './transpileModule', './util'], function (exports, _esastDistAst, _esastDistUtil, _esastDistSpecialize, _Expression, _UBag, _UOp, _UUtil, _esastUtil, _transpileObj, _transpileModule, _util) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } };

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	exports.default = transpile;

	var _transpileModule2 = _interopRequire(_transpileModule);

	let cx, vr, isInGenerator;

	function transpile(_cx, e, _vr) {
		cx = _cx;
		vr = _vr;
		isInGenerator = false;
		const res = t(e);
		// Release for garbage collection
		cx = vr = undefined;
		return res;
	}

	const t = function (expr, arg, arg2, arg3) {
		const ast = expr.transpileSubtree(arg, arg2, arg3);
		if (cx.opts.sourceMap() && !(ast instanceof Array))
			// Array is only allowed for statement groups inside of Blocks, such as Debug.
			ast.loc = expr.loc;
		return ast;
	};

	exports.t = t;
	function transpileBlock(lead, opResDeclare, opOut) {
		var _this = this;

		if (lead === undefined) lead = [];
		if (opResDeclare === undefined) opResDeclare = opOut = _UOp.None;
		const body = _UBag.flatMap(this.lines, function (line) {
			return _esastDistUtil.toStatements(t(line));
		});
		const isVal = this instanceof _Expression.BlockVal;
		const fin = _UOp.ifElse(opResDeclare, function (rd) {
			_UUtil.assert(isVal);
			const returned = _util.maybeWrapInCheckContains(cx, t(_this.returned), rd.opType, 'res');
			return _UOp.ifElse(opOut, function (o) {
				return [_esastUtil.declare(rd, returned)].concat(o, [_util.ReturnRes]);
			}, function () {
				return [_esastDistAst.ReturnStatement(returned)];
			});
		}, function () {
			return opOut.concat(_UOp.opIf(isVal, function () {
				return _esastDistAst.ReturnStatement(t(_this.returned));
			}));
		});
		return _esastDistAst.BlockStatement(lead.concat(body, fin));
	}

	_UUtil.implementMany(_Expression, 'transpileSubtree', {
		Assign: function () {
			return _esastDistSpecialize.variableDeclarationConst([_util.makeDeclarator(cx, this.loc, this.assignee, this.k, t(this.value))]);
		},
		// TODO:ES6 Just use native destructuring assign
		AssignDestructure: function () {
			return _esastDistSpecialize.variableDeclarationConst(_util.makeDestructureDeclarators(cx, this.loc, this.assignees, this.isLazy, t(this.value), this.k, false));
		},
		BlockDo: transpileBlock,
		BlockVal: transpileBlock,
		BlockWrap: function () {
			return blockWrap(this, t(this.block));
		},
		Call: function () {
			const anySplat = this.args.some(function (arg) {
				return arg instanceof _Expression.Splat;
			});
			if (anySplat) {
				const args = this.args.map(function (arg) {
					return arg instanceof _Expression.Splat ? _util.msArr([t(arg.splatted)]) : t(arg);
				});
				return _esastDistAst.CallExpression(_util.IdFunctionApplyCall, [t(this.called), _util.LitNull, _esastDistAst.CallExpression(_esastDistUtil.member(_util.LitEmptyArray, 'concat'), args)]);
			} else return _esastDistAst.CallExpression(t(this.called), this.args.map(t));
		},
		CaseDo: function () {
			var _this2 = this;

			return _UOp.ifElse(this.opCased, function (cased) {
				return _esastDistAst.BlockStatement([t(cased), caseBody(_this2.parts, _this2.opElse)]);
			}, function () {
				return caseBody(_this2.parts, _this2.opElse);
			});
		},
		CaseVal: function () {
			const body = caseBody(this.parts, this.opElse);
			const block = _UOp.ifElse(this.opCased, function (cased) {
				return [t(cased), body];
			}, function () {
				return [body];
			});
			return blockWrap(this, _esastDistAst.BlockStatement(block));
		},
		CaseDoPart: function () {
			return casePart(this.test, this.result, true);
		},
		CaseValPart: function () {
			return casePart(this.test, this.result, false);
		},
		// TODO: includeInoutChecks is misnamed
		Debug: function () {
			return cx.opts.includeInoutChecks() ? _UBag.flatMap(this.lines, function (line) {
				return _esastDistUtil.toStatements(t(line));
			}) : [];
		},
		ObjReturn: function () {
			return _transpileObj.transpileObjReturn(this, cx);
		},
		ObjSimple: function () {
			return _transpileObj.transpileObjSimple(this, cx);
		},
		EndLoop: function () {
			return _esastDistAst.BreakStatement(loopId(vr.endLoopToLoop.get(this)));
		},
		Fun: function () {
			const oldInGenerator = isInGenerator;
			isInGenerator = this.k === '~|';

			// TODO:ES6 use `...`
			const nArgs = _esastDistAst.Literal(this.args.length);
			const opDeclareRest = this.opRestArg.map(function (rest) {
				return _esastUtil.declare(rest, _esastDistAst.CallExpression(_util.IdArraySliceCall, [_util.IdArguments, nArgs]));
			});
			const argChecks = _UBag.flatMap(this.args, function (arg) {
				return _util.opLocalCheck(cx, arg, arg.isLazy);
			});
			const _in = _UBag.flatMap(this.opIn, function (i) {
				return _esastDistUtil.toStatements(t(i));
			});
			const lead = opDeclareRest.concat(argChecks, _in);

			const _out = _UBag.flatMap(this.opOut, function (o) {
				return _esastDistUtil.toStatements(t(o));
			});
			const body = t(this.block, lead, this.opResDeclare, _out);
			const args = this.args.map(t);
			const res = _esastDistSpecialize.functionExpressionPlain(args, body, this.k === '~|');

			isInGenerator = oldInGenerator;
			return res;
		},
		Lazy: function () {
			return _util.lazyWrap(t(this.value));
		},
		ListReturn: function () {
			return _esastDistAst.ArrayExpression(_UBag.range(0, this.length).map(function (i) {
				return _esastDistUtil.idCached('_' + i);
			}));
		},
		ListSimple: function () {
			return _esastDistAst.ArrayExpression(this.parts.map(t));
		},
		ListEntry: function () {
			return _esastUtil.declareSpecial('_' + this.index, t(this.value));
		},
		ELiteral: function () {
			switch (this.k) {
				case Number:
					{
						// TODO: Number literals should store Numbers...
						const n = Number.parseFloat(this.value);
						// Negative numbers are not part of ES spec.
						// http://www.ecma-international.org/ecma-262/5.1/#sec-7.8.3
						const lit = _esastDistAst.Literal(Math.abs(n));
						return _UUtil.isPositive(n) ? lit : _esastDistSpecialize.unaryExpressionNegate(lit);
					}
				case String:
					return _esastDistAst.Literal(this.value);
				case 'js':
					switch (this.value) {
						// TODO:USE* Get rid of this!
						case 'msGetModule':
							return _esastDistUtil.member(_util.IdMs, 'getModule');
						case 'require':
							return _esastDistUtil.idCached('require');
						default:
							throw new Error('This js literal not supported.');
					}
				default:
					throw new Error(this.k);
			}
		},
		GlobalAccess: function () {
			return _esastDistAst.Identifier(this.name);
		},
		LocalAccess: function () {
			return _util.accessLocal(this, vr);
		},
		LocalDeclare: function () {
			return _esastUtil.idForDeclareCached(this);
		},
		// TODO: Don't always label!
		Loop: function () {
			return _esastDistAst.LabeledStatement(loopId(this), _esastDistSpecialize.whileStatementInfinite(t(this.block)));
		},
		MapReturn: function () {
			return _util.msMap(_UBag.flatMap(_UBag.range(0, this.length), function (i) {
				return [_esastDistUtil.idCached('_k' + i.toString()), _esastDistUtil.idCached('_v' + i.toString())];
			}));
		},
		MapEntry: function () {
			return _esastDistSpecialize.variableDeclarationConst([_esastDistAst.VariableDeclarator(_esastDistUtil.idCached('_k' + this.index), t(this.key)), _esastDistAst.VariableDeclarator(_esastDistUtil.idCached('_v' + this.index), t(this.val))]);
		},
		Member: function () {
			return _esastDistUtil.member(t(this.object), this.name);
		},
		Module: function () {
			return _transpileModule2(this, cx);
		},
		// TODO:ES6 Use `export default`
		ModuleDefaultExport: function () {
			const m = _esastDistUtil.member(_util.IdExports, 'default');
			return _esastDistAst.AssignmentExpression('=', m, t(this.value));
		},
		Quote: function () {
			// TODO:ES6 use template strings
			const isStrLit = function (_) {
				return _ instanceof _Expression.ELiteral && _.k === String;
			};
			const part0 = this.parts[0];

			var _ref = isStrLit(part0) ? [t(part0), _UBag.tail(this.parts)] : [_util.LitEmptyString, this.parts];

			var _ref2 = _slicedToArray(_ref, 2);

			const first = _ref2[0];
			const restParts = _ref2[1];

			return restParts.reduce(function (ex, _) {
				return _esastDistSpecialize.binaryExpressionPlus(ex, isStrLit(_) ? t(_) : _util.msShow([t(_)]));
			}, first);
		},
		Special: function () {
			// Make new objects because we will assign `loc` to them.
			switch (this.k) {
				case 'contains':
					return _esastDistUtil.member(_util.IdMs, 'contains');
				case 'debugger':
					return _esastDistAst.DebuggerStatement();
				case 'sub':
					return _esastDistUtil.member(_util.IdMs, 'sub');
				case 'this':
					return _esastDistAst.ThisExpression();
				case 'this-module-directory':
					return _esastDistAst.Identifier('__dirname');
				default:
					throw new Error(this.k);
			}
		},
		Splat: function () {
			cx.fail(this.loc, 'Splat must appear as argument to a call.');
		},
		Yield: function () {
			return _esastDistSpecialize.yieldExpressionNoDelegate(t(this.yielded));
		},
		YieldTo: function () {
			return _esastDistSpecialize.yieldExpressionDelegate(t(this.yieldedTo));
		}
	});

	const blockWrap = function (_, block) {
		const g = isInGenerator;
		const invoke = _esastDistSpecialize.callExpressionThunk(_esastDistSpecialize.functionExpressionThunk(block, g));
		return g ? _esastDistSpecialize.yieldExpressionDelegate(invoke) : invoke;
	};

	const caseFail = _esastDistAst.SwitchCase(null, [_esastDistUtil.throwError('No branch of `case` matches.')]);
	function caseBody(parts, opElse) {
		const elze = _UOp.ifElse(opElse, function (_) {
			return _esastDistAst.SwitchCase(null, [t(_)]);
		}, function () {
			return caseFail;
		});
		const cases = _UBag.push(parts.map(function (part) {
			return t(part);
		}), elze);
		return _esastDistSpecialize.switchStatementOnTrue(cases);
	}

	function casePart(test, result, needBreak) {
		const checkedTest = cx.opts.includeCaseChecks() ? _util.msBool([t(test)]) : t(test);
		const lines = needBreak ? [t(result), _util.Break] : [t(result)];
		return _esastDistAst.SwitchCase(checkedTest, lines);
	}

	// TODO: MOVE
	const loopId = function (loop) {
		return _esastDistUtil.idCached('loop' + loop.loc.start.line);
	};
});
//# sourceMappingURL=../../../../meta/compile/private/transpile/transpile.js.map