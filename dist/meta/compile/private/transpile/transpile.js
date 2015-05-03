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

	function casePart() {
		const checkedTest = cx.opts.includeCaseChecks() ? _util.msBool([t0(this.test)]) : t0(this.test);
		// alternate written to by `caseBody`.
		return _esastDistAst.IfStatement(checkedTest, t0(this.result));
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
			const body = caseBody(this.parts, this.opElse);
			return _UOp.ifElse(this.opCased, function (cased) {
				return _esastDistAst.BlockStatement([t0(cased), body]);
			}, function () {
				return body;
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
		CaseDoPart: casePart,
		CaseValPart: casePart,
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
	      caseBody = function (parts, opElse) {
		const ifs = parts.map(t0);
		const lastIdx = ifs.length - 1;
		for (let i = 0; i < lastIdx; i = i + 1) ifs[i].alternate = ifs[i + 1];
		ifs[lastIdx].alternate = _UOp.ifElse(opElse, t0, function () {
			return _esastUtil.throwError('No branch of `case` matches.');
		});
		return ifs[0];
	},
	      loopId = function (loop) {
		return _esastDistUtil.idCached('loop' + loop.loc.start.line);
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS90cmFuc3BpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OzttQkF3QndCLFNBQVM7Ozs7QUFGakMsS0FBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLGFBQWEsQ0FBQTs7QUFFVixVQUFTLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRTtBQUM5QyxJQUFFLEdBQUcsR0FBRyxDQUFBO0FBQ1IsSUFBRSxHQUFHLEdBQUcsQ0FBQTtBQUNSLGVBQWEsR0FBRyxLQUFLLENBQUE7QUFDckIsUUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBOztBQUVqQixJQUFFLEdBQUcsRUFBRSxHQUFHLFNBQVMsQ0FBQTtBQUNuQixTQUFPLEdBQUcsQ0FBQTtFQUNWOztBQUVNLE9BQU0sRUFBRSxHQUFHLFVBQUEsSUFBSSxFQUFJO0FBQ3pCLFFBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFBO0FBQ25DLE1BQUksRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFDdEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFBO0FBQ25CLFNBQU8sR0FBRyxDQUFBO0VBQ1YsQ0FBQTtTQUxZLEVBQUUsR0FBRixFQUFFO0FBTVIsT0FBTSxFQUFFLEdBQUcsVUFBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUs7QUFDNUMsUUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFDbEQsTUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUN0QixHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUE7QUFDbkIsU0FBTyxHQUFHLENBQUE7RUFDVixDQUFBO1NBTFksRUFBRSxHQUFGLEVBQUU7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bkQsVUFBVSxDQWdPb0QsOEJBQThCLENBQUM7R0FBQSxDQUFDLENBQUE7QUFDN0YsU0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7RUFDYjtPQUVELE1BQU0sR0FBRyxVQUFBLElBQUk7U0FBSSxlQTdPVCxRQUFRLFVBNk9pQixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUc7RUFBQSxDQUFBIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS90cmFuc3BpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcnJheUV4cHJlc3Npb24sIEFzc2lnbm1lbnRFeHByZXNzaW9uLCBCbG9ja1N0YXRlbWVudCwgQnJlYWtTdGF0ZW1lbnQsXG5cdENhbGxFeHByZXNzaW9uLCBEZWJ1Z2dlclN0YXRlbWVudCwgSWRlbnRpZmllciwgSWZTdGF0ZW1lbnQsIExhYmVsZWRTdGF0ZW1lbnQsIExpdGVyYWwsXG5cdFRoaXNFeHByZXNzaW9uLCBWYXJpYWJsZURlY2xhcmF0b3IsIFJldHVyblN0YXRlbWVudCB9IGZyb20gJ2VzYXN0L2Rpc3QvYXN0J1xuaW1wb3J0IHsgaWRDYWNoZWQsIG1lbWJlciwgdG9TdGF0ZW1lbnQgfSBmcm9tICdlc2FzdC9kaXN0L3V0aWwnXG5pbXBvcnQgeyBjYWxsRXhwcmVzc2lvblRodW5rLCBmdW5jdGlvbkV4cHJlc3Npb25QbGFpbiwgZnVuY3Rpb25FeHByZXNzaW9uVGh1bmssXG5cdHZhcmlhYmxlRGVjbGFyYXRpb25Db25zdCwgeWllbGRFeHByZXNzaW9uRGVsZWdhdGUsIHlpZWxkRXhwcmVzc2lvbk5vRGVsZWdhdGVcblx0fSBmcm9tICdlc2FzdC9kaXN0L3NwZWNpYWxpemUnXG5pbXBvcnQgKiBhcyBFRXhwb3J0cyBmcm9tICcuLi8uLi9FeHByZXNzaW9uJ1xuaW1wb3J0IHsgZmxhdE1hcCwgcmFuZ2UsIHRhaWwgfSBmcm9tICcuLi9VL0JhZydcbmltcG9ydCB7IGlmRWxzZSwgTm9uZSwgb3BJZiwgb3BPciB9IGZyb20gJy4uL1UvT3AnXG5pbXBvcnQgeyBhc3NlcnQsIGltcGxlbWVudE1hbnksIGlzUG9zaXRpdmUgfSBmcm9tICcuLi9VL3V0aWwnXG5pbXBvcnQgeyBiaW5hcnlFeHByZXNzaW9uUGx1cywgZGVjbGFyZSwgZGVjbGFyZVNwZWNpYWwsIGlkRm9yRGVjbGFyZUNhY2hlZCxcblx0dGhyb3dFcnJvciwgdW5hcnlFeHByZXNzaW9uTmVnYXRlLCB3aGlsZVN0YXRlbWVudEluZmluaXRlIH0gZnJvbSAnLi9lc2FzdC11dGlsJ1xuaW1wb3J0IHsgdHJhbnNwaWxlT2JqUmV0dXJuLCB0cmFuc3BpbGVPYmpTaW1wbGUgfSBmcm9tICcuL3RyYW5zcGlsZU9iaidcbmltcG9ydCB0cmFuc3BpbGVNb2R1bGUgZnJvbSAnLi90cmFuc3BpbGVNb2R1bGUnXG5pbXBvcnQge1xuXHRJZEV4cG9ydHMsIElkQXJndW1lbnRzLCBJZEFycmF5U2xpY2VDYWxsLCBJZEZ1bmN0aW9uQXBwbHlDYWxsLCBJZE1zLFxuXHRMaXRFbXB0eUFycmF5LCBMaXRFbXB0eVN0cmluZywgTGl0TnVsbCwgUmV0dXJuUmVzLFxuXHRhY2Nlc3NMb2NhbCwgbGF6eVdyYXAsIG1ha2VEZWNsYXJhdG9yLCBtYWtlRGVzdHJ1Y3R1cmVEZWNsYXJhdG9ycyxcblx0bWF5YmVXcmFwSW5DaGVja0NvbnRhaW5zLFxuXHRvcExvY2FsQ2hlY2ssIG1zQXJyLCBtc0Jvb2wsIG1zTWFwLCBtc1Nob3cgfSBmcm9tICcuL3V0aWwnXG5cbmxldCBjeCwgdnIsIGlzSW5HZW5lcmF0b3JcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdHJhbnNwaWxlKF9jeCwgZSwgX3ZyKSB7XG5cdGN4ID0gX2N4XG5cdHZyID0gX3ZyXG5cdGlzSW5HZW5lcmF0b3IgPSBmYWxzZVxuXHRjb25zdCByZXMgPSB0MChlKVxuXHQvLyBSZWxlYXNlIGZvciBnYXJiYWdlIGNvbGxlY3Rpb25cblx0Y3ggPSB2ciA9IHVuZGVmaW5lZFxuXHRyZXR1cm4gcmVzXG59XG5cbmV4cG9ydCBjb25zdCB0MCA9IGV4cHIgPT4ge1xuXHRjb25zdCBhc3QgPSBleHByLnRyYW5zcGlsZVN1YnRyZWUoKVxuXHRpZiAoY3gub3B0cy5zb3VyY2VNYXAoKSlcblx0XHRhc3QubG9jID0gZXhwci5sb2Ncblx0cmV0dXJuIGFzdFxufVxuZXhwb3J0IGNvbnN0IHQzID0gKGV4cHIsIGFyZywgYXJnMiwgYXJnMykgPT4ge1xuXHRjb25zdCBhc3QgPSBleHByLnRyYW5zcGlsZVN1YnRyZWUoYXJnLCBhcmcyLCBhcmczKVxuXHRpZiAoY3gub3B0cy5zb3VyY2VNYXAoKSlcblx0XHRhc3QubG9jID0gZXhwci5sb2Ncblx0cmV0dXJuIGFzdFxufVxuY29uc3QgdG0gPSBleHByID0+IHtcblx0Y29uc3QgYXN0ID0gZXhwci50cmFuc3BpbGVTdWJ0cmVlKClcblx0aWYgKGN4Lm9wdHMuc291cmNlTWFwKCkgJiYgIShhc3QgaW5zdGFuY2VvZiBBcnJheSkpXG5cdFx0Ly8gRGVidWcgbWF5IHByb2R1Y2UgbXVsdGlwbGUgc3RhdGVtZW50cy5cblx0XHRhc3QubG9jID0gZXhwci5sb2Ncblx0cmV0dXJuIGFzdFxufVxuXG5jb25zdCB0b1N0YXRlbWVudHMgPSBfID0+IF8gaW5zdGFuY2VvZiBBcnJheSA/IF8ubWFwKHRvU3RhdGVtZW50KSA6IFsgdG9TdGF0ZW1lbnQoXykgXVxuXG5mdW5jdGlvbiB0cmFuc3BpbGVCbG9jayhsZWFkLCBvcFJlc0RlY2xhcmUsIG9wT3V0KSB7XG5cdGlmIChsZWFkID09PSB1bmRlZmluZWQpXG5cdFx0bGVhZCA9IFtdXG5cdGlmIChvcFJlc0RlY2xhcmUgPT09IHVuZGVmaW5lZClcblx0XHRvcFJlc0RlY2xhcmUgPSBvcE91dCA9IE5vbmVcblx0Y29uc3QgYm9keSA9IGZsYXRNYXAodGhpcy5saW5lcywgbGluZSA9PiB0b1N0YXRlbWVudHModG0obGluZSkpKVxuXHRjb25zdCBpc1ZhbCA9IHRoaXMgaW5zdGFuY2VvZiBFRXhwb3J0cy5CbG9ja1ZhbFxuXHRjb25zdCBmaW4gPSBpZkVsc2Uob3BSZXNEZWNsYXJlLFxuXHRcdHJkID0+IHtcblx0XHRcdGFzc2VydChpc1ZhbClcblx0XHRcdGNvbnN0IHJldHVybmVkID0gbWF5YmVXcmFwSW5DaGVja0NvbnRhaW5zKGN4LCB0MCh0aGlzLnJldHVybmVkKSwgcmQub3BUeXBlLCAncmVzJylcblx0XHRcdHJldHVybiBpZkVsc2Uob3BPdXQsXG5cdFx0XHRcdG8gPT4gWyBkZWNsYXJlKHJkLCByZXR1cm5lZCkgXS5jb25jYXQobywgWyBSZXR1cm5SZXMgXSksXG5cdFx0XHRcdCgpID0+IFsgUmV0dXJuU3RhdGVtZW50KHJldHVybmVkKSBdKVxuXHRcdH0sXG5cdFx0KCkgPT4gb3BPdXQuY29uY2F0KG9wSWYoaXNWYWwsICgpID0+IFJldHVyblN0YXRlbWVudCh0MCh0aGlzLnJldHVybmVkKSkpKSlcblx0cmV0dXJuIEJsb2NrU3RhdGVtZW50KGxlYWQuY29uY2F0KGJvZHksIGZpbikpXG59XG5cbmZ1bmN0aW9uIGNhc2VQYXJ0KCkge1xuXHRjb25zdCBjaGVja2VkVGVzdCA9IGN4Lm9wdHMuaW5jbHVkZUNhc2VDaGVja3MoKSA/IG1zQm9vbChbIHQwKHRoaXMudGVzdCkgXSkgOiB0MCh0aGlzLnRlc3QpXG5cdC8vIGFsdGVybmF0ZSB3cml0dGVuIHRvIGJ5IGBjYXNlQm9keWAuXG5cdHJldHVybiBJZlN0YXRlbWVudChjaGVja2VkVGVzdCwgdDAodGhpcy5yZXN1bHQpKVxufVxuXG5pbXBsZW1lbnRNYW55KEVFeHBvcnRzLCAndHJhbnNwaWxlU3VidHJlZScsIHtcblx0QXNzaWduKCkge1xuXHRcdHJldHVybiB2YXJpYWJsZURlY2xhcmF0aW9uQ29uc3QoW1xuXHRcdFx0bWFrZURlY2xhcmF0b3IoY3gsIHRoaXMubG9jLCB0aGlzLmFzc2lnbmVlLCB0aGlzLmssIHQwKHRoaXMudmFsdWUpKSBdKVxuXHR9LFxuXHQvLyBUT0RPOkVTNiBKdXN0IHVzZSBuYXRpdmUgZGVzdHJ1Y3R1cmluZyBhc3NpZ25cblx0QXNzaWduRGVzdHJ1Y3R1cmUoKSB7XG5cdFx0cmV0dXJuIHZhcmlhYmxlRGVjbGFyYXRpb25Db25zdChcblx0XHRcdG1ha2VEZXN0cnVjdHVyZURlY2xhcmF0b3JzKFxuXHRcdFx0XHRjeCxcblx0XHRcdFx0dGhpcy5sb2MsXG5cdFx0XHRcdHRoaXMuYXNzaWduZWVzLFxuXHRcdFx0XHR0aGlzLmlzTGF6eSxcblx0XHRcdFx0dDAodGhpcy52YWx1ZSksXG5cdFx0XHRcdHRoaXMuayxcblx0XHRcdFx0ZmFsc2UpKVxuXHR9LFxuXHRCbG9ja0RvOiB0cmFuc3BpbGVCbG9jayxcblx0QmxvY2tWYWw6IHRyYW5zcGlsZUJsb2NrLFxuXHRCbG9ja1dyYXAoKSB7IHJldHVybiBibG9ja1dyYXAodGhpcywgdDAodGhpcy5ibG9jaykpIH0sXG5cdENhbGwoKSB7XG5cdFx0Y29uc3QgYW55U3BsYXQgPSB0aGlzLmFyZ3Muc29tZShhcmcgPT4gYXJnIGluc3RhbmNlb2YgRUV4cG9ydHMuU3BsYXQpXG5cdFx0aWYgKGFueVNwbGF0KSB7XG5cdFx0XHRjb25zdCBhcmdzID0gdGhpcy5hcmdzLm1hcChhcmcgPT5cblx0XHRcdFx0YXJnIGluc3RhbmNlb2YgRUV4cG9ydHMuU3BsYXQgP1xuXHRcdFx0XHRcdG1zQXJyKFsgdDAoYXJnLnNwbGF0dGVkKSBdKSA6XG5cdFx0XHRcdFx0dDAoYXJnKSlcblx0XHRcdHJldHVybiBDYWxsRXhwcmVzc2lvbihJZEZ1bmN0aW9uQXBwbHlDYWxsLCBbXG5cdFx0XHRcdHQwKHRoaXMuY2FsbGVkKSxcblx0XHRcdFx0TGl0TnVsbCxcblx0XHRcdFx0Q2FsbEV4cHJlc3Npb24obWVtYmVyKExpdEVtcHR5QXJyYXksICdjb25jYXQnKSwgYXJncyldKVxuXHRcdH1cblx0XHRlbHNlIHJldHVybiBDYWxsRXhwcmVzc2lvbih0MCh0aGlzLmNhbGxlZCksIHRoaXMuYXJncy5tYXAodDApKVxuXHR9LFxuXHRDYXNlRG8oKSB7XG5cdFx0Y29uc3QgYm9keSA9IGNhc2VCb2R5KHRoaXMucGFydHMsIHRoaXMub3BFbHNlKVxuXHRcdHJldHVybiBpZkVsc2UodGhpcy5vcENhc2VkLFxuXHRcdFx0Y2FzZWQgPT4gQmxvY2tTdGF0ZW1lbnQoWyB0MChjYXNlZCksIGJvZHkgXSksXG5cdFx0XHQoKSA9PiBib2R5KVxuXHR9LFxuXHRDYXNlVmFsKCkge1xuXHRcdGNvbnN0IGJvZHkgPSBjYXNlQm9keSh0aGlzLnBhcnRzLCB0aGlzLm9wRWxzZSlcblx0XHRjb25zdCBibG9jayA9IGlmRWxzZSh0aGlzLm9wQ2FzZWQsIGNhc2VkID0+IFsgdDAoY2FzZWQpLCBib2R5IF0sICgpID0+IFsgYm9keSBdKVxuXHRcdHJldHVybiBibG9ja1dyYXAodGhpcywgQmxvY2tTdGF0ZW1lbnQoYmxvY2spKVxuXHR9LFxuXHRDYXNlRG9QYXJ0OiBjYXNlUGFydCxcblx0Q2FzZVZhbFBhcnQ6IGNhc2VQYXJ0LFxuXHQvLyBUT0RPOiBpbmNsdWRlSW5vdXRDaGVja3MgaXMgbWlzbmFtZWRcblx0RGVidWcoKSB7XG5cdFx0cmV0dXJuIGN4Lm9wdHMuaW5jbHVkZUlub3V0Q2hlY2tzKCkgP1xuXHRcdFx0ZmxhdE1hcCh0aGlzLmxpbmVzLCBsaW5lID0+IHRvU3RhdGVtZW50cyh0MChsaW5lKSkpIDpcblx0XHRcdFsgXVxuXHR9LFxuXHRPYmpSZXR1cm4oKSB7IHJldHVybiB0cmFuc3BpbGVPYmpSZXR1cm4odGhpcywgY3gpIH0sXG5cdE9ialNpbXBsZSgpIHsgcmV0dXJuIHRyYW5zcGlsZU9ialNpbXBsZSh0aGlzLCBjeCkgfSxcblx0RW5kTG9vcCgpIHsgcmV0dXJuIEJyZWFrU3RhdGVtZW50KGxvb3BJZCh2ci5lbmRMb29wVG9Mb29wLmdldCh0aGlzKSkpIH0sXG5cdEZ1bigpIHtcblx0XHRjb25zdCBvbGRJbkdlbmVyYXRvciA9IGlzSW5HZW5lcmF0b3Jcblx0XHRpc0luR2VuZXJhdG9yID0gdGhpcy5rID09PSAnfnwnXG5cblx0XHQvLyBUT0RPOkVTNiB1c2UgYC4uLmBcblx0XHRjb25zdCBuQXJncyA9IExpdGVyYWwodGhpcy5hcmdzLmxlbmd0aClcblx0XHRjb25zdCBvcERlY2xhcmVSZXN0ID0gdGhpcy5vcFJlc3RBcmcubWFwKHJlc3QgPT5cblx0XHRcdGRlY2xhcmUocmVzdCwgQ2FsbEV4cHJlc3Npb24oSWRBcnJheVNsaWNlQ2FsbCwgW0lkQXJndW1lbnRzLCBuQXJnc10pKSlcblx0XHRjb25zdCBhcmdDaGVja3MgPSBmbGF0TWFwKHRoaXMuYXJncywgYXJnID0+IG9wTG9jYWxDaGVjayhjeCwgYXJnLCBhcmcuaXNMYXp5KSlcblx0XHRjb25zdCBfaW4gPSBmbGF0TWFwKHRoaXMub3BJbiwgaSA9PiB0b1N0YXRlbWVudHModDAoaSkpKVxuXHRcdGNvbnN0IGxlYWQgPSBvcERlY2xhcmVSZXN0LmNvbmNhdChhcmdDaGVja3MsIF9pbilcblxuXHRcdGNvbnN0IF9vdXQgPSBmbGF0TWFwKHRoaXMub3BPdXQsIG8gPT4gdG9TdGF0ZW1lbnRzKHQwKG8pKSlcblx0XHRjb25zdCBib2R5ID0gdDModGhpcy5ibG9jaywgbGVhZCwgdGhpcy5vcFJlc0RlY2xhcmUsIF9vdXQpXG5cdFx0Y29uc3QgYXJncyA9IHRoaXMuYXJncy5tYXAodDApXG5cdFx0Y29uc3QgcmVzID0gZnVuY3Rpb25FeHByZXNzaW9uUGxhaW4oYXJncywgYm9keSwgdGhpcy5rID09PSAnfnwnKVxuXG5cdFx0aXNJbkdlbmVyYXRvciA9IG9sZEluR2VuZXJhdG9yXG5cdFx0cmV0dXJuIHJlc1xuXHR9LFxuXHRMYXp5KCkgeyByZXR1cm4gbGF6eVdyYXAodDAodGhpcy52YWx1ZSkpIH0sXG5cdExpc3RSZXR1cm4oKSB7XG5cdFx0cmV0dXJuIEFycmF5RXhwcmVzc2lvbihyYW5nZSgwLCB0aGlzLmxlbmd0aCkubWFwKGkgPT4gaWRDYWNoZWQoYF8ke2l9YCkpKVxuXHR9LFxuXHRMaXN0U2ltcGxlKCkgeyByZXR1cm4gQXJyYXlFeHByZXNzaW9uKHRoaXMucGFydHMubWFwKHQwKSkgfSxcblx0TGlzdEVudHJ5KCkgeyByZXR1cm4gZGVjbGFyZVNwZWNpYWwoYF8ke3RoaXMuaW5kZXh9YCwgdDAodGhpcy52YWx1ZSkpIH0sXG5cdE51bWJlckxpdGVyYWwoKSB7XG5cdFx0Ly8gTmVnYXRpdmUgbnVtYmVycyBhcmUgbm90IHBhcnQgb2YgRVMgc3BlYy5cblx0XHQvLyBodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNS4xLyNzZWMtNy44LjNcblx0XHRjb25zdCBsaXQgPSBMaXRlcmFsKE1hdGguYWJzKHRoaXMudmFsdWUpKVxuXHRcdHJldHVybiBpc1Bvc2l0aXZlKHRoaXMudmFsdWUpID8gbGl0IDogdW5hcnlFeHByZXNzaW9uTmVnYXRlKGxpdClcblx0fSxcblx0R2xvYmFsQWNjZXNzKCkgeyByZXR1cm4gSWRlbnRpZmllcih0aGlzLm5hbWUpIH0sXG5cdExvY2FsQWNjZXNzKCkgeyByZXR1cm4gYWNjZXNzTG9jYWwodGhpcywgdnIpIH0sXG5cdExvY2FsRGVjbGFyZSgpIHsgcmV0dXJuIGlkRm9yRGVjbGFyZUNhY2hlZCh0aGlzKSB9LFxuXHQvLyBUT0RPOiBEb24ndCBhbHdheXMgbGFiZWwhXG5cdExvb3AoKSB7XG5cdFx0cmV0dXJuIExhYmVsZWRTdGF0ZW1lbnQobG9vcElkKHRoaXMpLCB3aGlsZVN0YXRlbWVudEluZmluaXRlKHQwKHRoaXMuYmxvY2spKSlcblx0fSxcblx0TWFwRW50cnkoKSB7XG5cdFx0Y29uc3QgayA9IGBfayR7dGhpcy5pbmRleH1gXG5cdFx0Y29uc3QgdiA9IGBfdiR7dGhpcy5pbmRleH1gXG5cdFx0cmV0dXJuIHZhcmlhYmxlRGVjbGFyYXRpb25Db25zdChbXG5cdFx0XHRWYXJpYWJsZURlY2xhcmF0b3IoaWRDYWNoZWQoayksIHQwKHRoaXMua2V5KSksXG5cdFx0XHRWYXJpYWJsZURlY2xhcmF0b3IoaWRDYWNoZWQodiksIHQwKHRoaXMudmFsKSlcblx0XHRdKVxuXHR9LFxuXHRNYXBSZXR1cm4oKSB7XG5cdFx0cmV0dXJuIG1zTWFwKGZsYXRNYXAocmFuZ2UoMCwgdGhpcy5sZW5ndGgpLCBpID0+XG5cdFx0XHRbIGlkQ2FjaGVkKGBfayR7aX1gKSwgaWRDYWNoZWQoYF92JHtpfWApIF0pKVxuXHR9LFxuXHRNZW1iZXIoKSB7XG5cdFx0cmV0dXJuIG1lbWJlcih0MCh0aGlzLm9iamVjdCksIHRoaXMubmFtZSlcblx0fSxcblx0TW9kdWxlKCkgeyByZXR1cm4gdHJhbnNwaWxlTW9kdWxlKHRoaXMsIGN4KSB9LFxuXHQvLyBUT0RPOkVTNiBVc2UgYGV4cG9ydCBkZWZhdWx0YFxuXHRNb2R1bGVEZWZhdWx0RXhwb3J0KCkge1xuXHRcdGNvbnN0IG0gPSBtZW1iZXIoSWRFeHBvcnRzLCAnZGVmYXVsdCcpXG5cdFx0cmV0dXJuIEFzc2lnbm1lbnRFeHByZXNzaW9uKCc9JywgbSwgdDAodGhpcy52YWx1ZSkpXG5cdH0sXG5cdFF1b3RlKCkge1xuXHRcdC8vIFRPRE86RVM2IHVzZSB0ZW1wbGF0ZSBzdHJpbmdzXG5cdFx0Y29uc3QgcGFydDAgPSB0aGlzLnBhcnRzWzBdXG5cdFx0Y29uc3QgWyBmaXJzdCwgcmVzdFBhcnRzIF0gPVxuXHRcdFx0dHlwZW9mIHBhcnQwID09PSAnc3RyaW5nJyA/XG5cdFx0XHRcdFsgTGl0ZXJhbChwYXJ0MCksIHRhaWwodGhpcy5wYXJ0cykgXSA6XG5cdFx0XHRcdFsgTGl0RW1wdHlTdHJpbmcsIHRoaXMucGFydHMgXVxuXHRcdHJldHVybiByZXN0UGFydHMucmVkdWNlKFxuXHRcdFx0KGV4LCBfKSA9PlxuXHRcdFx0XHRiaW5hcnlFeHByZXNzaW9uUGx1cyhleCwgdHlwZW9mIF8gPT09ICdzdHJpbmcnID8gTGl0ZXJhbChfKSA6IG1zU2hvdyhbIHQwKF8pIF0pKSxcblx0XHRcdGZpcnN0KVxuXHR9LFxuXHRTcGVjaWFsKCkge1xuXHRcdC8vIE1ha2UgbmV3IG9iamVjdHMgYmVjYXVzZSB3ZSB3aWxsIGFzc2lnbiBgbG9jYCB0byB0aGVtLlxuXHRcdHN3aXRjaCAodGhpcy5rKSB7XG5cdFx0XHRjYXNlICdjb250YWlucyc6IHJldHVybiBtZW1iZXIoSWRNcywgJ2NvbnRhaW5zJylcblx0XHRcdGNhc2UgJ2RlYnVnZ2VyJzogcmV0dXJuIERlYnVnZ2VyU3RhdGVtZW50KClcblx0XHRcdGNhc2UgJ3N1Yic6IHJldHVybiBtZW1iZXIoSWRNcywgJ3N1YicpXG5cdFx0XHRjYXNlICd0aGlzJzogcmV0dXJuIFx0VGhpc0V4cHJlc3Npb24oKVxuXHRcdFx0Y2FzZSAndGhpcy1tb2R1bGUtZGlyZWN0b3J5JzogcmV0dXJuIElkZW50aWZpZXIoJ19fZGlybmFtZScpXG5cdFx0XHRkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IodGhpcy5rKVxuXHRcdH1cblx0fSxcblx0U3BsYXQoKSB7IGN4LmZhaWwodGhpcy5sb2MsICdTcGxhdCBtdXN0IGFwcGVhciBhcyBhcmd1bWVudCB0byBhIGNhbGwuJykgfSxcblx0WWllbGQoKSB7IHJldHVybiB5aWVsZEV4cHJlc3Npb25Ob0RlbGVnYXRlKHQwKHRoaXMueWllbGRlZCkpIH0sXG5cdFlpZWxkVG8oKSB7IHJldHVybiB5aWVsZEV4cHJlc3Npb25EZWxlZ2F0ZSh0MCh0aGlzLnlpZWxkZWRUbykpIH1cbn0pXG5cbmNvbnN0XG5cdGJsb2NrV3JhcCA9IChfLCBibG9jaykgPT4ge1xuXHRcdGNvbnN0IGludm9rZSA9IGNhbGxFeHByZXNzaW9uVGh1bmsoZnVuY3Rpb25FeHByZXNzaW9uVGh1bmsoYmxvY2ssIGlzSW5HZW5lcmF0b3IpKVxuXHRcdHJldHVybiBpc0luR2VuZXJhdG9yID8geWllbGRFeHByZXNzaW9uRGVsZWdhdGUoaW52b2tlKSA6IGludm9rZVxuXHR9LFxuXG5cdGNhc2VCb2R5ID0gKHBhcnRzLCBvcEVsc2UpID0+IHtcblx0XHRjb25zdCBpZnMgPSBwYXJ0cy5tYXAodDApXG5cdFx0Y29uc3QgbGFzdElkeCA9IGlmcy5sZW5ndGggLSAxXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsYXN0SWR4OyBpID0gaSArIDEpXG5cdFx0XHRpZnNbaV0uYWx0ZXJuYXRlID0gaWZzW2kgKyAxXVxuXHRcdGlmc1tsYXN0SWR4XS5hbHRlcm5hdGUgPSBpZkVsc2Uob3BFbHNlLCB0MCwgKCkgPT4gdGhyb3dFcnJvcignTm8gYnJhbmNoIG9mIGBjYXNlYCBtYXRjaGVzLicpKVxuXHRcdHJldHVybiBpZnNbMF1cblx0fSxcblxuXHRsb29wSWQgPSBsb29wID0+IGlkQ2FjaGVkKGBsb29wJHtsb29wLmxvYy5zdGFydC5saW5lfWApXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==