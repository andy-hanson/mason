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
		const res = t0(e);
		// Release for garbage collection
		cx = vr = undefined;
		return res;
	}

	const t0 = function (expr) {
		const ast = expr.transpileSubtree();
		if (cx.opts.sourceMap()) ast.loc = expr.loc;
		return ast;
	};
	exports.t0 = t0;
	const t3 = function (expr, arg, arg2, arg3) {
		const ast = expr.transpileSubtree(arg, arg2, arg3);
		if (cx.opts.sourceMap()) ast.loc = expr.loc;
		return ast;
	};
	exports.t3 = t3;
	const tm = function (expr) {
		const ast = expr.transpileSubtree();
		if (cx.opts.sourceMap() && !(ast instanceof Array))
			// Debug may produce multiple statements.
			ast.loc = expr.loc;
		return ast;
	};

	const toStatements = function (_) {
		return _ instanceof Array ? _.map(_esastDistUtil.toStatement) : [_esastDistUtil.toStatement(_)];
	};

	function transpileBlock(lead, opResDeclare, opOut) {
		var _this = this;

		if (lead === undefined) lead = [];
		if (opResDeclare === undefined) opResDeclare = opOut = _UOp.None;
		const body = _UBag.flatMap(this.lines, function (line) {
			return toStatements(tm(line));
		});
		const isVal = this instanceof _Expression.BlockVal;
		const fin = _UOp.ifElse(opResDeclare, function (rd) {
			_UUtil.assert(isVal);
			const returned = _util.maybeWrapInCheckContains(cx, t0(_this.returned), rd.opType, 'res');
			return _UOp.ifElse(opOut, function (o) {
				return [_esastUtil.declare(rd, returned)].concat(o, [_util.ReturnRes]);
			}, function () {
				return [_esastDistAst.ReturnStatement(returned)];
			});
		}, function () {
			return opOut.concat(_UOp.opIf(isVal, function () {
				return _esastDistAst.ReturnStatement(t0(_this.returned));
			}));
		});
		return _esastDistAst.BlockStatement(lead.concat(body, fin));
	}

	_UUtil.implementMany(_Expression, 'transpileSubtree', {
		Assign: function () {
			return _esastDistSpecialize.variableDeclarationConst([_util.makeDeclarator(cx, this.loc, this.assignee, this.k, t0(this.value))]);
		},
		// TODO:ES6 Just use native destructuring assign
		AssignDestructure: function () {
			return _esastDistSpecialize.variableDeclarationConst(_util.makeDestructureDeclarators(cx, this.loc, this.assignees, this.isLazy, t0(this.value), this.k, false));
		},
		BlockDo: transpileBlock,
		BlockVal: transpileBlock,
		BlockWrap: function () {
			return blockWrap(this, t0(this.block));
		},
		Call: function () {
			const anySplat = this.args.some(function (arg) {
				return arg instanceof _Expression.Splat;
			});
			if (anySplat) {
				const args = this.args.map(function (arg) {
					return arg instanceof _Expression.Splat ? _util.msArr([t0(arg.splatted)]) : t0(arg);
				});
				return _esastDistAst.CallExpression(_util.IdFunctionApplyCall, [t0(this.called), _util.LitNull, _esastDistAst.CallExpression(_esastDistUtil.member(_util.LitEmptyArray, 'concat'), args)]);
			} else return _esastDistAst.CallExpression(t0(this.called), this.args.map(t0));
		},
		CaseDo: function () {
			var _this2 = this;

			return _UOp.ifElse(this.opCased, function (cased) {
				return _esastDistAst.BlockStatement([t0(cased), caseBody(_this2.parts, _this2.opElse)]);
			}, function () {
				return caseBody(_this2.parts, _this2.opElse);
			});
		},
		CaseVal: function () {
			const body = caseBody(this.parts, this.opElse);
			const block = _UOp.ifElse(this.opCased, function (cased) {
				return [t0(cased), body];
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
				return toStatements(t0(line));
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
				return toStatements(t0(i));
			});
			const lead = opDeclareRest.concat(argChecks, _in);

			const _out = _UBag.flatMap(this.opOut, function (o) {
				return toStatements(t0(o));
			});
			const body = t3(this.block, lead, this.opResDeclare, _out);
			const args = this.args.map(t0);
			const res = _esastDistSpecialize.functionExpressionPlain(args, body, this.k === '~|');

			isInGenerator = oldInGenerator;
			return res;
		},
		Lazy: function () {
			return _util.lazyWrap(t0(this.value));
		},
		ListReturn: function () {
			return _esastDistAst.ArrayExpression(_UBag.range(0, this.length).map(function (i) {
				return _esastDistUtil.idCached('_' + i);
			}));
		},
		ListSimple: function () {
			return _esastDistAst.ArrayExpression(this.parts.map(t0));
		},
		ListEntry: function () {
			return _esastUtil.declareSpecial('_' + this.index, t0(this.value));
		},
		NumberLiteral: function () {
			// Negative numbers are not part of ES spec.
			// http://www.ecma-international.org/ecma-262/5.1/#sec-7.8.3
			const lit = _esastDistAst.Literal(Math.abs(this.value));
			return _UUtil.isPositive(this.value) ? lit : _esastUtil.unaryExpressionNegate(lit);
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
			return _esastDistAst.LabeledStatement(loopId(this), _esastUtil.whileStatementInfinite(t0(this.block)));
		},
		MapEntry: function () {
			const k = '_k' + this.index;
			const v = '_v' + this.index;
			return _esastDistSpecialize.variableDeclarationConst([_esastDistAst.VariableDeclarator(_esastDistUtil.idCached(k), t0(this.key)), _esastDistAst.VariableDeclarator(_esastDistUtil.idCached(v), t0(this.val))]);
		},
		MapReturn: function () {
			return _util.msMap(_UBag.flatMap(_UBag.range(0, this.length), function (i) {
				return [_esastDistUtil.idCached('_k' + i), _esastDistUtil.idCached('_v' + i)];
			}));
		},
		Member: function () {
			return _esastDistUtil.member(t0(this.object), this.name);
		},
		Module: function () {
			return _transpileModule2(this, cx);
		},
		// TODO:ES6 Use `export default`
		ModuleDefaultExport: function () {
			const m = _esastDistUtil.member(_util.IdExports, 'default');
			return _esastDistAst.AssignmentExpression('=', m, t0(this.value));
		},
		Quote: function () {
			// TODO:ES6 use template strings
			const part0 = this.parts[0];

			var _ref = typeof part0 === 'string' ? [_esastDistAst.Literal(part0), _UBag.tail(this.parts)] : [_util.LitEmptyString, this.parts];

			var _ref2 = _slicedToArray(_ref, 2);

			const first = _ref2[0];
			const restParts = _ref2[1];

			return restParts.reduce(function (ex, _) {
				return _esastUtil.binaryExpressionPlus(ex, typeof _ === 'string' ? _esastDistAst.Literal(_) : _util.msShow([t0(_)]));
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
			return _esastDistSpecialize.yieldExpressionNoDelegate(t0(this.yielded));
		},
		YieldTo: function () {
			return _esastDistSpecialize.yieldExpressionDelegate(t0(this.yieldedTo));
		}
	});

	const blockWrap = function (_, block) {
		const invoke = _esastDistSpecialize.callExpressionThunk(_esastDistSpecialize.functionExpressionThunk(block, isInGenerator));
		return isInGenerator ? _esastDistSpecialize.yieldExpressionDelegate(invoke) : invoke;
	},
	      caseFail = _esastDistAst.SwitchCase(null, [_esastUtil.throwError('No branch of `case` matches.')]),
	      caseBody = function (parts, opElse) {
		const elze = _UOp.ifElse(opElse, function (_) {
			return _esastDistAst.SwitchCase(null, [t0(_)]);
		}, function () {
			return caseFail;
		});
		const cases = _UBag.push(parts.map(t0), elze);
		return _esastUtil.switchStatementOnTrue(cases);
	},
	      casePart = function (test, result, needBreak) {
		const checkedTest = cx.opts.includeCaseChecks() ? _util.msBool([t0(test)]) : t0(test);
		const lines = needBreak ? [t0(result), _util.Break] : [t0(result)];
		return _esastDistAst.SwitchCase(checkedTest, lines);
	},
	      loopId = function (loop) {
		return _esastDistUtil.idCached('loop' + loop.loc.start.line);
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS90cmFuc3BpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OzttQkF3QndCLFNBQVM7Ozs7QUFGakMsS0FBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLGFBQWEsQ0FBQTs7QUFFVixVQUFTLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRTtBQUM5QyxJQUFFLEdBQUcsR0FBRyxDQUFBO0FBQ1IsSUFBRSxHQUFHLEdBQUcsQ0FBQTtBQUNSLGVBQWEsR0FBRyxLQUFLLENBQUE7QUFDckIsUUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBOztBQUVqQixJQUFFLEdBQUcsRUFBRSxHQUFHLFNBQVMsQ0FBQTtBQUNuQixTQUFPLEdBQUcsQ0FBQTtFQUNWOztBQUVNLE9BQU0sRUFBRSxHQUFHLFVBQUEsSUFBSSxFQUFJO0FBQ3pCLFFBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFBO0FBQ25DLE1BQUksRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFDdEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFBO0FBQ25CLFNBQU8sR0FBRyxDQUFBO0VBQ1YsQ0FBQTtTQUxZLEVBQUUsR0FBRixFQUFFO0FBTVIsT0FBTSxFQUFFLEdBQUcsVUFBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUs7QUFDNUMsUUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFDbEQsTUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUN0QixHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUE7QUFDbkIsU0FBTyxHQUFHLENBQUE7RUFDVixDQUFBO1NBTFksRUFBRSxHQUFGLEVBQUU7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RSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLE1BdE45QixNQUFNLENBc04rQixDQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ2pGLFFBQU0sS0FBSyxHQUFHLFNBQVMsR0FBRyxDQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUExTkMsS0FBSyxDQTBORyxHQUFHLENBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFFLENBQUE7QUFDaEUsU0FBTyxjQTFPUixVQUFVLENBME9TLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQTtFQUNyQztPQUVELE1BQU0sR0FBRyxVQUFBLElBQUk7U0FBSSxlQTVPVCxRQUFRLFVBNE9pQixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUc7RUFBQSxDQUFBIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS90cmFuc3BpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcnJheUV4cHJlc3Npb24sIEFzc2lnbm1lbnRFeHByZXNzaW9uLCBCbG9ja1N0YXRlbWVudCwgQnJlYWtTdGF0ZW1lbnQsXG5cdENhbGxFeHByZXNzaW9uLCBEZWJ1Z2dlclN0YXRlbWVudCwgSWRlbnRpZmllciwgTGFiZWxlZFN0YXRlbWVudCwgTGl0ZXJhbCxcblx0U3dpdGNoQ2FzZSwgVGhpc0V4cHJlc3Npb24sIFZhcmlhYmxlRGVjbGFyYXRvciwgUmV0dXJuU3RhdGVtZW50IH0gZnJvbSAnZXNhc3QvZGlzdC9hc3QnXG5pbXBvcnQgeyBpZENhY2hlZCwgbWVtYmVyLCB0b1N0YXRlbWVudCB9IGZyb20gJ2VzYXN0L2Rpc3QvdXRpbCdcbmltcG9ydCB7IGNhbGxFeHByZXNzaW9uVGh1bmssIGZ1bmN0aW9uRXhwcmVzc2lvblBsYWluLCBmdW5jdGlvbkV4cHJlc3Npb25UaHVuayxcblx0dmFyaWFibGVEZWNsYXJhdGlvbkNvbnN0LCB5aWVsZEV4cHJlc3Npb25EZWxlZ2F0ZSwgeWllbGRFeHByZXNzaW9uTm9EZWxlZ2F0ZVxuXHR9IGZyb20gJ2VzYXN0L2Rpc3Qvc3BlY2lhbGl6ZSdcbmltcG9ydCAqIGFzIEVFeHBvcnRzIGZyb20gJy4uLy4uL0V4cHJlc3Npb24nXG5pbXBvcnQgeyBmbGF0TWFwLCBwdXNoLCByYW5nZSwgdGFpbCB9IGZyb20gJy4uL1UvQmFnJ1xuaW1wb3J0IHsgaWZFbHNlLCBOb25lLCBvcElmIH0gZnJvbSAnLi4vVS9PcCdcbmltcG9ydCB7IGFzc2VydCwgaW1wbGVtZW50TWFueSwgaXNQb3NpdGl2ZSB9IGZyb20gJy4uL1UvdXRpbCdcbmltcG9ydCB7IGJpbmFyeUV4cHJlc3Npb25QbHVzLCBkZWNsYXJlLCBkZWNsYXJlU3BlY2lhbCwgaWRGb3JEZWNsYXJlQ2FjaGVkLCBzd2l0Y2hTdGF0ZW1lbnRPblRydWUsXG5cdHRocm93RXJyb3IsIHVuYXJ5RXhwcmVzc2lvbk5lZ2F0ZSwgd2hpbGVTdGF0ZW1lbnRJbmZpbml0ZSB9IGZyb20gJy4vZXNhc3QtdXRpbCdcbmltcG9ydCB7IHRyYW5zcGlsZU9ialJldHVybiwgdHJhbnNwaWxlT2JqU2ltcGxlIH0gZnJvbSAnLi90cmFuc3BpbGVPYmonXG5pbXBvcnQgdHJhbnNwaWxlTW9kdWxlIGZyb20gJy4vdHJhbnNwaWxlTW9kdWxlJ1xuaW1wb3J0IHtcblx0SWRFeHBvcnRzLCBJZEFyZ3VtZW50cywgSWRBcnJheVNsaWNlQ2FsbCwgSWRGdW5jdGlvbkFwcGx5Q2FsbCwgSWRNcyxcblx0TGl0RW1wdHlBcnJheSwgTGl0RW1wdHlTdHJpbmcsIExpdE51bGwsIEJyZWFrLCBSZXR1cm5SZXMsXG5cdGFjY2Vzc0xvY2FsLCBsYXp5V3JhcCwgbWFrZURlY2xhcmF0b3IsIG1ha2VEZXN0cnVjdHVyZURlY2xhcmF0b3JzLFxuXHRtYXliZVdyYXBJbkNoZWNrQ29udGFpbnMsXG5cdG9wTG9jYWxDaGVjaywgbXNBcnIsIG1zQm9vbCwgbXNNYXAsIG1zU2hvdyB9IGZyb20gJy4vdXRpbCdcblxubGV0IGN4LCB2ciwgaXNJbkdlbmVyYXRvclxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cmFuc3BpbGUoX2N4LCBlLCBfdnIpIHtcblx0Y3ggPSBfY3hcblx0dnIgPSBfdnJcblx0aXNJbkdlbmVyYXRvciA9IGZhbHNlXG5cdGNvbnN0IHJlcyA9IHQwKGUpXG5cdC8vIFJlbGVhc2UgZm9yIGdhcmJhZ2UgY29sbGVjdGlvblxuXHRjeCA9IHZyID0gdW5kZWZpbmVkXG5cdHJldHVybiByZXNcbn1cblxuZXhwb3J0IGNvbnN0IHQwID0gZXhwciA9PiB7XG5cdGNvbnN0IGFzdCA9IGV4cHIudHJhbnNwaWxlU3VidHJlZSgpXG5cdGlmIChjeC5vcHRzLnNvdXJjZU1hcCgpKVxuXHRcdGFzdC5sb2MgPSBleHByLmxvY1xuXHRyZXR1cm4gYXN0XG59XG5leHBvcnQgY29uc3QgdDMgPSAoZXhwciwgYXJnLCBhcmcyLCBhcmczKSA9PiB7XG5cdGNvbnN0IGFzdCA9IGV4cHIudHJhbnNwaWxlU3VidHJlZShhcmcsIGFyZzIsIGFyZzMpXG5cdGlmIChjeC5vcHRzLnNvdXJjZU1hcCgpKVxuXHRcdGFzdC5sb2MgPSBleHByLmxvY1xuXHRyZXR1cm4gYXN0XG59XG5jb25zdCB0bSA9IGV4cHIgPT4ge1xuXHRjb25zdCBhc3QgPSBleHByLnRyYW5zcGlsZVN1YnRyZWUoKVxuXHRpZiAoY3gub3B0cy5zb3VyY2VNYXAoKSAmJiAhKGFzdCBpbnN0YW5jZW9mIEFycmF5KSlcblx0XHQvLyBEZWJ1ZyBtYXkgcHJvZHVjZSBtdWx0aXBsZSBzdGF0ZW1lbnRzLlxuXHRcdGFzdC5sb2MgPSBleHByLmxvY1xuXHRyZXR1cm4gYXN0XG59XG5cbmNvbnN0IHRvU3RhdGVtZW50cyA9IF8gPT4gXyBpbnN0YW5jZW9mIEFycmF5ID8gXy5tYXAodG9TdGF0ZW1lbnQpIDogWyB0b1N0YXRlbWVudChfKSBdXG5cbmZ1bmN0aW9uIHRyYW5zcGlsZUJsb2NrKGxlYWQsIG9wUmVzRGVjbGFyZSwgb3BPdXQpIHtcblx0aWYgKGxlYWQgPT09IHVuZGVmaW5lZClcblx0XHRsZWFkID0gW11cblx0aWYgKG9wUmVzRGVjbGFyZSA9PT0gdW5kZWZpbmVkKVxuXHRcdG9wUmVzRGVjbGFyZSA9IG9wT3V0ID0gTm9uZVxuXHRjb25zdCBib2R5ID0gZmxhdE1hcCh0aGlzLmxpbmVzLCBsaW5lID0+IHRvU3RhdGVtZW50cyh0bShsaW5lKSkpXG5cdGNvbnN0IGlzVmFsID0gdGhpcyBpbnN0YW5jZW9mIEVFeHBvcnRzLkJsb2NrVmFsXG5cdGNvbnN0IGZpbiA9IGlmRWxzZShvcFJlc0RlY2xhcmUsXG5cdFx0cmQgPT4ge1xuXHRcdFx0YXNzZXJ0KGlzVmFsKVxuXHRcdFx0Y29uc3QgcmV0dXJuZWQgPSBtYXliZVdyYXBJbkNoZWNrQ29udGFpbnMoY3gsIHQwKHRoaXMucmV0dXJuZWQpLCByZC5vcFR5cGUsICdyZXMnKVxuXHRcdFx0cmV0dXJuIGlmRWxzZShvcE91dCxcblx0XHRcdFx0byA9PiBbIGRlY2xhcmUocmQsIHJldHVybmVkKSBdLmNvbmNhdChvLCBbIFJldHVyblJlcyBdKSxcblx0XHRcdFx0KCkgPT4gWyBSZXR1cm5TdGF0ZW1lbnQocmV0dXJuZWQpIF0pXG5cdFx0fSxcblx0XHQoKSA9PiBvcE91dC5jb25jYXQob3BJZihpc1ZhbCwgKCkgPT4gUmV0dXJuU3RhdGVtZW50KHQwKHRoaXMucmV0dXJuZWQpKSkpKVxuXHRyZXR1cm4gQmxvY2tTdGF0ZW1lbnQobGVhZC5jb25jYXQoYm9keSwgZmluKSlcbn1cblxuaW1wbGVtZW50TWFueShFRXhwb3J0cywgJ3RyYW5zcGlsZVN1YnRyZWUnLCB7XG5cdEFzc2lnbigpIHtcblx0XHRyZXR1cm4gdmFyaWFibGVEZWNsYXJhdGlvbkNvbnN0KFtcblx0XHRcdG1ha2VEZWNsYXJhdG9yKGN4LCB0aGlzLmxvYywgdGhpcy5hc3NpZ25lZSwgdGhpcy5rLCB0MCh0aGlzLnZhbHVlKSkgXSlcblx0fSxcblx0Ly8gVE9ETzpFUzYgSnVzdCB1c2UgbmF0aXZlIGRlc3RydWN0dXJpbmcgYXNzaWduXG5cdEFzc2lnbkRlc3RydWN0dXJlKCkge1xuXHRcdHJldHVybiB2YXJpYWJsZURlY2xhcmF0aW9uQ29uc3QoXG5cdFx0XHRtYWtlRGVzdHJ1Y3R1cmVEZWNsYXJhdG9ycyhcblx0XHRcdFx0Y3gsXG5cdFx0XHRcdHRoaXMubG9jLFxuXHRcdFx0XHR0aGlzLmFzc2lnbmVlcyxcblx0XHRcdFx0dGhpcy5pc0xhenksXG5cdFx0XHRcdHQwKHRoaXMudmFsdWUpLFxuXHRcdFx0XHR0aGlzLmssXG5cdFx0XHRcdGZhbHNlKSlcblx0fSxcblx0QmxvY2tEbzogdHJhbnNwaWxlQmxvY2ssXG5cdEJsb2NrVmFsOiB0cmFuc3BpbGVCbG9jayxcblx0QmxvY2tXcmFwKCkgeyByZXR1cm4gYmxvY2tXcmFwKHRoaXMsIHQwKHRoaXMuYmxvY2spKSB9LFxuXHRDYWxsKCkge1xuXHRcdGNvbnN0IGFueVNwbGF0ID0gdGhpcy5hcmdzLnNvbWUoYXJnID0+IGFyZyBpbnN0YW5jZW9mIEVFeHBvcnRzLlNwbGF0KVxuXHRcdGlmIChhbnlTcGxhdCkge1xuXHRcdFx0Y29uc3QgYXJncyA9IHRoaXMuYXJncy5tYXAoYXJnID0+XG5cdFx0XHRcdGFyZyBpbnN0YW5jZW9mIEVFeHBvcnRzLlNwbGF0ID9cblx0XHRcdFx0XHRtc0FycihbIHQwKGFyZy5zcGxhdHRlZCkgXSkgOlxuXHRcdFx0XHRcdHQwKGFyZykpXG5cdFx0XHRyZXR1cm4gQ2FsbEV4cHJlc3Npb24oSWRGdW5jdGlvbkFwcGx5Q2FsbCwgW1xuXHRcdFx0XHR0MCh0aGlzLmNhbGxlZCksXG5cdFx0XHRcdExpdE51bGwsXG5cdFx0XHRcdENhbGxFeHByZXNzaW9uKG1lbWJlcihMaXRFbXB0eUFycmF5LCAnY29uY2F0JyksIGFyZ3MpXSlcblx0XHR9XG5cdFx0ZWxzZSByZXR1cm4gQ2FsbEV4cHJlc3Npb24odDAodGhpcy5jYWxsZWQpLCB0aGlzLmFyZ3MubWFwKHQwKSlcblx0fSxcblx0Q2FzZURvKCkge1xuXHRcdHJldHVybiBpZkVsc2UodGhpcy5vcENhc2VkLFxuXHRcdFx0Y2FzZWQgPT4gQmxvY2tTdGF0ZW1lbnQoWyB0MChjYXNlZCksIGNhc2VCb2R5KHRoaXMucGFydHMsIHRoaXMub3BFbHNlKSBdKSxcblx0XHRcdCgpID0+IGNhc2VCb2R5KHRoaXMucGFydHMsIHRoaXMub3BFbHNlKSlcblx0fSxcblx0Q2FzZVZhbCgpIHtcblx0XHRjb25zdCBib2R5ID0gY2FzZUJvZHkodGhpcy5wYXJ0cywgdGhpcy5vcEVsc2UpXG5cdFx0Y29uc3QgYmxvY2sgPSBpZkVsc2UodGhpcy5vcENhc2VkLCBjYXNlZCA9PiBbIHQwKGNhc2VkKSwgYm9keSBdLCAoKSA9PiBbIGJvZHkgXSlcblx0XHRyZXR1cm4gYmxvY2tXcmFwKHRoaXMsIEJsb2NrU3RhdGVtZW50KGJsb2NrKSlcblx0fSxcblx0Q2FzZURvUGFydCgpIHsgcmV0dXJuIGNhc2VQYXJ0KHRoaXMudGVzdCwgdGhpcy5yZXN1bHQsIHRydWUpIH0sXG5cdENhc2VWYWxQYXJ0KCkgeyByZXR1cm4gY2FzZVBhcnQodGhpcy50ZXN0LCB0aGlzLnJlc3VsdCwgZmFsc2UpIH0sXG5cdC8vIFRPRE86IGluY2x1ZGVJbm91dENoZWNrcyBpcyBtaXNuYW1lZFxuXHREZWJ1ZygpIHtcblx0XHRyZXR1cm4gY3gub3B0cy5pbmNsdWRlSW5vdXRDaGVja3MoKSA/XG5cdFx0XHRmbGF0TWFwKHRoaXMubGluZXMsIGxpbmUgPT4gdG9TdGF0ZW1lbnRzKHQwKGxpbmUpKSkgOlxuXHRcdFx0WyBdXG5cdH0sXG5cdE9ialJldHVybigpIHsgcmV0dXJuIHRyYW5zcGlsZU9ialJldHVybih0aGlzLCBjeCkgfSxcblx0T2JqU2ltcGxlKCkgeyByZXR1cm4gdHJhbnNwaWxlT2JqU2ltcGxlKHRoaXMsIGN4KSB9LFxuXHRFbmRMb29wKCkgeyByZXR1cm4gQnJlYWtTdGF0ZW1lbnQobG9vcElkKHZyLmVuZExvb3BUb0xvb3AuZ2V0KHRoaXMpKSkgfSxcblx0RnVuKCkge1xuXHRcdGNvbnN0IG9sZEluR2VuZXJhdG9yID0gaXNJbkdlbmVyYXRvclxuXHRcdGlzSW5HZW5lcmF0b3IgPSB0aGlzLmsgPT09ICd+fCdcblxuXHRcdC8vIFRPRE86RVM2IHVzZSBgLi4uYFxuXHRcdGNvbnN0IG5BcmdzID0gTGl0ZXJhbCh0aGlzLmFyZ3MubGVuZ3RoKVxuXHRcdGNvbnN0IG9wRGVjbGFyZVJlc3QgPSB0aGlzLm9wUmVzdEFyZy5tYXAocmVzdCA9PlxuXHRcdFx0ZGVjbGFyZShyZXN0LCBDYWxsRXhwcmVzc2lvbihJZEFycmF5U2xpY2VDYWxsLCBbSWRBcmd1bWVudHMsIG5BcmdzXSkpKVxuXHRcdGNvbnN0IGFyZ0NoZWNrcyA9IGZsYXRNYXAodGhpcy5hcmdzLCBhcmcgPT4gb3BMb2NhbENoZWNrKGN4LCBhcmcsIGFyZy5pc0xhenkpKVxuXHRcdGNvbnN0IF9pbiA9IGZsYXRNYXAodGhpcy5vcEluLCBpID0+IHRvU3RhdGVtZW50cyh0MChpKSkpXG5cdFx0Y29uc3QgbGVhZCA9IG9wRGVjbGFyZVJlc3QuY29uY2F0KGFyZ0NoZWNrcywgX2luKVxuXG5cdFx0Y29uc3QgX291dCA9IGZsYXRNYXAodGhpcy5vcE91dCwgbyA9PiB0b1N0YXRlbWVudHModDAobykpKVxuXHRcdGNvbnN0IGJvZHkgPSB0Myh0aGlzLmJsb2NrLCBsZWFkLCB0aGlzLm9wUmVzRGVjbGFyZSwgX291dClcblx0XHRjb25zdCBhcmdzID0gdGhpcy5hcmdzLm1hcCh0MClcblx0XHRjb25zdCByZXMgPSBmdW5jdGlvbkV4cHJlc3Npb25QbGFpbihhcmdzLCBib2R5LCB0aGlzLmsgPT09ICd+fCcpXG5cblx0XHRpc0luR2VuZXJhdG9yID0gb2xkSW5HZW5lcmF0b3Jcblx0XHRyZXR1cm4gcmVzXG5cdH0sXG5cdExhenkoKSB7IHJldHVybiBsYXp5V3JhcCh0MCh0aGlzLnZhbHVlKSkgfSxcblx0TGlzdFJldHVybigpIHtcblx0XHRyZXR1cm4gQXJyYXlFeHByZXNzaW9uKHJhbmdlKDAsIHRoaXMubGVuZ3RoKS5tYXAoaSA9PiBpZENhY2hlZChgXyR7aX1gKSkpXG5cdH0sXG5cdExpc3RTaW1wbGUoKSB7IHJldHVybiBBcnJheUV4cHJlc3Npb24odGhpcy5wYXJ0cy5tYXAodDApKSB9LFxuXHRMaXN0RW50cnkoKSB7IHJldHVybiBkZWNsYXJlU3BlY2lhbChgXyR7dGhpcy5pbmRleH1gLCB0MCh0aGlzLnZhbHVlKSkgfSxcblx0TnVtYmVyTGl0ZXJhbCgpIHtcblx0XHQvLyBOZWdhdGl2ZSBudW1iZXJzIGFyZSBub3QgcGFydCBvZiBFUyBzcGVjLlxuXHRcdC8vIGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi81LjEvI3NlYy03LjguM1xuXHRcdGNvbnN0IGxpdCA9IExpdGVyYWwoTWF0aC5hYnModGhpcy52YWx1ZSkpXG5cdFx0cmV0dXJuIGlzUG9zaXRpdmUodGhpcy52YWx1ZSkgPyBsaXQgOiB1bmFyeUV4cHJlc3Npb25OZWdhdGUobGl0KVxuXHR9LFxuXHRHbG9iYWxBY2Nlc3MoKSB7IHJldHVybiBJZGVudGlmaWVyKHRoaXMubmFtZSkgfSxcblx0TG9jYWxBY2Nlc3MoKSB7IHJldHVybiBhY2Nlc3NMb2NhbCh0aGlzLCB2cikgfSxcblx0TG9jYWxEZWNsYXJlKCkgeyByZXR1cm4gaWRGb3JEZWNsYXJlQ2FjaGVkKHRoaXMpIH0sXG5cdC8vIFRPRE86IERvbid0IGFsd2F5cyBsYWJlbCFcblx0TG9vcCgpIHtcblx0XHRyZXR1cm4gTGFiZWxlZFN0YXRlbWVudChsb29wSWQodGhpcyksIHdoaWxlU3RhdGVtZW50SW5maW5pdGUodDAodGhpcy5ibG9jaykpKVxuXHR9LFxuXHRNYXBFbnRyeSgpIHtcblx0XHRjb25zdCBrID0gYF9rJHt0aGlzLmluZGV4fWBcblx0XHRjb25zdCB2ID0gYF92JHt0aGlzLmluZGV4fWBcblx0XHRyZXR1cm4gdmFyaWFibGVEZWNsYXJhdGlvbkNvbnN0KFtcblx0XHRcdFZhcmlhYmxlRGVjbGFyYXRvcihpZENhY2hlZChrKSwgdDAodGhpcy5rZXkpKSxcblx0XHRcdFZhcmlhYmxlRGVjbGFyYXRvcihpZENhY2hlZCh2KSwgdDAodGhpcy52YWwpKVxuXHRcdF0pXG5cdH0sXG5cdE1hcFJldHVybigpIHtcblx0XHRyZXR1cm4gbXNNYXAoZmxhdE1hcChyYW5nZSgwLCB0aGlzLmxlbmd0aCksIGkgPT5cblx0XHRcdFsgaWRDYWNoZWQoYF9rJHtpfWApLCBpZENhY2hlZChgX3Yke2l9YCkgXSkpXG5cdH0sXG5cdE1lbWJlcigpIHtcblx0XHRyZXR1cm4gbWVtYmVyKHQwKHRoaXMub2JqZWN0KSwgdGhpcy5uYW1lKVxuXHR9LFxuXHRNb2R1bGUoKSB7IHJldHVybiB0cmFuc3BpbGVNb2R1bGUodGhpcywgY3gpIH0sXG5cdC8vIFRPRE86RVM2IFVzZSBgZXhwb3J0IGRlZmF1bHRgXG5cdE1vZHVsZURlZmF1bHRFeHBvcnQoKSB7XG5cdFx0Y29uc3QgbSA9IG1lbWJlcihJZEV4cG9ydHMsICdkZWZhdWx0Jylcblx0XHRyZXR1cm4gQXNzaWdubWVudEV4cHJlc3Npb24oJz0nLCBtLCB0MCh0aGlzLnZhbHVlKSlcblx0fSxcblx0UXVvdGUoKSB7XG5cdFx0Ly8gVE9ETzpFUzYgdXNlIHRlbXBsYXRlIHN0cmluZ3Ncblx0XHRjb25zdCBwYXJ0MCA9IHRoaXMucGFydHNbMF1cblx0XHRjb25zdCBbIGZpcnN0LCByZXN0UGFydHMgXSA9XG5cdFx0XHR0eXBlb2YgcGFydDAgPT09ICdzdHJpbmcnID9cblx0XHRcdFx0WyBMaXRlcmFsKHBhcnQwKSwgdGFpbCh0aGlzLnBhcnRzKSBdIDpcblx0XHRcdFx0WyBMaXRFbXB0eVN0cmluZywgdGhpcy5wYXJ0cyBdXG5cdFx0cmV0dXJuIHJlc3RQYXJ0cy5yZWR1Y2UoXG5cdFx0XHQoZXgsIF8pID0+XG5cdFx0XHRcdGJpbmFyeUV4cHJlc3Npb25QbHVzKGV4LCB0eXBlb2YgXyA9PT0gJ3N0cmluZycgPyBMaXRlcmFsKF8pIDogbXNTaG93KFsgdDAoXykgXSkpLFxuXHRcdFx0Zmlyc3QpXG5cdH0sXG5cdFNwZWNpYWwoKSB7XG5cdFx0Ly8gTWFrZSBuZXcgb2JqZWN0cyBiZWNhdXNlIHdlIHdpbGwgYXNzaWduIGBsb2NgIHRvIHRoZW0uXG5cdFx0c3dpdGNoICh0aGlzLmspIHtcblx0XHRcdGNhc2UgJ2NvbnRhaW5zJzogcmV0dXJuIG1lbWJlcihJZE1zLCAnY29udGFpbnMnKVxuXHRcdFx0Y2FzZSAnZGVidWdnZXInOiByZXR1cm4gRGVidWdnZXJTdGF0ZW1lbnQoKVxuXHRcdFx0Y2FzZSAnc3ViJzogcmV0dXJuIG1lbWJlcihJZE1zLCAnc3ViJylcblx0XHRcdGNhc2UgJ3RoaXMnOiByZXR1cm4gXHRUaGlzRXhwcmVzc2lvbigpXG5cdFx0XHRjYXNlICd0aGlzLW1vZHVsZS1kaXJlY3RvcnknOiByZXR1cm4gSWRlbnRpZmllcignX19kaXJuYW1lJylcblx0XHRcdGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcih0aGlzLmspXG5cdFx0fVxuXHR9LFxuXHRTcGxhdCgpIHsgY3guZmFpbCh0aGlzLmxvYywgJ1NwbGF0IG11c3QgYXBwZWFyIGFzIGFyZ3VtZW50IHRvIGEgY2FsbC4nKSB9LFxuXHRZaWVsZCgpIHsgcmV0dXJuIHlpZWxkRXhwcmVzc2lvbk5vRGVsZWdhdGUodDAodGhpcy55aWVsZGVkKSkgfSxcblx0WWllbGRUbygpIHsgcmV0dXJuIHlpZWxkRXhwcmVzc2lvbkRlbGVnYXRlKHQwKHRoaXMueWllbGRlZFRvKSkgfVxufSlcblxuY29uc3Rcblx0YmxvY2tXcmFwID0gKF8sIGJsb2NrKSA9PiB7XG5cdFx0Y29uc3QgaW52b2tlID0gY2FsbEV4cHJlc3Npb25UaHVuayhmdW5jdGlvbkV4cHJlc3Npb25UaHVuayhibG9jaywgaXNJbkdlbmVyYXRvcikpXG5cdFx0cmV0dXJuIGlzSW5HZW5lcmF0b3IgPyB5aWVsZEV4cHJlc3Npb25EZWxlZ2F0ZShpbnZva2UpIDogaW52b2tlXG5cdH0sXG5cblx0Y2FzZUZhaWwgPSBTd2l0Y2hDYXNlKG51bGwsIFsgdGhyb3dFcnJvcignTm8gYnJhbmNoIG9mIGBjYXNlYCBtYXRjaGVzLicpIF0pLFxuXHRjYXNlQm9keSA9IChwYXJ0cywgb3BFbHNlKSA9PiB7XG5cdFx0Y29uc3QgZWx6ZSA9IGlmRWxzZShvcEVsc2UsXG5cdFx0XHRfID0+IFN3aXRjaENhc2UobnVsbCwgWyB0MChfKSBdKSxcblx0XHRcdCgpID0+IGNhc2VGYWlsKVxuXHRcdGNvbnN0IGNhc2VzID0gcHVzaChwYXJ0cy5tYXAodDApLCBlbHplKVxuXHRcdHJldHVybiBzd2l0Y2hTdGF0ZW1lbnRPblRydWUoY2FzZXMpXG5cdH0sXG5cblx0Y2FzZVBhcnQgPSAodGVzdCwgcmVzdWx0LCBuZWVkQnJlYWspID0+IHtcblx0XHRjb25zdCBjaGVja2VkVGVzdCA9IGN4Lm9wdHMuaW5jbHVkZUNhc2VDaGVja3MoKSA/IG1zQm9vbChbIHQwKHRlc3QpIF0pIDogdDAodGVzdClcblx0XHRjb25zdCBsaW5lcyA9IG5lZWRCcmVhayA/IFsgdDAocmVzdWx0KSwgQnJlYWsgXSA6IFsgdDAocmVzdWx0KSBdXG5cdFx0cmV0dXJuIFN3aXRjaENhc2UoY2hlY2tlZFRlc3QsIGxpbmVzKVxuXHR9LFxuXG5cdGxvb3BJZCA9IGxvb3AgPT4gaWRDYWNoZWQoYGxvb3Ake2xvb3AubG9jLnN0YXJ0LmxpbmV9YClcbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9