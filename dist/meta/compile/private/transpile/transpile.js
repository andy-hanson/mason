if (typeof define !== 'function') var define = require('amdefine')(module);define(["exports", "module", "esast/dist/ast", "esast/dist/Loc", "esast/dist/util", "esast/dist/specialize", "../../Expression", "../Lang", "../Opts", "../U/Bag", "../U/Op", "../U/type", "../U/util", "../Vr", "./esast-util", "./transpileBlock", "./transpileObj", "./transpileModule", "./util", "./Tx"], function (exports, module, _esastDistAst, _esastDistLoc, _esastDistUtil, _esastDistSpecialize, _Expression, _Lang, _Opts, _UBag, _UOp, _UType, _UUtil, _Vr, _esastUtil, _transpileBlock, _transpileObj, _transpileModule, _util, _Tx) {
	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

	module.exports = transpile;
	var ArrayExpression = _esastDistAst.ArrayExpression;
	var AssignmentExpression = _esastDistAst.AssignmentExpression;
	var BlockStatement = _esastDistAst.BlockStatement;
	var BreakStatement = _esastDistAst.BreakStatement;
	var CallExpression = _esastDistAst.CallExpression;
	var DebuggerStatement = _esastDistAst.DebuggerStatement;
	var Identifier = _esastDistAst.Identifier;
	var LabeledStatement = _esastDistAst.LabeledStatement;
	var Literal = _esastDistAst.Literal;
	var SwitchCase = _esastDistAst.SwitchCase;
	var SwitchStatement = _esastDistAst.SwitchStatement;
	var ThisExpression = _esastDistAst.ThisExpression;
	var VariableDeclarator = _esastDistAst.VariableDeclarator;

	var Loc = _interopRequire(_esastDistLoc);

	var idCached = _esastDistUtil.idCached;
	var member = _esastDistUtil.member;
	var throwError = _esastDistUtil.throwError;
	var toStatement = _esastDistUtil.toStatement;
	var toStatements = _esastDistUtil.toStatements;
	var binaryExpressionPlus = _esastDistSpecialize.binaryExpressionPlus;
	var callExpressionThunk = _esastDistSpecialize.callExpressionThunk;
	var functionExpressionPlain = _esastDistSpecialize.functionExpressionPlain;
	var functionExpressionThunk = _esastDistSpecialize.functionExpressionThunk;
	var switchStatementOnTrue = _esastDistSpecialize.switchStatementOnTrue;
	var unaryExpressionNegate = _esastDistSpecialize.unaryExpressionNegate;
	var variableDeclarationConst = _esastDistSpecialize.variableDeclarationConst;
	var whileStatementInfinite = _esastDistSpecialize.whileStatementInfinite;
	var yieldExpressionDelegate = _esastDistSpecialize.yieldExpressionDelegate;
	var yieldExpressionNoDelegate = _esastDistSpecialize.yieldExpressionNoDelegate;

	var Expression = _interopRequire(_Expression);

	var EExports = _Expression;
	var KAssign = _Lang.KAssign;

	var Opts = _interopRequire(_Opts);

	var cat = _UBag.cat;
	var cons = _UBag.cons;
	var flatMap = _UBag.flatMap;
	var isEmpty = _UBag.isEmpty;
	var push = _UBag.push;
	var range = _UBag.range;
	var tail = _UBag.tail;
	var unshift = _UBag.unshift;
	var ifElse = _UOp.ifElse;
	var opIf = _UOp.opIf;
	var None = _UOp.None;
	var some = _UOp.some;

	var type = _interopRequire(_UType);

	var assert = _UUtil.assert;
	var implementMany = _UUtil.implementMany;
	var isPositive = _UUtil.isPositive;
	var log = _UUtil.log;

	var Vr = _interopRequire(_Vr);

	var declare = _esastUtil.declare;
	var declareSpecial = _esastUtil.declareSpecial;
	var idForDeclareCached = _esastUtil.idForDeclareCached;

	var transpileBlock = _interopRequire(_transpileBlock);

	var transpileObjReturn = _transpileObj.transpileObjReturn;
	var transpileObjSimple = _transpileObj.transpileObjSimple;

	var transpileModule = _interopRequire(_transpileModule);

	var t = _util.t;
	var IdExports = _util.IdExports;
	var IdArguments = _util.IdArguments;
	var IdArraySliceCall = _util.IdArraySliceCall;
	var IdFunctionApplyCall = _util.IdFunctionApplyCall;
	var IdMs = _util.IdMs;
	var LitEmptyArray = _util.LitEmptyArray;
	var LitEmptyString = _util.LitEmptyString;
	var LitNull = _util.LitNull;
	var Break = _util.Break;
	var accessLocal = _util.accessLocal;
	var lazyWrap = _util.lazyWrap;
	var makeDeclarator = _util.makeDeclarator;
	var makeDestructureDeclarators = _util.makeDestructureDeclarators;
	var opLocalCheck = _util.opLocalCheck;
	var msArr = _util.msArr;
	var msBool = _util.msBool;
	var msMap = _util.msMap;
	var msShow = _util.msShow;

	var Tx = _interopRequire(_Tx);

	function transpile(cx, e, vr) {
		const tx = new Tx(cx, vr);
		const ast = t(tx)(e);
		if (tx.opts().sourceMap()) ast.loc.source = tx.opts().modulePath();
		return ast;
	}

	implementMany(EExports, "transpileSubtree", {
		Assign: function (_, tx) {
			return variableDeclarationConst([makeDeclarator(tx, _.loc, _.assignee, _.k, t(tx)(_.value))]);
		},
		// TODO:ES6 Just use native destructuring assign
		AssignDestructure: function (_, tx) {
			return variableDeclarationConst(makeDestructureDeclarators(tx, _.loc, _.assignees, _.isLazy, t(tx)(_.value), _.k, false));
		},
		BlockDo: transpileBlock,
		BlockVal: transpileBlock,
		BlockWrap: function (_, tx) {
			return blockWrap(_, tx, t(tx)(_.block));
		},
		Call: function (_, tx) {
			const anySplat = _.args.some(function (arg) {
				return arg instanceof EExports.Splat;
			});
			if (anySplat) {
				const args = _.args.map(function (arg) {
					return arg instanceof EExports.Splat ? msArr([t(tx)(arg.splatted)]) : t(tx)(arg);
				});
				return CallExpression(IdFunctionApplyCall, [t(tx)(_.called), LitNull, CallExpression(member(LitEmptyArray, "concat"), args)]);
			} else return CallExpression(t(tx)(_.called), _.args.map(t(tx)));
		},
		CaseDo: function (_, tx) {
			return ifElse(_.opCased, function (cased) {
				return BlockStatement([t(tx)(cased), caseBody(tx, _.parts, _.opElse)]);
			}, function () {
				return caseBody(tx, _.parts, _.opElse);
			});
		},
		CaseVal: function (_, tx) {
			const body = caseBody(tx, _.parts, _.opElse);
			const block = ifElse(_.opCased, function (cased) {
				return [t(tx)(cased), body];
			}, function () {
				return [body];
			});
			return blockWrap(_, tx, BlockStatement(block));
		},
		CaseDoPart: function (_, tx) {
			return casePart(tx, _.test, _.result, true);
		},
		CaseValPart: function (_, tx) {
			return casePart(tx, _.test, _.result, false);
		},
		// TODO: includeInoutChecks is misnamed
		Debug: function (_, tx) {
			return tx.opts().includeInoutChecks() ? flatMap(_.lines, function (line) {
				return toStatements(t(tx)(line));
			}) : [];
		},
		ObjReturn: transpileObjReturn,
		ObjSimple: transpileObjSimple,
		EndLoop: function (_, tx) {
			return BreakStatement(loopId(tx.vr.endLoopToLoop.get(_)));
		},
		Fun: function (_, tx) {
			// TODO: cache literals for small numbers
			const nArgs = Literal(_.args.length);
			const opDeclareRest = _.opRestArg.map(function (rest) {
				return declare(rest, CallExpression(IdArraySliceCall, [IdArguments, nArgs]));
			});
			const argChecks = flatMap(_.args, function (arg) {
				return opLocalCheck(tx, arg, arg.isLazy);
			});
			const _in = flatMap(_.opIn, function (i) {
				return toStatements(t(tx)(i));
			});
			const lead = opDeclareRest.concat(argChecks, _in);

			const _out = flatMap(_.opOut, function (o) {
				return toStatements(t(tx)(o));
			});
			const body = t(tx, lead, _.opResDeclare, _out)(_.block);
			const args = _.args.map(t(tx));
			return functionExpressionPlain(args, body, _.k === "~|");
		},
		Lazy: function (_, tx) {
			return lazyWrap(t(tx)(_.value));
		},
		ListReturn: function (_) {
			return ArrayExpression(range(0, _.length).map(function (i) {
				return idCached("_" + i);
			}));
		},
		ListSimple: function (_, tx) {
			return ArrayExpression(_.parts.map(t(tx)));
		},
		ListEntry: function (_, tx) {
			return declareSpecial("_" + _.index, t(tx)(_.value));
		},
		ELiteral: function (_) {
			switch (_.k) {
				case Number:
					{
						// TODO: Number literals should store Numbers...
						const n = Number.parseFloat(_.value);
						// Negative numbers are not part of ES spec.
						// http://www.ecma-international.org/ecma-262/5.1/#sec-7.8.3
						const lit = Literal(Math.abs(n));
						return isPositive(n) ? lit : unaryExpressionNegate(lit);
					}
				case String:
					return Literal(_.value);
				case "js":
					switch (_.value) {
						// TODO:USE* Get rid of this!
						case "msGetModule":
							return member(IdMs, "getModule");
						case "require":
							return idCached("require");
						default:
							throw new Error("This js literal not supported.");
					}
				default:
					throw new Error(_.k);
			}
		},
		GlobalAccess: function (_) {
			return Identifier(_.name);
		},
		LocalAccess: function (_, tx) {
			return accessLocal(tx, _);
		},
		LocalDeclare: function (_) {
			return idForDeclareCached(_);
		},
		// TODO: Don't always label!
		Loop: function (_, tx) {
			return LabeledStatement(loopId(_), whileStatementInfinite(t(tx)(_.block)));
		},
		MapReturn: function (_) {
			return msMap(flatMap(range(0, _.length), function (i) {
				return [idCached("_k" + i.toString()), idCached("_v" + i.toString())];
			}));
		},
		MapEntry: function (_, tx) {
			return variableDeclarationConst([VariableDeclarator(idCached("_k" + _.index), t(tx)(_.key)), VariableDeclarator(idCached("_v" + _.index), t(tx)(_.val))]);
		},
		Member: function (_, tx) {
			return member(t(tx)(_.object), _.name);
		},
		Module: transpileModule,
		// TODO:ES6 Use `export default`
		ModuleDefaultExport: function (_, tx) {
			const m = member(IdExports, "default");
			return AssignmentExpression("=", m, t(tx)(_.value));
		},
		Quote: function (_, tx) {
			// TODO:ES6 use template strings
			const isStrLit = function (_) {
				return _ instanceof EExports.ELiteral && _.k === String;
			};
			const part0 = _.parts[0];

			var _ref = isStrLit(part0) ? [t(tx)(part0), tail(_.parts)] : [LitEmptyString, _.parts];

			var _ref2 = _slicedToArray(_ref, 2);

			const first = _ref2[0];
			const restParts = _ref2[1];

			return restParts.reduce(function (ex, _) {
				return binaryExpressionPlus(ex, isStrLit(_) ? t(tx)(_) : msShow([t(tx)(_)]));
			}, first);
		},
		Special: function (_) {
			// Make new objects because we will assign `loc` to them.
			switch (_.k) {
				case "contains":
					return member(IdMs, "contains");
				case "debugger":
					return DebuggerStatement();
				case "sub":
					return member(IdMs, "sub");
				case "this":
					return ThisExpression();
				case "this-module-directory":
					return Identifier("__dirname");
				default:
					throw new Error(_.k);
			}
		},
		Splat: function (_, tx) {
			return tx.fail(_.loc, "Splat must appear as argument to a call.");
		},
		Yield: function (_, tx) {
			return yieldExpressionNoDelegate(t(tx)(_.yielded));
		},
		YieldTo: function (_, tx) {
			return yieldExpressionDelegate(t(tx)(_.yieldedTo));
		}
	});

	const blockWrap = function (_, tx, block) {
		const g = tx.vr.eIsInGenerator(_);
		const invoke = callExpressionThunk(functionExpressionThunk(block, g));
		return g ? yieldExpressionDelegate(invoke) : invoke;
	};

	const caseFail = SwitchCase(null, [throwError("No branch of `case` matches.")]);
	function caseBody(tx, parts, opElse) {
		const elze = ifElse(opElse, function (_) {
			return SwitchCase(null, [t(tx)(_)]);
		}, function () {
			return caseFail;
		});
		const cases = push(parts.map(function (part) {
			return t(tx)(part);
		}), elze);
		return switchStatementOnTrue(cases);
	}

	function casePart(tx, test, result, needBreak) {
		const checkedTest = tx.opts().includeCaseChecks() ? msBool([t(tx)(test)]) : t(tx)(test);
		const lines = needBreak ? [t(tx)(result), Break] : [t(tx)(result)];
		return SwitchCase(checkedTest, lines);
	}

	// TODO: MOVE

	const loopId = function (loop) {
		type(loop.loc.start.line, Number);
		return idCached("loop" + loop.loc.start.line);
	};
});
//# sourceMappingURL=../../../../meta/compile/private/transpile/transpile.js.map