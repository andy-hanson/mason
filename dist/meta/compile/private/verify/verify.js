if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', '../../CompileError', '../../Expression', '../U/type', '../U/Op', '../U/Bag', '../U/util', './verifyLines', './Vx', './util'], function (exports, module, _CompileError, _Expression, _UType, _UOp, _UBag, _UUtil, _verifyLines, _Vx, _util) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	module.exports = verify;

	var _type = _interopRequire(_UType);

	var _verifyLines2 = _interopRequire(_verifyLines);

	var _Vx2 = _interopRequire(_Vx);

	function verify(cx, e) {
		const vx = new _Vx2(cx);
		e.verify(e, vx);
		verifyLocalUse(vx);
		return vx.vr;
	}

	function verifyLocalUse(vx) {
		const vr = vx.vr;
		vx.allLocalDeclares.forEach(function (local) {
			const info = vr.localToInfo.get(local);
			const noNonDebug = _UBag.isEmpty(info.nonDebugAccesses);
			if (noNonDebug && _UBag.isEmpty(info.debugAccesses)) vx.warnIf(!local.okToNotUse, local.loc, function () {
				return 'Unused local variable ' + _CompileError.code(local.name) + '.';
			});else if (info.isInDebug) vx.check(noNonDebug, function () {
				return _UBag.head(info.nonDebugAccesses).loc;
			}, function () {
				return 'Debug-only local ' + _CompileError.code(local.name) + ' used outside of debug.';
			});else vx.warnIf(!local.okToNotUse && noNonDebug, local.loc, function () {
				return 'Local ' + _CompileError.code(local.name) + ' used only in debug.';
			});
		});
	}

	_UUtil.implementMany(_Expression, 'verify', {
		Assign: function (_, vx) {
			const doV = function () {
				return _util.vm(vx, [_.assignee, _.value]);
			};
			if (_.assignee.isLazy) vx.withBlockLocals(doV);else doV();
		},
		BlockDo: function (_, vx) {
			_verifyLines2(vx, _.lines);
		},
		BlockVal: function (_, vx) {
			const newLocals = _verifyLines2(vx, _.lines);
			vx.plusLocals(newLocals, function () {
				return _util.v(vx)(_.returned);
			});
		},
		BlockWrap: function (_, vx) {
			vx.setEIsInGenerator(_);
			_util.v(vx)(_.block);
		},
		CaseDo: verifyCase,
		CaseVal: function (_, vx) {
			vx.setEIsInGenerator(_);
			verifyCase(_, vx);
		},
		// Only reach here for in/out condition
		Debug: function (_, vx) {
			_verifyLines2(vx, [_]);
		},
		EndLoop: function (_, vx) {
			_UOp.ifElse(vx.opLoop, function (loop) {
				return vx.setEndLoop(_, loop);
			}, function () {
				return vx.fail(_.loc, 'Not in a loop.');
			});
		},
		Fun: function (_, vx) {
			vx.withBlockLocals(function () {
				vx.check(_UBag.isEmpty(_.opResDeclare) || _.block instanceof _Expression.BlockVal, _.loc, 'Function with return condition must return something.');
				_.args.forEach(function (arg) {
					return arg.opType.forEach(_util.v(vx));
				});
				vx.withInGenerator(_.k === '~|', function () {
					const allArgs = _.args.concat(_.opRestArg);
					allArgs.forEach(function (_) {
						return vx.registerLocal(_);
					});
					vx.plusLocals(allArgs, function () {
						_.opIn.forEach(_util.v(vx));
						_util.v(vx)(_.block);
						_.opResDeclare.forEach(function (rd) {
							_util.v(vx)(rd);
							vx.registerLocal(rd);
						});
						_.opOut.forEach(function (o) {
							return vx.plusLocals(_.opResDeclare, function () {
								return _util.v(vx)(o);
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
				return _util.v(vx)(_.block);
			});
		},
		// Adding LocalDeclares to the available locals is done by Fun and buildVxBlockLine.
		LocalDeclare: function (_, vx) {
			_.opType.map(_util.v(vx));
		},
		MapEntry: function (_, vx) {
			_util.v(vx)(_.key);
			_util.v(vx)(_.val);
		},
		Module: function (_, vx) {
			const useLocals = verifyUses(vx, _.uses, _.debugUses);
			vx.plusLocals(useLocals, function () {
				return _util.v(vx)(_.block);
			});
		},
		Yield: function (_, vx) {
			vx.check(vx.isInGenerator, _.loc, 'Cannot yield outside of generator context');
			_util.v(vx)(_.yielded);
		},
		YieldTo: function (_, vx) {
			vx.check(vx.isInGenerator, _.loc, 'Cannot yield outside of generator context');
			_util.v(vx)(_.yieldedTo);
		},

		// These ones just recurse to their children.
		AssignDestructure: function (_, vx) {
			_util.v(vx)(_.value);
			_util.vm(vx, _.assignees);
		},
		Call: function (_, vx) {
			_util.v(vx)(_.called);
			_util.vm(vx, _.args);
		},
		CaseDoPart: verifyCasePart,
		CaseValPart: verifyCasePart,
		ObjReturn: function (_, vx) {
			_util.vm(vx, _.opObjed);
		},
		ObjSimple: function (_, vx) {
			Object.getOwnPropertyNames(_.keysVals).forEach(function (key) {
				return _util.v(vx)(_.keysVals[key]);
			});
		},
		Lazy: function (_, vx) {
			vx.withBlockLocals(function () {
				return _util.v(vx)(_.value);
			});
		},
		ListReturn: function () {},
		ListEntry: function (_, vx) {
			_util.v(vx)(_.value);
		},
		ListSimple: function (_, vx) {
			_.parts.map(_util.v(vx));
		},
		ELiteral: function (_, vx) {
			vx.warnIf(_.k === 'js', _.loc, 'Js literal');
		},
		MapReturn: function () {},
		Member: function (_, vx) {
			_util.v(vx)(_.object);
		},
		ModuleDefaultExport: function (_, vx) {
			_util.v(vx)(_.value);
		},
		Quote: function (_, vx) {
			_util.vm(vx, _.parts);
		},
		Special: function () {},
		Splat: function (_, vx) {
			_util.v(vx)(_.splatted);
		}
	});

	function verifyCase(_, vx) {
		const newLocals = [];
		_.opCased.forEach(function (cased) {
			vx.registerLocal(cased.assignee);
			_util.v(vx)(cased);
			newLocals.push(cased.assignee);
		});
		vx.plusLocals(newLocals, function () {
			_util.vm(vx, _.parts);
			_util.vm(vx, _.opElse);
		});
	}

	function verifyCasePart(_, vx) {
		_util.v(vx)(_.test);
		_util.v(vx)(_.result);
	}

	function verifyUses(vx, uses, debugUses) {
		const useLocals = [];
		uses.forEach(function (use) {
			if (!(use instanceof _Expression.UseDo)) {
				_type(use, _Expression.Use);
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