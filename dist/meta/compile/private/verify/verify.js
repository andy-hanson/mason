if (typeof define !== 'function') var define = require('amdefine')(module);define(["exports", "module", "../../CompileError", "../../Expression", "../Opts", "../U/type", "../U/Op", "../U/Bag", "../U/util", "./verifyLines", "./Vx", "./util"], function (exports, module, _CompileError, _Expression, _Opts, _UType, _UOp, _UBag, _UUtil, _verifyLines, _Vx, _util) {
	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	module.exports = verify;
	var code = _CompileError.code;

	var E = _interopRequire(_Expression);

	var EExports = _Expression;

	var Opts = _interopRequire(_Opts);

	var type = _interopRequire(_UType);

	var ifElse = _UOp.ifElse;
	var cons = _UBag.cons;
	var head = _UBag.head;
	var isEmpty = _UBag.isEmpty;
	var toArray = _UBag.toArray;
	var assert = _UUtil.assert;
	var implementMany = _UUtil.implementMany;

	var verifyLines = _interopRequire(_verifyLines);

	var Vx = _interopRequire(_Vx);

	var v = _util.v;
	var vm = _util.vm;

	function verify(cx, e) {
		const vx = new Vx(cx);
		e.verify(e, vx);
		verifyLocalUse(vx);
		return vx.vr;
	}

	function verifyLocalUse(vx) {
		const vr = vx.vr;
		for (let local of vr.localToInfo.keys()) {
			const info = vr.localToInfo.get(local);
			const noNonDebug = isEmpty(info.nonDebugAccesses);
			if (noNonDebug && isEmpty(info.debugAccesses)) vx.warnIf(!local.okToNotUse, local.loc, function () {
				return "Unused local variable " + code(local.name) + ".";
			});else if (info.isInDebug) vx.check(noNonDebug, function () {
				return head(info.nonDebugAccesses).loc;
			}, function () {
				return "Debug-only local " + code(local.name) + " used outside of debug.";
			});else vx.warnIf(!local.okToNotUse && noNonDebug, local.loc, function () {
				return "Local " + code(local.name) + " used only in debug.";
			});
		}
	}

	implementMany(EExports, "verify", {
		Assign: function (_, vx) {
			const doV = function () {
				return vm(vx, [_.assignee, _.value]);
			};
			if (_.assignee.isLazy) vx.withBlockLocals(doV);else doV();
		},
		BlockDo: function (_, vx) {
			verifyLines(vx, _.lines);
		},
		BlockVal: function (_, vx) {
			const newLocals = verifyLines(vx, _.lines);
			vx.plusLocals(newLocals, function () {
				return v(vx)(_.returned);
			});
		},
		BlockWrap: function (_, vx) {
			vx.setEIsInGenerator(_);
			v(vx)(_.block);
		},
		CaseDo: verifyCase,
		CaseVal: function (_, vx) {
			vx.setEIsInGenerator(_);
			verifyCase(_, vx);
		},
		// Only reach here for in/out condition
		Debug: function (_, vx) {
			verifyLines(vx, [_]);
		},
		EndLoop: function (_, vx) {
			ifElse(vx.opLoop, function (loop) {
				return vx.setEndLoop(_, loop);
			}, function () {
				return vx.fail(_.loc, "Not in a loop.");
			});
		},
		Fun: function (_, vx) {
			vx.withBlockLocals(function () {
				vx.check(isEmpty(_.opResDeclare) || _.block instanceof EExports.BlockVal, _.loc, "Function with return condition must return something.");
				_.args.forEach(function (arg) {
					return arg.opType.forEach(v(vx));
				});
				vx.withInGenerator(_.k === "~|", function () {
					const allArgs = _.args.concat(_.opRestArg);
					allArgs.forEach(function (_) {
						return vx.registerLocal(_);
					});
					vx.plusLocals(allArgs, function () {
						_.opIn.forEach(v(vx));
						v(vx)(_.block);
						_.opResDeclare.forEach(function (rd) {
							v(vx)(rd);
							vx.registerLocal(rd);
						});
						_.opOut.forEach(function (o) {
							return vx.plusLocals(_.opResDeclare, function () {
								return v(vx)(o);
							});
						});
					});
				});
			});
		},
		GlobalAccess: function () {},
		LocalAccess: function (_, vx) {
			vx.localAccess(_);
		},
		Loop: function (_, vx) {
			vx.withInLoop(_, function () {
				return v(vx)(_.block);
			});
		},
		// Adding LocalDeclares to the available locals is done by Fun and buildVxBlockLine.
		LocalDeclare: function (_, vx) {
			_.opType.map(v(vx));
		},
		MapEntry: function (_, vx) {
			v(vx)(_.key);
			v(vx)(_.val);
		},
		Module: function (_, vx) {
			const useLocals = verifyUses(vx, _.uses, _.debugUses);
			vx.plusLocals(useLocals, function () {
				return v(vx)(_.block);
			});
		},
		Yield: function (_, vx) {
			vx.check(vx.isInGenerator, _.loc, "Cannot yield outside of generator context");
			v(vx)(_.yielded);
		},
		YieldTo: function (_, vx) {
			vx.check(vx.isInGenerator, _.loc, "Cannot yield outside of generator context");
			v(vx)(_.yieldedTo);
		},

		// These ones just recurse to their children.
		AssignDestructure: function (_, vx) {
			v(vx)(_.value);
			vm(vx, _.assignees);
		},
		Call: function (_, vx) {
			v(vx)(_.called);
			vm(vx, _.args);
		},
		CaseDoPart: verifyCasePart,
		CaseValPart: verifyCasePart,
		ObjReturn: function (_, vx) {
			vm(vx, _.opObjed);
		},
		ObjSimple: function (_, vx) {
			Object.getOwnPropertyNames(_.keysVals).forEach(function (key) {
				return v(vx)(_.keysVals[key]);
			});
		},
		Lazy: function (_, vx) {
			vx.withBlockLocals(function () {
				return v(vx)(_.value);
			});
		},
		ListReturn: function () {},
		ListEntry: function (_, vx) {
			v(vx)(_.value);
		},
		ListSimple: function (_, vx) {
			_.parts.map(v(vx));
		},
		ELiteral: function (_, vx) {
			vx.warnIf(_.k === "js", _.loc, "Js literal");
		},
		MapReturn: function () {},
		Member: function (_, vx) {
			v(vx)(_.object);
		},
		ModuleDefaultExport: function (_, vx) {
			v(vx)(_.value);
		},
		Quote: function (_, vx) {
			vm(vx, _.parts);
		},
		Special: function () {},
		Splat: function (_, vx) {
			v(vx)(_.splatted);
		}
	});

	function verifyCase(_, vx) {
		const newLocals = [];
		_.opCased.forEach(function (cased) {
			vx.registerLocal(cased.assignee);
			v(vx)(cased);
			newLocals.push(cased.assignee);
		});
		vx.plusLocals(newLocals, function () {
			vm(vx, _.parts);
			vm(vx, _.opElse);
		});
	}

	function verifyCasePart(_, vx) {
		v(vx)(_.test);
		v(vx)(_.result);
	}

	function verifyUses(vx, uses, debugUses) {
		const useLocals = [];
		uses.forEach(function (use) {
			if (!(use instanceof EExports.UseDo)) {
				type(use, EExports.Use);
				use.used.concat(use.opUseDefault).forEach(function (_) {
					vx.registerLocal(_);
					useLocals.push(_);
				});
			}
		});
		vx.withInDebug(true, function () {
			return debugUses.forEach(function (use) {
				return use.used.concat(use.opUseDefault).forEach(function (_) {
					vx.registerLocal(_);
					useLocals.push(_);
				});
			});
		});
		return useLocals;
	}
});
//# sourceMappingURL=../../../../meta/compile/private/verify/verify.js.map